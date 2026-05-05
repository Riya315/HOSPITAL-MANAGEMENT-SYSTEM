import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [[{ totalPatients }]] = await pool.query('SELECT COUNT(*) as totalPatients FROM Patient');
    const [[{ totalDoctors }]] = await pool.query('SELECT COUNT(*) as totalDoctors FROM Doctor');
    const [[{ totalRevenue }]] = await pool.query('SELECT SUM(total_amount) as totalRevenue FROM Billing');
    const [[{ completedAppointments }]] = await pool.query("SELECT COUNT(*) as completedAppointments FROM Appointment WHERE status = 'Completed'");

    const [recentActivity] = await pool.query(`
      SELECT a.appointment_id, a.date, a.time, a.status, p.name as patient_name, d.name as doctor_name
      FROM Appointment a
      LEFT JOIN Patient p ON a.patient_id = p.patient_id
      LEFT JOIN Doctor d ON a.doctor_id = d.doctor_id
      ORDER BY a.appointment_id DESC
      LIMIT 5
    `);

    // 1. Appointments Trend (Recent Active Dates)
    const [rawAppointmentTrends] = await pool.query(`
      SELECT date, COUNT(*) as count 
      FROM Appointment 
      GROUP BY date
      ORDER BY date DESC
      LIMIT 7
    `);
    const appointmentTrends = rawAppointmentTrends.reverse(); // oldest to newest for graphing

    // 2. Revenue Trend (Last 7 Days)
    const [revenueTrends] = await pool.query(`
      SELECT bill_date as date, SUM(total_amount) as amount
      FROM Billing
      WHERE bill_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY bill_date
      ORDER BY bill_date ASC
    `);

    // 3. Department Distribution (Pie Chart)
    const [deptDistribution] = await pool.query(`
      SELECT d.name as name, COUNT(doc.doctor_id) as value
      FROM Department d
      LEFT JOIN Doctor doc ON d.department_id = doc.department_id
      GROUP BY d.department_id
    `);

    // 4. Appointment Status Distribution
    const [statusDistribution] = await pool.query(`
      SELECT status as name, COUNT(*) as value
      FROM Appointment
      GROUP BY status
    `);

    // 5. Smart Alerts Generation
    let alerts = [];
    
    // a) Bed Capacity Alert
    try {
      const [[{ totalBeds, occupiedBeds }]] = await pool.query(`
        SELECT COUNT(*) as totalBeds, SUM(CASE WHEN status='Occupied' THEN 1 ELSE 0 END) as occupiedBeds FROM Bed
      `);
      if (totalBeds > 0 && (occupiedBeds / totalBeds) > 0.8) {
        alerts.push({ type: 'warning', icon: '⚠️', message: 'Bed capacity almost full! (' + Math.round((occupiedBeds/totalBeds)*100) + '% Occupied)' });
      }
    } catch(e) {}

    // b) Medicine Stock Alert
    try {
      const [lowStockMeds] = await pool.query(`SELECT name, stock FROM Medication WHERE stock <= 3 LIMIT 5`);
      if (lowStockMeds.length > 0) {
        const medNames = lowStockMeds.map(m => m.name).join(', ');
        alerts.push({ type: 'danger', icon: '🚨', message: `CRITICAL: Medicine stock very low (<=3) for: ${medNames}` });
      }
    } catch(e) {}

    // c) Upcoming Appointments Alert
    try {
      const [[{ upcomingApts }]] = await pool.query(`SELECT COUNT(*) as upcomingApts FROM Appointment WHERE date >= CURDATE() AND status = 'Scheduled'`);
      if (upcomingApts > 0) {
        alerts.push({ type: 'info', icon: '⏰', message: `You have ${upcomingApts} upcoming scheduled appointments.` });
      }
    } catch(e) {}

    // 6. AI-Based Patient Priority (Smart Triage)
    let smartTriage = [];
    try {
      // Get patients with their latest diagnosis to score them
      const [patientsWithDiag] = await pool.query(`
        SELECT p.patient_id, p.name, p.dob, p.gender, diag.disease 
        FROM Patient p
        LEFT JOIN Medical_Record mr ON p.patient_id = mr.patient_id
        LEFT JOIN Diagnosis diag ON mr.record_id = diag.record_id
        WHERE mr.record_id IN (SELECT MAX(record_id) FROM Medical_Record GROUP BY patient_id)
           OR mr.record_id IS NULL
        ORDER BY p.patient_id DESC
        LIMIT 20
      `);

      const scoredPatients = patientsWithDiag.map(p => {
        let score = 0;
        let reasons = [];
        
        const age = new Date().getFullYear() - new Date(p.dob).getFullYear();

        // ONLY Critical Symptom/Disease based triage
        if (p.disease) {
          const d = p.disease.toLowerCase();
          if (d.includes('heart') || d.includes('attack') || d.includes('cardiac')) { score += 10; reasons.push('Cardiac condition'); }
          if (d.includes('stroke') || d.includes('severe') || d.includes('critical')) { score += 10; reasons.push('Critical condition'); }
        }

        return { ...p, age, score, reasons };
      });
      
      // Filter ONLY critical patients (score > 0), sort by priority, and return top 5
      smartTriage = scoredPatients.filter(p => p.score > 0);
      smartTriage.sort((a, b) => b.score - a.score);
      smartTriage = smartTriage.slice(0, 5);

    } catch(e) { console.error('Triage error', e); }

    return NextResponse.json({
      totalPatients,
      totalDoctors,
      totalRevenue: totalRevenue || 0,
      completedAppointments,
      recentActivity,
      appointmentTrends,
      revenueTrends,
      deptDistribution,
      statusDistribution,
      alerts,
      smartTriage
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}

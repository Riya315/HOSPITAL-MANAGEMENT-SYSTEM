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

    return NextResponse.json({
      totalPatients,
      totalDoctors,
      totalRevenue: totalRevenue || 0,
      completedAppointments,
      recentActivity
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}

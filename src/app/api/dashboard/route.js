import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [[{ totalPatients }]] = await pool.query('SELECT COUNT(*) as totalPatients FROM Patient');
    const [[{ totalDoctors }]] = await pool.query('SELECT COUNT(*) as totalDoctors FROM Doctor');
    const [[{ totalRevenue }]] = await pool.query('SELECT SUM(total_amount) as totalRevenue FROM Billing');
    const [[{ completedAppointments }]] = await pool.query("SELECT COUNT(*) as completedAppointments FROM Appointment WHERE status = 'Completed'");

    return NextResponse.json({
      totalPatients,
      totalDoctors,
      totalRevenue: totalRevenue || 0,
      completedAppointments
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}

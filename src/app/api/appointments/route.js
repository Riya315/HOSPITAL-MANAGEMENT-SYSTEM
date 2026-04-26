import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        a.*, 
        p.name as patient_name, 
        d.name as doctor_name
      FROM Appointment a
      LEFT JOIN Patient p ON a.patient_id = p.patient_id
      LEFT JOIN Doctor d ON a.doctor_id = d.doctor_id
      ORDER BY a.date DESC, a.time DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

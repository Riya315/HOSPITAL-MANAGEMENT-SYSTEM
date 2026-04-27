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

export async function POST(request) {
  try {
    const body = await request.json();
    const { patient_id, doctor_id, date, time } = body;

    if (!patient_id || !doctor_id || !date || !time) {
      return NextResponse.json({ error: 'Patient ID, Doctor ID, Date, and Time are required' }, { status: 400 });
    }

    const [[{ maxId }]] = await pool.query('SELECT MAX(appointment_id) as maxId FROM Appointment');
    const newId = (maxId || 0) + 1;

    await pool.query(
      'INSERT INTO Appointment (appointment_id, patient_id, doctor_id, date, time, status) VALUES (?, ?, ?, ?, ?, ?)',
      [newId, parseInt(patient_id), parseInt(doctor_id), date, time, 'Pending']
    );

    return NextResponse.json({ success: true, appointment_id: newId }, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
       return NextResponse.json({ error: 'Invalid Patient ID or Doctor ID. They must exist in the database.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { appointment_id, status } = body;

    if (!appointment_id || !status) {
      return NextResponse.json({ error: 'Appointment ID and Status are required' }, { status: 400 });
    }

    await pool.query(
      'UPDATE Appointment SET status = ? WHERE appointment_id = ?',
      [status, appointment_id]
    );

    return NextResponse.json({ success: true, message: 'Status updated' });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Failed to update appointment status' }, { status: 500 });
  }
}

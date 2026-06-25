import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q || q.length < 2) {
    return NextResponse.json({ patients: [], doctors: [], appointments: [] });
  }

  try {
    const searchTerm = `%${q}%`;

    // Search Patients
    const [patients] = await pool.query(
      'SELECT patient_id, name FROM Patient WHERE name LIKE ? OR patient_id LIKE ? LIMIT 5',
      [searchTerm, searchTerm]
    );

    // Search Doctors
    const [doctors] = await pool.query(
      'SELECT doctor_id, name, specialization FROM Doctor WHERE name LIKE ? OR specialization LIKE ? LIMIT 5',
      [searchTerm, searchTerm]
    );

    // Search Appointments (joined with patient and doctor names)
    const [appointments] = await pool.query(`
      SELECT a.appointment_id, p.name as patient_name, d.name as doctor_name, a.date
      FROM Appointment a
      JOIN Patient p ON a.patient_id = p.patient_id
      JOIN Doctor d ON a.doctor_id = d.doctor_id
      WHERE p.name LIKE ? OR d.name LIKE ? OR a.status LIKE ?
      LIMIT 5
    `, [searchTerm, searchTerm, searchTerm]);

    // Search Medications
    const [medications] = await pool.query(
      'SELECT medication_id, name, manufacturer FROM Medication WHERE name LIKE ? OR manufacturer LIKE ? LIMIT 5',
      [searchTerm, searchTerm]
    );

    return NextResponse.json({ patients, doctors, appointments, medications });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}

import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  try {
    let query = 'SELECT * FROM Patient';
    let params = [];

    if (search) {
      query += ' WHERE name LIKE ? OR patient_id = ?';
      params.push(`%${search}%`, search);
    }

    query += ' ORDER BY name ASC';
    const [rows] = await pool.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, dob, gender, phone_no, address } = body;

    // Validate required fields
    if (!name || !dob || !gender || !phone_no || !address) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Get max patient_id to auto-increment manually
    const [[{ maxId }]] = await pool.query('SELECT MAX(patient_id) as maxId FROM Patient');
    const newId = (maxId || 0) + 1;

    // Insert new patient
    await pool.query(
      'INSERT INTO Patient (patient_id, name, dob, gender, phone_no, address) VALUES (?, ?, ?, ?, ?, ?)',
      [newId, name, dob, gender, phone_no, address]
    );

    return NextResponse.json({ success: true, patient_id: newId, message: 'Patient added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json({ error: 'Failed to create patient' }, { status: 500 });
  }
}

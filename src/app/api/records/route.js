import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const patient_id = searchParams.get('patient_id');

  try {
    let query = `
      SELECT 
        mr.record_id, mr.record_date, 
        d.name as doctor_name,
        diag.disease, diag.description
      FROM Medical_Record mr
      LEFT JOIN Doctor d ON mr.doctor_id = d.doctor_id
      LEFT JOIN Diagnosis diag ON mr.record_id = diag.record_id
    `;
    let params = [];

    if (patient_id) {
      query += ` WHERE mr.patient_id = ? ORDER BY mr.record_date DESC`;
      params.push(parseInt(patient_id));
    } else {
      query += ` ORDER BY mr.record_date DESC`;
    }

    const [rows] = await pool.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching records:', error);
    return NextResponse.json({ error: 'Failed to fetch medical records' }, { status: 500 });
  }
}

export async function POST(request) {
  const connection = await pool.getConnection();
  try {
    const body = await request.json();
    const { patient_id, doctor_id, disease, description } = body;

    if (!patient_id || !doctor_id || !disease) {
      return NextResponse.json({ error: 'Patient ID, Doctor ID, and Disease are required' }, { status: 400 });
    }

    await connection.beginTransaction();

    // 1. Create Medical Record
    const [[{ maxRecordId }]] = await connection.query('SELECT MAX(record_id) as maxRecordId FROM Medical_Record');
    const newRecordId = (maxRecordId || 0) + 1;
    const currentDate = new Date().toISOString().split('T')[0];

    await connection.query(
      'INSERT INTO Medical_Record (record_id, patient_id, doctor_id, record_date) VALUES (?, ?, ?, ?)',
      [newRecordId, parseInt(patient_id), parseInt(doctor_id), currentDate]
    );

    // 2. Create Diagnosis
    const [[{ maxDiagId }]] = await connection.query('SELECT MAX(diagnosis_id) as maxDiagId FROM Diagnosis');
    const newDiagId = (maxDiagId || 0) + 1;

    await connection.query(
      'INSERT INTO Diagnosis (diagnosis_id, record_id, disease, description) VALUES (?, ?, ?, ?)',
      [newDiagId, newRecordId, disease, description || '']
    );

    await connection.commit();
    return NextResponse.json({ success: true, record_id: newRecordId }, { status: 201 });
  } catch (error) {
    await connection.rollback();
    console.error('Error logging diagnosis:', error);
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
       return NextResponse.json({ error: 'Invalid Patient ID or Doctor ID.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to log diagnosis' }, { status: 500 });
  } finally {
    connection.release();
  }
}

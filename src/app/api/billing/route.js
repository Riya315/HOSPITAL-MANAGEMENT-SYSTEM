import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT b.*, p.name as patient_name
      FROM Billing b
      LEFT JOIN Patient p ON b.patient_id = p.patient_id
      ORDER BY b.bill_date DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching billing:', error);
    return NextResponse.json({ error: 'Failed to fetch billing records' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { patient_id, total_amount } = body;

    if (!patient_id || !total_amount) {
      return NextResponse.json({ error: 'Patient ID and Total Amount are required' }, { status: 400 });
    }

    const [[{ maxId }]] = await pool.query('SELECT MAX(bill_id) as maxId FROM Billing');
    const newId = (maxId || 0) + 1;
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    await pool.query(
      'INSERT INTO Billing (bill_id, patient_id, bill_date, total_amount) VALUES (?, ?, ?, ?)',
      [newId, parseInt(patient_id), currentDate, parseFloat(total_amount)]
    );

    return NextResponse.json({ success: true, bill_id: newId }, { status: 201 });
  } catch (error) {
    console.error('Error generating bill:', error);
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
       return NextResponse.json({ error: 'Invalid Patient ID. Patient must exist in the database.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to generate bill' }, { status: 500 });
  }
}

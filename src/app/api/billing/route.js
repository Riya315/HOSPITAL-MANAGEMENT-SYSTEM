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

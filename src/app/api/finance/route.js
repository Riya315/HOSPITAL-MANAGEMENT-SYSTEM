import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'payment';

  try {
    if (type === 'payment') {
      const [rows] = await pool.query(`
        SELECT p.*, b.patient_id, b.total_amount
        FROM Payment p
        JOIN Billing b ON p.bill_id = b.bill_id
        ORDER BY p.payment_date DESC
      `);
      return NextResponse.json(rows);
    } else if (type === 'insurance') {
      const [rows] = await pool.query(`
        SELECT i.*, p.name as patient_name 
        FROM Insurance i 
        JOIN Patient p ON i.patient_id = p.patient_id 
        ORDER BY i.insurance_id ASC
      `);
      return NextResponse.json(rows);
    }
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return NextResponse.json({ error: `Failed to fetch ${type}` }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    if (type === 'payment') {
      const [[{ maxId }]] = await pool.query('SELECT MAX(payment_id) as maxId FROM Payment');
      const newId = (maxId || 0) + 1;
      const currentDate = new Date().toISOString().split('T')[0];
      await pool.query(
        'INSERT INTO Payment (payment_id, bill_id, mode, payment_date) VALUES (?, ?, ?, ?)',
        [newId, parseInt(data.bill_id), data.payment_method || 'Cash', currentDate]
      );
      return NextResponse.json({ success: true }, { status: 201 });
    } 
    else if (type === 'insurance') {
      const [[{ maxId }]] = await pool.query('SELECT MAX(insurance_id) as maxId FROM Insurance');
      const newId = (maxId || 0) + 1;
      await pool.query(
        'INSERT INTO Insurance (insurance_id, patient_id, insurance_type, card_no) VALUES (?, ?, ?, ?)',
        [newId, parseInt(data.patient_id), data.insurance_type || 'General', data.card_no || '']
      );
      return NextResponse.json({ success: true }, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating finance detail:', error);
    return NextResponse.json({ error: 'Failed to create record. Verify IDs.' }, { status: 500 });
  }
}

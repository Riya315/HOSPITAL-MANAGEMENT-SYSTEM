import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'medication';

  try {
    if (type === 'medication') {
      const [rows] = await pool.query('SELECT * FROM Medication ORDER BY name ASC');
      return NextResponse.json(rows);
    } else if (type === 'labtest') {
      const [rows] = await pool.query('SELECT * FROM Lab_Test ORDER BY name ASC');
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

    if (type === 'medication') {
      const [[{ maxId }]] = await pool.query('SELECT MAX(medication_id) as maxId FROM Medication');
      const newId = (maxId || 0) + 1;
      await pool.query(
        'INSERT INTO Medication (medication_id, name, manufacturer, cost, stock) VALUES (?, ?, ?, ?, ?)',
        [newId, data.name, data.manufacturer || '', parseFloat(data.cost) || 0, parseInt(data.stock) || 0]
      );
      return NextResponse.json({ success: true, medication_id: newId }, { status: 201 });
    } 
    else if (type === 'labtest') {
      const [[{ maxId }]] = await pool.query('SELECT MAX(test_id) as maxId FROM Lab_Test');
      const newId = (maxId || 0) + 1;
      await pool.query(
        'INSERT INTO Lab_Test (test_id, name, cost) VALUES (?, ?, ?)',
        [newId, data.name, parseFloat(data.cost) || 0]
      );
      return NextResponse.json({ success: true, test_id: newId }, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating inventory record:', error);
    return NextResponse.json({ error: 'Failed to create record.' }, { status: 500 });
  }
}

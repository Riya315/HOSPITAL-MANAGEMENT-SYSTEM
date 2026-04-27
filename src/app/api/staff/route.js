import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'nurse';

  try {
    if (type === 'nurse') {
      const [rows] = await pool.query(`
        SELECT n.*, d.name as department_name 
        FROM Nurse n
        LEFT JOIN Department d ON n.department_id = d.department_id
        ORDER BY n.name ASC
      `);
      return NextResponse.json(rows);
    } else if (type === 'staff') {
      const [rows] = await pool.query(`
        SELECT s.*, d.name as department_name
        FROM Staff s
        LEFT JOIN Department d ON s.department_id = d.department_id
        ORDER BY s.name ASC
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
    const { type, name, phone_no, role, department_id } = body;

    if (!name || !phone_no) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    if (type === 'nurse') {
      const [[{ maxId }]] = await pool.query('SELECT MAX(nurse_id) as maxId FROM Nurse');
      const newId = (maxId || 0) + 1;
      await pool.query(
        'INSERT INTO Nurse (nurse_id, name, phone_no, department_id) VALUES (?, ?, ?, ?)',
        [newId, name, phone_no, department_id ? parseInt(department_id) : null]
      );
      return NextResponse.json({ success: true, nurse_id: newId }, { status: 201 });
    } else {
      const [[{ maxId }]] = await pool.query('SELECT MAX(staff_id) as maxId FROM Staff');
      const newId = (maxId || 0) + 1;
      await pool.query(
        'INSERT INTO Staff (staff_id, name, role, phone_no, department_id) VALUES (?, ?, ?, ?, ?)',
        [newId, name, role || 'General Staff', phone_no, department_id ? parseInt(department_id) : null]
      );
      return NextResponse.json({ success: true, staff_id: newId }, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating staff:', error);
    return NextResponse.json({ error: 'Failed to create staff' }, { status: 500 });
  }
}

import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT d.*, dep.name as department_name 
      FROM Doctor d 
      LEFT JOIN Department dep ON d.department_id = dep.department_id
      ORDER BY d.name ASC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, specialization, phone_no, email, department_id } = body;

    if (!name || !specialization || !phone_no) {
      return NextResponse.json({ error: 'Name, specialization, and phone are required' }, { status: 400 });
    }

    const [[{ maxId }]] = await pool.query('SELECT MAX(doctor_id) as maxId FROM Doctor');
    const newId = (maxId || 0) + 1;
    const deptId = department_id ? parseInt(department_id) : null;

    await pool.query(
      'INSERT INTO Doctor (doctor_id, department_id, name, specialization, phone_no, email) VALUES (?, ?, ?, ?, ?, ?)',
      [newId, deptId, name, specialization, phone_no, email]
    );

    return NextResponse.json({ success: true, doctor_id: newId }, { status: 201 });
  } catch (error) {
    console.error('Error creating doctor:', error);
    
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
       return NextResponse.json({ error: 'Invalid Department ID. This department does not exist.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
  }
}

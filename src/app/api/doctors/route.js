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

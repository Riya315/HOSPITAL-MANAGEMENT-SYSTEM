import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM Staff_Attendance 
      ORDER BY date DESC 
      LIMIT 50
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { staff_id, status, role } = body;

    if (!staff_id || !status || !role) {
      return NextResponse.json({ error: 'Staff ID, Status, and Role are required' }, { status: 400 });
    }

    const currentDate = new Date().toISOString().split('T')[0];

    // Check if attendance already logged for today to prevent duplicates
    const [existing] = await pool.query(
      'SELECT * FROM Staff_Attendance WHERE staff_id = ? AND date = ? AND role = ?',
      [parseInt(staff_id), currentDate, role]
    );

    if (existing.length > 0) {
      // Update existing
      await pool.query(
        'UPDATE Staff_Attendance SET status = ? WHERE staff_id = ? AND date = ? AND role = ?',
        [status, parseInt(staff_id), currentDate, role]
      );
      return NextResponse.json({ success: true, message: 'Attendance updated' });
    }

    await pool.query(
      'INSERT INTO Staff_Attendance (staff_id, date, status, role) VALUES (?, ?, ?, ?)',
      [parseInt(staff_id), currentDate, status, role]
    );

    return NextResponse.json({ success: true, message: 'Attendance logged' }, { status: 201 });
  } catch (error) {
    console.error('Error logging attendance:', error);
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
       return NextResponse.json({ error: 'Invalid Staff ID.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to log attendance' }, { status: 500 });
  }
}

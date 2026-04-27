import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'department';

  try {
    if (type === 'department') {
      const [rows] = await pool.query('SELECT * FROM Department ORDER BY name ASC');
      return NextResponse.json(rows);
    } else if (type === 'room') {
      const [rows] = await pool.query(`
        SELECT r.*, d.name as department_name 
        FROM Rooms r
        LEFT JOIN Department d ON r.room_id = d.department_id
        ORDER BY r.room_id ASC
      `);
      return NextResponse.json(rows);
    } else if (type === 'ambulance') {
      const [rows] = await pool.query('SELECT * FROM Ambulance_Service ORDER BY ambulance_id ASC');
      return NextResponse.json(rows);
    } else if (type === 'bed') {
      const [rows] = await pool.query(`
        SELECT ba.*, r.type as room_type, r.charges
        FROM Bed_Allocation ba
        LEFT JOIN Rooms r ON ba.room_id = r.room_id
        ORDER BY ba.bed_id ASC
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

    if (type === 'department') {
      const [[{ maxId }]] = await pool.query('SELECT MAX(department_id) as maxId FROM Department');
      const newId = (maxId || 0) + 1;
      await pool.query(
        'INSERT INTO Department (department_id, name) VALUES (?, ?)',
        [newId, data.name]
      );
      return NextResponse.json({ success: true, id: newId }, { status: 201 });
    } 
    else if (type === 'room') {
      const [[{ maxId }]] = await pool.query('SELECT MAX(room_id) as maxId FROM Rooms');
      const newId = (maxId || 0) + 1;
      await pool.query(
        'INSERT INTO Rooms (room_id, type, charges) VALUES (?, ?, ?)',
        [newId, data.room_type || 'General', parseFloat(data.charges) || 0]
      );
      return NextResponse.json({ success: true, room_id: newId }, { status: 201 });
    } 
    else if (type === 'bed') {
      const [[{ maxId }]] = await pool.query('SELECT MAX(bed_id) as maxId FROM Bed_Allocation');
      const newId = (maxId || 0) + 1;
      await pool.query(
        'INSERT INTO Bed_Allocation (bed_id, room_id, bed_no, status) VALUES (?, ?, ?, ?)',
        [newId, parseInt(data.room_id), parseInt(data.bed_no), data.status || 'Available']
      );
      return NextResponse.json({ success: true }, { status: 201 });
    }
    else if (type === 'ambulance') {
      const [[{ maxId }]] = await pool.query('SELECT MAX(ambulance_id) as maxId FROM Ambulance_Service');
      const newId = (maxId || 0) + 1;
      await pool.query(
        'INSERT INTO Ambulance_Service (ambulance_id, driver_name, type) VALUES (?, ?, ?)',
        [newId, data.driver_name, data.vehicle_type || 'Standard']
      );
      return NextResponse.json({ success: true }, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating facility:', error);
    return NextResponse.json({ error: 'Failed to create record. Check IDs.' }, { status: 500 });
  }
}

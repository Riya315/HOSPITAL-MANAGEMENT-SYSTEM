import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const table = searchParams.get('table');

  if (!table) {
    return NextResponse.json({ error: 'Table name is required' }, { status: 400 });
  }

  try {
    // Sanitize table name to prevent SQL injection (only allow alphanumeric and underscores)
    if (!/^[a-zA-Z0-9_]+$/.test(table)) {
       return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
    }

    const [rows] = await pool.query(`SELECT * FROM \`${table}\` LIMIT 50`);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(`Error fetching data from ${table}:`, error);
    return NextResponse.json({ error: `Failed to fetch data from ${table}` }, { status: 500 });
  }
}

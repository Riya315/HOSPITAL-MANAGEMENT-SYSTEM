import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [tables] = await pool.query('SHOW TABLES');
    const tableNames = tables.map(t => Object.values(t)[0]);
    
    // Get row counts for each table to make it more useful
    const tableStats = await Promise.all(tableNames.map(async (name) => {
      try {
        const [[{ count }]] = await pool.query(`SELECT COUNT(*) as count FROM \`${name}\``);
        return { name, count };
      } catch (e) {
        return { name, count: 'Error' };
      }
    }));

    return NextResponse.json(tableStats);
  } catch (error) {
    console.error('Error fetching tables:', error);
    return NextResponse.json({ error: 'Failed to fetch database tables' }, { status: 500 });
  }
}

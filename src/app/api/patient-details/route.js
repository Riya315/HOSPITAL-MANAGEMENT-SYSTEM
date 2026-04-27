import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const patient_id = searchParams.get('patient_id');
  const type = searchParams.get('type');

  if (!patient_id || !type) return NextResponse.json({ error: 'Missing params' }, { status: 400 });

  try {
    if (type === 'prescription') {
      // Prescription links via Medical_Record -> record_id
      const [rows] = await pool.query(`
        SELECT p.*, mr.record_date, m.name as medicine_name
        FROM Prescription p
        JOIN Medical_Record mr ON p.record_id = mr.record_id
        LEFT JOIN Medication m ON p.medication_id = m.medication_id
        WHERE mr.patient_id = ?
        ORDER BY mr.record_date DESC
      `, [patient_id]);
      return NextResponse.json(rows);
    } else if (type === 'labtest') {
      // Test results per patient
      const [rows] = await pool.query(`
        SELECT tr.*, lt.name as test_name, lt.cost
        FROM Test_Result tr
        JOIN Lab_Test lt ON tr.test_id = lt.test_id
        WHERE tr.patient_id = ?
        ORDER BY tr.test_date DESC
      `, [patient_id]);
      return NextResponse.json(rows);
    } else if (type === 'admission') {
      // Patient admission history
      const [rows] = await pool.query(`
        SELECT pa.*, ba.bed_no, r.type as room_type, r.charges,
               d.discharge_date, d.remarks
        FROM Patient_Admit pa
        LEFT JOIN Bed_Allocation ba ON pa.bed_id = ba.bed_id
        LEFT JOIN Rooms r ON ba.room_id = r.room_id
        LEFT JOIN Discharge d ON pa.admit_id = d.admit_id
        WHERE pa.patient_id = ?
        ORDER BY pa.admit_date DESC
      `, [patient_id]);
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
    const { type, patient_id, ...data } = body;

    if (type === 'prescription') {
      const [[{ maxId }]] = await pool.query('SELECT MAX(prescription_id) as maxId FROM Prescription');
      const newId = (maxId || 0) + 1;
      await pool.query(
        'INSERT INTO Prescription (prescription_id, record_id, medication_id, dosage, duration) VALUES (?, ?, ?, ?, ?)',
        [newId, parseInt(data.record_id), parseInt(data.medication_id), data.dosage, data.duration || '']
      );
      return NextResponse.json({ success: true }, { status: 201 });
    } 
    else if (type === 'labtest') {
      const [[{ maxId }]] = await pool.query('SELECT MAX(result_id) as maxId FROM Test_Result');
      const newId = (maxId || 0) + 1;
      await pool.query(
        'INSERT INTO Test_Result (result_id, test_id, patient_id, result, test_date) VALUES (?, ?, ?, ?, ?)',
        [newId, parseInt(data.test_id), parseInt(patient_id), data.result || 'Pending', data.test_date]
      );
      return NextResponse.json({ success: true }, { status: 201 });
    }
    else if (type === 'admission') {
      const [[{ maxId }]] = await pool.query('SELECT MAX(admit_id) as maxId FROM Patient_Admit');
      const newId = (maxId || 0) + 1;
      await pool.query(
        'INSERT INTO Patient_Admit (admit_id, patient_id, bed_id, admit_date) VALUES (?, ?, ?, ?)',
        [newId, parseInt(patient_id), parseInt(data.bed_id), data.admit_date]
      );
      // Mark bed as occupied
      await pool.query("UPDATE Bed_Allocation SET status = 'Occupied' WHERE bed_id = ?", [parseInt(data.bed_id)]);
      return NextResponse.json({ success: true }, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating patient detail:', error);
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
       return NextResponse.json({ error: 'Invalid ID reference. Check all IDs exist.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create record.' }, { status: 500 });
  }
}

import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log("Starting seeding...");
    
    // Check if tables exist by doing a simple select
    await pool.query('SELECT 1 FROM Patient LIMIT 1');

    await pool.query('INSERT IGNORE INTO Hospital (hospital_id, name, address, phone_no) VALUES (1, "HMS Pro Hospital", "Main Street, NY", "123-456-7890")');
    
    const departments = [
      [1, 1, 'Cardiology'],
      [2, 1, 'Neurology'],
      [3, 1, 'Pediatrics'],
      [4, 1, 'Orthopedics'],
      [5, 1, 'Dermatology']
    ];
    for (const dept of departments) {
      await pool.query('INSERT IGNORE INTO Department (department_id, hospital_id, name) VALUES (?, ?, ?)', dept);
    }

    const doctors = [
      [1, 1, 'Dr. John Doe', 'Cardiologist', '555-0101', 'john@hms.com'],
      [2, 2, 'Dr. Jane Smith', 'Neurologist', '555-0102', 'jane@hms.com'],
      [3, 3, 'Dr. Robert Brown', 'Pediatrician', '555-0103', 'robert@hms.com'],
      [4, 4, 'Dr. Sarah Wilson', 'Orthopedic Surgeon', '555-0104', 'sarah@hms.com']
    ];
    for (const doc of doctors) {
      await pool.query('INSERT IGNORE INTO Doctor (doctor_id, department_id, name, specialization, phone_no, email) VALUES (?, ?, ?, ?, ?, ?)', doc);
    }

    const patients = [
      [1, 'Alice Johnson', '1990-05-15', 'Female', '555-0201', '123 Apple St'],
      [2, 'Bob Miller', '1985-11-22', 'Male', '555-0202', '456 Orange Ave'],
      [3, 'Charlie Davis', '1978-03-30', 'Male', '555-0203', '789 Berry Blvd'],
      [4, 'Diana Prince', '1995-07-12', 'Female', '555-0204', '101 Pine Rd']
    ];
    for (const patient of patients) {
      await pool.query('INSERT IGNORE INTO Patient (patient_id, name, dob, gender, phone_no, address) VALUES (?, ?, ?, ?, ?, ?)', patient);
    }

    const statuses = ['Completed', 'Pending', 'Confirmed', 'Cancelled'];
    
    for (let i = 0; i < 20; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (i % 7)); 
      const dateString = date.toISOString().split('T')[0];
      const timeString = `${10 + (i % 5)}:00:00`;
      
      const pId = (i % 4) + 1;
      const dId = (i % 4) + 1;
      const status = statuses[i % 4];
      const aptId = 1000 + i;

      await pool.query('INSERT IGNORE INTO Appointment (appointment_id, patient_id, doctor_id, date, time, status) VALUES (?, ?, ?, ?, ?, ?)', 
        [aptId, pId, dId, dateString, timeString, status]);

      if (i % 2 === 0) {
        const amount = 500 + (Math.random() * 2000);
        const bId = 1000 + i;
        await pool.query('INSERT IGNORE INTO Billing (bill_id, patient_id, bill_date, total_amount) VALUES (?, ?, ?, ?)', 
          [bId, pId, dateString, amount]);
      }
    }

    console.log("Seeding completed successfully");
    return NextResponse.json({ success: true, message: 'Database seeded successfully!' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}

const mysql = require('mysql2/promise');

async function seed() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'student',
      database: 'HOSPITAL_HMS'
    });
    console.log("Connected for seeding...");

    // 1. Basic entities
    await connection.query('INSERT IGNORE INTO Hospital (hospital_id, name, address, phone_no) VALUES (1, "HMS Pro Hospital", "Main Street, NY", "123-456-7890")');
    
    const departments = [
      [1, 1, 'Cardiology'],
      [2, 1, 'Neurology'],
      [3, 1, 'Pediatrics'],
      [4, 1, 'Orthopedics'],
      [5, 1, 'Dermatology']
    ];
    for (const dept of departments) {
      await connection.query('INSERT IGNORE INTO Department (department_id, hospital_id, name) VALUES (?, ?, ?)', dept);
    }

    const doctors = [
      [1, 1, 'Dr. John Doe', 'Cardiologist', '555-0101', 'john@hms.com'],
      [2, 2, 'Dr. Jane Smith', 'Neurologist', '555-0102', 'jane@hms.com'],
      [3, 3, 'Dr. Robert Brown', 'Pediatrician', '555-0103', 'robert@hms.com'],
      [4, 4, 'Dr. Sarah Wilson', 'Orthopedic Surgeon', '555-0104', 'sarah@hms.com']
    ];
    for (const doc of doctors) {
      await connection.query('INSERT IGNORE INTO Doctor (doctor_id, department_id, name, specialization, phone_no, email) VALUES (?, ?, ?, ?, ?, ?)', doc);
    }

    const patients = [
      [1, 'Alice Johnson', '1990-05-15', 'Female', '555-0201', '123 Apple St'],
      [2, 'Bob Miller', '1985-11-22', 'Male', '555-0202', '456 Orange Ave'],
      [3, 'Charlie Davis', '1978-03-30', 'Male', '555-0203', '789 Berry Blvd'],
      [4, 'Diana Prince', '1995-07-12', 'Female', '555-0204', '101 Pine Rd']
    ];
    for (const patient of patients) {
      await connection.query('INSERT IGNORE INTO Patient (patient_id, name, dob, gender, phone_no, address) VALUES (?, ?, ?, ?, ?, ?)', patient);
    }

    // 2. Clear previous seed data to avoid conflicts if needed
    // await connection.query('DELETE FROM Appointment WHERE appointment_id >= 1000');
    // await connection.query('DELETE FROM Billing WHERE bill_id >= 1000');

    const statuses = ['Completed', 'Pending', 'Confirmed', 'Cancelled'];
    
    // Generate 40 appointments over 7 days
    for (let i = 0; i < 40; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (i % 7)); 
      const dateString = date.toISOString().split('T')[0];
      
      // Ensure unique time slots per doctor per day
      // 4 doctors, so for each day, i%7 is the same. i/7 is 0..5
      const hour = 9 + Math.floor(i / 7); 
      const minute = (i % 4) * 15;
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
      
      const pId = (i % 4) + 1;
      const dId = (i % 4) + 1;
      const status = statuses[i % 4];
      const aptId = 2000 + i;

      try {
        await connection.query('INSERT IGNORE INTO Appointment (appointment_id, patient_id, doctor_id, date, time, status) VALUES (?, ?, ?, ?, ?, ?)', 
          [aptId, pId, dId, dateString, timeString, status]);
      } catch (e) {
        // Skip duplicates if they happen
      }

      if (i % 2 === 0) {
        const amount = 800 + (Math.random() * 3000);
        const bId = 2000 + i;
        await connection.query('INSERT IGNORE INTO Billing (bill_id, patient_id, bill_date, total_amount) VALUES (?, ?, ?, ?)', 
          [bId, pId, dateString, amount]);
      }
    }

    console.log("Seeding completed successfully!");
    await connection.end();
  } catch (err) {
    console.error("Seeding failed:", err.message);
  }
}

seed();

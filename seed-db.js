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
    
    // 3. Inventory & Facilities
    await connection.query('INSERT IGNORE INTO Medication (medication_id, name, manufacturer, cost, stock) VALUES (1, "Paracetamol", "PharmaCorp", 5.00, 100), (2, "Amoxicillin", "HealthMed", 15.50, 2), (3, "Ibuprofen", "PharmaCorp", 8.00, 1)');
    await connection.query('INSERT IGNORE INTO Rooms (room_id, type, charges) VALUES (1, "General", 500.00), (2, "Private", 2000.00)');
    await connection.query('INSERT IGNORE INTO Bed_Allocation (bed_id, room_id, bed_no, status) VALUES (1, 1, 101, "Occupied"), (2, 1, 102, "Occupied"), (3, 1, 103, "Available")');

    // 4. Staff & Services
    const staff = [
      [1, 1, 'Mark Wilson', 'Technician', '555-0301'],
      [2, 2, 'Sarah Jenkins', 'Receptionist', '555-0302'],
      [3, 3, 'David Lee', 'Lab Assistant', '555-0303']
    ];
    for (const s of staff) {
      await connection.query('INSERT IGNORE INTO Staff (staff_id, department_id, name, role, phone_no) VALUES (?, ?, ?, ?, ?)', s);
    }

    const labTests = [
      [1, 'Blood Test', 500.00],
      [2, 'X-Ray', 1200.00],
      [3, 'MRI Scan', 5000.00]
    ];
    for (const test of labTests) {
      await connection.query('INSERT IGNORE INTO Lab_Test (test_id, name, cost) VALUES (?, ?, ?)', test);
    }

    await connection.query('INSERT IGNORE INTO Patient_Admit (admit_id, patient_id, bed_id, admit_date) VALUES (1, 1, 1, CURDATE()), (2, 2, 2, CURDATE())');
    
    await connection.query('INSERT IGNORE INTO Ambulance_Service (ambulance_id, driver_name, hospital_id, type) VALUES (1, "John Driver", 1, "Basic"), (2, "Mike Speed", 1, "Advanced")');
    
    await connection.query('INSERT IGNORE INTO Insurance (insurance_id, patient_id, insurance_type, card_no) VALUES (1, 1, ' + connection.escape('Health Plus') + ', "HP12345"), (2, 2, ' + connection.escape('Life Care') + ', "LC67890")');

    console.log("Seeding completed successfully!");
    await connection.end();
  } catch (err) {
    console.error("Seeding failed:", err.message);
  }
}

seed();

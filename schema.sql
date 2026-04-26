CREATE DATABASE IF NOT EXISTS HOSPITAL_HMS;
USE HOSPITAL_HMS;

CREATE TABLE IF NOT EXISTS Hospital (
    hospital_id INT PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(200),
    phone_no VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS Department (
    department_id INT PRIMARY KEY,
    hospital_id INT,
    name VARCHAR(100),
    FOREIGN KEY (hospital_id) REFERENCES Hospital(hospital_id)
);

CREATE TABLE IF NOT EXISTS Staff (
    staff_id INT PRIMARY KEY,
    department_id INT,
    name VARCHAR(100),
    role VARCHAR(50),
    phone_no VARCHAR(15),
    FOREIGN KEY (department_id) REFERENCES Department(department_id)
);

CREATE TABLE IF NOT EXISTS Doctor (
    doctor_id INT PRIMARY KEY,
    department_id INT,
    name VARCHAR(100),
    specialization VARCHAR(100),
    phone_no VARCHAR(15),
    email VARCHAR(100),
    FOREIGN KEY (department_id) REFERENCES Department(department_id)
);

CREATE TABLE IF NOT EXISTS Nurse (
    nurse_id INT PRIMARY KEY,
    department_id INT,
    name VARCHAR(100),
    phone_no VARCHAR(15),
    FOREIGN KEY (department_id) REFERENCES Department(department_id)
);

CREATE TABLE IF NOT EXISTS Patient (
    patient_id INT PRIMARY KEY,
    name VARCHAR(100),
    dob DATE,
    gender VARCHAR(10),
    phone_no VARCHAR(15),
    address VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS Appointment (
    appointment_id INT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    date DATE,
    time TIME,
    status VARCHAR(50) DEFAULT 'Pending',
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id)
);

CREATE TABLE IF NOT EXISTS Medical_Record (
    record_id INT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    record_date DATE,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES Doctor(doctor_id)
);

CREATE TABLE IF NOT EXISTS Diagnosis (
    diagnosis_id INT PRIMARY KEY,
    record_id INT,
    disease VARCHAR(100),
    description VARCHAR(200),
    FOREIGN KEY (record_id) REFERENCES Medical_Record(record_id)
);

CREATE TABLE IF NOT EXISTS Medication (
    medication_id INT PRIMARY KEY,
    name VARCHAR(100),
    manufacturer VARCHAR(100),
    cost DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS Prescription (
    prescription_id INT PRIMARY KEY,
    record_id INT,
    medication_id INT,
    dosage VARCHAR(50),
    duration VARCHAR(50),
    FOREIGN KEY (record_id) REFERENCES Medical_Record(record_id),
    FOREIGN KEY (medication_id) REFERENCES Medication(medication_id)
);

CREATE TABLE IF NOT EXISTS Lab_Test (
    test_id INT PRIMARY KEY,
    name VARCHAR(100),
    cost DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS Test_Result (
    result_id INT PRIMARY KEY,
    test_id INT,
    patient_id INT,
    result VARCHAR(200),
    test_date DATE,
    FOREIGN KEY (test_id) REFERENCES Lab_Test(test_id),
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
);

CREATE TABLE IF NOT EXISTS Rooms (
    room_id INT PRIMARY KEY,
    type VARCHAR(50),
    charges DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS Bed_Allocation (
    bed_id INT PRIMARY KEY,
    room_id INT,
    bed_no INT,
    status VARCHAR(50),
    FOREIGN KEY (room_id) REFERENCES Rooms(room_id)
);

CREATE TABLE IF NOT EXISTS Patient_Admit (
    admit_id INT PRIMARY KEY,
    patient_id INT,
    bed_id INT,
    admit_date DATE,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (bed_id) REFERENCES Bed_Allocation(bed_id)
);

CREATE TABLE IF NOT EXISTS Discharge (
    discharge_id INT PRIMARY KEY,
    admit_id INT,
    discharge_date DATE,
    remarks VARCHAR(200),
    FOREIGN KEY (admit_id) REFERENCES Patient_Admit(admit_id)
);

CREATE TABLE IF NOT EXISTS Billing (
    bill_id INT PRIMARY KEY,
    patient_id INT,
    bill_date DATE,
    total_amount DECIMAL(10,2),
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
);

CREATE TABLE IF NOT EXISTS Payment (
    payment_id INT PRIMARY KEY,
    bill_id INT,
    mode VARCHAR(50),
    payment_date DATE,
    FOREIGN KEY (bill_id) REFERENCES Billing(bill_id)
);

CREATE TABLE IF NOT EXISTS Insurance (
    insurance_id INT PRIMARY KEY,
    patient_id INT,
    insurance_type VARCHAR(100),
    card_no VARCHAR(50),
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id)
);

CREATE TABLE IF NOT EXISTS Ambulance_Service (
    ambulance_id INT PRIMARY KEY,
    driver_name VARCHAR(100),
    hospital_id INT,
    type VARCHAR(50),
    FOREIGN KEY (hospital_id) REFERENCES Hospital(hospital_id)
);

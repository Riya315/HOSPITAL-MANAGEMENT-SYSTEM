'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/patients')
      .then(res => res.json())
      .then(data => {
        setPatients(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Patients</h1>
          <p className={styles.subtitle}>Manage hospital patients and records.</p>
        </div>
        <button className={styles.primaryButton}>+ Add Patient</button>
      </header>

      <div className={`glass-card ${styles.tableCard}`}>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="table-container">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Phone No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.length > 0 ? (
                  patients.map((patient) => (
                    <tr key={patient.patient_id}>
                      <td>#{patient.patient_id}</td>
                      <td className={styles.nameCell}>{patient.name}</td>
                      <td>{new Date(patient.dob).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${patient.gender === 'Male' ? 'badge-primary' : 'badge-secondary'}`}>
                          {patient.gender}
                        </span>
                      </td>
                      <td>{patient.phone_no}</td>
                      <td>
                        <button className={styles.actionBtn}>View</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className={styles.emptyState}>No patients found in database.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
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
          <h1 className={styles.title}>Doctors</h1>
          <p className={styles.subtitle}>Medical staff directory and schedules.</p>
        </div>
        <button className={styles.primaryButton}>+ Add Doctor</button>
      </header>

      <div className={styles.doctorsGrid}>
        {loading ? (
          <div className="loader"></div>
        ) : doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor.doctor_id} className={`glass-card ${styles.doctorCard}`}>
              <div className={styles.docHeader}>
                <div className={styles.avatar}>
                  {doctor.name.charAt(0)}
                </div>
                <div>
                  <h3 className={styles.docName}>Dr. {doctor.name}</h3>
                  <p className={styles.docSpec}>{doctor.specialization}</p>
                </div>
              </div>
              <div className={styles.docDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailIcon}>🏥</span>
                  <span>{doctor.department_name || 'General'}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailIcon}>📞</span>
                  <span>{doctor.phone_no}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailIcon}>✉️</span>
                  <span>{doctor.email || 'N/A'}</span>
                </div>
              </div>
              <div className={styles.docActions}>
                <button className={styles.outlineBtn}>View Profile</button>
                <button className={styles.primaryBtnSm}>Schedule</button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No doctors found in database.</p>
          </div>
        )}
      </div>
    </div>
  );
}

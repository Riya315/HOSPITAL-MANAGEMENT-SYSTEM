'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader"></div>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, Admin</h1>
          <p className={styles.subtitle}>Here is what's happening at the hospital today.</p>
        </div>
      </header>

      <div className={styles.statsGrid}>
        <div className={`glass-card ${styles.statCard}`}>
          <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>👥</div>
          <div className={styles.statInfo}>
            <h3>Total Patients</h3>
            <p className={styles.statValue}>{stats?.totalPatients || 0}</p>
          </div>
        </div>
        
        <div className={`glass-card ${styles.statCard}`}>
          <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>🩺</div>
          <div className={styles.statInfo}>
            <h3>Available Doctors</h3>
            <p className={styles.statValue}>{stats?.totalDoctors || 0}</p>
          </div>
        </div>

        <div className={`glass-card ${styles.statCard}`}>
          <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>📅</div>
          <div className={styles.statInfo}>
            <h3>Completed Appointments</h3>
            <p className={styles.statValue}>{stats?.completedAppointments || 0}</p>
          </div>
        </div>

        <div className={`glass-card ${styles.statCard}`}>
          <div className={styles.statIcon} style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>💵</div>
          <div className={styles.statInfo}>
            <h3>Total Revenue</h3>
            <p className={styles.statValue}>₹{stats?.totalRevenue || 0}</p>
          </div>
        </div>
      </div>

      <div className={styles.dashboardContent}>
        <div className={`glass-card ${styles.activityFeed}`}>
          <h2 className={styles.sectionTitle}>Recent Appointments</h2>
          {stats?.recentActivity && stats.recentActivity.length > 0 ? (
            <div className={styles.activityList}>
              {stats.recentActivity.map(activity => (
                <div key={activity.appointment_id} className={styles.activityItem}>
                  <div className={styles.activityIcon}>📅</div>
                  <div className={styles.activityDetails}>
                    <p className={styles.activityText}>
                      <strong>{activity.patient_name || `Patient #${activity.appointment_id}`}</strong> has an appointment with <strong>Dr. {activity.doctor_name}</strong>
                    </p>
                    <p className={styles.activityTime}>
                      {new Date(activity.date).toLocaleDateString()} at {activity.time} • <span className={`badge ${activity.status === 'Completed' ? 'badge-success' : activity.status === 'Cancelled' ? 'badge-danger' : 'badge-warning'}`}>{activity.status}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>No recent activity found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

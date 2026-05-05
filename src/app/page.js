'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, BarChart, Bar 
} from 'recharts';
import Modal from '@/components/Modal';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailModal, setDetailModal] = useState({ isOpen: false, title: '', data: [], type: '' });
  const [detailLoading, setDetailLoading] = useState(false);

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

  const handleDeptClick = async (data) => {
    setDetailLoading(true);
    setDetailModal({ isOpen: true, title: `Doctors in ${data.name}`, data: [], type: 'doctors' });
    try {
      const res = await fetch('/api/doctors');
      const allDoctors = await res.json();
      const filtered = allDoctors.filter(d => d.department_name === data.name);
      setDetailModal(prev => ({ ...prev, data: filtered }));
    } catch (err) { console.error(err); }
    finally { setDetailLoading(false); }
  };

  const handleStatusClick = async (data) => {
    setDetailLoading(true);
    setDetailModal({ isOpen: true, title: `${data.name} Appointments`, data: [], type: 'appointments' });
    try {
      const res = await fetch('/api/appointments');
      const allApts = await res.json();
      const filtered = allApts.filter(a => a.status === data.name);
      setDetailModal(prev => ({ ...prev, data: filtered }));
    } catch (err) { console.error(err); }
    finally { setDetailLoading(false); }
  };

  const handleTrendClick = async (data, type) => {
    if (!data || !data.activePayload || data.activePayload.length === 0) return;
    const payload = data.activePayload[0].payload;
    const clickedDate = payload.date;
    const formattedDate = new Date(clickedDate).toLocaleDateString();
    
    setDetailLoading(true);
    setDetailModal({ 
      isOpen: true, 
      title: `${type === 'billing' ? 'Billing' : 'Appointments'} on ${formattedDate}`, 
      data: [], 
      type: type 
    });

    try {
      const res = await fetch(type === 'billing' ? '/api/billing' : '/api/appointments');
      const allRecords = await res.json();
      const filtered = allRecords.filter(r => {
        const rDate = type === 'billing' ? r.bill_date : r.date;
        return new Date(rDate).toDateString() === new Date(clickedDate).toDateString();
      });
      setDetailModal(prev => ({ ...prev, data: filtered }));
    } catch (err) { console.error(err); }
    finally { setDetailLoading(false); }
  };

  if (loading) return <div className="loader"></div>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, Admin</h1>
          <p className={styles.subtitle}>Here is what's happening at the hospital today.</p>
        </div>
      </header>

      {/* SMART ALERTS */}
      {stats?.alerts && stats.alerts.length > 0 && (
        <div className={styles.alertsContainer}>
          {stats.alerts.map((alert, index) => (
            <div key={index} className={`${styles.alertBox} ${styles[alert.type]}`}>
              <div className={styles.alertIcon}>{alert.icon}</div>
              <div className={styles.alertMessage}>{alert.message}</div>
            </div>
          ))}
        </div>
      )}

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

      {/* SMART TRIAGE (Critical Patients) */}
      {stats?.smartTriage && stats.smartTriage.length > 0 && (
        <section>
          <h2 className={styles.sectionTitle} style={{color: '#ef4444'}}>
            <span style={{marginRight: '8px'}}>🚨</span> 
            Smart Triage: Priority Patients
          </h2>
          <div className={styles.triageGrid}>
            {stats.smartTriage.map((patient, idx) => (
              <div key={idx} className={styles.triageCard}>
                <div className={styles.triageHeader}>
                  <div>
                    <div className={styles.triageName}>{patient.name}</div>
                    <div className={styles.triageDetails}>ID: #{patient.patient_id} • Age: {patient.age} • {patient.gender}</div>
                  </div>
                  <div className={styles.triageScore}>Priority: {idx + 1}</div>
                </div>
                
                <div style={{marginTop: '4px'}}>
                  <strong style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>Latest Diagnosis:</strong>
                  <p style={{fontSize: '0.9rem', color: 'var(--text-primary)', marginTop: '2px'}}>{patient.disease}</p>
                </div>

                <div className={styles.triageReasons}>
                  {patient.reasons.map((r, i) => (
                    <span key={i} className={styles.triageReasonBadge}>{r}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className={styles.chartGrid}>
        <div className={`glass-card ${styles.chartCard}`}>
          <h2 className={styles.sectionTitle}>Appointments Trend</h2>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={stats?.appointmentTrends}
                onClick={(data) => handleTrendClick(data, 'appointments')}
                style={{ cursor: 'pointer' }}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="date" 
                  stroke="#94a3b8" 
                  tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, {day:'numeric', month:'short'})}
                />
                <YAxis stroke="#94a3b8" allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Legend />
                <Bar 
                  dataKey="count" 
                  name="Appointments" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`glass-card ${styles.chartCard}`}>
          <h2 className={styles.sectionTitle}>Appointment Status</h2>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.statusDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar 
                  dataKey="value" 
                  name="Total" 
                  onClick={handleStatusClick}
                  style={{ cursor: 'pointer' }}
                >
                  {stats?.statusDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={styles.chartGrid}>
        <div className={`glass-card ${styles.chartCard}`}>
          <h2 className={styles.sectionTitle}>Revenue Trends (Last 7 Days)</h2>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={stats?.revenueTrends}
                onClick={(data) => handleTrendClick(data, 'billing')}
                style={{ cursor: 'pointer' }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="date" 
                  stroke="#94a3b8" 
                  tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, {day:'numeric', month:'short'})}
                />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Legend />
                <Line type="monotone" dataKey="amount" name="Revenue (₹)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`glass-card ${styles.chartCard}`}>
          <h2 className={styles.sectionTitle}>Department Distribution</h2>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.deptDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  onClick={handleDeptClick}
                  style={{ cursor: 'pointer' }}
                >
                  {stats?.deptDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <section className={styles.quickActions}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionGrid}>
          <Link href="/patients" className={styles.actionCard}>
            <div className={styles.actionIcon}>👤</div>
            <div>
              <div className={styles.actionTitle}>New Registration</div>
              <div className={styles.actionDesc}>Register a new patient to the system</div>
            </div>
          </Link>

          <Link href="/appointments" className={styles.actionCard}>
            <div className={styles.actionIcon}>📅</div>
            <div>
              <div className={styles.actionTitle}>Schedule Appointment</div>
              <div className={styles.actionDesc}>Book a new slot with a specialist</div>
            </div>
          </Link>

          <Link href="/billing" className={styles.actionCard}>
            <div className={styles.actionIcon}>💳</div>
            <div>
              <div className={styles.actionTitle}>Generate Bill</div>
              <div className={styles.actionDesc}>Process payments and invoices</div>
            </div>
          </Link>

          <Link href="/patients" className={styles.actionCard}>
            <div className={styles.actionIcon}>🔬</div>
            <div>
              <div className={styles.actionTitle}>Add Lab Result</div>
              <div className={styles.actionDesc}>Upload results to patient records</div>
            </div>
          </Link>
        </div>
      </section>

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

      <Modal 
        isOpen={detailModal.isOpen} 
        onClose={() => setDetailModal({ ...detailModal, isOpen: false })}
        title={detailModal.title}
      >
        {detailLoading ? <div className="loader"></div> : (
          <div className="table-container">
            {detailModal.type === 'doctors' && (
              <table className="premium-table">
                <thead><tr><th>Name</th><th>Specialization</th><th>Phone</th></tr></thead>
                <tbody>
                  {detailModal.data.map(d => (
                    <tr key={d.doctor_id}><td>{d.name}</td><td>{d.specialization}</td><td>{d.phone_no}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
            {detailModal.type === 'appointments' && (
              <table className="premium-table">
                <thead><tr><th>Patient</th><th>Doctor</th><th>Date</th></tr></thead>
                <tbody>
                  {detailModal.data.map(a => (
                    <tr key={a.appointment_id}><td>{a.patient_name}</td><td>{a.doctor_name}</td><td>{new Date(a.date).toLocaleDateString()}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
            {detailModal.type === 'billing' && (
              <table className="premium-table">
                <thead><tr><th>Bill ID</th><th>Patient</th><th>Amount</th></tr></thead>
                <tbody>
                  {detailModal.data.map(b => (
                    <tr key={b.bill_id}><td>#{b.bill_id}</td><td>{b.patient_name}</td><td>₹{parseFloat(b.total_amount).toFixed(2)}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
            {detailModal.data.length === 0 && <p className={styles.emptyState}>No records found.</p>}
          </div>
        )}
      </Modal>
    </div>
  );
}

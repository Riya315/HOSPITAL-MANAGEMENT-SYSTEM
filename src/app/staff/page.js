'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Modal from '@/components/Modal';

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState('nurses');
  const [nurses, setNurses] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [staffForm, setStaffForm] = useState({ type: 'nurse', name: '', phone_no: '', role: '', department_id: '' });

  useEffect(() => { fetchData(); }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'nurses') {
        const res = await fetch('/api/staff?type=nurse');
        const data = await res.json();
        setNurses(Array.isArray(data) ? data : []);
      } else {
        const res = await fetch('/api/staff?type=staff');
        const data = await res.json();
        setStaff(Array.isArray(data) ? data : []);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault(); setIsSubmitting(true);
    try {
      const res = await fetch('/api/staff', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(staffForm) });
      if (res.ok) {
        setIsAddStaffOpen(false);
        setStaffForm({ type: 'nurse', name: '', phone_no: '', role: '', department_id: '' });
        fetchData();
      } else alert('Error: ' + (await res.json()).error);
    } catch { alert('Failed to add staff'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Staff Directory</h1>
          <p className={styles.subtitle}>Manage nurses and hospital support staff.</p>
        </div>
        <button className={styles.primaryButton} onClick={() => setIsAddStaffOpen(true)}>+ Add Staff</button>
      </header>

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${activeTab === 'nurses' ? styles.activeTab : ''}`} onClick={() => setActiveTab('nurses')}>Nurses</button>
          <button className={`${styles.tab} ${activeTab === 'staff' ? styles.activeTab : ''}`} onClick={() => setActiveTab('staff')}>Support Staff</button>
        </div>
      </div>

      <div className={`glass-card ${styles.tableCard}`}>
        {loading ? <div className="loader"></div> : (
          <div className="table-container">
            {activeTab === 'nurses' && (
              <table className="premium-table">
                <thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Phone No</th></tr></thead>
                <tbody>
                  {nurses.map(n => (
                    <tr key={n.nurse_id}>
                      <td>#{n.nurse_id}</td>
                      <td className={styles.strongText}>{n.name}</td>
                      <td>{n.department_name || 'General'}</td>
                      <td>{n.phone_no}</td>
                    </tr>
                  ))}
                  {nurses.length === 0 && <tr><td colSpan="4" className={styles.emptyState}>No nurses found.</td></tr>}
                </tbody>
              </table>
            )}
            {activeTab === 'staff' && (
              <table className="premium-table">
                <thead><tr><th>ID</th><th>Name</th><th>Role</th><th>Department</th><th>Phone No</th></tr></thead>
                <tbody>
                  {staff.map(s => (
                    <tr key={s.staff_id}>
                      <td>#{s.staff_id}</td>
                      <td className={styles.strongText}>{s.name}</td>
                      <td><span className="badge badge-secondary">{s.role}</span></td>
                      <td>{s.department_name || 'General'}</td>
                      <td>{s.phone_no}</td>
                    </tr>
                  ))}
                  {staff.length === 0 && <tr><td colSpan="5" className={styles.emptyState}>No staff found.</td></tr>}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      <Modal isOpen={isAddStaffOpen} onClose={() => setIsAddStaffOpen(false)} title="Add New Staff">
        <form onSubmit={handleAddStaff}>
          <div className="form-group">
            <label>Staff Type</label>
            <select className="form-input" value={staffForm.type} onChange={e => setStaffForm({...staffForm, type: e.target.value})}>
              <option value="nurse">Nurse</option>
              <option value="staff">Support Staff</option>
            </select>
          </div>
          <div className="form-group"><label>Full Name</label><input type="text" required className="form-input" value={staffForm.name} onChange={e => setStaffForm({...staffForm, name: e.target.value})}/></div>
          <div className="form-group"><label>Phone Number</label><input type="tel" required className="form-input" value={staffForm.phone_no} onChange={e => setStaffForm({...staffForm, phone_no: e.target.value})}/></div>
          {staffForm.type === 'staff' && (
            <div className="form-group"><label>Role</label><input type="text" required className="form-input" placeholder="e.g. Cleaner, Security" value={staffForm.role} onChange={e => setStaffForm({...staffForm, role: e.target.value})}/></div>
          )}
          <div className="form-group"><label>Department ID (Optional)</label><input type="number" className="form-input" value={staffForm.department_id} onChange={e => setStaffForm({...staffForm, department_id: e.target.value})}/></div>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Add Staff'}</button>
        </form>
      </Modal>
    </div>
  );
}

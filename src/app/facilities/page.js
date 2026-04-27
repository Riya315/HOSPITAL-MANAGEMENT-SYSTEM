'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Modal from '@/components/Modal';

export default function FacilitiesPage() {
  const [activeTab, setActiveTab] = useState('departments');
  const [departments, setDepartments] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [beds, setBeds] = useState([]);
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deptForm, setDeptForm] = useState({ name: '' });
  const [roomForm, setRoomForm] = useState({ room_type: 'General', charges: '' });
  const [bedForm, setBedForm] = useState({ room_id: '', bed_no: '', status: 'Available' });
  const [ambulanceForm, setAmbulanceForm] = useState({ driver_name: '', vehicle_type: 'Standard' });

  useEffect(() => { fetchData(); }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'departments') {
        const res = await fetch('/api/facilities?type=department');
        const data = await res.json();
        setDepartments(Array.isArray(data) ? data : []);
      } else if (activeTab === 'rooms') {
        const res = await fetch('/api/facilities?type=room');
        const data = await res.json();
        setRooms(Array.isArray(data) ? data : []);
      } else if (activeTab === 'beds') {
        const res = await fetch('/api/facilities?type=bed');
        const data = await res.json();
        setBeds(Array.isArray(data) ? data : []);
      } else if (activeTab === 'ambulances') {
        const res = await fetch('/api/facilities?type=ambulance');
        const data = await res.json();
        setAmbulances(Array.isArray(data) ? data : []);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setIsSubmitting(true);
    let payload = { type: activeTab === 'beds' ? 'bed' : activeTab === 'departments' ? 'department' : activeTab === 'rooms' ? 'room' : 'ambulance' };
    if (activeTab === 'departments') payload = { ...payload, ...deptForm };
    else if (activeTab === 'rooms') payload = { ...payload, ...roomForm };
    else if (activeTab === 'beds') payload = { ...payload, ...bedForm };
    else if (activeTab === 'ambulances') payload = { ...payload, ...ambulanceForm };

    try {
      const res = await fetch('/api/facilities', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res.ok) { setIsAddModalOpen(false); fetchData(); }
      else alert('Error: ' + (await res.json()).error);
    } catch { alert('Failed to save.'); }
    finally { setIsSubmitting(false); }
  };

  const tabLabel = activeTab === 'departments' ? 'Department' : activeTab === 'rooms' ? 'Room' : activeTab === 'beds' ? 'Bed' : 'Ambulance';

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Facilities & Transport</h1>
          <p className={styles.subtitle}>Manage departments, rooms, beds, and ambulances.</p>
        </div>
        <button className={styles.primaryButton} onClick={() => setIsAddModalOpen(true)}>+ Add {tabLabel}</button>
      </header>

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {['departments','rooms','beds','ambulances'].map(t => (
            <button key={t} className={`${styles.tab} ${activeTab === t ? styles.activeTab : ''}`} onClick={() => setActiveTab(t)}>
              {t === 'departments' ? 'Departments' : t === 'rooms' ? 'Rooms' : t === 'beds' ? 'Bed Allocation' : 'Ambulances'}
            </button>
          ))}
        </div>
      </div>

      <div className={`glass-card ${styles.tableCard}`}>
        {loading ? <div className="loader"></div> : (
          <div className="table-container">

            {activeTab === 'departments' && (
              <table className="premium-table">
                <thead><tr><th>ID</th><th>Department Name</th><th>Hospital</th></tr></thead>
                <tbody>
                  {departments.map(d => (
                    <tr key={d.department_id}><td>#{d.department_id}</td><td className={styles.strongText}>{d.name}</td><td>#{d.hospital_id || 'N/A'}</td></tr>
                  ))}
                  {departments.length === 0 && <tr><td colSpan="3" className={styles.emptyState}>No departments found.</td></tr>}
                </tbody>
              </table>
            )}

            {activeTab === 'rooms' && (
              <table className="premium-table">
                <thead><tr><th>Room ID</th><th>Type</th><th>Charges per Day (₹)</th></tr></thead>
                <tbody>
                  {rooms.map(r => (
                    <tr key={r.room_id}><td>#{r.room_id}</td><td><span className="badge badge-primary">{r.type}</span></td><td>₹{parseFloat(r.charges || 0).toFixed(2)}</td></tr>
                  ))}
                  {rooms.length === 0 && <tr><td colSpan="3" className={styles.emptyState}>No rooms found.</td></tr>}
                </tbody>
              </table>
            )}

            {activeTab === 'beds' && (
              <table className="premium-table">
                <thead><tr><th>Bed ID</th><th>Room ID</th><th>Bed No</th><th>Status</th></tr></thead>
                <tbody>
                  {beds.map(b => (
                    <tr key={b.bed_id}>
                      <td>#{b.bed_id}</td><td>Room #{b.room_id}</td><td>{b.bed_no}</td>
                      <td><span className={`badge ${b.status === 'Available' ? 'badge-success' : 'badge-danger'}`}>{b.status}</span></td>
                    </tr>
                  ))}
                  {beds.length === 0 && <tr><td colSpan="4" className={styles.emptyState}>No beds found.</td></tr>}
                </tbody>
              </table>
            )}

            {activeTab === 'ambulances' && (
              <table className="premium-table">
                <thead><tr><th>ID</th><th>Driver Name</th><th>Type</th><th>Hospital</th></tr></thead>
                <tbody>
                  {ambulances.map(a => (
                    <tr key={a.ambulance_id}><td>#{a.ambulance_id}</td><td className={styles.strongText}>{a.driver_name}</td><td>{a.type}</td><td>#{a.hospital_id || 'N/A'}</td></tr>
                  ))}
                  {ambulances.length === 0 && <tr><td colSpan="4" className={styles.emptyState}>No ambulances found.</td></tr>}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={`Add New ${tabLabel}`}>
        <form onSubmit={handleSubmit}>
          {activeTab === 'departments' && (
            <div className="form-group"><label>Department Name</label><input type="text" required className="form-input" value={deptForm.name} onChange={e => setDeptForm({ name: e.target.value })}/></div>
          )}
          {activeTab === 'rooms' && (<>
            <div className="form-group"><label>Room Type</label>
              <select className="form-input" value={roomForm.room_type} onChange={e => setRoomForm({...roomForm, room_type: e.target.value})}>
                <option value="General">General</option><option value="ICU">ICU</option><option value="Private">Private</option><option value="Semi-Private">Semi-Private</option>
              </select>
            </div>
            <div className="form-group"><label>Charges Per Day (₹)</label><input type="number" step="0.01" required className="form-input" value={roomForm.charges} onChange={e => setRoomForm({...roomForm, charges: e.target.value})}/></div>
          </>)}
          {activeTab === 'beds' && (<>
            <div className="form-group"><label>Room ID</label><input type="number" required className="form-input" value={bedForm.room_id} onChange={e => setBedForm({...bedForm, room_id: e.target.value})}/></div>
            <div className="form-group"><label>Bed Number</label><input type="number" required className="form-input" value={bedForm.bed_no} onChange={e => setBedForm({...bedForm, bed_no: e.target.value})}/></div>
            <div className="form-group"><label>Status</label>
              <select className="form-input" value={bedForm.status} onChange={e => setBedForm({...bedForm, status: e.target.value})}>
                <option value="Available">Available</option><option value="Occupied">Occupied</option><option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </>)}
          {activeTab === 'ambulances' && (<>
            <div className="form-group"><label>Driver Name</label><input type="text" required className="form-input" value={ambulanceForm.driver_name} onChange={e => setAmbulanceForm({...ambulanceForm, driver_name: e.target.value})}/></div>
            <div className="form-group"><label>Ambulance Type</label>
              <select className="form-input" value={ambulanceForm.vehicle_type} onChange={e => setAmbulanceForm({...ambulanceForm, vehicle_type: e.target.value})}>
                <option value="Standard">Standard</option><option value="ICU Mobile">ICU Mobile</option><option value="Neonatal">Neonatal</option>
              </select>
            </div>
          </>)}
          <button type="submit" className="submit-btn" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : `Add ${tabLabel}`}</button>
        </form>
      </Modal>
    </div>
  );
}

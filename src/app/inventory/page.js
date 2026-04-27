'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Modal from '@/components/Modal';

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('medication');
  const [medications, setMedications] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [medForm, setMedForm] = useState({ name: '', manufacturer: '', cost: '' });
  const [labForm, setLabForm] = useState({ name: '', cost: '' });

  useEffect(() => { fetchData(); }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'medication') {
        const res = await fetch('/api/inventory?type=medication');
        const data = await res.json();
        setMedications(Array.isArray(data) ? data : []);
      } else {
        const res = await fetch('/api/inventory?type=labtest');
        const data = await res.json();
        setLabTests(Array.isArray(data) ? data : []);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setIsSubmitting(true);
    const payload = activeTab === 'medication'
      ? { type: 'medication', ...medForm }
      : { type: 'labtest', ...labForm };
    try {
      const res = await fetch('/api/inventory', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res.ok) {
        setIsAddModalOpen(false);
        setMedForm({ name: '', manufacturer: '', cost: '' });
        setLabForm({ name: '', cost: '' });
        fetchData();
      } else alert('Error: ' + (await res.json()).error);
    } catch { alert('Failed to save.'); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Pharmacy & Labs</h1>
          <p className={styles.subtitle}>Manage medicines, lab tests, and medical inventory.</p>
        </div>
        <button className={styles.primaryButton} onClick={() => setIsAddModalOpen(true)}>
          + {activeTab === 'medication' ? 'Add Medicine' : 'Add Lab Test'}
        </button>
      </header>

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${activeTab === 'medication' ? styles.activeTab : ''}`} onClick={() => setActiveTab('medication')}>Medications</button>
          <button className={`${styles.tab} ${activeTab === 'labtest' ? styles.activeTab : ''}`} onClick={() => setActiveTab('labtest')}>Lab Tests</button>
        </div>
      </div>

      <div className={`glass-card ${styles.tableCard}`}>
        {loading ? <div className="loader"></div> : (
          <div className="table-container">
            {activeTab === 'medication' && (
              <table className="premium-table">
                <thead><tr><th>ID</th><th>Medicine Name</th><th>Manufacturer</th><th>Cost (₹)</th></tr></thead>
                <tbody>
                  {medications.map(m => (
                    <tr key={m.medication_id}>
                      <td>#{m.medication_id}</td>
                      <td className={styles.strongText}>{m.name}</td>
                      <td>{m.manufacturer || 'N/A'}</td>
                      <td>₹{parseFloat(m.cost || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                  {medications.length === 0 && <tr><td colSpan="4" className={styles.emptyState}>No medications found.</td></tr>}
                </tbody>
              </table>
            )}

            {activeTab === 'labtest' && (
              <table className="premium-table">
                <thead><tr><th>Test ID</th><th>Test Name</th><th>Cost (₹)</th></tr></thead>
                <tbody>
                  {labTests.map(t => (
                    <tr key={t.test_id}>
                      <td>#{t.test_id}</td>
                      <td className={styles.strongText}>{t.name}</td>
                      <td>₹{parseFloat(t.cost || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                  {labTests.length === 0 && <tr><td colSpan="3" className={styles.emptyState}>No lab tests found.</td></tr>}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={activeTab === 'medication' ? 'Add New Medicine' : 'Add Lab Test'}>
        <form onSubmit={handleSubmit}>
          {activeTab === 'medication' && (<>
            <div className="form-group"><label>Medicine Name</label><input type="text" required className="form-input" value={medForm.name} onChange={e => setMedForm({...medForm, name: e.target.value})}/></div>
            <div className="form-group"><label>Manufacturer</label><input type="text" className="form-input" value={medForm.manufacturer} onChange={e => setMedForm({...medForm, manufacturer: e.target.value})}/></div>
            <div className="form-group"><label>Cost (₹)</label><input type="number" step="0.01" required className="form-input" value={medForm.cost} onChange={e => setMedForm({...medForm, cost: e.target.value})}/></div>
          </>)}
          {activeTab === 'labtest' && (<>
            <div className="form-group"><label>Test Name</label><input type="text" required className="form-input" value={labForm.name} onChange={e => setLabForm({...labForm, name: e.target.value})}/></div>
            <div className="form-group"><label>Cost (₹)</label><input type="number" step="0.01" required className="form-input" value={labForm.cost} onChange={e => setLabForm({...labForm, cost: e.target.value})}/></div>
          </>)}
          <button type="submit" className="submit-btn" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Record'}</button>
        </form>
      </Modal>
    </div>
  );
}

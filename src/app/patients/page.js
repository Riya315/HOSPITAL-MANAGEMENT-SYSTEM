'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Modal from '@/components/Modal';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // View Profile Tabs
  const [activeProfileTab, setActiveProfileTab] = useState('history');
  
  // Data States
  const [patientRecords, setPatientRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [labResults, setLabResults] = useState([]);
  const [admissions, setAdmissions] = useState([]);

  // Reference Data for Dropdowns
  const [doctors, setDoctors] = useState([]);
  const [medications, setMedications] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [beds, setBeds] = useState([]);

  // Add Data Modals & Forms
  const [isDiagnosisModalOpen, setIsDiagnosisModalOpen] = useState(false);
  const [diagnosisData, setDiagnosisData] = useState({ doctor_id: '', disease: '', description: '' });
  const [isLoggingDiag, setIsLoggingDiag] = useState(false);

  const [isAddDetailOpen, setIsAddDetailOpen] = useState(false);
  const [detailFormType, setDetailFormType] = useState(''); 
  const [detailFormData, setDetailFormData] = useState({});

  const [formData, setFormData] = useState({
    name: '', dob: '', gender: 'Male', phone_no: '', address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search States
  const [patientSearch, setPatientSearch] = useState('');
  const [recordSearch, setRecordSearch] = useState('');

  const fetchPatients = (search = '') => {
    setLoading(true);
    fetch(`/api/patients?search=${encodeURIComponent(search)}`)
      .then(res => res.json())
      .then(data => { setPatients(data); setLoading(false); });
  };

  const fetchReferenceData = () => {
    fetch('/api/doctors').then(r => r.json()).then(d => setDoctors(d));
    fetch('/api/inventory?type=medication').then(r => r.json()).then(d => setMedications(d));
    fetch('/api/inventory?type=labtest').then(r => r.json()).then(d => setLabTests(d));
    fetch('/api/facilities?type=bed').then(r => r.json()).then(d => setBeds(d));
  };

  useEffect(() => { 
    const timer = setTimeout(() => {
      fetchPatients(patientSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [patientSearch]);

  useEffect(() => {
    fetchReferenceData();
  }, []);

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: '', dob: '', gender: 'Male', phone_no: '', address: '' });
        fetchPatients(patientSearch);
      } else alert('Error: ' + (await res.json()).error);
    } catch (error) { alert('Failed to add patient.'); } 
    finally { setIsSubmitting(false); }
  };

  const loadPatientDetails = (patientId, tab, search = '') => {
    if (tab === 'history') {
      fetch(`/api/records?patient_id=${patientId}&search=${encodeURIComponent(search)}`)
        .then(r => r.json())
        .then(d => setPatientRecords(Array.isArray(d) ? d : []));
    } else {
      fetch(`/api/patient-details?patient_id=${patientId}&type=${tab}`)
        .then(r => r.json())
        .then(d => {
          const safe = Array.isArray(d) ? d : [];
          if (tab === 'prescription') setPrescriptions(safe);
          if (tab === 'labtest') setLabResults(safe);
          if (tab === 'admission') setAdmissions(safe);
        });
    }
  };

  useEffect(() => {
    if (selectedPatient && activeProfileTab === 'history') {
      const timer = setTimeout(() => {
        loadPatientDetails(selectedPatient.patient_id, 'history', recordSearch);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [recordSearch, selectedPatient, activeProfileTab]);

  const handleTabChange = (tab) => {
    setActiveProfileTab(tab);
    setRecordSearch('');
    if (selectedPatient) loadPatientDetails(selectedPatient.patient_id, tab, '');
  };

  const handleAddDetail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/patient-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: detailFormType, patient_id: selectedPatient.patient_id, ...detailFormData })
      });
      if (res.ok) {
        setIsAddDetailOpen(false);
        setDetailFormData({});
        loadPatientDetails(selectedPatient.patient_id, detailFormType, '');
      } else alert('Error: ' + (await res.json()).error);
    } catch (err) { alert('Failed to save record.'); }
    finally { setIsSubmitting(false); }
  };

  const handleRecordChange = (e) => {
    const recordId = e.target.value;
    const record = patientRecords.find(r => r.record_id.toString() === recordId);
    let autoMedicationId = '';
    let autoDosage = '';
    let autoDuration = '';
    
    if (record) {
      const disease = record.disease.toLowerCase();
      const matchedMed = medications.find(m => {
        const medName = m.name.toLowerCase();
        if (disease.includes('fever') || disease.includes('headache') || disease.includes('pain') || disease.includes('migraine')) return medName.includes('paracetamol') || medName.includes('dolo');
        if (disease.includes('infection') || disease.includes('bacteria') || disease.includes('flu') || disease.includes('wound')) return medName.includes('amoxicillin');
        if (disease.includes('allergy') || disease.includes('cold') || disease.includes('cough')) return medName.includes('cetirizine');
        if (disease.includes('diabetes') || disease.includes('sugar')) return medName.includes('insulin');
        if (disease.includes('blood pressure') || disease.includes('hypertension')) return medName.includes('losartan');
        if (disease.includes('gastric') || disease.includes('acid') || disease.includes('ulcer') || disease.includes('stomach')) return medName.includes('pantoprazole');
        if (disease.includes('bone') || disease.includes('calcium') || disease.includes('weakness')) return medName.includes('calcium');
        if (disease.includes('vitamin')) return medName.includes('vitamin');
        return false;
      });
      
      if (matchedMed) {
        autoMedicationId = matchedMed.medication_id.toString();
        const medName = matchedMed.name.toLowerCase();
        if (medName.includes('amoxicillin')) { autoDosage = '500mg twice daily'; autoDuration = '5 days'; }
        else if (medName.includes('dolo') || medName.includes('paracetamol')) { autoDosage = '650mg as needed'; autoDuration = '3 days'; }
        else if (medName.includes('cetirizine')) { autoDosage = '10mg once daily at night'; autoDuration = '5 days'; }
        else if (medName.includes('pantoprazole')) { autoDosage = '40mg before breakfast'; autoDuration = '14 days'; }
        else if (medName.includes('losartan')) { autoDosage = '50mg once daily'; autoDuration = '30 days'; }
        else if (medName.includes('insulin')) { autoDosage = '10 units before meals'; autoDuration = '30 days'; }
        else { autoDosage = 'As directed by physician'; autoDuration = '7 days'; }
      }
    }
    
    setDetailFormData(prev => ({
      ...prev, 
      record_id: recordId, 
      medication_id: autoMedicationId || prev.medication_id,
      dosage: autoDosage || prev.dosage,
      duration: autoDuration || prev.duration
    }));
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Patients</h1>
          <p className={styles.subtitle}>Manage hospital patients and records.</p>
        </div>
        <button className={styles.primaryButton} onClick={() => setIsModalOpen(true)}>+ Add Patient</button>
      </header>

      <div className={styles.searchContainer}>
        <span style={{position: 'absolute', marginLeft: '12px', marginTop: '10px', color: 'var(--text-muted)'}}>🔍</span>
        <input 
          type="text" 
          placeholder="Search patients by name or ID..." 
          className={styles.searchInput}
          style={{paddingLeft: '40px'}}
          value={patientSearch}
          onChange={(e) => setPatientSearch(e.target.value)}
        />
      </div>

      <div className={`glass-card ${styles.tableCard}`}>
        {loading ? <div className="loader"></div> : (
          <div className="table-container">
            <table className="premium-table">
              <thead><tr><th>ID</th><th>Name</th><th>Date of Birth</th><th>Gender</th><th>Phone No</th><th>Actions</th></tr></thead>
              <tbody>
                {Array.isArray(patients) && patients.map((patient) => (
                  <tr key={patient.patient_id}>
                    <td>#{patient.patient_id}</td>
                    <td className={styles.strongText}>{patient.name}</td>
                    <td>{new Date(patient.dob).toLocaleDateString()}</td>
                    <td><span className={`badge ${patient.gender === 'Male' ? 'badge-primary' : 'badge-secondary'}`}>{patient.gender}</span></td>
                    <td>{patient.phone_no}</td>
                    <td>
                      <button className={styles.actionBtn} onClick={() => {
                        setSelectedPatient(patient);
                        setActiveProfileTab('history');
                        setRecordSearch('');
                        loadPatientDetails(patient.patient_id, 'history', '');
                        setIsViewModalOpen(true);
                      }}>View Profile</button>
                    </td>
                  </tr>
                ))}
                {(!Array.isArray(patients) || patients.length === 0) && <tr><td colSpan="6" className={styles.emptyState}>No patients found.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Patient">
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Full Name</label><input type="text" name="name" required className="form-input" value={formData.name} onChange={handleInputChange}/></div>
          <div className="form-group"><label>Date of Birth</label><input type="date" name="dob" required className="form-input" value={formData.dob} onChange={handleInputChange}/></div>
          <div className="form-group"><label>Gender</label><select name="gender" required className="form-input" value={formData.gender} onChange={handleInputChange}><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div>
          <div className="form-group"><label>Phone Number</label><input type="tel" name="phone_no" required className="form-input" value={formData.phone_no} onChange={handleInputChange}/></div>
          <div className="form-group"><label>Address</label><input type="text" name="address" required className="form-input" value={formData.address} onChange={handleInputChange}/></div>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Patient'}</button>
        </form>
      </Modal>

      {/* View Patient Modal with Tabs */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Patient Dashboard" width="800px">
        {selectedPatient && (
          <div className={styles.patientProfile}>
            <div className={styles.profileHeader}>
              <div className={styles.profileAvatar}>{selectedPatient.name.charAt(0)}</div>
              <div>
                <h3 className={styles.profileName}>{selectedPatient.name}</h3>
                <p className={styles.profileId}>Patient ID: #{selectedPatient.patient_id} • {selectedPatient.phone_no}</p>
              </div>
            </div>

            <div className={styles.tabs}>
              {['history', 'prescription', 'labtest', 'admission'].map(tab => (
                <button key={tab} className={`${styles.tab} ${activeProfileTab === tab ? styles.activeTab : ''}`} onClick={() => handleTabChange(tab)}>
                  {tab === 'history' ? 'Diagnoses' : tab === 'prescription' ? 'Prescriptions' : tab === 'labtest' ? 'Lab Results' : 'Admissions'}
                </button>
              ))}
            </div>

            <div className={styles.tabContent}>
              {/* HISTORY TAB */}
              {activeProfileTab === 'history' && (
                <div>
                  <div className={styles.contentHeader}>
                    <h4>Medical Diagnoses</h4>
                    <button className={styles.primaryBtnSm} onClick={() => setIsDiagnosisModalOpen(true)}>+ Log Diagnosis</button>
                  </div>
                  
                  <div className={styles.recordSearch}>
                    <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                      <span style={{position: 'absolute', marginLeft: '12px', color: 'var(--text-muted)'}}>🔍</span>
                      <input 
                        type="text" 
                        placeholder="Search diagnoses by disease or description..." 
                        className={styles.searchInput}
                        style={{paddingLeft: '40px'}}
                        value={recordSearch}
                        onChange={(e) => setRecordSearch(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.historyList}>
                    {patientRecords.map(r => (
                      <div key={r.record_id} className={styles.historyCard}>
                        <div className={styles.historyDate}>{new Date(r.record_date).toLocaleDateString()} (Rec ID: #{r.record_id})</div>
                        <h5 className={styles.diseaseTitle}>{r.disease}</h5>
                        <p className={styles.diseaseDesc}>{r.description}</p>
                        <div className={styles.historyDoctor}>Dr. {r.doctor_name || `#${r.doctor_id}`}</div>
                      </div>
                    ))}
                    {patientRecords.length === 0 && <p className={styles.emptyState}>No medical records found.</p>}
                  </div>
                </div>
              )}

              {/* PRESCRIPTION TAB */}
              {activeProfileTab === 'prescription' && (
                <div>
                  <div className={styles.contentHeader}>
                    <h4>Prescriptions</h4>
                    <button className={styles.primaryBtnSm} onClick={() => { setDetailFormType('prescription'); setIsAddDetailOpen(true); }}>+ Add</button>
                  </div>
                  <table className="premium-table">
                    <thead><tr><th>Date</th><th>Medicine</th><th>Dosage</th><th>Duration</th></tr></thead>
                    <tbody>
                      {prescriptions.length > 0 ? prescriptions.map(p => (
                        <tr key={p.prescription_id}><td>{new Date(p.record_date).toLocaleDateString()}</td><td>{p.medicine_name}</td><td>{p.dosage}</td><td>{p.duration}</td></tr>
                      )) : <tr><td colSpan="4" className={styles.emptyState}>No prescriptions found.</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}

              {/* LAB RESULTS TAB */}
              {activeProfileTab === 'labtest' && (
                <div>
                  <div className={styles.contentHeader}>
                    <h4>Lab Test Results</h4>
                    <button className={styles.primaryBtnSm} onClick={() => { setDetailFormType('labtest'); setIsAddDetailOpen(true); }}>+ Add</button>
                  </div>
                  <table className="premium-table">
                    <thead><tr><th>Date</th><th>Test Name</th><th>Cost</th><th>Result</th></tr></thead>
                    <tbody>
                      {labResults.length > 0 ? labResults.map(l => (
                        <tr key={l.result_id}><td>{new Date(l.test_date).toLocaleDateString()}</td><td>{l.test_name}</td><td>₹{parseFloat(l.cost||0).toFixed(2)}</td><td><span className="badge badge-warning">{l.result}</span></td></tr>
                      )) : <tr><td colSpan="4" className={styles.emptyState}>No lab results found.</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ADMISSIONS TAB */}
              {activeProfileTab === 'admission' && (
                <div>
                  <div className={styles.contentHeader}>
                    <h4>Admission History</h4>
                    <button className={styles.primaryBtnSm} onClick={() => { setDetailFormType('admission'); setIsAddDetailOpen(true); }}>+ Admit Patient</button>
                  </div>
                  <table className="premium-table">
                    <thead><tr><th>Admit Date</th><th>Bed No</th><th>Room Type</th><th>Discharge</th><th>Remarks</th></tr></thead>
                    <tbody>
                      {admissions.length > 0 ? admissions.map(a => (
                        <tr key={a.admit_id}><td>{new Date(a.admit_date).toLocaleDateString()}</td><td>Bed #{a.bed_no}</td><td>{a.room_type}</td><td>{a.discharge_date ? new Date(a.discharge_date).toLocaleDateString() : <span className="badge badge-warning">Active</span>}</td><td>{a.remarks || '—'}</td></tr>
                      )) : <tr><td colSpan="5" className={styles.emptyState}>No admissions found.</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Log Diagnosis Modal */}
      <Modal isOpen={isDiagnosisModalOpen} onClose={() => setIsDiagnosisModalOpen(false)} title="Log Diagnosis">
        <form onSubmit={async (e) => {
            e.preventDefault(); setIsLoggingDiag(true);
            try {
              const res = await fetch('/api/records', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...diagnosisData, patient_id: selectedPatient.patient_id }) });
              if (res.ok) { setIsDiagnosisModalOpen(false); setDiagnosisData({ doctor_id: '', disease: '', description: '' }); loadPatientDetails(selectedPatient.patient_id, 'history'); }
            } catch (err) { alert('Failed'); } finally { setIsLoggingDiag(false); }
          }}>
            <div className="form-group">
              <label>Select Attending Doctor</label>
              <select 
                required 
                className="form-input" 
                value={diagnosisData.doctor_id} 
                onChange={(e) => setDiagnosisData({...diagnosisData, doctor_id: e.target.value})}
              >
                <option value="">Choose Doctor</option>
                {doctors.map(d => (
                  <option key={d.doctor_id} value={d.doctor_id}>Dr. {d.name} ({d.specialization})</option>
                ))}
              </select>
            </div>
            <div className="form-group"><label>Disease / Condition</label><input type="text" required className="form-input" value={diagnosisData.disease} onChange={(e) => setDiagnosisData({...diagnosisData, disease: e.target.value})}/></div>
            <div className="form-group"><label>Description & Notes</label><textarea className="form-input" style={{minHeight: '100px'}} value={diagnosisData.description} onChange={(e) => setDiagnosisData({...diagnosisData, description: e.target.value})}/></div>
            <button type="submit" className="submit-btn">Save Diagnosis</button>
          </form>
      </Modal>

      {/* Add Detail Modal */}
      <Modal isOpen={isAddDetailOpen} onClose={() => setIsAddDetailOpen(false)} title={`Add ${detailFormType}`}>
        <form onSubmit={handleAddDetail}>
          {detailFormType === 'prescription' && (
            <>
              <div className="form-group">
                <label>Medical Record (Diagnosis)</label>
                <select 
                  required 
                  className="form-input" 
                  value={detailFormData.record_id || ''}
                  onChange={handleRecordChange}
                >
                  <option value="">Link to Diagnosis</option>
                  {patientRecords.map(r => (
                    <option key={r.record_id} value={r.record_id}>#{r.record_id} - {r.disease} ({new Date(r.record_date).toLocaleDateString()})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Select Medication</label>
                <select 
                  required 
                  className="form-input" 
                  value={detailFormData.medication_id || ''}
                  onChange={e => setDetailFormData({...detailFormData, medication_id: e.target.value})}
                >
                  <option value="">Choose Medicine</option>
                  {medications.map(m => (
                    <option key={m.medication_id} value={m.medication_id}>{m.name} - {m.manufacturer}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Dosage</label>
                <select className="form-input" required value={detailFormData.dosage || ''} onChange={e => setDetailFormData({...detailFormData, dosage: e.target.value})}>
                  <option value="">Select Dosage</option>
                  <option value="10mg once daily at night">10mg once daily at night</option>
                  <option value="10 units before meals">10 units before meals</option>
                  <option value="40mg before breakfast">40mg before breakfast</option>
                  <option value="50mg once daily">50mg once daily</option>
                  <option value="500mg twice daily">500mg twice daily</option>
                  <option value="650mg as needed">650mg as needed</option>
                  <option value="As directed by physician">As directed by physician</option>
                </select>
              </div>
              <div className="form-group">
                <label>Duration / Trials</label>
                <select className="form-input" required value={detailFormData.duration || ''} onChange={e => setDetailFormData({...detailFormData, duration: e.target.value})}>
                  <option value="">Select Duration</option>
                  <option value="1 day">1 day</option>
                  <option value="3 days">3 days</option>
                  <option value="5 days">5 days</option>
                  <option value="7 days">7 days</option>
                  <option value="14 days">14 days</option>
                  <option value="30 days">30 days</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </div>
            </>
          )}
          {detailFormType === 'labtest' && (
            <>
              <div className="form-group">
                <label>Select Lab Test</label>
                <select 
                  required 
                  className="form-input" 
                  value={detailFormData.test_id || ''}
                  onChange={e => setDetailFormData({...detailFormData, test_id: e.target.value})}
                >
                  <option value="">Choose Test</option>
                  {labTests.map(t => (
                    <option key={t.test_id} value={t.test_id}>{t.name} (₹{t.cost})</option>
                  ))}
                </select>
              </div>
              <div className="form-group"><label>Test Date</label><input type="date" required className="form-input" value={detailFormData.test_date || ''} onChange={e => setDetailFormData({...detailFormData, test_date: e.target.value})}/></div>
              <div className="form-group"><label>Result</label><input type="text" className="form-input" placeholder="e.g. Positive, Negative, 120 mg/dL" value={detailFormData.result || ''} onChange={e => setDetailFormData({...detailFormData, result: e.target.value})}/></div>
            </>
          )}
          {detailFormType === 'admission' && (
            <>
              <div className="form-group">
                <label>Select Bed</label>
                <select 
                  required 
                  className="form-input" 
                  value={detailFormData.bed_id || ''}
                  onChange={e => setDetailFormData({...detailFormData, bed_id: e.target.value})}
                >
                  <option value="">Choose Bed</option>
                  {beds.map(b => (
                    <option 
                      key={b.bed_id} 
                      value={b.bed_id} 
                      disabled={b.status !== 'Available'}
                      style={b.status !== 'Available' ? { color: 'var(--text-muted)' } : {}}
                    >
                      Bed #{b.bed_no} - {b.room_type} {b.status !== 'Available' ? '(Occupied)' : '(Available)'}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group"><label>Admission Date</label><input type="date" required className="form-input" value={detailFormData.admit_date || ''} onChange={e => setDetailFormData({...detailFormData, admit_date: e.target.value})}/></div>
            </>
          )}
          <button type="submit" className="submit-btn" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Record'}</button>
        </form>
      </Modal>

    </div>
  );
}

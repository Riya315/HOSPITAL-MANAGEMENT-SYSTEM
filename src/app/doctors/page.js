'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Modal from '@/components/Modal';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Schedule Modal State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({ patient_id: '', date: '', time: '' });
  const [isScheduling, setIsScheduling] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    phone_no: '',
    email: '',
    department_id: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchDoctors = () => {
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
  };

  const fetchReferenceData = () => {
    // Fetch departments
    fetch('/api/facilities?type=department')
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(err => console.error(err));

    // Fetch patients for schedule modal
    fetch('/api/patients')
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchDoctors();
    fetchReferenceData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: '', specialization: '', phone_no: '', email: '', department_id: '' });
        fetchDoctors();
      } else {
        const err = await res.json();
        alert('Error: ' + err.error);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to add doctor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Doctors</h1>
          <p className={styles.subtitle}>Medical staff directory and schedules.</p>
        </div>
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search doctors by name or specialization..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className={styles.primaryButton} onClick={() => setIsModalOpen(true)}>
          + Add Doctor
        </button>
      </header>

      <div className={styles.doctorsGrid}>
        {loading ? (
          <div className="loader"></div>
        ) : Array.isArray(doctors) && doctors.length > 0 ? (
          doctors
            .filter(doctor => 
              doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((doctor) => (
            <div key={doctor.doctor_id} className={`glass-card ${styles.doctorCard}`}>
              <div className={styles.docHeader}>
                <div className={styles.avatar}>
                  {doctor.name.charAt(0)}
                </div>
                <div>
                  <h3 className={styles.docName}>{doctor.name}</h3>
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
                <button 
                  className={styles.outlineBtn}
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setIsViewModalOpen(true);
                  }}
                >
                  View Profile
                </button>
                <button 
                  className={styles.primaryBtnSm}
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setIsScheduleModalOpen(true);
                  }}
                >
                  Schedule
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No doctors found in database.</p>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Doctor">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name"
              required 
              className="form-input" 
              placeholder="e.g. Sarah Smith"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>Specialization</label>
            <input 
              type="text" 
              name="specialization"
              required 
              className="form-input" 
              placeholder="e.g. Cardiologist"
              value={formData.specialization}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone_no"
              required 
              className="form-input" 
              placeholder="e.g. +1234567890"
              value={formData.phone_no}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email"
              className="form-input" 
              placeholder="doctor@hospital.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select 
              name="department_id"
              className="form-input" 
              value={formData.department_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.department_id} value={dept.department_id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Doctor'}
          </button>
        </form>
      </Modal>

      {/* View Doctor Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Doctor Profile">
        {selectedDoctor && (
          <div className={styles.doctorProfile}>
            <div className={styles.profileHeader}>
              <div className={styles.profileAvatar}>{selectedDoctor.name.charAt(0)}</div>
              <div>
                <h3 className={styles.profileName}>{selectedDoctor.name}</h3>
                <p className={styles.profileSpec}>{selectedDoctor.specialization}</p>
              </div>
            </div>
            
            <div className={styles.profileDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Doctor ID</span>
                <span className={styles.detailValue}>#{selectedDoctor.doctor_id}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Department</span>
                <span className={styles.detailValue}>{selectedDoctor.department_name || 'General'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Phone Number</span>
                <span className={styles.detailValue}>{selectedDoctor.phone_no}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Email</span>
                <span className={styles.detailValue}>{selectedDoctor.email || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Schedule Modal */}
      <Modal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} title="Book Appointment">
        {selectedDoctor && (
          <form onSubmit={async (e) => {
            e.preventDefault();
            setIsScheduling(true);
            try {
              const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...scheduleData, doctor_id: selectedDoctor.doctor_id })
              });
              if (res.ok) {
                setIsScheduleModalOpen(false);
                setScheduleData({ patient_id: '', date: '', time: '' });
                alert('Appointment Booked Successfully!');
              } else {
                const err = await res.json();
                alert('Error: ' + err.error);
              }
            } catch (err) {
              alert('Failed to book appointment.');
            } finally {
              setIsScheduling(false);
            }
          }}>
            <p className={styles.scheduleText}>Booking appointment with <strong>{selectedDoctor.name}</strong></p>
            
            <div className="form-group">
              <label>Select Patient</label>
              <select 
                required 
                className="form-input" 
                value={scheduleData.patient_id}
                onChange={(e) => setScheduleData({...scheduleData, patient_id: e.target.value})}
              >
                <option value="">Choose Patient</option>
                {patients.map(p => (
                  <option key={p.patient_id} value={p.patient_id}>
                    {p.name} (ID: #{p.patient_id})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input 
                type="date" 
                required 
                className="form-input" 
                value={scheduleData.date}
                onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input 
                type="time" 
                required 
                className="form-input" 
                value={scheduleData.time}
                onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})}
              />
            </div>
            <button type="submit" className="submit-btn" disabled={isScheduling}>
              {isScheduling ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}

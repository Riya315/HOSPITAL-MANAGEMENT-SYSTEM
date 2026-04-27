'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Modal from '@/components/Modal';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    date: '',
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAppointments = () => {
    fetch('/api/appointments')
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ patient_id: '', doctor_id: '', date: '', time: '' });
        fetchAppointments();
      } else {
        const err = await res.json();
        alert('Error: ' + err.error);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to book appointment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'badge-success';
      case 'cancelled': return 'badge-danger';
      default: return 'badge-warning'; // Pending
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Appointments</h1>
          <p className={styles.subtitle}>Manage patient appointments and schedules.</p>
        </div>
        <button className={styles.primaryButton} onClick={() => setIsModalOpen(true)}>
          + Book Appointment
        </button>
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
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((apt) => (
                    <tr key={apt.appointment_id}>
                      <td>#{apt.appointment_id}</td>
                      <td className={styles.strongText}>{apt.patient_name || `Patient #${apt.patient_id}`}</td>
                      <td>{apt.doctor_name || `Doctor #${apt.doctor_id}`}</td>
                      <td>
                        {new Date(apt.date).toLocaleDateString()} at {apt.time}
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadge(apt.status)}`}>
                          {apt.status || 'Pending'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className={styles.actionBtn}
                          onClick={() => {
                            setSelectedAppointment(apt);
                            setNewStatus(apt.status || 'Pending');
                            setIsManageModalOpen(true);
                          }}
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className={styles.emptyState}>No appointments scheduled.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Book Appointment">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient ID</label>
            <input 
              type="number" 
              name="patient_id"
              required 
              className="form-input" 
              placeholder="Enter Patient ID"
              value={formData.patient_id}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>Doctor ID</label>
            <input 
              type="number" 
              name="doctor_id"
              required 
              className="form-input" 
              placeholder="Enter Doctor ID"
              value={formData.doctor_id}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input 
              type="date" 
              name="date"
              required 
              className="form-input" 
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input 
              type="time" 
              name="time"
              required
              className="form-input" 
              value={formData.time}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      </Modal>

      {/* Manage Appointment Modal */}
      <Modal isOpen={isManageModalOpen} onClose={() => setIsManageModalOpen(false)} title="Manage Appointment">
        {selectedAppointment && (
          <form onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            try {
              const res = await fetch('/api/appointments', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                  appointment_id: selectedAppointment.appointment_id, 
                  status: newStatus 
                })
              });
              
              if (res.ok) {
                setIsManageModalOpen(false);
                fetchAppointments();
              } else {
                const err = await res.json();
                alert('Error: ' + err.error);
              }
            } catch (err) {
              alert('Failed to update status.');
            } finally {
              setIsSubmitting(false);
            }
          }}>
            <p className={styles.manageText}>
              Update status for appointment <strong>#{selectedAppointment.appointment_id}</strong>
            </p>
            
            <div className="form-group">
              <label>Status</label>
              <select 
                className="form-input"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Status'}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}

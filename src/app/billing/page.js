'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Modal from '@/components/Modal';

export default function BillingPage() {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [formData, setFormData] = useState({ patient_id: '', total_amount: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBills = () => {
    fetch('/api/billing')
      .then(res => res.json())
      .then(data => {
        setBills(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const fetchPatients = () => {
    fetch('/api/patients')
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchBills();
    fetchPatients();
  }, []);

  const handleGenerateBill = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsGenerateModalOpen(false);
        setFormData({ patient_id: '', total_amount: '' });
        fetchBills();
      } else {
        const err = await res.json();
        alert('Error: ' + err.error);
      }
    } catch (err) {
      alert('Failed to generate bill.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Billing</h1>
          <p className={styles.subtitle}>Patient invoices and payment records.</p>
        </div>
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search by patient name or bill ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className={styles.primaryButton} onClick={() => {
          fetchPatients(); // Refresh list before opening
          setIsGenerateModalOpen(true);
        }}>
          + Generate Bill
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
                  <th>Bill ID</th>
                  <th>Date</th>
                  <th>Patient</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(bills) && bills.length > 0 ? (
                  bills
                    .filter(bill => 
                      (bill.patient_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                      bill.bill_id.toString().includes(searchQuery)
                    )
                    .map((bill) => (
                    <tr key={bill.bill_id}>
                      <td>#{bill.bill_id}</td>
                      <td>{new Date(bill.bill_date).toLocaleDateString()}</td>
                      <td className={styles.strongText}>{bill.patient_name || `Patient #${bill.patient_id}`}</td>
                      <td className={styles.strongText}>₹{parseFloat(bill.total_amount).toFixed(2)}</td>
                      <td><span className="badge badge-success">Paid</span></td>
                      <td>
                        <button
                          className={styles.actionBtn}
                          onClick={() => {
                            setSelectedBill(bill);
                            setIsReceiptModalOpen(true);
                          }}
                        >
                          Receipt
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className={styles.emptyState}>No billing records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Generate Bill Modal */}
      <Modal isOpen={isGenerateModalOpen} onClose={() => setIsGenerateModalOpen(false)} title="Generate New Bill">
        <form onSubmit={handleGenerateBill}>
          <div className="form-group">
            <label>Select Patient</label>
            <select
              required
              className="form-input"
              value={formData.patient_id}
              onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
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
            <label>Total Amount (₹)</label>
            <input
              type="number"
              step="0.01"
              required
              className="form-input"
              placeholder="e.g. 1500.00"
              value={formData.total_amount}
              onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Generating...' : 'Generate Bill'}
          </button>
        </form>
      </Modal>

      {/* Receipt Modal */}
      <Modal isOpen={isReceiptModalOpen} onClose={() => setIsReceiptModalOpen(false)} title="Invoice Receipt">
        {selectedBill && (
          <div className={styles.receipt}>
            <div className={styles.receiptHeader}>
              <h2>HMS<span className={styles.accent}>Pro</span> Hospital</h2>
              <p>Official Medical Invoice</p>
            </div>

            <div className={styles.receiptDetails}>
              <div className={styles.row}>
                <span>Invoice No:</span>
                <strong>INV-{selectedBill.bill_id.toString().padStart(4, '0')}</strong>
              </div>
              <div className={styles.row}>
                <span>Date:</span>
                <strong>{new Date(selectedBill.bill_date).toLocaleDateString()}</strong>
              </div>
              <div className={styles.row}>
                <span>Patient:</span>
                <strong>{selectedBill.patient_name || `Patient #${selectedBill.patient_id}`}</strong>
              </div>
            </div>

            <div className={styles.receiptTotal}>
              <span>Total Amount</span>
              <span className={styles.totalValue}>₹{parseFloat(selectedBill.total_amount).toFixed(2)}</span>
            </div>

            <div className={styles.receiptFooter}>
              <span className="badge badge-success">PAID</span>
              <button className={styles.printBtn} onClick={() => window.print()}>Print Receipt</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

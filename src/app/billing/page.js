'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function BillingPage() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Billing</h1>
          <p className={styles.subtitle}>Patient invoices and payment records.</p>
        </div>
        <button className={styles.primaryButton}>+ Generate Bill</button>
      </header>

      <div className={`glass-card ${styles.tableCard}`}>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="table-container">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.length > 0 ? (
                  bills.map((bill) => (
                    <tr key={bill.bill_id}>
                      <td>INV-{bill.bill_id.toString().padStart(4, '0')}</td>
                      <td className={styles.strongText}>{bill.patient_name || `Patient #${bill.patient_id}`}</td>
                      <td>{new Date(bill.bill_date).toLocaleDateString()}</td>
                      <td className={styles.amount}>₹{parseFloat(bill.total_amount).toFixed(2)}</td>
                      <td>
                        <span className="badge badge-success">Paid</span>
                      </td>
                      <td>
                        <button className={styles.actionBtn}>Receipt</button>
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
    </div>
  );
}

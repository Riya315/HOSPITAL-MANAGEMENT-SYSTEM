'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', path: '/', icon: '⊞' },
    { name: 'Patients', path: '/patients', icon: '👤' },
    { name: 'Doctors', path: '/doctors', icon: '🩺' },
    { name: 'Appointments', path: '/appointments', icon: '📅' },
    { name: 'Billing', path: '/billing', icon: '💳' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>🏥</div>
        <h1 className={styles.logoText}>HMS<span className={styles.accent}>Pro</span></h1>
      </div>
      
      <nav className={styles.nav}>
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link 
              key={link.path} 
              href={link.path}
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.icon}>{link.icon}</span>
              {link.name}
              {isActive && <div className={styles.activeIndicator} />}
            </Link>
          );
        })}
      </nav>
      
      <div className={styles.userProfile}>
        <div className={styles.avatar}>A</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Admin User</div>
          <div className={styles.userRole}>System Administrator</div>
        </div>
      </div>
    </aside>
  );
}

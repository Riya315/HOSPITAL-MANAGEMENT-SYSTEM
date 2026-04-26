import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Hospital Management System',
  description: 'Premium healthcare management platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

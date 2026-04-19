'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '../../redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user || user.role !== 'DOCTOR') {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'DOCTOR') return null;

  const menuItems = [
    { label: 'Practice Overview', icon: '📊', href: '/doctor/dashboard' },
    { label: 'Daily Schedule', icon: '📅', href: '/doctor/appointments' },
    { label: 'Set Availability', icon: '⏰', href: '/doctor/availability' },
    { label: 'Patient Records', icon: '📁', href: '/doctor/records' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 100px)', gap: '2rem', padding: '1rem 0' }}>
      {/* Sidebar */}
      <aside className="glass-card" style={{ width: '260px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', height: 'fit-content', position: 'sticky', top: '5rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '1rem', paddingLeft: '0.75rem' }}>MY PRACTICE</p>
        
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`doctor-nav-item ${pathname === item.href ? 'active' : ''}`}
          >
            <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, minWidth: 0 }}>
        {children}
      </main>

      <style jsx>{`
        .doctor-nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          color: var(--text-muted);
          font-weight: 500;
          transition: all 0.2s;
        }
        .doctor-nav-item:hover {
          background: rgba(255,255,255,0.05);
          color: var(--text-main);
        }
        .doctor-nav-item.active {
          background: #10b981;
          color: white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </div>
  );
}

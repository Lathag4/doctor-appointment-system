'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '../../redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'ADMIN') return null;

  const menuItems = [
    { label: 'Overview', icon: '📊', href: '/admin/dashboard' },
    { label: 'Doctors', icon: '👨‍⚕️', href: '/admin/doctors' },
    { label: 'Users', icon: '👥', href: '/admin/users' },
    { label: 'Analytics', icon: '📈', href: '/admin/reports' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 100px)', gap: '2rem', padding: '1rem 0' }}>
      {/* Sidebar */}
      <aside className="glass-card" style={{ width: '260px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', height: 'fit-content', position: 'sticky', top: '5rem' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '1rem', paddingLeft: '0.75rem' }}>ADMINISTRATION</p>
        
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`admin-nav-item ${pathname === item.href ? 'active' : ''}`}
          >
            <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
        
        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <div className="glass-card" style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', fontSize: '0.8rem' }}>
            <p style={{ fontWeight: 600, color: 'var(--primary)' }}>System Status</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>V 1.0.4 • Stable</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, minWidth: 0 }}>
        {children}
      </main>

      <style jsx>{`
        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          color: var(--text-muted);
          font-weight: 500;
          transition: all 0.2s;
        }
        .admin-nav-item:hover {
          background: rgba(255,255,255,0.05);
          color: var(--text-main);
        }
        .admin-nav-item.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  );
}

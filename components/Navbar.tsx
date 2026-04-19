'use client';

import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <nav className="glass-card" style={{ margin: '1rem', padding: '0.75rem 2rem', position: 'sticky', top: '1rem', zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-1px' }}>
        YASH <span style={{ color: 'var(--text-main)' }}>HOSPITAL</span>
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link href="/" className="nav-link">Home</Link>
        
        {isAuthenticated ? (
          <>
            {user?.role === 'ADMIN' && (
              <>
                <Link href="/admin/dashboard" className="nav-link">Dashboard</Link>
                <Link href="/admin/doctors" className="nav-link">Doctors</Link>
                <Link href="/admin/reports" className="nav-link">Reports</Link>
              </>
            )}
            {user?.role === 'DOCTOR' && <Link href="/doctor/dashboard">Practice</Link>}
            {user?.role === 'PATIENT' && <Link href="/patient/dashboard">My Health</Link>}
            <button onClick={handleLogout} className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Register</Link>
          </>
        )}
      </div>

      <style jsx>{`
        .nav-link {
          color: var(--text-muted);
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: var(--text-main);
        }
      `}</style>
    </nav>
  );
}

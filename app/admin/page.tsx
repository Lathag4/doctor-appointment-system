'use client';

import { useAppSelector } from '../../redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminRoot() {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      router.push('/auth/login');
    } else {
      router.push('/admin/dashboard');
    }
  }, [user, router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>YASH HOSPITAL</h2>
        <p style={{ color: 'var(--text-muted)' }}>Initializing Secure Administrative Session...</p>
        <div className="loader" style={{ marginTop: '2rem' }}></div>
      </div>

      <style jsx>{`
        .loader {
          width: 48px;
          height: 48px;
          border: 5px solid rgba(59, 130, 246, 0.1);
          border-bottom-color: var(--primary);
          border-radius: 50%;
          display: inline-block;
          animation: rotation 1s linear infinite;
        }
        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';

export default function DoctorPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
    } else if (user?.role !== 'DOCTOR') {
      router.replace('/');
    } else {
      router.replace('/doctor/dashboard');
    }
  }, [router, user, isAuthenticated]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <p style={{ color: 'var(--text-muted)' }}>Authenticating and redirecting...</p>
    </div>
  );
}

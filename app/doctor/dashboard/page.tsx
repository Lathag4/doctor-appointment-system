'use client';

import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AppointmentCard from '../../../components/AppointmentCard';
import { updateAppointmentStatus } from '../../../redux/slices/appointmentSlice';

export default function DoctorDashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const { appointments } = useAppSelector((state) => state.appointment);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'DOCTOR') {
      router.push('/auth/login');
    }
  }, [user, router]);

  const handleUpdateStatus = (id: string, status: 'CONFIRMED' | 'CANCELLED' | 'PENDING' | 'COMPLETED') => {
    dispatch(updateAppointmentStatus({ id, status }));
  };

  if (!user || user.role !== 'DOCTOR') return null;

  const doctorAppointments = appointments.filter(a => a.doctorId === user.id || a.doctorName.includes(user.name));
  
  const pendingCount = doctorAppointments.filter(a => a.status === 'PENDING').length;
  const confirmedCount = doctorAppointments.filter(a => a.status === 'CONFIRMED').length;
  const totalRevenue = doctorAppointments
    .filter(a => a.status === 'COMPLETED' || a.status === 'CONFIRMED')
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <div className="fade-in" style={{ padding: '1rem 0' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Practice Overview</h1>
        <p style={{ color: 'var(--text-muted)' }}>Hello, {user.name}. Here is what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>📩</div>
          <div>
            <p className="stat-label">Pending Requests</p>
            <h2 className="stat-value">{pendingCount}</h2>
          </div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>✅</div>
          <div>
            <p className="stat-label">Confirmed Visits</p>
            <h2 className="stat-value">{confirmedCount}</h2>
          </div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>💰</div>
          <div>
            <p className="stat-label">Expected Revenue</p>
            <h2 className="stat-value">₹{totalRevenue}</h2>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2.5rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Recent Requests</h2>
            <button style={{ fontSize: '0.875rem', color: 'var(--primary)', background: 'transparent' }}>View All</button>
          </div>

          {doctorAppointments.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {doctorAppointments.filter(a => a.status === 'PENDING').map((apt) => (
                <AppointmentCard 
                  key={apt.id} 
                  appointment={apt} 
                  onUpdate={handleUpdateStatus} 
                  onCancel={(id) => handleUpdateStatus(id, 'CANCELLED')}
                />
              ))}
              {doctorAppointments.filter(a => a.status === 'PENDING').length === 0 && (
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <p>No pending requests at the moment.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
              <p>Your appointment list is empty.</p>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Quick Actions</h2>
            <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button className="btn-primary" style={{ width: '100%' }}>Update Availability</button>
              <button className="glass-card" style={{ width: '100%', padding: '0.75rem', background: 'transparent' }}>Download Daily List</button>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent)' }}>
            <h3>Weekly Summary</h3>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Patients Seen</span>
                <span style={{ fontWeight: 600 }}>42</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Avg. Rating</span>
                <span style={{ fontWeight: 600 }}>⭐ 4.9</span>
              </div>
              <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden', marginTop: '0.5rem' }}>
                <div style={{ width: '70%', height: '100%', background: '#10b981' }}></div>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>You are in the top 5% of practitioners this month.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stat-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.5rem;
          transition: transform 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary);
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
        }
        .stat-label {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
        }
        .stat-value {
          margin: 0;
          font-size: 1.75rem;
          letter-spacing: -0.02em;
        }
      `}</style>
    </div>
  );
}

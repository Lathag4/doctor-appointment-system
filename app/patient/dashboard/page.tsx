'use client';

import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AppointmentCard from '../../../components/AppointmentCard';
import { cancelAppointment, updateAppointmentStatus } from '../../../redux/slices/appointmentSlice';
import Link from 'next/link';

export default function PatientDashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const { appointments } = useAppSelector((state) => state.appointment);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'PATIENT') {
      router.push('/auth/login');
    }
  }, [user, router]);

  const handleCancel = (id: string) => {
    dispatch(cancelAppointment(id));
  };

  const handleUpdate = (id: string, status: any) => {
    dispatch(updateAppointmentStatus({ id, status }));
  };

  if (!user || user.role !== 'PATIENT') return null;

  const myAppointments = appointments.filter(a => a.patientId === user.id);
  const upcomingCount = myAppointments.filter(a => a.status === 'CONFIRMED' || a.status === 'PENDING').length;

  return (
    <div className="fade-in" style={{ padding: '1rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Your Health Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back, {user.name}. Here's an overview of your medical schedule.</p>
        </div>
        <Link href="/#doctors-list" className="btn-primary" style={{ padding: '1rem 2rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>+</span> Book New Visit
        </Link>
      </div>

      {/* Summary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-card summary-card">
          <p className="summary-label">Upcoming Visits</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <span className="summary-value">{upcomingCount}</span>
            <span className="summary-badge">Next: {myAppointments.find(a => a.status === 'CONFIRMED')?.date || 'None'}</span>
          </div>
        </div>
        <div className="glass-card summary-card">
          <p className="summary-label">Health Records</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <span className="summary-value">12</span>
            <button style={{ fontSize: '0.8rem', color: 'var(--primary)', background: 'transparent' }}>View Files →</button>
          </div>
        </div>
        <div className="glass-card summary-card">
          <p className="summary-label">Blood Group</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <span className="summary-value">O+</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Verified</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Active Appointments</h2>
          {myAppointments.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {myAppointments.map((apt) => (
                <AppointmentCard 
                  key={apt.id} 
                  appointment={apt} 
                  onCancel={handleCancel}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🏥</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No visits scheduled</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
                Stay proactive about your health. Browse our specialists and book a consultation today.
              </p>
              <Link href="/#doctors-list" className="btn-primary" style={{ padding: '0.75rem 2.5rem' }}>Meet our Doctors</Link>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent)' }}>
            <h3 style={{ marginBottom: '1.25rem' }}>Vital Statistics</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="vital-row">
                <span>Weight</span>
                <span className="vital-val">72 kg</span>
              </div>
              <div className="vital-row">
                <span>Height</span>
                <span className="vital-val">178 cm</span>
              </div>
              <div className="vital-row">
                <span>BMI</span>
                <span className="vital-val" style={{ color: '#10b981' }}>22.7 (Normal)</span>
              </div>
              <div className="vital-row">
                <span>Last BP</span>
                <span className="vital-val">120/80</span>
              </div>
            </div>
            <button className="glass-card" style={{ width: '100%', padding: '0.75rem', background: 'transparent', marginTop: '1.5rem', fontSize: '0.875rem' }}>
              View History
            </button>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Quick Tip</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Staying hydrated is key to good health. Aim for at least 8 glasses of water a day.
            </p>
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '12px', borderLeft: '4px solid #3b82f6' }}>
              <p style={{ fontSize: '0.8rem', margin: 0, fontWeight: 500 }}>Tip of the day from Dr. Sharma</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .summary-card {
          padding: 1.5rem 2rem;
          border-radius: 20px;
        }
        .summary-label {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
          font-weight: 500;
        }
        .summary-value {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .summary-badge {
          background: rgba(255,255,255,0.05);
          padding: 0.4rem 0.8rem;
          border-radius: 30px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary);
        }
        .vital-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .vital-row span:first-child {
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        .vital-val {
          font-weight: 700;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}

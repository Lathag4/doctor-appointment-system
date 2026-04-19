'use client';

import { useAppSelector } from '../../../redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const { appointments } = useAppSelector((state) => state.appointment);
  const { doctors } = useAppSelector((state) => state.doctor);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'ADMIN') return null;

  const totalRevenue = appointments
    .filter(a => a.status === 'CONFIRMED' || a.status === 'COMPLETED')
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const stats = [
    { label: 'Total Users', value: '1,284', grow: '+12%', icon: '👥', color: '#3b82f6' },
    { label: 'Total Doctors', value: doctors.length.toString(), grow: '+5%', icon: '👨‍⚕️', color: '#10b981' },
    { label: 'Total Revenue', value: `₹${totalRevenue}`, grow: '+18%', icon: '💰', color: '#f59e0b' },
    { label: 'Active Bookings', value: appointments.length.toString(), grow: '+2%', icon: '📅', color: '#8b5cf6' },
  ];

  return (
    <div className="fade-in" style={{ padding: '1rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>System Overview</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome, Administrator. Here's a summary of hospital activity.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary" style={{ padding: '0.75rem 2rem', borderRadius: '12px' }}>Generate Report</button>
          <button className="glass-card" style={{ padding: '0.75rem 1.5rem', background: 'transparent', borderRadius: '12px' }}>Settings</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass-card admin-stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
              <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: 700, background: 'rgba(16, 185, 129, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                {stat.grow}
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem', fontWeight: 500 }}>{stat.label}</p>
            <h2 style={{ fontSize: '2rem', margin: 0, letterSpacing: '-0.02em' }}>{stat.value}</h2>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem' }}>
        <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Recent Activities</h3>
            <button style={{ color: 'var(--primary)', background: 'transparent', fontSize: '0.9rem' }}>View History</button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {appointments.slice(-5).reverse().map((apt, i) => (
              <div key={i} className="activity-item">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    📅
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, margin: 0, fontSize: '0.95rem' }}>New Appointment Booked</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Patient: {apt.patientName} • Dr. {apt.doctorName}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 700, margin: 0, fontSize: '0.9rem' }}>₹{apt.amount || 0}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{apt.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem', borderRadius: '24px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>System Alerts</h3>
            <div className="form-group">
              <label>Broadcast Message</label>
              <textarea 
                className="form-input" 
                placeholder="Message all users..." 
                style={{ minHeight: '120px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)' }}
              ></textarea>
            </div>
            <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', padding: '1rem', borderRadius: '16px' }}>
              Broadcast Alert
            </button>
          </div>

          <div className="glass-card" style={{ padding: '2rem', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), transparent)' }}>
            <h3 style={{ fontSize: '1.1rem' }}>Database Status</h3>
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Connection</span>
                <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.9rem' }}>● Healthy</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Storage</span>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>14.2 GB / 50 GB</span>
              </div>
              <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden', marginTop: '0.5rem' }}>
                <div style={{ width: '28%', height: '100%', background: 'var(--primary)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-stat-card {
          padding: 2rem;
          border-radius: 24px;
          transition: transform 0.2s;
        }
        .admin-stat-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
        }
        .activity-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1rem;
          border-bottom: 1px solid var(--border);
          transition: background 0.2s;
          border-radius: 12px;
        }
        .activity-item:hover {
          background: rgba(255,255,255,0.03);
        }
        .activity-item:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
}

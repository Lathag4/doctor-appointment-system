'use client';

import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../redux/hooks';

export default function AdminReports() {
  const [reports, setReports] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Analytics...</div>;

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Analytics & Reports</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select className="glass-card" style={{ padding: '0.5rem 1rem', background: 'transparent' }}>
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Year to Date</option>
          </select>
          <button className="btn-primary">Export CSV</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3>Booking Trends</h3>
          <div style={{ padding: '2rem 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '150px', gap: '8px' }}>
            {(reports.bookingTrends || []).map((h: number, i: number) => (
              <div key={i} style={{ flex: 1, background: 'rgba(59, 130, 246, 0.2)', height: `${h}%`, borderRadius: '4px', border: '1px solid var(--primary)', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                  {['M','T','W','T','F','S','S'][i]}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2rem', textAlign: 'center' }}>Total Appointments: {reports.totalAppointments} (+12% vs last week)</p>
        </div>
        
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3>Revenue Flow ($)</h3>
          <div style={{ padding: '2rem 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '150px', gap: '8px' }}>
            {(reports.revenueFlow || []).map((v: number, i: number) => (
              <div key={i} style={{ flex: 1, background: 'linear-gradient(to top, #10b981, #34d399)', height: `${(v/2500)*100}%`, borderRadius: '4px' }}></div>
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'center' }}>Weekly Total: ${reports.weeklyRevenue.toLocaleString()} (+18% growth)</p>
        </div>

        <div className="glass-card" style={{ padding: '2rem', gridColumn: 'span 2' }}>
          <h3>Doctor Performance Overview</h3>
          <div style={{ marginTop: '1.5rem' }}>
            {[
              { name: 'Dr. Sarah Wilson', special: 'Cardiology', load: '94%', rating: '4.9' },
              { name: 'Dr. Michael Chen', special: 'Dermatology', load: '82%', rating: '4.8' },
              { name: 'Dr. James Miller', special: 'Neurology', load: '75%', rating: '4.7' },
            ].map((doc, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                <div>
                  <p style={{ fontWeight: 600, margin: 0 }}>{doc.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{doc.special}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontWeight: 700, color: 'var(--primary)' }}>{doc.load} Capacity</p>
                  <p style={{ fontSize: '0.75rem', color: '#10b981', margin: 0 }}>★ {doc.rating} Avg Rating</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

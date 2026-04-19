'use client';

import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';

export default function AvailabilityPage() {
  const { user } = useAppSelector((state) => state.auth);
  
  const [days, setDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [hours, setHours] = useState({ start: '09:00', end: '17:00' });

  const toggleDay = (day: string) => {
    setDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSave = () => {
    alert('Availability updated successfully!');
  };

  if (!user) return null;

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="fade-in" style={{ padding: '2rem 0' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Manage Availability</h1>

      <div className="glass-card" style={{ padding: '2.5rem', maxWidth: '800px' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Active Days</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {weekDays.map(day => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  background: days.includes(day) ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  color: days.includes(day) ? 'white' : 'var(--text-muted)',
                  border: days.includes(day) ? 'none' : '1px solid var(--border)',
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
          <div className="form-group">
            <label>Start Time</label>
            <input 
              type="time" 
              className="form-input" 
              value={hours.start}
              onChange={(e) => setHours({...hours, start: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>End Time</label>
            <input 
              type="time" 
              className="form-input" 
              value={hours.end}
              onChange={(e) => setHours({...hours, end: e.target.value})}
            />
          </div>
        </div>

        <div style={{ padding: '1.5rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '12px', marginBottom: '2.5rem' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <strong>Note:</strong> Your profile will show you as available for booking only during these days and hours. Patients will not be able to book outside this window.
          </p>
        </div>

        <button className="btn-primary" style={{ padding: '1rem 3rem' }} onClick={handleSave}>
          Save Availability
        </button>
      </div>
    </div>
  );
}

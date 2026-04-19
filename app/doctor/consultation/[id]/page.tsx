'use client';

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useRouter, useParams } from 'next/navigation';
import { updateConsultation } from '@/redux/slices/appointmentSlice';

export default function ConsultationPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { appointments } = useAppSelector((state) => state.appointment);
  
  const [appointment, setAppointment] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [prescription, setPrescription] = useState('');

  useEffect(() => {
    const found = appointments.find(a => a.id === id);
    if (found) {
      setAppointment(found);
    }
  }, [id, appointments]);

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    dispatch(updateConsultation({ 
      id: Array.isArray(id) ? id[0] : id, 
      notes, 
      prescription 
    }));
    
    alert('Consultation completed and saved!');
    router.push('/doctor/dashboard');
  };

  if (!appointment) return <div style={{ padding: '2rem' }}>Loading consultation...</div>;

  return (
    <div className="fade-in" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Active Consultation</h1>
          <p style={{ color: 'var(--text-muted)' }}>Patient: <strong>{appointment.patientName}</strong> • Problem: {appointment.problem || 'Not specified'}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => router.push(`/doctor/consultation/${id}/video`)}
            className="glass-card" 
            style={{ padding: '0.75rem 1.5rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', borderColor: 'var(--primary)' }}
          >
            📹 Start Video Call
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2.5rem' }}>
        <form onSubmit={handleComplete}>
          <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Clinical Notes</h3>
            <textarea 
              className="form-input" 
              style={{ minHeight: '200px', resize: 'vertical', fontSize: '1rem' }}
              placeholder="Enter diagnosis, symptoms, and observations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            />
          </div>

          <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Prescription</h3>
            <textarea 
              className="form-input" 
              style={{ minHeight: '150px', resize: 'vertical', fontSize: '1rem' }}
              placeholder="List medications, dosage, and frequency..."
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn-primary" style={{ padding: '1rem 3rem' }}>
              Complete & Save Records
            </button>
            <button type="button" onClick={() => router.back()} className="glass-card" style={{ padding: '1rem 2rem', background: 'transparent' }}>
              Cancel
            </button>
          </div>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Patient History</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, margin: 0 }}>12 Jan 2024</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>Seasonal Flu - Recovered</p>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, margin: 0 }}>05 Oct 2023</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>Regular Health Checkup</p>
              </div>
            </div>
            <button style={{ width: '100%', marginTop: '1rem', background: 'transparent', color: 'var(--primary)', fontSize: '0.875rem' }}>
              View Full History
            </button>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Vitals Provided</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Age</span>
                <span>{appointment.patientAge || 'N/A'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Contact</span>
                <span>{appointment.patientContact || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Appointment } from '../types';
import Link from 'next/link';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: (id: string) => void;
  onUpdate?: (id: string, status: Appointment['status']) => void;
  showActions?: boolean;
}

export default function AppointmentCard({ appointment, onCancel, onUpdate, showActions = true }: AppointmentCardProps) {
  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'CONFIRMED': return '#10b981';
      case 'CANCELLED': return '#ef4444';
      case 'COMPLETED': return '#3b82f6';
      default: return '#f59e0b';
    }
  };

  return (
    <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h4 style={{ margin: 0 }}>
            {appointment.doctorName?.startsWith('Dr.') ? '' : 'Dr. '}{appointment.doctorName}
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{appointment.date} at {appointment.time}</p>
        </div>
        <span style={{ 
          fontSize: '0.75rem', 
          fontWeight: 700, 
          padding: '0.25rem 0.75rem', 
          borderRadius: '20px', 
          background: `${getStatusColor(appointment.status)}22`,
          color: getStatusColor(appointment.status),
          border: `1px solid ${getStatusColor(appointment.status)}44`
        }}>
          {appointment.status}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Patient</p>
          <p style={{ fontSize: '0.9rem' }}>{appointment.patientName} {appointment.patientAge && `(${appointment.patientAge})`}</p>
        </div>

        {appointment.paymentMethod && (
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payment</p>
            <p style={{ fontSize: '0.9rem' }}>{appointment.paymentMethod}</p>
          </div>
        )}
      </div>

        {appointment.problem && (
          <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Problem</p>
            <p style={{ fontSize: '0.875rem' }}>{appointment.problem}</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
          {showActions && appointment.status === 'PENDING' && (
            <>
              <button 
                onClick={() => onUpdate?.(appointment.id, 'CONFIRMED')}
                style={{ background: '#10b981', color: 'white', padding: '0.4rem 1rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}
              >
                Confirm
              </button>
              <button 
                onClick={() => onCancel?.(appointment.id)}
                style={{ background: '#ef4444', color: 'white', padding: '0.4rem 1rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}
              >
                Cancel
              </button>
            </>
          )}

          {appointment.status === 'CONFIRMED' && (
            <Link 
              href={`/doctor/consultation/${appointment.id}`}
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}
            >
              Start Consultation
            </Link>
          )}
        </div>
      </div>
  );
}

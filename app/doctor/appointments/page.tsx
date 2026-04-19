'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import AppointmentCard from '@/components/AppointmentCard';
import { rescheduleAppointment, cancelAppointment } from '@/redux/slices/appointmentSlice';

export default function DoctorAppointments() {
  const { user } = useAppSelector((state) => state.auth);
  const { appointments } = useAppSelector((state) => state.appointment);
  const dispatch = useAppDispatch();
  
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  if (!user) return null;

  const doctorAppointments = appointments.filter(a => a.doctorId === user.id || a.doctorName.includes(user.name));

  const handleReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (reschedulingId && newDate && newTime) {
      dispatch(rescheduleAppointment({ id: reschedulingId, date: newDate, time: newTime }));
      setReschedulingId(null);
      setNewDate('');
      setNewTime('');
      alert('Appointment rescheduled successfully. Patient will be notified.');
    }
  };

  return (
    <div className="fade-in" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Manage Appointments</h1>
          <p style={{ color: 'var(--text-muted)' }}>Full schedule overview and management tools.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {doctorAppointments.length > 0 ? (
            doctorAppointments.map(apt => (
              <div key={apt.id} className="appointment-item-container">
                <AppointmentCard 
                  appointment={apt} 
                  onCancel={(id) => dispatch(cancelAppointment(id))}
                />
                {apt.status !== 'COMPLETED' && apt.status !== 'CANCELLED' && (
                  <button 
                    onClick={() => setReschedulingId(apt.id)}
                    style={{ 
                      marginTop: '-0.5rem', marginLeft: '1.25rem', marginBottom: '1.25rem',
                      background: 'transparent', color: 'var(--primary)', fontSize: '0.8rem', 
                      fontWeight: 600, border: 'none', cursor: 'pointer' 
                    }}
                  >
                    📅 Reschedule Patient
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p>No appointments found in your schedule.</p>
            </div>
          )}
        </div>

        <div>
          <div className="glass-card" style={{ padding: '1.5rem', position: 'sticky', top: '6rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Search & Filter</h3>
            <div className="form-group">
              <label>Patient Name</label>
              <input type="text" className="form-input" placeholder="Search..." />
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Status</label>
              <select className="form-input">
                <option>All</option>
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
            </div>
            <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>Update View</button>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      {reschedulingId && (
        <div className="modal-overlay">
          <div className="glass-card modal-content" style={{ maxWidth: '400px', padding: '2.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Reschedule Appointment</h3>
            <form onSubmit={handleReschedule}>
              <div className="form-group">
                <label>New Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <label>New Time Slot</label>
                <select 
                  className="form-input" 
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  required
                >
                  <option value="">Select slot...</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Confirm</button>
                <button 
                  type="button" 
                  className="glass-card" 
                  style={{ flex: 1, background: 'transparent' }}
                  onClick={() => setReschedulingId(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          width: 90%;
        }
      `}</style>
    </div>
  );
}

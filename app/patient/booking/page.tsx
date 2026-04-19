'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { useRouter } from 'next/navigation';
import DoctorCard from '../../../components/DoctorCard';
import { addAppointment } from '../../../redux/slices/appointmentSlice';
import { Doctor } from '../../../types';

export default function BookingPage() {
  const { doctors } = useAppSelector((state) => state.doctor);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleBook = (doctor: Doctor) => {
    router.push(`/book/${doctor.id}`);
  };

  const confirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedDoctor) return;

    const newAppointment = {
      id: Math.random().toString(36).substr(2, 9),
      doctorId: selectedDoctor.id,
      patientId: user.id,
      doctorName: selectedDoctor.name,
      patientName: user.name,
      date,
      time,
      status: 'PENDING' as const,
    };

    dispatch(addAppointment(newAppointment));
    router.push('/patient/dashboard');
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Book an Appointment</h1>

      {!selectedDoctor ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onBook={handleBook} />
          ))}
        </div>
      ) : (
        <div className="auth-container fade-in" style={{ minHeight: 'auto' }}>
          <div className="glass-card auth-card" style={{ maxWidth: '500px' }}>
            <button 
              onClick={() => setSelectedDoctor(null)}
              style={{ background: 'transparent', color: 'var(--text-muted)', marginBottom: '1rem', display: 'block' }}
            >
              ← Back to list
            </button>
            
            <h2 style={{ marginBottom: '0.5rem' }}>Schedule Visit</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Booking consultation with <strong>{selectedDoctor.name}</strong>
            </p>

            <form onSubmit={confirmBooking}>
              <div className="form-group">
                <label>Select Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  required 
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="form-group">
                <label>Select Time Slot</label>
                <select 
                  className="form-input" 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)} 
                  required
                >
                  <option value="">Choose a time...</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                </select>
              </div>
              
              <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>Consultation Fee</span>
                  <span style={{ fontWeight: 700 }}>₹{selectedDoctor.consultationFee}</span>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

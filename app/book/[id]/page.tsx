'use client';

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { addAppointment } from '../../../redux/slices/appointmentSlice';
import { fetchDoctors } from '../../../redux/slices/doctorSlice';
import { Doctor } from '../../../types';

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { doctors, loading: doctorsLoading } = useAppSelector((state) => state.doctor);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState('07-04-2026');
  const [time, setTime] = useState('12:15 pm - 12:30 pm');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [problem, setProblem] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    if (doctors.length === 0) {
      dispatch(fetchDoctors());
    }
  }, [dispatch, doctors.length]);

  useEffect(() => {
    if (doctors.length > 0 && id) {
      const doctorId = Array.isArray(id) ? id[0] : id;
      const found = doctors.find(d => d.id === doctorId);
      if (found) {
        setDoctor(found);
      }
    }
  }, [id, doctors]);

  useEffect(() => {
    if (!isAuthenticated && !doctorsLoading) {
      router.push('/auth/login');
    }
    if (user) {
      setName(user.name);
    }
  }, [isAuthenticated, router, user, doctorsLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctor || !user) return;

    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    const newAppointment = {
      id: Math.random().toString(36).substr(2, 9),
      doctorId: doctor.id,
      patientId: user.id,
      doctorName: doctor.name,
      patientName: name,
      patientAge: age,
      patientContact: contact,
      problem: problem,
      date: date,
      time: time,
      status: 'PENDING' as const,
      paymentMethod: paymentMethod,
      amount: doctor.consultationFee,
    };

    dispatch(addAppointment(newAppointment));
    alert('Booking confirmed successfully!');
    router.push('/patient/dashboard');
  };

  if (!doctor) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <p>Loading doctor details...</p>
      </div>
    );
  }

  return (
    <div className="booking-wrapper">
      <div className="booking-container fade-in">
        <div className="booking-card">
          {/* Header */}
          <div className="booking-header">
            <div className="doctor-image-container">
              <Image 
                src={doctor.image} 
                alt={doctor.name} 
                fill 
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="doctor-info">
              <h2 className="doctor-name">{doctor.name.toUpperCase()}</h2>
              <p className="doctor-specialty">{doctor.specialty}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="input-group">
              <input 
                type="text" 
                className="custom-input" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                placeholder="07 - 04 - 2026"
              />
              <span className="input-icon">📅</span>
            </div>

            <div className="input-group">
              <select 
                className="custom-input" 
                value={time} 
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="12:15 pm - 12:30 pm">12:15 pm - 12:30 pm</option>
                <option value="12:30 pm - 12:45 pm">12:30 pm - 12:45 pm</option>
                <option value="01:00 pm - 01:15 pm">01:00 pm - 01:15 pm</option>
              </select>
            </div>

            <div className="input-group">
              <input 
                type="text" 
                className="custom-input" 
                placeholder="Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input 
                type="text" 
                className="custom-input" 
                placeholder="Age" 
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input 
                type="text" 
                className="custom-input" 
                placeholder="Contact" 
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <textarea 
                className="custom-input custom-textarea" 
                placeholder="Problem" 
                rows={4}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                required
              />
            </div>

            <div className="payment-section">
              <h3 className="payment-title">Payment</h3>
              <p className="fee-text">Consultation Fee: ₹{doctor.consultationFee}</p>
              
              <div className="input-group">
                <select 
                  className="custom-input payment-select" 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Payment Method</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Debit / Credit Card">Debit / Credit Card</option>
                </select>
              </div>
            </div>

            <button type="submit" className="confirm-btn">
              Confirm Booking and Pay
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .booking-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
          background-image: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 40%),
                            linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .booking-container {
          width: 100%;
          max-width: 450px;
        }

        .booking-card {
          background: white;
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          color: #333;
        }

        .booking-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .doctor-image-container {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          background: #f3f4f6;
        }

        .doctor-name {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1f2937;
          margin: 0;
        }

        .doctor-specialty {
          color: #6b7280;
          margin: 0;
          font-weight: 500;
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-group {
          position: relative;
        }

        .custom-input {
          width: 100%;
          padding: 0.875rem 1rem;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          color: #1f2937;
          outline: none;
          transition: all 0.2s;
        }

        .custom-input:focus {
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .custom-textarea {
          resize: none;
        }

        .input-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          pointer-events: none;
        }

        .payment-section {
          margin-top: 1.5rem;
          text-align: center;
        }

        .payment-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .fee-text {
          font-size: 1.1rem;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 1.5rem;
        }

        .payment-select {
          text-align: left;
          font-weight: 500;
        }

        .confirm-btn {
          margin-top: 2rem;
          width: 100%;
          background: #1f2937;
          color: white;
          padding: 1rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .confirm-btn:hover {
          background: #111827;
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .confirm-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

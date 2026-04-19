'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';

export default function VideoConsultationPage() {
  const { id } = useParams();
  const router = useRouter();
  const { appointments } = useAppSelector((state) => state.appointment);
  const [appointment, setAppointment] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    const found = appointments.find(a => a.id === id);
    if (found) {
      setAppointment(found);
    }
  }, [id, appointments]);

  if (!appointment) return null;

  return (
    <div style={{ height: '100vh', background: '#000', display: 'flex', flexDirection: 'column', color: 'white' }}>
      {/* Top Bar */}
      <div style={{ padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Consultation with {appointment.patientName}</h2>
          <p style={{ fontSize: '0.8rem', color: '#ccc', margin: 0 }}>ID: {appointment.id} • Secure Connection</p>
        </div>
        <div style={{ background: '#ef4444', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>LIVE</div>
      </div>

      {/* Main Video Area */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        {/* Main Feed (Patient) */}
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#111' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--primary)', margin: '0 auto 1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3rem' }}>
              {appointment.patientName[0]}
            </div>
            <h3>Patient: {appointment.patientName}</h3>
            <p style={{ color: '#888' }}>Patient is connected...</p>
          </div>
        </div>

        {/* Self Feed (Doctor) */}
        <div style={{ 
          position: 'absolute', bottom: '2rem', right: '2rem', 
          width: '240px', height: '160px', background: '#222', 
          borderRadius: '12px', border: '2px solid rgba(255,255,255,0.2)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)'
        }}>
          {isVideoOff ? (
             <div style={{ fontSize: '2rem' }}>👨‍⚕️</div>
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1e293b, #0f172a)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span style={{ fontSize: '3rem' }}>👨‍⚕️</span>
            </div>
          )}
          <div style={{ position: 'absolute', bottom: '0.5rem', left: '0.5rem', fontSize: '0.7rem', background: 'rgba(0,0,0,0.5)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>You (Dr. Gautam)</div>
        </div>
      </div>

      {/* Control Bar */}
      <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
        <button 
          onClick={() => setIsMuted(!isMuted)}
          style={{ width: '60px', height: '60px', borderRadius: '50%', background: isMuted ? '#ef4444' : 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          {isMuted ? '🔇' : '🎤'}
        </button>
        <button 
          onClick={() => setIsVideoOff(!isVideoOff)}
          style={{ width: '60px', height: '60px', borderRadius: '50%', background: isVideoOff ? '#ef4444' : 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          {isVideoOff ? '🚫' : '📹'}
        </button>
        <button 
          onClick={() => router.back()}
          style={{ width: '120px', height: '60px', borderRadius: '30px', background: '#ef4444', border: 'none', color: 'white', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
        >
          End Call
        </button>
        <button style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>
          💬
        </button>
      </div>
    </div>
  );
}

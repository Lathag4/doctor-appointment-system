'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '../../../redux/hooks';
import { loginSuccess } from '../../../redux/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'PATIENT' | 'DOCTOR'>('PATIENT');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated registration
    dispatch(loginSuccess({
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: role,
    }));
    
    if (role === 'DOCTOR') {
      router.push('/doctor/dashboard');
    } else {
      router.push('/patient/dashboard');
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="glass-card auth-card">
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Create Account</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Join Yash Hospital for premium healthcare access
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="John Doe"
              required 
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="name@example.com"
              required 
            />
          </div>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>I am a...</label>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button 
                type="button"
                onClick={() => setRole('PATIENT')}
                style={{ 
                  flex: 1, padding: '0.75rem', borderRadius: '8px', 
                  background: role === 'PATIENT' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  border: role === 'PATIENT' ? 'none' : '1px solid var(--border)',
                  color: role === 'PATIENT' ? 'white' : 'var(--text-muted)'
                }}
              >
                Patient
              </button>
              <button 
                type="button"
                onClick={() => setRole('DOCTOR')}
                style={{ 
                  flex: 1, padding: '0.75rem', borderRadius: '8px', 
                  background: role === 'DOCTOR' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  border: role === 'DOCTOR' ? 'none' : '1px solid var(--border)',
                  color: role === 'DOCTOR' ? 'white' : 'var(--text-muted)'
                }}
              >
                Doctor
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••"
              required 
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Get Started
          </button>
        </form>

        <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link href="/auth/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

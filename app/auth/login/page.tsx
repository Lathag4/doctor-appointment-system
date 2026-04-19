'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppDispatch } from '../../../redux/hooks';
import { loginSuccess } from '../../../redux/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated login based on role
    let role: 'ADMIN' | 'DOCTOR' | 'PATIENT' = 'PATIENT';
    if (email.includes('admin')) role = 'ADMIN';
    else if (email.includes('doctor')) role = 'DOCTOR';

    dispatch(loginSuccess({
      id: 'u1',
      name: role === 'ADMIN' ? 'Admin User' : role === 'DOCTOR' ? 'Dr. Sarah Wilson' : 'John Doe',
      email,
      role,
    }));

    if (role === 'ADMIN') router.push('/admin/dashboard');
    else if (role === 'DOCTOR') router.push('/doctor/dashboard');
    else router.push('/patient/dashboard');
  };

  return (
    <div className="auth-container fade-in">
      <div className="glass-card auth-card">
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Sign in to manage your appointments
        </p>

        <form onSubmit={handleSubmit}>
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
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Sign In
          </button>
        </form>

        <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link href="/auth/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create one</Link>
        </p>

        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <p><strong>Demo Roles:</strong></p>
          <p>• Admin: admin@example.com</p>
          <p>• Doctor: doctor@example.com</p>
          <p>• Patient: patient@example.com</p>
        </div>
      </div>
    </div>
  );
}

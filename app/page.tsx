'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { fetchDoctors } from '../redux/slices/doctorSlice';
import DoctorCard from '../components/DoctorCard';
import { useRouter } from 'next/navigation';
import { Doctor } from '../types';

export default function Home() {
  const { doctors } = useAppSelector((state) => state.doctor);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleBook = (doctor: Doctor) => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else {
      router.push(`/book/${doctor.id}`);
    }
  };

  return (
    <div style={{ padding: '0 0 4rem' }}>
      {/* Hero Section with Background */}
      <section style={{ 
        position: 'relative',
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center', 
        marginBottom: '6rem',
        borderRadius: '0 0 60px 60px',
        overflow: 'hidden',
        background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.6) 50%, rgba(15, 23, 42, 0.2) 100%), url("/hero-doctor.png") center/cover no-repeat',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container fade-in" style={{ zIndex: 10 }}>

          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <Link href="/auth/register" className="btn-primary" style={{ padding: '1.5rem 3rem', fontSize: '1.2rem', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)' }}>
              Get Started for Free
            </Link>
            <button 
              className="glass-card" 
              onClick={() => document.getElementById('doctors-list')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ padding: '1.5rem 3rem', fontSize: '1.2rem', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              Meet our Doctors
            </button>
          </div>
        </div>
      </section>

      {/* Featured Doctors List */}
      <section id="doctors-list">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem' }}>Available Specialists</h2>
            <p style={{ color: 'var(--text-muted)' }}>Top rated doctors available for consultation at Yash Hospital</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onBook={handleBook} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="glass-card" style={{ marginTop: '8rem', padding: '4rem', textAlign: 'center', background: 'radial-gradient(circle at top right, hsla(220, 90%, 56%, 0.1), transparent)' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to prioritize your health?</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
          Join thousands of patients who trust Yash Hospital for their medical needs. Secure booking and instant confirmations.
        </p>
        <Link href="/auth/register" className="btn-primary" style={{ padding: '1rem 3rem' }}>Create Account</Link>
      </section>
    </div>
  );
}

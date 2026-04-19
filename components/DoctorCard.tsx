'use client';

import { Doctor } from '../types';
import Image from 'next/image';

interface DoctorCardProps {
  doctor: Doctor;
  onBook?: (doctor: Doctor) => void;
}

export default function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  return (
    <div className="glass-card fade-in" style={{ padding: '1.5rem', transition: 'transform 0.3s ease' }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary)' }}>
          <Image 
            src={doctor.image} 
            alt={doctor.name} 
            fill 
            style={{ objectFit: 'cover' }}
          />
        </div>
        
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{doctor.name}</h3>
          <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{doctor.specialty}</p>
          
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <span>⭐ {doctor.rating} ({doctor.reviewsCount} reviews)</span>
            <span>📅 {doctor.experience} years exp.</span>
          </div>
        </div>
      </div>
      
      <p style={{ margin: '1rem 0', color: 'var(--text-muted)', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {doctor.about}
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Start from</p>
          <p style={{ fontSize: '1.1rem', fontWeight: 700 }}>₹{doctor.consultationFee}</p>
        </div>
        
        <button 
          className="btn-primary" 
          style={{ padding: '0.5rem 1.25rem' }}
          onClick={() => onBook?.(doctor)}
        >
          Book Now
        </button>
      </div>
      
      <style jsx>{`
        .glass-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
        }
      `}</style>
    </div>
  );
}

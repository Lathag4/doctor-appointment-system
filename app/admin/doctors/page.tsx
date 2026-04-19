'use client';

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { fetchDoctors, createDoctor, deleteDoctor, updateDoctor } from '../../../redux/slices/doctorSlice';
import Modal from '../../../components/Modal';

const DOCTOR_IMAGES = [
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200',
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200&h=200',
  'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200&h=200',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=200&h=200',
  'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=200&h=200'
];

export default function AdminDoctors() {
  const { doctors, loading } = useAppSelector((state) => state.doctor);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: 'Cardiologist',
    experience: 5,
    consultationFee: 100,
  });

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoctor) {
      await dispatch(updateDoctor({ ...editingDoctor, ...formData }));
      setEditingDoctor(null);
    } else {
      const doctor = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        role: 'DOCTOR' as const,
        about: `${formData.specialty} with ${formData.experience} years of expertise.`,
        rating: 5.0,
        reviewsCount: 0,
        availability: ['Mon', 'Wed', 'Fri'],
        image: DOCTOR_IMAGES[Math.floor(Math.random() * DOCTOR_IMAGES.length)],
      };
      await dispatch(createDoctor(doctor));
    }
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', specialty: 'Cardiologist', experience: 5, consultationFee: 100 });
    setEditingDoctor(null);
  };

  const openEditModal = (doctor: any) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      specialty: doctor.specialty,
      experience: doctor.experience,
      consultationFee: doctor.consultationFee,
    });
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await dispatch(deleteDoctor(deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Doctor Management</h1>
        <button onClick={() => { resetForm(); setIsModalOpen(true); }} className="btn-primary">Add New Doctor</button>
      </div>

      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <th style={{ padding: '1rem 1.5rem' }}>Doctor</th>
              <th style={{ padding: '1rem 1.5rem' }}>Specialty</th>
              <th style={{ padding: '1rem 1.5rem' }}>Fee</th>
              <th style={{ padding: '1rem 1.5rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--primary)' }}>
                      <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, margin: 0 }}>{doctor.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{doctor.email}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>{doctor.specialty}</td>
                <td style={{ padding: '1rem 1.5rem' }}>₹{doctor.consultationFee}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => openEditModal(doctor)} style={{ color: 'var(--primary)', background: 'transparent' }}>Edit</button>
                    <button 
                      onClick={() => { setDeleteId(doctor.id); setDeleteName(doctor.name); }}
                      style={{ color: '#ef4444', background: 'transparent' }}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm(); }} title={editingDoctor ? 'Edit Doctor Profile' : 'Add New Doctor Profile'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Doctor Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Dr. Sunita Sharma" 
            />
          </div>
          <div className="form-group">
            <label>Professional Email</label>
            <input 
              type="email" 
              className="form-input" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="sunita@yashhospital.com" 
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Specialty</label>
              <select 
                className="form-input"
                value={formData.specialty}
                onChange={(e) => setFormData({...formData, specialty: e.target.value})}
              >
                {['Cardiologist', 'Dermatologist', 'Pediatrician', 'Neurologist', 'Psychiatrist', 'Dentist', 'Orthopedic', 'Gynecologist', 'Oncologist', 'Ophthalmologist'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Years of Exp.</label>
              <input 
                type="number" 
                className="form-input" 
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: parseInt(e.target.value)})}
                required 
              />
            </div>
          </div>
          <div className="form-group">
            <label>Consultation Fee (₹)</label>
            <input 
              type="number" 
              className="form-input" 
              value={formData.consultationFee}
              onChange={(e) => setFormData({...formData, consultationFee: parseInt(e.target.value)})}
              required 
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
            {editingDoctor ? 'Update Profile' : 'Save Doctor Profile'}
          </button>
        </form>
      </Modal>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Deletion">
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
            Are you sure you want to remove <strong style={{ color: 'var(--text-main)' }}>{deleteName}</strong>? This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => setDeleteId(null)} className="glass-card" style={{ padding: '0.75rem 2rem', background: 'transparent' }}>Cancel</button>
            <button onClick={confirmDelete} className="btn-primary" style={{ padding: '0.75rem 2rem', background: '#ef4444', border: 'none' }}>Remove Permanently</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

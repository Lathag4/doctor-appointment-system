'use client';

import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../redux/hooks';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const toggleStatus = async (id: string) => {
    const user = users.find(u => u.id === id);
    if (!user) return;
    const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
    
    const response = await fetch('/api/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    });

    if (response.ok) {
      setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    }
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>User Directory</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Search users..." 
            className="form-input" 
            style={{ width: '300px' }}
          />
          <button className="btn-primary">Add User</button>
        </div>
      </div>

      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <th style={{ padding: '1rem 1.5rem' }}>Name</th>
              <th style={{ padding: '1rem 1.5rem' }}>Email</th>
              <th style={{ padding: '1rem 1.5rem' }}>Role</th>
              <th style={{ padding: '1rem 1.5rem' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                      {user.name.charAt(0)}
                    </div>
                    {user.name}
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{user.email}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '12px',
                    background: user.role === 'ADMIN' ? 'rgba(139, 92, 246, 0.1)' : user.role === 'DOCTOR' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                    color: user.role === 'ADMIN' ? '#a78bfa' : user.role === 'DOCTOR' ? '#60a5fa' : '#9ca3af'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ color: user.status === 'Active' ? '#10b981' : '#ef4444', fontSize: '0.75rem', fontWeight: 700 }}>
                    {user.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <button style={{ color: 'var(--primary)', background: 'transparent', marginRight: '1rem' }}>View History</button>
                  {user.role !== 'ADMIN' && (
                    <button 
                      onClick={() => toggleStatus(user.id)}
                      style={{ color: user.status === 'Active' ? '#ef4444' : '#10b981', background: 'transparent' }}
                    >
                      {user.status === 'Active' ? 'Suspend' : 'Activate'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

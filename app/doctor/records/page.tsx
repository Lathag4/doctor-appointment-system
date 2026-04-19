'use client';

import { useAppSelector } from '@/redux/hooks';

export default function PatientRecordsPage() {
  const { appointments } = useAppSelector((state) => state.appointment);
  
  const completedAppointments = appointments.filter(a => a.status === 'COMPLETED');

  return (
    <div className="fade-in" style={{ padding: '2rem 0' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Patient Records</h1>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Date</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Patient Name</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Diagnosis</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Prescription</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {completedAppointments.length > 0 ? (
              completedAppointments.map(apt => (
                <tr key={apt.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem' }}>{apt.date}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{apt.patientName}</td>
                  <td style={{ padding: '1rem' }}>{apt.consultationNotes?.substring(0, 50)}...</td>
                  <td style={{ padding: '1rem' }}>{apt.prescription?.substring(0, 50)}...</td>
                  <td style={{ padding: '1rem' }}>
                    <button style={{ color: 'var(--primary)', background: 'transparent' }}>View Full File</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No completed consultations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

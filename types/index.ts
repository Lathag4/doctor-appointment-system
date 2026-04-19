export type UserRole = 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'GUEST';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Doctor extends User {
  specialty: string;
  experience: number;
  about: string;
  rating: number;
  reviewsCount: number;
  consultationFee: number;
  availability: string[]; // e.g., ['Mon', 'Wed', 'Fri']
  workingHours?: { start: string; end: string };
  image: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  doctorName: string;
  patientName: string;
  patientAge?: string;
  patientContact?: string;
  problem?: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  paymentMethod?: string;
  amount?: number;
  consultationNotes?: string;
  prescription?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface DoctorState {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filterSpecialty: string;
}

export interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
}

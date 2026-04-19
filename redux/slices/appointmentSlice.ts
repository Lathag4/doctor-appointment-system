import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppointmentState, Appointment } from '../../types';

const initialState: AppointmentState = {
  appointments: [],
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload);
    },
    updateAppointmentStatus: (state, action: PayloadAction<{ id: string; status: Appointment['status'] }>) => {
      const appointment = state.appointments.find((a) => a.id === action.payload.id);
      if (appointment) {
        appointment.status = action.payload.status;
      }
    },
    cancelAppointment: (state, action: PayloadAction<string>) => {
      const appointment = state.appointments.find((a) => a.id === action.payload);
      if (appointment) {
        appointment.status = 'CANCELLED';
      }
    },
    rescheduleAppointment: (state, action: PayloadAction<{ id: string; date: string; time: string }>) => {
      const appointment = state.appointments.find((a) => a.id === action.payload.id);
      if (appointment) {
        appointment.date = action.payload.date;
        appointment.time = action.payload.time;
        appointment.status = 'PENDING';
      }
    },
    updateConsultation: (state, action: PayloadAction<{ id: string; notes: string; prescription: string }>) => {
      const appointment = state.appointments.find((a) => a.id === action.payload.id);
      if (appointment) {
        appointment.consultationNotes = action.payload.notes;
        appointment.prescription = action.payload.prescription;
        appointment.status = 'COMPLETED';
      }
    },
  },
});

export const { addAppointment, updateAppointmentStatus, cancelAppointment, rescheduleAppointment, updateConsultation } = appointmentSlice.actions;
export default appointmentSlice.reducer;

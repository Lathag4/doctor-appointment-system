import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DoctorState, Doctor } from '../../types';

export const fetchDoctors = createAsyncThunk('doctor/fetchDoctors', async () => {
  const response = await fetch('/api/doctors');
  return (await response.json()) as Doctor[];
});

export const createDoctor = createAsyncThunk('doctor/createDoctor', async (doctor: Doctor) => {
  const response = await fetch('/api/doctors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doctor),
  });
  return (await response.json()) as Doctor;
});

export const deleteDoctor = createAsyncThunk('doctor/deleteDoctor', async (id: string) => {
  await fetch(`/api/doctors?id=${id}`, { method: 'DELETE' });
  return id;
});

export const updateDoctor = createAsyncThunk('doctor/updateDoctor', async (doctor: Doctor) => {
  const response = await fetch('/api/doctors', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(doctor),
  });
  return (await response.json()) as Doctor;
});

const initialState: DoctorState = {
  doctors: [],
  selectedDoctor: null,
  loading: false,
  error: null,
  searchQuery: '',
  filterSpecialty: 'All',
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilterSpecialty: (state, action: PayloadAction<string>) => {
      state.filterSpecialty = action.payload;
    },
    selectDoctor: (state, action: PayloadAction<Doctor | null>) => {
      state.selectedDoctor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.doctors.push(action.payload);
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter(d => d.id !== action.payload);
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        const index = state.doctors.findIndex(d => d.id === action.payload.id);
        if (index !== -1) {
          state.doctors[index] = action.payload;
        }
      });
  },
});

export const { setSearchQuery, setFilterSpecialty, selectDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;

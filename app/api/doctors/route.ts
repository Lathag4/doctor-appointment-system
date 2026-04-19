import { NextResponse } from 'next/server';
import { getDb, saveDb } from '../../../lib/db';

export async function GET() {
  try {
    const db = getDb();
    return NextResponse.json(db.doctors);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const doctor = await request.json();
    const db = getDb();
    db.doctors.push(doctor);
    saveDb(db);
    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add doctor' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const db = getDb();
    db.doctors = db.doctors.filter((d: any) => d.id !== id);
    saveDb(db);
    return NextResponse.json({ message: 'Doctor removed successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove doctor' }, { status: 500 });
  }
}
export async function PUT(request: Request) {
  try {
    const updatedDoctor = await request.json();
    const db = getDb();
    const index = db.doctors.findIndex((d: any) => d.id === updatedDoctor.id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
    }

    db.doctors[index] = { ...db.doctors[index], ...updatedDoctor };
    saveDb(db);
    return NextResponse.json(db.doctors[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update doctor' }, { status: 500 });
  }
}

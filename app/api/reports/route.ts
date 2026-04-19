import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';

export async function GET() {
  try {
    const db = getDb();
    // In a real app, logic would aggregate from appointments/fees
    // Here we return the pre-calculated reports from db.json
    return NextResponse.json(db.reports);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getDb, saveDb } from '../../../lib/db';

export async function GET() {
  try {
    const db = getDb();
    return NextResponse.json(db.users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    const db = getDb();
    const index = db.users.findIndex((u: any) => u.id === id);
    if (index !== -1) {
      db.users[index].status = status;
      saveDb(db);
      return NextResponse.json(db.users[index]);
    }
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

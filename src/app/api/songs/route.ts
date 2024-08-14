import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Получение всех песен
export async function GET() {
    const db = await connectToDatabase();
    const songs = await db.collection('songs').find({}).toArray();
    return NextResponse.json(songs);
}

// Добавление новой песни
export async function POST(request: Request) {
    const db = await connectToDatabase();
    const song = await request.json();
    const result = await db.collection('songs').insertOne(song);
    return NextResponse.json(result);
}

// Обновление существующей песни
export async function PUT(request: Request) {
    const db = await connectToDatabase();
    const { id, ...update } = await request.json();
    const result = await db.collection('songs').updateOne({ _id: new ObjectId(id) }, { $set: update });
    return NextResponse.json(result);
}

// Удаление песни
export async function DELETE(request: Request) {
    const db = await connectToDatabase();
    const { id } = await request.json();
    const result = await db.collection('songs').deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json(result);
}

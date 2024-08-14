import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

const saltRounds = 10;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        try {
            const db = await connectToDatabase();
            const existingUser = await db.collection('users').findOne({ username });

            if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const result = await db.collection('users').insertOne({
                username,
                password: hashedPassword,
            });

            return res.status(201).json({ message: 'User registered', userId: result.insertedId });
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}

// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let cachedDb: MongoClient | null = null;

export const connectToDatabase = async () => {
    if (cachedDb) {
        return cachedDb.db('my-music-app');
    }

    try {
        await client.connect();
        cachedDb = client;
        return cachedDb.db('my-music-app');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw new Error('Failed to connect to MongoDB');
    }
};

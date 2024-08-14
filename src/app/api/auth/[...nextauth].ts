// src/pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/lib/mongodb'; // Убедитесь, что путь правильный
import bcrypt from 'bcrypt';

export default NextAuth({
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const db = await connectToDatabase();
                const user = await db.collection('users').findOne({ username: credentials?.username });
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    return { id: user._id, name: user.username };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
});

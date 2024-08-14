// app/auth/signin/page.tsx
"use client";

// Пример страницы входа (pages/auth/signin.tsx)
import { getProviders, signIn, getSession } from 'next-auth/react';
import { useState } from 'react';

export default function SignInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await signIn('credentials', {
                redirect: false,
                username,
                password,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                // Redirect on success
                window.location.href = '/';
            }
        } catch (error) {
            setError('An error occurred');
        }
    };

    return (
        <main className={'flex justify-center'}>
            <div className={'flex flex-col justify-center w-[500px] text-center gap-5'}>
                <h1>Sign In</h1>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit} className={'flex flex-col w-[400px] m-auto gap-2'}>
                    <input
                        className={'text-black'}
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        className={'text-black'}
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button className={'bg-blue-600 rounded-md w-[200px] m-auto'} type="submit">Sign In</button>
                </form>
            </div>
        </main>
    );
}


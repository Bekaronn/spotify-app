"use client"; // Добавьте эту строку, если используете хуки состояния

import { useState } from 'react';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess('User registered successfully!');
                setUsername('');
                setPassword('');
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <main className={'flex justify-center'}>
            <div className={'flex flex-col justify-center w-[500px] text-center gap-5'}>
                <h1>Register</h1>
                {error && <p style={{color: 'red'}}>{error}</p>}
                {success && <p style={{color: 'green'}}>{success}</p>}
                <form onSubmit={handleSubmit} className={'flex flex-col w-[400px] m-auto gap-2'}>
                    <input
                        className={'text-black'}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        className={'text-black'}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit" className={'bg-blue-600 rounded-md w-[200px] m-auto'}>Register</button>
                </form>
            </div>
        </main>
    )
        ;
}

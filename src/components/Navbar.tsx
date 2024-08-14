// src/components/Navbar.tsx
"use client"; // Убедитесь, что этот импорт находится в начале файла

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <nav>
            {session ? (
                <div className={'pr-5'}>
                    {/*<span>Welcome, {session.user?.name}</span>*/}
                    <button onClick={() => signOut()}>Выйти</button>
                </div>
            ) : (
                <nav className={'flex items-center gap-5 pr-5'}>
                    <Link href={'/auth/register'}>
                        Зарегистрироваться
                    </Link>
                    <Link href={'/auth/signin'} className={'bg-white text-black rounded-xl p-2 px-4'}>
                        Войти
                    </Link>
                </nav>
            )}
        </nav>
    );
};

export default Navbar;

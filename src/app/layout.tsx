"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"
import {SessionProvider} from "next-auth/react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
    <body className={inter.className}>
    <header className='flex items-center justify-between p-5'>
        <div className={'flex items-center'}>
            <a className='flex items-center logo' href='/'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg" width='50px'
                     className={'pr-2'}/>
                <h1>Spotify</h1>
            </a>
            <nav className={'flex gap-5 pl-[100px]'}>
                <Link href={'/main'}>
                    Главная
                </Link>
                <Link href={'/songs'}>
                    Песни
                </Link>
                <Link href={'/search'}>
                    Поиск
                </Link>
            </nav>
        </div>
        <SessionProvider>
            <Navbar />
        </SessionProvider>
    </header>
    {children}
    </body>
    </html>
  );
}

"use client";

import { useState, useEffect } from 'react';

interface Song {
    _id: string;
    title: string;
    artist: string;
}

const SongsPage = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');

    // Получение всех песен
    const fetchSongs = async () => {
        try {
            const response = await fetch('/api/songs');
            if (!response.ok) throw new Error('Failed to fetch songs');
            const data = await response.json();
            setSongs(data);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    // Добавление новой песни
    const addSong = async () => {
        try {
            const response = await fetch('/api/songs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, artist }),
            });
            if (!response.ok) throw new Error('Failed to add song');
            const newSong = await response.json();
            setSongs([...songs, newSong]);
            setTitle('');
            setArtist('');
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };

    // Удаление песни
    const deleteSong = async (id: string) => {
        try {
            await fetch('/api/songs', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            setSongs(songs.filter(song => song._id !== id));
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    // Обновление песни
    const updateSong = async (id: string, newTitle: string, newArtist: string) => {
        try {
            await fetch('/api/songs', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, title: newTitle, artist: newArtist }),
            });
            setSongs(songs.map(song => song._id === id ? { ...song, title: newTitle, artist: newArtist } : song));
        } catch (error) {
            console.error('Error updating song:', error);
        }
    };

    return (
        <div className={'flex flex-col justify-center text-center px-20'}>
            <h1>Songs</h1>
            <input
                className={'text-black mb-2'}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                className={'text-black mb-2'}
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Artist"
            />
            <button onClick={addSong}>Add Song</button>
            <ul>
                {songs.map((song) => (
                    <li key={song._id}>
                        {song.title} by {song.artist}
                        <button onClick={() => deleteSong(song._id)}>Delete</button>
                        {/* Add form or modal to update song */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SongsPage;

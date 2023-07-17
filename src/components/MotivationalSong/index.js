import React from 'react';

const songList = [
    'https://open.spotify.com/track/1DIXPcTDzTj8ZMHt3PDt8p?si=196ae2396ebe45b6', // Don't stop me now
    'https://open.spotify.com/track/1hKdDCpiI9mqz1jVHRKG0E?si=bc1752eeb5554bd3', // Enter Sandman
    'https://open.spotify.com/track/2HHtWyy5CgaQbC7XSoOb0e?si=1c0741fc0a6942aa', // Eye of the Tiger
    'https://open.spotify.com/track/6nqdgUTiWt4JbABDurkxMI?si=0374cd5e5450476a', // Sahara
    'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=b5ec685f301d46f0', // Never Gonna Give You Up
]

export default function MotivationalSong({ children }) {

    function getRandomSong() {
        const randomIndex = Math.floor(Math.random() * songList.length);
        return songList[randomIndex];
    }

    const song = getRandomSong();
    return (
        <a href={song} target="_blank">{children}</a>
    );
}

import React, { useState, useEffect, useRef } from 'react';

function Player() {
  const [sounds, setSounds] = useState([]);
  const [currentSound, setCurrentSound] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const savedSounds = JSON.parse(localStorage.getItem('mySounds')) || [];
    if (savedSounds.length > 0) {
      setSounds(savedSounds);
    } else {
      const initialSounds = [
        { id: '1', name: 'עמוד האש', url: `${process.env.PUBLIC_URL}/sounds/amodesh.mp3` },
        { id: '2', name: 'הורדת הדגל', url: `${process.env.PUBLIC_URL}/sounds/flag.mp3` },
      ];
      setSounds(initialSounds);
      localStorage.setItem('mySounds', JSON.stringify(initialSounds));
    }
  }, []);

  const playSound = (soundId) => {
    const sound = sounds.find(s => s.id === soundId);
    if (sound) {
      if (currentSound === soundId) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setCurrentSound(null);
      } else {
        audioRef.current.src = sound.url;
        audioRef.current.play();
        setCurrentSound(soundId);
      }
    }
  };

  return (
    <div className="Player">
      <h2>נגן הצלילים</h2>
      <div className="sound-buttons">
        {sounds.map((sound) => (
          <button 
            key={sound.id} 
            onClick={() => playSound(sound.id)}
            className={currentSound === sound.id ? 'playing' : ''}
          >
            {sound.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Player;
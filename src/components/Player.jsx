import React, { useState, useEffect, useRef } from 'react';

function Player() {
  const [sounds, setSounds] = useState([]);
  const [currentSound, setCurrentSound] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/sounds.json`)
      .then(response => response.json())
      .then(data => setSounds(data.sounds))
      .catch(error => console.error('Error loading sounds:', error));
  }, []);

  const playSound = (soundId) => {
    const sound = sounds.find(s => s.id === soundId);
    if (sound) {
      if (currentSound === soundId) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setCurrentSound(null);
      } else {
        audioRef.current.src = `${process.env.PUBLIC_URL}${sound.url}`;
        audioRef.current.play();
        setCurrentSound(soundId);
      }
    }
  };

  return (
    <div className="Player">
      <h2>בחרו צליל והתחילו את הקסם</h2>
      <div className="sound-buttons">
        {sounds.map((sound) => (
          <button 
            key={sound.id} 
            onClick={() => playSound(sound.id)}
            className={currentSound === sound.id ? 'playing' : ''}
          >
            {sound.name}
            {currentSound === sound.id && <span> (מתנגן)</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Player;
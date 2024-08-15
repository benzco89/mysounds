// src/components/Player.jsx
import React, { useState, useEffect, useRef } from 'react';

const Player = () => {
  const [sounds, setSounds] = useState([]);
  const [currentSound, setCurrentSound] = useState(null);
  const audioRefs = useRef({});

  useEffect(() => {
    // טעינת הנתונים מקובץ ה-JSON
    fetch('/sounds.json')
      .then(response => response.json())
      .then(data => setSounds(data.sounds))
      .catch(error => console.error('Error loading sounds:', error));
  }, []);

  const playSound = (soundId) => {
    if (currentSound === soundId) {
      audioRefs.current[soundId].pause();
      audioRefs.current[soundId].currentTime = 0;
      setCurrentSound(null);
    } else {
      if (currentSound) {
        audioRefs.current[currentSound].pause();
        audioRefs.current[currentSound].currentTime = 0;
      }
      audioRefs.current[soundId].play();
      setCurrentSound(soundId);
    }
  };

  return (
    <div className="Player">
    
      <div className="sound-buttons">
        {sounds.map((sound) => (
          <button 
            key={sound.id} 
            onClick={() => playSound(sound.id)}
            className={currentSound === sound.id ? 'playing' : ''}
          >
            {sound.name}
            {currentSound === sound.id && <span className="playing-indicator"> ▶ </span>}
          </button>
        ))}
      </div>
      {sounds.map((sound) => (
        <audio 
          key={sound.id}
          ref={el => audioRefs.current[sound.id] = el}
          src={sound.url}
        />
      ))}
    </div>
  );
};

export default Player;
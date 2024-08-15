import React, { useState, useEffect, useRef } from 'react';

function Player() {
  const [sounds, setSounds] = useState([]);
  const [currentSound, setCurrentSound] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/sounds.json`)
      .then(response => response.json())
      .then(data => {
        setSounds(data.sounds);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error loading sounds:", err);
        setError("Failed to load sounds. Please try again later.");
        setIsLoading(false);
      });
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

  if (isLoading) return <div>טוען צלילים...</div>;
  if (error) return <div>{error}</div>;

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
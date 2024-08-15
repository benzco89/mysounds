import React, { useState, useEffect } from 'react';

function Admin() {
  const [sounds, setSounds] = useState([]);
  const [newSoundName, setNewSoundName] = useState('');
  const [newSoundUrl, setNewSoundUrl] = useState('');

  useEffect(() => {
    const savedSounds = JSON.parse(localStorage.getItem('mySounds')) || [];
    setSounds(savedSounds);
  }, []);

  const addSound = () => {
    if (newSoundName && newSoundUrl) {
      const newSound = {
        id: Date.now().toString(),
        name: newSoundName,
        url: newSoundUrl,
      };
      const updatedSounds = [...sounds, newSound];
      setSounds(updatedSounds);
      localStorage.setItem('mySounds', JSON.stringify(updatedSounds));
      setNewSoundName('');
      setNewSoundUrl('');
    }
  };

  const removeSound = (id) => {
    const updatedSounds = sounds.filter(sound => sound.id !== id);
    setSounds(updatedSounds);
    localStorage.setItem('mySounds', JSON.stringify(updatedSounds));
  };

  return (
    <div className="Admin">
      <h2>ניהול צלילים</h2>
      <div>
        <input 
          type="text" 
          placeholder="שם הצליל" 
          value={newSoundName}
          onChange={(e) => setNewSoundName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="כתובת URL של הצליל" 
          value={newSoundUrl}
          onChange={(e) => setNewSoundUrl(e.target.value)}
        />
        <button onClick={addSound}>הוסף צליל</button>
      </div>
      <ul>
        {sounds.map((sound) => (
          <li key={sound.id}>
            {sound.name} 
            <button onClick={() => removeSound(sound.id)}>הסר</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
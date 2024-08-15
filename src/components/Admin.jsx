// src/components/Admin.jsx
import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [sounds, setSounds] = useState([]);
  const [newSoundName, setNewSoundName] = useState('');
  const [newSoundFile, setNewSoundFile] = useState(null);

  useEffect(() => {
    loadSounds();
  }, []);

  const loadSounds = () => {
    fetch('/sounds.json')
      .then(response => response.json())
      .then(data => setSounds(data.sounds))
      .catch(error => console.error('Error loading sounds:', error));
  };

  const handleFileChange = (event) => {
    setNewSoundFile(event.target.files[0]);
  };

  const addSound = async () => {
    if (newSoundName && newSoundFile) {
      const formData = new FormData();
      formData.append('name', newSoundName);
      formData.append('file', newSoundFile);

      try {
        const response = await fetch('/api/upload-sound', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const newSound = await response.json();
          const updatedSounds = [...sounds, newSound];
          setSounds(updatedSounds);
          setNewSoundName('');
          setNewSoundFile(null);
          
          // עדכון הקובץ JSON
          await fetch('/api/update-sounds', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sounds: updatedSounds }),
          });
        } else {
          console.error('Error uploading sound');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const removeSound = async (id) => {
    const updatedSounds = sounds.filter(sound => sound.id !== id);
    setSounds(updatedSounds);

    try {
      await fetch('/api/update-sounds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sounds: updatedSounds }),
      });
    } catch (error) {
      console.error('Error updating sounds:', error);
    }
  };

  // ... (יתר הפונקציות נשארות כפי שהן)

  return (
    <div className="Admin">
      <h2>ניהול מנגינות</h2>
      <div className="sound-list">
        {sounds.map((sound) => (
          <div key={sound.id} className="sound-item">
            <span>{sound.name}</span>
            <button onClick={() => removeSound(sound.id)}>הסר</button>
          </div>
        ))}
      </div>
      <div className="add-sound-form">
        <input 
          type="text" 
          placeholder="שם המנגינה" 
          value={newSoundName}
          onChange={(e) => setNewSoundName(e.target.value)}
        />
        <input 
          type="file" 
          accept="audio/*" 
          onChange={handleFileChange}
        />
        <button onClick={addSound}>הוסף מנגינה</button>
      </div>
      {/* ... (שאר הקוד נשאר כפי שהוא) */}
    </div>
  );
};

export default Admin;
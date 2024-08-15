import React from 'react';
import Player from './components/Player';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🎵 צלילי הקסם 🎶</h1>
        <p>גלו את עולם הצלילים המיוחדים שלנו</p>
      </header>
      <main>
        <Player />
      </main>
      <footer>
        <p>© 2024 צלילי הקסם. כל הזכויות שמורות.</p>
      </footer>
    </div>
  );
}

export default App;
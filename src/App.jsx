import React from 'react';
import Player from './components/Player';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MySounds - נגן המנגינות שלי</h1>
      </header>
      <main>
        <Player />
      </main>
      <footer>
        <p>© 2024 MySounds. כל הזכויות שמורות.</p>
      </footer>
    </div>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Player from './components/Player';
import './App.css';

function App() {
  return (
    <Router basename="/mysounds">
      <div className="App">
        <header className="App-header">
          <h1>🎵 צלילי הקסם 🎶</h1>
          <p>גלו את עולם הצלילים המיוחדים שלנו</p>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Player />} />
          </Routes>
        </main>
        <footer>
          <p>© 2024 צלילי הקסם. כל הזכויות שמורות.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
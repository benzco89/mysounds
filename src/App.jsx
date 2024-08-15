// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Player from './components/Player';
import Admin from './components/Admin';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>🎵 צלילי קסם 🎵</h1>
        <div className="content">
          <Routes>
            <Route path="/" element={<Player />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">נגן</Link>
            </li>
            <li>
              <Link to="/admin">ניהול</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
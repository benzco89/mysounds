import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Player from './components/Player';
import Admin from './components/Admin';
import './App.css';

function App() {
  return (
    <Router basename="/mysounds">
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">נגן</Link></li>
            <li><Link to="/admin">ניהול</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Player />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
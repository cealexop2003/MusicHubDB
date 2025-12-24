import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Musicians from './pages/Musicians';
import MusicianDetail from './pages/MusicianDetail';
import Bands from './pages/Bands';
import BandDetail from './pages/BandDetail';
import Concerts from './pages/Concerts';
import ConcertDetail from './pages/ConcertDetail';
import JamSessions from './pages/JamSessions';
import JamSessionDetail from './pages/JamSessionDetail';
import Teachers from './pages/Teachers';
import Students from './pages/Students';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/musicians" element={<Musicians />} />
            <Route path="/musicians/:id" element={<MusicianDetail />} />
            <Route path="/bands" element={<Bands />} />
            <Route path="/bands/:id" element={<BandDetail />} />
            <Route path="/concerts" element={<Concerts />} />
            <Route path="/concerts/:id" element={<ConcertDetail />} />
            <Route path="/jam-sessions" element={<JamSessions />} />
            <Route path="/jam-sessions/:id" element={<JamSessionDetail />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/students" element={<Students />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

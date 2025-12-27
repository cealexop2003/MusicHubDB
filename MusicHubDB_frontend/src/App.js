import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MusicianDashboard from './pages/MusicianDashboard';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
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
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Role-based Dashboards */}
              <Route 
                path="/musician-dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['musician']}>
                    <MusicianDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/student-dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/teacher-dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <TeacherDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Public Pages */}
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
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Import Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Goals from './pages/Goals';
import Progress from './pages/Progress';
import Achievements from './pages/Achievements';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ContestTracker from './pages/ContestTracker';
import Settings from './pages/Settings';

const App = () => {
  const location = useLocation();
  
  const publicRoutes = ['/', '/login', '/register'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // 1. Full Screen Layout for Landings or Sign-in Pages
  if (isPublicRoute) {
    return (
      <>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1E293B',
              color: '#F8FAFC',
              border: '1px border #334155',
              fontSize: '13px',
              fontFamily: 'Outfit, sans-serif',
              borderRadius: '12px'
            }
          }}
        />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    );
  }

  // 2. Dashboards Panel Layout wrapping Sidebar and Headers around subpages
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans relative">
      {/* Background glow dots */}
      <div className="fixed w-[500px] h-[500px] bg-sky-500/[0.02] rounded-full blur-[100px] top-0 left-0 pointer-events-none"></div>
      <div className="fixed w-[500px] h-[500px] bg-sky-700/[0.02] rounded-full blur-[100px] bottom-0 right-0 pointer-events-none"></div>

      {/* Navigations sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Navigation global headers */}
        <Navbar />

        {/* Dashboard main console body */}
        <main className="flex-1 p-5 md:p-8 overflow-y-auto w-full max-w-7xl mx-auto">
          <Routes>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
            <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
            <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
            <Route path="/resume" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
            <Route path="/contests" element={<ProtectedRoute><ContestTracker /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>

      {/* Hot Notifier container */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1E293B',
            color: '#F8FAFC',
            border: '1px border #334155/50',
            fontSize: '13px',
            fontFamily: 'Outfit, sans-serif',
            borderRadius: '12px'
          }
        }}
      />
    </div>
  );
};

export default App;

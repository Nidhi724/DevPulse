import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI, profileAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize: Check if JWT token exists and fetch user profile
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('devpulse_token');
      if (token) {
        try {
          const res = await authAPI.getMe();
          if (res.data.success) {
            setUser(res.data.user);
            // Fetch detailed profile as well
            const profRes = await profileAPI.getMe();
            if (profRes.data.success) {
              setProfile(profRes.data.user);
            }
          }
        } catch (error) {
          console.error('Initialization authentication failed:', error);
          localStorage.removeItem('devpulse_token');
          setUser(null);
          setProfile(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await authAPI.login({ email, password });

      if (res.data.success) {
        localStorage.setItem('devpulse_token', res.data.token);
        setUser(res.data.user);

        // Fetch detailed profile
        try {
          const profRes = await profileAPI.getMe();
          if (profRes.data.success) {
            setProfile(profRes.data.user);
          }
        } catch (e) {
          console.error('Failed to load profile details during login', e);
        }

        toast.success(res.data.message || 'Welcome back to DevPulse!');
        return { success: true };
      }
    } catch (error) {
      const errMsg = error.message || 'Invalid login credentials.';
      toast.error(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const register = async (username, email, password) => {
    try {
      setLoading(true);
      const res = await authAPI.register({ username, email, password });

      if (res.data.success) {
        localStorage.setItem('devpulse_token', res.data.token);
        setUser(res.data.user);

        // Fetch initial profile
        try {
          const profRes = await profileAPI.getMe();
          if (profRes.data.success) {
            setProfile(profRes.data.user);
          }
        } catch (e) {
          console.error('Failed to load initial profile details', e);
        }

        toast.success('Registration successful! Welcome to DevPulse.');
        return { success: true };
      }
    } catch (error) {
      const errMsg = error.message || 'Registration failed. Please check inputs.';
      toast.error(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('devpulse_token');
    setUser(null);
    setProfile(null);
    toast.success('Logged out successfully.');
  };

  // Update profile details helper
  const updateProfile = async (payload) => {
    try {
      setLoading(true);
      const res = await profileAPI.update(payload);
      if (res.data.success) {
        setProfile(res.data.user);
        // Sync user state username as well
        setUser(prev => prev ? { ...prev, username: res.data.user.username } : null);
        toast.success('Profile updated successfully!');
        return { success: true };
      }
    } catch (error) {
      const errMsg = error.message || 'Profile update failed.';
      toast.error(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  // Synchronize statistics with live LeetCode/GitHub APIs
  const syncProfileStats = async () => {
    try {
      toast.loading('Synchronizing technical profile metrics...', { id: 'profile-sync' });
      const res = await profileAPI.sync();
      if (res.data.success) {
        // Fetch fresh profile state to capture any updated streaks or credentials
        const freshProf = await profileAPI.getMe();
        if (freshProf.data.success) {
          setProfile(freshProf.data.user);
        }
        toast.success('Profile synchronized successfully!', { id: 'profile-sync' });
        return { success: true, progress: res.data.progress };
      }
    } catch (error) {
      const errMsg = error.message || 'Synchronization failed. Check connected usernames.';
      toast.error(errMsg, { id: 'profile-sync' });
      return { success: false, error: errMsg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login,
        register,
        logout,
        updateProfile,
        syncProfileStats
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
};

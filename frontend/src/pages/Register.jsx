import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [validating, setValidating] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Inputs Validations
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all registration fields.');
      return;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    // Alphanumeric regex check for username
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(formData.username)) {
      setError('Username can only contain alphanumeric characters and underscores.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    setValidating(true);
    const result = await register(formData.username, formData.email, formData.password);
    setValidating(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] top-1/4 left-1/4"></div>
      <div className="absolute w-[300px] h-[300px] bg-sky-700/5 rounded-full blur-[100px] bottom-1/4 right-1/4"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="w-full max-w-md"
      >
        {/* Logo header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-sky-500 to-sky-700 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-slate-950" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M30 50 H45 L52 25 L60 75 L68 50 H70" />
              </svg>
            </div>
            <span className="text-md font-black tracking-wider text-slate-100 uppercase">DevPulse AI</span>
          </Link>
          <h2 className="text-xl font-bold text-slate-200">Register Account</h2>
          <p className="text-slate-400 text-xs mt-1.5 font-medium">Initialize your developer dashboard console</p>
        </div>

        {/* Register form Card */}
        <div className="glass-card p-8 border-slate-800 shadow-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Display validation error alert */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3 text-xs font-semibold rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center"
              >
                ⚠️ {error}
              </motion.div>
            )}

            {/* Username input field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 tracking-wider uppercase block">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <FiUser className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="codepulse"
                  className="w-full bg-slate-950 border border-slate-850 hover:border-slate-700/60 focus:border-sky-500 focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-600 transition-all font-medium"
                />
              </div>
            </div>

            {/* Email input field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 tracking-wider uppercase block">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <FiMail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  className="w-full bg-slate-950 border border-slate-850 hover:border-slate-700/60 focus:border-sky-500 focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-600 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password input field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 tracking-wider uppercase block">
                Create Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <FiLock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-850 hover:border-slate-700/60 focus:border-sky-500 focus:outline-none rounded-xl py-2.5 pl-10 pr-10 text-xs text-slate-200 placeholder-slate-600 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password input field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 tracking-wider uppercase block">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <FiLock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-850 hover:border-slate-700/60 focus:border-sky-500 focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-600 transition-all font-medium"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={validating}
              className="w-full glow-btn text-xs py-3 mt-4 flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {validating ? 'Registering Account...' : 'Create Account Console'} <FiArrowRight />
            </button>
          </form>

          {/* Helper navigation links */}
          <div className="mt-6 text-center text-xs font-semibold text-slate-500 border-t border-slate-900 pt-5">
            Already registered?{' '}
            <Link to="/login" className="text-sky-400 hover:text-sky-300 transition-colors">
              Sign In here
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

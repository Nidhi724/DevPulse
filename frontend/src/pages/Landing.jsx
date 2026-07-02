import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiActivity, FiZap, FiAward, FiFileText,
  FiCalendar, FiCpu, FiCheck, FiGithub
} from 'react-icons/fi';

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen relative overflow-hidden">
      {/* Glow backdrop circles */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-sky-700/10 rounded-full blur-[100px] -z-10"></div>

      {/* 1. Header Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-sky-500 to-sky-700 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-slate-950" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M30 50 H45 L52 25 L60 75 L68 50 H70" />
            </svg>
          </div>
          <span className="text-md font-black tracking-wider text-slate-50 uppercase">
            DevPulse
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-slate-400 hover:text-slate-200 text-sm font-semibold transition-colors">
            Login
          </Link>
          <Link to="/register" className="glow-btn text-xs px-4 py-2 flex items-center gap-1">
            Get Started <FiArrowRight />
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center z-10 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold shadow-md shadow-sky-500/5 uppercase tracking-wider">
            <FiCpu className="animate-spin" style={{ animationDuration: '4s' }} /> AI-Powered Developer Platform
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-100"
          >
            Track, Improve, and Showcase Your <br />
            <span className="text-glow-gradient bg-gradient-to-r from-sky-400 via-sky-300 to-sky-500 bg-clip-text text-transparent">
              Developer Journey
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed"
          >
            DevPulse synchronizes your public GitHub profile and competitive coding platform scores, offering AI-generated resume optimizations, goal checklists, and gamified streak scoreboards.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link to="/register" className="glow-btn py-3.5 px-8 text-sm flex items-center gap-2">
              Get Started for Free <FiArrowRight />
            </Link>
            <Link to="/login" className="outline-glow-btn py-3.5 px-8 text-sm">
              Login to Console
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. Visual Dashboard Preview Glass Card */}
      <section className="max-w-6xl mx-auto px-6 pb-28 relative">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', damping: 25 }}
          className="glass-card border-slate-800 p-3 sm:p-5 relative shadow-2xl shadow-sky-500/5 group"
        >
          {/* Glowing border element */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-sky-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10 blur-xl"></div>

          <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-900 aspect-video flex flex-col items-center justify-center relative">
            <div className="absolute w-[200px] h-[200px] bg-sky-500/10 rounded-full blur-[70px]"></div>

            {/* Visual SaaS Cockpit mockup */}
            <div className="w-4/5 h-3/4 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-6 space-y-6 flex flex-col justify-between select-none relative shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center font-bold text-xs uppercase">D</div>
                  <div>
                    <div className="h-3 w-24 bg-slate-800 rounded-md skeleton-pulse"></div>
                    <div className="h-2 w-12 bg-slate-800/60 rounded-sm skeleton-pulse mt-1.5"></div>
                  </div>
                </div>
                <div className="h-6 w-20 bg-amber-500/10 border border-amber-500/20 rounded-full skeleton-pulse"></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-24 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div className="h-2.5 w-1/2 bg-slate-800 rounded skeleton-pulse"></div>
                  <div className="h-6 w-2/3 bg-sky-500/20 rounded-lg skeleton-pulse"></div>
                </div>
                <div className="h-24 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div className="h-2.5 w-1/3 bg-slate-800 rounded skeleton-pulse"></div>
                  <div className="h-6 w-1/2 bg-emerald-500/20 rounded-lg skeleton-pulse"></div>
                </div>
                <div className="h-24 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div className="h-2.5 w-2/3 bg-slate-800 rounded skeleton-pulse"></div>
                  <div className="h-6 w-3/4 bg-amber-500/20 rounded-lg skeleton-pulse"></div>
                </div>
              </div>
              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-end">
                <div className="flex items-end gap-2 w-full h-full">
                  <div className="h-[20%] w-[10%] bg-slate-800 rounded skeleton-pulse"></div>
                  <div className="h-[40%] w-[10%] bg-slate-800 rounded skeleton-pulse"></div>
                  <div className="h-[30%] w-[10%] bg-slate-800 rounded skeleton-pulse"></div>
                  <div className="h-[60%] w-[10%] bg-sky-500/40 rounded skeleton-pulse"></div>
                  <div className="h-[55%] w-[10%] bg-sky-500/40 rounded skeleton-pulse"></div>
                  <div className="h-[75%] w-[10%] bg-sky-500/60 rounded skeleton-pulse"></div>
                  <div className="h-[90%] w-[10%] bg-gradient-to-t from-sky-500 to-sky-400 rounded shadow-md"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. Core Features Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">
            Engineered For Modern Software Developers
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-medium">
            Gain full control of your learning metrics, progress tracks, and tech applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-card p-6 border-slate-800 space-y-4 hover:border-sky-500/20 transition-all duration-300 group">
            <div className="glow-icon-blue w-11 h-11 flex items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 transition-transform group-hover:scale-110">
              <FiGithub className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-100">Live Profiles Syncing</h3>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              Connect your GitHub account. Synchronize follower count, language usage metrics, and active repositories directly to your metrics database.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-6 border-slate-800 space-y-4 hover:border-emerald-500/20 transition-all duration-300 group">
            <div className="glow-icon-green w-11 h-11 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-transform group-hover:scale-110">
              <FiActivity className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-100">Gamified streaks</h3>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              Log daily progress reports. Earn devScore points (+10 base points, +5 per problem solved) and protect your continuous streak counts.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card p-6 border-slate-800 space-y-4 hover:border-sky-500/20 transition-all duration-300 group">
            <div className="glow-icon-blue w-11 h-11 flex items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 transition-transform group-hover:scale-110">
              <FiFileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-100">AI Resume Optimizer</h3>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              Upload PDF resumes. Evaluate matching metrics against Job Descriptions to calculate your ATS score and generate optimal professional summary suggestions.
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-card p-6 border-slate-800 space-y-4 hover:border-amber-500/20 transition-all duration-300 group">
            <div className="glow-icon-yellow w-11 h-11 flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 transition-transform group-hover:scale-110">
              <FiCalendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-100">Contests Reminders</h3>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              Synchronize schedules for upcoming LeetCode, CodeChef, and Codeforces competition milestones, including time-remaining countdowns.
            </p>
          </div>

          {/* Card 5 */}
          <div className="glass-card p-6 border-slate-800 space-y-4 hover:border-sky-500/20 transition-all duration-300 group">
            <div className="glow-icon-blue w-11 h-11 flex items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 transition-transform group-hover:scale-110">
              <FiAward className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-100">Badges Achievements</h3>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              Hit goals milestones to unlock Bronze, Silver, Gold, and Explorer trophies, showcasing your competitive coding ratings.
            </p>
          </div>

          {/* Card 6 */}
          <div className="glass-card p-6 border-slate-800 space-y-4 hover:border-emerald-500/20 transition-all duration-300 group">
            <div className="glow-icon-green w-11 h-11 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-transform group-hover:scale-110">
              <FiZap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-100">AI Profiles Insights</h3>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
              Consolidate GitHub, LeetCode, and Codeforces profiles into a single dashboard. Leverage AI feedback to discover weak practice areas.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Resume Analyzer Preview Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900 flex flex-col lg:flex-row items-center gap-12">
        <div className="space-y-6 flex-1 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-bold uppercase tracking-wider">
            Resume Audit
          </div>
          <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight leading-snug">
            Audit your resume with <br />
            Our Advanced AI Analyzer
          </h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            Directly upload your PDF developer resume, paste your target Job Description, and DevPulse will immediately extract text to compute your ATS matching rating.
          </p>
          <ul className="space-y-3 font-semibold text-xs text-slate-300">
            <li className="flex items-center gap-2.5">
              <FiCheck className="text-emerald-400 w-4 h-4 bg-emerald-500/10 p-0.5 rounded-full" /> Calculate ATS Score out of 100
            </li>
            <li className="flex items-center gap-2.5">
              <FiCheck className="text-emerald-400 w-4 h-4 bg-emerald-500/10 p-0.5 rounded-full" /> Highlight missing crucial technical skills
            </li>
            <li className="flex items-center gap-2.5">
              <FiCheck className="text-emerald-400 w-4 h-4 bg-emerald-500/10 p-0.5 rounded-full" /> Generate tailored summary suggestions
            </li>
          </ul>
        </div>

        <div className="flex-1 w-full max-w-md">
          {/* Visual card mimicking output */}
          <div className="glass-card border-slate-800 p-6 space-y-6 relative overflow-hidden bg-slate-900/40">
            <div className="absolute right-0 top-0 bg-sky-500/5 w-24 h-24 rounded-full blur-xl"></div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
              <span className="text-xs font-bold text-slate-300">resume_v2_backend.pdf</span>
              <span className="text-xs font-bold text-sky-400">PDF Document</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-black text-lg">
                82%
              </div>
              <div>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">ATS Compliance Score</span>
                <span className="text-slate-200 text-sm font-bold block">Excellent Match Potential</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Audit Suggestions</span>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
                  ⚠️ <span className="font-semibold">Missing Keywords: Redux, TypeScript</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-sky-400 bg-sky-500/5 p-2 rounded-lg border border-sky-500/10">
                  ℹ️ <span className="font-semibold">Add measurable achievements (metrics)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-900">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">
            Developer Testimonials
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-medium">
            Discover how students and backend engineers leverage DevPulse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6 border-slate-800 bg-slate-900/30 flex flex-col justify-between gap-6">
            <p className="text-slate-300 text-sm font-medium leading-relaxed italic">
              "Connecting my GitHub and competitive coding usernames to DevPulse has completely automated my practice habits. Seeing my devScore grow based on actual commits and LeetCode solves gamifies my productivity."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-extrabold text-sm border border-sky-500/20">
                JD
              </div>
              <div>
                <span className="text-slate-200 text-sm font-bold block">John Doe</span>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Backend Engineer</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 border-slate-800 bg-slate-900/30 flex flex-col justify-between gap-6">
            <p className="text-slate-300 text-sm font-medium leading-relaxed italic">
              "The AI Resume Analyzer is a game changer. I uploaded my profile, pasted a job description for a React position, and immediately got actionable recommendations about missing keywords. I got three interview invites using the updated version!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-extrabold text-sm border border-emerald-500/20">
                SC
              </div>
              <div>
                <span className="text-slate-200 text-sm font-bold block">Sarah C.</span>
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Computer Science Student</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center relative">
        <div className="glass-card border-slate-800 p-8 sm:p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950">
          <div className="absolute top-0 right-0 bg-sky-500/5 w-60 h-60 rounded-full blur-2xl"></div>
          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Ready to Accelerate Your Developer Career?
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto font-medium">
              Join students and professional software developers tracking, practicing, and optimizing their growth metrics.
            </p>
            <div className="pt-4">
              <Link to="/register" className="glow-btn py-3.5 px-8 text-sm inline-flex items-center gap-2">
                Join DevPulse Now <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer Section */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-black text-xs">
              DP
            </div>
            <span className="text-slate-400 font-bold tracking-wider uppercase">DevPulse</span>
          </div>
          <p className="font-medium">
            &copy; {new Date().getFullYear()} DevPulse. All developer rights reserved. Developed with pair-programming expertise.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

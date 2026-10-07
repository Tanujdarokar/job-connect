import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { Sparkles, ShieldCheck, Users, Building2, CheckCircle2 } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50 dark:bg-dark-950 transition-colors">
      {/* Left Form Container */}
      <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between p-6 sm:p-10 lg:p-12 z-10">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* Center Auth Form */}
        <div className="w-full max-w-md mx-auto py-8">
          <Outlet />
        </div>

        {/* Bottom Helper */}
        <div className="text-center text-xs text-slate-400 dark:text-slate-500">
          <p>
            By signing in, you agree to our{' '}
            <span className="underline hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">
              Terms of Service
            </span>{' '}
            and{' '}
            <span className="underline hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>

      {/* Right Visual Brand Showcase */}
      <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 relative bg-gradient-to-br from-brand-950 via-slate-900 to-indigo-950 text-white p-12 flex-col justify-between overflow-hidden">
        {/* Background decorative glow effects */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />

        {/* Top Banner Tag */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-brand-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>AI-Powered Talent Matching Platform</span>
          </div>
          <Link
            to="/"
            className="text-xs text-slate-300 hover:text-white transition-colors underline"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Center Marketing Content */}
        <div className="relative z-10 my-auto max-w-xl space-y-6">
          <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight leading-tight">
            Unlock your next career leap with India’s most visionary companies.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Directly connect with engineering leaders, showcase verified skill badges, get instant AI resume feedback, and conduct seamless video interviews without recruiter middlemen.
          </p>

          {/* Value Props Checklist */}
          <div className="grid grid-cols-2 gap-3.5 pt-4">
            <div className="flex items-center gap-2.5 text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>1-Click Fast Apply</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>AI Resume Scorer</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Transparent Salaries</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>In-App Realtime Chat</span>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof Testimonial Card */}
        <div className="relative z-10 glass-dark rounded-2xl p-5 border border-white/10 max-w-lg">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
              alt="Aarav Sharma"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-400/50"
            />
            <div>
              <p className="text-xs font-bold text-white">Aarav Sharma</p>
              <p className="text-[11px] text-slate-400">Senior Frontend Engineer at TechCorp</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-2.5 italic">
            "JobConnect helped me land my dream role within 4 days. The direct recruiter chat and AI match score made all the difference."
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

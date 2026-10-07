import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart, ShieldCheck, Zap } from 'lucide-react';
import Logo from './Logo';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Logo showTagline size="large" />
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              JobConnect is India’s next-generation career ecosystem connecting forward-thinking tech professionals with top venture-backed startups and Fortune 500 innovators.
            </p>
            <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-500 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-500 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-500 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Seeker Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              For Job Seekers
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/jobs" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Explore Tech Jobs
                </Link>
              </li>
              <li>
                <Link to="/ai-tools" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  AI Resume Analyzer
                </Link>
              </li>
              <li>
                <Link to="/salaries" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Salary Benchmark 2026
                </Link>
              </li>
              <li>
                <Link to="/companies" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Company Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Employer Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              For Recruiters
            </h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/employer/jobs/new" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Post a Free Job
                </Link>
              </li>
              <li>
                <Link to="/employer/candidates" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Talent Sourcing Engine
                </Link>
              </li>
              <li>
                <Link to="/employer/interviews" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Live Video Interviews
                </Link>
              </li>
              <li>
                <Link to="/employer/analytics" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Hiring Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Platform
            </h4>
            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Verified Employers</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Sub-second Client Caching</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Crafted for Indian Tech</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
          <p>© 2026 JobConnect Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

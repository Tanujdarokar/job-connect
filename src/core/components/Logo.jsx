import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Sparkles } from 'lucide-react';

export const Logo = ({ size = 'default', showTagline = false }) => {
  const isLarge = size === 'large';

  return (
    <Link to="/" className="inline-flex items-center gap-2.5 group select-none">
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-accent-500 shadow-md shadow-brand-500/30 group-hover:scale-105 transition-transform duration-200 ${isLarge ? 'w-12 h-12' : 'w-10 h-10'}`}>
        <Briefcase className={`text-white ${isLarge ? 'w-6 h-6' : 'w-5 h-5'}`} />
        <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className={`font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1 ${isLarge ? 'text-2xl' : 'text-xl'}`}>
          Job<span className="text-brand-600 dark:text-brand-400">Connect</span>
          <span className="w-2 h-2 rounded-full bg-accent-500 inline-block"></span>
        </span>
        {showTagline && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 -mt-1">
            Career Ecosystem
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;

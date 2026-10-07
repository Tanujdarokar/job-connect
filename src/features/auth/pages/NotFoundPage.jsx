import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX, Home, Briefcase } from 'lucide-react';
import Button from '../../../core/components/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6 shadow-inner">
        <SearchX className="w-10 h-10" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
        404 Error
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
        Page Not Found
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mt-2 mb-6 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="flex gap-3">
        <Link to="/">
          <Button variant="outline" icon={Home}>
            Back to Home
          </Button>
        </Link>
        <Link to="/jobs">
          <Button variant="primary" icon={Briefcase}>
            Browse Jobs
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

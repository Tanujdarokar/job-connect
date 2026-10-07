import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import Button from '../../../core/components/Button';

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
        Access Restricted
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mt-2 mb-6">
        You do not have the required permissions or role to access this portal page. Please sign in with an authorized account.
      </p>
      <div className="flex gap-3">
        <Button onClick={() => navigate(-1)} variant="outline" icon={ArrowLeft}>
          Go Back
        </Button>
        <Link to="/">
          <Button variant="primary" icon={Home}>
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;

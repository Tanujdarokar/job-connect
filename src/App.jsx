import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { router } from './app/router';
import { checkAuth } from './features/auth/slice/authSlice';
import { ThemeProvider } from './core/theme/ThemeProvider';
import './core/i18n';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          className: 'glass text-xs font-semibold text-slate-800 dark:text-slate-100 shadow-xl border border-slate-200 dark:border-slate-800',
          style: {
            borderRadius: '16px',
            padding: '12px 16px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f43f5e',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </ThemeProvider>
  );
};

export default App;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  X,
  Briefcase,
  Building2,
  TrendingUp,
  Sparkles,
  LayoutDashboard,
  LogOut,
  User,
  PlusCircle,
} from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import Button from './Button';
import { logoutUser } from '../../features/auth/slice/authSlice';
import { USER_ROLES } from '../constants';

export const Navbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === USER_ROLES.EMPLOYER) return '/employer/dashboard';
    if (user.role === USER_ROLES.ADMIN) return '/admin/dashboard';
    return '/seeker/dashboard';
  };

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-dark-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo showTagline />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/jobs"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors"
            >
              <Briefcase className="w-4 h-4 text-brand-500" />
              <span>{t('nav.findJobs')}</span>
            </Link>
            <Link
              to="/companies"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors"
            >
              <Building2 className="w-4 h-4 text-indigo-500" />
              <span>{t('nav.companies')}</span>
            </Link>
            <Link
              to="/salaries"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors"
            >
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>{t('nav.salaries')}</span>
            </Link>
            <Link
              to="/ai-tools"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-accent-500" />
              <span className="relative">
                {t('nav.aiTools')}
                <span className="absolute -top-1.5 -right-6 text-[9px] font-bold px-1 py-0.2 rounded-full bg-accent-500 text-white leading-none">
                  AI
                </span>
              </span>
            </Link>
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />

            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
                <Link to={getDashboardPath()}>
                  <Button variant="primary" size="sm" icon={LayoutDashboard}>
                    {t('nav.dashboard')}
                  </Button>
                </Link>
                {user.role === USER_ROLES.EMPLOYER && (
                  <Link to="/employer/jobs/new">
                    <Button variant="secondary" size="sm" icon={PlusCircle}>
                      {t('nav.postJob')}
                    </Button>
                  </Link>
                )}
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 cursor-pointer p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-dark-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  >
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name || 'User')}`}
                      alt={user.name}
                      className="w-8 h-8 rounded-xl object-cover ring-2 ring-brand-500/20"
                    />
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                        {user.name ? user.name.split(' ')[0] : 'User'}
                      </p>
                      <p className="text-[10px] text-slate-400 capitalize">{user.role}</p>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      </div>
                      <Link
                        to={getDashboardPath()}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Dashboard
                      </Link>
                      {user.role === USER_ROLES.JOB_SEEKER && (
                        <>
                          <Link
                            to="/seeker/profile"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                          >
                            <User className="w-3.5 h-3.5" />
                            My Profile & Resume
                          </Link>
                          <Link
                            to="/seeker/applications"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                          >
                            <Briefcase className="w-3.5 h-3.5" />
                            Application Tracker
                          </Link>
                        </>
                      )}
                      <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        {t('nav.logout')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    {t('nav.signup')}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-950 px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800"
          >
            <Briefcase className="w-4 h-4 text-brand-500" />
            {t('nav.findJobs')}
          </Link>
          <Link
            to="/companies"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800"
          >
            <Building2 className="w-4 h-4 text-indigo-500" />
            {t('nav.companies')}
          </Link>
          <Link
            to="/salaries"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800"
          >
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            {t('nav.salaries')}
          </Link>
          <Link
            to="/ai-tools"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-800"
          >
            <Sparkles className="w-4 h-4 text-accent-500" />
            {t('nav.aiTools')}
          </Link>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button variant="primary" className="w-full">
                    {t('nav.dashboard')}
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  variant="outline"
                  className="w-full"
                >
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    {t('nav.signup')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

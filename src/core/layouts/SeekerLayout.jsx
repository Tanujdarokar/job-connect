import React from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  LayoutDashboard,
  Search,
  Bookmark,
  Briefcase,
  User,
  MessageSquare,
  Calendar,
  Sparkles,
  LogOut,
  Bell,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { logoutUser } from '../../features/auth/slice/authSlice';

export const SeekerLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/seeker/dashboard', icon: LayoutDashboard },
    { label: 'Explore Jobs', path: '/jobs', icon: Search },
    { label: 'My Applications', path: '/seeker/applications', icon: Briefcase },
    { label: 'Saved Jobs', path: '/seeker/saved', icon: Bookmark },
    { label: 'Profile & Resume', path: '/seeker/profile', icon: User },
    { label: 'Messages', path: '/chat', icon: MessageSquare },
    { label: 'Interviews', path: '/interviews', icon: Calendar },
    { label: 'AI Career Tools', path: '/ai-tools', icon: Sparkles, badge: 'AI' },
    { label: 'Salary Insights', path: '/salaries', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-dark-900 p-5 sticky top-0 h-screen z-30">
        <div className="space-y-6">
          <Logo showTagline />

          {/* User mini badge */}
          <div className="p-3 rounded-2xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-100 dark:border-brand-900/50 flex items-center gap-3">
            <img
              src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
              alt={user?.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-brand-500/20"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {user?.name}
              </p>
              <p className="text-[11px] text-brand-600 dark:text-brand-400 font-medium">
                {user?.profileCompletion || 85}% Profile Complete
              </p>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/20'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-800'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent-500 text-white font-bold">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between px-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-10">
        {/* Top Header on Tablet/Mobile and Desktop */}
        <header className="sticky top-0 z-20 h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-dark-950/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="hidden lg:block text-xs font-semibold text-slate-500 dark:text-slate-400">
            Welcome back, <span className="text-slate-900 dark:text-white font-bold">{user?.name}</span> 👋
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/notifications"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-dark-800 relative transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            </Link>
            <div className="lg:hidden">
              <ThemeToggle />
            </div>
            <Link to="/seeker/profile" className="lg:hidden">
              <img
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
                alt={user?.name}
                className="w-8 h-8 rounded-xl object-cover ring-2 ring-brand-500/20"
              />
            </Link>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-dark-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-around py-2 px-1">
        <NavLink
          to="/seeker/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-2 rounded-xl ${
              isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-2 rounded-xl ${
              isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Search className="w-5 h-5" />
          <span>Jobs</span>
        </NavLink>
        <NavLink
          to="/seeker/applications"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-2 rounded-xl ${
              isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Briefcase className="w-5 h-5" />
          <span>Applied</span>
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-2 rounded-xl ${
              isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <MessageSquare className="w-5 h-5" />
          <span>Chat</span>
        </NavLink>
        <NavLink
          to="/seeker/profile"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-2 rounded-xl ${
              isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default SeekerLayout;

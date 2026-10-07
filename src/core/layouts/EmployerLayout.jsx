import React from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  Users,
  BarChart3,
  Calendar,
  MessageSquare,
  Building,
  LogOut,
  Bell,
  Sparkles,
} from 'lucide-react';
import Logo from '../components/Logo';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { logoutUser } from '../../features/auth/slice/authSlice';

export const EmployerLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/employer/dashboard', icon: LayoutDashboard },
    { label: 'Post a New Job', path: '/employer/jobs/new', icon: PlusCircle, badge: 'New' },
    { label: 'Manage Jobs', path: '/employer/jobs', icon: Briefcase },
    { label: 'Sourcing & Candidates', path: '/employer/candidates', icon: Users },
    { label: 'Interviews & Video', path: '/employer/interviews', icon: Calendar },
    { label: 'Candidate Messages', path: '/chat', icon: MessageSquare },
    { label: 'Hiring Analytics', path: '/employer/analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-dark-900 p-5 sticky top-0 h-screen z-30">
        <div className="space-y-6">
          <Logo showTagline />

          {/* Company Mini Card */}
          <div className="p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
              <Building className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {user?.companyName || 'Recruiter Hub'}
              </p>
              <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                Employer Verified ✅
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/employer/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-brand-600 text-white shadow-md shadow-indigo-500/20'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-800'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500 text-white font-bold">
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
        <header className="sticky top-0 z-20 h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-dark-950/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Employer Dashboard</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-900 dark:text-white font-bold">{user?.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/employer/jobs/new" className="hidden sm:block">
              <button className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4" />
                <span>Post Job</span>
              </button>
            </Link>
            <Link
              to="/notifications"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-dark-800 relative transition-colors"
            >
              <Bell className="w-5 h-5" />
            </Link>
            <div className="lg:hidden">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-dark-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-around py-2 px-1">
        <NavLink
          to="/employer/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-2 rounded-xl ${
              isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/employer/jobs"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-2 rounded-xl ${
              isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Briefcase className="w-5 h-5" />
          <span>My Jobs</span>
        </NavLink>
        <NavLink
          to="/employer/jobs/new"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-2 rounded-xl ${
              isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <PlusCircle className="w-5 h-5 text-indigo-600" />
          <span>Post</span>
        </NavLink>
        <NavLink
          to="/employer/candidates"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-2 rounded-xl ${
              isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <Users className="w-5 h-5" />
          <span>Candidates</span>
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-2 rounded-xl ${
              isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
            }`
          }
        >
          <MessageSquare className="w-5 h-5" />
          <span>Messages</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default EmployerLayout;

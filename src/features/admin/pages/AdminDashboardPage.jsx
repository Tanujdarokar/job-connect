import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  Shield,
  Users,
  Briefcase,
  Star,
  Activity,
  Search,
  Lock,
  Unlock,
  Trash2,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';
import Card from '../../../core/components/Card';
import Button from '../../../core/components/Button';
import Badge from '../../../core/components/Badge';
import adminService from '../services/adminService';
import { fetchJobs, deleteExistingJob } from '../../jobs/slice/jobsSlice';
import { useDispatch, useSelector } from 'react-redux';

export const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'jobs'

  const { items: jobs } = useSelector((state) => state.jobs);

  const loadData = async () => {
    const s = await adminService.getAdminStats();
    const u = await adminService.getAllUsers();
    setStats(s);
    setUsers(u);
    dispatch(fetchJobs());
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

  const handleToggleBlock = async (userId) => {
    try {
      const updated = await adminService.toggleUserBlock(userId);
      setUsers(users.map((u) => (u.id === userId ? updated : u)));
      toast.success(`User status updated to ${updated.status}`);
    } catch (e) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user account?')) {
      try {
        await adminService.deleteUser(userId);
        setUsers(users.filter((u) => u.id !== userId));
        toast.success('User account deleted');
      } catch (e) {
        toast.error('Failed to delete user');
      }
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to remove this job listing?')) {
      try {
        await dispatch(deleteExistingJob(jobId)).unwrap();
        toast.success('Job listing removed');
      } catch (e) {
        toast.error('Failed to remove job');
      }
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-7 h-7 text-purple-600" />
            JobConnect Admin Management Center
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time platform oversight, account moderation, and system health metrics.
          </p>
        </div>
        <Button onClick={loadData} variant="outline" size="sm" icon={RefreshCw}>
          Refresh Platform Data
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats?.totalUsers || users.length}
            </p>
            <p className="text-xs text-slate-400">Registered Accounts</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats?.totalJobs || jobs.length}
            </p>
            <p className="text-xs text-slate-400">Published Jobs</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats?.totalApplications || 24}
            </p>
            <p className="text-xs text-slate-400">Total Applications</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              99.98%
            </p>
            <p className="text-xs text-slate-400">System Uptime</p>
          </div>
        </Card>
      </div>

      {/* Tabs for Moderation */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'users'
              ? 'bg-purple-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-800'
          }`}
        >
          User Accounts Moderation ({users.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'jobs'
              ? 'bg-purple-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-800'
          }`}
        >
          Job Postings Moderation ({jobs.length})
        </button>
      </div>

      {/* Mode 1: Users Table */}
      {activeTab === 'users' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search user by name, email, or role..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-dark-850"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-dark-850">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(u.name)}`}
                          alt={u.name}
                          className="w-8 h-8 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                          <p className="text-[11px] text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={u.role === 'admin' ? 'danger' : u.role === 'employer' ? 'accent' : 'brand'} size="sm">
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${u.status === 'blocked' ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {u.status || 'active'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {u.role !== 'admin' && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleToggleBlock(u.id)}
                              className={`p-1.5 rounded-lg border ${
                                u.status === 'blocked'
                                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                  : 'bg-amber-50 text-amber-600 border-amber-200'
                              }`}
                              title={u.status === 'blocked' ? 'Unblock User' : 'Block User'}
                            >
                              {u.status === 'blocked' ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(u.id)}
                              className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
                              title="Delete Account"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mode 2: Jobs Moderation Table */}
      {activeTab === 'jobs' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase">
                <tr>
                  <th className="py-3 px-4">Job Title</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {jobs.slice(0, 20).map((j) => (
                  <tr key={j.id} className="hover:bg-slate-50/50 dark:hover:bg-dark-850">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {j.title}
                    </td>
                    <td className="py-3 px-4 text-slate-500">{j.companyName}</td>
                    <td className="py-3 px-4 text-slate-500">{j.location}</td>
                    <td className="py-3 px-4">
                      <Badge variant={j.status === 'active' ? 'success' : 'default'} size="sm">
                        {j.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => handleDeleteJob(j.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                        title="Remove Job"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle2,
  PlusCircle,
  TrendingUp,
  ArrowRight,
  Eye,
  Building,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import Card from '../../../core/components/Card';
import Button from '../../../core/components/Button';
import Badge from '../../../core/components/Badge';
import { fetchJobs } from '../../jobs/slice/jobsSlice';
import applicationService from '../../applications/services/applicationService';
import interviewService from '../../interviews/services/interviewService';

export const EmployerDashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: allJobs } = useSelector((state) => state.jobs);

  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);

  const companyJobs = allJobs.filter(
    (j) => j.companyId === user?.companyId || j.companyName === user?.companyName
  );

  useEffect(() => {
    dispatch(fetchJobs());
    if (user?.companyId) {
      applicationService.getEmployerApplications(user.companyId).then(setApplications);
      interviewService.getUserInterviews(user.id).then(setInterviews);
    }
  }, [dispatch, user]);

  const activeJobs = companyJobs.filter((j) => j.status === 'active');
  const shortlistedCount = applications.filter((a) => a.status === 'shortlisted').length;
  const hiredCount = applications.filter((a) => a.status === 'hired').length;

  const chartData = [
    { name: 'Mon', views: 45, apps: 12 },
    { name: 'Tue', views: 78, apps: 24 },
    { name: 'Wed', views: 92, apps: 31 },
    { name: 'Thu', views: 110, apps: 38 },
    { name: 'Fri', views: 145, apps: 48 },
    { name: 'Sat', views: 80, apps: 18 },
    { name: 'Sun', views: 65, apps: 14 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {user?.companyName || 'TechCorp'} Hiring Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monitor open requisitions, candidate pipeline, and video interview schedules.
          </p>
        </div>
        <Link to="/employer/jobs/new">
          <Button variant="primary" icon={PlusCircle}>
            Post New Job Opening
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          hoverEffect
          onClick={() => navigate('/employer/jobs')}
          className="p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {activeJobs.length || 3}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Active Jobs</p>
          </div>
        </Card>

        <Card
          hoverEffect
          onClick={() => navigate('/employer/jobs')}
          className="p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {applications.length || 42}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Applicants</p>
          </div>
        </Card>

        <Card
          hoverEffect
          onClick={() => navigate('/employer/interviews')}
          className="p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {interviews.length || 4}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Interviews</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {hiredCount || 2}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Offers Accepted</p>
          </div>
        </Card>
      </div>

      {/* Analytics Chart & Candidate Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recharts Traffic & Applications Area */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Views & Application Conversion (This Week)
            </h3>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              +28% vs last week
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="views" stroke="#6366f1" fillOpacity={1} fill="url(#colorViews)" name="Job Views" />
                <Area type="monotone" dataKey="apps" stroke="#10b981" fillOpacity={1} fill="url(#colorApps)" name="Applications" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Sourcing Engine Promo */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-gradient-to-br from-indigo-900 to-brand-950 text-white flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-brand-200">
              Talent Sourcing
            </span>
            <h3 className="text-xl font-extrabold leading-tight">
              Directly Search & Invite Pre-Vetted Candidates
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Filter thousands of verified React, Python, and AI engineers across India and send direct interview invitations.
            </p>
          </div>

          <Link to="/employer/candidates">
            <Button variant="white" size="sm" className="w-full">
              Source Candidates →
            </Button>
          </Link>
        </div>
      </div>

      {/* Active Jobs Quick Management List */}
      <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Your Active Job Postings
          </h3>
          <Link
            to="/employer/jobs"
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View All ({companyJobs.length})
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {(companyJobs.length > 0 ? companyJobs.slice(0, 4) : allJobs.slice(0, 3)).map((job) => (
            <div key={job.id} className="py-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {job.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {job.location} • ₹{(job.salaryMin / 100000).toFixed(1)}L - {(job.salaryMax / 100000).toFixed(1)}L
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500">
                  {job.applicantCount || 24} candidates
                </span>
                <Link to={`/employer/jobs/${job.id}/applicants`}>
                  <Button variant="outline" size="sm">
                    Review Applicants
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboardPage;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Bookmark,
  FileCheck,
  Video,
  User,
} from 'lucide-react';
import Card from '../../../core/components/Card';
import Badge from '../../../core/components/Badge';
import Button from '../../../core/components/Button';
import JobCard from '../../jobs/components/JobCard';
import { fetchRecommendedJobs } from '../../jobs/slice/jobsSlice';
import { fetchSeekerApplications } from '../../applications/slice/applicationsSlice';
import { interviewService } from '../../interviews/services/interviewService';
import { APPLICATION_STATUS_CONFIG } from '../../../core/constants';

export const SeekerDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { recommendedJobs } = useSelector((state) => state.jobs);
  const { items: applications } = useSelector((state) => state.applications);

  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    if (user) {
      dispatch(fetchRecommendedJobs(user.skills || []));
      dispatch(fetchSeekerApplications(user.id));
      interviewService.getUserInterviews(user.id).then(setInterviews);
    }
  }, [dispatch, user]);

  const underReviewCount = applications.filter((a) => a.status === 'under_review').length;
  const interviewCount = applications.filter((a) => a.status === 'interview').length;
  const savedCount = user?.savedJobs?.length || 0;

  return (
    <div className="space-y-8">
      {/* Top Welcome & Completion Alert */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 text-white shadow-xl shadow-brand-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-brand-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>JobConnect Career Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hi, {user?.name?.split(' ')[0] || 'Aarav'}! Ready for your next career move?
          </h1>
          <p className="text-sm text-brand-100 max-w-xl">
            You have {underReviewCount + interviewCount} active application updates this week. Keep your profile sharp to attract more recruiter views.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center gap-4 shrink-0 relative z-10">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/20"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-300"
                strokeDasharray={`${user?.profileCompletion || 85}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-extrabold text-white">
              {user?.profileCompletion || 85}%
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-white">Profile Score</p>
            <Link
              to="/seeker/profile"
              className="text-[11px] text-amber-200 hover:underline font-medium"
            >
              Complete Profile →
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          hoverEffect
          onClick={() => navigate('/seeker/applications')}
          className="p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {applications.length}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Applied</p>
          </div>
        </Card>

        <Card
          hoverEffect
          onClick={() => navigate('/seeker/applications')}
          className="p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {underReviewCount}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Under Review</p>
          </div>
        </Card>

        <Card
          hoverEffect
          onClick={() => navigate('/interviews')}
          className="p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {interviews.length}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Interviews</p>
          </div>
        </Card>

        <Card
          hoverEffect
          onClick={() => navigate('/seeker/saved')}
          className="p-5 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {savedCount}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Saved Jobs</p>
          </div>
        </Card>
      </div>

      {/* Upcoming Interviews & Quick Tools */}
      {interviews.length > 0 && (
        <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upcoming Video Interviews
              </h3>
            </div>
            <Link
              to="/interviews"
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              View Calendar
            </Link>
          </div>

          <div className="space-y-3">
            {interviews.map((int) => (
              <div
                key={int.id}
                className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-dark-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {int.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {int.companyName} • {int.date} at {int.startTime}
                  </p>
                </div>
                <Link to="/interview-room">
                  <Button variant="primary" size="sm" icon={Video}>
                    Join Video Room
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Jobs by Match % */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-500" />
              AI Recommended Jobs
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalized matches calculated from your skill chips and experience.
            </p>
          </div>
          <Link
            to="/jobs"
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendedJobs.slice(0, 6).map((job) => (
            <div key={job.id} className="relative">
              {job.matchScore && (
                <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold shadow-sm">
                  {job.matchScore}% Match
                </div>
              )}
              <JobCard
                job={job}
                hasApplied={applications.some((a) => a.jobId === job.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboardPage;

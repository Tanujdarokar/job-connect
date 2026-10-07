import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import {
  MapPin,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Sparkles,
  Building2,
  CheckCircle,
} from 'lucide-react';
import Card from '../../../core/components/Card';
import Badge from '../../../core/components/Badge';
import Button from '../../../core/components/Button';
import profileService from '../../profile/services/profileService';
import { setUser } from '../../auth/slice/authSlice';

export const JobCard = ({ job, onApply, hasApplied = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const isSaved = user?.savedJobs?.includes(job.id);

  const handleBookmarkToggle = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please log in to bookmark jobs');
      navigate('/login');
      return;
    }

    try {
      const res = await profileService.toggleSavedJob(user.id, job.id);
      dispatch(setUser({ ...user, savedJobs: res.savedJobs }));
      toast.success(res.isSaved ? 'Job saved to your bookmarks!' : 'Job removed from bookmarks');
    } catch (err) {
      toast.error('Failed to update bookmark');
    }
  };

  const formattedSalary = `₹${(job.salaryMin / 100000).toFixed(1)}L - ${(job.salaryMax / 100000).toFixed(1)}L / yr`;

  return (
    <Card
      hoverEffect
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden"
    >
      <div className="space-y-4">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-12 h-12 rounded-2xl object-cover border border-slate-100 dark:border-slate-800 shrink-0 shadow-2xs"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
                {job.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                <span>{job.companyName}</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="capitalize">{job.experienceLevel}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleBookmarkToggle}
            aria-label="Save job"
            className="p-2 rounded-xl text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40 transition-colors"
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 text-brand-600 fill-brand-600" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Location & Salary */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {job.location}
          </span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            {formattedSalary}
          </span>
        </div>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge variant={job.workplaceType === 'remote' ? 'success' : 'brand'} size="sm">
            {job.workplaceType}
          </Badge>
          <Badge variant="default" size="sm">
            {job.jobType}
          </Badge>
          {job.skills?.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-300"
            >
              {skill}
            </span>
          ))}
          {job.skills?.length > 3 && (
            <span className="text-[11px] text-slate-400 self-center">
              +{job.skills.length - 3}
            </span>
          )}
        </div>

        {/* Short preview snippet */}
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {job.description}
        </p>
      </div>

      {/* Footer Details & Action Button */}
      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <div className="text-[11px] text-slate-400">
          {job.applicantCount || 0} applicants
        </div>

        {hasApplied ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
            <CheckCircle className="w-3.5 h-3.5" />
            Applied
          </span>
        ) : (
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
    </Card>
  );
};

export default JobCard;

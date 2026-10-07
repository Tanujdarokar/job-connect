import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import {
  MapPin,
  Building2,
  Calendar,
  Briefcase,
  Share2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Send,
  FileText,
  UserCheck,
  Check,
  Eye,
  AlertCircle,
} from 'lucide-react';
import Button from '../../../core/components/Button';
import Badge from '../../../core/components/Badge';
import Card from '../../../core/components/Card';
import Modal from '../../../core/components/Modal';
import Skeleton from '../../../core/components/Skeleton';
import JobCard from '../components/JobCard';
import { fetchJobById, fetchSimilarJobs } from '../slice/jobsSlice';
import { applyToJob, fetchSeekerApplications } from '../../applications/slice/applicationsSlice';
import profileService from '../../profile/services/profileService';
import { setUser } from '../../auth/slice/authSlice';
import { USER_ROLES } from '../../../core/constants';

export const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedJob: job, similarJobs, isLoading } = useSelector((state) => state.jobs);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items: appliedList, isLoading: isApplying } = useSelector((state) => state.applications);

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
      dispatch(fetchSimilarJobs(id));
      if (user?.role === USER_ROLES.JOB_SEEKER) {
        dispatch(fetchSeekerApplications(user.id));
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, dispatch, user]);

  const hasApplied = appliedList.some((a) => a.jobId === id);
  const isSaved = user?.savedJobs?.includes(id);

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to save this job');
      navigate('/login');
      return;
    }
    try {
      const res = await profileService.toggleSavedJob(user.id, job.id);
      dispatch(setUser({ ...user, savedJobs: res.savedJobs }));
      toast.success(res.isSaved ? 'Job saved to your bookmarks!' : 'Job removed from bookmarks');
    } catch (e) {
      toast.error('Failed to bookmark job');
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please log in as a Job Seeker to apply');
      navigate('/login');
      return;
    }

    if (user.role !== USER_ROLES.JOB_SEEKER) {
      toast.error('Only registered Job Seekers can apply for jobs');
      return;
    }

    try {
      await dispatch(
        applyToJob({
          jobId: job.id,
          seekerId: user.id,
          seekerName: user.name,
          seekerEmail: user.email,
          seekerHeadline: user.headline,
          seekerAvatar: user.avatar,
          resumeUrl: user.resume?.fileName || 'Resume.pdf',
          coverLetter,
        })
      ).unwrap();

      setApplyModalOpen(false);
      setCoverLetter('');

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      toast.success('🎉 Application submitted successfully! The hiring team has been notified.');
    } catch (err) {
      toast.error(err || 'Failed to submit application');
    }
  };

  const handleShareCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Job link copied to clipboard! 📋');
    setShareModalOpen(false);
  };

  if (isLoading || !job) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-44 w-full rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-96 md:col-span-2 rounded-3xl" />
          <Skeleton className="h-96 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-100 dark:border-slate-800 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {job.title}
                </h1>
                {job.featured && (
                  <Badge variant="accent" size="sm">
                    Featured
                  </Badge>
                )}
              </div>
              <Link
                to={`/companies/${job.companyId}`}
                className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1.5 mt-0.5"
              >
                <span>{job.companyName}</span>
                <span className="text-emerald-500 font-bold">✓ Verified</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={handleBookmark}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-dark-850 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Save job"
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5 text-brand-600 fill-brand-600" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setShareModalOpen(true)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-dark-850 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Share job"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Highlights Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Offered CTC</p>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              ₹{(job.salaryMin / 100000).toFixed(1)}L - {(job.salaryMax / 100000).toFixed(1)}L / yr
            </p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Location</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {job.location}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Experience</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 capitalize">
              {job.experienceLevel}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium">Workplace</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 capitalize">
              {job.workplaceType} ({job.jobType})
            </p>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>{job.applicantCount || 0} applicants</span>
          </div>

          {hasApplied ? (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Applied on {new Date().toLocaleDateString()}</span>
            </div>
          ) : (
            <Button
              onClick={() => setApplyModalOpen(true)}
              variant="primary"
              size="lg"
              icon={Send}
            >
              Apply Now (1-Click)
            </Button>
          )}
        </div>
      </div>

      {/* Main Content Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Specification Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Skills Required */}
          <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Required Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills?.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 text-xs font-semibold border border-brand-200 dark:border-brand-900/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              About the Role
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Key Responsibilities
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Candidate Requirements
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits & Perks */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Perks & Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                {job.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-dark-850 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Company Card & Similar Jobs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              About the Company
            </h3>
            <div className="flex items-center gap-3">
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {job.companyName}
                </p>
                <p className="text-xs text-slate-400">{job.location}</p>
              </div>
            </div>
            <Link to={`/companies/${job.companyId}`}>
              <Button variant="outline" size="sm" className="w-full">
                View Company Profile
              </Button>
            </Link>
          </div>

          {/* Similar Jobs */}
          {similarJobs.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Similar Opportunities
              </h3>
              <div className="space-y-3">
                {similarJobs.map((simJob) => (
                  <Card
                    key={simJob.id}
                    hoverEffect
                    onClick={() => navigate(`/jobs/${simJob.id}`)}
                    className="p-4 flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {simJob.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">{simJob.companyName}</p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600">
                      ₹{(simJob.salaryMin / 100000).toFixed(0)}L+
                    </span>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      <Modal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title={`Apply to ${job.companyName}`}
        subtitle={`Position: ${job.title}`}
      >
        <form onSubmit={handleApplySubmit} className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-brand-50/50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 flex items-center gap-3">
            <FileText className="w-6 h-6 text-brand-600 dark:text-brand-400 shrink-0" />
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {user?.resume?.fileName || `${user?.name || 'Candidate'}_Resume.pdf`}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Primary resume on file (Ready to send)
              </p>
            </div>
            <Link
              to="/seeker/profile"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline shrink-0"
            >
              Change
            </Link>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Cover Letter / Note to Recruiter (Optional)
            </label>
            <textarea
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Highlight why your skills and experience are a great match for this role..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-850 p-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 placeholder:text-slate-400"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setApplyModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isApplying}
              className="flex-1"
              icon={Send}
            >
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>

      {/* Share Modal */}
      <Modal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title="Share this Job"
        subtitle="Spread the word with your network"
      >
        <div className="space-y-4">
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-dark-850 text-xs text-slate-600 dark:text-slate-300 break-all font-mono">
            {window.location.href}
          </div>
          <Button onClick={handleShareCopy} variant="primary" className="w-full">
            Copy Link to Clipboard
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default JobDetailsPage;

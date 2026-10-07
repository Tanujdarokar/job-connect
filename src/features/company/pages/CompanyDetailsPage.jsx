import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  Building2,
  MapPin,
  Star,
  Users,
  Globe,
  Briefcase,
  Sparkles,
  MessageSquare,
  Plus,
  CheckCircle2,
} from 'lucide-react';
import Button from '../../../core/components/Button';
import Card from '../../../core/components/Card';
import Badge from '../../../core/components/Badge';
import Modal from '../../../core/components/Modal';
import JobCard from '../../jobs/components/JobCard';
import companyService from '../services/companyService';
import jobService from '../../jobs/services/jobService';

export const CompanyDetailsPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [company, setCompany] = useState(null);
  const [openJobs, setOpenJobs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');

  useEffect(() => {
    if (id) {
      companyService.getCompanyById(id).then(setCompany);
      companyService.getReviews(id).then(setReviews);
      jobService.getJobs({ companyId: id }).then(setOpenJobs);
    }
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please log in to submit a review');
      return;
    }

    try {
      const newRev = await companyService.addReview({
        companyId: id,
        authorName: user.name,
        rating: Number(rating),
        title: reviewTitle,
        pros,
        cons,
        role: user.headline || 'Verified Professional',
      });
      setReviews([newRev, ...reviews]);
      setReviewModalOpen(false);
      setReviewTitle('');
      setPros('');
      setCons('');
      toast.success('Review submitted successfully!');
    } catch (err) {
      toast.error('Failed to submit review');
    }
  };

  if (!company) {
    return <div className="max-w-5xl mx-auto p-12 text-center text-sm text-slate-400">Loading company profile...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner & Header */}
      <div className="rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="h-48 sm:h-64 w-full relative overflow-hidden bg-slate-100 dark:bg-dark-800">
          <img
            src={company.banner}
            alt={company.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="p-6 sm:p-8 relative -mt-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <img
              src={company.logo}
              alt={company.name}
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-white dark:ring-dark-900 shadow-xl bg-white"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                {company.name}
                <span className="text-emerald-500 text-sm font-bold">✓ Verified</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {company.industry} • {company.location} • Founded {company.founded}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/60 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{company.rating}</span>
              <span className="text-xs text-slate-400 font-normal">({reviews.length} reviews)</span>
            </div>
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-dark-850 text-slate-600 dark:text-slate-300"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Description & Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              About {company.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {company.description}
            </p>
          </div>

          {/* Benefits */}
          <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Employee Benefits & Culture
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {company.benefits?.map((b, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-dark-850 flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Open Roles at Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-brand-600" />
              Open Positions ({openJobs.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {openJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Reviews Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Employee Reviews
              </h3>
              <button
                type="button"
                onClick={() => setReviewModalOpen(true)}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Write Review
              </button>
            </div>

            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-dark-850 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {rev.authorName}
                    </span>
                    <div className="flex items-center text-amber-500 text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{rev.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    "{rev.title}"
                  </p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                    <span className="font-bold">Pros:</span> {rev.pros}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-bold">Cons:</span> {rev.cons}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title={`Write a Review for ${company.name}`}
        subtitle="Share your workplace experience anonymously"
      >
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
              Overall Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 ${
                    rating >= num
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-100 dark:bg-dark-800 text-slate-400'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                  <span>{num}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Review Headline
            </label>
            <input
              type="text"
              required
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="e.g. Great engineering culture and learning opportunities"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 p-2.5 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-emerald-600">Pros</label>
            <textarea
              rows={2}
              required
              value={pros}
              onChange={(e) => setPros(e.target.value)}
              placeholder="What do you enjoy about working here?"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 p-2.5 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-rose-600">Cons</label>
            <textarea
              rows={2}
              required
              value={cons}
              onChange={(e) => setCons(e.target.value)}
              placeholder="What could be improved?"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 p-2.5 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Submit Verified Review
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default CompanyDetailsPage;

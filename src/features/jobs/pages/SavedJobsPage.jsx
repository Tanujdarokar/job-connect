import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bookmark, Search, ArrowRight } from 'lucide-react';
import JobCard from '../components/JobCard';
import EmptyState from '../../../core/components/EmptyState';
import Button from '../../../core/components/Button';
import { fetchJobs } from '../slice/jobsSlice';

export const SavedJobsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: allJobs, isLoading } = useSelector((state) => state.jobs);
  const { items: appliedList } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const savedJobIds = user?.savedJobs || [];
  const savedJobs = allJobs.filter((job) => savedJobIds.includes(job.id));
  const appliedJobIds = new Set(appliedList.map((a) => a.jobId));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Saved Opportunities
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            You have <span className="font-bold text-brand-600">{savedJobs.length}</span> saved jobs bookmarked for later.
          </p>
        </div>
        <Link to="/jobs">
          <Button variant="outline" size="sm" icon={Search}>
            Browse More Jobs
          </Button>
        </Link>
      </div>

      {savedJobs.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No bookmarked jobs yet"
          description="Click the bookmark icon on any job card to save roles you're interested in."
          actionLabel="Explore Jobs"
          onAction={() => window.location.assign('/jobs')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              hasApplied={appliedJobIds.has(job.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobsPage;

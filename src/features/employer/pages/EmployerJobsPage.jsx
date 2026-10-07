import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Briefcase,
  Users,
  PlusCircle,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import Card from '../../../core/components/Card';
import Button from '../../../core/components/Button';
import Badge from '../../../core/components/Badge';
import EmptyState from '../../../core/components/EmptyState';
import {
  fetchJobs,
  updateExistingJob,
  deleteExistingJob,
} from '../../jobs/slice/jobsSlice';

export const EmployerJobsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items: allJobs } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const companyJobs = allJobs.filter(
    (j) => j.companyId === user?.companyId || j.companyName === user?.companyName
  );

  const handleToggleStatus = async (job) => {
    const newStatus = job.status === 'active' ? 'closed' : 'active';
    try {
      await dispatch(
        updateExistingJob({ id: job.id, updates: { status: newStatus } })
      ).unwrap();
      toast.success(`Job marked as ${newStatus}`);
    } catch (e) {
      toast.error('Failed to update job status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await dispatch(deleteExistingJob(id)).unwrap();
        toast.success('Job posting deleted');
      } catch (e) {
        toast.error('Failed to delete job');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Manage Job Postings
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            You have <span className="font-bold text-indigo-600">{companyJobs.length}</span> positions listed for {user?.companyName || 'your organization'}.
          </p>
        </div>
        <Link to="/employer/jobs/new">
          <Button variant="primary" icon={PlusCircle}>
            Post New Opening
          </Button>
        </Link>
      </div>

      {companyJobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No job postings found"
          description="Create your first job listing to start receiving candidate applications."
          actionLabel="Post a Job"
          onAction={() => navigate('/employer/jobs/new')}
        />
      ) : (
        <div className="space-y-4">
          {companyJobs.map((job) => (
            <Card
              key={job.id}
              className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {job.title}
                  </h3>
                  <Badge variant={job.status === 'active' ? 'success' : 'default'} size="sm">
                    {job.status === 'active' ? 'Live' : 'Closed'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {job.location} • ₹{(job.salaryMin / 100000).toFixed(1)}L - {(job.salaryMax / 100000).toFixed(1)}L • Posted {new Date(job.postedAt).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>{job.applicantCount || 0} applicants</span>
                  <span>•</span>
                  <span>{job.viewsCount || 0} views</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
                <Link to={`/employer/jobs/${job.id}/applicants`}>
                  <Button variant="primary" size="sm" icon={Users}>
                    View Applicants ({job.applicantCount || 0})
                  </Button>
                </Link>

                <button
                  type="button"
                  onClick={() => handleToggleStatus(job)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-dark-800"
                >
                  {job.status === 'active' ? 'Close Job' : 'Reopen Job'}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(job.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50"
                  title="Delete Job"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerJobsPage;

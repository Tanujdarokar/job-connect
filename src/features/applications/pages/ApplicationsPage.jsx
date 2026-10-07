import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Briefcase,
  Clock,
  CheckCircle2,
  Calendar,
  XCircle,
  FileText,
  Search,
  ChevronRight,
  Trash2,
  Building2,
} from 'lucide-react';
import Card from '../../../core/components/Card';
import Button from '../../../core/components/Button';
import Badge from '../../../core/components/Badge';
import Modal from '../../../core/components/Modal';
import EmptyState from '../../../core/components/EmptyState';
import {
  fetchSeekerApplications,
  withdrawApp,
} from '../slice/applicationsSlice';
import { APPLICATION_STATUS_CONFIG } from '../../../core/constants';

export const ApplicationsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: applications, isLoading } = useSelector((state) => state.applications);

  const [activeTab, setActiveTab] = useState('all');
  const [selectedTimelineApp, setSelectedTimelineApp] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchSeekerApplications(user.id));
    }
  }, [dispatch, user]);

  const handleWithdraw = async (appId) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      try {
        await dispatch(withdrawApp(appId)).unwrap();
        toast.success('Application withdrawn');
        if (selectedTimelineApp?.id === appId) {
          setSelectedTimelineApp(null);
        }
      } catch (e) {
        toast.error('Failed to withdraw application');
      }
    }
  };

  const filteredApplications =
    activeTab === 'all'
      ? applications
      : applications.filter((app) => app.status === activeTab);

  const tabs = [
    { id: 'all', label: 'All', count: applications.length },
    { id: 'applied', label: 'Applied', count: applications.filter((a) => a.status === 'applied').length },
    { id: 'under_review', label: 'Under Review', count: applications.filter((a) => a.status === 'under_review').length },
    { id: 'shortlisted', label: 'Shortlisted', count: applications.filter((a) => a.status === 'shortlisted').length },
    { id: 'interview', label: 'Interview', count: applications.filter((a) => a.status === 'interview').length },
    { id: 'hired', label: 'Hired 🎉', count: applications.filter((a) => a.status === 'hired').length },
    { id: 'rejected', label: 'Not Selected', count: applications.filter((a) => a.status === 'rejected').length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Application Tracker
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Track the real-time stage and interview status of all your submitted job applications.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/20'
                : 'bg-white dark:bg-dark-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                activeTab === tab.id
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      {filteredApplications.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No applications in this stage"
          description="Ready to apply for high-growth tech positions?"
          actionLabel="Explore Verified Jobs"
          onAction={() => window.location.assign('/jobs')}
        />
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => {
            const statusCfg = APPLICATION_STATUS_CONFIG[app.status] || APPLICATION_STATUS_CONFIG.applied;
            return (
              <Card
                key={app.id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={app.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120'}
                    alt={app.companyName}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-100 dark:border-slate-800 shrink-0"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {app.jobTitle}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {app.companyName} • Applied on {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${statusCfg.color}`}
                      >
                        {statusCfg.label}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedTimelineApp(app)}
                        className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                      >
                        View Timeline <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Link to={`/jobs/${app.jobId}`}>
                    <Button variant="outline" size="sm">
                      Job Spec
                    </Button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleWithdraw(app.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    title="Withdraw Application"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Timeline Modal */}
      {selectedTimelineApp && (
        <Modal
          isOpen={!!selectedTimelineApp}
          onClose={() => setSelectedTimelineApp(null)}
          title="Application Progress Timeline"
          subtitle={`${selectedTimelineApp.jobTitle} at ${selectedTimelineApp.companyName}`}
        >
          <div className="space-y-6 py-2">
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-dark-800">
              {selectedTimelineApp.timeline?.map((event, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-brand-600 ring-4 ring-white dark:ring-dark-900 flex items-center justify-center text-white" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white capitalize">
                      {event.status.replace('_', ' ')}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {new Date(event.date).toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 bg-slate-50 dark:bg-dark-850 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                      {event.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <Button onClick={() => setSelectedTimelineApp(null)} variant="primary" size="sm">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ApplicationsPage;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import {
  Users,
  FileText,
  CheckCircle2,
  XCircle,
  Calendar,
  Sparkles,
  MessageSquare,
  Award,
  ArrowLeft,
  Clock,
  Send,
} from 'lucide-react';
import Card from '../../../core/components/Card';
import Button from '../../../core/components/Button';
import Badge from '../../../core/components/Badge';
import Modal from '../../../core/components/Modal';
import EmptyState from '../../../core/components/EmptyState';
import applicationService from '../../applications/services/applicationService';
import interviewService from '../../interviews/services/interviewService';
import notificationService from '../../notifications/services/notificationService';
import jobService from '../../jobs/services/jobService';
import { APPLICATION_STATUS_CONFIG, APPLICATION_STATUS } from '../../../core/constants';

export const JobApplicantsPage = () => {
  const { jobId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [interviewDate, setInterviewDate] = useState('2026-10-10');
  const [interviewTime, setInterviewTime] = useState('14:00');
  const [interviewTitle, setInterviewTitle] = useState('Technical Screening');

  useEffect(() => {
    if (jobId) {
      jobService.getJobById(jobId).then(setJob);
      applicationService.getJobApplications(jobId).then(setApplicants);
    }
  }, [jobId]);

  const handleUpdateStatus = async (appId, newStatus, candidate) => {
    try {
      const updated = await applicationService.updateStatus(
        appId,
        newStatus,
        `Status updated to ${newStatus} by ${user?.name || 'Recruiter'}`
      );

      setApplicants(applicants.map((a) => (a.id === appId ? updated : a)));

      // Send simulated push/in-app notification to candidate
      await notificationService.createNotification({
        userId: candidate.seekerId,
        title: `Application Update: ${job?.title || 'Position'}`,
        message: `${user?.companyName || 'Company'} updated your application status to ${newStatus.toUpperCase().replace('_', ' ')}.`,
        type: 'application',
      });

      if (newStatus === APPLICATION_STATUS.HIRED) {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        toast.success(`🎉 Candidate ${candidate.seekerName} has been marked HIRED!`);
      } else {
        toast.success(`Candidate status updated to ${newStatus.replace('_', ' ')}`);
      }
    } catch (e) {
      toast.error('Failed to update candidate status');
    }
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCandidate) return;

    try {
      await interviewService.scheduleInterview({
        jobId: job.id,
        jobTitle: job.title,
        companyName: user?.companyName || 'TechCorp',
        seekerId: selectedCandidate.seekerId,
        seekerName: selectedCandidate.seekerName,
        employerId: user.id,
        employerName: user.name,
        title: interviewTitle,
        date: interviewDate,
        startTime: interviewTime,
        endTime: '15:00',
        notes: 'Technical discussion and live code evaluation.',
      });

      // Update application status to interview
      await handleUpdateStatus(selectedCandidate.id, APPLICATION_STATUS.INTERVIEW, selectedCandidate);

      setScheduleModalOpen(false);
      toast.success(`Interview invitation dispatched to ${selectedCandidate.seekerName}! 📅`);
    } catch (e) {
      toast.error('Failed to schedule interview');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/employer/jobs"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to My Jobs
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Applicants for {job?.title || 'Job Opening'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {applicants.length} candidate profiles received.
          </p>
        </div>
      </div>

      {applicants.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No candidates have applied yet"
          description="Candidates will appear here as soon as they submit applications."
        />
      ) : (
        <div className="space-y-4">
          {applicants.map((app) => {
            const statusCfg = APPLICATION_STATUS_CONFIG[app.status] || APPLICATION_STATUS_CONFIG.applied;
            return (
              <Card key={app.id} className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={app.seekerAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(app.seekerName)}`}
                      alt={app.seekerName}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/20"
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {app.seekerName}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {app.seekerHeadline} • {app.seekerEmail}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Applied {new Date(app.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusCfg.color}`}>
                    {statusCfg.label}
                  </span>
                </div>

                {/* Cover Letter Snippet */}
                {app.coverLetter && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-850 text-xs text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800 italic">
                    "{app.coverLetter}"
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Previewing resume file: ${app.resumeUrl || 'Candidate_Resume.pdf'}`)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Preview Resume
                    </button>
                    <Link to="/chat">
                      <button className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-dark-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Chat
                      </button>
                    </Link>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleUpdateStatus(app.id, APPLICATION_STATUS.SHORTLISTED, app)}
                      className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 text-xs font-bold"
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCandidate(app);
                        setScheduleModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 text-xs font-bold flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" /> Schedule Video Interview
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(app.id, APPLICATION_STATUS.HIRED, app)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold"
                    >
                      Hire 🎉
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(app.id, APPLICATION_STATUS.REJECTED, app)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-xs font-bold"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Schedule Interview Modal */}
      <Modal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        title="Schedule Live Video Interview"
        subtitle={`Candidate: ${selectedCandidate?.seekerName}`}
      >
        <form onSubmit={handleScheduleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
              Interview Title
            </label>
            <input
              type="text"
              required
              value={interviewTitle}
              onChange={(e) => setInterviewTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 p-2.5 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
                Date
              </label>
              <input
                type="date"
                required
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 p-2.5 text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
                Start Time
              </label>
              <input
                type="time"
                required
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 p-2.5 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full" icon={Send}>
            Dispatch Calendar Invite
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default JobApplicantsPage;

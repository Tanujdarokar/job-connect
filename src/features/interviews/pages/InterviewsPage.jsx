import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Building,
  User,
  Plus,
} from 'lucide-react';
import Card from '../../../core/components/Card';
import Button from '../../../core/components/Button';
import Badge from '../../../core/components/Badge';
import Modal from '../../../core/components/Modal';
import EmptyState from '../../../core/components/EmptyState';
import interviewService from '../services/interviewService';

export const InterviewsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [interviews, setInterviews] = useState([]);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [proposedDate, setProposedDate] = useState('2026-10-12');
  const [proposedTime, setProposedTime] = useState('16:00');

  useEffect(() => {
    if (user) {
      interviewService.getUserInterviews(user.id).then(setInterviews);
    }
  }, [user]);

  const handleStatusUpdate = async (interviewId, newStatus) => {
    try {
      const updated = await interviewService.updateInterviewStatus(interviewId, newStatus);
      setInterviews(interviews.map((i) => (i.id === interviewId ? updated : i)));
      toast.success(`Interview marked as ${newStatus}`);
    } catch (e) {
      toast.error('Failed to update interview');
    }
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedInterview) return;

    try {
      const updated = await interviewService.updateInterviewStatus(
        selectedInterview.id,
        'rescheduled',
        `Rescheduled to ${proposedDate} at ${proposedTime}`
      );
      setInterviews(interviews.map((i) => (i.id === selectedInterview.id ? updated : i)));
      setRescheduleModalOpen(false);
      toast.success('Reschedule request sent to interviewer');
    } catch (e) {
      toast.error('Failed to reschedule');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Interview Schedules & Video Rooms
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Confirmed and upcoming technical rounds, coding tests, and live video sessions.
          </p>
        </div>
        <Link to="/interview-room">
          <Button variant="primary" icon={Video}>
            Test Camera & Audio Lobby
          </Button>
        </Link>
      </div>

      {interviews.length === 0 ? (
        <EmptyState
          icon={CalendarIcon}
          title="No scheduled interviews yet"
          description="When employers shortlist your profile and propose an interview, it will appear here."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {interviews.map((item) => (
            <Card key={item.id} className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
                    {item.jobTitle}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {item.companyName || 'TechCorp Innovations'}
                  </p>
                </div>
                <Badge
                  variant={
                    item.status === 'confirmed'
                      ? 'success'
                      : item.status === 'rescheduled'
                      ? 'warning'
                      : 'brand'
                  }
                  size="sm"
                >
                  {item.status}
                </Badge>
              </div>

              {/* Date & Time Ribbon */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-850 flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                  <CalendarIcon className="w-4 h-4 text-brand-500" />
                  {item.date}
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  {item.startTime} - {item.endTime || '16:00'} IST
                </span>
              </div>

              {item.notes && (
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                  Note: "{item.notes}"
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <Link to="/interview-room">
                  <Button variant="primary" size="sm" icon={Video}>
                    Join Video Room
                  </Button>
                </Link>

                <div className="flex items-center gap-2">
                  {item.status === 'proposed' && (
                    <button
                      onClick={() => handleStatusUpdate(item.id, 'confirmed')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100"
                    >
                      Accept
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedInterview(item);
                      setRescheduleModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-dark-800"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(item.id, 'declined')}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg"
                    title="Decline Interview"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Reschedule Modal */}
      <Modal
        isOpen={rescheduleModalOpen}
        onClose={() => setRescheduleModalOpen(false)}
        title="Request Reschedule"
        subtitle={`Session: ${selectedInterview?.title}`}
      >
        <form onSubmit={handleRescheduleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
                Proposed Date
              </label>
              <input
                type="date"
                required
                value={proposedDate}
                onChange={(e) => setProposedDate(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 p-2.5 text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
                Proposed Time
              </label>
              <input
                type="time"
                required
                value={proposedTime}
                onChange={(e) => setProposedTime(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 p-2.5 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Submit Reschedule Request
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default InterviewsPage;

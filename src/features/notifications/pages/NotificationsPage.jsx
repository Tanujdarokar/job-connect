import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Bell,
  CheckCircle2,
  Calendar,
  Briefcase,
  Mail,
  Smartphone,
  Shield,
  Sparkles,
} from 'lucide-react';
import Card from '../../../core/components/Card';
import Button from '../../../core/components/Button';
import notificationService from '../services/notificationService';

export const NotificationsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);

  useEffect(() => {
    if (user) {
      notificationService.getUserNotifications(user.id).then(setNotifications);
    }
  }, [user]);

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead(user.id);
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const requestPushPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        toast.success('Push notifications enabled for JobConnect!');
      } else {
        toast.error('Notification permission was denied');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Notifications & Alerts
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Stay updated on candidate messages, application updates, and scheduled interviews.
          </p>
        </div>
        <Button onClick={handleMarkAllRead} variant="outline" size="sm">
          Mark All Read
        </Button>
      </div>

      {/* Preferences Toggles */}
      <div className="p-6 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Delivery Preferences
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-850 cursor-pointer">
            <span className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
              <Bell className="w-4 h-4 text-brand-500" /> Web Push
            </span>
            <input
              type="checkbox"
              checked={pushAlerts}
              onChange={(e) => {
                setPushAlerts(e.target.checked);
                if (e.target.checked) requestPushPermission();
              }}
              className="rounded text-brand-600 focus:ring-brand-500"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-850 cursor-pointer">
            <span className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
              <Mail className="w-4 h-4 text-indigo-500" /> Email Digest
            </span>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-850 cursor-pointer">
            <span className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
              <Smartphone className="w-4 h-4 text-emerald-500" /> SMS Updates
            </span>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
          </label>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-all ${
              !n.read ? 'border-brand-300 dark:border-brand-800/80 bg-brand-50/20' : ''
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {n.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {n.message}
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            {n.link && (
              <Link to={n.link}>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </Link>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;

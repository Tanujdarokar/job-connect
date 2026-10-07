import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { TrendingUp, Sparkles, BookOpen, Award, ArrowRight } from 'lucide-react';
import Card from '../../../core/components/Card';
import Button from '../../../core/components/Button';

export const SalariesPage = () => {
  const [selectedRole, setSelectedRole] = useState('Frontend');

  const salaryDataByRole = {
    Frontend: [
      { exp: '0-1 yrs (Fresher)', min: 5, avg: 8, max: 12, fill: '#6366f1' },
      { exp: '1-3 yrs (Junior)', min: 8, avg: 14, max: 20, fill: '#818cf8' },
      { exp: '3-5 yrs (Mid-Level)', min: 14, avg: 22, max: 30, fill: '#a855f7' },
      { exp: '5-8 yrs (Senior)', min: 22, avg: 34, max: 48, fill: '#ec4899' },
      { exp: '8+ yrs (Lead/Staff)', min: 35, avg: 52, max: 75, fill: '#10b981' },
    ],
    Backend: [
      { exp: '0-1 yrs (Fresher)', min: 6, avg: 9, max: 13, fill: '#6366f1' },
      { exp: '1-3 yrs (Junior)', min: 9, avg: 15, max: 22, fill: '#818cf8' },
      { exp: '3-5 yrs (Mid-Level)', min: 16, avg: 24, max: 34, fill: '#a855f7' },
      { exp: '5-8 yrs (Senior)', min: 25, avg: 38, max: 55, fill: '#ec4899' },
      { exp: '8+ yrs (Lead/Staff)', min: 40, avg: 60, max: 85, fill: '#10b981' },
    ],
    Design: [
      { exp: '0-1 yrs (Fresher)', min: 4, avg: 7, max: 10, fill: '#6366f1' },
      { exp: '1-3 yrs (Junior)', min: 7, avg: 12, max: 18, fill: '#818cf8' },
      { exp: '3-5 yrs (Mid-Level)', min: 12, avg: 19, max: 28, fill: '#a855f7' },
      { exp: '5-8 yrs (Senior)', min: 20, avg: 30, max: 42, fill: '#ec4899' },
      { exp: '8+ yrs (Lead/Staff)', min: 30, avg: 45, max: 65, fill: '#10b981' },
    ],
    AI_ML: [
      { exp: '0-1 yrs (Fresher)', min: 8, avg: 12, max: 16, fill: '#6366f1' },
      { exp: '1-3 yrs (Junior)', min: 12, avg: 18, max: 28, fill: '#818cf8' },
      { exp: '3-5 yrs (Mid-Level)', min: 20, avg: 32, max: 45, fill: '#a855f7' },
      { exp: '5-8 yrs (Senior)', min: 32, avg: 50, max: 70, fill: '#ec4899' },
      { exp: '8+ yrs (Lead/Staff)', min: 50, avg: 75, max: 110, fill: '#10b981' },
    ],
  };

  const careerTips = [
    {
      title: 'How to Negotiate Tech CTC & ESOP Grants in 2026',
      readTime: '4 min read',
      tag: 'Compensation',
      description: 'Learn how to benchmark competing offers, value vesting schedules, and negotiate variable bonuses effectively.',
    },
    {
      title: 'Top 5 React 19 Architectural Patterns Employers Value',
      readTime: '6 min read',
      tag: 'Technical Prep',
      description: 'Deep dive into server components, optimistic UI actions, and concurrent rendering performance benchmarks.',
    },
    {
      title: 'System Design Interview Checklist for Senior Engineers',
      readTime: '5 min read',
      tag: 'Interviews',
      description: 'Master rate-limiting, database sharding, idempotent payments, and distributed caching in 45-minute technical rounds.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Compensation Intelligence
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Indian Tech Salary Benchmarks (2026)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Real compensation ranges across Indian startups, unicorns, and global capability centers (GCCs).
        </p>
      </div>

      {/* Role Picker Tabs */}
      <div className="flex gap-2 pb-2">
        {[
          { key: 'Frontend', label: 'Frontend & Full Stack' },
          { key: 'Backend', label: 'Backend & Cloud DevOps' },
          { key: 'AI_ML', label: 'AI & Machine Learning' },
          { key: 'Design', label: 'Product UI/UX Design' },
        ].map((role) => (
          <button
            key={role.key}
            type="button"
            onClick={() => setSelectedRole(role.key)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              selectedRole === role.key
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                : 'bg-white dark:bg-dark-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* Salary Chart Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Annual Average CTC (in Lakhs INR ₹)
            </h3>
            <p className="text-xs text-slate-400">
              Benchmark comparison across experience brackets
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600">
            Updated Oct 2026
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryDataByRole[selectedRole]}>
              <XAxis dataKey="exp" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} unit="L" />
              <Tooltip
                formatter={(value) => [`₹${value} LPA`, 'Average CTC']}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="avg" radius={[8, 8, 0, 0]}>
                {salaryDataByRole[selectedRole].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Career Tips Articles */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          Career Advancement Guides
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {careerTips.map((tip, idx) => (
            <Card key={idx} hoverEffect className="p-6 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {tip.tag}
                  </span>
                  <span className="text-slate-400">{tip.readTime}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {tip.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {tip.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1">
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalariesPage;

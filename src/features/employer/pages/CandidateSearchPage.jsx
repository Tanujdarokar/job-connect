import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Sparkles, MessageSquare, Briefcase, UserCheck } from 'lucide-react';
import Card from '../../../core/components/Card';
import Button from '../../../core/components/Button';
import Badge from '../../../core/components/Badge';
import profileService from '../../profile/services/profileService';

export const CandidateSearchPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [skillFilter, setSkillFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    profileService
      .getCandidates({ skill: skillFilter, q: searchQuery })
      .then((data) => {
        setCandidates(data);
        setIsLoading(false);
      });
  }, [skillFilter, searchQuery]);

  const popularSkills = ['React', 'Node.js', 'Python', 'TypeScript', 'Docker', 'AWS', 'Figma'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Candidate Sourcing Engine
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Directly discover verified tech talent and invite candidates for open positions.
        </p>
      </div>

      {/* Search Bar */}
      <div className="p-5 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by candidate name or headline..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-dark-850 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>

          <div className="relative">
            <Sparkles className="w-4 h-4 text-amber-500 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              placeholder="Filter by specific skill (e.g. React, Python)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-dark-850 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>
        </div>

        {/* Quick Skill Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px]">Popular Skills:</span>
          {popularSkills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => setSkillFilter(skillFilter === skill ? '' : skill)}
              className={`px-2.5 py-0.5 rounded-lg text-xs font-medium transition-colors ${
                skillFilter === skill
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {skill}
            </button>
          ))}
          {skillFilter && (
            <button
              onClick={() => setSkillFilter('')}
              className="text-[11px] text-rose-500 hover:underline ml-2"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {candidates.map((cand) => (
          <Card key={cand.id} hoverEffect className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3.5">
                <img
                  src={cand.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(cand.name)}`}
                  alt={cand.name}
                  className="w-13 h-13 rounded-2xl object-cover ring-2 ring-indigo-500/20 shadow-sm"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {cand.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {cand.headline || 'Software Engineer'}
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {cand.location || 'India'}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 pt-1">
                {cand.skills?.slice(0, 4).map((sk) => (
                  <span
                    key={sk}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900/40"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 font-bold">
                ✓ Available for Interview
              </span>
              <Link to="/chat">
                <Button variant="primary" size="sm" icon={MessageSquare}>
                  Message
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CandidateSearchPage;

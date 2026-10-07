import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Search,
  MapPin,
  Filter,
  X,
  RotateCcw,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  History,
  Briefcase,
} from 'lucide-react';
import JobCard from '../components/JobCard';
import Button from '../../../core/components/Button';
import EmptyState from '../../../core/components/EmptyState';
import { SkeletonJobCard } from '../../../core/components/Skeleton';
import { fetchJobs } from '../slice/jobsSlice';
import { fetchSeekerApplications } from '../../applications/slice/applicationsSlice';
import {
  JOB_TYPES,
  WORKPLACE_TYPES,
  EXPERIENCE_LEVELS,
  POPULAR_LOCATIONS,
} from '../../../core/constants';

export const JobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: jobs, isLoading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);
  const { items: appliedList } = useSelector((state) => state.applications);

  // Filter States from URL Params
  const queryParam = searchParams.get('q') || '';
  const locationParam = searchParams.get('location') || '';
  const workplaceParam = searchParams.get('workplace') || 'all';
  const jobTypeParam = searchParams.get('type') || 'all';
  const experienceParam = searchParams.get('exp') || 'all';
  const salaryParam = searchParams.get('minSalary') || '0';
  const sortParam = searchParams.get('sort') || 'latest';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [searchInput, setSearchInput] = useState(queryParam);
  const [locationInput, setLocationInput] = useState(locationParam);
  const [minSalary, setMinSalary] = useState(salaryParam);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('jobconnect_recent_searches') || '[]');
    } catch (e) {
      return [];
    }
  });

  const ITEMS_PER_PAGE = 9;

  // Sync state with URL params
  useEffect(() => {
    setSearchInput(queryParam);
    setLocationInput(locationParam);
    setMinSalary(salaryParam);

    dispatch(
      fetchJobs({
        q: queryParam,
        location: locationParam,
        workplaceType: workplaceParam,
        jobType: jobTypeParam,
        experienceLevel: experienceParam,
        minSalary: salaryParam > 0 ? salaryParam : undefined,
        sort: sortParam,
      })
    );

    if (user?.role === 'seeker') {
      dispatch(fetchSeekerApplications(user.id));
    }
  }, [
    dispatch,
    queryParam,
    locationParam,
    workplaceParam,
    jobTypeParam,
    experienceParam,
    salaryParam,
    sortParam,
    user,
  ]);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all' && value !== '0') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set('q', searchInput.trim());
      // Add to recent searches
      const updated = [searchInput.trim(), ...recentSearches.filter((s) => s !== searchInput.trim())].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('jobconnect_recent_searches', JSON.stringify(updated));
    } else {
      params.delete('q');
    }
    if (locationInput.trim()) {
      params.set('location', locationInput.trim());
    } else {
      params.delete('location');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setLocationInput('');
    setMinSalary('0');
    setSearchParams(new URLSearchParams());
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('jobconnect_recent_searches');
  };

  // Pagination calculations
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE) || 1;
  const paginatedJobs = useMemo(() => {
    const start = (pageParam - 1) * ITEMS_PER_PAGE;
    return jobs.slice(start, start + ITEMS_PER_PAGE);
  }, [jobs, pageParam]);

  const appliedJobIds = useMemo(() => {
    return new Set(appliedList.map((a) => a.jobId));
  }, [appliedList]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Search & Filter Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Keyword Search */}
          <div className="md:col-span-5 relative flex items-center">
            <Search className="w-5 h-5 text-brand-500 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Job title, keywords, or skills (e.g. React, Python)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-dark-850 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
          </div>

          {/* Location Search */}
          <div className="md:col-span-4 relative flex items-center">
            <MapPin className="w-5 h-5 text-indigo-500 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="City, region, or 'Remote'"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-dark-850 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
          </div>

          {/* Search Button & Mobile Toggle */}
          <div className="md:col-span-3 flex items-center gap-2">
            <Button type="submit" variant="primary" className="flex-1" icon={Search}>
              Search
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden p-2.5"
              aria-label="Toggle filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </form>

        {/* Recent Searches Row */}
        {recentSearches.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-400 flex items-center gap-1">
              <History className="w-3.5 h-3.5" />
              Recent:
            </span>
            {recentSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => {
                  setSearchInput(term);
                  updateParam('q', term);
                }}
                className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-950/40 hover:text-brand-600 transition-colors"
              >
                {term}
              </button>
            ))}
            <button
              type="button"
              onClick={clearRecentSearches}
              className="text-[11px] text-slate-400 hover:text-rose-500 ml-auto"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Filters Sidebar + Results List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Filter Sidebar (Desktop & Mobile Drawer) */}
        <aside
          className={`lg:col-span-4 xl:col-span-3 space-y-6 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="p-5 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Filters</h3>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Salary Slider Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Min Salary (Annual)
                </label>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  ₹{Number(minSalary) > 0 ? `${(Number(minSalary) / 100000).toFixed(0)} LPA+` : 'Any'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5000000"
                step="200000"
                value={minSalary}
                onChange={(e) => {
                  setMinSalary(e.target.value);
                  updateParam('minSalary', e.target.value);
                }}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹0</span>
                <span>₹25 LPA</span>
                <span>₹50 LPA+</span>
              </div>
            </div>

            {/* Workplace Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Workplace Environment
              </label>
              <div className="space-y-1.5">
                {[{ id: 'all', label: 'All Environments' }, ...WORKPLACE_TYPES].map((type) => (
                  <label key={type.id} className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="workplaceType"
                      checked={workplaceParam === type.id}
                      onChange={() => updateParam('workplace', type.id)}
                      className="text-brand-600 focus:ring-brand-500"
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Job Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Job Type
              </label>
              <div className="space-y-1.5">
                {[{ id: 'all', label: 'All Job Types' }, ...JOB_TYPES].map((type) => (
                  <label key={type.id} className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="jobType"
                      checked={jobTypeParam === type.id}
                      onChange={() => updateParam('type', type.id)}
                      className="text-brand-600 focus:ring-brand-500"
                    />
                    <span>{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Experience Level
              </label>
              <div className="space-y-1.5">
                {[{ id: 'all', label: 'All Levels' }, ...EXPERIENCE_LEVELS].map((level) => (
                  <label key={level.id} className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="experienceLevel"
                      checked={experienceParam === level.id}
                      onChange={() => updateParam('exp', level.id)}
                      className="text-brand-600 focus:ring-brand-500"
                    />
                    <span>{level.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Job Results Feed */}
        <section className="lg:col-span-8 xl:col-span-9 space-y-6">
          {/* Results Summary Bar & Sorting */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {queryParam ? `Search Results for "${queryParam}"` : 'Explore Verified Opportunities'}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing <span className="font-bold text-slate-900 dark:text-white">{jobs.length}</span> positions available
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Sort by:</span>
              <select
                value={sortParam}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              >
                <option value="latest">Latest Posted</option>
                <option value="salary-high">Salary: High to Low</option>
                <option value="salary-low">Salary: Low to High</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Loading Skeletons */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SkeletonJobCard />
              <SkeletonJobCard />
              <SkeletonJobCard />
              <SkeletonJobCard />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && jobs.length === 0 && (
            <EmptyState
              title="No matching jobs found"
              description="Try adjusting your keyword, relaxing filters, or resetting salary sliders."
              actionLabel="Reset All Filters"
              onAction={handleResetFilters}
            />
          )}

          {/* Job Cards Grid */}
          {!isLoading && jobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {paginatedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  hasApplied={appliedJobIds.has(job.id)}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {!isLoading && totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                icon={ChevronLeft}
                disabled={pageParam <= 1}
                onClick={() => updateParam('page', (pageParam - 1).toString())}
              >
                Previous
              </Button>

              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Page <span className="font-bold text-slate-900 dark:text-white">{pageParam}</span> of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                icon={ChevronRight}
                iconPosition="right"
                disabled={pageParam >= totalPages}
                onClick={() => updateParam('page', (pageParam + 1).toString())}
              >
                Next
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default JobsPage;

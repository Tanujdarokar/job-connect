/**
 * JobConnect Jobs Explorer Page Module
 */

import { getIcon } from '../icons.js';
import { getJobs } from '../state.js';
import { renderJobCard, attachJobCardEvents } from '../components/jobCard.js';

export function renderJobsPage(params = {}) {
  const allJobs = getJobs();
  const search = params.search || '';
  const location = params.location || '';
  const workplace = params.workplace || '';
  const type = params.type || '';
  const exp = params.exp || '';
  const sortBy = params.sort || 'recent';

  // Apply filters
  let filtered = allJobs.filter((job) => {
    if (search) {
      const q = search.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchComp = job.companyName.toLowerCase().includes(q);
      const matchSkills = (job.skills || []).some(s => s.toLowerCase().includes(q));
      if (!matchTitle && !matchComp && !matchSkills) return false;
    }
    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    if (workplace && job.workplaceType !== workplace) {
      return false;
    }
    if (type && job.jobType !== type) {
      return false;
    }
    if (exp && job.experienceLevel !== exp) {
      return false;
    }
    return true;
  });

  // Apply Sorting
  if (sortBy === 'salary') {
    filtered.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
  } else if (sortBy === 'applicants') {
    filtered.sort((a, b) => (b.applicantCount || 0) - (a.applicantCount || 0));
  } else {
    // recent
    filtered.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
  }

  return `
    <div class="container" style="padding: 2.5rem 1.25rem;">
      <!-- Page Header -->
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; margin-bottom: 0.5rem;">Explore Tech Roles</h1>
        <p>Discover ${allJobs.length} active opportunities across top startups and tech enterprises.</p>
      </div>

      <!-- Main Search & Filter Bar -->
      <div class="card" style="padding: 1rem; margin-bottom: 2rem; box-shadow: var(--shadow-md);">
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <div class="input-icon-wrapper" style="flex: 2; min-width: 240px;">
            <span class="icon">${getIcon('search')}</span>
            <input type="text" id="jobs-search-input" class="form-input" placeholder="Search by role, company, or skills (e.g. React, Python)..." value="${search}">
          </div>
          <div class="input-icon-wrapper" style="flex: 1.5; min-width: 180px;">
            <span class="icon">${getIcon('mapPin')}</span>
            <input type="text" id="jobs-location-input" class="form-input" placeholder="Location or Remote..." value="${location}">
          </div>
          <button type="button" id="jobs-apply-search-btn" class="btn btn-primary" style="flex-shrink: 0;">
            ${getIcon('search')} Search
          </button>
        </div>
      </div>

      <!-- Layout: Filter Sidebar + Job Grid -->
      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 2rem; align-items: start;">
        <!-- Filters Sidebar -->
        <aside class="card" style="padding: 1.5rem; position: sticky; top: 90px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <div style="font-weight: 700; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
              ${getIcon('filter')} Filters
            </div>
            <button type="button" id="clear-filters-btn" class="btn btn-sm btn-outline" style="font-size: 0.75rem;">Reset</button>
          </div>

          <!-- Workplace Type -->
          <div style="margin-bottom: 1.5rem;">
            <div style="font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Workplace Type</div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
              <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <input type="radio" name="filter-workplace" value="" ${!workplace ? 'checked' : ''}> All Workplace Types
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <input type="radio" name="filter-workplace" value="remote" ${workplace === 'remote' ? 'checked' : ''}> 🌐 Remote
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <input type="radio" name="filter-workplace" value="hybrid" ${workplace === 'hybrid' ? 'checked' : ''}> 🏢 Hybrid
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <input type="radio" name="filter-workplace" value="on-site" ${workplace === 'on-site' ? 'checked' : ''}> 📍 On-Site
              </label>
            </div>
          </div>

          <!-- Job Type -->
          <div style="margin-bottom: 1.5rem;">
            <div style="font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Employment Type</div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
              <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <input type="radio" name="filter-type" value="" ${!type ? 'checked' : ''}> All Types
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <input type="radio" name="filter-type" value="full-time" ${type === 'full-time' ? 'checked' : ''}> Full-Time
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <input type="radio" name="filter-type" value="contract" ${type === 'contract' ? 'checked' : ''}> Contract
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <input type="radio" name="filter-type" value="internship" ${type === 'internship' ? 'checked' : ''}> Internship
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <input type="radio" name="filter-type" value="freelance" ${type === 'freelance' ? 'checked' : ''}> Freelance
              </label>
            </div>
          </div>

          <!-- Experience Level -->
          <div style="margin-bottom: 1.5rem;">
            <div style="font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Experience Level</div>
            <select id="filter-exp" class="form-select" style="font-size: 0.85rem;">
              <option value="" ${!exp ? 'selected' : ''}>All Experience Levels</option>
              <option value="fresher" ${exp === 'fresher' ? 'selected' : ''}>Fresher (0-1 yrs)</option>
              <option value="junior" ${exp === 'junior' ? 'selected' : ''}>Junior (1-3 yrs)</option>
              <option value="mid" ${exp === 'mid' ? 'selected' : ''}>Mid-Level (3-5 yrs)</option>
              <option value="senior" ${exp === 'senior' ? 'selected' : ''}>Senior (5-8 yrs)</option>
              <option value="lead" ${exp === 'lead' ? 'selected' : ''}>Lead / Staff (8+ yrs)</option>
            </select>
          </div>
        </aside>

        <!-- Jobs Listing Grid -->
        <main>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
            <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-muted);">
              Showing <span style="color: var(--text-main); font-weight: 700;">${filtered.length}</span> verified jobs
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem;">
              <span style="color: var(--text-muted);">Sort by:</span>
              <select id="sort-select" class="form-select" style="width: auto; padding: 0.35rem 0.6rem; font-size: 0.85rem;">
                <option value="recent" ${sortBy === 'recent' ? 'selected' : ''}>Most Recent</option>
                <option value="salary" ${sortBy === 'salary' ? 'selected' : ''}>Highest Salary</option>
                <option value="applicants" ${sortBy === 'applicants' ? 'selected' : ''}>Most Popular</option>
              </select>
            </div>
          </div>

          ${filtered.length > 0 ? `
            <div class="jobs-grid">
              ${filtered.map(job => renderJobCard(job)).join('')}
            </div>
          ` : `
            <div class="card" style="text-align: center; padding: 4rem 2rem;">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--bg-muted); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: var(--text-muted);">
                ${getIcon('search')}
              </div>
              <h3 style="margin-bottom: 0.5rem;">No Matching Jobs Found</h3>
              <p style="margin-bottom: 1.5rem;">Try adjusting your keyword, workplace filter, or location criteria.</p>
              <button type="button" id="empty-reset-btn" class="btn btn-primary">Reset Filters</button>
            </div>
          `}
        </main>
      </div>
    </div>
  `;
}

export function attachJobsEvents() {
  attachJobCardEvents();

  const getQueryState = () => {
    const search = document.querySelector('#jobs-search-input')?.value.trim() || '';
    const location = document.querySelector('#jobs-location-input')?.value.trim() || '';
    const workplace = document.querySelector('input[name="filter-workplace"]:checked')?.value || '';
    const type = document.querySelector('input[name="filter-type"]:checked')?.value || '';
    const exp = document.querySelector('#filter-exp')?.value || '';
    const sort = document.querySelector('#sort-select')?.value || 'recent';

    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (location) params.set('location', location);
    if (workplace) params.set('workplace', workplace);
    if (type) params.set('type', type);
    if (exp) params.set('exp', exp);
    if (sort) params.set('sort', sort);

    return params.toString();
  };

  const updateFilters = () => {
    const queryString = getQueryState();
    window.location.hash = `#/jobs?${queryString}`;
  };

  const searchBtn = document.querySelector('#jobs-apply-search-btn');
  const searchInput = document.querySelector('#jobs-search-input');
  const locInput = document.querySelector('#jobs-location-input');

  if (searchBtn) searchBtn.addEventListener('click', updateFilters);
  if (searchInput) searchInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') updateFilters(); });
  if (locInput) locInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') updateFilters(); });

  document.querySelectorAll('input[name="filter-workplace"]').forEach((r) => r.addEventListener('change', updateFilters));
  document.querySelectorAll('input[name="filter-type"]').forEach((r) => r.addEventListener('change', updateFilters));
  document.querySelector('#filter-exp')?.addEventListener('change', updateFilters);
  document.querySelector('#sort-select')?.addEventListener('change', updateFilters);

  const resetBtn = document.querySelector('#clear-filters-btn');
  const emptyResetBtn = document.querySelector('#empty-reset-btn');
  const clearAll = () => { window.location.hash = '#/jobs'; };
  if (resetBtn) resetBtn.addEventListener('click', clearAll);
  if (emptyResetBtn) emptyResetBtn.addEventListener('click', clearAll);
}

/**
 * JobConnect Companies Directory Page Module
 */

import { getIcon } from '../icons.js';
import { getCompanies, getJobs } from '../state.js';

export function renderCompaniesPage(params = {}) {
  const allCompanies = getCompanies();
  const allJobs = getJobs();
  const search = params.search || '';
  const industry = params.industry || '';

  const filtered = allCompanies.filter((comp) => {
    if (search && !comp.name.toLowerCase().includes(search.toLowerCase()) && !comp.description.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (industry && comp.industry !== industry) {
      return false;
    }
    return true;
  });

  const industries = Array.from(new Set(allCompanies.map(c => c.industry)));

  return `
    <div class="container" style="padding: 2.5rem 1.25rem;">
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; margin-bottom: 0.5rem;">Explore Tech Companies</h1>
        <p>Discover top tech companies, culture, verified employee reviews, and active job openings.</p>
      </div>

      <!-- Search & Filters -->
      <div class="card" style="padding: 1rem; margin-bottom: 2rem; box-shadow: var(--shadow-md);">
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <div class="input-icon-wrapper" style="flex: 2; min-width: 240px;">
            <span class="icon">${getIcon('search')}</span>
            <input type="text" id="comp-search-input" class="form-input" placeholder="Search company name, industry, or tech culture..." value="${search}">
          </div>
          <div style="flex: 1; min-width: 180px;">
            <select id="comp-industry-select" class="form-select">
              <option value="">All Industries</option>
              ${industries.map(ind => `<option value="${ind}" ${industry === ind ? 'selected' : ''}>${ind}</option>`).join('')}
            </select>
          </div>
          <button type="button" id="comp-search-btn" class="btn btn-primary">
            ${getIcon('search')} Search
          </button>
        </div>
      </div>

      <!-- Companies Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem;">
        ${filtered.map(comp => {
          const openJobsCount = allJobs.filter(j => j.companyId === comp.id).length;

          return `
            <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between; padding: 1.75rem;">
              <div>
                <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1rem;">
                  <img src="${comp.logo}" style="width: 56px; height: 56px; border-radius: var(--radius-md); object-fit: cover; border: 1px solid var(--border-color);" alt="${comp.name}">
                  <span class="badge badge-success" style="display: flex; align-items: center; gap: 0.25rem;">
                    ${getIcon('checkCircle')} Verified
                  </span>
                </div>

                <a href="#/companies/${comp.id}" style="font-size: 1.2rem; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 0.35rem;">${comp.name}</a>
                <div style="font-size: 0.85rem; color: var(--primary); font-weight: 600; margin-bottom: 0.75rem;">${comp.industry}</div>

                <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${comp.description}
                </p>

                <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                  <span>📍 ${comp.location}</span>
                  <span>👥 ${comp.size}</span>
                  <span style="color: var(--warning-text); font-weight: 700; display: inline-flex; align-items: center; gap: 2px;">
                    ${getIcon('star')} ${comp.rating} (${comp.reviewCount})
                  </span>
                </div>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; border-top: 1px solid var(--border-color); margin-top: auto;">
                <span class="badge badge-primary">${openJobsCount} Open Positions</span>
                <a href="#/companies/${comp.id}" class="btn btn-outline btn-sm">Explore Company</a>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

export function attachCompaniesEvents() {
  const searchInput = document.querySelector('#comp-search-input');
  const industrySelect = document.querySelector('#comp-industry-select');
  const searchBtn = document.querySelector('#comp-search-btn');

  const execute = () => {
    const q = searchInput?.value.trim() || '';
    const ind = industrySelect?.value || '';
    const params = new URLSearchParams();
    if (q) params.set('search', q);
    if (ind) params.set('industry', ind);
    window.location.hash = `#/companies?${params.toString()}`;
  };

  if (searchBtn) searchBtn.addEventListener('click', execute);
  if (searchInput) searchInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') execute(); });
  if (industrySelect) industrySelect.addEventListener('change', execute);
}

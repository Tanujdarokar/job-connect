/**
 * JobConnect Landing Page
 */

import { getIcon } from '../icons.js';
import { getJobs, getCompanies } from '../state.js';
import { renderJobCard, attachJobCardEvents } from '../components/jobCard.js';
import { t } from '../i18n.js';

export function renderLandingPage() {
  const allJobs = getJobs();
  const featuredJobs = allJobs.slice(0, 6);
  const companies = getCompanies().slice(0, 6);

  return `
    <!-- Hero Section -->
    <section class="hero-section hero-grid">
      <div class="hero-bg-glow"></div>
      <div class="container hero-content">
        <div class="badge badge-primary" style="margin-bottom: 1.25rem; font-size: 0.85rem; padding: 0.4rem 1rem;">
          ${t('hero.badge')}
        </div>
        <h1 style="font-size: 2.85rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 1.25rem;">
          ${t('hero.title1')}<br>
          <span class="text-gradient">${t('hero.titleHighlight')}</span>
        </h1>
        <p style="font-size: 1.15rem; max-width: 680px; margin: 0 auto; line-height: 1.6;">
          ${t('hero.subtitle')}
        </p>

        <!-- Search Bar -->
        <div class="hero-search-box">
          <div class="hero-search-input-group">
            <span style="color: var(--primary);">${getIcon('search')}</span>
            <input type="text" id="hero-keyword" class="form-input" style="border: none; box-shadow: none; padding-left: 0;" placeholder="${t('hero.searchPlaceholder')}">
          </div>
          <div class="hero-search-divider"></div>
          <div class="hero-search-input-group">
            <span style="color: var(--primary);">${getIcon('mapPin')}</span>
            <input type="text" id="hero-location" class="form-input" style="border: none; box-shadow: none; padding-left: 0;" placeholder="${t('hero.locationPlaceholder')}">
          </div>
          <button type="button" id="hero-search-btn" class="btn btn-primary btn-lg">
            ${getIcon('search')} ${t('hero.searchBtn')}
          </button>
        </div>

        <!-- Popular Tags -->
        <div style="margin-top: 1.5rem; display: flex; align-items: center; justify-content: center; gap: 0.6rem; flex-wrap: wrap; font-size: 0.875rem;">
          <span style="color: var(--text-muted); font-weight: 600;">${t('hero.popularSearches')}</span>
          <a href="#/jobs?search=React" class="badge badge-muted" style="cursor: pointer;">React.js</a>
          <a href="#/jobs?search=Python" class="badge badge-muted" style="cursor: pointer;">Python</a>
          <a href="#/jobs?search=Remote" class="badge badge-muted" style="cursor: pointer;">Remote</a>
          <a href="#/jobs?search=UI/UX" class="badge badge-muted" style="cursor: pointer;">UI/UX Design</a>
          <a href="#/jobs?search=DevOps" class="badge badge-muted" style="cursor: pointer;">DevOps</a>
        </div>
      </div>
    </section>

    <!-- Key Platform Stats -->
    <section class="container">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">40,000+</div>
          <div style="font-weight: 600; font-size: 0.95rem;">${t('stats.activeJobs')}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">Across 50+ tech hubs</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">2,400+</div>
          <div style="font-weight: 600; font-size: 0.95rem;">${t('stats.companiesHiring')}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">From startups to unicorns</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">180,000+</div>
          <div style="font-weight: 600; font-size: 0.95rem;">${t('stats.jobSeekers')}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">Pre-vetted developers & leads</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">94.8%</div>
          <div style="font-weight: 600; font-size: 0.95rem;">${t('stats.successRate')}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">AI matching precision</div>
        </div>
      </div>
    </section>

    <!-- Dual Role Highlights -->
    <section class="container" style="margin: 4rem auto;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
        <!-- Seeker Card -->
        <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid var(--primary); padding: 2.5rem;">
          <div>
            <div style="width: 52px; height: 52px; border-radius: var(--radius-lg); background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
              ${getIcon('user')}
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.75rem;">${t('roles.seekerTitle')}</h3>
            <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem;">
              ${t('roles.seekerDesc')}
            </p>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem;">
              <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                <span style="color: var(--success);">${getIcon('checkCircle')}</span> AI ATS Resume Matcher & Score
              </li>
              <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                <span style="color: var(--success);">${getIcon('checkCircle')}</span> Live Interactive AI Video Practice Room
              </li>
              <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                <span style="color: var(--success);">${getIcon('checkCircle')}</span> Direct Recruiter Messaging & Timeline Tracker
              </li>
            </ul>
          </div>
          <a href="#/jobs" class="btn btn-primary" style="width: 100%;">
            Explore Tech Opportunities ${getIcon('arrowRight')}
          </a>
        </div>

        <!-- Employer Card -->
        <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid var(--secondary); padding: 2.5rem;">
          <div>
            <div style="width: 52px; height: 52px; border-radius: var(--radius-lg); background: var(--secondary-light); color: #0891b2; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
              ${getIcon('briefcase')}
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.75rem;">${t('roles.employerTitle')}</h3>
            <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem;">
              ${t('roles.employerDesc')}
            </p>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem;">
              <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                <span style="color: var(--success);">${getIcon('checkCircle')}</span> Pre-Screen Candidates & Kanban Pipeline
              </li>
              <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                <span style="color: var(--success);">${getIcon('checkCircle')}</span> Schedule & Host 1-Click Video Interviews
              </li>
              <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                <span style="color: var(--success);">${getIcon('checkCircle')}</span> Detailed Sourcing Analytics & Conversion Funnels
              </li>
            </ul>
          </div>
          <a href="#/employer/post-job" class="btn btn-secondary" style="width: 100%;">
            Post a Job Today ${getIcon('arrowRight')}
          </a>
        </div>
      </div>
    </section>

    <!-- Featured Verified Jobs -->
    <section class="container" style="margin-bottom: 5rem;">
      <div style="display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div class="badge badge-accent" style="margin-bottom: 0.5rem;">High Impact Roles</div>
          <h2 style="font-size: 2rem;">Featured Job Openings</h2>
        </div>
        <a href="#/jobs" class="btn btn-outline">
          View All ${allJobs.length} Jobs ${getIcon('arrowRight')}
        </a>
      </div>

      <div class="jobs-grid">
        ${featuredJobs.map(job => renderJobCard(job)).join('')}
      </div>
    </section>

    <!-- Top Hiring Companies -->
    <section style="background: var(--bg-card); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 4rem 0;">
      <div class="container">
        <div style="text-align: center; max-width: 600px; margin: 0 auto 2.5rem auto;">
          <h2 style="font-size: 1.85rem; margin-bottom: 0.5rem;">Hiring Across Industry Leaders</h2>
          <p>Join world-class engineering and product teams building visionary software.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem;">
          ${companies.map(c => `
            <a href="#/companies/${c.id}" class="card card-hover" style="text-align: center; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; text-decoration: none;">
              <img src="${c.logo}" style="width: 56px; height: 56px; border-radius: var(--radius-md); object-fit: cover;" alt="${c.name}">
              <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem;">${c.name}</div>
              <div style="display: flex; align-items: center; gap: 0.25rem; font-size: 0.8rem; color: var(--warning-text); font-weight: 700;">
                ${getIcon('star')} ${c.rating} (${c.reviewCount})
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

export function attachLandingEvents() {
  attachJobCardEvents();

  const searchBtn = document.querySelector('#hero-search-btn');
  const keywordInput = document.querySelector('#hero-keyword');
  const locInput = document.querySelector('#hero-location');

  const executeSearch = () => {
    const q = keywordInput?.value.trim() || '';
    const loc = locInput?.value.trim() || '';
    let query = '#/jobs?';
    if (q) query += `search=${encodeURIComponent(q)}&`;
    if (loc) query += `location=${encodeURIComponent(loc)}`;
    window.location.hash = query;
  };

  if (searchBtn) searchBtn.addEventListener('click', executeSearch);
  if (keywordInput) keywordInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') executeSearch(); });
  if (locInput) locInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') executeSearch(); });
}

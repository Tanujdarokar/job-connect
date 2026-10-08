/**
 * JobConnect Saved Jobs Manager Page Module
 */

import { getIcon } from '../icons.js';
import { getCurrentUser, getJobs } from '../state.js';
import { renderJobCard, attachJobCardEvents } from '../components/jobCard.js';
import { renderSeekerSidebar } from '../components/sidebar.js';

export function renderSavedJobsPage() {
  const user = getCurrentUser();
  if (!user) {
    window.location.hash = '#/login';
    return '';
  }

  const savedIds = user.savedJobs || [];
  const allJobs = getJobs();
  const savedJobs = allJobs.filter(j => savedIds.includes(j.id));

  return `
    <div class="dashboard-layout">
      ${renderSeekerSidebar('#/seeker/saved-jobs')}
      <main class="dashboard-main">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Saved Bookmarks</h1>
            <p>You have bookmarked ${savedJobs.length} positions to review or apply.</p>
          </div>
          <a href="#/jobs" class="btn btn-outline">
            ${getIcon('search')} Browse More Jobs
          </a>
        </div>

        ${savedJobs.length > 0 ? `
          <div class="jobs-grid">
            ${savedJobs.map(job => renderJobCard(job)).join('')}
          </div>
        ` : `
          <div class="card" style="text-align: center; padding: 4rem 2rem;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--bg-muted); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: var(--text-muted);">
              ${getIcon('bookmark')}
            </div>
            <h3 style="margin-bottom: 0.5rem;">No Saved Jobs Yet</h3>
            <p style="margin-bottom: 1.5rem;">Bookmark jobs while browsing to save them for later applications.</p>
            <a href="#/jobs" class="btn btn-primary">${getIcon('search')} Discover Jobs Now</a>
          </div>
        `}
      </main>
    </div>
  `;
}

export function attachSavedJobsEvents() {
  attachJobCardEvents();
}

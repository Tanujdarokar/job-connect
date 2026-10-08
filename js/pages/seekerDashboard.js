/**
 * JobConnect Seeker Dashboard Page Module
 */

import { getIcon } from '../icons.js';
import { getCurrentUser, getSeekerApplications, getSeekerInterviews, getJobs } from '../state.js';
import { renderSeekerSidebar } from '../components/sidebar.js';
import { renderJobCard, attachJobCardEvents } from '../components/jobCard.js';

export function renderSeekerDashboardPage() {
  const user = getCurrentUser();
  if (!user) {
    window.location.hash = '#/login';
    return '';
  }

  const applications = getSeekerApplications(user.id);
  const interviews = getSeekerInterviews(user.id);
  const savedCount = (user.savedJobs || []).length;
  const recommendedJobs = getJobs().slice(0, 4);

  return `
    <div class="dashboard-layout">
      ${renderSeekerSidebar('#/seeker/dashboard')}
      <main class="dashboard-main">
        <!-- Welcome Banner -->
        <div class="card" style="background: linear-gradient(135deg, var(--primary-light) 0%, var(--bg-card) 60%); border-color: rgba(79, 70, 229, 0.25); padding: 2rem; margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
            <div>
              <span class="badge badge-primary" style="margin-bottom: 0.5rem;">Job Seeker Portal</span>
              <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Welcome back, ${user.name}! 👋</h1>
              <p style="font-size: 0.95rem; color: var(--text-muted);">${user.headline || 'Full Stack Engineer'}</p>
            </div>
            <div style="display: flex; gap: 0.75rem;">
              <a href="#/ai-tools/resume" class="btn btn-primary">
                ${getIcon('sparkles')} AI Resume Analyzer
              </a>
              <a href="#/jobs" class="btn btn-outline">
                ${getIcon('search')} Find Jobs
              </a>
            </div>
          </div>

          <!-- Profile Completion Bar -->
          <div style="margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; font-size: 0.85rem;">
              <span style="font-weight: 600;">Profile Strength</span>
              <span style="font-weight: 700; color: var(--primary);">${user.profileCompletion || 85}% Complete</span>
            </div>
            <div style="width: 100%; height: 8px; background: var(--bg-muted); border-radius: 9999px; overflow: hidden;">
              <div style="width: ${user.profileCompletion || 85}%; height: 100%; background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%); border-radius: 9999px;"></div>
            </div>
          </div>
        </div>

        <!-- 4 Stat Counters -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
          <div class="card" style="padding: 1.25rem;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Active Applications</div>
              <span style="color: var(--primary);">${getIcon('fileText')}</span>
            </div>
            <div style="font-size: 1.85rem; font-weight: 800; color: var(--text-main); margin-top: 0.5rem;">${applications.length}</div>
          </div>

          <div class="card" style="padding: 1.25rem;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Live Interviews</div>
              <span style="color: var(--info);">${getIcon('video')}</span>
            </div>
            <div style="font-size: 1.85rem; font-weight: 800; color: var(--text-main); margin-top: 0.5rem;">${interviews.length}</div>
          </div>

          <div class="card" style="padding: 1.25rem;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Saved Bookmarks</div>
              <span style="color: var(--warning-text);">${getIcon('bookmark')}</span>
            </div>
            <div style="font-size: 1.85rem; font-weight: 800; color: var(--text-main); margin-top: 0.5rem;">${savedCount}</div>
          </div>

          <div class="card" style="padding: 1.25rem;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Recruiter Views</div>
              <span style="color: var(--success);">${getIcon('users')}</span>
            </div>
            <div style="font-size: 1.85rem; font-weight: 800; color: var(--text-main); margin-top: 0.5rem;">48</div>
          </div>
        </div>

        <!-- Recent Applications & Upcoming Interviews -->
        <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 1.5rem; margin-bottom: 2.5rem;">
          <!-- Recent Applications -->
          <div class="card" style="padding: 1.5rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
              <h3 style="font-size: 1.15rem;">Recent Applications</h3>
              <a href="#/seeker/applications" style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">View All</a>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${applications.length > 0 ? applications.slice(0, 3).map(app => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: var(--bg-muted); border-radius: var(--radius-md);">
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <img src="${app.companyLogo}" style="width: 38px; height: 38px; border-radius: 6px; object-fit: cover;" alt="${app.companyName}">
                    <div>
                      <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-main);">${app.jobTitle}</div>
                      <div style="font-size: 0.8rem; color: var(--text-muted);">${app.companyName} • Applied ${new Date(app.appliedAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <span class="badge badge-primary" style="text-transform: capitalize;">${app.status.replace('_', ' ')}</span>
                </div>
              `).join('') : '<div style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No active applications yet.</div>'}
            </div>
          </div>

          <!-- Upcoming Interviews -->
          <div class="card" style="padding: 1.5rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
              <h3 style="font-size: 1.15rem;">Upcoming Interviews</h3>
              <a href="#/seeker/interviews" style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">Manage</a>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${interviews.length > 0 ? interviews.slice(0, 2).map(int => `
                <div style="padding: 0.85rem 1rem; border: 1.5px solid var(--primary-light); background: var(--bg-card); border-radius: var(--radius-md);">
                  <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-main);">${int.title}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">${int.companyName}</div>
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.75rem;">
                    <span style="font-size: 0.8rem; font-weight: 600; color: var(--primary);">📅 ${int.date} at ${int.startTime}</span>
                    <a href="#/seeker/interviews/video?id=${int.id}" class="btn btn-primary btn-sm">Join Room</a>
                  </div>
                </div>
              `).join('') : '<div style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No interviews scheduled.</div>'}
            </div>
          </div>
        </div>

        <!-- Recommended Jobs For You -->
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3 style="font-size: 1.25rem;">Recommended Opportunities</h3>
            <a href="#/jobs" style="font-size: 0.875rem; color: var(--primary); font-weight: 600;">Explore All</a>
          </div>
          <div class="jobs-grid">
            ${recommendedJobs.map(job => renderJobCard(job)).join('')}
          </div>
        </div>
      </main>
    </div>
  `;
}

export function attachSeekerDashboardEvents() {
  attachJobCardEvents();
}

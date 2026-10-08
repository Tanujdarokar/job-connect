/**
 * JobConnect Employer Dashboard Page Module
 */

import { getIcon } from '../icons.js';
import { getCurrentUser, getJobs, getApplications, getInterviews, USER_ROLES } from '../state.js';
import { renderEmployerSidebar } from '../components/sidebar.js';

export function renderEmployerDashboardPage() {
  const user = getCurrentUser();
  if (!user || user.role !== USER_ROLES.EMPLOYER && user.role !== USER_ROLES.ADMIN) {
    window.location.hash = '#/login';
    return '';
  }

  const allJobs = getJobs().filter(j => j.companyId === user.companyId || j.companyId === 'comp_1');
  const allApps = getApplications();
  const allInterviews = getInterviews();

  return `
    <div class="dashboard-layout">
      ${renderEmployerSidebar('#/employer/dashboard')}
      <main class="dashboard-main">
        <!-- Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="badge badge-secondary" style="margin-bottom: 0.35rem;">Employer Sourcing Hub</span>
            <h1 style="font-size: 1.85rem; margin-bottom: 0.25rem;">${user.companyName || 'TechCorp Innovations'} Overview</h1>
            <p>Track candidate pipelines, job vacancies, and automated video screening sessions.</p>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <a href="#/employer/candidates" class="btn btn-outline">
              ${getIcon('search')} Search Talent Pool
            </a>
            <a href="#/employer/post-job" class="btn btn-primary">
              ${getIcon('plus')} Post a New Job
            </a>
          </div>
        </div>

        <!-- 4 Key Hiring Metrics -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
          <div class="card" style="padding: 1.5rem;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Active Postings</div>
              <span style="color: var(--primary);">${getIcon('briefcase')}</span>
            </div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-top: 0.5rem;">${allJobs.length}</div>
          </div>

          <div class="card" style="padding: 1.5rem;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Total Applicants</div>
              <span style="color: var(--secondary);">${getIcon('users')}</span>
            </div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-top: 0.5rem;">${allApps.length}</div>
          </div>

          <div class="card" style="padding: 1.5rem;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Interviews Conducted</div>
              <span style="color: var(--info);">${getIcon('video')}</span>
            </div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-top: 0.5rem;">${allInterviews.length}</div>
          </div>

          <div class="card" style="padding: 1.5rem;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Hiring Conversion</div>
              <span style="color: var(--success);">${getIcon('trendingUp')}</span>
            </div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-top: 0.5rem;">18.4%</div>
          </div>
        </div>

        <!-- Recent Candidates Pipeline Table -->
        <div class="card" style="padding: 1.75rem; margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.2rem;">Recent Candidate Submissions</h3>
            <a href="#/employer/jobs" style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">View All Pipelines</a>
          </div>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Target Position</th>
                  <th>Status</th>
                  <th>Applied Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${allApps.slice(0, 5).map(app => `
                  <tr>
                    <td>
                      <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <img src="${app.seekerAvatar}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" alt="${app.seekerName}">
                        <div>
                          <div style="font-weight: 700; color: var(--text-main);">${app.seekerName}</div>
                          <div style="font-size: 0.775rem; color: var(--text-muted);">${app.seekerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td style="font-weight: 600;">${app.jobTitle}</td>
                    <td>
                      <span class="badge badge-primary" style="text-transform: capitalize;">${app.status.replace('_', ' ')}</span>
                    </td>
                    <td>${new Date(app.appliedAt).toLocaleDateString()}</td>
                    <td>
                      <a href="#/employer/jobs/${app.jobId}/applicants" class="btn btn-sm btn-outline">
                        Manage Pipeline
                      </a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  `;
}

export function attachEmployerDashboardEvents() {}

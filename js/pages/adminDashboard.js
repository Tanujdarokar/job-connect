/**
 * JobConnect Platform Administrator Console Page Module
 */

import { getIcon } from '../icons.js';
import { getCurrentUser, getAllUsers, getJobs, getApplications, toggleUserStatus, deleteUser, deleteJob, USER_ROLES } from '../state.js';
import { renderAdminSidebar } from '../components/sidebar.js';
import { toast } from '../toast.js';

export function renderAdminDashboardPage() {
  const user = getCurrentUser();
  if (!user || user.role !== USER_ROLES.ADMIN) {
    window.location.hash = '#/login';
    return '';
  }

  const users = getAllUsers();
  const jobs = getJobs();
  const applications = getApplications();

  return `
    <div class="dashboard-layout">
      ${renderAdminSidebar('#/admin/dashboard')}
      <main class="dashboard-main">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="badge badge-warning" style="margin-bottom: 0.35rem;">System Oversight Console</span>
            <h1 style="font-size: 1.85rem; margin-bottom: 0.25rem;">Platform Administration</h1>
            <p>Manage verified users, moderate job postings, and inspect global health telemetry.</p>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="badge badge-success" style="padding: 0.4rem 0.85rem;">
              ${getIcon('checkCircle')} All Microservices Healthy
            </span>
          </div>
        </div>

        <!-- 4 Global Platform Stats -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 2.5rem;">
          <div class="card" style="padding: 1.5rem;">
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Registered Users</div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--primary); margin: 0.25rem 0;">${users.length}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Seekers, Employers, Admins</div>
          </div>
          <div class="card" style="padding: 1.5rem;">
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Active Job Postings</div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--secondary); margin: 0.25rem 0;">${jobs.length}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Verified across 12 companies</div>
          </div>
          <div class="card" style="padding: 1.5rem;">
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Total Applications</div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--info); margin: 0.25rem 0;">${applications.length}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">In active review stages</div>
          </div>
          <div class="card" style="padding: 1.5rem;">
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Server Uptime</div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--success); margin: 0.25rem 0;">99.99%</div>
            <div style="font-size: 0.8rem; color: var(--success); font-weight: 600;">Latency < 12ms</div>
          </div>
        </div>

        <!-- User Moderation Table -->
        <div class="card" style="padding: 1.75rem; margin-bottom: 2rem;">
          <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem;">User Directory & Account Moderation</h3>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${users.map(u => `
                  <tr>
                    <td>
                      <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <img src="${u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" alt="${u.name}">
                        <div>
                          <div style="font-weight: 700; color: var(--text-main);">${u.name}</div>
                          <div style="font-size: 0.775rem; color: var(--text-muted);">${u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="badge ${u.role === USER_ROLES.ADMIN ? 'badge-warning' : u.role === USER_ROLES.EMPLOYER ? 'badge-secondary' : 'badge-primary'}" style="text-transform: capitalize;">
                        ${u.role}
                      </span>
                    </td>
                    <td>
                      <span class="badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}" style="text-transform: capitalize;">
                        ${u.status || 'active'}
                      </span>
                    </td>
                    <td>${new Date(u.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td>
                      <div style="display: flex; gap: 0.5rem;">
                        <button type="button" class="btn btn-sm btn-outline toggle-user-status-btn" data-id="${u.id}">
                          ${u.status === 'banned' ? 'Unban User' : 'Ban'}
                        </button>
                        ${u.id !== user.id ? `
                          <button type="button" class="btn-icon delete-user-btn" data-id="${u.id}" style="color: var(--danger);" title="Delete User">
                            ${getIcon('trash')}
                          </button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Job Postings Moderation Table -->
        <div class="card" style="padding: 1.75rem;">
          <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem;">Live Job Listings Moderation</h3>
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${jobs.slice(0, 8).map(j => `
                  <tr>
                    <td style="font-weight: 700;">${j.title}</td>
                    <td>${j.companyName}</td>
                    <td>${j.location}</td>
                    <td>
                      <span class="badge badge-success" style="text-transform: capitalize;">${j.status}</span>
                    </td>
                    <td>
                      <div style="display: flex; gap: 0.5rem;">
                        <a href="#/jobs/${j.id}" class="btn btn-sm btn-outline">Preview</a>
                        <button type="button" class="btn-icon admin-delete-job-btn" data-id="${j.id}" style="color: var(--danger);" title="Remove Job">
                          ${getIcon('trash')}
                        </button>
                      </div>
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

export function attachAdminDashboardEvents() {
  document.querySelectorAll('.toggle-user-status-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const updated = toggleUserStatus(id);
      if (updated) {
        toast.info('Status Updated', `User account is now ${updated.status}.`);
        window.location.reload();
      }
    });
  });

  document.querySelectorAll('.delete-user-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (confirm('Permanently delete this user account?')) {
        deleteUser(id);
        toast.info('User Deleted', 'Account removed from system.');
        window.location.reload();
      }
    });
  });

  document.querySelectorAll('.admin-delete-job-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (confirm('Remove this job from the platform?')) {
        deleteJob(id);
        toast.info('Job Removed', 'The job has been unlisted.');
        window.location.reload();
      }
    });
  });
}

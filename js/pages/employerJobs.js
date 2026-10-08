/**
 * JobConnect Employer Job Postings Manager Page Module
 */

import { getIcon } from '../icons.js';
import { getCurrentUser, getJobs, deleteJob, updateJob, USER_ROLES } from '../state.js';
import { renderEmployerSidebar } from '../components/sidebar.js';
import { toast } from '../toast.js';

export function renderEmployerJobsPage() {
  const user = getCurrentUser();
  if (!user) {
    window.location.hash = '#/login';
    return '';
  }

  const myJobs = getJobs().filter(j => j.companyId === user.companyId || j.companyId === 'comp_1');

  return `
    <div class="dashboard-layout">
      ${renderEmployerSidebar('#/employer/jobs')}
      <main class="dashboard-main">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Manage Job Postings</h1>
            <p>You have ${myJobs.length} active roles receiving candidate submissions.</p>
          </div>
          <a href="#/employer/post-job" class="btn btn-primary">
            ${getIcon('plus')} Post a New Job
          </a>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          ${myJobs.length > 0 ? myJobs.map(job => `
            <div class="card" style="padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.25rem;">
              <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                  <h3 style="font-size: 1.15rem; color: var(--text-main);">${job.title}</h3>
                  <span class="badge ${job.status === 'active' ? 'badge-success' : 'badge-muted'}" style="text-transform: capitalize;">${job.status}</span>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; gap: 0.75rem; flex-wrap: wrap;">
                  <span>📍 ${job.location}</span>
                  <span>💼 ${job.jobType}</span>
                  <span>📅 Posted ${new Date(job.postedAt).toLocaleDateString()}</span>
                  <span style="font-weight: 700; color: var(--primary);">📥 ${job.applicantCount || 0} Applicants</span>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <a href="#/employer/jobs/${job.id}/applicants" class="btn btn-primary btn-sm">
                  ${getIcon('users')} View Candidates (${job.applicantCount || 0})
                </a>
                <button type="button" class="btn btn-outline btn-sm toggle-job-status-btn" data-id="${job.id}" data-status="${job.status}">
                  ${job.status === 'active' ? 'Pause Posting' : 'Activate'}
                </button>
                <button type="button" class="btn-icon delete-job-btn" data-id="${job.id}" style="color: var(--danger);" title="Delete Job">
                  ${getIcon('trash')}
                </button>
              </div>
            </div>
          `).join('') : `
            <div class="card" style="text-align: center; padding: 4rem 2rem;">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--bg-muted); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: var(--text-muted);">
                ${getIcon('briefcase')}
              </div>
              <h3 style="margin-bottom: 0.5rem;">No Active Job Postings</h3>
              <p style="margin-bottom: 1.5rem;">Publish your first tech opening to begin receiving verified candidate applications.</p>
              <a href="#/employer/post-job" class="btn btn-primary">${getIcon('plus')} Post a Job</a>
            </div>
          `}
        </div>
      </main>
    </div>
  `;
}

export function attachEmployerJobsEvents() {
  document.querySelectorAll('.toggle-job-status-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const current = btn.dataset.status;
      const next = current === 'active' ? 'paused' : 'active';
      updateJob(id, { status: next });
      toast.success('Status Updated', `Job listing is now ${next}.`);
      window.location.reload();
    });
  });

  document.querySelectorAll('.delete-job-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (confirm('Are you sure you want to delete this job posting?')) {
        deleteJob(id);
        toast.info('Job Deleted', 'The posting has been permanently removed.');
        window.location.reload();
      }
    });
  });
}

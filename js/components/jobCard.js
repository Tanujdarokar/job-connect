/**
 * JobConnect Reusable Job Card Component
 */

import { getIcon } from '../icons.js';
import { isJobSaved, toggleSaveJob, getCurrentUser, getJobById } from '../state.js';
import { openApplyModal } from '../modal.js';
import { toast } from '../toast.js';

export function formatSalary(min, max, currency = 'INR') {
  if (!min && !max) return 'Competitive / Undisclosed';
  
  if (currency === 'INR') {
    const formatLakh = (val) => {
      if (val >= 100000) {
        return `₹${(val / 100000).toFixed(val % 100000 === 0 ? 0 : 1)}L`;
      }
      return `₹${val.toLocaleString('en-IN')}`;
    };

    if (min && max) {
      return `${formatLakh(min)} - ${formatLakh(max)} / yr`;
    }
    return `${formatLakh(min || max)} / yr`;
  }

  return `$${min ? min.toLocaleString() : ''} - $${max ? max.toLocaleString() : ''}`;
}

export function renderJobCard(job) {
  const saved = isJobSaved(job.id);
  const workplaceBadge = job.workplaceType === 'remote' ? 'badge-success' : job.workplaceType === 'hybrid' ? 'badge-primary' : 'badge-muted';

  return `
    <div class="job-card ${job.featured ? 'featured' : ''}" data-job-id="${job.id}">
      <div>
        <!-- Card Header -->
        <div class="job-header">
          <img src="${job.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80'}" class="job-company-logo" alt="${job.companyName}">
          <div style="flex: 1; min-width: 0;">
            <a href="#/jobs/${job.id}" class="job-title" style="display: block; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${job.title}</a>
            <a href="#/companies/${job.companyId || 'comp_1'}" class="job-company-name">${job.companyName}</a>
          </div>
          <button type="button" class="btn-icon job-save-btn" data-id="${job.id}" aria-label="Save Job" title="${saved ? 'Unsave Job' : 'Save Job'}" style="color: ${saved ? 'var(--primary)' : 'var(--text-subtle)'}; flex-shrink: 0;">
            ${saved ? getIcon('bookmarkFilled') : getIcon('bookmark')}
          </button>
        </div>

        <!-- Meta Details -->
        <div class="job-details-meta">
          <span class="meta-item">${getIcon('mapPin')} ${job.location}</span>
          <span class="badge ${workplaceBadge}" style="text-transform: capitalize;">${job.workplaceType || 'on-site'}</span>
          <span class="badge badge-muted" style="text-transform: capitalize;">${job.jobType || 'full-time'}</span>
          ${job.featured ? `<span class="badge badge-accent">Featured</span>` : ''}
        </div>

        <!-- Skills Tags -->
        <div class="job-skills">
          ${(job.skills || []).slice(0, 4).map(skill => `<span class="badge badge-muted">${skill}</span>`).join('')}
          ${(job.skills || []).length > 4 ? `<span class="badge badge-muted">+${job.skills.length - 4}</span>` : ''}
        </div>
      </div>

      <!-- Card Footer -->
      <div class="job-footer">
        <div class="job-salary">
          ${formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <a href="#/jobs/${job.id}" class="btn btn-outline btn-sm">Details</a>
          <button type="button" class="btn btn-primary btn-sm job-quick-apply-btn" data-id="${job.id}">Apply</button>
        </div>
      </div>
    </div>
  `;
}

export function attachJobCardEvents(container = document) {
  // Save button event
  container.querySelectorAll('.job-save-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const jobId = btn.dataset.id;
      const user = getCurrentUser();
      if (!user) {
        toast.info('Sign In Required', 'Please sign in to save jobs.');
        window.location.hash = '#/login';
        return;
      }
      const isSaved = toggleSaveJob(jobId);
      btn.style.color = isSaved ? 'var(--primary)' : 'var(--text-subtle)';
      btn.innerHTML = isSaved ? getIcon('bookmarkFilled') : getIcon('bookmark');
      toast.success(isSaved ? 'Job Saved ⭐' : 'Job Removed', isSaved ? 'Added to your bookmarked jobs.' : 'Removed from your bookmarked jobs.');
    });
  });

  // Quick apply button event
  container.querySelectorAll('.job-quick-apply-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const jobId = btn.dataset.id;
      const job = getJobById(jobId);
      if (job) openApplyModal(job);
    });
  });
}

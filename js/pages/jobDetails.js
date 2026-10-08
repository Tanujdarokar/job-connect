/**
 * JobConnect Job Details Page Module
 */

import { getIcon } from '../icons.js';
import { getJobById, getCompanyById, getJobs, isJobSaved, toggleSaveJob, getCurrentUser } from '../state.js';
import { openApplyModal } from '../modal.js';
import { formatSalary } from '../components/jobCard.js';
import { toast } from '../toast.js';

export function renderJobDetailsPage(jobId) {
  const job = getJobById(jobId);
  if (!job) {
    return `
      <div class="container" style="padding: 4rem 1.25rem; text-align: center;">
        <h2>Job Not Found</h2>
        <p style="margin-top: 0.5rem; margin-bottom: 1.5rem;">This job listing may have expired or been removed.</p>
        <a href="#/jobs" class="btn btn-primary">Back to Jobs Explorer</a>
      </div>
    `;
  }

  const company = getCompanyById(job.companyId) || { name: job.companyName, location: job.location, size: '500+ employees', rating: 4.8, reviewCount: 120 };
  const saved = isJobSaved(job.id);
  const similarJobs = getJobs().filter(j => j.id !== job.id && (j.companyId === job.companyId || j.skills?.some(s => job.skills?.includes(s)))).slice(0, 3);

  return `
    <div class="container" style="padding: 2.5rem 1.25rem;">
      <!-- Breadcrumb -->
      <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">
        <a href="#/jobs" style="color: var(--text-muted);">Jobs</a>
        <span>/</span>
        <a href="#/companies/${job.companyId || 'comp_1'}" style="color: var(--text-muted);">${job.companyName}</a>
        <span>/</span>
        <span style="color: var(--text-main); font-weight: 600;">${job.title}</span>
      </div>

      <!-- Hero Header Card -->
      <div class="card" style="padding: 2rem; margin-bottom: 2rem; box-shadow: var(--shadow-md);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1.5rem;">
          <div style="display: flex; gap: 1.25rem;">
            <img src="${job.companyLogo}" style="width: 72px; height: 72px; border-radius: var(--radius-lg); object-fit: cover; border: 1px solid var(--border-color);" alt="${job.companyName}">
            <div>
              <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">${job.title}</h1>
              <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; font-size: 0.95rem; color: var(--text-muted);">
                <a href="#/companies/${job.companyId || 'comp_1'}" style="font-weight: 700; color: var(--text-main);">${job.companyName}</a>
                <span>•</span>
                <span>${getIcon('mapPin')} ${job.location}</span>
                <span>•</span>
                <span style="color: var(--success); font-weight: 600;">Verified Employer</span>
              </div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button type="button" id="detail-save-btn" class="btn btn-outline" style="color: ${saved ? 'var(--primary)' : 'var(--text-main)'};">
              ${saved ? getIcon('bookmarkFilled') : getIcon('bookmark')} ${saved ? 'Saved' : 'Save Job'}
            </button>
            <button type="button" id="detail-apply-btn" class="btn btn-primary btn-lg">
              ${getIcon('send')} Apply Now
            </button>
          </div>
        </div>

        <!-- Meta Ribbon -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Compensation</div>
            <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-top: 2px;">
              ${formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
            </div>
          </div>
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Workplace Type</div>
            <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-top: 2px; text-transform: capitalize;">
              ${job.workplaceType}
            </div>
          </div>
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Employment Type</div>
            <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-top: 2px; text-transform: capitalize;">
              ${job.jobType}
            </div>
          </div>
          <div>
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Experience Required</div>
            <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-top: 2px; text-transform: capitalize;">
              ${job.experienceLevel} Level
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <!-- Left: Job Details Content -->
        <div>
          <!-- Description -->
          <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">About the Opportunity</h3>
            <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 1.5rem;">
              ${job.description || 'Join our dynamic team building next-generation digital experiences.'}
            </p>

            <!-- Responsibilities -->
            <h4 style="margin-top: 1.5rem; margin-bottom: 0.75rem;">Key Responsibilities</h4>
            <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.95rem; color: var(--text-muted);">
              ${(job.responsibilities || [
                'Architect, develop, and maintain performant features with modern best practices',
                'Collaborate closely with UI/UX designers, product managers, and backend engineers',
                'Write scalable, clean, test-covered code ensuring high reliability and uptime',
                'Participate in architecture reviews, sprint planning, and engineering mentorship',
              ]).map(r => `<li>${r}</li>`).join('')}
            </ul>

            <!-- Requirements -->
            <h4 style="margin-top: 1.5rem; margin-bottom: 0.75rem;">Candidate Requirements</h4>
            <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.95rem; color: var(--text-muted);">
              ${(job.requirements || [
                'Proven hands-on production experience in relevant tech stack',
                'Strong grasp of data structures, async programming, and API integration',
                'Passionate about great user experiences and modern design standards',
              ]).map(rq => `<li>${rq}</li>`).join('')}
            </ul>

            <!-- Skills -->
            <h4 style="margin-top: 1.5rem; margin-bottom: 0.75rem;">Required Skills & Technologies</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${(job.skills || []).map(s => `<span class="badge badge-primary" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">${s}</span>`).join('')}
            </div>

            <!-- Benefits -->
            <h4 style="margin-top: 1.5rem; margin-bottom: 0.75rem;">Perks & Benefits</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.9rem; color: var(--text-muted);">
              ${(job.benefits || ['Comprehensive Medical Coverage', 'Flexible Remote / Hybrid Options', 'Annual Learning Stipend', 'Performance Bonus & Stock Options']).map(b => `
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span style="color: var(--success);">${getIcon('checkCircle')}</span> ${b}
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right: Company Overview & Similar Jobs -->
        <div>
          <!-- Company Card -->
          <div class="card" style="padding: 1.5rem; margin-bottom: 2rem;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <img src="${job.companyLogo}" style="width: 52px; height: 52px; border-radius: var(--radius-md); object-fit: cover;" alt="${job.companyName}">
              <div>
                <div style="font-weight: 700; font-size: 1.1rem; color: var(--text-main);">${job.companyName}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted);">${company.industry || 'Software & Internet'}</div>
              </div>
            </div>
            <p style="font-size: 0.85rem; line-height: 1.5; color: var(--text-muted); margin-bottom: 1rem;">
              ${company.tagline || 'Leading innovation and engineering digital transformation.'}
            </p>
            <div style="font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.4rem; padding: 0.75rem 0; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); margin-bottom: 1rem;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Company Size:</span>
                <span style="font-weight: 600;">${company.size || '500+ employees'}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Rating:</span>
                <span style="font-weight: 600; color: var(--warning-text); display: flex; align-items: center; gap: 2px;">
                  ${getIcon('star')} ${company.rating || '4.8'} (${company.reviewCount || '140'} reviews)
                </span>
              </div>
            </div>
            <a href="#/companies/${job.companyId || 'comp_1'}" class="btn btn-outline" style="width: 100%;">
              View Full Company Profile ${getIcon('arrowRight')}
            </a>
          </div>

          <!-- Similar Roles -->
          <div class="card" style="padding: 1.5rem;">
            <h4 style="margin-bottom: 1rem;">Similar Open Roles</h4>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              ${similarJobs.map(sj => `
                <a href="#/jobs/${sj.id}" style="display: block; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle); text-decoration: none;">
                  <div style="font-weight: 700; font-size: 0.925rem; color: var(--text-main); margin-bottom: 0.2rem;">${sj.title}</div>
                  <div style="font-size: 0.825rem; color: var(--text-muted);">${sj.companyName} • ${sj.location}</div>
                  <div style="font-size: 0.825rem; font-weight: 600; color: var(--primary); margin-top: 0.25rem;">
                    ${formatSalary(sj.salaryMin, sj.salaryMax, sj.salaryCurrency)}
                  </div>
                </a>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachJobDetailsEvents(jobId) {
  const job = getJobById(jobId);
  if (!job) return;

  const applyBtn = document.querySelector('#detail-apply-btn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      openApplyModal(job);
    });
  }

  const saveBtn = document.querySelector('#detail-save-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const user = getCurrentUser();
      if (!user) {
        toast.info('Sign In Required', 'Please sign in to bookmark jobs.');
        window.location.hash = '#/login';
        return;
      }
      const isSaved = toggleSaveJob(job.id);
      saveBtn.style.color = isSaved ? 'var(--primary)' : 'var(--text-main)';
      saveBtn.innerHTML = `${isSaved ? getIcon('bookmarkFilled') : getIcon('bookmark')} ${isSaved ? 'Saved' : 'Save Job'}`;
      toast.success(isSaved ? 'Job Bookmarked ⭐' : 'Job Removed', isSaved ? 'Added to your bookmarked jobs.' : 'Removed from your bookmarked jobs.');
    });
  }
}

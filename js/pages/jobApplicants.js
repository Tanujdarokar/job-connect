/**
 * JobConnect Employer Job Applicants Review Pipeline Page Module
 */

import { getIcon } from '../icons.js';
import { getJobById, getJobApplications, updateApplicationStatus, APPLICATION_STATUS } from '../state.js';
import { renderEmployerSidebar } from '../components/sidebar.js';
import { openScheduleInterviewModal } from '../modal.js';
import { toast } from '../toast.js';

export function renderJobApplicantsPage(jobId) {
  const job = getJobById(jobId) || { id: jobId, title: 'Senior Frontend Engineer', companyName: 'TechCorp Innovations' };
  const applications = getJobApplications(jobId);

  return `
    <div class="dashboard-layout">
      ${renderEmployerSidebar('#/employer/jobs')}
      <main class="dashboard-main">
        <!-- Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <a href="#/employer/jobs" style="font-size: 0.85rem; color: var(--text-muted); display: inline-flex; align-items: center; gap: 0.35rem; margin-bottom: 0.5rem;">
              ${getIcon('arrowLeft')} Back to Job Postings
            </a>
            <h1 style="font-size: 1.85rem; margin-bottom: 0.25rem;">Applicants for ${job.title}</h1>
            <p>${applications.length} candidates in your active review pipeline.</p>
          </div>
          <a href="#/employer/candidates" class="btn btn-outline">
            ${getIcon('search')} Source More Candidates
          </a>
        </div>

        <!-- Pipeline Candidates List -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          ${applications.length > 0 ? applications.map(app => `
            <div class="card" style="padding: 1.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
                <div style="display: flex; gap: 1.25rem;">
                  <img src="${app.seekerAvatar}" style="width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary-light);" alt="${app.seekerName}">
                  <div>
                    <h3 style="font-size: 1.15rem; color: var(--text-main); margin-bottom: 0.25rem;">${app.seekerName}</h3>
                    <div style="font-size: 0.875rem; color: var(--primary); font-weight: 600;">${app.seekerHeadline || 'Candidate'}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">${app.seekerEmail} • ${app.location || 'India'}</div>
                  </div>
                </div>

                <!-- Status Select Changer -->
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">Stage:</span>
                  <select class="form-select app-status-select" data-id="${app.id}" style="width: auto; font-size: 0.85rem; font-weight: 700; padding: 0.4rem 0.85rem;">
                    <option value="${APPLICATION_STATUS.APPLIED}" ${app.status === APPLICATION_STATUS.APPLIED ? 'selected' : ''}>Applied</option>
                    <option value="${APPLICATION_STATUS.UNDER_REVIEW}" ${app.status === APPLICATION_STATUS.UNDER_REVIEW ? 'selected' : ''}>Under Review</option>
                    <option value="${APPLICATION_STATUS.SHORTLISTED}" ${app.status === APPLICATION_STATUS.SHORTLISTED ? 'selected' : ''}>Shortlisted</option>
                    <option value="${APPLICATION_STATUS.INTERVIEW}" ${app.status === APPLICATION_STATUS.INTERVIEW ? 'selected' : ''}>Interview Scheduled</option>
                    <option value="${APPLICATION_STATUS.HIRED}" ${app.status === APPLICATION_STATUS.HIRED ? 'selected' : ''}>Hired 🎉</option>
                    <option value="${APPLICATION_STATUS.REJECTED}" ${app.status === APPLICATION_STATUS.REJECTED ? 'selected' : ''}>Rejected</option>
                  </select>
                </div>
              </div>

              <!-- Cover Letter Note -->
              <div style="background: var(--bg-muted); padding: 1rem 1.25rem; border-radius: var(--radius-md); font-size: 0.875rem; margin-bottom: 1.25rem;">
                <div style="font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;">Candidate Cover Note:</div>
                <p style="color: var(--text-muted); line-height: 1.5;">${app.coverLetter || 'No cover letter provided.'}</p>
              </div>

              <!-- Action Bar -->
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">
                  ${getIcon('fileText')} <span>Resume: ${app.resumeUrl}</span>
                </div>
                <div style="display: flex; gap: 0.75rem;">
                  <a href="#/seeker/chat" class="btn btn-outline btn-sm">
                    ${getIcon('messageSquare')} Message
                  </a>
                  <button type="button" class="btn btn-primary btn-sm schedule-candidate-btn" data-id="${app.id}" data-name="${app.seekerName}" data-email="${app.seekerEmail}">
                    ${getIcon('video')} Schedule Live Video Round
                  </button>
                </div>
              </div>
            </div>
          `).join('') : `
            <div class="card" style="text-align: center; padding: 4rem 2rem;">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--bg-muted); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: var(--text-muted);">
                ${getIcon('users')}
              </div>
              <h3 style="margin-bottom: 0.5rem;">No Applicants Yet</h3>
              <p style="margin-bottom: 1.5rem;">We are matching your job posting with candidates across India.</p>
              <a href="#/employer/candidates" class="btn btn-primary">${getIcon('search')} Search Talent Directory</a>
            </div>
          `}
        </div>
      </main>
    </div>
  `;
}

export function attachJobApplicantsEvents(jobId) {
  const job = getJobById(jobId);

  // Status changer
  document.querySelectorAll('.app-status-select').forEach((select) => {
    select.addEventListener('change', (e) => {
      const appId = select.dataset.id;
      const newStatus = e.target.value;
      updateApplicationStatus(appId, newStatus);
      toast.success('Stage Updated', `Candidate moved to ${newStatus.replace('_', ' ')}.`);
    });
  });

  // Schedule Interview modal trigger
  document.querySelectorAll('.schedule-candidate-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const candidate = {
        seekerId: btn.dataset.id,
        name: btn.dataset.name,
        email: btn.dataset.email,
      };
      openScheduleInterviewModal({ candidate, job, onScheduled: () => {
        window.location.reload();
      }});
    });
  });
}

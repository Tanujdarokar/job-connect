/**
 * JobConnect Universal Modal Engine
 */

import { getIcon } from './icons.js';
import { applyToJob, scheduleInterview, addReview, sendMessage, getCurrentUser } from './state.js';
import { toast } from './toast.js';

let activeBackdrop = null;

export function openModal({ title, bodyHtml, footerHtml = '', size = 'md', onMount = null }) {
  closeModal();

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop show';

  backdrop.innerHTML = `
    <div class="modal-dialog modal-${size}" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3 style="font-size: 1.15rem; font-weight: 700;">${title}</h3>
        <button type="button" class="btn-icon modal-close-btn" aria-label="Close modal">
          ${getIcon('x')}
        </button>
      </div>
      <div class="modal-body">
        ${bodyHtml}
      </div>
      ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
    </div>
  `;

  // Close on backdrop click (outside dialog)
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  const closeBtn = backdrop.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  document.body.appendChild(backdrop);
  document.body.style.overflow = 'hidden';
  activeBackdrop = backdrop;

  if (typeof onMount === 'function') {
    onMount(backdrop);
  }
}

export function closeModal() {
  if (activeBackdrop) {
    activeBackdrop.remove();
    activeBackdrop = null;
    document.body.style.overflow = '';
  }
}

// Pre-built Specialized Modals:

export function openApplyModal(job) {
  const user = getCurrentUser();
  if (!user) {
    window.location.hash = '#/login';
    toast.info('Sign In Required', 'Please sign in to apply for this job.');
    return;
  }

  openModal({
    title: `Apply to ${job.title}`,
    size: 'lg',
    bodyHtml: `
      <div style="margin-bottom: 1.25rem; display: flex; align-items: center; gap: 1rem; padding: 0.85rem; background: var(--bg-muted); border-radius: var(--radius-md);">
        <img src="${job.companyLogo}" style="width: 44px; height: 44px; border-radius: 8px; object-fit: cover;" alt="${job.companyName}">
        <div>
          <div style="font-weight: 700; color: var(--text-main);">${job.title}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">${job.companyName} • ${job.location}</div>
        </div>
      </div>
      <form id="apply-form">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-input" value="${user.name || ''}" required disabled>
        </div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-input" value="${user.email || ''}" required disabled>
        </div>
        <div class="form-group">
          <label class="form-label">Attached Resume</label>
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; border: 1.5px dashed var(--border-color); border-radius: var(--radius-md); background: var(--bg-muted);">
            <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 600;">
              <span style="color: var(--primary);">${getIcon('fileText')}</span>
              <span id="applied-resume-name">${user.resume?.fileName || 'Aarav_Sharma_FullStack_Resume.pdf'}</span>
            </div>
            <span class="badge badge-success">Attached</span>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="cover-letter-text">Cover Note / Why are you a great fit? <span style="color: var(--text-subtle); font-weight: normal;">(Optional)</span></label>
          <textarea id="cover-letter-text" class="form-textarea" placeholder="Highlight relevant skills, achievements, or project links..."></textarea>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
          <button type="button" class="btn btn-secondary modal-cancel-btn">Cancel</button>
          <button type="submit" class="btn btn-primary">
            ${getIcon('send')} Submit Application
          </button>
        </div>
      </form>
    `,
    onMount: (modalEl) => {
      const form = modalEl.querySelector('#apply-form');
      const cancelBtn = modalEl.querySelector('.modal-cancel-btn');
      cancelBtn.addEventListener('click', closeModal);

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const note = modalEl.querySelector('#cover-letter-text').value;
        const res = applyToJob({
          jobId: job.id,
          coverLetter: note,
          resumeUrl: user.resume?.fileName || 'Aarav_Sharma_FullStack_Resume.pdf',
        });

        if (res.success) {
          closeModal();
          toast.success('Application Sent! 🎉', `Your application for ${job.title} has been submitted.`);
        } else {
          toast.warning('Note', res.message);
        }
      });
    },
  });
}

export function openScheduleInterviewModal({ candidate, job, onScheduled }) {
  openModal({
    title: `Schedule Interview - ${candidate.name || candidate.seekerName}`,
    size: 'md',
    bodyHtml: `
      <form id="schedule-interview-form">
        <div class="form-group">
          <label class="form-label">Interview Title / Round</label>
          <input type="text" id="int-title" class="form-input" value="Round 1: Technical & System Design" required>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Date</label>
            <input type="date" id="int-date" class="form-input" value="${new Date(Date.now() + 86400000).toISOString().split('T')[0]}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Start Time</label>
            <input type="time" id="int-time" class="form-input" value="15:00" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Interview Mode</label>
          <select id="int-mode" class="form-select">
            <option value="video">JobConnect AI Live Video Room (Recommended)</option>
            <option value="google_meet">Google Meet</option>
            <option value="in_person">In-Person Office</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Preparation Notes for Candidate</label>
          <textarea id="int-notes" class="form-textarea" placeholder="e.g. Please be ready to present your past architecture work and code live."></textarea>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
          <button type="button" class="btn btn-secondary modal-cancel-btn">Cancel</button>
          <button type="submit" class="btn btn-primary">
            ${getIcon('video')} Schedule & Send Invite
          </button>
        </div>
      </form>
    `,
    onMount: (modalEl) => {
      const form = modalEl.querySelector('#schedule-interview-form');
      modalEl.querySelector('.modal-cancel-btn').addEventListener('click', closeModal);

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = modalEl.querySelector('#int-title').value;
        const date = modalEl.querySelector('#int-date').value;
        const startTime = modalEl.querySelector('#int-time').value;
        const notes = modalEl.querySelector('#int-notes').value;

        const scheduled = scheduleInterview({
          jobId: job?.id || 'job_1',
          jobTitle: job?.title || 'Senior Software Engineer',
          companyName: 'TechCorp Innovations',
          seekerId: candidate.seekerId || candidate.id || 'user_seeker_1',
          seekerName: candidate.seekerName || candidate.name || 'Candidate',
          employerId: 'user_employer_1',
          employerName: 'Priya Patel',
          title,
          date,
          startTime,
          endTime: '16:00',
          notes,
        });

        closeModal();
        toast.success('Interview Scheduled! 🎯', `Invitation sent to ${candidate.seekerName || candidate.name}.`);
        if (typeof onScheduled === 'function') onScheduled(scheduled);
      });
    },
  });
}

export function openAddReviewModal(company, onAdded) {
  openModal({
    title: `Review ${company.name}`,
    size: 'md',
    bodyHtml: `
      <form id="review-form">
        <div class="form-group">
          <label class="form-label">Overall Rating (1 to 5 Stars)</label>
          <select id="review-rating" class="form-select">
            <option value="5">⭐⭐⭐⭐⭐ 5 Stars (Exceptional)</option>
            <option value="4">⭐⭐⭐⭐ 4 Stars (Very Good)</option>
            <option value="3">⭐⭐⭐ 3 Stars (Average)</option>
            <option value="2">⭐⭐ 2 Stars (Below Average)</option>
            <option value="1">⭐ 1 Star (Poor)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Review Title</label>
          <input type="text" id="review-title" class="form-input" placeholder="e.g. Great work-life balance and high impact projects" required>
        </div>
        <div class="form-group">
          <label class="form-label">Pros</label>
          <textarea id="review-pros" class="form-textarea" placeholder="What makes this company a great workplace?" required></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Cons</label>
          <textarea id="review-cons" class="form-textarea" placeholder="What are areas of improvement?" required></textarea>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
          <button type="button" class="btn btn-secondary modal-cancel-btn">Cancel</button>
          <button type="submit" class="btn btn-primary">
            ${getIcon('check')} Submit Employee Review
          </button>
        </div>
      </form>
    `,
    onMount: (modalEl) => {
      const form = modalEl.querySelector('#review-form');
      modalEl.querySelector('.modal-cancel-btn').addEventListener('click', closeModal);

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const rating = modalEl.querySelector('#review-rating').value;
        const title = modalEl.querySelector('#review-title').value;
        const pros = modalEl.querySelector('#review-pros').value;
        const cons = modalEl.querySelector('#review-cons').value;

        const newRev = addReview({
          companyId: company.id,
          rating,
          title,
          pros,
          cons,
        });

        closeModal();
        toast.success('Review Published! ⭐', 'Thank you for sharing your workplace insights.');
        if (typeof onAdded === 'function') onAdded(newRev);
      });
    },
  });
}

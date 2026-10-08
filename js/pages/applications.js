/**
 * JobConnect Seeker Applications Tracker Page Module
 */

import { getIcon } from '../icons.js';
import { getCurrentUser, getSeekerApplications, APPLICATION_STATUS } from '../state.js';
import { renderSeekerSidebar } from '../components/sidebar.js';

export function renderApplicationsPage(filterStatus = '') {
  const user = getCurrentUser();
  if (!user) {
    window.location.hash = '#/login';
    return '';
  }

  const allApps = getSeekerApplications(user.id);
  const filtered = filterStatus ? allApps.filter(a => a.status === filterStatus) : allApps;

  const getStepNumber = (status) => {
    switch (status) {
      case APPLICATION_STATUS.APPLIED: return 1;
      case APPLICATION_STATUS.UNDER_REVIEW: return 2;
      case APPLICATION_STATUS.SHORTLISTED: return 3;
      case APPLICATION_STATUS.INTERVIEW: return 4;
      case APPLICATION_STATUS.HIRED: return 5;
      default: return 1;
    }
  };

  return `
    <div class="dashboard-layout">
      ${renderSeekerSidebar('#/seeker/applications')}
      <main class="dashboard-main">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Track Applications</h1>
            <p>Monitor your live hiring pipelines and interview progression across companies.</p>
          </div>
          <a href="#/jobs" class="btn btn-primary">
            ${getIcon('plus')} Apply to More Roles
          </a>
        </div>

        <!-- Filter Status Tabs -->
        <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; margin-bottom: 2rem;">
          <button type="button" class="btn btn-sm ${!filterStatus ? 'btn-primary' : 'btn-outline'} app-tab-btn" data-status="">
            All (${allApps.length})
          </button>
          <button type="button" class="btn btn-sm ${filterStatus === APPLICATION_STATUS.APPLIED ? 'btn-primary' : 'btn-outline'} app-tab-btn" data-status="${APPLICATION_STATUS.APPLIED}">
            Applied
          </button>
          <button type="button" class="btn btn-sm ${filterStatus === APPLICATION_STATUS.UNDER_REVIEW ? 'btn-primary' : 'btn-outline'} app-tab-btn" data-status="${APPLICATION_STATUS.UNDER_REVIEW}">
            Under Review
          </button>
          <button type="button" class="btn btn-sm ${filterStatus === APPLICATION_STATUS.SHORTLISTED ? 'btn-primary' : 'btn-outline'} app-tab-btn" data-status="${APPLICATION_STATUS.SHORTLISTED}">
            Shortlisted
          </button>
          <button type="button" class="btn btn-sm ${filterStatus === APPLICATION_STATUS.INTERVIEW ? 'btn-primary' : 'btn-outline'} app-tab-btn" data-status="${APPLICATION_STATUS.INTERVIEW}">
            Interview Stage
          </button>
          <button type="button" class="btn btn-sm ${filterStatus === APPLICATION_STATUS.HIRED ? 'btn-primary' : 'btn-outline'} app-tab-btn" data-status="${APPLICATION_STATUS.HIRED}">
            Offers / Hired 🎉
          </button>
        </div>

        <!-- Applications List -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          ${filtered.length > 0 ? filtered.map(app => {
            const step = getStepNumber(app.status);
            const fillWidth = ((step - 1) / 4) * 100;

            return `
              <div class="card" style="padding: 1.75rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
                  <div style="display: flex; gap: 1rem;">
                    <img src="${app.companyLogo}" style="width: 48px; height: 48px; border-radius: var(--radius-md); object-fit: cover;" alt="${app.companyName}">
                    <div>
                      <a href="#/jobs/${app.jobId}" style="font-weight: 700; font-size: 1.15rem; color: var(--text-main);">${app.jobTitle}</a>
                      <div style="font-size: 0.875rem; color: var(--text-muted); margin-top: 2px;">
                        <a href="#/companies/${app.companyId || 'comp_1'}" style="color: var(--text-muted);">${app.companyName}</a> • ${app.location}
                      </div>
                    </div>
                  </div>
                  <div style="text-align: right;">
                    <span class="badge ${app.status === APPLICATION_STATUS.HIRED ? 'badge-success' : app.status === APPLICATION_STATUS.REJECTED ? 'badge-danger' : 'badge-primary'}" style="text-transform: capitalize; font-size: 0.85rem; padding: 0.35rem 0.75rem;">
                      ${app.status.replace('_', ' ')}
                    </span>
                    <div style="font-size: 0.8rem; color: var(--text-subtle); margin-top: 0.35rem;">
                      Applied on ${new Date(app.appliedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <!-- Progress Stepper Tracker -->
                <div class="stepper" style="margin: 2rem 1rem;">
                  <div class="stepper-progress-bar">
                    <div class="stepper-progress-fill" style="width: ${fillWidth}%;"></div>
                  </div>

                  <div class="step-node ${step >= 1 ? 'completed' : ''}">
                    <div class="step-icon">1</div>
                    <span class="step-title">Applied</span>
                  </div>
                  <div class="step-node ${step >= 2 ? (step > 2 ? 'completed' : 'active') : ''}">
                    <div class="step-icon">2</div>
                    <span class="step-title">Under Review</span>
                  </div>
                  <div class="step-node ${step >= 3 ? (step > 3 ? 'completed' : 'active') : ''}">
                    <div class="step-icon">3</div>
                    <span class="step-title">Shortlisted</span>
                  </div>
                  <div class="step-node ${step >= 4 ? (step > 4 ? 'completed' : 'active') : ''}">
                    <div class="step-icon">4</div>
                    <span class="step-title">Interview</span>
                  </div>
                  <div class="step-node ${step >= 5 ? 'completed' : ''}">
                    <div class="step-icon">5</div>
                    <span class="step-title">Offer / Hired</span>
                  </div>
                </div>

                <!-- Timeline Updates -->
                <div style="background: var(--bg-muted); padding: 1rem; border-radius: var(--radius-md); font-size: 0.85rem;">
                  <div style="font-weight: 700; margin-bottom: 0.5rem;">Latest Timeline Note:</div>
                  <div style="color: var(--text-muted);">
                    ${(app.timeline || []).slice(-1)[0]?.note || 'Your application is progressing through recruiter review.'}
                  </div>
                </div>

                <!-- Footer Actions -->
                <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.25rem;">
                  <a href="#/seeker/chat" class="btn btn-outline btn-sm">
                    ${getIcon('messageSquare')} Message Recruiter
                  </a>
                  <a href="#/jobs/${app.jobId}" class="btn btn-secondary btn-sm">
                    View Job Posting
                  </a>
                </div>
              </div>
            `;
          }).join('') : `
            <div class="card" style="text-align: center; padding: 4rem 2rem;">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--bg-muted); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: var(--text-muted);">
                ${getIcon('fileText')}
              </div>
              <h3 style="margin-bottom: 0.5rem;">No Applications in This Category</h3>
              <p style="margin-bottom: 1.5rem;">Ready to find your next career leap? Explore open tech roles today.</p>
              <a href="#/jobs" class="btn btn-primary">${getIcon('search')} Find Jobs</a>
            </div>
          `}
        </div>
      </main>
    </div>
  `;
}

export function attachApplicationsEvents() {
  document.querySelectorAll('.app-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const status = btn.dataset.status;
      if (status) {
        window.location.hash = `#/seeker/applications?status=${status}`;
      } else {
        window.location.hash = '#/seeker/applications';
      }
    });
  });
}

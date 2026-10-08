/**
 * JobConnect Live Interviews List Page Module
 */

import { getIcon } from '../icons.js';
import { getCurrentUser, getSeekerInterviews } from '../state.js';
import { renderSeekerSidebar } from '../components/sidebar.js';

export function renderInterviewsPage() {
  const user = getCurrentUser();
  if (!user) {
    window.location.hash = '#/login';
    return '';
  }

  const interviews = getSeekerInterviews(user.id);

  return `
    <div class="dashboard-layout">
      ${renderSeekerSidebar('#/seeker/interviews')}
      <main class="dashboard-main">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Live Video Interviews</h1>
            <p>Join scheduled interviews, test your audio/camera setup, and practice in our interactive AI room.</p>
          </div>
          <a href="#/seeker/interviews/video?id=demo" class="btn btn-primary">
            ${getIcon('video')} Launch AI Practice Room
          </a>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          ${interviews.length > 0 ? interviews.map(int => `
            <div class="card" style="padding: 1.75rem; border-left: 4px solid var(--primary);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
                <div>
                  <span class="badge badge-primary" style="margin-bottom: 0.5rem; text-transform: uppercase;">Confirmed Interview</span>
                  <h3 style="font-size: 1.25rem;">${int.title}</h3>
                  <div style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.25rem;">
                    <strong>${int.companyName}</strong> • For role: ${int.jobTitle}
                  </div>
                </div>
                <div style="text-align: right;">
                  <div style="font-weight: 800; font-size: 1.1rem; color: var(--primary);">
                    📅 ${int.date}
                  </div>
                  <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 2px;">
                    ${int.startTime} - ${int.endTime} IST
                  </div>
                </div>
              </div>

              <div style="background: var(--bg-muted); padding: 1rem; border-radius: var(--radius-md); font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                <strong style="color: var(--text-main);">Preparation Notes from Recruiter:</strong> ${int.notes || 'Be prepared to walk through your architecture and write code live in the workspace.'}
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted);">
                  <span style="color: var(--success);">${getIcon('checkCircle')}</span> Camera & Mic Pre-Checked
                </div>
                <div style="display: flex; gap: 0.75rem;">
                  <a href="#/seeker/chat" class="btn btn-outline btn-sm">
                    ${getIcon('messageSquare')} Message Host
                  </a>
                  <a href="#/seeker/interviews/video?id=${int.id}" class="btn btn-primary btn-sm">
                    ${getIcon('video')} Enter Live Video Room
                  </a>
                </div>
              </div>
            </div>
          `).join('') : `
            <div class="card" style="text-align: center; padding: 4rem 2rem;">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--bg-muted); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: var(--text-muted);">
                ${getIcon('video')}
              </div>
              <h3 style="margin-bottom: 0.5rem;">No Interviews Scheduled Yet</h3>
              <p style="margin-bottom: 1.5rem;">When employers shortlist your application, interview invitations will appear right here.</p>
              <a href="#/seeker/interviews/video?id=practice" class="btn btn-primary">${getIcon('sparkles')} Test AI Practice Video Room</a>
            </div>
          `}
        </div>
      </main>
    </div>
  `;
}

export function attachInterviewsEvents() {}

/**
 * JobConnect Reusable Dashboard Sidebar Component
 */

import { getIcon } from '../icons.js';
import { getCurrentUser, USER_ROLES } from '../state.js';

export function renderSeekerSidebar(activeRoute = '') {
  const hash = window.location.hash || activeRoute;

  return `
    <aside class="dashboard-sidebar">
      <div class="sidebar-heading">Candidate Hub</div>
      <a href="#/seeker/dashboard" class="sidebar-link ${hash === '#/seeker/dashboard' ? 'active' : ''}">
        <div class="sidebar-link-content">
          ${getIcon('pieChart')} Overview
        </div>
      </a>
      <a href="#/seeker/applications" class="sidebar-link ${hash.includes('/applications') ? 'active' : ''}">
        <div class="sidebar-link-content">
          ${getIcon('fileText')} Applications
        </div>
      </a>
      <a href="#/seeker/saved-jobs" class="sidebar-link ${hash.includes('/saved-jobs') ? 'active' : ''}">
        <div class="sidebar-link-content">
          ${getIcon('bookmark')} Saved Jobs
        </div>
      </a>
      <a href="#/seeker/interviews" class="sidebar-link ${hash.includes('/interviews') ? 'active' : ''}">
        <div class="sidebar-link-content">
          ${getIcon('video')} Live Interviews
        </div>
      </a>
      <a href="#/seeker/chat" class="sidebar-link ${hash.includes('/chat') ? 'active' : ''}">
        <div class="sidebar-link-content">
          ${getIcon('messageSquare')} Messages
        </div>
      </a>

      <div class="sidebar-heading" style="margin-top: 1rem;">Career Tools</div>
      <a href="#/ai-tools/resume" class="sidebar-link ${hash.includes('/ai-tools/resume') ? 'active' : ''}">
        <div class="sidebar-link-content">
          ${getIcon('sparkles')} AI Resume Analyzer
        </div>
      </a>
      <a href="#/salaries" class="sidebar-link ${hash === '#/salaries' ? 'active' : ''}">
        <div class="sidebar-link-content">
          ${getIcon('rupee')} Salary Explorer
        </div>
      </a>
      <a href="#/seeker/profile" class="sidebar-link ${hash.includes('/profile') ? 'active' : ''}">
        <div class="sidebar-link-content">
          ${getIcon('user')} Edit Profile
        </div>
      </a>
    </aside>
  `;
}

export function renderEmployerSidebar(activeRoute = '') {
  const hash = window.location.hash || activeRoute;

  return `
    <aside class="dashboard-sidebar">
      <div class="sidebar-heading">Recruitment Hub</div>
      <a href="#/employer/dashboard" class="sidebar-link ${hash === '#/employer/dashboard' ? 'active' : ''}">
        <div class="sidebar-link-content">
          ${getIcon('pieChart')} Overview
        </div>
      </a>
      <a href="#/employer/jobs" class="sidebar-link ${hash === '#/employer/jobs' ? 'active' : ''}">
        <div class="sidebar-link-content">
          ${getIcon('briefcase')} Manage Postings
        </div>
      </a>
      <a href="#/employer/post-job" class="sidebar-link ${hash === '#/employer/post-job' ? 'active' : ''}">
        <div class="sidebar-link-content">
          ${getIcon('plus')} Post a New Job
        </div>
      </a>
      <a href="#/employer/candidates" class="sidebar-link ${hash.includes('/candidates') ? 'active' : ''}">
        <div class="sidebar-link-content">
          ${getIcon('users')} Talent Sourcing
        </div>
      </a>
      <a href="#/employer/analytics" class="sidebar-link ${hash.includes('/analytics') ? 'active' : ''}">
        <div class="sidebar-link-content">
          ${getIcon('trendingUp')} Hiring Analytics
        </div>
      </a>
      <a href="#/seeker/chat" class="sidebar-link ${hash.includes('/chat') ? 'active' : ''}">
        <div class="sidebar-link-content">
          ${getIcon('messageSquare')} Candidate Chat
        </div>
      </a>
    </aside>
  `;
}

export function renderAdminSidebar(activeRoute = '') {
  const hash = window.location.hash || activeRoute;

  return `
    <aside class="dashboard-sidebar">
      <div class="sidebar-heading">Admin System</div>
      <a href="#/admin/dashboard" class="sidebar-link ${hash === '#/admin/dashboard' ? 'active' : ''}">
        <div class="sidebar-link-content">
          ${getIcon('shield')} Platform Overview
        </div>
      </a>
      <a href="#/jobs" class="sidebar-link">
        <div class="sidebar-link-content">
          ${getIcon('briefcase')} Job Explorer
        </div>
      </a>
      <a href="#/companies" class="sidebar-link">
        <div class="sidebar-link-content">
          ${getIcon('building')} Companies
        </div>
      </a>
    </aside>
  `;
}

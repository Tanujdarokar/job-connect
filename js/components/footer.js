/**
 * JobConnect Rich Footer Component
 */

import { getIcon } from '../icons.js';

export function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand Summary -->
          <div class="footer-col-brand">
            <a href="#/" class="nav-logo" style="margin-bottom: 0.5rem;">
              <div class="nav-logo-icon">
                ${getIcon('sparkles')}
              </div>
              <span>Job<span style="color: var(--primary);">Connect</span></span>
            </a>
            <p>
              India’s next-generation career and hiring platform. Powering seamless connections between high-caliber tech talent and fast-growing companies with AI tools and live video screening.
            </p>
            <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
              <a href="https://github.com" target="_blank" rel="noreferrer" class="btn-icon" aria-label="GitHub">
                ${getIcon('globe')}
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" class="btn-icon" aria-label="LinkedIn">
                ${getIcon('users')}
              </a>
            </div>
          </div>

          <!-- Job Seekers -->
          <div>
            <div class="footer-col-title">For Candidates</div>
            <ul class="footer-nav">
              <li><a href="#/jobs">Browse Verified Jobs</a></li>
              <li><a href="#/companies">Company Directory</a></li>
              <li><a href="#/salaries">Salary Benchmarks</a></li>
              <li><a href="#/ai-tools/resume">AI Resume ATS Analyzer</a></li>
              <li><a href="#/seeker/interviews">Live Video Interview Prep</a></li>
            </ul>
          </div>

          <!-- Employers -->
          <div>
            <div class="footer-col-title">For Employers</div>
            <ul class="footer-nav">
              <li><a href="#/employer/post-job">Post a Vacancy</a></li>
              <li><a href="#/employer/candidates">Talent Sourcing Pool</a></li>
              <li><a href="#/employer/jobs">Applicant Management</a></li>
              <li><a href="#/employer/analytics">Hiring Metrics & Funnel</a></li>
            </ul>
          </div>

          <!-- Platform & Support -->
          <div>
            <div class="footer-col-title">Platform</div>
            <ul class="footer-nav">
              <li><a href="#/login">Sign In / Demo Login</a></li>
              <li><a href="#/signup">Create Free Account</a></li>
              <li><a href="#/admin/dashboard">System Admin Console</a></li>
              <li><span style="display: inline-flex; align-items: center; gap: 0.35rem; color: var(--success); font-size: 0.85rem; font-weight: 600;">${getIcon('checkCircle')} Systems Operational</span></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div>© ${new Date().getFullYear()} JobConnect Technologies India. All rights reserved.</div>
          <div style="display: flex; gap: 1.5rem;">
            <span>Vanilla HTML5 • CSS3 • ES6+ JS</span>
            <span>Zero Framework Bloat</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

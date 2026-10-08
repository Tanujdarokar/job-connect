/**
 * JobConnect Employer Hiring Analytics Page Module
 */

import { getIcon } from '../icons.js';
import { renderEmployerSidebar } from '../components/sidebar.js';

export function renderEmployerAnalyticsPage() {
  return `
    <div class="dashboard-layout">
      ${renderEmployerSidebar('#/employer/analytics')}
      <main class="dashboard-main">
        <div style="margin-bottom: 2rem;">
          <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Hiring & Sourcing Analytics</h1>
          <p>Real-time metrics on candidate engagement, conversion funnels, and recruitment velocity.</p>
        </div>

        <!-- Metric KPI Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
          <div class="card" style="padding: 1.5rem;">
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Average Time to Hire</div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--primary); margin: 0.35rem 0;">16 Days</div>
            <div style="font-size: 0.8rem; color: var(--success); font-weight: 600;">↓ 4 days faster than average</div>
          </div>
          <div class="card" style="padding: 1.5rem;">
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Offer Acceptance Rate</div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--secondary); margin: 0.35rem 0;">88.2%</div>
            <div style="font-size: 0.8rem; color: var(--success); font-weight: 600;">↑ 5.1% this quarter</div>
          </div>
          <div class="card" style="padding: 1.5rem;">
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Screening Pass Rate</div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--info); margin: 0.35rem 0;">42.5%</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">AI pre-screen active</div>
          </div>
          <div class="card" style="padding: 1.5rem;">
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Candidate Satisfaction</div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--warning-text); margin: 0.35rem 0;">4.9 / 5.0</div>
            <div style="font-size: 0.8rem; color: var(--success); font-weight: 600;">Based on 140 candidate reviews</div>
          </div>
        </div>

        <!-- Hiring Funnel Breakdown -->
        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; margin-bottom: 2rem;">
          <!-- Recruitment Funnel -->
          <div class="card" style="padding: 2rem;">
            <h3 style="font-size: 1.25rem; margin-bottom: 1.5rem;">Recruitment Funnel Conversion</h3>

            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.4rem;">
                  <span>1. Applications Received</span>
                  <span>184 Candidates (100%)</span>
                </div>
                <div style="height: 12px; width: 100%; background: var(--bg-muted); border-radius: 9999px; overflow: hidden;">
                  <div style="height: 100%; width: 100%; background: var(--primary);"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.4rem;">
                  <span>2. Resume Screened & Shortlisted</span>
                  <span>78 Candidates (42%)</span>
                </div>
                <div style="height: 12px; width: 100%; background: var(--bg-muted); border-radius: 9999px; overflow: hidden;">
                  <div style="height: 100%; width: 42%; background: var(--secondary);"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.4rem;">
                  <span>3. Video Technical Interviews</span>
                  <span>32 Candidates (17%)</span>
                </div>
                <div style="height: 12px; width: 100%; background: var(--bg-muted); border-radius: 9999px; overflow: hidden;">
                  <div style="height: 100%; width: 17%; background: var(--info);"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.875rem; font-weight: 700; margin-bottom: 0.4rem;">
                  <span>4. Formal Offers Extended & Hired</span>
                  <span>14 Hires (7.6%)</span>
                </div>
                <div style="height: 12px; width: 100%; background: var(--bg-muted); border-radius: 9999px; overflow: hidden;">
                  <div style="height: 100%; width: 7.6%; background: var(--success);"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Application Sources -->
          <div class="card" style="padding: 2rem;">
            <h3 style="font-size: 1.25rem; margin-bottom: 1.5rem;">Applicant Traffic Channels</h3>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--bg-muted); border-radius: var(--radius-md);">
                <div style="font-weight: 600; font-size: 0.9rem;">JobConnect Direct Search</div>
                <span class="badge badge-primary">64%</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--bg-muted); border-radius: var(--radius-md);">
                <div style="font-weight: 600; font-size: 0.9rem;">AI Skill Match Recommendation</div>
                <span class="badge badge-secondary">22%</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--bg-muted); border-radius: var(--radius-md);">
                <div style="font-weight: 600; font-size: 0.9rem;">Direct Recruiter Outreach</div>
                <span class="badge badge-accent">14%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}

export function attachEmployerAnalyticsEvents() {}

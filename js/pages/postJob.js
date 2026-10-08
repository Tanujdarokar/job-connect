/**
 * JobConnect Post a Job Page Module
 */

import { getIcon } from '../icons.js';
import { getCurrentUser, createJob, USER_ROLES } from '../state.js';
import { renderEmployerSidebar } from '../components/sidebar.js';
import { toast } from '../toast.js';

export function renderPostJobPage() {
  const user = getCurrentUser();
  if (!user) {
    window.location.hash = '#/login';
    return '';
  }

  return `
    <div class="dashboard-layout">
      ${renderEmployerSidebar('#/employer/post-job')}
      <main class="dashboard-main">
        <div style="margin-bottom: 2rem;">
          <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Post a Tech Vacancy</h1>
          <p>Reach over 180,000+ pre-vetted engineers, product managers, and designers across India.</p>
        </div>

        <div class="card" style="padding: 2.5rem; max-width: 860px;">
          <form id="post-job-form">
            <!-- Basic Job Info -->
            <div class="form-group">
              <label class="form-label" for="job-title-input">Job Title</label>
              <input type="text" id="job-title-input" class="form-input" placeholder="e.g. Senior Frontend Engineer (React & Next.js)" required>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
              <div class="form-group">
                <label class="form-label" for="job-location-input">Location</label>
                <input type="text" id="job-location-input" class="form-input" placeholder="e.g. Ahmedabad, Gujarat or Remote" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="job-workplace-select">Workplace Type</label>
                <select id="job-workplace-select" class="form-select">
                  <option value="hybrid">Hybrid</option>
                  <option value="remote">Remote</option>
                  <option value="on-site">On-Site</option>
                </select>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
              <div class="form-group">
                <label class="form-label" for="job-type-select">Employment Type</label>
                <select id="job-type-select" class="form-select">
                  <option value="full-time">Full-Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="job-exp-select">Experience Level</label>
                <select id="job-exp-select" class="form-select">
                  <option value="junior">Junior (1-3 yrs)</option>
                  <option value="mid">Mid-Level (3-5 yrs)</option>
                  <option value="senior">Senior (5-8 yrs)</option>
                  <option value="lead">Lead / Staff (8+ yrs)</option>
                </select>
              </div>
            </div>

            <!-- Compensation -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
              <div class="form-group">
                <label class="form-label" for="job-salary-min">Min Annual CTC (INR)</label>
                <input type="number" id="job-salary-min" class="form-input" placeholder="e.g. 1800000" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="job-salary-max">Max Annual CTC (INR)</label>
                <input type="number" id="job-salary-max" class="form-input" placeholder="e.g. 2800000" required>
              </div>
            </div>

            <!-- Skills -->
            <div class="form-group">
              <label class="form-label" for="job-skills-input">Required Skills (Comma separated)</label>
              <input type="text" id="job-skills-input" class="form-input" placeholder="React, TypeScript, Next.js, Redux, Tailwind CSS" required>
            </div>

            <!-- Description -->
            <div class="form-group">
              <label class="form-label" for="job-desc-input">Job Overview & Description</label>
              <textarea id="job-desc-input" class="form-textarea" rows="4" placeholder="Describe the mission, squad structure, and key projects..." required></textarea>
            </div>

            <!-- Responsibilities -->
            <div class="form-group">
              <label class="form-label" for="job-resp-input">Key Responsibilities (One per line)</label>
              <textarea id="job-resp-input" class="form-textarea" rows="4" placeholder="Architect resilient, fast client applications with Next.js&#10;Optimize web performance ensuring 60fps experience&#10;Mentor and pair program with junior engineers"></textarea>
            </div>

            <!-- Requirements -->
            <div class="form-group">
              <label class="form-label" for="job-req-input">Requirements & Qualifications (One per line)</label>
              <textarea id="job-req-input" class="form-textarea" rows="4" placeholder="5+ years of production experience in modern React ecosystem&#10;Deep understanding of browser rendering and state patterns&#10;Bachelor's in CS or equivalent experience"></textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem;">
              <a href="#/employer/jobs" class="btn btn-secondary">Cancel</a>
              <button type="submit" class="btn btn-primary btn-lg">
                ${getIcon('check')} Publish Job Opening
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  `;
}

export function attachPostJobEvents() {
  const form = document.querySelector('#post-job-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.querySelector('#job-title-input').value.trim();
      const location = document.querySelector('#job-location-input').value.trim();
      const workplaceType = document.querySelector('#job-workplace-select').value;
      const jobType = document.querySelector('#job-type-select').value;
      const experienceLevel = document.querySelector('#job-exp-select').value;
      const salaryMin = Number(document.querySelector('#job-salary-min').value);
      const salaryMax = Number(document.querySelector('#job-salary-max').value);
      const skills = document.querySelector('#job-skills-input').value.split(',').map(s => s.trim()).filter(Boolean);
      const description = document.querySelector('#job-desc-input').value.trim();
      const responsibilities = document.querySelector('#job-resp-input').value.split('\n').map(s => s.trim()).filter(Boolean);
      const requirements = document.querySelector('#job-req-input').value.split('\n').map(s => s.trim()).filter(Boolean);

      const newJob = createJob({
        title,
        location,
        workplaceType,
        jobType,
        experienceLevel,
        salaryMin,
        salaryMax,
        skills,
        description,
        responsibilities,
        requirements,
      });

      toast.success('Job Published! 🚀', `${title} is now visible to all candidates.`);
      window.location.hash = '#/employer/jobs';
    });
  }
}

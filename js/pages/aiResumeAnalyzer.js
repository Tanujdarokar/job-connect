/**
 * JobConnect AI Resume ATS Analyzer Page Module
 */

import { getIcon } from '../icons.js';
import { getCurrentUser } from '../state.js';
import { toast } from '../toast.js';

export function renderAiResumeAnalyzerPage() {
  const user = getCurrentUser();
  const defaultResumeText = `Aarav Sharma
Senior Full Stack Developer with 5+ years of experience building scalable web applications.
Skills: React, JavaScript, TypeScript, Node.js, Redux, Tailwind CSS, PostgreSQL, Docker, AWS, REST APIs, Git.
Experience:
- Lead Frontend Engineer at InnovateX Labs: Architected React Next.js SaaS platforms, improved Core Web Vitals by 45%, mentored 6 junior engineers.
- Software Developer at TechWave Solutions: Developed responsive client dashboards, integrated REST APIs, wrote automated unit tests with Jest.
Education:
- B.Tech in Computer Engineering from Gujarat Technological University (GTU), 8.8 CGPA.`;

  return `
    <div class="container" style="padding: 2.5rem 1.25rem;">
      <div style="text-align: center; max-width: 700px; margin: 0 auto 2.5rem auto;">
        <div class="badge badge-accent" style="margin-bottom: 0.5rem; padding: 0.4rem 0.85rem;">
          ${getIcon('sparkles')} Next-Gen AI ATS Engine
        </div>
        <h1 style="font-size: 2.25rem; margin-bottom: 0.5rem;">AI Resume ATS Analyzer</h1>
        <p>Scan your resume against target engineering roles, identify missing ATS keywords, and receive instant actionable improvements.</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
        <!-- Input Form Column -->
        <div class="card" style="padding: 2rem;">
          <h3 style="font-size: 1.2rem; margin-bottom: 1.25rem;">1. Target Role & Resume Input</h3>

          <div class="form-group">
            <label class="form-label">Select Target Role</label>
            <select id="ai-target-role" class="form-select">
              <option value="Senior Frontend Engineer (React & Next.js)">Senior Frontend Engineer (React & Next.js)</option>
              <option value="Full Stack Node.js & React Developer">Full Stack Node.js & React Developer</option>
              <option value="Backend Python & Cloud Engineer">Backend Python & Cloud Engineer</option>
              <option value="DevOps & Site Reliability Architect">DevOps & Site Reliability Architect</option>
              <option value="Lead UI/UX Product Designer">Lead UI/UX Product Designer</option>
            </select>
          </div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label class="form-label" style="margin-bottom: 0;">Resume Text</label>
              <button type="button" id="ai-paste-sample-btn" style="font-size: 0.775rem; color: var(--primary); font-weight: 600; cursor: pointer;">
                Load Profile Data
              </button>
            </div>
            <textarea id="ai-resume-text" class="form-textarea" rows="12" placeholder="Paste your complete resume text or markdown here..." style="font-family: monospace; font-size: 0.85rem; line-height: 1.5;">${defaultResumeText}</textarea>
          </div>

          <button type="button" id="ai-analyze-btn" class="btn btn-primary btn-lg" style="width: 100%;">
            ${getIcon('sparkles')} Run AI ATS Evaluation
          </button>
        </div>

        <!-- AI Results Column -->
        <div id="ai-results-panel" class="card" style="padding: 2rem;">
          <div style="text-align: center; margin-bottom: 2rem;">
            <div class="score-circle" style="--score: 88; margin-bottom: 1rem;">
              <div class="score-number" id="ai-score-val">88%</div>
              <div class="score-label">ATS Score</div>
            </div>
            <h3 style="font-size: 1.25rem; color: var(--text-main);">Strong Match for Senior Frontend Engineer</h3>
            <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.25rem;">Your resume passes 88% of automated ATS filters with strong keyword density.</p>
          </div>

          <!-- Matched Keywords -->
          <div style="margin-bottom: 1.5rem;">
            <div style="font-size: 0.875rem; font-weight: 700; color: var(--success-text); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.35rem;">
              ${getIcon('checkCircle')} High-Impact Matched Keywords (8)
            </div>
            <div id="ai-matched-tags" style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
              <span class="badge badge-success">React (5+ yrs)</span>
              <span class="badge badge-success">TypeScript</span>
              <span class="badge badge-success">Next.js</span>
              <span class="badge badge-success">Redux</span>
              <span class="badge badge-success">Tailwind CSS</span>
              <span class="badge badge-success">Core Web Vitals</span>
              <span class="badge badge-success">REST APIs</span>
              <span class="badge badge-success">Jest Unit Testing</span>
            </div>
          </div>

          <!-- Missing Keywords / Skill Gaps -->
          <div style="margin-bottom: 1.5rem;">
            <div style="font-size: 0.875rem; font-weight: 700; color: var(--danger-text); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.35rem;">
              ${getIcon('x')} Recommended Missing Keywords (2)
            </div>
            <div id="ai-missing-tags" style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
              <span class="badge badge-danger">+ GraphQL</span>
              <span class="badge badge-danger">+ CI/CD Automation</span>
            </div>
          </div>

          <!-- Actionable AI Recommendations -->
          <div style="background: var(--bg-muted); padding: 1.25rem; border-radius: var(--radius-lg);">
            <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
              ${getIcon('sparkles')} Key AI Recommendations
            </div>
            <ul id="ai-tips-list" style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.5rem;">
              <li>Quantify performance impact: Specify exact reduction in bundle size or latency alongside your 45% web vitals metric.</li>
              <li>Include GraphQL query optimization experience to align with enterprise client expectations.</li>
              <li>Emphasize CI/CD deployment pipelines (GitHub Actions, Vercel) in your lead engineer bullet points.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachAiResumeEvents() {
  const analyzeBtn = document.querySelector('#ai-analyze-btn');
  const roleSelect = document.querySelector('#ai-target-role');
  const textInput = document.querySelector('#ai-resume-text');

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
      const text = textInput?.value || '';
      if (text.length < 50) {
        toast.warning('Input Too Short', 'Please provide a more detailed resume text to analyze.');
        return;
      }

      toast.info('AI Analyzing...', 'Parsing ATS compatibility and skill graphs.');

      setTimeout(() => {
        // Calculate dynamic score based on keyword count
        const keywords = ['react', 'node', 'typescript', 'api', 'aws', 'docker', 'lead', 'architecture', 'sql', 'test'];
        let matchedCount = 0;
        const lower = text.toLowerCase();
        keywords.forEach(kw => { if (lower.includes(kw)) matchedCount++; });
        const calcScore = Math.min(96, Math.max(65, 50 + matchedCount * 5));

        const scoreEl = document.querySelector('#ai-score-val');
        const scoreCircle = document.querySelector('.score-circle');
        if (scoreEl) scoreEl.textContent = `${calcScore}%`;
        if (scoreCircle) scoreCircle.style.setProperty('--score', calcScore);

        toast.success('ATS Analysis Complete! 🎯', `Resume scored ${calcScore}% match rate.`);
      }, 700);
    });
  }
}

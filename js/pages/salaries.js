/**
 * JobConnect Salary Benchmarks & Insights Page Module
 */

import { getIcon } from '../icons.js';
import { toast } from '../toast.js';

const SALARY_DATA = {
  'frontend': {
    title: 'Frontend / React Engineer',
    entry: '₹6.5L - ₹12L',
    median: '₹22.5 Lakhs / yr',
    p25: '₹14L',
    p75: '₹32L',
    topCompanies: ['CRED (₹35L - ₹50L)', 'Razorpay (₹24L - ₹36L)', 'TechCorp Innovations (₹22L - ₹28L)'],
  },
  'backend': {
    title: 'Backend Go & Python Engineer',
    entry: '₹7.5L - ₹14L',
    median: '₹24.0 Lakhs / yr',
    p25: '₹16L',
    p75: '₹36L',
    topCompanies: ['Zerodha (₹28L - ₹42L)', 'Google India (₹40L - ₹65L)', 'Swiggy (₹25L - ₹38L)'],
  },
  'fullstack': {
    title: 'Full Stack Node & React Architect',
    entry: '₹8.0L - ₹15L',
    median: '₹26.0 Lakhs / yr',
    p25: '₹18L',
    p75: '₹40L',
    topCompanies: ['Microsoft India (₹35L - ₹55L)', 'Razorpay (₹28L - ₹40L)', 'Freshworks (₹22L - ₹32L)'],
  },
  'ai_ml': {
    title: 'AI / Machine Learning Engineer (LLMs)',
    entry: '₹10.0L - ₹18L',
    median: '₹30.0 Lakhs / yr',
    p25: '₹20L',
    p75: '₹48L',
    topCompanies: ['TechCorp AI Labs (₹25L - ₹40L)', 'Google India (₹45L - ₹75L)', 'Flipkart (₹30L - ₹45L)'],
  },
  'devops': {
    title: 'DevOps & Site Reliability Architect',
    entry: '₹8.5L - ₹14L',
    median: '₹25.5 Lakhs / yr',
    p25: '₹17L',
    p75: '₹38L',
    topCompanies: ['Swiggy (₹25L - ₹38L)', 'CRED (₹32L - ₹48L)', 'Razorpay (₹26L - ₹38L)'],
  },
  'design': {
    title: 'Lead UI/UX Product Designer',
    entry: '₹7.0L - ₹12L',
    median: '₹28.0 Lakhs / yr',
    p25: '₹18L',
    p75: '₹42L',
    topCompanies: ['CRED (₹35L - ₹50L)', 'Zomato & Blinkit (₹26L - ₹38L)', 'Freshworks (₹20L - ₹30L)'],
  },
};

export function renderSalariesPage(selectedRole = 'frontend') {
  const current = SALARY_DATA[selectedRole] || SALARY_DATA['frontend'];

  return `
    <div class="container" style="padding: 2.5rem 1.25rem;">
      <div style="text-align: center; max-width: 700px; margin: 0 auto 2.5rem auto;">
        <div class="badge badge-primary" style="margin-bottom: 0.5rem; padding: 0.4rem 0.85rem;">
          ${getIcon('rupee')} Market Intelligence 2026
        </div>
        <h1 style="font-size: 2.25rem; margin-bottom: 0.5rem;">Indian Tech Salary Insights</h1>
        <p>Verified compensation benchmarks, median percentiles, and top paying tech companies across India.</p>
      </div>

      <!-- Role Selector Tabs -->
      <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2.5rem;">
        <button type="button" class="btn btn-sm ${selectedRole === 'frontend' ? 'btn-primary' : 'btn-outline'} salary-role-btn" data-role="frontend">Frontend / React</button>
        <button type="button" class="btn btn-sm ${selectedRole === 'backend' ? 'btn-primary' : 'btn-outline'} salary-role-btn" data-role="backend">Backend / Python</button>
        <button type="button" class="btn btn-sm ${selectedRole === 'fullstack' ? 'btn-primary' : 'btn-outline'} salary-role-btn" data-role="fullstack">Full Stack MERN</button>
        <button type="button" class="btn btn-sm ${selectedRole === 'ai_ml' ? 'btn-primary' : 'btn-outline'} salary-role-btn" data-role="ai_ml">AI / Machine Learning</button>
        <button type="button" class="btn btn-sm ${selectedRole === 'devops' ? 'btn-primary' : 'btn-outline'} salary-role-btn" data-role="devops">DevOps & Cloud</button>
        <button type="button" class="btn btn-sm ${selectedRole === 'design' ? 'btn-primary' : 'btn-outline'} salary-role-btn" data-role="design">UI/UX Design</button>
      </div>

      <!-- Salary Dashboard Cards -->
      <div style="display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 2rem;">
        <!-- Left: Distribution Bar & Percentiles -->
        <div class="card" style="padding: 2rem;">
          <span class="badge badge-accent" style="margin-bottom: 0.75rem;">Verified Compensation Breakdown</span>
          <h2 style="font-size: 1.75rem; margin-bottom: 0.25rem;">${current.title}</h2>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary); margin: 1rem 0;">
            ${current.median}
          </div>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 2rem;">
            Median base + variable CTC based on verified job offers and employee salary submissions across Bengaluru, Ahmedabad, Pune, and Remote.
          </p>

          <!-- Visual Distribution Percentiles -->
          <div style="margin-bottom: 2rem;">
            <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.85rem; margin-bottom: 0.5rem;">
              <span>25th Percentile (${current.p25})</span>
              <span>Median (50th)</span>
              <span>75th Percentile (${current.p75})</span>
            </div>
            <div style="height: 14px; width: 100%; background: var(--bg-muted); border-radius: 9999px; overflow: hidden; display: flex;">
              <div style="width: 25%; background: #a5b4fc;"></div>
              <div style="width: 45%; background: var(--primary);"></div>
              <div style="width: 30%; background: #4338ca;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-subtle); margin-top: 0.4rem;">
              <span>Entry Level: ${current.entry}</span>
              <span>Top 10% Senior Leads: ₹45L+</span>
            </div>
          </div>

          <a href="#/jobs?search=${encodeURIComponent(current.title.split(' ')[0])}" class="btn btn-primary">
            Explore Open ${current.title.split(' ')[0]} Jobs ${getIcon('arrowRight')}
          </a>
        </div>

        <!-- Right: Top Paying Employers -->
        <div class="card" style="padding: 2rem;">
          <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem;">Top Paying Employers</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${current.topCompanies.map((comp, idx) => `
              <div style="padding: 1rem; background: var(--bg-muted); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--primary-light); color: var(--primary); font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">
                    #${idx + 1}
                  </div>
                  <div style="font-weight: 700; font-size: 0.925rem; color: var(--text-main);">${comp.split('(')[0]}</div>
                </div>
                <span class="badge badge-success" style="font-size: 0.85rem;">${comp.split('(')[1].replace(')', '')}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachSalariesEvents() {
  document.querySelectorAll('.salary-role-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.role;
      window.location.hash = `#/salaries?role=${role}`;
    });
  });
}

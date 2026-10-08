/**
 * JobConnect Employer Candidate Talent Sourcing Page Module
 */

import { getIcon } from '../icons.js';
import { getAllUsers, USER_ROLES } from '../state.js';
import { renderEmployerSidebar } from '../components/sidebar.js';
import { openScheduleInterviewModal } from '../modal.js';
import { toast } from '../toast.js';

export function renderCandidateSearchPage(params = {}) {
  const allSeekers = getAllUsers().filter(u => u.role === USER_ROLES.JOB_SEEKER);
  const search = params.search || '';
  const skillFilter = params.skill || '';

  const filtered = allSeekers.filter((s) => {
    if (search) {
      const q = search.toLowerCase();
      const matchName = (s.name || '').toLowerCase().includes(q);
      const matchHead = (s.headline || '').toLowerCase().includes(q);
      const matchLoc = (s.location || '').toLowerCase().includes(q);
      const matchSkill = (s.skills || []).some(sk => sk.toLowerCase().includes(q));
      if (!matchName && !matchHead && !matchLoc && !matchSkill) return false;
    }
    if (skillFilter && !(s.skills || []).some(sk => sk.toLowerCase().includes(skillFilter.toLowerCase()))) {
      return false;
    }
    return true;
  });

  return `
    <div class="dashboard-layout">
      ${renderEmployerSidebar('#/employer/candidates')}
      <main class="dashboard-main">
        <div style="margin-bottom: 2rem;">
          <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Talent Sourcing Directory</h1>
          <p>Search and directly invite pre-vetted engineers, architects, and designers to apply for your vacancies.</p>
        </div>

        <!-- Search Bar -->
        <div class="card" style="padding: 1rem; margin-bottom: 2rem; box-shadow: var(--shadow-md);">
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <div class="input-icon-wrapper" style="flex: 2; min-width: 240px;">
              <span class="icon">${getIcon('search')}</span>
              <input type="text" id="candidate-search-input" class="form-input" placeholder="Search by name, skills (e.g. React, Python, AWS), or title..." value="${search}">
            </div>
            <div style="flex: 1; min-width: 160px;">
              <select id="candidate-skill-select" class="form-select">
                <option value="">All Skills</option>
                <option value="React" ${skillFilter === 'React' ? 'selected' : ''}>React</option>
                <option value="Python" ${skillFilter === 'Python' ? 'selected' : ''}>Python</option>
                <option value="Node.js" ${skillFilter === 'Node.js' ? 'selected' : ''}>Node.js</option>
                <option value="Kubernetes" ${skillFilter === 'Kubernetes' ? 'selected' : ''}>Kubernetes</option>
                <option value="Figma" ${skillFilter === 'Figma' ? 'selected' : ''}>Figma</option>
              </select>
            </div>
            <button type="button" id="candidate-search-btn" class="btn btn-primary">
              ${getIcon('search')} Search
            </button>
          </div>
        </div>

        <!-- Candidates Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem;">
          ${filtered.map(cand => `
            <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between; padding: 1.75rem;">
              <div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                  <img src="${cand.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary-light);" alt="${cand.name}">
                  <div>
                    <h3 style="font-size: 1.15rem; color: var(--text-main);">${cand.name}</h3>
                    <div style="font-size: 0.825rem; color: var(--text-muted);">${cand.location || 'India'}</div>
                    <span class="badge badge-success" style="margin-top: 0.25rem;">${cand.profileCompletion || 85}% Profile Strength</span>
                  </div>
                </div>

                <div style="font-weight: 600; font-size: 0.9rem; color: var(--primary); margin-bottom: 0.75rem;">
                  ${cand.headline || 'Full Stack Engineer'}
                </div>

                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;">
                  ${(cand.skills || []).map(sk => `<span class="badge badge-muted">${sk}</span>`).join('')}
                </div>
              </div>

              <div style="display: flex; gap: 0.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color); margin-top: auto;">
                <a href="#/seeker/chat" class="btn btn-outline btn-sm" style="flex: 1;">
                  ${getIcon('messageSquare')} Message
                </a>
                <button type="button" class="btn btn-primary btn-sm direct-invite-btn" data-name="${cand.name}" style="flex: 1.2;">
                  ${getIcon('send')} Invite to Apply
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </main>
    </div>
  `;
}

export function attachCandidateSearchEvents() {
  const searchInput = document.querySelector('#candidate-search-input');
  const skillSelect = document.querySelector('#candidate-skill-select');
  const searchBtn = document.querySelector('#candidate-search-btn');

  const execute = () => {
    const q = searchInput?.value.trim() || '';
    const sk = skillSelect?.value || '';
    const params = new URLSearchParams();
    if (q) params.set('search', q);
    if (sk) params.set('skill', sk);
    window.location.hash = `#/employer/candidates?${params.toString()}`;
  };

  if (searchBtn) searchBtn.addEventListener('click', execute);
  if (searchInput) searchInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') execute(); });
  if (skillSelect) skillSelect.addEventListener('change', execute);

  document.querySelectorAll('.direct-invite-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      toast.success('Invitation Dispatched! ✉️', `Invited ${name} to apply for your open roles.`);
    });
  });
}

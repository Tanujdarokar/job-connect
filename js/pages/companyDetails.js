/**
 * JobConnect Company Profile & Reviews Page Module
 */

import { getIcon } from '../icons.js';
import { getCompanyById, getJobs, getReviews } from '../state.js';
import { renderJobCard, attachJobCardEvents } from '../components/jobCard.js';
import { openAddReviewModal } from '../modal.js';

export function renderCompanyDetailsPage(companyId) {
  const company = getCompanyById(companyId);
  if (!company) {
    return `
      <div class="container" style="padding: 4rem 1.25rem; text-align: center;">
        <h2>Company Not Found</h2>
        <a href="#/companies" class="btn btn-primary" style="margin-top: 1rem;">Back to Directory</a>
      </div>
    `;
  }

  const openJobs = getJobs().filter(j => j.companyId === company.id);
  const reviews = getReviews(company.id);

  return `
    <div class="container" style="padding: 2.5rem 1.25rem;">
      <!-- Banner Image -->
      <div style="height: 240px; border-radius: var(--radius-xl); overflow: hidden; position: relative; margin-bottom: -50px; box-shadow: var(--shadow-md);">
        <img src="${company.banner}" style="width: 100%; height: 100%; object-fit: cover;" alt="${company.name}">
      </div>

      <!-- Header Profile Card -->
      <div class="card" style="position: relative; z-index: 10; padding: 2rem; margin-bottom: 2rem; box-shadow: var(--shadow-lg);">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1.5rem;">
          <div style="display: flex; gap: 1.5rem; align-items: flex-end;">
            <img src="${company.logo}" style="width: 90px; height: 90px; border-radius: var(--radius-lg); object-fit: cover; border: 3px solid var(--bg-card); box-shadow: var(--shadow-md); background: var(--bg-card);" alt="${company.name}">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <h1 style="font-size: 1.85rem;">${company.name}</h1>
                <span class="badge badge-success">${getIcon('checkCircle')} Verified</span>
              </div>
              <p style="font-size: 0.95rem; color: var(--text-muted);">${company.tagline}</p>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem;">
            <button type="button" id="write-review-btn" class="btn btn-outline">
              ${getIcon('star')} Write Employee Review
            </button>
            <a href="${company.website}" target="_blank" rel="noreferrer" class="btn btn-primary">
              ${getIcon('globe')} Official Website
            </a>
          </div>
        </div>

        <!-- Meta Details -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); font-size: 0.85rem;">
          <div>
            <div style="color: var(--text-muted);">Industry</div>
            <div style="font-weight: 700; color: var(--text-main); margin-top: 2px;">${company.industry}</div>
          </div>
          <div>
            <div style="color: var(--text-muted);">Headquarters</div>
            <div style="font-weight: 700; color: var(--text-main); margin-top: 2px;">${company.location}</div>
          </div>
          <div>
            <div style="color: var(--text-muted);">Company Size</div>
            <div style="font-weight: 700; color: var(--text-main); margin-top: 2px;">${company.size}</div>
          </div>
          <div>
            <div style="color: var(--text-muted);">Founded Year</div>
            <div style="font-weight: 700; color: var(--text-main); margin-top: 2px;">${company.founded || 2015}</div>
          </div>
          <div>
            <div style="color: var(--text-muted);">Overall Rating</div>
            <div style="font-weight: 700; color: var(--warning-text); margin-top: 2px; display: flex; align-items: center; gap: 4px;">
              ${getIcon('star')} ${company.rating} (${company.reviewCount} reviews)
            </div>
          </div>
        </div>
      </div>

      <!-- Main Layout: Details & Open Roles -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <!-- Left Column -->
        <div>
          <!-- About -->
          <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1rem;">About ${company.name}</h3>
            <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 1.5rem;">
              ${company.description}
            </p>

            <h4 style="margin-top: 1.5rem; margin-bottom: 0.75rem;">Company Perks & Culture</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.9rem; color: var(--text-muted);">
              ${(company.benefits || ['Comprehensive Health Insurance', 'Remote-First Flexibility', 'Stock Options (ESOPs)', 'Annual Learning Stipend']).map(b => `
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span style="color: var(--success);">${getIcon('checkCircle')}</span> ${b}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Open Positions at this Company -->
          <div style="margin-bottom: 2.5rem;">
            <h3 style="font-size: 1.35rem; margin-bottom: 1rem;">Open Roles (${openJobs.length})</h3>
            <div class="jobs-grid">
              ${openJobs.length > 0 ? openJobs.map(job => renderJobCard(job)).join('') : `
                <div class="card" style="padding: 2rem; text-align: center; color: var(--text-muted);">
                  No open positions currently listed for ${company.name}.
                </div>
              `}
            </div>
          </div>

          <!-- Employee Reviews List -->
          <div class="card" style="padding: 2rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
              <h3>Verified Employee Reviews (${reviews.length})</h3>
              <button type="button" id="write-review-inline-btn" class="btn btn-sm btn-outline">
                ${getIcon('plus')} Add Review
              </button>
            </div>

            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
              ${reviews.length > 0 ? reviews.map(rev => `
                <div style="padding: 1.25rem; background: var(--bg-muted); border-radius: var(--radius-lg);">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                    <div style="font-weight: 700; font-size: 0.95rem;">${rev.title}</div>
                    <div style="color: var(--warning-text); font-weight: 700; font-size: 0.85rem;">
                      ${'⭐'.repeat(Math.round(rev.rating))}
                    </div>
                  </div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">
                    ${rev.role || 'Employee'} • ${new Date(rev.createdAt).toLocaleDateString()}
                  </div>
                  <div style="font-size: 0.875rem; margin-bottom: 0.5rem;">
                    <strong style="color: var(--success-text);">Pros:</strong> ${rev.pros}
                  </div>
                  <div style="font-size: 0.875rem;">
                    <strong style="color: var(--danger-text);">Cons:</strong> ${rev.cons}
                  </div>
                </div>
              `).join('') : '<div style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Be the first employee to share workplace insights!</div>'}
            </div>
          </div>
        </div>

        <!-- Right Column Quick Facts -->
        <div>
          <div class="card" style="padding: 1.5rem; position: sticky; top: 90px;">
            <h4 style="margin-bottom: 1rem;">Why Work at ${company.name}?</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.875rem; color: var(--text-muted);">
              <li style="display: flex; gap: 0.5rem;">
                <span style="color: var(--primary);">${getIcon('award')}</span> Top 5% Rated Tech Culture
              </li>
              <li style="display: flex; gap: 0.5rem;">
                <span style="color: var(--primary);">${getIcon('trendingUp')}</span> Fast-track leadership progression
              </li>
              <li style="display: flex; gap: 0.5rem;">
                <span style="color: var(--primary);">${getIcon('users')}</span> Collaborative cross-functional squads
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachCompanyDetailsEvents(companyId) {
  attachJobCardEvents();

  const company = getCompanyById(companyId);
  if (!company) return;

  const handleReview = () => {
    openAddReviewModal(company, () => {
      window.location.reload();
    });
  };

  document.querySelector('#write-review-btn')?.addEventListener('click', handleReview);
  document.querySelector('#write-review-inline-btn')?.addEventListener('click', handleReview);
}

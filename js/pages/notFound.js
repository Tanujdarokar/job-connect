/**
 * JobConnect 404 Not Found Page Module
 */

import { getIcon } from '../icons.js';

export function renderNotFoundPage() {
  return `
    <div class="container" style="padding: 6rem 1.25rem; text-align: center;">
      <div style="font-size: 5rem; font-weight: 800; color: var(--primary); margin-bottom: 0.5rem;">404</div>
      <h1 style="font-size: 2rem; margin-bottom: 0.75rem;">Page Not Found</h1>
      <p style="font-size: 1rem; color: var(--text-muted); max-width: 480px; margin: 0 auto 2rem auto;">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div style="display: flex; justify-content: center; gap: 1rem;">
        <a href="#/" class="btn btn-primary">
          ${getIcon('arrowLeft')} Return to Homepage
        </a>
        <a href="#/jobs" class="btn btn-outline">
          ${getIcon('search')} Browse Jobs
        </a>
      </div>
    </div>
  `;
}

export function attachNotFoundEvents() {}

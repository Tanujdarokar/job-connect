/**
 * JobConnect Notifications Center Page Module
 */

import { getIcon } from '../icons.js';
import { getCurrentUser, getNotifications, markAllNotificationsRead, clearAllNotifications, markNotificationRead } from '../state.js';
import { renderSeekerSidebar } from '../components/sidebar.js';
import { toast } from '../toast.js';

export function renderNotificationsPage() {
  const user = getCurrentUser();
  if (!user) {
    window.location.hash = '#/login';
    return '';
  }

  const notifications = getNotifications();

  return `
    <div class="dashboard-layout">
      ${renderSeekerSidebar('#/seeker/notifications')}
      <main class="dashboard-main">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Notification Center</h1>
            <p>Stay informed about application progress, interview schedules, and new job matches.</p>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <button type="button" id="mark-all-read-btn" class="btn btn-outline btn-sm">
              ${getIcon('check')} Mark All as Read
            </button>
            <button type="button" id="clear-all-notif-btn" class="btn btn-secondary btn-sm">
              ${getIcon('trash')} Clear All
            </button>
          </div>
        </div>

        <!-- Notifications List -->
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${notifications.length > 0 ? notifications.map(n => `
            <div class="card notif-card" data-id="${n.id}" data-link="${n.link || '#/'}" style="padding: 1.25rem; display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; cursor: pointer; background: ${n.read ? 'var(--bg-card)' : 'var(--primary-light)'}; border-left: ${n.read ? '1px solid var(--border-color)' : '4px solid var(--primary)'};">
              <div style="display: flex; gap: 1rem; align-items: flex-start;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--bg-card); display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 1.1rem; flex-shrink: 0; box-shadow: var(--shadow-sm);">
                  ${n.type === 'interview' ? getIcon('video') : n.type === 'application' ? getIcon('fileText') : getIcon('sparkles')}
                </div>
                <div>
                  <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main);">${n.title}</div>
                  <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem; line-height: 1.5;">${n.message}</div>
                  <div style="font-size: 0.75rem; color: var(--text-subtle); margin-top: 0.5rem;">${new Date(n.createdAt).toLocaleDateString()} at ${new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                ${!n.read ? `<span class="badge badge-primary">New</span>` : ''}
              </div>
            </div>
          `).join('') : `
            <div class="card" style="text-align: center; padding: 4rem 2rem;">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--bg-muted); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: var(--text-muted);">
                ${getIcon('bell')}
              </div>
              <h3 style="margin-bottom: 0.5rem;">You’re all caught up!</h3>
              <p>No new notifications at this time.</p>
            </div>
          `}
        </div>
      </main>
    </div>
  `;
}

export function attachNotificationsEvents() {
  document.querySelectorAll('.notif-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      const link = card.dataset.link;
      markNotificationRead(id);
      if (link) window.location.hash = link;
    });
  });

  const markAllBtn = document.querySelector('#mark-all-read-btn');
  if (markAllBtn) {
    markAllBtn.addEventListener('click', () => {
      markAllNotificationsRead();
      toast.success('All Read', 'Marked all notifications as read.');
      window.location.reload();
    });
  }

  const clearAllBtn = document.querySelector('#clear-all-notif-btn');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      clearAllNotifications();
      toast.info('Notifications Cleared', 'Removed all notifications.');
      window.location.reload();
    });
  }
}

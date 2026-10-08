/**
 * JobConnect Dynamic Navigation Bar Component
 */

import { getIcon } from '../icons.js';
import { getCurrentUser, logout, getTheme, setTheme, getLanguage, setLanguage, getUnreadNotificationCount, getNotifications, markNotificationRead, USER_ROLES } from '../state.js';
import { t } from '../i18n.js';
import { toast } from '../toast.js';

export function renderNavbar() {
  const user = getCurrentUser();
  const currentTheme = getTheme();
  const currentLang = getLanguage();
  const unreadCount = getUnreadNotificationCount();
  const notifications = getNotifications().slice(0, 5);
  const hash = window.location.hash || '#/';

  // Role indicator badge & dashboard link
  let roleBadge = '';
  let dashboardRoute = '#/seeker/dashboard';
  if (user) {
    if (user.role === USER_ROLES.JOB_SEEKER) {
      roleBadge = `<span class="badge badge-primary" style="font-size: 0.725rem;">Candidate</span>`;
      dashboardRoute = '#/seeker/dashboard';
    } else if (user.role === USER_ROLES.EMPLOYER) {
      roleBadge = `<span class="badge badge-secondary" style="font-size: 0.725rem;">Employer</span>`;
      dashboardRoute = '#/employer/dashboard';
    } else if (user.role === USER_ROLES.ADMIN) {
      roleBadge = `<span class="badge badge-warning" style="font-size: 0.725rem;">Admin</span>`;
      dashboardRoute = '#/admin/dashboard';
    }
  }

  return `
    <header class="site-header">
      <div class="container nav-container">
        <!-- Logo -->
        <a href="#/" class="nav-logo">
          <div class="nav-logo-icon">
            ${getIcon('sparkles')}
          </div>
          <span>Job<span style="color: var(--primary);">Connect</span></span>
        </a>

        <!-- Desktop Navigation Links -->
        <ul class="nav-links">
          <li><a href="#/jobs" class="nav-link ${hash.startsWith('#/jobs') ? 'active' : ''}">${t('nav.findJobs')}</a></li>
          <li><a href="#/companies" class="nav-link ${hash.startsWith('#/companies') ? 'active' : ''}">${t('nav.companies')}</a></li>
          <li><a href="#/salaries" class="nav-link ${hash.startsWith('#/salaries') ? 'active' : ''}">${t('nav.salaries')}</a></li>
          <li><a href="#/ai-tools/resume" class="nav-link ${hash.startsWith('#/ai-tools') ? 'active' : ''}">${t('nav.aiTools')}</a></li>
          ${user ? `<li><a href="${dashboardRoute}" class="nav-link ${hash.includes('/dashboard') ? 'active' : ''}">${t('nav.dashboard')}</a></li>` : ''}
        </ul>

        <!-- Right Side Controls -->
        <div class="nav-actions">
          <!-- Language Selector -->
          <div style="position: relative;">
            <select id="lang-select" class="form-select" style="padding: 0.35rem 0.6rem; font-size: 0.8rem; font-weight: 600; border-radius: var(--radius-md); width: auto; background-color: var(--bg-card); cursor: pointer;" aria-label="Select Language">
              <option value="en" ${currentLang === 'en' ? 'selected' : ''}>🇬🇧 EN</option>
              <option value="hi" ${currentLang === 'hi' ? 'selected' : ''}>🇮🇳 हिन्दी</option>
              <option value="gu" ${currentLang === 'gu' ? 'selected' : ''}>🇮🇳 ગુજરાતી</option>
            </select>
          </div>

          <!-- Theme Toggle -->
          <button type="button" id="theme-toggle-btn" class="btn-icon" aria-label="Toggle Theme" title="Toggle Theme">
            ${currentTheme === 'dark' ? getIcon('sun') : getIcon('moon')}
          </button>

          ${user ? `
            <!-- Notifications Dropdown -->
            <div class="user-menu-wrapper">
              <button type="button" id="notif-btn" class="btn-icon" style="position: relative;" aria-label="Notifications" title="Notifications">
                ${getIcon('bell')}
                ${unreadCount > 0 ? `<span style="position: absolute; top: -4px; right: -4px; width: 18px; height: 18px; background: var(--danger); color: #fff; font-size: 0.68rem; font-weight: 700; border-radius: 50%; display: flex; align-items: center; justify-content: center;">${unreadCount}</span>` : ''}
              </button>
              <div id="notif-dropdown" class="dropdown-menu" style="width: 320px; padding: 0.75rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); margin-bottom: 0.5rem;">
                  <span style="font-weight: 700; font-size: 0.875rem;">Notifications</span>
                  <a href="#/seeker/notifications" style="font-size: 0.775rem; color: var(--primary);">View All</a>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 260px; overflow-y: auto;">
                  ${notifications.length > 0 ? notifications.map(n => `
                    <div class="dropdown-item notif-item" data-id="${n.id}" data-link="${n.link || '#/'}" style="display: block; padding: 0.5rem; border-radius: 6px; background: ${n.read ? 'transparent' : 'var(--primary-light)'};">
                      <div style="font-weight: 700; font-size: 0.825rem;">${n.title}</div>
                      <div style="font-size: 0.775rem; color: var(--text-muted); margin-top: 2px;">${n.message}</div>
                    </div>
                  `).join('') : '<div style="text-align: center; padding: 1rem; font-size: 0.825rem; color: var(--text-muted);">No new notifications</div>'}
                </div>
              </div>
            </div>

            <!-- User Menu Dropdown -->
            <div class="user-menu-wrapper">
              <button type="button" id="user-menu-btn" class="user-avatar-btn">
                ${user.avatar ? `<img src="${user.avatar}" class="avatar-img" alt="${user.name}">` : `<div class="avatar-initials">${user.name ? user.name.charAt(0) : 'U'}</div>`}
                <span style="font-weight: 600; font-size: 0.875rem; max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${user.name || 'Account'}</span>
                ${roleBadge}
              </button>
              <div id="user-dropdown" class="dropdown-menu">
                <div style="padding: 0.5rem 0.85rem; border-bottom: 1px solid var(--border-color); margin-bottom: 0.35rem;">
                  <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-main);">${user.name}</div>
                  <div style="font-size: 0.775rem; color: var(--text-muted);">${user.email}</div>
                </div>
                <a href="${dashboardRoute}" class="dropdown-item">
                  ${getIcon('pieChart')} Dashboard
                </a>
                ${user.role === USER_ROLES.JOB_SEEKER ? `
                  <a href="#/seeker/profile" class="dropdown-item">${getIcon('user')} My Profile</a>
                  <a href="#/seeker/applications" class="dropdown-item">${getIcon('fileText')} Applications</a>
                  <a href="#/seeker/saved-jobs" class="dropdown-item">${getIcon('bookmark')} Saved Jobs</a>
                  <a href="#/seeker/interviews" class="dropdown-item">${getIcon('video')} Interviews</a>
                  <a href="#/seeker/chat" class="dropdown-item">${getIcon('messageSquare')} Messages</a>
                ` : ''}
                ${user.role === USER_ROLES.EMPLOYER ? `
                  <a href="#/employer/jobs" class="dropdown-item">${getIcon('briefcase')} Manage Jobs</a>
                  <a href="#/employer/post-job" class="dropdown-item">${getIcon('plus')} Post New Job</a>
                  <a href="#/employer/candidates" class="dropdown-item">${getIcon('users')} Talent Search</a>
                  <a href="#/employer/analytics" class="dropdown-item">${getIcon('trendingUp')} Hiring Analytics</a>
                ` : ''}
                ${user.role === USER_ROLES.ADMIN ? `
                  <a href="#/admin/dashboard" class="dropdown-item">${getIcon('shield')} Platform Control</a>
                ` : ''}
                <div class="dropdown-divider"></div>
                <button type="button" id="logout-btn" class="dropdown-item" style="width: 100%; color: var(--danger); text-align: left;">
                  ${getIcon('logOut')} ${t('nav.logout')}
                </button>
              </div>
            </div>
          ` : `
            <a href="#/login" class="btn btn-outline btn-sm">${t('nav.login')}</a>
            <a href="#/signup" class="btn btn-primary btn-sm">${t('nav.signup')}</a>
          `}

          <!-- Mobile Toggle -->
          <button type="button" id="mobile-menu-btn" class="btn-icon mobile-nav-toggle" aria-label="Toggle Menu">
            ${getIcon('menu')}
          </button>
        </div>
      </div>

      <!-- Mobile Menu Drawer -->
      <div id="mobile-drawer" class="mobile-menu-drawer">
        <a href="#/jobs" class="dropdown-item">${t('nav.findJobs')}</a>
        <a href="#/companies" class="dropdown-item">${t('nav.companies')}</a>
        <a href="#/salaries" class="dropdown-item">${t('nav.salaries')}</a>
        <a href="#/ai-tools/resume" class="dropdown-item">${t('nav.aiTools')}</a>
        ${user ? `
          <a href="${dashboardRoute}" class="dropdown-item">${t('nav.dashboard')}</a>
          <button type="button" id="mobile-logout-btn" class="dropdown-item" style="color: var(--danger); text-align: left; width: 100%;">
            ${getIcon('logOut')} ${t('nav.logout')}
          </button>
        ` : `
          <a href="#/login" class="btn btn-outline" style="width: 100%;">${t('nav.login')}</a>
          <a href="#/signup" class="btn btn-primary" style="width: 100%;">${t('nav.signup')}</a>
        `}
      </div>
    </header>
  `;
}

export function attachNavbarEvents() {
  // Theme switch
  const themeBtn = document.querySelector('#theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = getTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  // Language switch
  const langSelect = document.querySelector('#lang-select');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }

  // User Dropdown toggle
  const userBtn = document.querySelector('#user-menu-btn');
  const userDropdown = document.querySelector('#user-dropdown');
  if (userBtn && userDropdown) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('show');
      const notifDropdown = document.querySelector('#notif-dropdown');
      if (notifDropdown) notifDropdown.classList.remove('show');
    });
  }

  // Notification Dropdown toggle
  const notifBtn = document.querySelector('#notif-btn');
  const notifDropdown = document.querySelector('#notif-dropdown');
  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('show');
      if (userDropdown) userDropdown.classList.remove('show');
    });
  }

  // Click on notification item
  document.querySelectorAll('.notif-item').forEach((item) => {
    item.addEventListener('click', () => {
      const id = item.dataset.id;
      const link = item.dataset.link;
      markNotificationRead(id);
      if (link) window.location.hash = link;
    });
  });

  // Mobile Drawer toggle
  const mobileBtn = document.querySelector('#mobile-menu-btn');
  const mobileDrawer = document.querySelector('#mobile-drawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('show');
    });
  }

  // Logout buttons
  const logoutBtn = document.querySelector('#logout-btn');
  const mobileLogoutBtn = document.querySelector('#mobile-logout-btn');
  const handleLogout = () => {
    logout();
    toast.info('Logged Out', 'You have been signed out safely.');
    window.location.hash = '#/';
  };
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
  if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleLogout);

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    if (userDropdown) userDropdown.classList.remove('show');
    if (notifDropdown) notifDropdown.classList.remove('show');
  });
}

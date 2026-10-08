/**
 * JobConnect Vanilla Toast Alert System
 */

import { getIcon } from './icons.js';

let container = null;

function ensureContainer() {
  if (!container) {
    container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
  }
}

export function showToast({ title, message, type = 'success', duration = 3500 }) {
  ensureContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconName = 'checkCircle';
  let iconColor = 'var(--success)';
  if (type === 'error') {
    iconName = 'x';
    iconColor = 'var(--danger)';
  } else if (type === 'warning') {
    iconName = 'shield';
    iconColor = 'var(--warning)';
  } else if (type === 'info') {
    iconName = 'bell';
    iconColor = 'var(--info)';
  }

  toast.innerHTML = `
    <div class="toast-icon" style="color: ${iconColor};">
      ${getIcon(iconName)}
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-leave');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

export const toast = {
  success: (title, message) => showToast({ title, message, type: 'success' }),
  error: (title, message) => showToast({ title, message, type: 'error' }),
  warning: (title, message) => showToast({ title, message, type: 'warning' }),
  info: (title, message) => showToast({ title, message, type: 'info' }),
};

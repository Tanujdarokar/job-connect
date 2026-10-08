/**
 * JobConnect Auth Pages Module (Login, Signup, Forgot Password, OTP Verification)
 */

import { getIcon } from '../icons.js';
import { login, loginWithDemo, signup, USER_ROLES } from '../state.js';
import { t } from '../i18n.js';
import { toast } from '../toast.js';

export function renderLoginPage() {
  return `
    <div class="container container-narrow" style="padding: 3rem 1.25rem;">
      <div class="card" style="max-width: 520px; margin: 0 auto; padding: 2.5rem; box-shadow: var(--shadow-xl);">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div class="nav-logo-icon" style="margin: 0 auto 1rem auto; width: 44px; height: 44px;">
            ${getIcon('sparkles')}
          </div>
          <h2 style="font-size: 1.75rem; margin-bottom: 0.35rem;">${t('auth.welcomeBack')}</h2>
          <p style="font-size: 0.9rem;">${t('auth.loginSubtitle')}</p>
        </div>

        <!-- Quick Demo Accounts -->
        <div style="background: var(--bg-muted); border: 1px dashed var(--border-color); border-radius: var(--radius-lg); padding: 1rem; margin-bottom: 1.75rem;">
          <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.65rem;">
            ${t('auth.demoFillHeader')}
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
            <button type="button" class="btn btn-outline btn-sm demo-login-btn" data-role="${USER_ROLES.JOB_SEEKER}" style="font-size: 0.75rem;">
              👤 Seeker
            </button>
            <button type="button" class="btn btn-outline btn-sm demo-login-btn" data-role="${USER_ROLES.EMPLOYER}" style="font-size: 0.75rem;">
              💼 Employer
            </button>
            <button type="button" class="btn btn-outline btn-sm demo-login-btn" data-role="${USER_ROLES.ADMIN}" style="font-size: 0.75rem;">
              🛡️ Admin
            </button>
          </div>
        </div>

        <!-- Standard Login Form -->
        <form id="login-form">
          <div class="form-group">
            <label class="form-label" for="login-email">${t('auth.emailLabel')}</label>
            <div class="input-icon-wrapper">
              <span class="icon">${getIcon('mail')}</span>
              <input type="email" id="login-email" class="form-input" placeholder="you@example.com" value="seeker@jobconnect.demo" required>
            </div>
          </div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <label class="form-label" for="login-password" style="margin-bottom: 0;">${t('auth.passwordLabel')}</label>
              <a href="#/forgot-password" style="font-size: 0.825rem; font-weight: 600;">${t('auth.forgotPassword')}</a>
            </div>
            <div class="input-icon-wrapper">
              <span class="icon">${getIcon('shield')}</span>
              <input type="password" id="login-password" class="form-input" placeholder="••••••••" value="password123" required>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; font-size: 0.875rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
              <input type="checkbox" checked>
              <span>${t('auth.rememberMe')}</span>
            </label>
            <a href="#/verify-otp" style="font-size: 0.825rem; font-weight: 600;">Sign in with OTP</a>
          </div>

          <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-bottom: 1.25rem;">
            ${t('auth.signInBtn')}
          </button>
        </form>

        <div style="text-align: center; font-size: 0.875rem; color: var(--text-muted);">
          ${t('auth.noAccount')} <a href="#/signup" style="font-weight: 700;">${t('auth.createAccount')}</a>
        </div>
      </div>
    </div>
  `;
}

export function attachLoginEvents() {
  // Demo Login buttons
  document.querySelectorAll('.demo-login-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.role;
      const user = loginWithDemo(role);
      if (user) {
        toast.success(`Welcome, ${user.name}! 👋`, `Signed in as ${user.role.toUpperCase()}.`);
        if (user.role === USER_ROLES.JOB_SEEKER) window.location.hash = '#/seeker/dashboard';
        else if (user.role === USER_ROLES.EMPLOYER) window.location.hash = '#/employer/dashboard';
        else if (user.role === USER_ROLES.ADMIN) window.location.hash = '#/admin/dashboard';
      }
    });
  });

  // Standard Form Submit
  const form = document.querySelector('#login-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.querySelector('#login-email').value.trim();
      const password = document.querySelector('#login-password').value;

      const res = login(email, password);
      if (res.success) {
        toast.success(`Welcome back, ${res.user.name}! 👋`, 'Successfully signed in.');
        if (res.user.role === USER_ROLES.JOB_SEEKER) window.location.hash = '#/seeker/dashboard';
        else if (res.user.role === USER_ROLES.EMPLOYER) window.location.hash = '#/employer/dashboard';
        else window.location.hash = '#/admin/dashboard';
      } else {
        toast.error('Authentication Failed', res.message);
      }
    });
  }
}

export function renderSignupPage() {
  return `
    <div class="container container-narrow" style="padding: 3rem 1.25rem;">
      <div class="card" style="max-width: 560px; margin: 0 auto; padding: 2.5rem; box-shadow: var(--shadow-xl);">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div class="nav-logo-icon" style="margin: 0 auto 1rem auto; width: 44px; height: 44px;">
            ${getIcon('sparkles')}
          </div>
          <h2 style="font-size: 1.75rem; margin-bottom: 0.35rem;">Create Your Account</h2>
          <p style="font-size: 0.9rem;">Join thousands of job seekers and visionary tech employers.</p>
        </div>

        <!-- Role Selector Switch -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; background: var(--bg-muted); padding: 0.35rem; border-radius: var(--radius-lg); margin-bottom: 1.75rem;">
          <button type="button" id="role-seeker-btn" class="btn btn-sm btn-primary role-tab active" data-role="${USER_ROLES.JOB_SEEKER}">
            👤 Job Seeker
          </button>
          <button type="button" id="role-employer-btn" class="btn btn-sm btn-outline role-tab" data-role="${USER_ROLES.EMPLOYER}">
            💼 Employer / Recruiter
          </button>
        </div>

        <form id="signup-form">
          <input type="hidden" id="signup-role" value="${USER_ROLES.JOB_SEEKER}">

          <div class="form-group">
            <label class="form-label" for="signup-name">Full Name</label>
            <div class="input-icon-wrapper">
              <span class="icon">${getIcon('user')}</span>
              <input type="text" id="signup-name" class="form-input" placeholder="Aarav Sharma" required>
            </div>
          </div>

          <div id="company-field-group" class="form-group" style="display: none;">
            <label class="form-label" for="signup-company">Company Name</label>
            <div class="input-icon-wrapper">
              <span class="icon">${getIcon('building')}</span>
              <input type="text" id="signup-company" class="form-input" placeholder="TechCorp Innovations">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="signup-email">Work / Personal Email</label>
            <div class="input-icon-wrapper">
              <span class="icon">${getIcon('mail')}</span>
              <input type="email" id="signup-email" class="form-input" placeholder="aarav@example.com" required>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="signup-password">Password</label>
            <div class="input-icon-wrapper">
              <span class="icon">${getIcon('shield')}</span>
              <input type="password" id="signup-password" class="form-input" placeholder="At least 8 characters" minlength="6" required>
            </div>
          </div>

          <div class="form-group">
            <label style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.85rem; cursor: pointer;">
              <input type="checkbox" required style="margin-top: 3px;">
              <span style="color: var(--text-muted);">I agree to the <a href="#/" style="font-weight: 600;">Terms of Service</a> and <a href="#/" style="font-weight: 600;">Privacy Policy</a>.</span>
            </label>
          </div>

          <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-bottom: 1.25rem;">
            Create Free Account ${getIcon('arrowRight')}
          </button>
        </form>

        <div style="text-align: center; font-size: 0.875rem; color: var(--text-muted);">
          Already have an account? <a href="#/login" style="font-weight: 700;">Sign in here</a>
        </div>
      </div>
    </div>
  `;
}

export function attachSignupEvents() {
  const roleTabs = document.querySelectorAll('.role-tab');
  const roleInput = document.querySelector('#signup-role');
  const companyGroup = document.querySelector('#company-field-group');
  const companyInput = document.querySelector('#signup-company');

  roleTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      roleTabs.forEach((t) => {
        t.classList.remove('btn-primary', 'active');
        t.classList.add('btn-outline');
      });
      tab.classList.add('btn-primary', 'active');
      tab.classList.remove('btn-outline');

      const role = tab.dataset.role;
      roleInput.value = role;

      if (role === USER_ROLES.EMPLOYER) {
        companyGroup.style.display = 'block';
        companyInput.setAttribute('required', 'true');
      } else {
        companyGroup.style.display = 'none';
        companyInput.removeAttribute('required');
      }
    });
  });

  const form = document.querySelector('#signup-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.querySelector('#signup-name').value.trim();
      const email = document.querySelector('#signup-email').value.trim();
      const password = document.querySelector('#signup-password').value;
      const role = roleInput.value;
      const companyName = companyInput.value.trim();

      const res = signup({ name, email, password, role, companyName });
      if (res.success) {
        toast.success(`Account Created! 🎉`, `Welcome to JobConnect, ${name}.`);
        if (role === USER_ROLES.EMPLOYER) window.location.hash = '#/employer/dashboard';
        else window.location.hash = '#/seeker/dashboard';
      } else {
        toast.error('Signup Error', res.message);
      }
    });
  }
}

export function renderForgotPasswordPage() {
  return `
    <div class="container container-narrow" style="padding: 3rem 1.25rem;">
      <div class="card" style="max-width: 480px; margin: 0 auto; padding: 2.5rem; box-shadow: var(--shadow-xl);">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div class="nav-logo-icon" style="margin: 0 auto 1rem auto; width: 44px; height: 44px;">
            ${getIcon('sparkles')}
          </div>
          <h2 style="font-size: 1.75rem; margin-bottom: 0.35rem;">Reset Password</h2>
          <p style="font-size: 0.9rem;">Enter your email to receive password reset instructions.</p>
        </div>

        <form id="forgot-form">
          <div class="form-group">
            <label class="form-label" for="forgot-email">Email Address</label>
            <div class="input-icon-wrapper">
              <span class="icon">${getIcon('mail')}</span>
              <input type="email" id="forgot-email" class="form-input" placeholder="you@example.com" required>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-bottom: 1.25rem;">
            Send Reset Instructions ${getIcon('send')}
          </button>
        </form>

        <div style="text-align: center; font-size: 0.875rem;">
          <a href="#/login" style="font-weight: 600; display: inline-flex; align-items: center; gap: 0.35rem;">
            ${getIcon('arrowLeft')} Back to Sign In
          </a>
        </div>
      </div>
    </div>
  `;
}

export function attachForgotEvents() {
  const form = document.querySelector('#forgot-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      toast.success('Reset Link Sent! ✉️', 'Check your email inbox for password recovery steps.');
      setTimeout(() => {
        window.location.hash = '#/login';
      }, 1500);
    });
  }
}

export function renderVerifyOtpPage() {
  return `
    <div class="container container-narrow" style="padding: 3rem 1.25rem;">
      <div class="card" style="max-width: 480px; margin: 0 auto; padding: 2.5rem; box-shadow: var(--shadow-xl);">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div class="nav-logo-icon" style="margin: 0 auto 1rem auto; width: 44px; height: 44px;">
            ${getIcon('phone')}
          </div>
          <h2 style="font-size: 1.75rem; margin-bottom: 0.35rem;">Mobile OTP Login</h2>
          <p style="font-size: 0.9rem;">We sent a 6-digit verification code to +91 98765 43210</p>
        </div>

        <form id="otp-form">
          <div class="form-group">
            <label class="form-label" style="text-align: center;">Enter 6-Digit Code</label>
            <div style="display: flex; justify-content: center; gap: 0.5rem; margin: 1rem 0;">
              <input type="text" maxlength="1" class="form-input otp-digit" style="width: 46px; height: 52px; text-align: center; font-size: 1.4rem; font-weight: 700;" value="7" required>
              <input type="text" maxlength="1" class="form-input otp-digit" style="width: 46px; height: 52px; text-align: center; font-size: 1.4rem; font-weight: 700;" value="4" required>
              <input type="text" maxlength="1" class="form-input otp-digit" style="width: 46px; height: 52px; text-align: center; font-size: 1.4rem; font-weight: 700;" value="2" required>
              <input type="text" maxlength="1" class="form-input otp-digit" style="width: 46px; height: 52px; text-align: center; font-size: 1.4rem; font-weight: 700;" value="9" required>
              <input type="text" maxlength="1" class="form-input otp-digit" style="width: 46px; height: 52px; text-align: center; font-size: 1.4rem; font-weight: 700;" value="1" required>
              <input type="text" maxlength="1" class="form-input otp-digit" style="width: 46px; height: 52px; text-align: center; font-size: 1.4rem; font-weight: 700;" value="0" required>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-bottom: 1.25rem;">
            Verify & Sign In ${getIcon('check')}
          </button>
        </form>

        <div style="text-align: center; font-size: 0.875rem;">
          <span style="color: var(--text-muted);">Didn't receive code?</span> <a href="#/verify-otp" id="resend-otp-btn" style="font-weight: 600;">Resend OTP</a>
        </div>
      </div>
    </div>
  `;
}

export function attachOtpEvents() {
  const digits = document.querySelectorAll('.otp-digit');
  digits.forEach((digit, idx) => {
    digit.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && idx < digits.length - 1) {
        digits[idx + 1].focus();
      }
    });
  });

  const form = document.querySelector('#otp-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      loginWithDemo(USER_ROLES.JOB_SEEKER);
      toast.success('OTP Verified! 📱', 'Welcome back, Aarav Sharma.');
      window.location.hash = '#/seeker/dashboard';
    });
  }

  const resendBtn = document.querySelector('#resend-otp-btn');
  if (resendBtn) {
    resendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toast.info('OTP Resent', 'A new 6-digit code has been dispatched.');
    });
  }
}

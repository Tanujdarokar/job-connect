/**
 * JobConnect Client-Side Hash Router Engine
 * Handles SPA navigation, role guards, parameter parsing, and page rendering.
 */

import { getCurrentUser, USER_ROLES } from './state.js';
import { renderNavbar, attachNavbarEvents } from './components/navbar.js';
import { renderFooter } from './components/footer.js';

// Pages
import { renderLandingPage, attachLandingEvents } from './pages/landing.js';
import { renderLoginPage, attachLoginEvents, renderSignupPage, attachSignupEvents, renderForgotPasswordPage, attachForgotEvents, renderVerifyOtpPage, attachOtpEvents } from './pages/auth.js';
import { renderJobsPage, attachJobsEvents } from './pages/jobs.js';
import { renderJobDetailsPage, attachJobDetailsEvents } from './pages/jobDetails.js';
import { renderSavedJobsPage, attachSavedJobsEvents } from './pages/savedJobs.js';
import { renderCompaniesPage, attachCompaniesEvents } from './pages/companies.js';
import { renderCompanyDetailsPage, attachCompanyDetailsEvents } from './pages/companyDetails.js';
import { renderSeekerDashboardPage, attachSeekerDashboardEvents } from './pages/seekerDashboard.js';
import { renderProfilePage, attachProfileEvents } from './pages/profile.js';
import { renderApplicationsPage, attachApplicationsEvents } from './pages/applications.js';
import { renderAiResumeAnalyzerPage, attachAiResumeEvents } from './pages/aiResumeAnalyzer.js';
import { renderInterviewsPage, attachInterviewsEvents } from './pages/interviews.js';
import { renderVideoInterviewPage, attachVideoInterviewEvents } from './pages/videoInterview.js';
import { renderChatPage, attachChatEvents } from './pages/chat.js';
import { renderNotificationsPage, attachNotificationsEvents } from './pages/notifications.js';
import { renderSalariesPage, attachSalariesEvents } from './pages/salaries.js';
import { renderEmployerDashboardPage, attachEmployerDashboardEvents } from './pages/employerDashboard.js';
import { renderEmployerJobsPage, attachEmployerJobsEvents } from './pages/employerJobs.js';
import { renderPostJobPage, attachPostJobEvents } from './pages/postJob.js';
import { renderJobApplicantsPage, attachJobApplicantsEvents } from './pages/jobApplicants.js';
import { renderCandidateSearchPage, attachCandidateSearchEvents } from './pages/candidateSearch.js';
import { renderEmployerAnalyticsPage, attachEmployerAnalyticsEvents } from './pages/employerAnalytics.js';
import { renderAdminDashboardPage, attachAdminDashboardEvents } from './pages/adminDashboard.js';
import { renderNotFoundPage, attachNotFoundEvents } from './pages/notFound.js';

export function handleRoute() {
  const fullHash = window.location.hash || '#/';
  const [hashPath, queryString] = fullHash.split('?');
  const searchParams = new URLSearchParams(queryString || '');
  const params = Object.fromEntries(searchParams.entries());

  const user = getCurrentUser();
  const pageContainer = document.querySelector('#page-content');
  const navbarContainer = document.querySelector('#navbar-container');
  const footerContainer = document.querySelector('#footer-container');

  // Render navigation & footer
  if (navbarContainer) {
    navbarContainer.innerHTML = renderNavbar();
    attachNavbarEvents();
  }
  if (footerContainer) {
    footerContainer.innerHTML = renderFooter();
  }

  let html = '';
  let attachEvents = null;
  let pageTitle = 'JobConnect - Modern Career & Hiring Platform';

  // Route Matching:
  if (hashPath === '#/' || hashPath === '#') {
    html = renderLandingPage();
    attachEvents = attachLandingEvents;
    pageTitle = 'JobConnect - Next-Gen Career & Hiring Ecosystem';
  } else if (hashPath === '#/login') {
    html = renderLoginPage();
    attachEvents = attachLoginEvents;
    pageTitle = 'Sign In - JobConnect';
  } else if (hashPath === '#/signup') {
    html = renderSignupPage();
    attachEvents = attachSignupEvents;
    pageTitle = 'Create Account - JobConnect';
  } else if (hashPath === '#/forgot-password') {
    html = renderForgotPasswordPage();
    attachEvents = attachForgotEvents;
    pageTitle = 'Forgot Password - JobConnect';
  } else if (hashPath === '#/verify-otp') {
    html = renderVerifyOtpPage();
    attachEvents = attachOtpEvents;
    pageTitle = 'Verify Mobile OTP - JobConnect';
  } else if (hashPath === '#/jobs') {
    html = renderJobsPage(params);
    attachEvents = attachJobsEvents;
    pageTitle = 'Explore Tech Jobs - JobConnect';
  } else if (hashPath.startsWith('#/jobs/') && !hashPath.includes('/applicants')) {
    const jobId = hashPath.replace('#/jobs/', '');
    html = renderJobDetailsPage(jobId);
    attachEvents = () => attachJobDetailsEvents(jobId);
    pageTitle = 'Job Details - JobConnect';
  } else if (hashPath === '#/companies') {
    html = renderCompaniesPage(params);
    attachEvents = attachCompaniesEvents;
    pageTitle = 'Tech Companies Directory - JobConnect';
  } else if (hashPath.startsWith('#/companies/')) {
    const compId = hashPath.replace('#/companies/', '');
    html = renderCompanyDetailsPage(compId);
    attachEvents = () => attachCompanyDetailsEvents(compId);
    pageTitle = 'Company Profile & Reviews - JobConnect';
  } else if (hashPath === '#/salaries') {
    html = renderSalariesPage(params.role || 'frontend');
    attachEvents = attachSalariesEvents;
    pageTitle = 'Tech Salaries Explorer - JobConnect';
  } else if (hashPath === '#/ai-tools/resume' || hashPath === '#/ai-tools') {
    html = renderAiResumeAnalyzerPage();
    attachEvents = attachAiResumeEvents;
    pageTitle = 'AI Resume ATS Analyzer - JobConnect';
  }
  // Seeker Routes
  else if (hashPath === '#/seeker/dashboard') {
    html = renderSeekerDashboardPage();
    attachEvents = attachSeekerDashboardEvents;
    pageTitle = 'Candidate Dashboard - JobConnect';
  } else if (hashPath === '#/seeker/profile') {
    html = renderProfilePage();
    attachEvents = attachProfileEvents;
    pageTitle = 'My Profile - JobConnect';
  } else if (hashPath === '#/seeker/applications') {
    html = renderApplicationsPage(params.status || '');
    attachEvents = attachApplicationsEvents;
    pageTitle = 'Application Status Tracker - JobConnect';
  } else if (hashPath === '#/seeker/saved-jobs') {
    html = renderSavedJobsPage();
    attachEvents = attachSavedJobsEvents;
    pageTitle = 'Saved Jobs - JobConnect';
  } else if (hashPath === '#/seeker/interviews') {
    html = renderInterviewsPage();
    attachEvents = attachInterviewsEvents;
    pageTitle = 'Scheduled Interviews - JobConnect';
  } else if (hashPath === '#/seeker/interviews/video') {
    html = renderVideoInterviewPage();
    attachEvents = attachVideoInterviewEvents;
    pageTitle = 'Live Video Interview Room - JobConnect';
  } else if (hashPath === '#/seeker/chat') {
    html = renderChatPage();
    attachEvents = attachChatEvents;
    pageTitle = 'Recruiter Chat - JobConnect';
  } else if (hashPath === '#/seeker/notifications') {
    html = renderNotificationsPage();
    attachEvents = attachNotificationsEvents;
    pageTitle = 'Notifications - JobConnect';
  }
  // Employer Routes
  else if (hashPath === '#/employer/dashboard') {
    html = renderEmployerDashboardPage();
    attachEvents = attachEmployerDashboardEvents;
    pageTitle = 'Employer Dashboard - JobConnect';
  } else if (hashPath === '#/employer/jobs') {
    html = renderEmployerJobsPage();
    attachEvents = attachEmployerJobsEvents;
    pageTitle = 'Manage Job Openings - JobConnect';
  } else if (hashPath === '#/employer/post-job') {
    html = renderPostJobPage();
    attachEvents = attachPostJobEvents;
    pageTitle = 'Post a New Job - JobConnect';
  } else if (hashPath.startsWith('#/employer/jobs/') && hashPath.endsWith('/applicants')) {
    const jobId = hashPath.replace('#/employer/jobs/', '').replace('/applicants', '');
    html = renderJobApplicantsPage(jobId);
    attachEvents = () => attachJobApplicantsEvents(jobId);
    pageTitle = 'Job Applicant Pipeline - JobConnect';
  } else if (hashPath === '#/employer/candidates') {
    html = renderCandidateSearchPage(params);
    attachEvents = attachCandidateSearchEvents;
    pageTitle = 'Talent Pool Search - JobConnect';
  } else if (hashPath === '#/employer/analytics') {
    html = renderEmployerAnalyticsPage();
    attachEvents = attachEmployerAnalyticsEvents;
    pageTitle = 'Recruitment Analytics - JobConnect';
  }
  // Admin Routes
  else if (hashPath === '#/admin/dashboard') {
    html = renderAdminDashboardPage();
    attachEvents = attachAdminDashboardEvents;
    pageTitle = 'System Admin Console - JobConnect';
  }
  // 404
  else {
    html = renderNotFoundPage();
    attachEvents = attachNotFoundEvents;
    pageTitle = 'Page Not Found - JobConnect';
  }

  // Set document title
  document.title = pageTitle;

  // Insert HTML into main content container
  if (pageContainer) {
    pageContainer.innerHTML = html;
  }

  // Scroll to top
  window.scrollTo(0, 0);

  // Attach dynamic page event listeners
  if (typeof attachEvents === 'function') {
    attachEvents();
  }
}

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

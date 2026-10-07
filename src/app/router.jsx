import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LandingLayout from '../core/layouts/LandingLayout';
import AuthLayout from '../core/layouts/AuthLayout';
import SeekerLayout from '../core/layouts/SeekerLayout';
import EmployerLayout from '../core/layouts/EmployerLayout';
import AdminLayout from '../core/layouts/AdminLayout';
import Skeleton from '../core/components/Skeleton';
import { USER_ROLES } from '../core/constants';

// Lazy Loaded Pages
const LandingPage = lazy(() => import('../features/auth/pages/LandingPage'));
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));
const SignupPage = lazy(() => import('../features/auth/pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('../features/auth/pages/ForgotPasswordPage'));
const VerifyOtpPage = lazy(() => import('../features/auth/pages/VerifyOtpPage'));
const UnauthorizedPage = lazy(() => import('../features/auth/pages/UnauthorizedPage'));
const NotFoundPage = lazy(() => import('../features/auth/pages/NotFoundPage'));

// Jobs & Companies
const JobsPage = lazy(() => import('../features/jobs/pages/JobsPage'));
const JobDetailsPage = lazy(() => import('../features/jobs/pages/JobDetailsPage'));
const SavedJobsPage = lazy(() => import('../features/jobs/pages/SavedJobsPage'));
const CompaniesPage = lazy(() => import('../features/company/pages/CompaniesPage'));
const CompanyDetailsPage = lazy(() => import('../features/company/pages/CompanyDetailsPage'));

// Seeker & Profile
const SeekerDashboardPage = lazy(() => import('../features/profile/pages/SeekerDashboardPage'));
const ProfilePage = lazy(() => import('../features/profile/pages/ProfilePage'));
const ApplicationsPage = lazy(() => import('../features/applications/pages/ApplicationsPage'));

// Employer
const EmployerDashboardPage = lazy(() => import('../features/employer/pages/EmployerDashboardPage'));
const PostJobPage = lazy(() => import('../features/employer/pages/PostJobPage'));
const EmployerJobsPage = lazy(() => import('../features/employer/pages/EmployerJobsPage'));
const JobApplicantsPage = lazy(() => import('../features/employer/pages/JobApplicantsPage'));
const CandidateSearchPage = lazy(() => import('../features/employer/pages/CandidateSearchPage'));
const EmployerAnalyticsPage = lazy(() => import('../features/employer/pages/EmployerAnalyticsPage'));

// Communication & Extras
const ChatPage = lazy(() => import('../features/chat/pages/ChatPage'));
const InterviewsPage = lazy(() => import('../features/interviews/pages/InterviewsPage'));
const VideoInterviewPage = lazy(() => import('../features/interviews/pages/VideoInterviewPage'));
const NotificationsPage = lazy(() => import('../features/notifications/pages/NotificationsPage'));
const AiResumeAnalyzerPage = lazy(() => import('../features/ai-tools/pages/AiResumeAnalyzerPage'));
const SalariesPage = lazy(() => import('../features/settings/pages/SalariesPage'));
const AdminDashboardPage = lazy(() => import('../features/admin/pages/AdminDashboardPage'));

const PageLoader = () => (
  <div className="max-w-7xl mx-auto px-4 py-12 space-y-6">
    <div className="flex items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="w-64 h-6" />
        <Skeleton className="w-40 h-4" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
      <Skeleton className="h-44 rounded-2xl" />
      <Skeleton className="h-44 rounded-2xl" />
      <Skeleton className="h-44 rounded-2xl" />
    </div>
  </div>
);

// Route Guards
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) return <PageLoader />;
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export const RoleRoute = ({ allowedRoles, children }) => {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <PageLoader />;
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

export const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <PageLoader />;
  if (isAuthenticated && user) {
    if (user.role === USER_ROLES.EMPLOYER) return <Navigate to="/employer/dashboard" replace />;
    if (user.role === USER_ROLES.ADMIN) return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/seeker/dashboard" replace />;
  }

  return children ? children : <Outlet />;
};

export const router = createBrowserRouter([
  // Public Routes (Header & Footer)
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: 'jobs',
        element: (
          <Suspense fallback={<PageLoader />}>
            <JobsPage />
          </Suspense>
        ),
      },
      {
        path: 'jobs/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <JobDetailsPage />
          </Suspense>
        ),
      },
      {
        path: 'companies',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CompaniesPage />
          </Suspense>
        ),
      },
      {
        path: 'companies/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CompanyDetailsPage />
          </Suspense>
        ),
      },
      {
        path: 'salaries',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SalariesPage />
          </Suspense>
        ),
      },
      {
        path: 'ai-tools',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AiResumeAnalyzerPage />
          </Suspense>
        ),
      },
      {
        path: 'chat',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <ChatPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'interviews',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <InterviewsPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'interview-room',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <VideoInterviewPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'notifications',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <NotificationsPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'unauthorized',
        element: (
          <Suspense fallback={<PageLoader />}>
            <UnauthorizedPage />
          </Suspense>
        ),
      },
    ],
  },

  // Auth Routes
  {
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: 'login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'signup',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SignupPage />
          </Suspense>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ForgotPasswordPage />
          </Suspense>
        ),
      },
      {
        path: 'verify-otp',
        element: (
          <Suspense fallback={<PageLoader />}>
            <VerifyOtpPage />
          </Suspense>
        ),
      },
    ],
  },

  // Job Seeker Portal (Seeker Layout with Sidebar & Mobile Bottom Nav)
  {
    path: 'seeker',
    element: (
      <ProtectedRoute>
        <RoleRoute allowedRoles={[USER_ROLES.JOB_SEEKER]}>
          <SeekerLayout />
        </RoleRoute>
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SeekerDashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: 'applications',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ApplicationsPage />
          </Suspense>
        ),
      },
      {
        path: 'saved',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SavedJobsPage />
          </Suspense>
        ),
      },
    ],
  },

  // Employer Portal (Employer Layout with Sidebar & Candidate Pipeline)
  {
    path: 'employer',
    element: (
      <ProtectedRoute>
        <RoleRoute allowedRoles={[USER_ROLES.EMPLOYER]}>
          <EmployerLayout />
        </RoleRoute>
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageLoader />}>
            <EmployerDashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'jobs',
        element: (
          <Suspense fallback={<PageLoader />}>
            <EmployerJobsPage />
          </Suspense>
        ),
      },
      {
        path: 'jobs/new',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PostJobPage />
          </Suspense>
        ),
      },
      {
        path: 'jobs/:jobId/applicants',
        element: (
          <Suspense fallback={<PageLoader />}>
            <JobApplicantsPage />
          </Suspense>
        ),
      },
      {
        path: 'candidates',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CandidateSearchPage />
          </Suspense>
        ),
      },
      {
        path: 'interviews',
        element: (
          <Suspense fallback={<PageLoader />}>
            <InterviewsPage />
          </Suspense>
        ),
      },
      {
        path: 'analytics',
        element: (
          <Suspense fallback={<PageLoader />}>
            <EmployerAnalyticsPage />
          </Suspense>
        ),
      },
    ],
  },

  // Admin Portal (Admin Layout)
  {
    path: 'admin',
    element: (
      <ProtectedRoute>
        <RoleRoute allowedRoles={[USER_ROLES.ADMIN]}>
          <AdminLayout />
        </RoleRoute>
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminDashboardPage />
          </Suspense>
        ),
      },
    ],
  },

  // 404 Catch-All
  {
    path: '*',
    element: <LandingLayout />,
    children: [
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;

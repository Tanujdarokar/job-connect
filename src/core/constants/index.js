export const USER_ROLES = {
  JOB_SEEKER: 'seeker',
  EMPLOYER: 'employer',
  ADMIN: 'admin',
};

export const JOB_TYPES = [
  { id: 'full-time', label: 'Full-time' },
  { id: 'part-time', label: 'Part-time' },
  { id: 'contract', label: 'Contract' },
  { id: 'internship', label: 'Internship' },
  { id: 'freelance', label: 'Freelance' },
];

export const WORKPLACE_TYPES = [
  { id: 'on-site', label: 'On-site' },
  { id: 'remote', label: 'Remote' },
  { id: 'hybrid', label: 'Hybrid' },
];

export const EXPERIENCE_LEVELS = [
  { id: 'fresher', label: 'Fresher / Entry (0-1 yrs)' },
  { id: 'junior', label: 'Junior (1-3 yrs)' },
  { id: 'mid', label: 'Mid-Level (3-5 yrs)' },
  { id: 'senior', label: 'Senior (5-8 yrs)' },
  { id: 'lead', label: 'Lead / Principal (8+ yrs)' },
];

export const APPLICATION_STATUS = {
  APPLIED: 'applied',
  UNDER_REVIEW: 'under_review',
  SHORTLISTED: 'shortlisted',
  INTERVIEW: 'interview',
  REJECTED: 'rejected',
  HIRED: 'hired',
};

export const APPLICATION_STATUS_CONFIG = {
  [APPLICATION_STATUS.APPLIED]: {
    label: 'Applied',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    step: 1,
  },
  [APPLICATION_STATUS.UNDER_REVIEW]: {
    label: 'Under Review',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    step: 2,
  },
  [APPLICATION_STATUS.SHORTLISTED]: {
    label: 'Shortlisted',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    step: 3,
  },
  [APPLICATION_STATUS.INTERVIEW]: {
    label: 'Interview Scheduled',
    color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    step: 4,
  },
  [APPLICATION_STATUS.HIRED]: {
    label: 'Hired 🎉',
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    step: 5,
  },
  [APPLICATION_STATUS.REJECTED]: {
    label: 'Not Selected',
    color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    step: 0,
  },
};

export const DEMO_CREDENTIALS = {
  SEEKER: {
    email: 'seeker@jobconnect.demo',
    password: 'password123',
    role: USER_ROLES.JOB_SEEKER,
    name: 'Aarav Sharma',
  },
  EMPLOYER: {
    email: 'employer@techcorp.demo',
    password: 'password123',
    role: USER_ROLES.EMPLOYER,
    name: 'Priya Patel',
    companyName: 'TechCorp Innovations',
  },
  ADMIN: {
    email: 'admin@jobconnect.demo',
    password: 'password123',
    role: USER_ROLES.ADMIN,
    name: 'Admin System',
  },
};

export const POPULAR_LOCATIONS = [
  'Ahmedabad, Gujarat',
  'Mumbai, Maharashtra',
  'Bangalore, Karnataka',
  'Pune, Maharashtra',
  'Delhi NCR, India',
  'Hyderabad, Telangana',
  'Remote (India)',
  'Remote (Worldwide)',
];

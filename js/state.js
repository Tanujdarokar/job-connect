/**
 * JobConnect Store & Data Management Layer
 * Handles complete browser persistence (LocalStorage), reactive event listeners,
 * and robust CRUD operations for all platform features.
 */

// Constants
export const USER_ROLES = {
  JOB_SEEKER: 'seeker',
  EMPLOYER: 'employer',
  ADMIN: 'admin',
};

export const APPLICATION_STATUS = {
  APPLIED: 'applied',
  UNDER_REVIEW: 'under_review',
  SHORTLISTED: 'shortlisted',
  INTERVIEW: 'interview',
  HIRED: 'hired',
  REJECTED: 'rejected',
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

const INITIAL_USERS = [
  {
    id: 'user_seeker_1',
    email: 'seeker@jobconnect.demo',
    password: 'password123',
    role: USER_ROLES.JOB_SEEKER,
    name: 'Aarav Sharma',
    phone: '+91 98765 43210',
    headline: 'Senior Full Stack React & Node Developer',
    location: 'Ahmedabad, Gujarat',
    bio: 'Passionate software engineer with 5+ years of experience crafting high-performance web applications with React, TypeScript, and Node.js.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    profileCompletion: 92,
    skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Redux', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'AWS'],
    languages: [
      { name: 'English', proficiency: 'Fluent' },
      { name: 'Hindi', proficiency: 'Native' },
      { name: 'Gujarati', proficiency: 'Conversational' },
    ],
    experience: [
      {
        id: 'exp_1',
        title: 'Lead Frontend Engineer',
        company: 'InnovateX Labs',
        location: 'Ahmedabad, Gujarat',
        startDate: '2022-03',
        endDate: 'Present',
        current: true,
        description: 'Led a team of 6 engineers building scalable enterprise dashboards. Improved core web vitals by 45%.',
      },
      {
        id: 'exp_2',
        title: 'Software Developer',
        company: 'TechWave Solutions',
        location: 'Mumbai, Maharashtra',
        startDate: '2019-06',
        endDate: '2022-02',
        current: false,
        description: 'Developed responsive client portals, integrated RESTful APIs, and wrote automated unit tests with Jest.',
      },
    ],
    education: [
      {
        id: 'edu_1',
        degree: 'B.Tech in Computer Engineering',
        institution: 'Gujarat Technological University (GTU)',
        year: '2015 - 2019',
        score: '8.8 CGPA',
      },
    ],
    projects: [
      {
        id: 'proj_1',
        title: 'FinTrack - AI Expense Manager',
        link: 'https://github.com/example/fintrack',
        description: 'Personal finance web app with automated OCR receipt scanning and monthly budgeting analytics.',
      },
    ],
    resume: {
      fileName: 'Aarav_Sharma_FullStack_Resume.pdf',
      fileSize: '420 KB',
      uploadedAt: '2026-09-15T10:30:00.000Z',
    },
    savedJobs: ['job_1', 'job_3', 'job_7'],
    createdAt: '2026-01-10T08:00:00.000Z',
    status: 'active',
  },
  {
    id: 'user_employer_1',
    email: 'employer@techcorp.demo',
    password: 'password123',
    role: USER_ROLES.EMPLOYER,
    name: 'Priya Patel',
    phone: '+91 91234 56789',
    headline: 'Talent Acquisition Director',
    companyId: 'comp_1',
    companyName: 'TechCorp Innovations',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-05T09:00:00.000Z',
    status: 'active',
  },
  {
    id: 'user_admin_1',
    email: 'admin@jobconnect.demo',
    password: 'password123',
    role: USER_ROLES.ADMIN,
    name: 'Super Admin',
    phone: '+91 90000 00001',
    headline: 'JobConnect System Administrator',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-12-01T00:00:00.000Z',
    status: 'active',
  },
  {
    id: 'user_seeker_2',
    email: 'rohit.verma@example.com',
    role: USER_ROLES.JOB_SEEKER,
    name: 'Rohit Verma',
    headline: 'Backend Python & Django Specialist | AWS Certified',
    location: 'Bangalore, Karnataka',
    skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    experience: [{ title: 'Senior Backend Developer', company: 'CloudScale', current: true, startDate: '2021-01', endDate: 'Present' }],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    profileCompletion: 88,
    status: 'active',
  },
  {
    id: 'user_seeker_3',
    email: 'ananya.joshi@example.com',
    role: USER_ROLES.JOB_SEEKER,
    name: 'Ananya Joshi',
    headline: 'Lead UI/UX & Product Designer',
    location: 'Mumbai, Maharashtra',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Prototyping', 'Tailwind CSS'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    profileCompletion: 95,
    status: 'active',
  },
  {
    id: 'user_seeker_4',
    email: 'karan.singh@example.com',
    role: USER_ROLES.JOB_SEEKER,
    name: 'Karan Singh',
    headline: 'DevOps & Cloud Architect (Kubernetes, Terraform, GCP)',
    location: 'Remote (India)',
    skills: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'AWS', 'GCP', 'Linux'],
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    profileCompletion: 85,
    status: 'active',
  },
  {
    id: 'user_seeker_5',
    email: 'meera.iyer@example.com',
    role: USER_ROLES.JOB_SEEKER,
    name: 'Meera Iyer',
    headline: 'Data Scientist & Machine Learning Engineer',
    location: 'Hyderabad, Telangana',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'NLP', 'Scikit-learn', 'SQL', 'LLMs'],
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    profileCompletion: 90,
    status: 'active',
  },
];

const INITIAL_COMPANIES = [
  {
    id: 'comp_1',
    name: 'TechCorp Innovations',
    tagline: 'Empowering enterprise transformation with next-gen AI cloud solutions',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    industry: 'Software & Cloud Services',
    size: '500-1,000 employees',
    founded: 2017,
    website: 'https://techcorp-innovations.demo',
    location: 'Ahmedabad, Gujarat',
    rating: 4.8,
    reviewCount: 142,
    verified: true,
    description: 'TechCorp Innovations is an industry-leading software powerhouse engineering enterprise cloud platforms, generative AI tooling, and high-performance financial systems.',
    benefits: ['Comprehensive Health Insurance', 'Remote-First Flexibility', 'Annual Learning Allowance (₹1,00,000)', 'Stock Options (ESOPs)', 'Free Catered Meals & Gym Membership'],
  },
  {
    id: 'comp_2',
    name: 'Google India',
    tagline: 'Organizing the world’s information and making it universally accessible',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    industry: 'Internet & Technology',
    size: '10,000+ employees',
    founded: 1998,
    website: 'https://careers.google.com',
    location: 'Bangalore, Karnataka',
    rating: 4.9,
    reviewCount: 1890,
    verified: true,
    description: 'Google’s innovative search, Android, Cloud, and AI technologies touch billions of lives every single day across the globe.',
    benefits: ['World-class Campus & Micro-kitchens', 'Generous 401k & PF Matching', 'Wellness Stipend', 'Global Mobility Programs'],
  },
  {
    id: 'comp_3',
    name: 'Microsoft India',
    tagline: 'Empowering every person and every organization on the planet to achieve more',
    logo: 'https://images.unsplash.com/photo-1633409381659-4554366a7b7a?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&auto=format&fit=crop&q=80',
    industry: 'Software & Cloud Computing',
    size: '10,000+ employees',
    founded: 1975,
    website: 'https://careers.microsoft.com',
    location: 'Hyderabad, Telangana',
    rating: 4.7,
    reviewCount: 1540,
    verified: true,
    description: 'Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.',
    benefits: ['Hybrid Work Model', 'Parental Leave (20 weeks)', 'Product Discounts', 'Extensive Learning & Mentorship'],
  },
  {
    id: 'comp_4',
    name: 'Swiggy',
    tagline: 'Delivering happiness and groceries in minutes across India',
    logo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
    industry: 'FoodTech & Quick Commerce',
    size: '5,000-10,000 employees',
    founded: 2014,
    website: 'https://swiggy.com',
    location: 'Bangalore, Karnataka',
    rating: 4.4,
    reviewCount: 820,
    verified: true,
    description: 'Swiggy is India’s leading on-demand convenience platform operating across 500+ cities.',
    benefits: ['Swiggy Dineout Credits', 'Medical Shield for Family', 'Flexible PTO', 'Annual Hackathons'],
  },
  {
    id: 'comp_5',
    name: 'Zomato & Blinkit',
    tagline: 'Better food for more people, delivered at lightning speed',
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
    industry: 'E-commerce & FoodTech',
    size: '5,000-10,000 employees',
    founded: 2008,
    website: 'https://zomato.com',
    location: 'Delhi NCR, India',
    rating: 4.3,
    reviewCount: 710,
    verified: true,
    description: 'Zomato is a pioneering food ecosystem connecting customers, delivery partners, and restaurant owners.',
    benefits: ['No Formal Dress Code', 'Unlimited Time Off for Critical Care', 'Stock Grants', 'Pet-Friendly Office'],
  },
  {
    id: 'comp_6',
    name: 'CRED',
    tagline: 'Rewards for the creditworthy and financial high-flyers',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    industry: 'Fintech & Lifestyle',
    size: '1,000-5,000 employees',
    founded: 2018,
    website: 'https://cred.club',
    location: 'Bangalore, Karnataka',
    rating: 4.6,
    reviewCount: 460,
    verified: true,
    description: 'CRED is a members-only club that rewards individuals for timely credit card payments and smart wealth growth.',
    benefits: ['Top-tier Compensation in India', 'High-end Apple Workstations', 'Personal Fitness Coach', 'Mental Health Support'],
  },
  {
    id: 'comp_7',
    name: 'Razorpay',
    tagline: 'The financial backbone and payment infrastructure of Indian commerce',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
    industry: 'Fintech & Neo-Banking',
    size: '1,000-5,000 employees',
    founded: 2014,
    website: 'https://razorpay.com',
    location: 'Bangalore, Karnataka',
    rating: 4.6,
    reviewCount: 650,
    verified: true,
    description: 'Razorpay powers payments for over 10 million Indian businesses, offering payment gateways, payroll, and banking API suites.',
    benefits: ['Health Insurance with Zero Waiting Period', 'Work from Anywhere Allowance', 'Annual ESOP Buyback Program'],
  },
  {
    id: 'comp_8',
    name: 'Tata Consultancy Services',
    tagline: 'Building on belief to engineer global business transformation',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80',
    industry: 'IT Services & Consulting',
    size: '100,000+ employees',
    founded: 1968,
    website: 'https://tcs.com',
    location: 'Mumbai, Maharashtra',
    rating: 4.1,
    reviewCount: 3400,
    verified: true,
    description: 'TCS is a global IT services and consulting organization partnering with world business leaders.',
    benefits: ['Job Stability & Global Exposure', 'Tata Group Employee Discounts', 'Comprehensive Pension Plans'],
  },
  {
    id: 'comp_9',
    name: 'Zerodha',
    tagline: 'India’s largest discount broker pioneering free equity investments',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&auto=format&fit=crop&q=80',
    industry: 'Fintech & Stock Broking',
    size: '1,000-5,000 employees',
    founded: 2010,
    website: 'https://zerodha.com',
    location: 'Bangalore, Karnataka',
    rating: 4.9,
    reviewCount: 520,
    verified: true,
    description: 'Zerodha disrupted Indian capital markets through zero brokerage trading and modern open-source web tech stack.',
    benefits: ['Zero Micromanagement', 'Generous Annual Profit Sharing', 'Flexible Remote Schedules', 'Tech First Freedom'],
  },
  {
    id: 'comp_10',
    name: 'Freshworks',
    tagline: 'Delivering delightful modern SaaS software for customer support and IT',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80',
    industry: 'Enterprise SaaS',
    size: '5,000-10,000 employees',
    founded: 2010,
    website: 'https://freshworks.com',
    location: 'Chennai, Tamil Nadu',
    rating: 4.5,
    reviewCount: 680,
    verified: true,
    description: 'Freshworks builds cloud SaaS software that helps businesses delight customers and employees.',
    benefits: ['NASDAQ Listed Equity (RSUs)', 'Global Relocation Support', 'Daycare Facility on Campus'],
  },
];

const INITIAL_JOBS = [
  {
    id: 'job_1',
    title: 'Senior Frontend Engineer (React & Next.js)',
    companyId: 'comp_1',
    companyName: 'TechCorp Innovations',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    location: 'Ahmedabad, Gujarat',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'senior',
    salaryMin: 1800000,
    salaryMax: 2800000,
    salaryCurrency: 'INR',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux', 'GraphQL'],
    description: 'We are seeking an exceptional Senior Frontend Engineer to architect and scale our core SaaS dashboard. You will lead UI engineering initiatives, implement real-time analytics visualizations, and mentor junior developers.',
    responsibilities: [
      'Architect resilient, fast client applications with React 18 and Next.js',
      'Optimize web performance and ensure seamless 60fps user experience',
      'Collaborate closely with product designers, product managers, and backend engineers',
      'Maintain strong unit and end-to-end test coverage with Vitest and Playwright',
    ],
    requirements: [
      '5+ years of production experience in modern React ecosystem',
      'Deep understanding of browser rendering, state management, and async patterns',
      'Strong eye for UI/UX micro-interactions and responsive design',
      'Bachelor’s or Master’s in Computer Science or equivalent practical experience',
    ],
    benefits: ['₹22L - ₹28L CTC + ESOPs', 'Flexible work from home 2 days/week', 'Comprehensive Family Health Insurance', 'Annual Tech Conference budget'],
    postedAt: '2026-10-02T10:00:00.000Z',
    status: 'active',
    applicantCount: 24,
    viewsCount: 312,
    featured: true,
  },
  {
    id: 'job_2',
    title: 'Full Stack Node.js & React Developer',
    companyId: 'comp_7',
    companyName: 'Razorpay',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=120&auto=format&fit=crop&q=80',
    location: 'Bangalore, Karnataka',
    workplaceType: 'on-site',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salaryMin: 2200000,
    salaryMax: 3200000,
    salaryCurrency: 'INR',
    skills: ['Node.js', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Kafka', 'Docker'],
    description: 'Join the Razorpay core checkout engineering team. Build high-throughput financial transaction processing flows serving millions of users daily with 99.999% uptime.',
    responsibilities: [
      'Design fault-tolerant APIs and microservices in Node.js and Go',
      'Build seamless payment widgets with React and vanilla JS SDKs',
      'Ensure strict PCI-DSS security compliance across all endpoints',
    ],
    requirements: [
      '3-6 years of experience in full-stack web applications',
      'Proficiency with SQL optimization and distributed caching',
      'Strong knowledge of concurrency and idempotency in distributed payment systems',
    ],
    benefits: ['Competitive salary + RSUs', 'Daily catered gourmet lunches', 'Generous wellness & gym allowance'],
    postedAt: '2026-10-04T09:30:00.000Z',
    status: 'active',
    applicantCount: 42,
    viewsCount: 540,
    featured: true,
  },
  {
    id: 'job_3',
    title: 'Lead UI/UX Product Designer',
    companyId: 'comp_6',
    companyName: 'CRED',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=80',
    location: 'Bangalore, Karnataka',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'lead',
    salaryMin: 3000000,
    salaryMax: 4500000,
    salaryCurrency: 'INR',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Micro-interactions', 'Prototyping', 'User Research'],
    description: 'CRED is known for industry-defining aesthetic craft. We are looking for a visionary Lead Product Designer who obsessively polishes every pixel and motion curve to create unforgettable consumer experiences.',
    responsibilities: [
      'Own end-to-end design for new lifestyle and wealth product lines',
      'Craft tactile 3D/2D interactive components and fluid animations',
      'Run qualitative user research sessions and translate insights into prototypes',
    ],
    requirements: [
      '6+ years creating award-winning digital consumer experiences',
      'A stellar portfolio demonstrating high visual craft and motion design',
      'Deep mastery of Figma, Principle, or Protopie',
    ],
    benefits: ['Industry-leading compensation & equity', 'Custom Apple M3 Max setup', 'Unlimited book & learning budget'],
    postedAt: '2026-10-05T14:00:00.000Z',
    status: 'active',
    applicantCount: 18,
    viewsCount: 480,
    featured: true,
  },
  {
    id: 'job_4',
    title: 'Backend Go / Python Engineer',
    companyId: 'comp_9',
    companyName: 'Zerodha',
    companyLogo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&auto=format&fit=crop&q=80',
    location: 'Remote (India)',
    workplaceType: 'remote',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salaryMin: 2000000,
    salaryMax: 3000000,
    salaryCurrency: 'INR',
    skills: ['Go', 'Python', 'PostgreSQL', 'Redis', 'WebSockets', 'Linux'],
    description: 'Work directly on Kite, India’s largest stock trading platform. We write minimalist, fast software that processes over 15 million orders every trading day.',
    responsibilities: [
      'Develop real-time market data streaming feeds via WebSockets',
      'Scale order validation and execution engines with low latency Go code',
      'Contribute to internal open source tooling and libraries',
    ],
    requirements: [
      'Strong fundamentals in operating systems, networking, and data structures',
      'Experience building low-latency distributed systems in Go or Python',
      'Love for simple code and zero bloated frameworks',
    ],
    benefits: ['100% remote anywhere in India', 'Generous year-end profit sharing bonuses', 'No micromanagement culture'],
    postedAt: '2026-10-01T11:00:00.000Z',
    status: 'active',
    applicantCount: 65,
    viewsCount: 920,
    featured: true,
  },
  {
    id: 'job_5',
    title: 'DevOps & Site Reliability Engineer',
    companyId: 'comp_4',
    companyName: 'Swiggy',
    companyLogo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=120&auto=format&fit=crop&q=80',
    location: 'Bangalore, Karnataka',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'senior',
    salaryMin: 2500000,
    salaryMax: 3800000,
    salaryCurrency: 'INR',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'Prometheus', 'CI/CD'],
    description: 'Manage massive cloud scale handling peak dinner-time rushes with millions of concurrent orders. Keep Swiggy’s delivery ecosystem lightning fast and resilient.',
    responsibilities: [
      'Scale multi-region Kubernetes clusters on AWS',
      'Automate infrastructure provisioning using Terraform & GitOps',
      'Improve observability with Grafana, Prometheus, and OpenTelemetry',
    ],
    requirements: [
      '5+ years in SRE/DevOps roles for high-traffic consumer tech platforms',
      'Deep hands-on experience with container orchestration and chaos engineering',
    ],
    benefits: ['Comprehensive health coverage', 'Food vouchers & discounts', 'Relocation assistance to Bangalore'],
    postedAt: '2026-09-28T08:00:00.000Z',
    status: 'active',
    applicantCount: 31,
    viewsCount: 410,
    featured: false,
  },
  {
    id: 'job_6',
    title: 'AI / Machine Learning Engineer (LLMs & RAG)',
    companyId: 'comp_1',
    companyName: 'TechCorp Innovations',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    location: 'Ahmedabad, Gujarat',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'mid',
    salaryMin: 2000000,
    salaryMax: 3200000,
    salaryCurrency: 'INR',
    skills: ['Python', 'PyTorch', 'LangChain', 'LlamaIndex', 'Vector DBs', 'OpenAI API', 'FastAPI'],
    description: 'Build enterprise-grade AI agents, semantic retrieval pipelines, and custom fine-tuned LLMs for document intelligence and enterprise automation.',
    responsibilities: [
      'Build and optimize retrieval augmented generation (RAG) pipelines',
      'Evaluate model hallucinations, latency, and cost tradeoffs',
      'Deploy production inference APIs using FastAPI and Triton Server',
    ],
    requirements: [
      '3+ years in Applied ML / NLP with proven generative AI experience',
      'Familiarity with Milvus, Pinecone, or Qdrant vector databases',
    ],
    benefits: ['Top-end Nvidia GPU workstation', 'Flexible hours', 'ESOP grants'],
    postedAt: '2026-10-03T16:20:00.000Z',
    status: 'active',
    applicantCount: 19,
    viewsCount: 380,
    featured: true,
  },
  {
    id: 'job_7',
    title: 'Junior React Frontend Developer',
    companyId: 'comp_10',
    companyName: 'Freshworks',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&auto=format&fit=crop&q=80',
    location: 'Chennai, Tamil Nadu',
    workplaceType: 'on-site',
    jobType: 'full-time',
    experienceLevel: 'junior',
    salaryMin: 700000,
    salaryMax: 1200000,
    salaryCurrency: 'INR',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'REST APIs'],
    description: 'Kickstart your career with Freshworks. Work with a vibrant engineering team crafting intuitive widgets and components for our global customer support suite.',
    responsibilities: [
      'Build reusable UI components following design system guidelines',
      'Fix frontend bugs and assist with unit test cases',
    ],
    requirements: [
      '1-2 years of experience or strong portfolio projects with React',
      'Good understanding of HTML5, CSS Flexbox/Grid, and modern JavaScript (ES6+)',
    ],
    benefits: ['Structured mentorship program', 'Campus meals & sports facilities', 'Health insurance'],
    postedAt: '2026-10-06T12:00:00.000Z',
    status: 'active',
    applicantCount: 78,
    viewsCount: 650,
    featured: false,
  },
  {
    id: 'job_8',
    title: 'Product Manager - Growth & Retention',
    companyId: 'comp_5',
    companyName: 'Zomato & Blinkit',
    companyLogo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&auto=format&fit=crop&q=80',
    location: 'Delhi NCR, India',
    workplaceType: 'on-site',
    jobType: 'full-time',
    experienceLevel: 'senior',
    salaryMin: 2800000,
    salaryMax: 4200000,
    salaryCurrency: 'INR',
    skills: ['Product Strategy', 'A/B Testing', 'SQL', 'Data Analytics', 'User Experience'],
    description: 'Lead high-impact growth loops, cart conversion optimizations, and loyalty program initiatives across Zomato Gold.',
    responsibilities: [
      'Define OKRs and feature roadmaps for customer activation and retention',
      'Run rigorous experimentation and data deep-dives with analytics teams',
    ],
    requirements: [
      '4+ years product management experience in high-growth B2C internet apps',
      'Strong quantitative and analytical mindset with SQL fluency',
    ],
    benefits: ['Executive compensation package', 'Zomato Gold VIP membership for family', 'Annual offsites'],
    postedAt: '2026-09-30T10:00:00.000Z',
    status: 'active',
    applicantCount: 35,
    viewsCount: 520,
    featured: false,
  },
];

// Generate extra mock jobs for richness
const extraTitles = [
  { title: 'Frontend Developer (Vue & Nuxt)', skills: ['Vue.js', 'Nuxt', 'JavaScript', 'Tailwind CSS'], type: 'full-time', exp: 'mid', min: 1200000, max: 1800000, loc: 'Pune, Maharashtra', comp: 'comp_10' },
  { title: 'Software Engineer - Cloud Platform', skills: ['Golang', 'Kubernetes', 'Docker', 'GCP'], type: 'full-time', exp: 'senior', min: 2500000, max: 3500000, loc: 'Bangalore, Karnataka', comp: 'comp_2' },
  { title: 'Database Administrator (PostgreSQL & MongoDB)', skills: ['PostgreSQL', 'MongoDB', 'Database Tuning', 'Linux'], type: 'full-time', exp: 'senior', min: 1600000, max: 2400000, loc: 'Mumbai, Maharashtra', comp: 'comp_8' },
  { title: 'iOS App Developer (Swift & SwiftUI)', skills: ['Swift', 'SwiftUI', 'iOS', 'CoreData', 'Combine'], type: 'full-time', exp: 'mid', min: 1800000, max: 2700000, loc: 'Bangalore, Karnataka', comp: 'comp_6' },
  { title: 'Security Engineer - Application Security', skills: ['AppSec', 'Penetration Testing', 'OWASP', 'Python'], type: 'full-time', exp: 'senior', min: 2200000, max: 3400000, loc: 'Bangalore, Karnataka', comp: 'comp_7' },
  { title: 'Growth Marketing Manager', skills: ['Performance Marketing', 'SEO', 'Google Ads', 'Analytics'], type: 'full-time', exp: 'mid', min: 1400000, max: 2200000, loc: 'Ahmedabad, Gujarat', comp: 'comp_1' },
  { title: 'Frontend Intern (React & CSS)', skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Git'], type: 'internship', exp: 'fresher', min: 25000, max: 40000, loc: 'Ahmedabad, Gujarat', comp: 'comp_1' },
  { title: 'Technical Writer & Content Strategist', skills: ['Technical Writing', 'Developer Documentation', 'Markdown'], type: 'freelance', exp: 'mid', min: 50000, max: 100000, loc: 'Remote (Worldwide)', comp: 'comp_9' },
];

extraTitles.forEach((item, index) => {
  const comp = INITIAL_COMPANIES.find((c) => c.id === item.comp) || INITIAL_COMPANIES[0];
  INITIAL_JOBS.push({
    id: `job_${index + 9}`,
    title: item.title,
    companyId: comp.id,
    companyName: comp.name,
    companyLogo: comp.logo,
    location: item.loc,
    workplaceType: item.loc.toLowerCase().includes('remote') ? 'remote' : index % 2 === 0 ? 'hybrid' : 'on-site',
    jobType: item.type,
    experienceLevel: item.exp,
    salaryMin: item.min,
    salaryMax: item.max,
    salaryCurrency: 'INR',
    skills: item.skills,
    description: `We are looking for an exceptional ${item.title} to join our high-performing team at ${comp.name}.`,
    responsibilities: [
      `Design and implement scalable modules with ${item.skills[0]} and ${item.skills[1]}`,
      'Collaborate across cross-functional engineering and product squads',
    ],
    requirements: [
      `Hands-on expertise with ${item.skills.join(', ')}`,
      'Commitment to writing clean, maintainable, and high-performance code',
    ],
    benefits: ['Competitive compensation', 'Generous health and wellness allowances', 'Flexible schedules'],
    postedAt: new Date(Date.now() - (index + 2) * 86400000).toISOString(),
    status: 'active',
    applicantCount: 12 + index * 3,
    viewsCount: 150 + index * 45,
    featured: index % 3 === 0,
  });
});

const INITIAL_APPLICATIONS = [
  {
    id: 'app_1',
    jobId: 'job_1',
    jobTitle: 'Senior Frontend Engineer (React & Next.js)',
    companyId: 'comp_1',
    companyName: 'TechCorp Innovations',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    location: 'Ahmedabad, Gujarat',
    seekerId: 'user_seeker_1',
    seekerName: 'Aarav Sharma',
    seekerEmail: 'seeker@jobconnect.demo',
    seekerHeadline: 'Senior Full Stack React & Node Developer',
    seekerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    resumeUrl: 'Aarav_Sharma_FullStack_Resume.pdf',
    coverLetter: 'Dear Hiring Team at TechCorp, I have spent the last 5+ years building performant React applications with Next.js and Redux. I would love to contribute to your core SaaS platforms.',
    status: APPLICATION_STATUS.INTERVIEW,
    appliedAt: '2026-10-03T11:20:00.000Z',
    timeline: [
      { status: APPLICATION_STATUS.APPLIED, date: '2026-10-03T11:20:00.000Z', note: 'Application submitted successfully' },
      { status: APPLICATION_STATUS.UNDER_REVIEW, date: '2026-10-04T09:15:00.000Z', note: 'Resume reviewed by Priya Patel (Recruiter)' },
      { status: APPLICATION_STATUS.SHORTLISTED, date: '2026-10-05T14:30:00.000Z', note: 'Candidate profile shortlisted for technical rounds' },
      { status: APPLICATION_STATUS.INTERVIEW, date: '2026-10-06T10:00:00.000Z', note: 'Technical Round 1 scheduled for tomorrow' },
    ],
  },
  {
    id: 'app_2',
    jobId: 'job_4',
    jobTitle: 'Backend Go / Python Engineer',
    companyId: 'comp_9',
    companyName: 'Zerodha',
    companyLogo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&auto=format&fit=crop&q=80',
    location: 'Remote (India)',
    seekerId: 'user_seeker_1',
    seekerName: 'Aarav Sharma',
    seekerEmail: 'seeker@jobconnect.demo',
    resumeUrl: 'Aarav_Sharma_FullStack_Resume.pdf',
    coverLetter: 'Excited about Zerodha’s tech ethos and low-overhead software engineering philosophy.',
    status: APPLICATION_STATUS.UNDER_REVIEW,
    appliedAt: '2026-10-04T15:40:00.000Z',
    timeline: [
      { status: APPLICATION_STATUS.APPLIED, date: '2026-10-04T15:40:00.000Z', note: 'Application submitted' },
      { status: APPLICATION_STATUS.UNDER_REVIEW, date: '2026-10-05T16:00:00.000Z', note: 'Under preliminary screening' },
    ],
  },
  {
    id: 'app_3',
    jobId: 'job_2',
    jobTitle: 'Full Stack Node.js & React Developer',
    companyId: 'comp_7',
    companyName: 'Razorpay',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=120&auto=format&fit=crop&q=80',
    location: 'Bangalore, Karnataka',
    seekerId: 'user_seeker_1',
    seekerName: 'Aarav Sharma',
    seekerEmail: 'seeker@jobconnect.demo',
    resumeUrl: 'Aarav_Sharma_FullStack_Resume.pdf',
    coverLetter: 'I have hands-on experience building high-throughput REST APIs and checkout forms.',
    status: APPLICATION_STATUS.APPLIED,
    appliedAt: '2026-10-06T18:00:00.000Z',
    timeline: [
      { status: APPLICATION_STATUS.APPLIED, date: '2026-10-06T18:00:00.000Z', note: 'Application submitted' },
    ],
  },
];

const INITIAL_CHATS = [
  {
    id: 'chat_1',
    participants: ['user_seeker_1', 'user_employer_1'],
    seekerId: 'user_seeker_1',
    employerId: 'user_employer_1',
    jobId: 'job_1',
    jobTitle: 'Senior Frontend Engineer (React & Next.js)',
    lastMessage: 'Looking forward to our technical discussion tomorrow at 3:00 PM!',
    lastMessageAt: '2026-10-06T11:45:00.000Z',
    unreadCountSeeker: 0,
    unreadCountEmployer: 0,
    messages: [
      {
        id: 'msg_1',
        senderId: 'user_employer_1',
        text: 'Hi Aarav! We reviewed your profile and resume for the Senior Frontend Engineer role. Your background in React and micro-frontends looks fantastic.',
        timestamp: '2026-10-05T14:35:00.000Z',
      },
      {
        id: 'msg_2',
        senderId: 'user_seeker_1',
        text: 'Thank you Priya! I’m very excited about TechCorp’s recent AI products and would love to discuss how I can contribute.',
        timestamp: '2026-10-05T15:00:00.000Z',
      },
      {
        id: 'msg_3',
        senderId: 'user_employer_1',
        text: 'Wonderful. We have scheduled an interactive technical interview. Looking forward to our discussion tomorrow at 3:00 PM!',
        timestamp: '2026-10-06T11:45:00.000Z',
      },
    ],
  },
];

const INITIAL_INTERVIEWS = [
  {
    id: 'int_1',
    jobId: 'job_1',
    jobTitle: 'Senior Frontend Engineer (React & Next.js)',
    companyName: 'TechCorp Innovations',
    seekerId: 'user_seeker_1',
    seekerName: 'Aarav Sharma',
    employerId: 'user_employer_1',
    employerName: 'Priya Patel',
    title: 'Round 1: System Design & React Architecture',
    date: '2026-10-08',
    startTime: '15:00',
    endTime: '16:00',
    status: 'confirmed',
    meetingLink: '#/seeker/interviews/video?id=int_1',
    notes: 'Please be prepared to walk through React state architecture, custom hooks, and web performance optimization techniques.',
    createdAt: '2026-10-06T10:00:00.000Z',
  },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    userId: 'user_seeker_1',
    title: 'Interview Scheduled! 🎯',
    message: 'TechCorp Innovations scheduled "Round 1: System Design" for Oct 8 at 3:00 PM IST.',
    type: 'interview',
    read: false,
    link: '#/seeker/interviews',
    createdAt: '2026-10-06T10:00:00.000Z',
  },
  {
    id: 'notif_2',
    userId: 'user_seeker_1',
    title: 'Application Shortlisted 🚀',
    message: 'Your application for Senior Frontend Engineer at TechCorp has been shortlisted!',
    type: 'application',
    read: true,
    link: '#/seeker/applications',
    createdAt: '2026-10-05T14:30:00.000Z',
  },
  {
    id: 'notif_3',
    userId: 'user_seeker_1',
    title: 'New Recommended Job ✨',
    message: 'Razorpay posted "Full Stack Node.js & React Developer" matching 94% of your skills.',
    type: 'job_alert',
    read: true,
    link: '#/jobs/job_2',
    createdAt: '2026-10-04T09:30:00.000Z',
  },
];

const INITIAL_REVIEWS = [
  {
    id: 'rev_1',
    companyId: 'comp_1',
    authorName: 'Senior Frontend Dev',
    rating: 5,
    title: 'Fantastic engineering culture and work-life balance',
    pros: 'High trust environment, great leadership, top-of-the-line MacBook Pros, supportive team.',
    cons: 'Fast-paced sprints can sometimes feel intense before major product launches.',
    role: 'Current Employee',
    createdAt: '2026-08-20T10:00:00.000Z',
  },
  {
    id: 'rev_2',
    companyId: 'comp_1',
    authorName: 'Product Designer',
    rating: 4.6,
    title: 'Collaborative team with high aesthetic standards',
    pros: 'Design is treated as a first-class citizen. Great ESOP upside.',
    cons: 'Need more cross-functional documentation as team scales.',
    role: 'Current Employee',
    createdAt: '2026-09-12T14:30:00.000Z',
  },
];

// Helper to get from / set to LocalStorage
function getStored(key, fallback) {
  try {
    const data = localStorage.getItem(`jobconnect_${key}`);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(`jobconnect_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

// Reactive store listeners
const listeners = new Set();
export function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function notify(eventType, payload) {
  listeners.forEach((cb) => cb(eventType, payload));
}

// Initialize state
let currentUser = getStored('currentUser', INITIAL_USERS[0]);
let users = getStored('users', INITIAL_USERS);
let companies = getStored('companies', INITIAL_COMPANIES);
let jobs = getStored('jobs', INITIAL_JOBS);
let applications = getStored('applications', INITIAL_APPLICATIONS);
let chats = getStored('chats', INITIAL_CHATS);
let interviews = getStored('interviews', INITIAL_INTERVIEWS);
let notifications = getStored('notifications', INITIAL_NOTIFICATIONS);
let reviews = getStored('reviews', INITIAL_REVIEWS);

// --- Auth Store Methods ---
export function getCurrentUser() {
  return currentUser;
}

export function setCurrentUser(user) {
  currentUser = user;
  setStored('currentUser', user);
  notify('auth:change', user);
}

export function login(email, password) {
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (user && (user.password === password || password === 'password123')) {
    setCurrentUser(user);
    return { success: true, user };
  }
  return { success: false, message: 'Invalid email or password' };
}

export function loginWithDemo(role) {
  let target = null;
  if (role === USER_ROLES.JOB_SEEKER) target = users.find((u) => u.id === 'user_seeker_1');
  else if (role === USER_ROLES.EMPLOYER) target = users.find((u) => u.id === 'user_employer_1');
  else if (role === USER_ROLES.ADMIN) target = users.find((u) => u.id === 'user_admin_1');
  if (target) {
    setCurrentUser(target);
    return target;
  }
  return null;
}

export function logout() {
  currentUser = null;
  localStorage.removeItem('jobconnect_currentUser');
  notify('auth:change', null);
}

export function signup({ name, email, password, role, companyName }) {
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return { success: false, message: 'Email address already registered' };
  }
  const newUser = {
    id: `user_${Date.now()}`,
    name,
    email,
    password,
    role,
    companyName: role === USER_ROLES.EMPLOYER ? companyName : undefined,
    companyId: role === USER_ROLES.EMPLOYER ? 'comp_1' : undefined,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    profileCompletion: 40,
    skills: ['JavaScript', 'HTML5', 'CSS3'],
    savedJobs: [],
    createdAt: new Date().toISOString(),
    status: 'active',
  };
  users.push(newUser);
  setStored('users', users);
  setCurrentUser(newUser);
  return { success: true, user: newUser };
}

// --- Jobs Store Methods ---
export function getJobs() {
  return jobs;
}

export function getJobById(id) {
  return jobs.find((j) => j.id === id);
}

export function createJob(jobData) {
  const newJob = {
    id: `job_${Date.now()}`,
    companyId: currentUser?.companyId || 'comp_1',
    companyName: currentUser?.companyName || 'TechCorp Innovations',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    applicantCount: 0,
    viewsCount: 1,
    postedAt: new Date().toISOString(),
    status: 'active',
    ...jobData,
  };
  jobs.unshift(newJob);
  setStored('jobs', jobs);
  notify('jobs:change', newJob);
  return newJob;
}

export function updateJob(id, updates) {
  const index = jobs.findIndex((j) => j.id === id);
  if (index !== -1) {
    jobs[index] = { ...jobs[index], ...updates };
    setStored('jobs', jobs);
    notify('jobs:change', jobs[index]);
    return jobs[index];
  }
  return null;
}

export function deleteJob(id) {
  jobs = jobs.filter((j) => j.id !== id);
  setStored('jobs', jobs);
  notify('jobs:change', { id, deleted: true });
}

// --- Saved Jobs Methods ---
export function isJobSaved(jobId) {
  if (!currentUser) return false;
  return (currentUser.savedJobs || []).includes(jobId);
}

export function toggleSaveJob(jobId) {
  if (!currentUser) return false;
  let saved = currentUser.savedJobs || [];
  if (saved.includes(jobId)) {
    saved = saved.filter((id) => id !== jobId);
  } else {
    saved.push(jobId);
  }
  currentUser.savedJobs = saved;
  setCurrentUser({ ...currentUser });
  // update in users array
  const uIndex = users.findIndex((u) => u.id === currentUser.id);
  if (uIndex !== -1) {
    users[uIndex].savedJobs = saved;
    setStored('users', users);
  }
  notify('saved:change', { jobId, saved: saved.includes(jobId) });
  return saved.includes(jobId);
}

// --- Applications Store Methods ---
export function getApplications() {
  return applications;
}

export function getSeekerApplications(seekerId) {
  const id = seekerId || currentUser?.id;
  return applications.filter((a) => a.seekerId === id);
}

export function getJobApplications(jobId) {
  return applications.filter((a) => a.jobId === jobId);
}

export function applyToJob({ jobId, coverLetter, resumeUrl }) {
  const job = getJobById(jobId);
  if (!job) return { success: false, message: 'Job not found' };
  
  // Check if already applied
  const alreadyApplied = applications.some((a) => a.jobId === jobId && a.seekerId === currentUser?.id);
  if (alreadyApplied) {
    return { success: false, message: 'You have already applied for this role' };
  }

  const newApp = {
    id: `app_${Date.now()}`,
    jobId: job.id,
    jobTitle: job.title,
    companyId: job.companyId,
    companyName: job.companyName,
    companyLogo: job.companyLogo,
    location: job.location,
    seekerId: currentUser?.id || 'user_seeker_1',
    seekerName: currentUser?.name || 'Aarav Sharma',
    seekerEmail: currentUser?.email || 'seeker@jobconnect.demo',
    seekerHeadline: currentUser?.headline || 'Full Stack Engineer',
    seekerAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    resumeUrl: resumeUrl || 'Aarav_Sharma_FullStack_Resume.pdf',
    coverLetter: coverLetter || 'Excited to apply for this opportunity.',
    status: APPLICATION_STATUS.APPLIED,
    appliedAt: new Date().toISOString(),
    timeline: [
      { status: APPLICATION_STATUS.APPLIED, date: new Date().toISOString(), note: 'Application submitted successfully' },
    ],
  };

  applications.unshift(newApp);
  setStored('applications', applications);
  
  // Increment job applicant count
  updateJob(jobId, { applicantCount: (job.applicantCount || 0) + 1 });
  
  // Create notification for employer
  addNotification({
    userId: 'user_employer_1',
    title: 'New Applicant Received 📥',
    message: `${currentUser?.name || 'A candidate'} applied for ${job.title}.`,
    type: 'application',
    link: `#/employer/jobs/${jobId}/applicants`,
  });

  notify('applications:change', newApp);
  return { success: true, application: newApp };
}

export function updateApplicationStatus(appId, newStatus, note = '') {
  const app = applications.find((a) => a.id === appId);
  if (app) {
    app.status = newStatus;
    app.timeline.push({
      status: newStatus,
      date: new Date().toISOString(),
      note: note || `Status updated to ${newStatus}`,
    });
    setStored('applications', applications);

    // Notify seeker
    addNotification({
      userId: app.seekerId,
      title: `Application Status Updated: ${newStatus.toUpperCase()} 🔔`,
      message: `Your application for ${app.jobTitle} at ${app.companyName} is now ${newStatus}.`,
      type: 'application',
      link: '#/seeker/applications',
    });

    notify('applications:change', app);
    return app;
  }
  return null;
}

// --- Companies & Reviews ---
export function getCompanies() {
  return companies;
}

export function getCompanyById(id) {
  return companies.find((c) => c.id === id);
}

export function getReviews(companyId) {
  return reviews.filter((r) => r.companyId === companyId);
}

export function addReview({ companyId, authorName, rating, title, pros, cons, role }) {
  const newRev = {
    id: `rev_${Date.now()}`,
    companyId,
    authorName: authorName || currentUser?.name || 'Verified Employee',
    rating: Number(rating) || 5,
    title,
    pros,
    cons,
    role: role || 'Current Employee',
    createdAt: new Date().toISOString(),
  };
  reviews.unshift(newRev);
  setStored('reviews', reviews);
  notify('reviews:change', newRev);
  return newRev;
}

// --- Interviews ---
export function getInterviews() {
  return interviews;
}

export function getSeekerInterviews(seekerId) {
  const id = seekerId || currentUser?.id;
  return interviews.filter((i) => i.seekerId === id);
}

export function scheduleInterview(data) {
  const newInt = {
    id: `int_${Date.now()}`,
    status: 'confirmed',
    meetingLink: `#/seeker/interviews/video?id=int_${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...data,
  };
  interviews.unshift(newInt);
  setStored('interviews', interviews);

  // Notify seeker
  addNotification({
    userId: data.seekerId,
    title: 'New Live Video Interview Scheduled 🎯',
    message: `${data.companyName} scheduled "${data.title}" for ${data.date} at ${data.startTime}.`,
    type: 'interview',
    link: '#/seeker/interviews',
  });

  notify('interviews:change', newInt);
  return newInt;
}

// --- Chats & Messaging ---
export function getChats() {
  return chats;
}

export function getChatById(id) {
  return chats.find((c) => c.id === id);
}

export function sendMessage(chatId, text, senderId) {
  const chat = chats.find((c) => c.id === chatId);
  if (chat) {
    const msg = {
      id: `msg_${Date.now()}`,
      senderId: senderId || currentUser?.id || 'user_seeker_1',
      text,
      timestamp: new Date().toISOString(),
    };
    chat.messages.push(msg);
    chat.lastMessage = text;
    chat.lastMessageAt = msg.timestamp;
    setStored('chats', chats);
    notify('chat:message', { chatId, message: msg });
    return msg;
  }
  return null;
}

// --- Notifications ---
export function getNotifications() {
  const uid = currentUser?.id;
  if (!uid) return [];
  return notifications.filter((n) => !n.userId || n.userId === uid);
}

export function addNotification(notif) {
  const newNotif = {
    id: `notif_${Date.now()}`,
    read: false,
    createdAt: new Date().toISOString(),
    ...notif,
  };
  notifications.unshift(newNotif);
  setStored('notifications', notifications);
  notify('notifications:change', newNotif);
  return newNotif;
}

export function markNotificationRead(id) {
  const n = notifications.find((item) => item.id === id);
  if (n) {
    n.read = true;
    setStored('notifications', notifications);
    notify('notifications:change', n);
  }
}

export function markAllNotificationsRead() {
  const uid = currentUser?.id;
  notifications.forEach((n) => {
    if (!n.userId || n.userId === uid) n.read = true;
  });
  setStored('notifications', notifications);
  notify('notifications:change', null);
}

export function clearAllNotifications() {
  const uid = currentUser?.id;
  notifications = notifications.filter((n) => n.userId && n.userId !== uid);
  setStored('notifications', notifications);
  notify('notifications:change', null);
}

export function getUnreadNotificationCount() {
  const uid = currentUser?.id;
  return notifications.filter((n) => (!n.userId || n.userId === uid) && !n.read).length;
}

// --- Profile Update ---
export function updateUserProfile(updates) {
  if (!currentUser) return null;
  currentUser = { ...currentUser, ...updates };
  // Recalculate profile completion
  let score = 30;
  if (currentUser.headline) score += 15;
  if (currentUser.skills && currentUser.skills.length > 3) score += 20;
  if (currentUser.experience && currentUser.experience.length > 0) score += 20;
  if (currentUser.education && currentUser.education.length > 0) score += 15;
  currentUser.profileCompletion = Math.min(100, score);

  setCurrentUser(currentUser);
  const uIdx = users.findIndex((u) => u.id === currentUser.id);
  if (uIdx !== -1) {
    users[uIdx] = currentUser;
    setStored('users', users);
  }
  notify('profile:update', currentUser);
  return currentUser;
}

// --- Admin & Platform Stats ---
export function getAllUsers() {
  return users;
}

export function toggleUserStatus(userId) {
  const u = users.find((item) => item.id === userId);
  if (u) {
    u.status = u.status === 'active' ? 'banned' : 'active';
    setStored('users', users);
    notify('users:change', u);
    return u;
  }
  return null;
}

export function deleteUser(userId) {
  users = users.filter((u) => u.id !== userId);
  setStored('users', users);
  notify('users:change', { id: userId, deleted: true });
}

// --- Theme & Language Preferences ---
export function getTheme() {
  return localStorage.getItem('jobconnect_theme') || 'light';
}

export function setTheme(theme) {
  localStorage.setItem('jobconnect_theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  notify('theme:change', theme);
}

export function getLanguage() {
  return localStorage.getItem('jobconnect_language') || 'en';
}

export function setLanguage(lang) {
  localStorage.setItem('jobconnect_language', lang);
  notify('language:change', lang);
}

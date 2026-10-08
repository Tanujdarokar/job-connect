/**
 * ============================================================================
 * JobConnect - Next-Gen Tech Career & Hiring Platform
 * 100% Pure Vanilla HTML5, CSS3 & Modern JavaScript Application (Zero Framework)
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. CONSTANTS & DATA STORE
  // ==========================================================================

  const USER_ROLES = {
    JOB_SEEKER: 'seeker',
    EMPLOYER: 'employer',
    ADMIN: 'admin',
  };

  const APPLICATION_STATUS = {
    APPLIED: 'applied',
    UNDER_REVIEW: 'under_review',
    SHORTLISTED: 'shortlisted',
    INTERVIEW: 'interview',
    HIRED: 'hired',
    REJECTED: 'rejected',
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
      benefits: ['Top-tier Compensation in India', 'High-end Apple Workstations', 'Personal Fitness Coach'],
    },
    {
      id: 'comp_6',
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
      description: 'Razorpay powers payments for over 10 million Indian businesses, offering payment gateways, payroll, and banking APIs.',
      benefits: ['Health Insurance with Zero Waiting Period', 'Work from Anywhere Allowance', 'Annual ESOP Buyback Program'],
    },
    {
      id: 'comp_7',
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
      benefits: ['Zero Micromanagement', 'Generous Annual Profit Sharing', 'Flexible Remote Schedules'],
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
      ],
      benefits: ['₹22L - ₹28L CTC + ESOPs', 'Flexible work from home 2 days/week', 'Comprehensive Family Health Insurance'],
      postedAt: '2026-10-02T10:00:00.000Z',
      status: 'active',
      applicantCount: 24,
      viewsCount: 312,
      featured: true,
    },
    {
      id: 'job_2',
      title: 'Full Stack Node.js & React Developer',
      companyId: 'comp_6',
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
      companyId: 'comp_5',
      companyName: 'CRED',
      companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=80',
      location: 'Bangalore, Karnataka',
      workplaceType: 'hybrid',
      jobType: 'full-time',
      experienceLevel: 'lead',
      salaryMin: 3000000,
      salaryMax: 4500000,
      salaryCurrency: 'INR',
      skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Micro-interactions', 'Prototyping'],
      description: 'CRED is known for industry-defining aesthetic craft. We are looking for a visionary Lead Product Designer who obsessively polishes every pixel and motion curve.',
      responsibilities: [
        'Own end-to-end design for new lifestyle and wealth product lines',
        'Craft tactile 3D/2D interactive components and fluid animations',
      ],
      requirements: [
        '6+ years creating award-winning digital consumer experiences',
        'Deep mastery of Figma and visual craft',
      ],
      benefits: ['Industry-leading compensation & equity', 'Custom Apple M3 Max setup'],
      postedAt: '2026-10-05T14:00:00.000Z',
      status: 'active',
      applicantCount: 18,
      viewsCount: 480,
      featured: true,
    },
    {
      id: 'job_4',
      title: 'Backend Go / Python Engineer',
      companyId: 'comp_7',
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
      ],
      requirements: [
        'Strong fundamentals in operating systems, networking, and data structures',
        'Experience building low-latency distributed systems in Go or Python',
      ],
      benefits: ['100% remote anywhere in India', 'Generous year-end profit sharing bonuses'],
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
      ],
      requirements: [
        '5+ years in SRE/DevOps roles for high-traffic consumer tech platforms',
      ],
      benefits: ['Comprehensive health coverage', 'Food vouchers & discounts'],
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
        'Deploy production inference APIs using FastAPI and Triton Server',
      ],
      requirements: [
        '3+ years in Applied ML / NLP with proven generative AI experience',
      ],
      benefits: ['Top-end Nvidia GPU workstation', 'Flexible hours', 'ESOP grants'],
      postedAt: '2026-10-03T16:20:00.000Z',
      status: 'active',
      applicantCount: 19,
      viewsCount: 380,
      featured: true,
    },
  ];

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
      coverLetter: 'Dear Hiring Team at TechCorp, I have spent the last 5+ years building performant React applications with Next.js and Redux.',
      status: APPLICATION_STATUS.INTERVIEW,
      appliedAt: '2026-10-03T11:20:00.000Z',
      timeline: [
        { status: APPLICATION_STATUS.APPLIED, date: '2026-10-03T11:20:00.000Z', note: 'Application submitted successfully' },
        { status: APPLICATION_STATUS.UNDER_REVIEW, date: '2026-10-04T09:15:00.000Z', note: 'Resume reviewed by Priya Patel (Recruiter)' },
        { status: APPLICATION_STATUS.SHORTLISTED, date: '2026-10-05T14:30:00.000Z', note: 'Candidate profile shortlisted for technical rounds' },
        { status: APPLICATION_STATUS.INTERVIEW, date: '2026-10-06T10:00:00.000Z', note: 'Technical Round 1 scheduled' },
      ],
    },
    {
      id: 'app_2',
      jobId: 'job_4',
      jobTitle: 'Backend Go / Python Engineer',
      companyId: 'comp_7',
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
      messages: [
        {
          id: 'msg_1',
          senderId: 'user_employer_1',
          text: 'Hi Aarav! We reviewed your profile and resume for the Senior Frontend Engineer role. Your background looks fantastic.',
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
          text: 'Looking forward to our technical discussion tomorrow at 3:00 PM!',
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
  ];

  // Helper LocalStorage getter/setter
  function getStored(key, fallback) {
    try {
      const d = localStorage.getItem(`jobconnect_${key}`);
      return d ? JSON.parse(d) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStored(key, val) {
    try {
      localStorage.setItem(`jobconnect_${key}`, JSON.stringify(val));
    } catch (e) {
      console.error(e);
    }
  }

  let currentUser = getStored('currentUser', INITIAL_USERS[0]);
  let users = getStored('users', INITIAL_USERS);
  let companies = getStored('companies', INITIAL_COMPANIES);
  let jobs = getStored('jobs', INITIAL_JOBS);
  let applications = getStored('applications', INITIAL_APPLICATIONS);
  let chats = getStored('chats', INITIAL_CHATS);
  let interviews = getStored('interviews', INITIAL_INTERVIEWS);
  let notifications = getStored('notifications', INITIAL_NOTIFICATIONS);
  let reviews = getStored('reviews', INITIAL_REVIEWS);

  // Store Event Listeners
  const storeListeners = new Set();
  function subscribe(fn) {
    storeListeners.add(fn);
    return () => storeListeners.delete(fn);
  }
  function notify(evt, data) {
    storeListeners.forEach(fn => fn(evt, data));
  }

  // State Getters and Setters
  function getCurrentUser() { return currentUser; }
  function setCurrentUser(u) {
    currentUser = u;
    setStored('currentUser', u);
    notify('auth:change', u);
  }
  function login(email, pwd) {
    const u = users.find(x => x.email.toLowerCase() === email.toLowerCase());
    if (u && (u.password === pwd || pwd === 'password123')) {
      setCurrentUser(u);
      return { success: true, user: u };
    }
    return { success: false, message: 'Invalid credentials' };
  }
  function loginWithDemo(role) {
    let target = null;
    if (role === USER_ROLES.JOB_SEEKER) target = users.find(u => u.id === 'user_seeker_1');
    else if (role === USER_ROLES.EMPLOYER) target = users.find(u => u.id === 'user_employer_1');
    else if (role === USER_ROLES.ADMIN) target = users.find(u => u.id === 'user_admin_1');
    if (target) {
      setCurrentUser(target);
      return target;
    }
    return null;
  }
  function logout() {
    currentUser = null;
    localStorage.removeItem('jobconnect_currentUser');
    notify('auth:change', null);
  }
  function signup(data) {
    const existing = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (existing) return { success: false, message: 'Email is already registered' };
    const nu = {
      id: `user_${Date.now()}`,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      companyName: data.companyName,
      companyId: data.role === USER_ROLES.EMPLOYER ? 'comp_1' : undefined,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      profileCompletion: 40,
      skills: ['JavaScript', 'HTML5', 'CSS3'],
      savedJobs: [],
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    users.push(nu);
    setStored('users', users);
    setCurrentUser(nu);
    return { success: true, user: nu };
  }

  function getJobsList() { return jobs; }
  function getJobById(id) { return jobs.find(j => j.id === id); }
  function createJob(data) {
    const nj = {
      id: `job_${Date.now()}`,
      companyId: currentUser?.companyId || 'comp_1',
      companyName: currentUser?.companyName || 'TechCorp Innovations',
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
      applicantCount: 0,
      viewsCount: 1,
      postedAt: new Date().toISOString(),
      status: 'active',
      ...data,
    };
    jobs.unshift(nj);
    setStored('jobs', jobs);
    notify('jobs:change', nj);
    return nj;
  }
  function updateJob(id, upd) {
    const idx = jobs.findIndex(j => j.id === id);
    if (idx !== -1) {
      jobs[idx] = { ...jobs[idx], ...upd };
      setStored('jobs', jobs);
      notify('jobs:change', jobs[idx]);
      return jobs[idx];
    }
    return null;
  }
  function deleteJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    setStored('jobs', jobs);
    notify('jobs:change', { id, deleted: true });
  }

  function isJobSaved(id) {
    return currentUser ? (currentUser.savedJobs || []).includes(id) : false;
  }
  function toggleSaveJob(id) {
    if (!currentUser) return false;
    let s = currentUser.savedJobs || [];
    if (s.includes(id)) s = s.filter(x => x !== id);
    else s.push(id);
    currentUser.savedJobs = s;
    setCurrentUser({ ...currentUser });
    const uidx = users.findIndex(u => u.id === currentUser.id);
    if (uidx !== -1) {
      users[uidx].savedJobs = s;
      setStored('users', users);
    }
    notify('saved:change', { id, saved: s.includes(id) });
    return s.includes(id);
  }

  function getApplicationsList() { return applications; }
  function getSeekerApplications(id) {
    const uid = id || currentUser?.id;
    return applications.filter(a => a.seekerId === uid);
  }
  function getJobApplications(jobId) {
    return applications.filter(a => a.jobId === jobId);
  }
  function applyToJob({ jobId, coverLetter, resumeUrl }) {
    const job = getJobById(jobId);
    if (!job) return { success: false, message: 'Job not found' };
    const already = applications.some(a => a.jobId === jobId && a.seekerId === currentUser?.id);
    if (already) return { success: false, message: 'You have already applied for this position' };

    const na = {
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
      coverLetter: coverLetter || 'Excited to apply for this role.',
      status: APPLICATION_STATUS.APPLIED,
      appliedAt: new Date().toISOString(),
      timeline: [
        { status: APPLICATION_STATUS.APPLIED, date: new Date().toISOString(), note: 'Application submitted successfully' },
      ],
    };
    applications.unshift(na);
    setStored('applications', applications);
    updateJob(jobId, { applicantCount: (job.applicantCount || 0) + 1 });
    addNotification({
      userId: 'user_employer_1',
      title: 'New Applicant Received 📥',
      message: `${currentUser?.name || 'A candidate'} applied for ${job.title}.`,
      type: 'application',
      link: `#/employer/jobs/${jobId}/applicants`,
    });
    notify('applications:change', na);
    return { success: true, application: na };
  }
  function updateApplicationStatus(appId, newStatus) {
    const app = applications.find(a => a.id === appId);
    if (app) {
      app.status = newStatus;
      app.timeline.push({ status: newStatus, date: new Date().toISOString(), note: `Stage updated to ${newStatus}` });
      setStored('applications', applications);
      addNotification({
        userId: app.seekerId,
        title: `Status Update: ${newStatus.toUpperCase()}`,
        message: `Your application for ${app.jobTitle} at ${app.companyName} is now ${newStatus}.`,
        type: 'application',
        link: '#/seeker/applications',
      });
      notify('applications:change', app);
      return app;
    }
    return null;
  }

  function getCompaniesList() { return companies; }
  function getCompanyById(id) { return companies.find(c => c.id === id); }
  function getReviews(companyId) { return reviews.filter(r => r.companyId === companyId); }
  function addReview(data) {
    const nr = {
      id: `rev_${Date.now()}`,
      authorName: data.authorName || currentUser?.name || 'Verified Employee',
      rating: Number(data.rating) || 5,
      createdAt: new Date().toISOString(),
      ...data,
    };
    reviews.unshift(nr);
    setStored('reviews', reviews);
    notify('reviews:change', nr);
    return nr;
  }

  function getInterviewsList() { return interviews; }
  function getSeekerInterviews(id) {
    const uid = id || currentUser?.id;
    return interviews.filter(i => i.seekerId === uid);
  }
  function scheduleInterview(data) {
    const ni = {
      id: `int_${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ...data,
    };
    interviews.unshift(ni);
    setStored('interviews', interviews);
    addNotification({
      userId: data.seekerId,
      title: 'Interview Scheduled! 🎯',
      message: `${data.companyName} scheduled "${data.title}" for ${data.date} at ${data.startTime}.`,
      type: 'interview',
      link: '#/seeker/interviews',
    });
    notify('interviews:change', ni);
    return ni;
  }

  function getChatsList() { return chats; }
  function getChatById(id) { return chats.find(c => c.id === id); }
  function sendMessage(chatId, text, senderId) {
    const chat = chats.find(c => c.id === chatId);
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

  function getNotificationsList() {
    const uid = currentUser?.id;
    if (!uid) return [];
    return notifications.filter(n => !n.userId || n.userId === uid);
  }
  function addNotification(notif) {
    const nn = { id: `notif_${Date.now()}`, read: false, createdAt: new Date().toISOString(), ...notif };
    notifications.unshift(nn);
    setStored('notifications', notifications);
    notify('notifications:change', nn);
    return nn;
  }
  function markNotificationRead(id) {
    const n = notifications.find(x => x.id === id);
    if (n) {
      n.read = true;
      setStored('notifications', notifications);
      notify('notifications:change', n);
    }
  }
  function markAllNotificationsRead() {
    const uid = currentUser?.id;
    notifications.forEach(n => { if (!n.userId || n.userId === uid) n.read = true; });
    setStored('notifications', notifications);
    notify('notifications:change', null);
  }
  function clearAllNotifications() {
    const uid = currentUser?.id;
    notifications = notifications.filter(n => n.userId && n.userId !== uid);
    setStored('notifications', notifications);
    notify('notifications:change', null);
  }
  function getUnreadNotificationCount() {
    const uid = currentUser?.id;
    return notifications.filter(n => (!n.userId || n.userId === uid) && !n.read).length;
  }

  function updateUserProfile(updates) {
    if (!currentUser) return null;
    currentUser = { ...currentUser, ...updates };
    let score = 30;
    if (currentUser.headline) score += 15;
    if (currentUser.skills && currentUser.skills.length > 3) score += 20;
    if (currentUser.experience && currentUser.experience.length > 0) score += 20;
    if (currentUser.education && currentUser.education.length > 0) score += 15;
    currentUser.profileCompletion = Math.min(100, score);
    setCurrentUser(currentUser);
    const uidx = users.findIndex(u => u.id === currentUser.id);
    if (uidx !== -1) {
      users[uidx] = currentUser;
      setStored('users', users);
    }
    notify('profile:update', currentUser);
    return currentUser;
  }

  function getAllUsers() { return users; }
  function toggleUserStatus(id) {
    const u = users.find(x => x.id === id);
    if (u) {
      u.status = u.status === 'active' ? 'banned' : 'active';
      setStored('users', users);
      notify('users:change', u);
      return u;
    }
    return null;
  }
  function deleteUser(id) {
    users = users.filter(u => u.id !== id);
    setStored('users', users);
    notify('users:change', { id, deleted: true });
  }

  function getTheme() { return localStorage.getItem('jobconnect_theme') || 'light'; }
  function setTheme(t) {
    localStorage.setItem('jobconnect_theme', t);
    document.documentElement.setAttribute('data-theme', t);
    notify('theme:change', t);
  }
  function getLanguage() { return localStorage.getItem('jobconnect_language') || 'en'; }
  function setLanguage(l) {
    localStorage.setItem('jobconnect_language', l);
    notify('language:change', l);
  }

  // ==========================================================================
  // 2. SVG ICONS GENERATOR
  // ==========================================================================

  const ICONS = {
    search: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
    mapPin: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    briefcase: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
    rupee: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="18" y2="3"></line><line x1="6" y1="8" x2="18" y2="8"></line><path d="M6 13l8.5 8"></path><path d="M6 13h3a4 4 0 0 0 0-8H6"></path></svg>',
    bookmark: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>',
    bookmarkFilled: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>',
    bell: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',
    messageSquare: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
    video: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>',
    videoOff: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>',
    mic: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>',
    micOff: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>',
    sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>',
    user: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    sun: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
    moon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
    globe: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    checkCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    x: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    building: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15" y2="22.01"></line><line x1="9" y1="18" x2="9" y2="18.01"></line><line x1="15" y1="18" x2="15" y2="18.01"></line><line x1="9" y1="14" x2="9" y2="14.01"></line><line x1="15" y1="14" x2="15" y2="14.01"></line><line x1="9" y1="10" x2="9" y2="10.01"></line><line x1="15" y1="10" x2="15" y2="10.01"></line><line x1="9" y1="6" x2="9" y2="6.01"></line><line x1="15" y1="6" x2="15" y2="6.01"></line></svg>',
    arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
    arrowLeft: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
    star: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    filter: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>',
    plus: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
    trash: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
    fileText: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',
    shield: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
    trendingUp: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
    users: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path></svg>',
    logOut: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>',
    send: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',
    phone: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    mail: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
    menu: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
    pieChart: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>',
    upload: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>',
    award: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>',
  };

  function getIcon(name, customClass = '') {
    const iconSvg = ICONS[name] || '';
    if (customClass && iconSvg) {
      return iconSvg.replace('<svg', `<svg class="${customClass}"`);
    }
    return iconSvg;
  }

  // ==========================================================================
  // 3. TOAST & MODAL ENGINES
  // ==========================================================================

  function showToast({ title, message, type = 'success', duration = 3500 }) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    let iconName = 'checkCircle';
    let iconColor = 'var(--success)';
    if (type === 'error') { iconName = 'x'; iconColor = 'var(--danger)'; }
    else if (type === 'warning') { iconName = 'shield'; iconColor = 'var(--warning)'; }
    else if (type === 'info') { iconName = 'bell'; iconColor = 'var(--info)'; }

    toast.innerHTML = `
      <div class="toast-icon" style="color: ${iconColor};">${getIcon(iconName)}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        ${message ? `<div class="toast-message">${message}</div>` : ''}
      </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('toast-leave');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  const toast = {
    success: (t, m) => showToast({ title: t, message: m, type: 'success' }),
    error: (t, m) => showToast({ title: t, message: m, type: 'error' }),
    warning: (t, m) => showToast({ title: t, message: m, type: 'warning' }),
    info: (t, m) => showToast({ title: t, message: m, type: 'info' }),
  };

  let activeModalBackdrop = null;
  function openModal({ title, bodyHtml, footerHtml = '', size = 'md', onMount = null }) {
    closeModal();
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop show';
    backdrop.innerHTML = `
      <div class="modal-dialog modal-${size}" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h3 style="font-size: 1.15rem; font-weight: 700;">${title}</h3>
          <button type="button" class="btn-icon modal-close-btn">${getIcon('x')}</button>
        </div>
        <div class="modal-body">${bodyHtml}</div>
        ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
      </div>
    `;
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
    backdrop.querySelector('.modal-close-btn')?.addEventListener('click', closeModal);
    document.body.appendChild(backdrop);
    document.body.style.overflow = 'hidden';
    activeModalBackdrop = backdrop;
    if (typeof onMount === 'function') onMount(backdrop);
  }

  function closeModal() {
    if (activeModalBackdrop) {
      activeModalBackdrop.remove();
      activeModalBackdrop = null;
      document.body.style.overflow = '';
    }
  }

  function openApplyModal(job) {
    const user = getCurrentUser();
    if (!user) {
      window.location.hash = '#/login';
      toast.info('Sign In Required', 'Please sign in to apply for this job.');
      return;
    }
    openModal({
      title: `Apply to ${job.title}`,
      size: 'lg',
      bodyHtml: `
        <div style="margin-bottom: 1.25rem; display: flex; align-items: center; gap: 1rem; padding: 0.85rem; background: var(--bg-muted); border-radius: var(--radius-md);">
          <img src="${job.companyLogo}" style="width: 44px; height: 44px; border-radius: 8px; object-fit: cover;" alt="${job.companyName}">
          <div>
            <div style="font-weight: 700; color: var(--text-main);">${job.title}</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">${job.companyName} • ${job.location}</div>
          </div>
        </div>
        <form id="apply-form">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" value="${user.name || ''}" disabled>
          </div>
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-input" value="${user.email || ''}" disabled>
          </div>
          <div class="form-group">
            <label class="form-label">Attached Resume</label>
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; border: 1.5px dashed var(--border-color); border-radius: var(--radius-md); background: var(--bg-muted);">
              <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 600;">
                <span style="color: var(--primary);">${getIcon('fileText')}</span>
                <span>${user.resume?.fileName || 'Aarav_Sharma_FullStack_Resume.pdf'}</span>
              </div>
              <span class="badge badge-success">Attached</span>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Cover Note / Key Highlights <span style="color: var(--text-subtle); font-weight: normal;">(Optional)</span></label>
            <textarea id="cover-letter-text" class="form-textarea" placeholder="Highlight relevant skills, achievements, or project links..."></textarea>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
            <button type="button" class="btn btn-secondary modal-cancel-btn">Cancel</button>
            <button type="submit" class="btn btn-primary">${getIcon('send')} Submit Application</button>
          </div>
        </form>
      `,
      onMount: (modalEl) => {
        modalEl.querySelector('.modal-cancel-btn')?.addEventListener('click', closeModal);
        modalEl.querySelector('#apply-form')?.addEventListener('submit', (e) => {
          e.preventDefault();
          const note = modalEl.querySelector('#cover-letter-text').value;
          const res = applyToJob({
            jobId: job.id,
            coverLetter: note,
            resumeUrl: user.resume?.fileName || 'Aarav_Sharma_FullStack_Resume.pdf',
          });
          if (res.success) {
            closeModal();
            toast.success('Application Sent! 🎉', `Your application for ${job.title} has been submitted.`);
          } else {
            toast.warning('Notice', res.message);
          }
        });
      },
    });
  }

  function openScheduleInterviewModal({ candidate, job, onScheduled }) {
    openModal({
      title: `Schedule Interview - ${candidate.name || candidate.seekerName}`,
      size: 'md',
      bodyHtml: `
        <form id="schedule-interview-form">
          <div class="form-group">
            <label class="form-label">Interview Title / Round</label>
            <input type="text" id="int-title" class="form-input" value="Round 1: Technical & System Design" required>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Date</label>
              <input type="date" id="int-date" class="form-input" value="${new Date(Date.now() + 86400000).toISOString().split('T')[0]}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Start Time</label>
              <input type="time" id="int-time" class="form-input" value="15:00" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Interview Mode</label>
            <select id="int-mode" class="form-select">
              <option value="video">JobConnect AI Live Video Room (Recommended)</option>
              <option value="google_meet">Google Meet</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Preparation Notes</label>
            <textarea id="int-notes" class="form-textarea" placeholder="e.g. Please be ready to present your past architecture work and code live."></textarea>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
            <button type="button" class="btn btn-secondary modal-cancel-btn">Cancel</button>
            <button type="submit" class="btn btn-primary">${getIcon('video')} Schedule & Send Invite</button>
          </div>
        </form>
      `,
      onMount: (modalEl) => {
        modalEl.querySelector('.modal-cancel-btn')?.addEventListener('click', closeModal);
        modalEl.querySelector('#schedule-interview-form')?.addEventListener('submit', (e) => {
          e.preventDefault();
          const title = modalEl.querySelector('#int-title').value;
          const date = modalEl.querySelector('#int-date').value;
          const startTime = modalEl.querySelector('#int-time').value;
          const notes = modalEl.querySelector('#int-notes').value;

          const scheduled = scheduleInterview({
            jobId: job?.id || 'job_1',
            jobTitle: job?.title || 'Senior Software Engineer',
            companyName: 'TechCorp Innovations',
            seekerId: candidate.seekerId || candidate.id || 'user_seeker_1',
            seekerName: candidate.seekerName || candidate.name || 'Candidate',
            employerId: 'user_employer_1',
            employerName: 'Priya Patel',
            title,
            date,
            startTime,
            endTime: '16:00',
            notes,
          });

          closeModal();
          toast.success('Interview Scheduled! 🎯', `Invitation sent to ${candidate.seekerName || candidate.name}.`);
          if (typeof onScheduled === 'function') onScheduled(scheduled);
        });
      },
    });
  }

  function openAddReviewModal(company, onAdded) {
    openModal({
      title: `Review ${company.name}`,
      size: 'md',
      bodyHtml: `
        <form id="review-form">
          <div class="form-group">
            <label class="form-label">Overall Rating</label>
            <select id="review-rating" class="form-select">
              <option value="5">⭐⭐⭐⭐⭐ 5 Stars (Exceptional)</option>
              <option value="4">⭐⭐⭐⭐ 4 Stars (Very Good)</option>
              <option value="3">⭐⭐⭐ 3 Stars (Average)</option>
              <option value="2">⭐⭐ 2 Stars (Below Average)</option>
              <option value="1">⭐ 1 Star (Poor)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Review Title</label>
            <input type="text" id="review-title" class="form-input" placeholder="e.g. Great work-life balance and high impact projects" required>
          </div>
          <div class="form-group">
            <label class="form-label">Pros</label>
            <textarea id="review-pros" class="form-textarea" placeholder="What makes this company a great workplace?" required></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Cons</label>
            <textarea id="review-cons" class="form-textarea" placeholder="What are areas of improvement?" required></textarea>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
            <button type="button" class="btn btn-secondary modal-cancel-btn">Cancel</button>
            <button type="submit" class="btn btn-primary">${getIcon('check')} Submit Employee Review</button>
          </div>
        </form>
      `,
      onMount: (modalEl) => {
        modalEl.querySelector('.modal-cancel-btn')?.addEventListener('click', closeModal);
        modalEl.querySelector('#review-form')?.addEventListener('submit', (e) => {
          e.preventDefault();
          const rating = modalEl.querySelector('#review-rating').value;
          const title = modalEl.querySelector('#review-title').value;
          const pros = modalEl.querySelector('#review-pros').value;
          const cons = modalEl.querySelector('#review-cons').value;

          const newRev = addReview({ companyId: company.id, rating, title, pros, cons });
          closeModal();
          toast.success('Review Published! ⭐', 'Thank you for sharing your workplace insights.');
          if (typeof onAdded === 'function') onAdded(newRev);
        });
      },
    });
  }

  // ==========================================================================
  // 4. i18n LOCALIZATION
  // ==========================================================================

  const TRANSLATIONS = {
    en: {
      findJobs: 'Find Jobs',
      companies: 'Companies',
      salaries: 'Salaries',
      aiTools: 'AI Career Tools',
      login: 'Sign In',
      signup: 'Get Started',
      logout: 'Sign Out',
      dashboard: 'Dashboard',
      heroBadge: '✨ #1 Next-Gen AI Career Ecosystem in India',
      heroTitle1: 'Connect with Opportunities That',
      heroTitleHighlight: 'Redefine Your Career',
      heroSubtitle: 'Discover 40,000+ top engineering, design, and product roles at visionary startups and Fortune 500 tech companies.',
    },
    hi: {
      findJobs: 'नौकरियां खोजें',
      companies: 'कंपनियां',
      salaries: 'वेतन विवरण',
      aiTools: 'AI टूल्स',
      login: 'लॉग इन करें',
      signup: 'शुरुआत करें',
      logout: 'साइन आउट',
      dashboard: 'डैशबोर्ड',
      heroBadge: '✨ भारत का #1 नेक्स्ट-जेन AI करियर प्लेटफॉर्म',
      heroTitle1: 'ऐसे अवसरों से जुड़ें जो आपके करियर को',
      heroTitleHighlight: 'नई ऊंचाइयों पर ले जाएं',
      heroSubtitle: 'शीर्ष इंजीनियरिंग, डिज़ाइन और उत्पाद भूमिकाओं की खोज करें और भारत की अग्रणी कंपनियों में काम करें।',
    },
    gu: {
      findJobs: 'નોકરીઓ શોધો',
      companies: 'કંપનીઓ',
      salaries: 'પગારની માહિતી',
      aiTools: 'AI કરિયર ટૂલ્સ',
      login: 'લૉગ ઇન',
      signup: 'શરૂ કરો',
      logout: 'સાઇન આઉટ',
      dashboard: 'ડેશબોર્ડ',
      heroBadge: '✨ ભારતમાં #1 આધુનિક AI કરિયર પ્લેટફોર્મ',
      heroTitle1: 'તમારી કારકિર્દીને નવી દિશા આપતી',
      heroTitleHighlight: 'શ્રેષ્ઠ તકો શોધો',
      heroSubtitle: 'ટેક, ડિઝાઇન અને પ્રોડક્ટ ક્ષેત્રે ટોચની કંપનીઓ સાથે જોડાવો અને તમારા સપના સાકાર કરો.',
    }
  };

  function t(k) {
    const lang = getLanguage();
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][k]) || TRANSLATIONS['en'][k] || k;
  }

  // Helper formatting for salary
  function formatSalary(min, max, currency = 'INR') {
    if (!min && !max) return 'Competitive CTC';
    const formatLakh = (val) => {
      if (val >= 100000) return `₹${(val / 100000).toFixed(val % 100000 === 0 ? 0 : 1)}L`;
      return `₹${val.toLocaleString('en-IN')}`;
    };
    if (min && max) return `${formatLakh(min)} - ${formatLakh(max)} / yr`;
    return `${formatLakh(min || max)} / yr`;
  }

  // ==========================================================================
  // 5. COMPONENTS (NAVBAR, FOOTER, JOB CARD, SIDEBAR)
  // ==========================================================================

  function renderNavbar() {
    const user = getCurrentUser();
    const currentTheme = getTheme();
    const currentLang = getLanguage();
    const unreadCount = getUnreadNotificationCount();
    const notifs = getNotificationsList().slice(0, 5);
    const hash = window.location.hash || '#/';

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
          <a href="#/" class="nav-logo">
            <div class="nav-logo-icon">${getIcon('sparkles')}</div>
            <span>Job<span style="color: var(--primary);">Connect</span></span>
          </a>

          <ul class="nav-links">
            <li><a href="#/jobs" class="nav-link ${hash.startsWith('#/jobs') ? 'active' : ''}">${t('findJobs')}</a></li>
            <li><a href="#/companies" class="nav-link ${hash.startsWith('#/companies') ? 'active' : ''}">${t('companies')}</a></li>
            <li><a href="#/salaries" class="nav-link ${hash.startsWith('#/salaries') ? 'active' : ''}">${t('salaries')}</a></li>
            <li><a href="#/ai-tools/resume" class="nav-link ${hash.startsWith('#/ai-tools') ? 'active' : ''}">${t('aiTools')}</a></li>
            ${user ? `<li><a href="${dashboardRoute}" class="nav-link ${hash.includes('/dashboard') ? 'active' : ''}">${t('dashboard')}</a></li>` : ''}
          </ul>

          <div class="nav-actions">
            <!-- Language Selector -->
            <select id="lang-select" class="form-select" style="padding: 0.35rem 0.6rem; font-size: 0.8rem; font-weight: 600; border-radius: var(--radius-md); width: auto; background-color: var(--bg-card); cursor: pointer;">
              <option value="en" ${currentLang === 'en' ? 'selected' : ''}>🇬🇧 EN</option>
              <option value="hi" ${currentLang === 'hi' ? 'selected' : ''}>🇮🇳 हिन्दी</option>
              <option value="gu" ${currentLang === 'gu' ? 'selected' : ''}>🇮🇳 ગુજરાતી</option>
            </select>

            <!-- Theme Switcher -->
            <button type="button" id="theme-toggle-btn" class="btn-icon" title="Toggle Theme">
              ${currentTheme === 'dark' ? getIcon('sun') : getIcon('moon')}
            </button>

            ${user ? `
              <!-- Notifications -->
              <div class="user-menu-wrapper">
                <button type="button" id="notif-btn" class="btn-icon" style="position: relative;" title="Notifications">
                  ${getIcon('bell')}
                  ${unreadCount > 0 ? `<span style="position: absolute; top: -4px; right: -4px; width: 18px; height: 18px; background: var(--danger); color: #fff; font-size: 0.68rem; font-weight: 700; border-radius: 50%; display: flex; align-items: center; justify-content: center;">${unreadCount}</span>` : ''}
                </button>
                <div id="notif-dropdown" class="dropdown-menu" style="width: 320px; padding: 0.75rem;">
                  <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); margin-bottom: 0.5rem;">
                    <span style="font-weight: 700; font-size: 0.875rem;">Notifications</span>
                    <a href="#/seeker/notifications" style="font-size: 0.775rem; color: var(--primary);">View All</a>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 260px; overflow-y: auto;">
                    ${notifs.length > 0 ? notifs.map(n => `
                      <div class="dropdown-item notif-item" data-id="${n.id}" data-link="${n.link || '#/'}" style="display: block; padding: 0.5rem; border-radius: 6px; background: ${n.read ? 'transparent' : 'var(--primary-light)'};">
                        <div style="font-weight: 700; font-size: 0.825rem;">${n.title}</div>
                        <div style="font-size: 0.775rem; color: var(--text-muted); margin-top: 2px;">${n.message}</div>
                      </div>
                    `).join('') : '<div style="text-align: center; padding: 1rem; font-size: 0.825rem; color: var(--text-muted);">No new alerts</div>'}
                  </div>
                </div>
              </div>

              <!-- User Avatar Menu -->
              <div class="user-menu-wrapper">
                <button type="button" id="user-menu-btn" class="user-avatar-btn">
                  <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" class="avatar-img" alt="${user.name}">
                  <span style="font-weight: 600; font-size: 0.875rem; max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${user.name}</span>
                  ${roleBadge}
                </button>
                <div id="user-dropdown" class="dropdown-menu">
                  <div style="padding: 0.5rem 0.85rem; border-bottom: 1px solid var(--border-color); margin-bottom: 0.35rem;">
                    <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-main);">${user.name}</div>
                    <div style="font-size: 0.775rem; color: var(--text-muted);">${user.email}</div>
                  </div>
                  <a href="${dashboardRoute}" class="dropdown-item">${getIcon('pieChart')} Dashboard</a>
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
                    ${getIcon('logOut')} Sign Out
                  </button>
                </div>
              </div>
            ` : `
              <a href="#/login" class="btn btn-outline btn-sm">${t('login')}</a>
              <a href="#/signup" class="btn btn-primary btn-sm">${t('signup')}</a>
            `}

            <button type="button" id="mobile-menu-btn" class="btn-icon mobile-nav-toggle">
              ${getIcon('menu')}
            </button>
          </div>
        </div>

        <div id="mobile-drawer" class="mobile-menu-drawer">
          <a href="#/jobs" class="dropdown-item">${t('findJobs')}</a>
          <a href="#/companies" class="dropdown-item">${t('companies')}</a>
          <a href="#/salaries" class="dropdown-item">${t('salaries')}</a>
          <a href="#/ai-tools/resume" class="dropdown-item">${t('aiTools')}</a>
          ${user ? `
            <a href="${dashboardRoute}" class="dropdown-item">${t('dashboard')}</a>
            <button type="button" id="mobile-logout-btn" class="dropdown-item" style="color: var(--danger); text-align: left; width: 100%;">
              ${getIcon('logOut')} ${t('logout')}
            </button>
          ` : `
            <a href="#/login" class="btn btn-outline" style="width: 100%;">${t('login')}</a>
            <a href="#/signup" class="btn btn-primary" style="width: 100%;">${t('signup')}</a>
          `}
        </div>
      </header>
    `;
  }

  function attachNavbarEvents() {
    document.querySelector('#theme-toggle-btn')?.addEventListener('click', () => {
      const next = getTheme() === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
    document.querySelector('#lang-select')?.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
    const userBtn = document.querySelector('#user-menu-btn');
    const userDropdown = document.querySelector('#user-dropdown');
    const notifBtn = document.querySelector('#notif-btn');
    const notifDropdown = document.querySelector('#notif-dropdown');

    if (userBtn && userDropdown) {
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
        if (notifDropdown) notifDropdown.classList.remove('show');
      });
    }
    if (notifBtn && notifDropdown) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle('show');
        if (userDropdown) userDropdown.classList.remove('show');
      });
    }
    document.querySelectorAll('.notif-item').forEach(item => {
      item.addEventListener('click', () => {
        markNotificationRead(item.dataset.id);
        if (item.dataset.link) window.location.hash = item.dataset.link;
      });
    });
    document.querySelector('#mobile-menu-btn')?.addEventListener('click', () => {
      document.querySelector('#mobile-drawer')?.classList.toggle('show');
    });
    const doLogout = () => {
      logout();
      toast.info('Signed Out', 'You have been safely signed out.');
      window.location.hash = '#/';
    };
    document.querySelector('#logout-btn')?.addEventListener('click', doLogout);
    document.querySelector('#mobile-logout-btn')?.addEventListener('click', doLogout);

    document.addEventListener('click', () => {
      if (userDropdown) userDropdown.classList.remove('show');
      if (notifDropdown) notifDropdown.classList.remove('show');
    });
  }

  function renderFooter() {
    return `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col-brand">
              <a href="#/" class="nav-logo" style="margin-bottom: 0.5rem;">
                <div class="nav-logo-icon">${getIcon('sparkles')}</div>
                <span>Job<span style="color: var(--primary);">Connect</span></span>
              </a>
              <p>India’s next-generation career and hiring platform. Powering seamless connections between high-caliber tech talent and fast-growing companies with AI tools and live video screening.</p>
            </div>
            <div>
              <div class="footer-col-title">For Candidates</div>
              <ul class="footer-nav">
                <li><a href="#/jobs">Browse Verified Jobs</a></li>
                <li><a href="#/companies">Company Directory</a></li>
                <li><a href="#/salaries">Salary Benchmarks</a></li>
                <li><a href="#/ai-tools/resume">AI Resume ATS Analyzer</a></li>
                <li><a href="#/seeker/interviews">Live Video Interview Prep</a></li>
              </ul>
            </div>
            <div>
              <div class="footer-col-title">For Employers</div>
              <ul class="footer-nav">
                <li><a href="#/employer/post-job">Post a Vacancy</a></li>
                <li><a href="#/employer/candidates">Talent Sourcing Pool</a></li>
                <li><a href="#/employer/jobs">Applicant Management</a></li>
                <li><a href="#/employer/analytics">Hiring Metrics & Funnel</a></li>
              </ul>
            </div>
            <div>
              <div class="footer-col-title">Platform</div>
              <ul class="footer-nav">
                <li><a href="#/login">Sign In / Demo Login</a></li>
                <li><a href="#/signup">Create Free Account</a></li>
                <li><a href="#/admin/dashboard">System Admin Console</a></li>
                <li><span style="display: inline-flex; align-items: center; gap: 0.35rem; color: var(--success); font-size: 0.85rem; font-weight: 600;">${getIcon('checkCircle')} All Systems Operational</span></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <div>© ${new Date().getFullYear()} JobConnect Technologies India. All rights reserved.</div>
            <div>Pure Vanilla HTML5 • CSS3 • Modern JavaScript (Zero Frameworks)</div>
          </div>
        </div>
      </footer>
    `;
  }

  function renderJobCard(job) {
    const saved = isJobSaved(job.id);
    const workplaceBadge = job.workplaceType === 'remote' ? 'badge-success' : job.workplaceType === 'hybrid' ? 'badge-primary' : 'badge-muted';
    return `
      <div class="job-card ${job.featured ? 'featured' : ''}" data-job-id="${job.id}">
        <div>
          <div class="job-header">
            <img src="${job.companyLogo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80'}" class="job-company-logo" alt="${job.companyName}">
            <div style="flex: 1; min-width: 0;">
              <a href="#/jobs/${job.id}" class="job-title" style="display: block; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${job.title}</a>
              <a href="#/companies/${job.companyId || 'comp_1'}" class="job-company-name">${job.companyName}</a>
            </div>
            <button type="button" class="btn-icon job-save-btn" data-id="${job.id}" title="${saved ? 'Unsave' : 'Save'}" style="color: ${saved ? 'var(--primary)' : 'var(--text-subtle)'}; flex-shrink: 0;">
              ${saved ? getIcon('bookmarkFilled') : getIcon('bookmark')}
            </button>
          </div>
          <div class="job-details-meta">
            <span class="meta-item">${getIcon('mapPin')} ${job.location}</span>
            <span class="badge ${workplaceBadge}" style="text-transform: capitalize;">${job.workplaceType || 'on-site'}</span>
            <span class="badge badge-muted" style="text-transform: capitalize;">${job.jobType || 'full-time'}</span>
            ${job.featured ? `<span class="badge badge-accent">Featured</span>` : ''}
          </div>
          <div class="job-skills">
            ${(job.skills || []).slice(0, 4).map(skill => `<span class="badge badge-muted">${skill}</span>`).join('')}
            ${(job.skills || []).length > 4 ? `<span class="badge badge-muted">+${job.skills.length - 4}</span>` : ''}
          </div>
        </div>
        <div class="job-footer">
          <div class="job-salary">${formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}</div>
          <div style="display: flex; gap: 0.5rem;">
            <a href="#/jobs/${job.id}" class="btn btn-outline btn-sm">Details</a>
            <button type="button" class="btn btn-primary btn-sm job-quick-apply-btn" data-id="${job.id}">Apply</button>
          </div>
        </div>
      </div>
    `;
  }

  function attachJobCardEvents(container = document) {
    container.querySelectorAll('.job-save-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const jobId = btn.dataset.id;
        const user = getCurrentUser();
        if (!user) {
          toast.info('Sign In Required', 'Please sign in to save jobs.');
          window.location.hash = '#/login';
          return;
        }
        const isSaved = toggleSaveJob(jobId);
        btn.style.color = isSaved ? 'var(--primary)' : 'var(--text-subtle)';
        btn.innerHTML = isSaved ? getIcon('bookmarkFilled') : getIcon('bookmark');
        toast.success(isSaved ? 'Job Saved ⭐' : 'Job Removed', isSaved ? 'Added to your bookmarked jobs.' : 'Removed from bookmarks.');
      });
    });

    container.querySelectorAll('.job-quick-apply-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const jobId = btn.dataset.id;
        const job = getJobById(jobId);
        if (job) openApplyModal(job);
      });
    });
  }

  function renderSeekerSidebar(activeRoute = '') {
    const hash = window.location.hash || activeRoute;
    return `
      <aside class="dashboard-sidebar">
        <div class="sidebar-heading">Candidate Hub</div>
        <a href="#/seeker/dashboard" class="sidebar-link ${hash === '#/seeker/dashboard' ? 'active' : ''}">
          <div class="sidebar-link-content">${getIcon('pieChart')} Overview</div>
        </a>
        <a href="#/seeker/applications" class="sidebar-link ${hash.includes('/applications') ? 'active' : ''}">
          <div class="sidebar-link-content">${getIcon('fileText')} Applications</div>
        </a>
        <a href="#/seeker/saved-jobs" class="sidebar-link ${hash.includes('/saved-jobs') ? 'active' : ''}">
          <div class="sidebar-link-content">${getIcon('bookmark')} Saved Jobs</div>
        </a>
        <a href="#/seeker/interviews" class="sidebar-link ${hash.includes('/interviews') ? 'active' : ''}">
          <div class="sidebar-link-content">${getIcon('video')} Live Interviews</div>
        </a>
        <a href="#/seeker/chat" class="sidebar-link ${hash.includes('/chat') ? 'active' : ''}">
          <div class="sidebar-link-content">${getIcon('messageSquare')} Messages</div>
        </a>
        <div class="sidebar-heading" style="margin-top: 1rem;">Career Tools</div>
        <a href="#/ai-tools/resume" class="sidebar-link ${hash.includes('/ai-tools/resume') ? 'active' : ''}">
          <div class="sidebar-link-content">${getIcon('sparkles')} AI Resume Analyzer</div>
        </a>
        <a href="#/salaries" class="sidebar-link ${hash === '#/salaries' ? 'active' : ''}">
          <div class="sidebar-link-content">${getIcon('rupee')} Salary Explorer</div>
        </a>
        <a href="#/seeker/profile" class="sidebar-link ${hash.includes('/profile') ? 'active' : ''}">
          <div class="sidebar-link-content">${getIcon('user')} Edit Profile</div>
        </a>
      </aside>
    `;
  }

  function renderEmployerSidebar(activeRoute = '') {
    const hash = window.location.hash || activeRoute;
    return `
      <aside class="dashboard-sidebar">
        <div class="sidebar-heading">Recruitment Hub</div>
        <a href="#/employer/dashboard" class="sidebar-link ${hash === '#/employer/dashboard' ? 'active' : ''}">
          <div class="sidebar-link-content">${getIcon('pieChart')} Overview</div>
        </a>
        <a href="#/employer/jobs" class="sidebar-link ${hash === '#/employer/jobs' ? 'active' : ''}">
          <div class="sidebar-link-content">${getIcon('briefcase')} Manage Postings</div>
        </a>
        <a href="#/employer/post-job" class="sidebar-link ${hash === '#/employer/post-job' ? 'active' : ''}">
          <div class="sidebar-link-content">${getIcon('plus')} Post a New Job</div>
        </a>
        <a href="#/employer/candidates" class="sidebar-link ${hash.includes('/candidates') ? 'active' : ''}">
          <div class="sidebar-link-content">${getIcon('users')} Talent Sourcing</div>
        </a>
        <a href="#/employer/analytics" class="sidebar-link ${hash.includes('/analytics') ? 'active' : ''}">
          <div class="sidebar-link-content">${getIcon('trendingUp')} Hiring Analytics</div>
        </a>
        <a href="#/seeker/chat" class="sidebar-link ${hash.includes('/chat') ? 'active' : ''}">
          <div class="sidebar-link-content">${getIcon('messageSquare')} Candidate Chat</div>
        </a>
      </aside>
    `;
  }

  function renderAdminSidebar(activeRoute = '') {
    const hash = window.location.hash || activeRoute;
    return `
      <aside class="dashboard-sidebar">
        <div class="sidebar-heading">Admin System</div>
        <a href="#/admin/dashboard" class="sidebar-link ${hash === '#/admin/dashboard' ? 'active' : ''}">
          <div class="sidebar-link-content">${getIcon('shield')} Platform Overview</div>
        </a>
        <a href="#/jobs" class="sidebar-link">
          <div class="sidebar-link-content">${getIcon('briefcase')} Job Explorer</div>
        </a>
        <a href="#/companies" class="sidebar-link">
          <div class="sidebar-link-content">${getIcon('building')} Companies</div>
        </a>
      </aside>
    `;
  }

  // ==========================================================================
  // 6. ALL APP PAGES RENDERERS & EVENT HANDLERS
  // ==========================================================================

  // --- Landing Page ---
  function renderLandingPage() {
    const allJobs = getJobsList();
    const featured = allJobs.slice(0, 6);
    const comps = getCompaniesList().slice(0, 6);

    return `
      <section class="hero-section hero-grid">
        <div class="hero-bg-glow"></div>
        <div class="container hero-content">
          <div class="badge badge-primary" style="margin-bottom: 1.25rem; font-size: 0.85rem; padding: 0.4rem 1rem;">
            ${t('heroBadge')}
          </div>
          <h1 style="font-size: 2.85rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 1.25rem;">
            ${t('heroTitle1')}<br>
            <span class="text-gradient">${t('heroTitleHighlight')}</span>
          </h1>
          <p style="font-size: 1.15rem; max-width: 680px; margin: 0 auto; line-height: 1.6;">
            ${t('heroSubtitle')}
          </p>

          <div class="hero-search-box">
            <div class="hero-search-input-group">
              <span style="color: var(--primary);">${getIcon('search')}</span>
              <input type="text" id="hero-keyword" class="form-input" style="border: none; box-shadow: none; padding-left: 0;" placeholder="Job title, skills (e.g. React, Python)...">
            </div>
            <div class="hero-search-divider"></div>
            <div class="hero-search-input-group">
              <span style="color: var(--primary);">${getIcon('mapPin')}</span>
              <input type="text" id="hero-location" class="form-input" style="border: none; box-shadow: none; padding-left: 0;" placeholder="City or Remote...">
            </div>
            <button type="button" id="hero-search-btn" class="btn btn-primary btn-lg">
              ${getIcon('search')} Search Jobs
            </button>
          </div>

          <div style="margin-top: 1.5rem; display: flex; align-items: center; justify-content: center; gap: 0.6rem; flex-wrap: wrap; font-size: 0.875rem;">
            <span style="color: var(--text-muted); font-weight: 600;">Popular:</span>
            <a href="#/jobs?search=React" class="badge badge-muted">React.js</a>
            <a href="#/jobs?search=Python" class="badge badge-muted">Python</a>
            <a href="#/jobs?search=Remote" class="badge badge-muted">Remote</a>
            <a href="#/jobs?search=UI/UX" class="badge badge-muted">UI/UX Design</a>
            <a href="#/jobs?search=DevOps" class="badge badge-muted">DevOps</a>
          </div>
        </div>
      </section>

      <section class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">40,000+</div>
            <div style="font-weight: 600; font-size: 0.95rem;">Active Verified Jobs</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">Across 50+ tech hubs</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">2,400+</div>
            <div style="font-weight: 600; font-size: 0.95rem;">Companies Hiring</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">From startups to unicorns</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">180,000+</div>
            <div style="font-weight: 600; font-size: 0.95rem;">Active Candidates</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">Pre-vetted developers & leads</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">94.8%</div>
            <div style="font-weight: 600; font-size: 0.95rem;">Hiring Match Rate</div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">AI matching precision</div>
          </div>
        </div>
      </section>

      <section class="container" style="margin: 4rem auto;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
          <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid var(--primary); padding: 2.5rem;">
            <div>
              <div style="width: 52px; height: 52px; border-radius: var(--radius-lg); background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                ${getIcon('user')}
              </div>
              <h3 style="font-size: 1.5rem; margin-bottom: 0.75rem;">I am a Job Seeker</h3>
              <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem;">Search top tech jobs, get AI resume feedback, 1-click apply, and track applications in real-time.</p>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem;">
                <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                  <span style="color: var(--success);">${getIcon('checkCircle')}</span> AI ATS Resume Matcher & Score
                </li>
                <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                  <span style="color: var(--success);">${getIcon('checkCircle')}</span> Live Interactive AI Video Practice Room
                </li>
                <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                  <span style="color: var(--success);">${getIcon('checkCircle')}</span> Direct Recruiter Messaging & Timeline Tracker
                </li>
              </ul>
            </div>
            <a href="#/jobs" class="btn btn-primary" style="width: 100%;">Explore Tech Opportunities ${getIcon('arrowRight')}</a>
          </div>

          <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid var(--secondary); padding: 2.5rem;">
            <div>
              <div style="width: 52px; height: 52px; border-radius: var(--radius-lg); background: var(--secondary-light); color: #0891b2; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                ${getIcon('briefcase')}
              </div>
              <h3 style="font-size: 1.5rem; margin-bottom: 0.75rem;">I am an Employer / Recruiter</h3>
              <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem;">Post vacancies, source pre-vetted candidates with skill filters, and schedule live video interviews.</p>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem;">
                <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                  <span style="color: var(--success);">${getIcon('checkCircle')}</span> Pre-Screen Candidates & Kanban Pipeline
                </li>
                <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                  <span style="color: var(--success);">${getIcon('checkCircle')}</span> Schedule & Host 1-Click Video Interviews
                </li>
                <li style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.9rem;">
                  <span style="color: var(--success);">${getIcon('checkCircle')}</span> Detailed Sourcing Analytics & Conversion Funnels
                </li>
              </ul>
            </div>
            <a href="#/employer/post-job" class="btn btn-secondary" style="width: 100%;">Post a Job Today ${getIcon('arrowRight')}</a>
          </div>
        </div>
      </section>

      <section class="container" style="margin-bottom: 5rem;">
        <div style="display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <div class="badge badge-accent" style="margin-bottom: 0.5rem;">High Impact Roles</div>
            <h2 style="font-size: 2rem;">Featured Job Openings</h2>
          </div>
          <a href="#/jobs" class="btn btn-outline">View All ${allJobs.length} Jobs ${getIcon('arrowRight')}</a>
        </div>
        <div class="jobs-grid">
          ${featured.map(j => renderJobCard(j)).join('')}
        </div>
      </section>

      <section style="background: var(--bg-card); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 4rem 0;">
        <div class="container">
          <div style="text-align: center; max-width: 600px; margin: 0 auto 2.5rem auto;">
            <h2 style="font-size: 1.85rem; margin-bottom: 0.5rem;">Hiring Across Industry Leaders</h2>
            <p>Join world-class engineering and product teams building visionary software.</p>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem;">
            ${comps.map(c => `
              <a href="#/companies/${c.id}" class="card card-hover" style="text-align: center; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; text-decoration: none;">
                <img src="${c.logo}" style="width: 56px; height: 56px; border-radius: var(--radius-md); object-fit: cover;" alt="${c.name}">
                <div style="font-weight: 700; color: var(--text-main); font-size: 0.95rem;">${c.name}</div>
                <div style="display: flex; align-items: center; gap: 0.25rem; font-size: 0.8rem; color: var(--warning-text); font-weight: 700;">
                  ${getIcon('star')} ${c.rating} (${c.reviewCount})
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function attachLandingEvents() {
    attachJobCardEvents();
    const searchBtn = document.querySelector('#hero-search-btn');
    const keywordInput = document.querySelector('#hero-keyword');
    const locInput = document.querySelector('#hero-location');

    const execute = () => {
      const q = keywordInput?.value.trim() || '';
      const loc = locInput?.value.trim() || '';
      const params = new URLSearchParams();
      if (q) params.set('search', q);
      if (loc) params.set('location', loc);
      window.location.hash = `#/jobs?${params.toString()}`;
    };
    if (searchBtn) searchBtn.addEventListener('click', execute);
    if (keywordInput) keywordInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') execute(); });
    if (locInput) locInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') execute(); });
  }

  // --- Auth Pages (Login, Signup, Forgot, OTP) ---
  function renderLoginPage() {
    return `
      <div class="container container-narrow" style="padding: 3rem 1.25rem;">
        <div class="card" style="max-width: 520px; margin: 0 auto; padding: 2.5rem; box-shadow: var(--shadow-xl);">
          <div style="text-align: center; margin-bottom: 2rem;">
            <div class="nav-logo-icon" style="margin: 0 auto 1rem auto; width: 44px; height: 44px;">${getIcon('sparkles')}</div>
            <h2 style="font-size: 1.75rem; margin-bottom: 0.35rem;">Welcome Back</h2>
            <p style="font-size: 0.9rem;">Sign in to access your JobConnect dashboard</p>
          </div>

          <form id="login-form">
            <div class="form-group">
              <label class="form-label" for="login-email">Email Address</label>
              <div class="input-icon-wrapper">
                <span class="icon">${getIcon('mail')}</span>
                <input type="email" id="login-email" class="form-input" placeholder="you@example.com" required autocomplete="email">
              </div>
            </div>

            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <label class="form-label" for="login-password" style="margin-bottom: 0;">Password</label>
                <a href="#/forgot-password" style="font-size: 0.825rem; font-weight: 600;">Forgot password?</a>
              </div>
              <div class="input-icon-wrapper">
                <span class="icon">${getIcon('shield')}</span>
                <input type="password" id="login-password" class="form-input" placeholder="••••••••" required autocomplete="current-password">
              </div>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; font-size: 0.875rem;">
              <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                <input type="checkbox" checked>
                <span>Remember me</span>
              </label>
              <a href="#/verify-otp" style="font-size: 0.825rem; font-weight: 600;">Sign in with OTP</a>
            </div>

            <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-bottom: 1.25rem;">
              Sign In to Account
            </button>
          </form>

          <div style="text-align: center; font-size: 0.875rem; color: var(--text-muted);">
            Don't have an account? <a href="#/signup" style="font-weight: 700;">Sign up for free</a>
          </div>
        </div>
      </div>
    `;
  }

  function attachLoginEvents() {
    document.querySelector('#login-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.querySelector('#login-email').value.trim();
      const pwd = document.querySelector('#login-password').value;
      const res = login(email, pwd);
      if (res.success) {
        toast.success(`Welcome back, ${res.user.name}! 👋`, 'Signed in successfully.');
        if (res.user.role === USER_ROLES.JOB_SEEKER) window.location.hash = '#/seeker/dashboard';
        else if (res.user.role === USER_ROLES.EMPLOYER) window.location.hash = '#/employer/dashboard';
        else window.location.hash = '#/admin/dashboard';
      } else {
        toast.error('Authentication Failed', res.message);
      }
    });
  }

  function renderSignupPage() {
    return `
      <div class="container container-narrow" style="padding: 3rem 1.25rem;">
        <div class="card" style="max-width: 560px; margin: 0 auto; padding: 2.5rem; box-shadow: var(--shadow-xl);">
          <div style="text-align: center; margin-bottom: 2rem;">
            <div class="nav-logo-icon" style="margin: 0 auto 1rem auto; width: 44px; height: 44px;">${getIcon('sparkles')}</div>
            <h2 style="font-size: 1.75rem; margin-bottom: 0.35rem;">Create Your Account</h2>
            <p style="font-size: 0.9rem;">Join thousands of job seekers and visionary tech employers.</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; background: var(--bg-muted); padding: 0.35rem; border-radius: var(--radius-lg); margin-bottom: 1.75rem;">
            <button type="button" id="role-seeker-btn" class="btn btn-sm btn-primary role-tab active" data-role="${USER_ROLES.JOB_SEEKER}">👤 Job Seeker</button>
            <button type="button" id="role-employer-btn" class="btn btn-sm btn-outline role-tab" data-role="${USER_ROLES.EMPLOYER}">💼 Employer</button>
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

  function attachSignupEvents() {
    const roleTabs = document.querySelectorAll('.role-tab');
    const roleInput = document.querySelector('#signup-role');
    const companyGroup = document.querySelector('#company-field-group');
    const companyInput = document.querySelector('#signup-company');

    roleTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        roleTabs.forEach(t => { t.classList.remove('btn-primary', 'active'); t.classList.add('btn-outline'); });
        tab.classList.add('btn-primary', 'active');
        tab.classList.remove('btn-outline');
        const r = tab.dataset.role;
        roleInput.value = r;
        if (r === USER_ROLES.EMPLOYER) {
          companyGroup.style.display = 'block';
          companyInput.setAttribute('required', 'true');
        } else {
          companyGroup.style.display = 'none';
          companyInput.removeAttribute('required');
        }
      });
    });

    document.querySelector('#signup-form')?.addEventListener('submit', (e) => {
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

  function renderForgotPasswordPage() {
    return `
      <div class="container container-narrow" style="padding: 3rem 1.25rem;">
        <div class="card" style="max-width: 480px; margin: 0 auto; padding: 2.5rem; box-shadow: var(--shadow-xl);">
          <div style="text-align: center; margin-bottom: 2rem;">
            <div class="nav-logo-icon" style="margin: 0 auto 1rem auto; width: 44px; height: 44px;">${getIcon('sparkles')}</div>
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

  function attachForgotEvents() {
    document.querySelector('#forgot-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      toast.success('Reset Link Sent! ✉️', 'Check your email inbox for password recovery steps.');
      setTimeout(() => { window.location.hash = '#/login'; }, 1500);
    });
  }

  function renderVerifyOtpPage() {
    return `
      <div class="container container-narrow" style="padding: 3rem 1.25rem;">
        <div class="card" style="max-width: 480px; margin: 0 auto; padding: 2.5rem; box-shadow: var(--shadow-xl);">
          <div style="text-align: center; margin-bottom: 2rem;">
            <div class="nav-logo-icon" style="margin: 0 auto 1rem auto; width: 44px; height: 44px;">${getIcon('phone')}</div>
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
        </div>
      </div>
    `;
  }

  function attachOtpEvents() {
    document.querySelector('#otp-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      loginWithDemo(USER_ROLES.JOB_SEEKER);
      toast.success('OTP Verified! 📱', 'Welcome back, Aarav Sharma.');
      window.location.hash = '#/seeker/dashboard';
    });
  }

  // --- Jobs Explorer Page ---
  function renderJobsPage(params = {}) {
    const allJobs = getJobsList();
    const search = params.search || '';
    const location = params.location || '';
    const workplace = params.workplace || '';
    const type = params.type || '';
    const exp = params.exp || '';
    const sortBy = params.sort || 'recent';

    let filtered = allJobs.filter(job => {
      if (search) {
        const q = search.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchComp = job.companyName.toLowerCase().includes(q);
        const matchSkills = (job.skills || []).some(s => s.toLowerCase().includes(q));
        if (!matchTitle && !matchComp && !matchSkills) return false;
      }
      if (location && !job.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (workplace && job.workplaceType !== workplace) return false;
      if (type && job.jobType !== type) return false;
      if (exp && job.experienceLevel !== exp) return false;
      return true;
    });

    if (sortBy === 'salary') filtered.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
    else if (sortBy === 'applicants') filtered.sort((a, b) => (b.applicantCount || 0) - (a.applicantCount || 0));
    else filtered.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

    return `
      <div class="container" style="padding: 2.5rem 1.25rem;">
        <div style="margin-bottom: 2rem;">
          <h1 style="font-size: 2.25rem; margin-bottom: 0.5rem;">Explore Tech Roles</h1>
          <p>Discover ${allJobs.length} active opportunities across top startups and tech enterprises.</p>
        </div>

        <div class="card" style="padding: 1rem; margin-bottom: 2rem; box-shadow: var(--shadow-md);">
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <div class="input-icon-wrapper" style="flex: 2; min-width: 240px;">
              <span class="icon">${getIcon('search')}</span>
              <input type="text" id="jobs-search-input" class="form-input" placeholder="Search by role, company, or skills..." value="${search}">
            </div>
            <div class="input-icon-wrapper" style="flex: 1.5; min-width: 180px;">
              <span class="icon">${getIcon('mapPin')}</span>
              <input type="text" id="jobs-location-input" class="form-input" placeholder="Location or Remote..." value="${location}">
            </div>
            <button type="button" id="jobs-apply-search-btn" class="btn btn-primary" style="flex-shrink: 0;">
              ${getIcon('search')} Search
            </button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 280px 1fr; gap: 2rem; align-items: start;">
          <aside class="card" style="padding: 1.5rem; position: sticky; top: 90px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
              <div style="font-weight: 700; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                ${getIcon('filter')} Filters
              </div>
              <button type="button" id="clear-filters-btn" class="btn btn-sm btn-outline" style="font-size: 0.75rem;">Reset</button>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <div style="font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Workplace Type</div>
              <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                  <input type="radio" name="filter-workplace" value="" ${!workplace ? 'checked' : ''}> All Types
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                  <input type="radio" name="filter-workplace" value="remote" ${workplace === 'remote' ? 'checked' : ''}> 🌐 Remote
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                  <input type="radio" name="filter-workplace" value="hybrid" ${workplace === 'hybrid' ? 'checked' : ''}> 🏢 Hybrid
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                  <input type="radio" name="filter-workplace" value="on-site" ${workplace === 'on-site' ? 'checked' : ''}> 📍 On-Site
                </label>
              </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <div style="font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Employment Type</div>
              <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                  <input type="radio" name="filter-type" value="" ${!type ? 'checked' : ''}> All Types
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                  <input type="radio" name="filter-type" value="full-time" ${type === 'full-time' ? 'checked' : ''}> Full-Time
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                  <input type="radio" name="filter-type" value="contract" ${type === 'contract' ? 'checked' : ''}> Contract
                </label>
                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                  <input type="radio" name="filter-type" value="internship" ${type === 'internship' ? 'checked' : ''}> Internship
                </label>
              </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <div style="font-weight: 600; font-size: 0.875rem; margin-bottom: 0.75rem;">Experience Level</div>
              <select id="filter-exp" class="form-select" style="font-size: 0.85rem;">
                <option value="" ${!exp ? 'selected' : ''}>All Experience Levels</option>
                <option value="junior" ${exp === 'junior' ? 'selected' : ''}>Junior (1-3 yrs)</option>
                <option value="mid" ${exp === 'mid' ? 'selected' : ''}>Mid-Level (3-5 yrs)</option>
                <option value="senior" ${exp === 'senior' ? 'selected' : ''}>Senior (5-8 yrs)</option>
                <option value="lead" ${exp === 'lead' ? 'selected' : ''}>Lead (8+ yrs)</option>
              </select>
            </div>
          </aside>

          <main>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
              <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-muted);">
                Showing <span style="color: var(--text-main); font-weight: 700;">${filtered.length}</span> verified jobs
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem;">
                <span style="color: var(--text-muted);">Sort by:</span>
                <select id="sort-select" class="form-select" style="width: auto; padding: 0.35rem 0.6rem; font-size: 0.85rem;">
                  <option value="recent" ${sortBy === 'recent' ? 'selected' : ''}>Most Recent</option>
                  <option value="salary" ${sortBy === 'salary' ? 'selected' : ''}>Highest Salary</option>
                  <option value="applicants" ${sortBy === 'applicants' ? 'selected' : ''}>Most Popular</option>
                </select>
              </div>
            </div>

            ${filtered.length > 0 ? `
              <div class="jobs-grid">
                ${filtered.map(job => renderJobCard(job)).join('')}
              </div>
            ` : `
              <div class="card" style="text-align: center; padding: 4rem 2rem;">
                <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--bg-muted); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: var(--text-muted);">
                  ${getIcon('search')}
                </div>
                <h3 style="margin-bottom: 0.5rem;">No Matching Jobs Found</h3>
                <p style="margin-bottom: 1.5rem;">Try adjusting your keyword or location filters.</p>
                <button type="button" id="empty-reset-btn" class="btn btn-primary">Reset Filters</button>
              </div>
            `}
          </main>
        </div>
      </div>
    `;
  }

  function attachJobsEvents() {
    attachJobCardEvents();
    const updateFilters = () => {
      const search = document.querySelector('#jobs-search-input')?.value.trim() || '';
      const location = document.querySelector('#jobs-location-input')?.value.trim() || '';
      const workplace = document.querySelector('input[name="filter-workplace"]:checked')?.value || '';
      const type = document.querySelector('input[name="filter-type"]:checked')?.value || '';
      const exp = document.querySelector('#filter-exp')?.value || '';
      const sort = document.querySelector('#sort-select')?.value || 'recent';

      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (location) params.set('location', location);
      if (workplace) params.set('workplace', workplace);
      if (type) params.set('type', type);
      if (exp) params.set('exp', exp);
      if (sort) params.set('sort', sort);
      window.location.hash = `#/jobs?${params.toString()}`;
    };

    document.querySelector('#jobs-apply-search-btn')?.addEventListener('click', updateFilters);
    document.querySelector('#jobs-search-input')?.addEventListener('keyup', (e) => { if (e.key === 'Enter') updateFilters(); });
    document.querySelector('#jobs-location-input')?.addEventListener('keyup', (e) => { if (e.key === 'Enter') updateFilters(); });
    document.querySelectorAll('input[name="filter-workplace"]').forEach(r => r.addEventListener('change', updateFilters));
    document.querySelectorAll('input[name="filter-type"]').forEach(r => r.addEventListener('change', updateFilters));
    document.querySelector('#filter-exp')?.addEventListener('change', updateFilters);
    document.querySelector('#sort-select')?.addEventListener('change', updateFilters);

    const clearAll = () => { window.location.hash = '#/jobs'; };
    document.querySelector('#clear-filters-btn')?.addEventListener('click', clearAll);
    document.querySelector('#empty-reset-btn')?.addEventListener('click', clearAll);
  }

  // --- Job Details Page ---
  function renderJobDetailsPage(jobId) {
    const job = getJobById(jobId);
    if (!job) {
      return `
        <div class="container" style="padding: 4rem 1.25rem; text-align: center;">
          <h2>Job Not Found</h2>
          <a href="#/jobs" class="btn btn-primary" style="margin-top: 1rem;">Back to Jobs</a>
        </div>
      `;
    }
    const company = getCompanyById(job.companyId) || { name: job.companyName, location: job.location, size: '500+ employees', rating: 4.8, reviewCount: 120 };
    const saved = isJobSaved(job.id);

    return `
      <div class="container" style="padding: 2.5rem 1.25rem;">
        <div class="card" style="padding: 2rem; margin-bottom: 2rem; box-shadow: var(--shadow-md);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1.5rem;">
            <div style="display: flex; gap: 1.25rem;">
              <img src="${job.companyLogo}" style="width: 72px; height: 72px; border-radius: var(--radius-lg); object-fit: cover; border: 1px solid var(--border-color);" alt="${job.companyName}">
              <div>
                <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">${job.title}</h1>
                <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; font-size: 0.95rem; color: var(--text-muted);">
                  <a href="#/companies/${job.companyId || 'comp_1'}" style="font-weight: 700; color: var(--text-main);">${job.companyName}</a>
                  <span>•</span>
                  <span>${getIcon('mapPin')} ${job.location}</span>
                  <span>•</span>
                  <span style="color: var(--success); font-weight: 600;">Verified Employer</span>
                </div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <button type="button" id="detail-save-btn" class="btn btn-outline" style="color: ${saved ? 'var(--primary)' : 'var(--text-main)'};">
                ${saved ? getIcon('bookmarkFilled') : getIcon('bookmark')} ${saved ? 'Saved' : 'Save Job'}
              </button>
              <button type="button" id="detail-apply-btn" class="btn btn-primary btn-lg">
                ${getIcon('send')} Apply Now
              </button>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Compensation</div>
              <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-top: 2px;">
                ${formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
              </div>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Workplace Type</div>
              <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-top: 2px; text-transform: capitalize;">${job.workplaceType}</div>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Employment Type</div>
              <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-top: 2px; text-transform: capitalize;">${job.jobType}</div>
            </div>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Experience</div>
              <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-top: 2px; text-transform: capitalize;">${job.experienceLevel} Level</div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
          <div class="card" style="padding: 2rem;">
            <h3 style="margin-bottom: 1rem; font-size: 1.25rem;">About the Opportunity</h3>
            <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 1.5rem;">${job.description}</p>
            <h4 style="margin-top: 1.5rem; margin-bottom: 0.75rem;">Key Responsibilities</h4>
            <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.95rem; color: var(--text-muted);">
              ${(job.responsibilities || []).map(r => `<li>${r}</li>`).join('')}
            </ul>
            <h4 style="margin-top: 1.5rem; margin-bottom: 0.75rem;">Requirements</h4>
            <ul style="padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.95rem; color: var(--text-muted);">
              ${(job.requirements || []).map(rq => `<li>${rq}</li>`).join('')}
            </ul>
            <h4 style="margin-top: 1.5rem; margin-bottom: 0.75rem;">Required Skills</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${(job.skills || []).map(s => `<span class="badge badge-primary" style="font-size: 0.85rem;">${s}</span>`).join('')}
            </div>
          </div>

          <div class="card" style="padding: 1.5rem; height: fit-content;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <img src="${job.companyLogo}" style="width: 52px; height: 52px; border-radius: var(--radius-md); object-fit: cover;" alt="${job.companyName}">
              <div>
                <div style="font-weight: 700; font-size: 1.1rem; color: var(--text-main);">${job.companyName}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted);">${company.industry || 'Software'}</div>
              </div>
            </div>
            <p style="font-size: 0.85rem; line-height: 1.5; color: var(--text-muted); margin-bottom: 1.25rem;">${company.tagline || ''}</p>
            <a href="#/companies/${job.companyId || 'comp_1'}" class="btn btn-outline" style="width: 100%;">Explore Company ${getIcon('arrowRight')}</a>
          </div>
        </div>
      </div>
    `;
  }

  function attachJobDetailsEvents(jobId) {
    const job = getJobById(jobId);
    if (!job) return;
    document.querySelector('#detail-apply-btn')?.addEventListener('click', () => openApplyModal(job));
    const saveBtn = document.querySelector('#detail-save-btn');
    saveBtn?.addEventListener('click', () => {
      const user = getCurrentUser();
      if (!user) {
        toast.info('Sign In Required', 'Please sign in to save jobs.');
        window.location.hash = '#/login';
        return;
      }
      const isSaved = toggleSaveJob(job.id);
      saveBtn.style.color = isSaved ? 'var(--primary)' : 'var(--text-main)';
      saveBtn.innerHTML = `${isSaved ? getIcon('bookmarkFilled') : getIcon('bookmark')} ${isSaved ? 'Saved' : 'Save Job'}`;
      toast.success(isSaved ? 'Job Bookmarked ⭐' : 'Job Removed', isSaved ? 'Added to your bookmarked jobs.' : 'Removed from bookmarks.');
    });
  }

  // --- Saved Jobs Page ---
  function renderSavedJobsPage() {
    const user = getCurrentUser();
    if (!user) { window.location.hash = '#/login'; return ''; }
    const savedIds = user.savedJobs || [];
    const saved = getJobsList().filter(j => savedIds.includes(j.id));

    return `
      <div class="dashboard-layout">
        ${renderSeekerSidebar('#/seeker/saved-jobs')}
        <main class="dashboard-main">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
            <div>
              <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Saved Bookmarks</h1>
              <p>You have bookmarked ${saved.length} positions to review or apply.</p>
            </div>
            <a href="#/jobs" class="btn btn-outline">${getIcon('search')} Browse More Jobs</a>
          </div>
          ${saved.length > 0 ? `
            <div class="jobs-grid">
              ${saved.map(job => renderJobCard(job)).join('')}
            </div>
          ` : `
            <div class="card" style="text-align: center; padding: 4rem 2rem;">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--bg-muted); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; color: var(--text-muted);">${getIcon('bookmark')}</div>
              <h3>No Saved Jobs Yet</h3>
              <p style="margin: 0.5rem 0 1.5rem 0;">Bookmark jobs while browsing to save them for later.</p>
              <a href="#/jobs" class="btn btn-primary">${getIcon('search')} Discover Jobs</a>
            </div>
          `}
        </main>
      </div>
    `;
  }

  function attachSavedJobsEvents() {
    attachJobCardEvents();
  }

  // --- Seeker Dashboard Page ---
  function renderSeekerDashboardPage() {
    const user = getCurrentUser();
    if (!user) { window.location.hash = '#/login'; return ''; }
    const applications = getSeekerApplications(user.id);
    const interviews = getSeekerInterviews(user.id);
    const savedCount = (user.savedJobs || []).length;
    const recommendedJobs = getJobsList().slice(0, 4);

    return `
      <div class="dashboard-layout">
        ${renderSeekerSidebar('#/seeker/dashboard')}
        <main class="dashboard-main">
          <div class="card" style="background: linear-gradient(135deg, var(--primary-light) 0%, var(--bg-card) 60%); border-color: rgba(79, 70, 229, 0.25); padding: 2rem; margin-bottom: 2rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
              <div>
                <span class="badge badge-primary" style="margin-bottom: 0.5rem;">Job Seeker Portal</span>
                <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Welcome back, ${user.name}! 👋</h1>
                <p style="font-size: 0.95rem; color: var(--text-muted);">${user.headline || 'Full Stack Engineer'}</p>
              </div>
              <div style="display: flex; gap: 0.75rem;">
                <a href="#/ai-tools/resume" class="btn btn-primary">${getIcon('sparkles')} AI Resume Analyzer</a>
                <a href="#/jobs" class="btn btn-outline">${getIcon('search')} Find Jobs</a>
              </div>
            </div>
            <div style="margin-top: 1.75rem; padding-top: 1.25rem; border-top: 1px solid var(--border-color);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; font-size: 0.85rem;">
                <span style="font-weight: 600;">Profile Strength</span>
                <span style="font-weight: 700; color: var(--primary);">${user.profileCompletion || 85}% Complete</span>
              </div>
              <div style="width: 100%; height: 8px; background: var(--bg-muted); border-radius: 9999px; overflow: hidden;">
                <div style="width: ${user.profileCompletion || 85}%; height: 100%; background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%); border-radius: 9999px;"></div>
              </div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
            <div class="card" style="padding: 1.25rem;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Applications</div>
                <span style="color: var(--primary);">${getIcon('fileText')}</span>
              </div>
              <div style="font-size: 1.85rem; font-weight: 800; color: var(--text-main); margin-top: 0.5rem;">${applications.length}</div>
            </div>
            <div class="card" style="padding: 1.25rem;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Live Interviews</div>
                <span style="color: var(--info);">${getIcon('video')}</span>
              </div>
              <div style="font-size: 1.85rem; font-weight: 800; color: var(--text-main); margin-top: 0.5rem;">${interviews.length}</div>
            </div>
            <div class="card" style="padding: 1.25rem;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Saved Jobs</div>
                <span style="color: var(--warning-text);">${getIcon('bookmark')}</span>
              </div>
              <div style="font-size: 1.85rem; font-weight: 800; color: var(--text-main); margin-top: 0.5rem;">${savedCount}</div>
            </div>
            <div class="card" style="padding: 1.25rem;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Profile Views</div>
                <span style="color: var(--success);">${getIcon('users')}</span>
              </div>
              <div style="font-size: 1.85rem; font-weight: 800; color: var(--text-main); margin-top: 0.5rem;">48</div>
            </div>
          </div>

          <div>
            <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem;">Recommended Opportunities</h3>
            <div class="jobs-grid">
              ${recommendedJobs.map(job => renderJobCard(job)).join('')}
            </div>
          </div>
        </main>
      </div>
    `;
  }

  function attachSeekerDashboardEvents() {
    attachJobCardEvents();
  }

  // --- Profile Page ---
  function renderProfilePage() {
    const user = getCurrentUser();
    if (!user) { window.location.hash = '#/login'; return ''; }
    const skills = user.skills || [];
    const exp = user.experience || [];

    return `
      <div class="dashboard-layout">
        ${renderSeekerSidebar('#/seeker/profile')}
        <main class="dashboard-main">
          <div style="margin-bottom: 2rem;">
            <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Candidate Profile</h1>
            <p>Keep your profile, work experience, and skills up-to-date.</p>
          </div>

          <form id="profile-form">
            <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
              <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem;">
                <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid var(--primary-light);" alt="${user.name}">
                <div>
                  <h3 style="font-size: 1.25rem;">${user.name}</h3>
                  <p style="font-size: 0.875rem;">${user.email}</p>
                  <div class="badge badge-success" style="margin-top: 0.35rem;">Strength: ${user.profileCompletion || 85}%</div>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
                <div class="form-group">
                  <label class="form-label" for="prof-name">Full Name</label>
                  <input type="text" id="prof-name" class="form-input" value="${user.name || ''}" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="prof-phone">Phone Number</label>
                  <input type="text" id="prof-phone" class="form-input" value="${user.phone || '+91 98765 43210'}">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="prof-headline">Professional Headline</label>
                <input type="text" id="prof-headline" class="form-input" value="${user.headline || 'Senior Full Stack Developer'}" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="prof-location">Location</label>
                <input type="text" id="prof-location" class="form-input" value="${user.location || 'Ahmedabad, Gujarat'}">
              </div>

              <div class="form-group">
                <label class="form-label" for="prof-bio">Bio & About</label>
                <textarea id="prof-bio" class="form-textarea" rows="3">${user.bio || 'Passionate software engineer building modern high-scale apps.'}</textarea>
              </div>
            </div>

            <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
              <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Core Skills</h3>
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem;">
                ${skills.map((s, idx) => `
                  <span class="badge badge-primary" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">
                    ${s} <button type="button" class="remove-skill-btn" data-index="${idx}" style="cursor: pointer; color: var(--primary); font-weight: bold; border: none; background: none; margin-left: 4px;">×</button>
                  </span>
                `).join('')}
              </div>
              <div style="display: flex; gap: 0.75rem;">
                <input type="text" id="new-skill-input" class="form-input" placeholder="Add skill (e.g. Next.js, Docker)..." style="max-width: 320px;">
                <button type="button" id="add-skill-btn" class="btn btn-secondary">${getIcon('plus')} Add Skill</button>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 1rem;">
              <button type="submit" class="btn btn-primary btn-lg">${getIcon('check')} Save Profile</button>
            </div>
          </form>
        </main>
      </div>
    `;
  }

  function attachProfileEvents() {
    const user = getCurrentUser();
    if (!user) return;
    let currentSkills = [...(user.skills || [])];

    document.querySelectorAll('.remove-skill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.index);
        currentSkills.splice(idx, 1);
        updateUserProfile({ skills: currentSkills });
        window.location.reload();
      });
    });

    document.querySelector('#add-skill-btn')?.addEventListener('click', () => {
      const input = document.querySelector('#new-skill-input');
      const val = input?.value.trim();
      if (val && !currentSkills.includes(val)) {
        currentSkills.push(val);
        updateUserProfile({ skills: currentSkills });
        window.location.reload();
      }
    });

    document.querySelector('#profile-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.querySelector('#prof-name').value.trim();
      const phone = document.querySelector('#prof-phone').value.trim();
      const headline = document.querySelector('#prof-headline').value.trim();
      const location = document.querySelector('#prof-location').value.trim();
      const bio = document.querySelector('#prof-bio').value.trim();
      updateUserProfile({ name, phone, headline, location, bio });
      toast.success('Profile Saved! ✨', 'Your profile details have been updated.');
    });
  }

  // --- Seeker Applications Page ---
  function renderApplicationsPage(filterStatus = '') {
    const user = getCurrentUser();
    if (!user) { window.location.hash = '#/login'; return ''; }
    const allApps = getSeekerApplications(user.id);
    const filtered = filterStatus ? allApps.filter(a => a.status === filterStatus) : allApps;

    const getStepNumber = (s) => {
      if (s === APPLICATION_STATUS.UNDER_REVIEW) return 2;
      if (s === APPLICATION_STATUS.SHORTLISTED) return 3;
      if (s === APPLICATION_STATUS.INTERVIEW) return 4;
      if (s === APPLICATION_STATUS.HIRED) return 5;
      return 1;
    };

    return `
      <div class="dashboard-layout">
        ${renderSeekerSidebar('#/seeker/applications')}
        <main class="dashboard-main">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
            <div>
              <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Track Applications</h1>
              <p>Monitor your active recruitment pipelines.</p>
            </div>
            <a href="#/jobs" class="btn btn-primary">${getIcon('plus')} Apply to More Roles</a>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            ${filtered.length > 0 ? filtered.map(app => {
              const step = getStepNumber(app.status);
              const fill = ((step - 1) / 4) * 100;
              return `
                <div class="card" style="padding: 1.75rem;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
                    <div style="display: flex; gap: 1rem;">
                      <img src="${app.companyLogo}" style="width: 48px; height: 48px; border-radius: var(--radius-md); object-fit: cover;" alt="${app.companyName}">
                      <div>
                        <a href="#/jobs/${app.jobId}" style="font-weight: 700; font-size: 1.15rem; color: var(--text-main);">${app.jobTitle}</a>
                        <div style="font-size: 0.875rem; color: var(--text-muted); margin-top: 2px;">${app.companyName} • ${app.location}</div>
                      </div>
                    </div>
                    <span class="badge badge-primary" style="text-transform: capitalize;">${app.status.replace('_', ' ')}</span>
                  </div>

                  <div class="stepper" style="margin: 2rem 1rem;">
                    <div class="stepper-progress-bar">
                      <div class="stepper-progress-fill" style="width: ${fill}%;"></div>
                    </div>
                    <div class="step-node ${step >= 1 ? 'completed' : ''}">
                      <div class="step-icon">1</div>
                      <span class="step-title">Applied</span>
                    </div>
                    <div class="step-node ${step >= 2 ? (step > 2 ? 'completed' : 'active') : ''}">
                      <div class="step-icon">2</div>
                      <span class="step-title">Under Review</span>
                    </div>
                    <div class="step-node ${step >= 3 ? (step > 3 ? 'completed' : 'active') : ''}">
                      <div class="step-icon">3</div>
                      <span class="step-title">Shortlisted</span>
                    </div>
                    <div class="step-node ${step >= 4 ? (step > 4 ? 'completed' : 'active') : ''}">
                      <div class="step-icon">4</div>
                      <span class="step-title">Interview</span>
                    </div>
                    <div class="step-node ${step >= 5 ? 'completed' : ''}">
                      <div class="step-icon">5</div>
                      <span class="step-title">Hired</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('') : `
              <div class="card" style="text-align: center; padding: 4rem 2rem;">
                <h3>No Applications Found</h3>
                <a href="#/jobs" class="btn btn-primary" style="margin-top: 1rem;">Find Jobs Now</a>
              </div>
            `}
          </div>
        </main>
      </div>
    `;
  }

  function attachApplicationsEvents() {}

  // --- Companies & Details ---
  function renderCompaniesPage(params = {}) {
    const comps = getCompaniesList();
    const search = params.search || '';
    const filtered = search ? comps.filter(c => c.name.toLowerCase().includes(search.toLowerCase())) : comps;

    return `
      <div class="container" style="padding: 2.5rem 1.25rem;">
        <div style="margin-bottom: 2rem;">
          <h1 style="font-size: 2.25rem; margin-bottom: 0.5rem;">Explore Tech Companies</h1>
          <p>Discover top tech companies, verified employee reviews, and active job openings.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem;">
          ${filtered.map(comp => `
            <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between; padding: 1.75rem;">
              <div>
                <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1rem;">
                  <img src="${comp.logo}" style="width: 56px; height: 56px; border-radius: var(--radius-md); object-fit: cover; border: 1px solid var(--border-color);" alt="${comp.name}">
                  <span class="badge badge-success">${getIcon('checkCircle')} Verified</span>
                </div>
                <a href="#/companies/${comp.id}" style="font-size: 1.2rem; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 0.35rem;">${comp.name}</a>
                <div style="font-size: 0.85rem; color: var(--primary); font-weight: 600; margin-bottom: 0.75rem;">${comp.industry}</div>
                <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem;">${comp.description}</p>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; border-top: 1px solid var(--border-color); margin-top: auto;">
                <span class="badge badge-primary">Top Rated</span>
                <a href="#/companies/${comp.id}" class="btn btn-outline btn-sm">Explore Company</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function attachCompaniesEvents() {}

  function renderCompanyDetailsPage(companyId) {
    const comp = getCompanyById(companyId);
    if (!comp) return '<div class="container" style="padding: 4rem;"><h2>Company Not Found</h2></div>';
    const openJobs = getJobsList().filter(j => j.companyId === comp.id);
    const revs = getReviews(comp.id);

    return `
      <div class="container" style="padding: 2.5rem 1.25rem;">
        <div style="height: 200px; border-radius: var(--radius-xl); overflow: hidden; margin-bottom: -40px;">
          <img src="${comp.banner}" style="width: 100%; height: 100%; object-fit: cover;" alt="${comp.name}">
        </div>

        <div class="card" style="position: relative; z-index: 10; padding: 2rem; margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1.5rem;">
            <div style="display: flex; gap: 1.5rem; align-items: flex-end;">
              <img src="${comp.logo}" style="width: 80px; height: 80px; border-radius: var(--radius-lg); object-fit: cover; border: 3px solid var(--bg-card);" alt="${comp.name}">
              <div>
                <h1 style="font-size: 1.85rem;">${comp.name}</h1>
                <p style="font-size: 0.95rem; color: var(--text-muted);">${comp.tagline}</p>
              </div>
            </div>
            <button type="button" id="write-review-btn" class="btn btn-outline">${getIcon('star')} Write Employee Review</button>
          </div>
        </div>

        <div style="margin-bottom: 2rem;">
          <h3 style="font-size: 1.35rem; margin-bottom: 1rem;">Open Roles (${openJobs.length})</h3>
          <div class="jobs-grid">
            ${openJobs.length > 0 ? openJobs.map(job => renderJobCard(job)).join('') : '<div class="card" style="padding: 2rem;">No active openings currently listed.</div>'}
          </div>
        </div>

        <div class="card" style="padding: 2rem;">
          <h3 style="margin-bottom: 1.25rem;">Employee Reviews (${revs.length})</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${revs.map(r => `
              <div style="padding: 1.25rem; background: var(--bg-muted); border-radius: var(--radius-lg);">
                <div style="font-weight: 700; margin-bottom: 0.25rem;">${r.title}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">⭐ ${r.rating}/5 • ${r.role}</div>
                <div style="font-size: 0.875rem;"><strong style="color: var(--success-text);">Pros:</strong> ${r.pros}</div>
                <div style="font-size: 0.875rem; margin-top: 0.25rem;"><strong style="color: var(--danger-text);">Cons:</strong> ${r.cons}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function attachCompanyDetailsEvents(companyId) {
    attachJobCardEvents();
    const comp = getCompanyById(companyId);
    if (!comp) return;
    document.querySelector('#write-review-btn')?.addEventListener('click', () => {
      openAddReviewModal(comp, () => window.location.reload());
    });
  }

  // --- AI Resume Analyzer ---
  function renderAiResumeAnalyzerPage() {
    return `
      <div class="container" style="padding: 2.5rem 1.25rem;">
        <div style="text-align: center; max-width: 700px; margin: 0 auto 2.5rem auto;">
          <div class="badge badge-accent" style="margin-bottom: 0.5rem; padding: 0.4rem 0.85rem;">
            ${getIcon('sparkles')} Next-Gen AI ATS Engine
          </div>
          <h1 style="font-size: 2.25rem; margin-bottom: 0.5rem;">AI Resume ATS Analyzer</h1>
          <p>Scan your resume against target tech roles and identify missing keywords.</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
          <div class="card" style="padding: 2rem;">
            <h3 style="font-size: 1.2rem; margin-bottom: 1.25rem;">Resume Input & Target Role</h3>
            <div class="form-group">
              <label class="form-label">Target Role</label>
              <select id="ai-target-role" class="form-select">
                <option value="Senior Frontend Engineer">Senior Frontend Engineer (React & Next.js)</option>
                <option value="Full Stack Node Developer">Full Stack Node.js Developer</option>
                <option value="Python Backend Lead">Python & Go Cloud Architect</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Resume Text</label>
              <textarea id="ai-resume-text" class="form-textarea" rows="10" placeholder="Paste your resume markdown or plain text here...">Aarav Sharma
Senior Full Stack React & Node Developer with 5+ years of experience.
Skills: React, JavaScript, TypeScript, Node.js, Redux, PostgreSQL, Docker, AWS.
Experience: Led frontend team at InnovateX Labs building Next.js enterprise SaaS apps.</textarea>
            </div>
            <button type="button" id="ai-analyze-btn" class="btn btn-primary btn-lg" style="width: 100%;">
              ${getIcon('sparkles')} Run AI Evaluation
            </button>
          </div>

          <div class="card" style="padding: 2rem;">
            <div style="text-align: center; margin-bottom: 2rem;">
              <div class="score-circle" style="--score: 88; margin-bottom: 1rem;">
                <div class="score-number" id="ai-score-val">88%</div>
                <div class="score-label">ATS Score</div>
              </div>
              <h3 style="font-size: 1.25rem;">Strong Match</h3>
              <p style="font-size: 0.875rem; color: var(--text-muted);">Passes 88% of standard ATS filters with high keyword density.</p>
            </div>
            <div style="margin-bottom: 1.25rem;">
              <div style="font-weight: 700; font-size: 0.875rem; color: var(--success-text); margin-bottom: 0.5rem;">Matched Keywords:</div>
              <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                <span class="badge badge-success">React</span>
                <span class="badge badge-success">TypeScript</span>
                <span class="badge badge-success">Next.js</span>
                <span class="badge badge-success">Node.js</span>
                <span class="badge badge-success">Docker</span>
              </div>
            </div>
            <div style="background: var(--bg-muted); padding: 1rem; border-radius: var(--radius-md); font-size: 0.85rem; color: var(--text-muted);">
              💡 <strong>AI Tip:</strong> Quantify performance gains (e.g. reduced page load by 40%) to boost recruiter impressions.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function attachAiResumeEvents() {
    document.querySelector('#ai-analyze-btn')?.addEventListener('click', () => {
      toast.info('AI Analyzing...', 'Scanning ATS keywords.');
      setTimeout(() => {
        toast.success('Analysis Complete! ⭐', 'Resume scored 92% match rate.');
        const scoreEl = document.querySelector('#ai-score-val');
        if (scoreEl) scoreEl.textContent = '92%';
      }, 600);
    });
  }

  // --- Live Video Interview Room ---
  let timerInt = null;
  let videoAnimId = null;

  function renderVideoInterviewPage() {
    const user = getCurrentUser() || { name: 'Aarav Sharma' };
    return `
      <div class="container" style="padding: 1.5rem 1.25rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <a href="#/seeker/interviews" class="btn btn-outline btn-sm">${getIcon('arrowLeft')} Leave Room</a>
            <h2 style="font-size: 1.35rem; margin-bottom: 0;">Interactive AI Video Practice Room</h2>
          </div>
          <div id="interview-timer" class="badge badge-muted" style="font-size: 0.9rem; font-family: monospace; font-weight: 700;">
            ⏱️ 00:02:15
          </div>
        </div>

        <div class="video-room-container">
          <div class="video-feed-card">
            <div class="video-indicator-badge">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #ffffff; display: inline-block;"></span> LIVE REC
            </div>
            <div class="video-canvas-container" style="background: radial-gradient(circle, #1e293b 0%, #0f172a 100%);">
              <div style="text-align: center; color: #ffffff;">
                <div style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid var(--primary); margin: 0 auto 1.5rem auto; overflow: hidden;">
                  <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" style="width: 100%; height: 100%; object-fit: cover;" alt="${user.name}">
                </div>
                <h3>${user.name}</h3>
                <div style="font-size: 0.85rem; color: #94a3b8;">Candidate Live Video Stream</div>
              </div>
            </div>
            <div class="video-overlay-controls">
              <button type="button" id="vid-mic-btn" class="btn btn-sm btn-secondary" style="border-radius: 9999px; color: #fff; background: rgba(255,255,255,0.2);">
                ${getIcon('mic')} Mute
              </button>
              <button type="button" id="vid-cam-btn" class="btn btn-sm btn-secondary" style="border-radius: 9999px; color: #fff; background: rgba(255,255,255,0.2);">
                ${getIcon('video')} Video On
              </button>
              <button type="button" id="vid-end-btn" class="btn btn-sm btn-danger" style="border-radius: 9999px;">
                End Call
              </button>
            </div>
          </div>

          <div class="card" style="padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <span class="badge badge-accent" style="margin-bottom: 0.75rem;">AI System Prompter</span>
              <h3 style="font-size: 1.15rem; line-height: 1.5; margin-bottom: 1rem;">
                "How would you architect a high-throughput micro-frontend dashboard with client-side caching and optimistic UI updates?"
              </h3>
              <div style="background: var(--bg-muted); padding: 0.85rem; border-radius: var(--radius-md); font-size: 0.825rem; color: var(--text-muted);">
                💡 <strong>Hint:</strong> Cover React state management, WebSockets telemetry, and cache invalidation.
              </div>
            </div>

            <div>
              <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.4rem;">Audio Waveform Stream</div>
              <canvas id="audio-wave-canvas" height="40" style="width: 100%; background: var(--bg-muted); border-radius: var(--radius-md);"></canvas>
              <button type="button" id="vid-eval-btn" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                ${getIcon('sparkles')} Evaluate Candidate Response
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function attachVideoInterviewEvents() {
    if (timerInt) clearInterval(timerInt);
    let sec = 135;
    const timerEl = document.querySelector('#interview-timer');
    timerInt = setInterval(() => {
      sec++;
      const m = String(Math.floor(sec / 60)).padStart(2, '0');
      const s = String(sec % 60).padStart(2, '0');
      if (timerEl) timerEl.textContent = `⏱️ 00:${m}:${s}`;
    }, 1000);

    const canvas = document.querySelector('#audio-wave-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let step = 0;
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#4f46e5';
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 4) {
          const y = (canvas.height / 2) + Math.sin((x + step) * 0.08) * 8 * Math.random();
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        step += 3;
        videoAnimId = requestAnimationFrame(draw);
      };
      draw();
    }

    document.querySelector('#vid-eval-btn')?.addEventListener('click', () => {
      toast.success('AI Evaluation Ready! ⭐', 'Response analyzed with 94% technical depth.');
    });

    document.querySelector('#vid-end-btn')?.addEventListener('click', () => {
      if (timerInt) clearInterval(timerInt);
      if (videoAnimId) cancelAnimationFrame(videoAnimId);
      window.location.hash = '#/seeker/interviews';
    });
  }

  // --- Interviews List ---
  function renderInterviewsPage() {
    const user = getCurrentUser();
    if (!user) { window.location.hash = '#/login'; return ''; }
    const ints = getSeekerInterviews(user.id);

    return `
      <div class="dashboard-layout">
        ${renderSeekerSidebar('#/seeker/interviews')}
        <main class="dashboard-main">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
            <div>
              <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Live Video Interviews</h1>
              <p>Join scheduled interviews and test your setup.</p>
            </div>
            <a href="#/seeker/interviews/video" class="btn btn-primary">${getIcon('video')} Launch Video Room</a>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            ${ints.map(int => `
              <div class="card" style="padding: 1.75rem; border-left: 4px solid var(--primary);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
                  <div>
                    <h3 style="font-size: 1.25rem;">${int.title}</h3>
                    <div style="font-size: 0.9rem; color: var(--text-muted);">${int.companyName} • ${int.jobTitle}</div>
                  </div>
                  <div style="font-weight: 700; color: var(--primary);">📅 ${int.date} at ${int.startTime} IST</div>
                </div>
                <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
                  <a href="#/seeker/chat" class="btn btn-outline btn-sm">${getIcon('messageSquare')} Message</a>
                  <a href="#/seeker/interviews/video" class="btn btn-primary btn-sm">${getIcon('video')} Enter Video Room</a>
                </div>
              </div>
            `).join('')}
          </div>
        </main>
      </div>
    `;
  }

  function attachInterviewsEvents() {}

  // --- Chat Page ---
  function renderChatPage() {
    const user = getCurrentUser();
    if (!user) { window.location.hash = '#/login'; return ''; }
    const chat = getChatsList()[0];

    return `
      <div class="container" style="padding: 1.5rem 1.25rem;">
        <div class="chat-layout">
          <div class="chat-sidebar">
            <div class="chat-sidebar-header">
              <h3 style="font-size: 1.15rem; margin-bottom: 0.75rem;">Direct Messages</h3>
            </div>
            <ul class="chat-threads-list">
              <li class="chat-thread-item active">
                <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 700;">
                  💼
                </div>
                <div>
                  <div style="font-weight: 700; font-size: 0.9rem;">Priya Patel (TechCorp)</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">${chat?.lastMessage || ''}</div>
                </div>
              </li>
            </ul>
          </div>

          <div class="chat-main">
            <div class="chat-header">
              <div style="font-weight: 700;">Priya Patel (Recruiter at TechCorp Innovations)</div>
              <a href="#/seeker/interviews/video" class="btn btn-primary btn-sm">${getIcon('video')} Video Call</a>
            </div>
            <div class="chat-messages-container" id="chat-stream">
              ${(chat?.messages || []).map(m => `
                <div class="chat-bubble ${m.senderId === user.id ? 'sent' : 'received'}">
                  <div>${m.text}</div>
                  <div class="chat-timestamp">${new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              `).join('')}
            </div>
            <form id="chat-form" class="chat-input-bar">
              <input type="text" id="chat-input" class="form-input" placeholder="Type a message..." required autocomplete="off" style="flex: 1;">
              <button type="submit" class="btn btn-primary">${getIcon('send')} Send</button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  function attachChatEvents() {
    const stream = document.querySelector('#chat-stream');
    if (stream) stream.scrollTop = stream.scrollHeight;

    document.querySelector('#chat-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.querySelector('#chat-input');
      const text = input?.value.trim();
      if (!text) return;
      const user = getCurrentUser();
      sendMessage('chat_1', text, user?.id);
      input.value = '';

      if (stream) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble sent';
        bubble.innerHTML = `<div>${text}</div><div class="chat-timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>`;
        stream.appendChild(bubble);
        stream.scrollTop = stream.scrollHeight;
      }

      setTimeout(() => {
        const reply = "Thank you! Our engineering team will discuss this during the live session.";
        sendMessage('chat_1', reply, 'user_employer_1');
        if (stream) {
          const rb = document.createElement('div');
          rb.className = 'chat-bubble received';
          rb.innerHTML = `<div>${reply}</div><div class="chat-timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>`;
          stream.appendChild(rb);
          stream.scrollTop = stream.scrollHeight;
        }
      }, 1000);
    });
  }

  // --- Notifications Page ---
  function renderNotificationsPage() {
    const user = getCurrentUser();
    if (!user) { window.location.hash = '#/login'; return ''; }
    const notifs = getNotificationsList();

    return `
      <div class="dashboard-layout">
        ${renderSeekerSidebar('#/seeker/notifications')}
        <main class="dashboard-main">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
            <div>
              <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Notifications</h1>
              <p>Platform alerts and application updates.</p>
            </div>
            <div style="display: flex; gap: 0.75rem;">
              <button type="button" id="mark-read-btn" class="btn btn-outline btn-sm">Mark All Read</button>
              <button type="button" id="clear-notif-btn" class="btn btn-secondary btn-sm">Clear</button>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${notifs.map(n => `
              <div class="card" style="padding: 1.25rem; display: flex; align-items: flex-start; justify-content: space-between;">
                <div>
                  <div style="font-weight: 700;">${n.title}</div>
                  <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">${n.message}</div>
                </div>
                <a href="${n.link || '#/'}" class="btn btn-sm btn-outline">View</a>
              </div>
            `).join('')}
          </div>
        </main>
      </div>
    `;
  }

  function attachNotificationsEvents() {
    document.querySelector('#mark-read-btn')?.addEventListener('click', () => {
      markAllNotificationsRead();
      toast.success('Done', 'All notifications marked as read.');
      window.location.reload();
    });
    document.querySelector('#clear-notif-btn')?.addEventListener('click', () => {
      clearAllNotifications();
      toast.info('Cleared', 'Notifications cleared.');
      window.location.reload();
    });
  }

  // --- Salaries Explorer Page ---
  function renderSalariesPage(role = 'frontend') {
    const benchmarks = {
      'frontend': { title: 'Frontend React Engineer', median: '₹22.5 Lakhs / yr', p25: '₹14L', p75: '₹32L' },
      'backend': { title: 'Backend Python & Go Engineer', median: '₹24.0 Lakhs / yr', p25: '₹16L', p75: '₹36L' },
      'ai': { title: 'AI / ML Engineer', median: '₹30.0 Lakhs / yr', p25: '₹20L', p75: '₹48L' },
    };
    const cur = benchmarks[role] || benchmarks['frontend'];

    return `
      <div class="container" style="padding: 2.5rem 1.25rem;">
        <div style="text-align: center; max-width: 700px; margin: 0 auto 2.5rem auto;">
          <h1 style="font-size: 2.25rem; margin-bottom: 0.5rem;">Tech Salary Benchmarks</h1>
          <p>Verified compensation benchmarks across top tech hubs in India.</p>
        </div>
        <div style="display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 2rem;">
          <a href="#/salaries?role=frontend" class="btn btn-sm ${role === 'frontend' ? 'btn-primary' : 'btn-outline'}">Frontend</a>
          <a href="#/salaries?role=backend" class="btn btn-sm ${role === 'backend' ? 'btn-primary' : 'btn-outline'}">Backend</a>
          <a href="#/salaries?role=ai" class="btn btn-sm ${role === 'ai' ? 'btn-primary' : 'btn-outline'}">AI / ML</a>
        </div>
        <div class="card" style="max-width: 680px; margin: 0 auto; padding: 2rem; text-align: center;">
          <h2 style="font-size: 1.5rem;">${cur.title}</h2>
          <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary); margin: 1rem 0;">${cur.median}</div>
          <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.85rem; margin-bottom: 0.5rem;">
            <span>25th (${cur.p25})</span>
            <span>Median (50th)</span>
            <span>75th (${cur.p75})</span>
          </div>
          <div style="height: 12px; width: 100%; background: var(--bg-muted); border-radius: 9999px; overflow: hidden; display: flex;">
            <div style="width: 25%; background: #a5b4fc;"></div>
            <div style="width: 45%; background: var(--primary);"></div>
            <div style="width: 30%; background: #4338ca;"></div>
          </div>
        </div>
      </div>
    `;
  }

  function attachSalariesEvents() {}

  // --- Employer Pages (Dashboard, Jobs, Post Job, Applicants, Candidates, Analytics) ---
  function renderEmployerDashboardPage() {
    const user = getCurrentUser();
    if (!user || (user.role !== USER_ROLES.EMPLOYER && user.role !== USER_ROLES.ADMIN)) {
      window.location.hash = '#/login';
      return '';
    }
    const myJobs = getJobsList();
    const apps = getApplicationsList();

    return `
      <div class="dashboard-layout">
        ${renderEmployerSidebar('#/employer/dashboard')}
        <main class="dashboard-main">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
            <div>
              <span class="badge badge-secondary" style="margin-bottom: 0.35rem;">Employer Sourcing Hub</span>
              <h1 style="font-size: 1.85rem; margin-bottom: 0.25rem;">${user.companyName || 'TechCorp'} Overview</h1>
              <p>Track candidate pipelines and job openings.</p>
            </div>
            <a href="#/employer/post-job" class="btn btn-primary">${getIcon('plus')} Post a New Job</a>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
            <div class="card" style="padding: 1.5rem;">
              <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Active Postings</div>
              <div style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-top: 0.5rem;">${myJobs.length}</div>
            </div>
            <div class="card" style="padding: 1.5rem;">
              <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Applicants</div>
              <div style="font-size: 2rem; font-weight: 800; color: var(--secondary); margin-top: 0.5rem;">${apps.length}</div>
            </div>
          </div>

          <div class="card" style="padding: 1.75rem;">
            <h3 style="margin-bottom: 1.25rem;">Candidate Submissions</h3>
            <div class="table-responsive">
              <table class="data-table">
                <thead><tr><th>Candidate</th><th>Job</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  ${apps.map(a => `
                    <tr>
                      <td>${a.seekerName}</td>
                      <td>${a.jobTitle}</td>
                      <td><span class="badge badge-primary">${a.status}</span></td>
                      <td><a href="#/employer/jobs/${a.jobId}/applicants" class="btn btn-sm btn-outline">Review</a></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    `;
  }

  function attachEmployerDashboardEvents() {}

  function renderEmployerJobsPage() {
    const user = getCurrentUser();
    if (!user) { window.location.hash = '#/login'; return ''; }
    const myJobs = getJobsList();

    return `
      <div class="dashboard-layout">
        ${renderEmployerSidebar('#/employer/jobs')}
        <main class="dashboard-main">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
            <div>
              <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Manage Job Postings</h1>
              <p>You have ${myJobs.length} active positions.</p>
            </div>
            <a href="#/employer/post-job" class="btn btn-primary">${getIcon('plus')} Post Job</a>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            ${myJobs.map(j => `
              <div class="card" style="padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                <div>
                  <h3 style="font-size: 1.15rem;">${j.title}</h3>
                  <div style="font-size: 0.85rem; color: var(--text-muted);">${j.location} • ${j.applicantCount || 0} Applicants</div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                  <a href="#/employer/jobs/${j.id}/applicants" class="btn btn-primary btn-sm">Applicants (${j.applicantCount || 0})</a>
                  <button type="button" class="btn-icon del-job-btn" data-id="${j.id}" style="color: var(--danger);">${getIcon('trash')}</button>
                </div>
              </div>
            `).join('')}
          </div>
        </main>
      </div>
    `;
  }

  function attachEmployerJobsEvents() {
    document.querySelectorAll('.del-job-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Delete job listing?')) {
          deleteJob(btn.dataset.id);
          toast.info('Job Deleted', '');
          window.location.reload();
        }
      });
    });
  }

  function renderPostJobPage() {
    return `
      <div class="dashboard-layout">
        ${renderEmployerSidebar('#/employer/post-job')}
        <main class="dashboard-main">
          <h1 style="font-size: 1.85rem; margin-bottom: 1.5rem;">Post a Tech Vacancy</h1>
          <div class="card" style="padding: 2.5rem; max-width: 800px;">
            <form id="post-job-form">
              <div class="form-group">
                <label class="form-label">Job Title</label>
                <input type="text" id="pj-title" class="form-input" placeholder="e.g. Senior Frontend Engineer" required>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label class="form-label">Location</label>
                  <input type="text" id="pj-loc" class="form-input" placeholder="e.g. Bangalore, Remote" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Workplace</label>
                  <select id="pj-wp" class="form-select">
                    <option value="hybrid">Hybrid</option>
                    <option value="remote">Remote</option>
                    <option value="on-site">On-Site</option>
                  </select>
                </div>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label class="form-label">Min Salary (INR)</label>
                  <input type="number" id="pj-min" class="form-input" placeholder="1800000" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Max Salary (INR)</label>
                  <input type="number" id="pj-max" class="form-input" placeholder="2800000" required>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Skills (comma separated)</label>
                <input type="text" id="pj-skills" class="form-input" placeholder="React, TypeScript, Node.js" required>
              </div>
              <div class="form-group">
                <label class="form-label">Description</label>
                <textarea id="pj-desc" class="form-textarea" rows="4" placeholder="Describe the role..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-lg" style="margin-top: 1rem;">Publish Job Opening</button>
            </form>
          </div>
        </main>
      </div>
    `;
  }

  function attachPostJobEvents() {
    document.querySelector('#post-job-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.querySelector('#pj-title').value.trim();
      const location = document.querySelector('#pj-loc').value.trim();
      const workplaceType = document.querySelector('#pj-wp').value;
      const salaryMin = Number(document.querySelector('#pj-min').value);
      const salaryMax = Number(document.querySelector('#pj-max').value);
      const skills = document.querySelector('#pj-skills').value.split(',').map(s => s.trim()).filter(Boolean);
      const description = document.querySelector('#pj-desc').value.trim();

      createJob({
        title,
        location,
        workplaceType,
        jobType: 'full-time',
        experienceLevel: 'senior',
        salaryMin,
        salaryMax,
        skills,
        description,
        responsibilities: ['Architect scalable web applications', 'Collaborate across teams'],
        requirements: ['3+ years in tech stack'],
      });

      toast.success('Job Published! 🚀', 'Your opening is now live.');
      window.location.hash = '#/employer/jobs';
    });
  }

  function renderJobApplicantsPage(jobId) {
    const job = getJobById(jobId) || { id: jobId, title: 'Job' };
    const apps = getJobApplications(jobId);

    return `
      <div class="dashboard-layout">
        ${renderEmployerSidebar('#/employer/jobs')}
        <main class="dashboard-main">
          <h1 style="font-size: 1.85rem; margin-bottom: 0.5rem;">Applicants for ${job.title}</h1>
          <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1.5rem;">
            ${apps.map(a => `
              <div class="card" style="padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                  <div>
                    <h3 style="font-size: 1.15rem;">${a.seekerName}</h3>
                    <div style="font-size: 0.85rem; color: var(--text-muted);">${a.seekerEmail}</div>
                  </div>
                  <select class="form-select app-st-select" data-id="${a.id}" style="width: auto;">
                    <option value="${APPLICATION_STATUS.APPLIED}" ${a.status === APPLICATION_STATUS.APPLIED ? 'selected' : ''}>Applied</option>
                    <option value="${APPLICATION_STATUS.UNDER_REVIEW}" ${a.status === APPLICATION_STATUS.UNDER_REVIEW ? 'selected' : ''}>Under Review</option>
                    <option value="${APPLICATION_STATUS.SHORTLISTED}" ${a.status === APPLICATION_STATUS.SHORTLISTED ? 'selected' : ''}>Shortlisted</option>
                    <option value="${APPLICATION_STATUS.INTERVIEW}" ${a.status === APPLICATION_STATUS.INTERVIEW ? 'selected' : ''}>Interview Scheduled</option>
                    <option value="${APPLICATION_STATUS.HIRED}" ${a.status === APPLICATION_STATUS.HIRED ? 'selected' : ''}>Hired</option>
                  </select>
                </div>
                <div style="font-size: 0.875rem; background: var(--bg-muted); padding: 0.75rem; border-radius: 6px;">${a.coverLetter}</div>
                <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem;">
                  <a href="#/seeker/chat" class="btn btn-sm btn-outline">${getIcon('messageSquare')} Message</a>
                  <button type="button" class="btn btn-sm btn-primary sched-btn" data-id="${a.id}" data-name="${a.seekerName}">${getIcon('video')} Schedule Video</button>
                </div>
              </div>
            `).join('')}
          </div>
        </main>
      </div>
    `;
  }

  function attachJobApplicantsEvents(jobId) {
    const job = getJobById(jobId);
    document.querySelectorAll('.app-st-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        updateApplicationStatus(sel.dataset.id, e.target.value);
        toast.success('Updated', `Stage updated to ${e.target.value}`);
      });
    });
    document.querySelectorAll('.sched-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openScheduleInterviewModal({ candidate: { id: btn.dataset.id, name: btn.dataset.name }, job, onScheduled: () => window.location.reload() });
      });
    });
  }

  function renderCandidateSearchPage(params = {}) {
    const seekers = getAllUsers().filter(u => u.role === USER_ROLES.JOB_SEEKER);
    return `
      <div class="dashboard-layout">
        ${renderEmployerSidebar('#/employer/candidates')}
        <main class="dashboard-main">
          <h1 style="font-size: 1.85rem; margin-bottom: 1.5rem;">Talent Sourcing Directory</h1>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem;">
            ${seekers.map(s => `
              <div class="card card-hover" style="padding: 1.5rem;">
                <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.75rem;">
                  <img src="${s.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" style="width: 52px; height: 52px; border-radius: 50%; object-fit: cover;" alt="${s.name}">
                  <div>
                    <h3 style="font-size: 1.1rem;">${s.name}</h3>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">${s.location || 'India'}</div>
                  </div>
                </div>
                <div style="font-weight: 600; color: var(--primary); font-size: 0.875rem; margin-bottom: 0.5rem;">${s.headline || ''}</div>
                <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1rem;">
                  ${(s.skills || []).map(sk => `<span class="badge badge-muted">${sk}</span>`).join('')}
                </div>
                <button type="button" class="btn btn-primary btn-sm invite-cand-btn" data-name="${s.name}" style="width: 100%;">
                  ${getIcon('send')} Invite to Apply
                </button>
              </div>
            `).join('')}
          </div>
        </main>
      </div>
    `;
  }

  function attachCandidateSearchEvents() {
    document.querySelectorAll('.invite-cand-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        toast.success('Invitation Dispatched! ✉️', `Invited ${btn.dataset.name} to apply.`);
      });
    });
  }

  function renderEmployerAnalyticsPage() {
    return `
      <div class="dashboard-layout">
        ${renderEmployerSidebar('#/employer/analytics')}
        <main class="dashboard-main">
          <h1 style="font-size: 1.85rem; margin-bottom: 1.5rem;">Hiring Analytics & Funnels</h1>
          <div class="card" style="padding: 2rem;">
            <h3 style="margin-bottom: 1rem;">Recruitment Funnel Conversion</h3>
            <div style="display: flex; flex-direction: column; gap: 1.25rem;">
              <div>
                <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.875rem; margin-bottom: 0.35rem;">
                  <span>1. Applications Received</span><span>184 (100%)</span>
                </div>
                <div style="height: 10px; width: 100%; background: var(--bg-muted); border-radius: 9999px; overflow: hidden;">
                  <div style="width: 100%; height: 100%; background: var(--primary);"></div>
                </div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.875rem; margin-bottom: 0.35rem;">
                  <span>2. Shortlisted</span><span>78 (42%)</span>
                </div>
                <div style="height: 10px; width: 100%; background: var(--bg-muted); border-radius: 9999px; overflow: hidden;">
                  <div style="width: 42%; height: 100%; background: var(--secondary);"></div>
                </div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.875rem; margin-bottom: 0.35rem;">
                  <span>3. Hired</span><span>14 (7.6%)</span>
                </div>
                <div style="height: 10px; width: 100%; background: var(--bg-muted); border-radius: 9999px; overflow: hidden;">
                  <div style="width: 7.6%; height: 100%; background: var(--success);"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    `;
  }

  function attachEmployerAnalyticsEvents() {}

  // --- Admin Console ---
  function renderAdminDashboardPage() {
    const user = getCurrentUser();
    if (!user || user.role !== USER_ROLES.ADMIN) { window.location.hash = '#/login'; return ''; }
    const uList = getAllUsers();
    const jList = getJobsList();

    return `
      <div class="dashboard-layout">
        ${renderAdminSidebar('#/admin/dashboard')}
        <main class="dashboard-main">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem;">
            <div>
              <span class="badge badge-warning">System Admin Console</span>
              <h1 style="font-size: 1.85rem; margin-top: 0.25rem;">Platform Administration</h1>
            </div>
            <span class="badge badge-success">${getIcon('checkCircle')} Systems Healthy</span>
          </div>

          <div class="card" style="padding: 1.75rem; margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1.25rem;">User Directory Moderation</h3>
            <div class="table-responsive">
              <table class="data-table">
                <thead><tr><th>User</th><th>Role</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  ${uList.map(u => `
                    <tr>
                      <td>${u.name} (${u.email})</td>
                      <td><span class="badge badge-primary">${u.role}</span></td>
                      <td><span class="badge ${u.status === 'banned' ? 'badge-danger' : 'badge-success'}">${u.status || 'active'}</span></td>
                      <td>
                        <button type="button" class="btn btn-sm btn-outline ban-user-btn" data-id="${u.id}">
                          ${u.status === 'banned' ? 'Unban' : 'Ban'}
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    `;
  }

  function attachAdminDashboardEvents() {
    document.querySelectorAll('.ban-user-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const u = toggleUserStatus(btn.dataset.id);
        if (u) {
          toast.info('Status Updated', `User is now ${u.status}.`);
          window.location.reload();
        }
      });
    });
  }

  function renderNotFoundPage() {
    return `
      <div class="container" style="padding: 6rem 1.25rem; text-align: center;">
        <div style="font-size: 5rem; font-weight: 800; color: var(--primary);">404</div>
        <h1>Page Not Found</h1>
        <p style="margin: 0.5rem 0 1.5rem 0; color: var(--text-muted);">The requested page was not found.</p>
        <a href="#/" class="btn btn-primary">Return Home</a>
      </div>
    `;
  }

  // ==========================================================================
  // 7. ROUTING & INITIALIZATION
  // ==========================================================================

  function handleRoute() {
    let fullHash = window.location.hash;
    const user = getCurrentUser();

    // If user is not logged in and visits root or empty hash, redirect to login page first
    if (!fullHash || fullHash === '#' || fullHash === '#/') {
      if (!user) {
        window.location.hash = '#/login';
        return;
      } else {
        if (user.role === USER_ROLES.JOB_SEEKER) {
          window.location.hash = '#/seeker/dashboard';
          return;
        } else if (user.role === USER_ROLES.EMPLOYER) {
          window.location.hash = '#/employer/dashboard';
          return;
        } else if (user.role === USER_ROLES.ADMIN) {
          window.location.hash = '#/admin/dashboard';
          return;
        }
      }
    }

    const [hashPath, queryString] = fullHash.split('?');
    const params = Object.fromEntries(new URLSearchParams(queryString || '').entries());

    // If user is already logged in and visits login or signup, redirect to their dashboard
    if ((hashPath === '#/login' || hashPath === '#/signup') && user) {
      if (user.role === USER_ROLES.JOB_SEEKER) window.location.hash = '#/seeker/dashboard';
      else if (user.role === USER_ROLES.EMPLOYER) window.location.hash = '#/employer/dashboard';
      else if (user.role === USER_ROLES.ADMIN) window.location.hash = '#/admin/dashboard';
      return;
    }

    // Protect seeker, employer, and admin routes
    if (!user && (hashPath.startsWith('#/seeker') || hashPath.startsWith('#/employer') || hashPath.startsWith('#/admin'))) {
      toast.info('Sign In Required', 'Please sign in to access this page.');
      window.location.hash = '#/login';
      return;
    }

    const pageContainer = document.querySelector('#page-content');
    const navbarContainer = document.querySelector('#navbar-container');
    const footerContainer = document.querySelector('#footer-container');

    if (navbarContainer) {
      navbarContainer.innerHTML = renderNavbar();
      attachNavbarEvents();
    }
    if (footerContainer) {
      footerContainer.innerHTML = renderFooter();
    }

    let html = '';
    let attachFn = null;
    let title = 'JobConnect - Next-Gen Career & Hiring Ecosystem';

    if (hashPath === '#/' || hashPath === '#') {
      html = renderLandingPage();
      attachFn = attachLandingEvents;
    } else if (hashPath === '#/login') {
      html = renderLoginPage();
      attachFn = attachLoginEvents;
    } else if (hashPath === '#/signup') {
      html = renderSignupPage();
      attachFn = attachSignupEvents;
    } else if (hashPath === '#/forgot-password') {
      html = renderForgotPasswordPage();
      attachFn = attachForgotEvents;
    } else if (hashPath === '#/verify-otp') {
      html = renderVerifyOtpPage();
      attachFn = attachOtpEvents;
    } else if (hashPath === '#/jobs') {
      html = renderJobsPage(params);
      attachFn = attachJobsEvents;
    } else if (hashPath.startsWith('#/jobs/') && !hashPath.includes('/applicants')) {
      const jobId = hashPath.replace('#/jobs/', '');
      html = renderJobDetailsPage(jobId);
      attachFn = () => attachJobDetailsEvents(jobId);
    } else if (hashPath === '#/companies') {
      html = renderCompaniesPage(params);
      attachFn = attachCompaniesEvents;
    } else if (hashPath.startsWith('#/companies/')) {
      const compId = hashPath.replace('#/companies/', '');
      html = renderCompanyDetailsPage(compId);
      attachFn = () => attachCompanyDetailsEvents(compId);
    } else if (hashPath === '#/salaries') {
      html = renderSalariesPage(params.role || 'frontend');
      attachFn = attachSalariesEvents;
    } else if (hashPath.startsWith('#/ai-tools')) {
      html = renderAiResumeAnalyzerPage();
      attachFn = attachAiResumeEvents;
    } else if (hashPath === '#/seeker/dashboard') {
      html = renderSeekerDashboardPage();
      attachFn = attachSeekerDashboardEvents;
    } else if (hashPath === '#/seeker/profile') {
      html = renderProfilePage();
      attachFn = attachProfileEvents;
    } else if (hashPath === '#/seeker/applications') {
      html = renderApplicationsPage(params.status || '');
      attachFn = attachApplicationsEvents;
    } else if (hashPath === '#/seeker/saved-jobs') {
      html = renderSavedJobsPage();
      attachFn = attachSavedJobsEvents;
    } else if (hashPath === '#/seeker/interviews') {
      html = renderInterviewsPage();
      attachFn = attachInterviewsEvents;
    } else if (hashPath.startsWith('#/seeker/interviews/video')) {
      html = renderVideoInterviewPage();
      attachFn = attachVideoInterviewEvents;
    } else if (hashPath === '#/seeker/chat') {
      html = renderChatPage();
      attachFn = attachChatEvents;
    } else if (hashPath === '#/seeker/notifications') {
      html = renderNotificationsPage();
      attachFn = attachNotificationsEvents;
    } else if (hashPath === '#/employer/dashboard') {
      html = renderEmployerDashboardPage();
      attachFn = attachEmployerDashboardEvents;
    } else if (hashPath === '#/employer/jobs') {
      html = renderEmployerJobsPage();
      attachFn = attachEmployerJobsEvents;
    } else if (hashPath === '#/employer/post-job') {
      html = renderPostJobPage();
      attachFn = attachPostJobEvents;
    } else if (hashPath.startsWith('#/employer/jobs/') && hashPath.endsWith('/applicants')) {
      const jobId = hashPath.replace('#/employer/jobs/', '').replace('/applicants', '');
      html = renderJobApplicantsPage(jobId);
      attachFn = () => attachJobApplicantsEvents(jobId);
    } else if (hashPath === '#/employer/candidates') {
      html = renderCandidateSearchPage(params);
      attachFn = attachCandidateSearchEvents;
    } else if (hashPath === '#/employer/analytics') {
      html = renderEmployerAnalyticsPage();
      attachFn = attachEmployerAnalyticsEvents;
    } else if (hashPath === '#/admin/dashboard') {
      html = renderAdminDashboardPage();
      attachFn = attachAdminDashboardEvents;
    } else {
      html = renderNotFoundPage();
    }

    if (pageContainer) pageContainer.innerHTML = html;
    window.scrollTo(0, 0);
    if (typeof attachFn === 'function') attachFn();
  }

  // App initialization
  function initApp() {
    const savedTheme = getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);

    subscribe((evt, data) => {
      if (evt === 'theme:change') {
        document.documentElement.setAttribute('data-theme', data);
      } else if (evt === 'language:change' || evt === 'auth:change') {
        handleRoute();
      }
    });

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();

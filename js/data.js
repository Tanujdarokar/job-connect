/* ==========================================================================
   CareerConnect — Sample Portfolio Demo Dataset
   All listings and company profiles below are fictional demo data.
   ========================================================================== */

(function () {
  "use strict";

  const companies = [
    { id: "comp-1", name: "Razorpay", city: "Bengaluru", mark: "R", industry: "Fintech", size: "1,000-5,000 employees", website: "https://razorpay.com", rating: 4.8 },
    { id: "comp-2", name: "Infosys", city: "Bengaluru", mark: "I", industry: "IT Services & Consulting", size: "10,000+ employees", website: "https://infosys.com", rating: 4.5 },
    { id: "comp-3", name: "Swiggy", city: "Bengaluru", mark: "S", industry: "Consumer Technology", size: "5,000-10,000 employees", website: "https://swiggy.com", rating: 4.6 },
    { id: "comp-4", name: "Microsoft India", city: "Hyderabad", mark: "M", industry: "Enterprise Software", size: "10,000+ employees", website: "https://microsoft.com", rating: 4.9 },
    { id: "comp-5", name: "Freshworks", city: "Chennai", mark: "F", industry: "SaaS & Cloud Solutions", size: "1,000-5,000 employees", website: "https://freshworks.com", rating: 4.7 },
    { id: "comp-6", name: "PhonePe", city: "Bengaluru", mark: "P", industry: "Fintech & Digital Payments", size: "1,000-5,000 employees", website: "https://phonepe.com", rating: 4.7 },
    { id: "comp-7", name: "TCS", city: "Mumbai", mark: "T", industry: "IT Services", size: "10,000+ employees", website: "https://tcs.com", rating: 4.4 },
    { id: "comp-8", name: "Zomato", city: "Gurugram", mark: "Z", industry: "Food Tech & Commerce", size: "1,000-5,000 employees", website: "https://zomato.com", rating: 4.6 },
    { id: "comp-9", name: "Persistent Systems", city: "Pune", mark: "P", industry: "Software Engineering", size: "5,000-10,000 employees", website: "https://persistent.com", rating: 4.5 },
    { id: "comp-10", name: "Adobe India", city: "Noida", mark: "A", industry: "Creative Software", size: "1,000-5,000 employees", website: "https://adobe.com", rating: 4.8 }
  ];

  const jobsData = [
    {
      title: "Senior Frontend Developer",
      category: "Frontend Development",
      skills: ["React", "TypeScript", "CSS3", "Next.js"],
      salary: 18,
      experience: "2–4 years",
      type: "Full-time",
      mode: "Hybrid",
      location: "Bengaluru",
      companyIdx: 0,
      postedDays: 1,
      featured: true,
      description: "Razorpay is seeking an experienced Senior Frontend Developer to lead high-impact UI initiatives across our merchant dashboards. You will build pixel-perfect, scalable web interfaces that serve millions of daily business transactions.",
      responsibilities: [
        "Design and implement responsive, high-performance web components using React and TypeScript.",
        "Optimize web performance, accessibility, and cross-browser compatibility.",
        "Collaborate closely with UX designers, product managers, and backend engineers.",
        "Mentor junior frontend developers and promote modern engineering best practices."
      ],
      qualification: "B.Tech/B.E in Computer Science or equivalent hands-on experience with 2+ years of production React experience."
    },
    {
      title: "Flutter Mobile Developer",
      category: "Flutter Development",
      skills: ["Flutter", "Dart", "REST APIs", "State Management"],
      salary: 12,
      experience: "1–3 years",
      type: "Full-time",
      mode: "Remote",
      location: "Remote (India)",
      companyIdx: 5,
      postedDays: 2,
      featured: true,
      description: "PhonePe is expanding its mobile engineering team to build next-generation cross-platform applications. We are looking for a passionate Flutter Developer to craft smooth iOS and Android mobile experiences.",
      responsibilities: [
        "Develop high-performance Flutter mobile apps for Android and iOS.",
        "Integrate backend RESTful APIs, payment gateways, and push notifications.",
        "Maintain clean architecture using Provider / Riverpod / BLoC state management.",
        "Ensure app security, offline storage, and responsive UI scaling across devices."
      ],
      qualification: "Degree in Computer Science or relevant experience building and deploying Flutter applications to app stores."
    },
    {
      title: "Backend Software Engineer",
      category: "Backend Development",
      skills: ["Java", "Spring Boot", "Microservices", "PostgreSQL"],
      salary: 22,
      experience: "3–5 years",
      type: "Full-time",
      mode: "Hybrid",
      location: "Hyderabad",
      companyIdx: 3,
      postedDays: 2,
      featured: true,
      description: "Microsoft India is hiring a Backend Engineer to work on cloud services scaling globally. You will design scalable microservices and robust database structures powering distributed enterprise systems.",
      responsibilities: [
        "Architect and maintain scalable microservices using Java and Spring Boot.",
        "Design efficient relational and non-relational database models.",
        "Implement secure authentication, caching strategies, and message queues.",
        "Participate in code reviews, CI/CD pipeline automation, and system monitoring."
      ],
      qualification: "Bachelor's or Master's in CS/IT with 3+ years backend development experience in Java/Spring ecosystems."
    },
    {
      title: "AI / Machine Learning Engineer",
      category: "AI/ML",
      skills: ["Python", "PyTorch", "LLMs", "Scikit-Learn"],
      salary: 26,
      experience: "2–5 years",
      type: "Full-time",
      mode: "Remote",
      location: "Remote (India)",
      companyIdx: 9,
      postedDays: 3,
      featured: true,
      description: "Adobe India is hiring an AI/ML Engineer to integrate cutting-edge generative AI capabilities into global creative tools. You will fine-tune models, optimize inference pipelines, and work on intelligent image & text processing.",
      responsibilities: [
        "Train, evaluate, and deploy machine learning and deep learning models.",
        "Build scalable ML pipelines for model training, inference, and monitoring.",
        "Experiment with GenAI models, prompt engineering, and RAG architectures.",
        "Collaborate with product teams to translate user requirements into ML solutions."
      ],
      qualification: "Degree in CS, Data Science, AI, or related field with strong Python and PyTorch proficiency."
    },
    {
      title: "Full Stack Engineer",
      category: "Full Stack Development",
      skills: ["Node.js", "React", "MongoDB", "Express"],
      salary: 16,
      experience: "1–3 years",
      type: "Full-time",
      mode: "On-site",
      location: "Bengaluru",
      companyIdx: 2,
      postedDays: 3,
      featured: true,
      description: "Swiggy is looking for a versatile Full Stack Developer to build end-to-end features for merchant onboarding and delivery logistics. You will own features from UI mockups down to database queries.",
      responsibilities: [
        "Develop web applications using Node.js, Express, React, and MongoDB.",
        "Create RESTful APIs and real-time WebSocket communication pipelines.",
        "Write clean, modular code backed by comprehensive automated tests.",
        "Optimize web application speed and server resource utilization."
      ],
      qualification: "1+ years of full stack web development experience with solid JavaScript/TypeScript skills."
    },
    {
      title: "UI/UX Product Designer",
      category: "UI/UX Design",
      skills: ["Figma", "User Research", "Wireframing", "Design Systems"],
      salary: 14,
      experience: "2–4 years",
      type: "Full-time",
      mode: "Hybrid",
      location: "Chennai",
      companyIdx: 4,
      postedDays: 4,
      featured: true,
      description: "Freshworks is hiring a Product Designer to refine customer service dashboards. You will champion user-centered design, build intuitive user flows, and maintain our design system component libraries.",
      responsibilities: [
        "Conduct user research, usability testing, and persona creation.",
        "Create high-fidelity wireframes, interactive prototypes, and UI specifications in Figma.",
        "Collaborate with developers to ensure faithful implementation of designs.",
        "Maintain and evolve accessible design system components."
      ],
      qualification: "Portfolio demonstrating end-to-end product design process and 2+ years of UI/UX experience."
    },
    {
      title: "Data Analyst",
      category: "Data Science",
      skills: ["SQL", "Python", "Power BI", "Tableau"],
      salary: 10,
      experience: "0–2 years",
      type: "Full-time",
      mode: "On-site",
      location: "Gurugram",
      companyIdx: 7,
      postedDays: 4,
      featured: false,
      description: "Zomato is seeking an analytical Data Analyst to evaluate customer ordering trends, delivery efficiencies, and restaurant metrics to drive data-informed business decisions.",
      responsibilities: [
        "Extract, clean, and analyze large datasets using SQL and Python.",
        "Build interactive executive dashboards in Power BI and Tableau.",
        "Uncover business insights, customer behavior patterns, and market trends.",
        "Present analytical findings clearly to cross-functional teams and stakeholders."
      ],
      qualification: "Degree in Statistics, Mathematics, CS, or Business Analytics with proficiency in SQL and Excel."
    },
    {
      title: "Java Backend Developer",
      category: "Java Development",
      skills: ["Java", "Spring Boot", "Hibernate", "MySQL"],
      salary: 11,
      experience: "1–3 years",
      type: "Full-time",
      mode: "Hybrid",
      location: "Pune",
      companyIdx: 8,
      postedDays: 5,
      featured: false,
      description: "Persistent Systems is hiring a Java Developer to build enterprise backend systems for international banking clients. You will write clean, well-tested code for complex workflow automation.",
      responsibilities: [
        "Develop backend REST APIs using Java 17 and Spring Boot.",
        "Implement ORM mapping with Hibernate and optimize database queries.",
        "Unit test APIs using JUnit and Mockito.",
        "Debug production issues and participate in Agile sprint planning."
      ],
      qualification: "1+ years of experience in core Java, Object-Oriented programming, and Spring Boot."
    },
    {
      title: "Python Web Developer",
      category: "Python Development",
      skills: ["Python", "Django", "FastAPI", "PostgreSQL"],
      salary: 9,
      experience: "0–2 years",
      type: "Full-time",
      mode: "On-site",
      location: "Mumbai",
      companyIdx: 6,
      postedDays: 5,
      featured: false,
      description: "TCS is looking for a Python Developer to join its client innovation hub. You will build secure web applications, data processing scripts, and internal API services.",
      responsibilities: [
        "Develop web backends using Django and FastAPI.",
        "Write clean, readable Python code adhering to PEP 8 standards.",
        "Create relational database schemas and optimize query performance.",
        "Integrate third-party web services and internal APIs."
      ],
      qualification: "Degree in CS/IT or equivalent training with strong core Python foundation."
    },
    {
      title: "Cloud DevOps Engineer",
      category: "Backend Development",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
      salary: 20,
      experience: "3–5 years",
      type: "Full-time",
      mode: "Remote",
      location: "Remote (India)",
      companyIdx: 1,
      postedDays: 6,
      featured: false,
      description: "Infosys Cloud Services is hiring a DevOps Engineer to automate infrastructure deployment, manage Kubernetes clusters, and optimize cloud security for enterprise applications.",
      responsibilities: [
        "Manage cloud infrastructure on AWS using Terraform and Ansible.",
        "Build automated CI/CD pipelines in GitHub Actions and Jenkins.",
        "Monitor system performance, uptime, and cluster health.",
        "Implement cloud security policies and backup disaster recovery strategies."
      ],
      qualification: "3+ years in DevOps/SRE roles with hands-on AWS and Docker/Kubernetes experience."
    },
    {
      title: "Junior Web Developer",
      category: "Web Development",
      skills: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
      salary: 6,
      experience: "0–1 years",
      type: "Full-time",
      mode: "On-site",
      location: "Bengaluru",
      companyIdx: 1,
      postedDays: 6,
      featured: false,
      description: "Infosys Digital is looking for a Junior Web Developer to join its frontend client solutions team. Great opportunity for freshers with solid web fundamentals.",
      responsibilities: [
        "Build responsive web pages using semantic HTML, CSS, and vanilla JS.",
        "Maintain existing client web portals and resolve layout issues.",
        "Ensure web pages comply with web accessibility (WCAG) standards."
      ],
      qualification: "Fresh graduates with computer science background and strong HTML/CSS/JS fundamentals."
    },
    {
      title: "Lead Data Scientist",
      category: "Data Science",
      skills: ["Python", "Pandas", "Scikit-Learn", "BigQuery"],
      salary: 24,
      experience: "3–6 years",
      type: "Full-time",
      mode: "Hybrid",
      location: "Hyderabad",
      companyIdx: 3,
      postedDays: 7,
      featured: false,
      description: "Microsoft AI is seeking a Lead Data Scientist to build predictive analytics models for cloud usage forecasting and customer retention analysis.",
      responsibilities: [
        "Formulate data science solutions for complex business problems.",
        "Build predictive models and machine learning pipelines using Python.",
        "Work with large scale cloud datasets in Azure and BigQuery.",
        "Communicate model insights and business impact to executive leadership."
      ],
      qualification: "3+ years data science experience with advanced degree in quantitative field."
    },
    {
      title: "React Native Developer",
      category: "Frontend Development",
      skills: ["React Native", "Redux", "JavaScript", "Mobile Design"],
      salary: 13,
      experience: "1–3 years",
      type: "Full-time",
      mode: "Remote",
      location: "Remote (India)",
      companyIdx: 2,
      postedDays: 7,
      featured: false,
      description: "Swiggy is looking for a React Native engineer to build consumer-facing features for mobile devices.",
      responsibilities: [
        "Develop cross-platform mobile apps in React Native.",
        "Optimize animations and list performance for mobile devices.",
        "Integrate native iOS and Android modules when necessary."
      ],
      qualification: "1+ years of React Native development experience."
    },
    {
      title: "Backend Go Developer",
      category: "Backend Development",
      skills: ["Go (Golang)", "PostgreSQL", "Redis", "gRPC"],
      salary: 21,
      experience: "2–4 years",
      type: "Full-time",
      mode: "Hybrid",
      location: "Bengaluru",
      companyIdx: 0,
      postedDays: 8,
      featured: false,
      description: "Razorpay Core Banking team is seeking a Go Developer to build high-throughput transaction processing systems.",
      responsibilities: [
        "Write highly concurrent, low-latency microservices in Go.",
        "Manage Redis caching layers and high-concurrency PostgreSQL databases.",
        "Ensure sub-millisecond API response times for financial transactions."
      ],
      qualification: "2+ years experience building backend systems in Go or Java."
    },
    {
      title: "QA Automation Engineer",
      category: "Web Development",
      skills: ["Selenium", "JavaScript", "Playwright", "API Testing"],
      salary: 9,
      experience: "1–3 years",
      type: "Full-time",
      mode: "On-site",
      location: "Pune",
      companyIdx: 8,
      postedDays: 8,
      featured: false,
      description: "Persistent Systems is hiring a QA Automation Engineer to write regression suites and API tests for web portals.",
      responsibilities: [
        "Create automated UI test suites using Playwright and Selenium.",
        "Perform REST API testing using Postman and REST Assured.",
        "Integrate automated test runs into CI/CD build pipelines."
      ],
      qualification: "1+ years experience in automated software testing."
    },
    {
      title: "Python AI Developer",
      category: "AI/ML",
      skills: ["Python", "LangChain", "OpenAI API", "Vector Databases"],
      salary: 19,
      experience: "1–3 years",
      type: "Full-time",
      mode: "Remote",
      location: "Remote (India)",
      companyIdx: 4,
      postedDays: 9,
      featured: false,
      description: "Freshworks AI Labs is hiring a Python Developer specialized in building GenAI agents and RAG search pipelines.",
      responsibilities: [
        "Build AI conversational agents using LangChain and Python.",
        "Index structured knowledge in Vector Databases like Pinecone/Faiss.",
        "Evaluate LLM outputs and reduce hallucination rates."
      ],
      qualification: "Hands-on experience building LLM-powered applications."
    },
    {
      title: "UI Designer & Design Systems Specialist",
      category: "UI/UX Design",
      skills: ["Figma", "Design Systems", "Component Libraries", "Tokens"],
      salary: 12,
      experience: "1–3 years",
      type: "Full-time",
      mode: "Hybrid",
      location: "Noida",
      companyIdx: 9,
      postedDays: 9,
      featured: false,
      description: "Adobe India is hiring a UI Designer dedicated to building design tokens and reusable UI components.",
      responsibilities: [
        "Design scalable UI component libraries in Figma.",
        "Define typography, spacing, color tokens, and accessibility standards.",
        "Conduct visual design QA with frontend engineering teams."
      ],
      qualification: "Strong portfolio of UI component systems and Figma expertise."
    },
    {
      title: "Full Stack Java & Angular Engineer",
      category: "Full Stack Development",
      skills: ["Java", "Spring Boot", "Angular", "TypeScript"],
      salary: 15,
      experience: "2–4 years",
      type: "Full-time",
      mode: "On-site",
      location: "Mumbai",
      companyIdx: 6,
      postedDays: 10,
      featured: false,
      description: "TCS Enterprise Solutions is looking for a Full Stack Engineer proficient in Java Spring Boot and Angular.",
      responsibilities: [
        "Develop web applications with Angular frontend and Spring Boot backend.",
        "Design database schemas and write complex SQL procedures.",
        "Implement secure OAuth2 and JWT authentication flows."
      ],
      qualification: "2+ years of full stack software engineering experience."
    },
    {
      title: "Business Intelligence Specialist",
      category: "Data Science",
      skills: ["SQL", "Power BI", "Data Warehousing", "Excel"],
      salary: 11,
      experience: "1–3 years",
      type: "Full-time",
      mode: "Hybrid",
      location: "Bengaluru",
      companyIdx: 5,
      postedDays: 11,
      featured: false,
      description: "PhonePe Analytics is hiring a BI Specialist to create financial reporting dashboards and monitor transaction velocity.",
      responsibilities: [
        "Develop automated Power BI reports for key executive metrics.",
        "Query large transactional databases with SQL.",
        "Collaborate with finance and growth teams to validate data accuracy."
      ],
      qualification: "Experience creating BI dashboards and analyzing business data."
    },
    {
      title: "Flutter Mobile Architect",
      category: "Flutter Development",
      skills: ["Flutter", "Dart", "Clean Architecture", "CI/CD"],
      salary: 25,
      experience: "4–6 years",
      type: "Full-time",
      mode: "Remote",
      location: "Remote (India)",
      companyIdx: 0,
      postedDays: 12,
      featured: false,
      description: "Razorpay Mobile Team is seeking a Lead Flutter Developer to architect our next-gen POS and merchant app solutions.",
      responsibilities: [
        "Architect scalable cross-platform mobile apps using Flutter.",
        "Define mobile coding standards and automated testing pipelines.",
        "Optimize app startup time, memory footprint, and rendering frames."
      ],
      qualification: "4+ years mobile development experience with 2+ years leading Flutter initiatives."
    }
  ];

  const internshipsData = [
    {
      title: "Frontend Web Development Intern",
      category: "Web Development",
      skills: ["HTML5", "CSS3", "JavaScript", "Git"],
      stipend: 15000,
      duration: 3,
      mode: "Remote",
      paid: true,
      location: "Remote (India)",
      companyIdx: 0,
      postedDays: 1,
      daysLeft: 12,
      description: "Razorpay is offering a 3-month remote frontend internship for creative Web Developers. You will work alongside senior engineers to create accessible landing pages, design components, and interactive micro-apps.",
      qualification: "Pursuing or recent graduate in CS/IT or related field with strong HTML/CSS/JS knowledge."
    },
    {
      title: "Flutter App Development Intern",
      category: "Flutter Development",
      skills: ["Flutter", "Dart", "Firebase", "State Management"],
      stipend: 18000,
      duration: 4,
      mode: "Hybrid",
      location: "Bengaluru",
      companyIdx: 5,
      postedDays: 2,
      daysLeft: 4, // urgent
      description: "PhonePe is looking for a Flutter Intern to build interactive mobile features. You will learn state management, REST API integration, and mobile UI design patterns.",
      qualification: "Enrolled in Bachelor's or Master's degree. Portfolio or GitHub project in Flutter is required."
    },
    {
      title: "Machine Learning & AI Intern",
      category: "AI/ML",
      skills: ["Python", "Scikit-Learn", "Pandas", "Jupyter"],
      stipend: 25000,
      duration: 6,
      mode: "On-site",
      location: "Hyderabad",
      companyIdx: 3,
      postedDays: 2,
      daysLeft: 15,
      description: "Microsoft India Research Labs invites applications for a 6-month ML internship. You will work on data preprocessing, model evaluation, and computer vision / NLP experimentation.",
      qualification: "Pursuing B.Tech/M.Tech/MS in Computer Science or Data Science with solid Python programming foundation."
    },
    {
      title: "Data Science & Analytics Intern",
      category: "Data Science",
      skills: ["Python", "SQL", "Power BI", "Statistics"],
      stipend: 20000,
      duration: 3,
      mode: "Hybrid",
      location: "Bengaluru",
      companyIdx: 2,
      postedDays: 3,
      daysLeft: 3, // urgent
      description: "Swiggy Data Team is hiring a Data Science Intern to analyze consumer order trends, customer churn metrics, and delivery optimization datasets.",
      qualification: "Pre-final or final year student in STEM field with proficiency in SQL and Python."
    },
    {
      title: "UI/UX Design Intern",
      category: "UI/UX Design",
      skills: ["Figma", "Wireframing", "User Research", "Prototyping"],
      stipend: 15000,
      duration: 3,
      mode: "Remote",
      paid: true,
      location: "Remote (India)",
      companyIdx: 4,
      postedDays: 3,
      daysLeft: 10,
      description: "Freshworks is looking for a UI/UX Design Intern to craft intuitive interface layouts and wireframes for SaaS product modules.",
      qualification: "Design portfolio demonstrating UI/UX design process, typography, and Figma mastery."
    },
    {
      title: "Full Stack Web Intern",
      category: "Full Stack Development",
      skills: ["React", "Node.js", "Express", "MongoDB"],
      stipend: 22000,
      duration: 6,
      mode: "On-site",
      location: "Bengaluru",
      companyIdx: 0,
      postedDays: 4,
      daysLeft: 18,
      description: "Razorpay engineering is hiring a Full Stack Web Intern to build end-to-end admin web applications.",
      qualification: "Knowledge of MERN stack (MongoDB, Express, React, Node.js)."
    },
    {
      title: "Java Software Development Intern",
      category: "Java Development",
      skills: ["Java", "Spring Boot", "SQL", "Git"],
      stipend: 16000,
      duration: 4,
      mode: "Hybrid",
      location: "Pune",
      companyIdx: 8,
      postedDays: 4,
      daysLeft: 2, // urgent
      description: "Persistent Systems is seeking a Java Intern to assist in building backend APIs and database connectivity routines.",
      qualification: "Good understanding of Object-Oriented Programming (OOP) in Java and Data Structures."
    },
    {
      title: "Python Web Engineering Intern",
      category: "Python Development",
      skills: ["Python", "Django", "REST APIs", "SQLite"],
      stipend: 14000,
      duration: 3,
      mode: "Remote",
      paid: true,
      location: "Remote (India)",
      companyIdx: 9,
      postedDays: 5,
      daysLeft: 14,
      description: "Adobe India is offering a remote Python internship focused on backend API building and script automation.",
      qualification: "Comfortable writing Python scripts and understanding basic web server concepts."
    },
    {
      title: "Backend API Engineering Intern",
      category: "Backend Development",
      skills: ["Node.js", "Express", "PostgreSQL", "Postman"],
      stipend: 18000,
      duration: 6,
      mode: "Hybrid",
      location: "Chennai",
      companyIdx: 4,
      postedDays: 5,
      daysLeft: 8,
      description: "Freshworks is hiring a Backend Intern to create server-side endpoints and optimize database queries.",
      qualification: "Familiarity with Node.js runtime and relational databases."
    },
    {
      title: "Web Accessibility & Frontend Intern",
      category: "Web Development",
      skills: ["HTML5", "CSS3", "JavaScript", "Accessibility"],
      stipend: 0,
      duration: 2,
      mode: "On-site",
      paid: false,
      location: "Mumbai",
      companyIdx: 6,
      postedDays: 6,
      daysLeft: 5, // urgent
      description: "TCS CSR initiative is offering a 2-month educational stipend-free internship focusing on web accessibility standards and inclusive web design.",
      qualification: "Students interested in learning modern WCAG web standards and CSS layouts."
    },
    {
      title: "Generative AI Research Intern",
      category: "AI/ML",
      skills: ["Python", "PyTorch", "LLMs", "LangChain"],
      stipend: 30000,
      duration: 6,
      mode: "On-site",
      location: "Hyderabad",
      companyIdx: 3,
      postedDays: 6,
      daysLeft: 20,
      description: "Microsoft India Research is accepting applications for a Generative AI research internship exploring prompt optimization and multi-modal models.",
      qualification: "Enrolled in Master's or PhD or final year B.Tech with publication or strong research background."
    },
    {
      title: "Mobile App Flutter Intern",
      category: "Flutter Development",
      skills: ["Flutter", "Dart", "REST APIs", "UI Animations"],
      stipend: 16000,
      duration: 3,
      mode: "Remote",
      paid: true,
      location: "Remote (India)",
      companyIdx: 7,
      postedDays: 7,
      daysLeft: 11,
      description: "Zomato is seeking a Flutter Intern to build interactive prototype features for delivery partner mobile apps.",
      qualification: "Experience creating at least 1 Flutter application."
    },
    {
      title: "Product Design & Prototyping Intern",
      category: "UI/UX Design",
      skills: ["Figma", "User Testing", "Prototyping", "UI Kit"],
      stipend: 14000,
      duration: 4,
      mode: "Hybrid",
      location: "Noida",
      companyIdx: 9,
      postedDays: 7,
      daysLeft: 4, // urgent
      description: "Adobe India is hiring a Product Design Intern to help create UI component libraries and conduct user testing sessions.",
      qualification: "Portfolio link required showing UI screens and interactive prototypes."
    },
    {
      title: "Business Data & Analytics Intern",
      category: "Data Science",
      skills: ["Excel", "SQL", "Tableau", "Data Analysis"],
      stipend: 12000,
      duration: 3,
      mode: "On-site",
      paid: true,
      location: "Gurugram",
      companyIdx: 7,
      postedDays: 8,
      daysLeft: 16,
      description: "Zomato Business Operations is offering a 3-month data analytics internship for enthusiastic freshers.",
      qualification: "Strong Excel skills (VLOOKUP, Pivot tables) and basic SQL understanding."
    },
    {
      title: "React Frontend Developer Intern",
      category: "Frontend Development",
      skills: ["React", "TypeScript", "CSS Modules", "Redux"],
      stipend: 20000,
      duration: 6,
      mode: "Remote",
      paid: true,
      location: "Remote (India)",
      companyIdx: 5,
      postedDays: 8,
      daysLeft: 9,
      description: "PhonePe Web Team is looking for a React Intern to work on high-traffic web apps and payment portals.",
      qualification: "Proficiency in React hooks, state management, and modern JavaScript."
    },
    {
      title: "Cloud & DevOps Intern",
      category: "Backend Development",
      skills: ["Linux", "AWS", "Docker", "Shell Scripting"],
      stipend: 18000,
      duration: 4,
      mode: "Hybrid",
      location: "Bengaluru",
      companyIdx: 1,
      postedDays: 9,
      daysLeft: 13,
      description: "Infosys Cloud Labs is hiring a DevOps Intern to assist in containerizing microservices and managing CI/CD scripts.",
      qualification: "Basic Linux administration knowledge and familiarity with Docker containers."
    },
    {
      title: "Java Core Developer Intern",
      category: "Java Development",
      skills: ["Java", "DSA", "OOP", "Git"],
      stipend: 0,
      duration: 3,
      mode: "On-site",
      paid: false,
      location: "Mumbai",
      companyIdx: 6,
      postedDays: 9,
      daysLeft: 1, // urgent
      description: "TCS Academic Learning Program offers a stipend-free software engineering internship focused on Java data structures, algorithms, and clean code practices.",
      qualification: "Engineering students seeking industry training credit."
    },
    {
      title: "Generative AI Application Intern",
      category: "AI/ML",
      skills: ["Python", "OpenAI API", "Streamlit", "Vector DB"],
      stipend: 28000,
      duration: 6,
      mode: "Remote",
      paid: true,
      location: "Remote (India)",
      companyIdx: 0,
      postedDays: 10,
      daysLeft: 22,
      description: "Razorpay AI Team is seeking an intern to build internal knowledge bot assistants using Python and RAG architecture.",
      qualification: "Practical project work with LLMs or OpenAI/HuggingFace APIs."
    },
    {
      title: "UX Research Intern",
      category: "UI/UX Design",
      skills: ["User Interviews", "Survey Design", "Figma", "Usability"],
      stipend: 10000,
      duration: 2,
      mode: "Hybrid",
      location: "Bengaluru",
      companyIdx: 2,
      postedDays: 10,
      daysLeft: 7,
      description: "Swiggy Consumer Research team is looking for a UX Research Intern to conduct interviews and summarize user pain points.",
      qualification: "Background in Psychology, Design, HCI, or Communications."
    },
    {
      title: "SQL & Data Engineering Intern",
      category: "Data Science",
      skills: ["SQL", "Python", "ETL Pipelines", "PostgreSQL"],
      stipend: 16000,
      duration: 3,
      mode: "Remote",
      paid: true,
      location: "Remote (India)",
      companyIdx: 8,
      postedDays: 11,
      daysLeft: 12,
      description: "Persistent Systems is hiring a Data Engineering Intern to write SQL queries and transform raw datasets.",
      qualification: "Strong SQL query writing skills and basic Python experience."
    }
  ];

  // Process sample dataset and format objects
  const jobs = jobsData.map((item, idx) => {
    const comp = companies[item.companyIdx || 0];
    return {
      id: `job-${String(idx + 1).padStart(2, "0")}`,
      title: item.title,
      category: item.category,
      skills: item.skills,
      salary: item.salary,
      experience: item.experience,
      type: item.type,
      mode: item.mode,
      location: item.location,
      company: comp.name,
      companyMark: comp.mark,
      companyCity: comp.city,
      companyIndustry: comp.industry,
      postedDays: item.postedDays,
      featured: Boolean(item.featured),
      description: item.description,
      responsibilities: item.responsibilities || [
        `Develop, test, and maintain high quality ${item.category.toLowerCase()} solutions.`,
        "Collaborate with design, product, and engineering teams to deliver great user experiences.",
        "Participate in code reviews, technical documentation, and performance tuning."
      ],
      qualification: item.qualification || `Degree in CS, IT, or equivalent practical experience with ${item.experience} in related tools.`
    };
  });

  const internships = internshipsData.map((item, idx) => {
    const comp = companies[item.companyIdx || 0];
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + (item.daysLeft || 10));
    return {
      id: `intern-${String(idx + 1).padStart(2, "0")}`,
      title: item.title,
      category: item.category,
      skills: item.skills,
      stipend: item.stipend,
      duration: item.duration,
      mode: item.mode,
      paid: item.paid !== false,
      location: item.location,
      company: comp.name,
      companyMark: comp.mark,
      companyCity: comp.city,
      companyIndustry: comp.industry,
      postedDays: item.postedDays,
      daysLeft: item.daysLeft || 10,
      deadline: deadlineDate.toISOString().slice(0, 10),
      description: item.description,
      responsibilities: [
        `Contribute actively to real-world ${item.category.toLowerCase()} projects under mentor guidance.`,
        "Write clean, modular code, build feature prototypes, and participate in daily standups.",
        "Document implementation steps and share weekly project progress presentations."
      ],
      qualification: item.qualification || "Curious and self-motivated student or fresher eager to learn hands-on industry skills."
    };
  });

  window.CareerData = {
    companies,
    jobs,
    internships
  };
})();

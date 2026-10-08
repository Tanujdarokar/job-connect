# 💼 JobConnect — Modern Tech Career & Hiring Platform

[![Pure Vanilla HTML5](https://img.shields.io/badge/HTML5-Pure%20Vanilla-E34F26?logo=html5&logoColor=white)](index.html)
[![Pure Vanilla CSS3](https://img.shields.io/badge/CSS3-Modern%20Design%20System-1572B6?logo=css3&logoColor=white)](css/style.css)
[![Pure Vanilla JS](https://img.shields.io/badge/JavaScript-ES6%2B%20Zero%20Dependencies-F7DF1E?logo=javascript&logoColor=black)](js/app.js)
[![Zero Build Steps](https://img.shields.io/badge/Build%20Step-Zero%20Config-4caf50)](index.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**JobConnect** is a job-seeker-focused career portal engineered entirely in **100% Pure Vanilla HTML5, CSS3, and Modern JavaScript (ES6+)**.

Job seekers can discover and apply for jobs, while platform administrators manage the company directory and active job listings. The project has **zero external framework dependencies**, **zero npm packages**, and **zero build steps**.

---

## ⚡ Quick Start (No Installation Needed)

You do **not** need Node.js, npm, webpack, or any compilation toolchain. The entire web application runs directly inside any modern web browser.

### Option 1: Direct File Launch
Double-click [`index.html`](index.html) or right-click `index.html` → **Open With** → **Google Chrome**, **Microsoft Edge**, **Brave**, **Firefox**, or **Safari**.

### Option 2: VS Code Live Server
1. Open the project folder in **VS Code**.
2. Right-click [`index.html`](index.html) and choose **"Open with Live Server"**.

### Option 3: Lightweight Local Server (Optional)
```bash
# Using Python
python -m http.server 3000

# Using Node.js npx serve
npx serve .
```
Open your browser at `http://localhost:3000` (or the URL printed by your server).

---

## 🔐 Authentication & First-Visit Experience

When users first visit the platform without being logged in, they are immediately directed to the **Sign In** screen (`#/login`). Users can sign in using existing registered accounts or create a new account for free via **Get Started** (`#/signup`).

### Pre-configured Accounts:
| Role | Email | Password | Access & Features |
|:---|:---|:---|:---|
| 👤 **Job Seeker** | `seeker@jobconnect.demo` | `password123` | Profile CRUD, Applications, AI ATS Resume Analyzer, Live Video Interview Room, Chat |
| 🛡️ **Platform Admin** | `admin@jobconnect.demo` | `password123` | User moderation, company management, and active hiring controls |

---

## 🚀 Key Features

### 👤 1. Job Seeker Experience
- **Smart Job Search & Filtering:** Search by keyword, role, and location. Live multi-filter panel for Workplace Type (*Remote, Hybrid, On-site*), Employment Type (*Full-time, Part-time, Contract, Internship*), Experience Level (*Entry, Mid, Senior, Lead*), Salary range slider, and Sort order (*Latest, Highest Salary*).
- **Comprehensive Job View & 1-Click Apply:** Detailed job briefs with salary, experience, key responsibilities, requirements, tech stacks, perks, and company profiles. One-click application modal with resume attachment and cover letter.
- **Interactive Candidate Profile:** 
  - Dynamic profile completion percentage meter.
  - Personal details & contact editor.
  - Work experience timeline with full CRUD actions.
  - Education history with full CRUD actions.
  - Interactive skill tagging system.
  - Simulated PDF/DOCX resume file uploader.
- **AI Resume ATS Analyzer:** 
  - Instant ATS score calculation against selected tech positions.
  - Strengths & matched skill badges.
  - Critical skill gaps identification.
  - Actionable AI-powered enhancement suggestions.
- **Simulated Live Video Interview Room:** 
  - Interactive webcam and microphone toggle controls.
  - Real-time HTML5 Canvas audio waveform visualizer.
  - Dynamic AI interview questions prompter with time tracker.
  - Answer submission and automated readiness score generator.
- **Recruiter Chat Messenger:** Dedicated direct messaging system with simulated instant recruiter answers.
- **Application Pipeline Tracker:** Track submissions across stages (*Applied → In Review → Shortlisted → Interviewing → Offered / Rejected*).
- **Salary Insights Explorer:** Interactive percentile salary benchmarks across leading technology roles and top paying companies in India.
- **Company Directory:** Browse active companies by type (*MNC*, *Top Startup*, or *FAANG*) and see their currently active vacancies.

---

### 🛡️ 2. Platform Administration
- **User Management & Moderation:** Inspect registered users and ban or unban accounts.
- **Company Directory Management:** Add and activate companies, categorize them as *MNC*, *Top Startup*, *FAANG*, or *Other*, and deactivate listings when needed.
- **Active Hiring Management:** Publish jobs for active companies, edit job titles and locations, and pause or reactivate listings. Active changes appear in seeker job search, recommendations, and company pages.

---

### 🌐 3. Customization, Accessibility & Persistence
- **Multi-Language (i18n):** Native instant switching between **English (🇬🇧)**, **Hindi (🇮🇳 हिन्दी)**, and **Gujarati (🇮🇳 ગુજરાતી)**.
- **Theme Engine:** Dark mode and Light mode with smooth CSS transitions and persistent user preference.
- **Local Storage Data Persistence:** User sessions, admin-managed companies and jobs, applications, saved bookmarks, interview records, reviews, and notifications persist in browser `localStorage`. Demo data is local to one browser and does not synchronize between separate users or devices.

---

## 📂 Project Structure

```
job-portal/
├── index.html              # Main HTML5 entry point & SPA layout shell
├── css/
│   └── style.css           # Vanilla CSS design system (Variables, Dark/Light Themes, Glassmorphism, Flex/Grid)
├── js/
│   ├── app.js              # Unified standalone runtime engine (Router, Store, UI, Pages, Modals, SVGs)
│   ├── state.js            # Initial dataset & reactive state store
│   ├── router.js           # Client-side hash-based SPA routing controller
│   ├── icons.js            # Scalable inline SVG icon library
│   ├── toast.js            # Toast notification management system
│   ├── modal.js            # Universal modal popup dialog manager
│   ├── i18n.js             # Multi-language translation dictionaries & helpers
│   ├── components/         # Reusable UI component templates (Navbar, Footer, JobCard)
│   └── pages/              # Individual page modules (Home, Jobs, Profile, AI Tools, etc.)
└── README.md               # Project documentation & reference guide
```

---

## 🧭 Navigation & SPA Hash Routes

| Route | Page / Feature Description |
|:---|:---|
| `#/` | JobConnect Landing Page with Hero search, stats, category grid, and featured positions |
| `#/jobs` | Job Discovery with live search, multi-faceted filtering, and sorting |
| `#/jobs/:id` | Detailed Job Specification page with 1-click modal apply |
| `#/companies` | Company directory with MNC, Top Startup, FAANG, and active hiring filters |
| `#/companies/:id` | Individual company profile, reviews, and active listings |
| `#/salaries` | Salary benchmark explorer and top paying companies |
| `#/ai-tools/resume` | AI Resume ATS Analyzer with score gauge and gap insights |
| `#/seeker/interviews/video` | Live Video Interview simulator with canvas audio visualizer |
| `#/seeker/profile` | Candidate profile, skill manager, work & education CRUD, resume upload |
| `#/seeker/applications` | Application status & pipeline tracker |
| `#/seeker/saved-jobs` | Bookmarked positions list |
| `#/seeker/chat` | Job-seeker direct chat messenger |
| `#/seeker/notifications` | Notifications center with action links |
| `#/admin/dashboard` | User moderation, company directory management, and active hiring controls |
| `#/login` | Sign in as a job seeker or platform administrator |
| `#/signup` | Create a job seeker account |

---

## 🛠️ Technology Stack & Architecture

- **Semantic HTML5:** Native accessible elements, semantic layout containers (`#navbar-container`, `#page-content`, `#footer-container`, `.toast-container`).
- **Modern CSS3:** CSS Custom Properties (Design Tokens), Glassmorphism, CSS Grid, Flexbox, custom scrollbars, keyframe animations, and Dark/Light theme toggling.
- **Vanilla ES6+ JavaScript:** Client-side hash routing, reactive state store with event listeners, dynamic DOM rendering, HTML5 Canvas audio waveform visualization, and `localStorage` persistence.
- **Zero Frameworks & Zero Dependencies:** No React, Vue, Angular, jQuery, Tailwind, Bootstrap, Vite, or Webpack required.

---

## 📄 License

This project is licensed under the **MIT License**. Free to use, modify, and distribute for educational and commercial purposes.

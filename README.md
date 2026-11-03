# CareerConnect — Modern Job & Internship Finder Platform

> **"Discover Opportunities. Build Your Future."**

**CareerConnect** is a modern, responsive, multi-page web platform designed for students, freshers, and experienced candidates to discover jobs, internships, and remote roles across top Indian tech hubs. Built strictly with **HTML5, CSS3, and Vanilla JavaScript**, it features 5-language multi-language support (i18n), infinite scroll toggling, custom job alert digests, advanced search filtering, bookmarking, interactive application tracking, dark/light mode switching, SHA-256 password encryption, and production-grade web security headers.

---

## 🚀 Quick Start — How to Run the Project

### Option 1: VS Code & Live Server (Recommended)
1. Open Visual Studio Code and select **File > Open Folder...** to open the project root directory.
2. Install the **Live Server** extension by *Ritwick Dey* from the VS Code Extensions Marketplace (`Ctrl+Shift+X`).
3. Right-click [`index.html`](index.html) in the File Explorer and select **Open with Live Server** (or click **Go Live** in the bottom status bar).
4. The site will automatically launch at `http://127.0.0.1:5500/index.html`. No build step or `npm install` is required.

### Option 2: Direct Browser Launch
Double-click `index.html` in your operating system's file manager to open it directly in Google Chrome, Microsoft Edge, Firefox, or Safari.

---

## 🔑 Account Access & Data Privacy

Candidates can create a private local account on the [Registration Page](register.html). All account credentials are encrypted using **SHA-256 Web Crypto hashing** before storing in browser `LocalStorage`. All job applications, bookmarks, and user session records remain 100% private to your local browser.

---

## 💻 Pages & Core Features

| Page | File | Key Capabilities |
| :--- | :--- | :--- |
| **Home Page** | [`index.html`](index.html) | Sticky glassmorphism header, 5-language switcher (EN, HI, MR, TA, TE), theme toggle, Hero section with keyword & location search bar, popular category chips, featured jobs grid, latest internships grid, top hiring companies strip, testimonials, and brand footer. |
| **Find Jobs** | [`jobs.html`](jobs.html) | Real-time multi-filter (Location with Delhi NCR mapper, Salary LPA, Experience level, Work mode, Category, Employment type), sorting (*Recent*, *Salary High to Low*, *Title A–Z*), **Infinite Scroll toggle mode**, **"Create Job Alert" modal trigger**, load-more pagination, and empty state reset. |
| **Find Internships** | [`internships.html`](internships.html) | Domain filtering, duration selector, stipend threshold (*₹10,000+* to *₹20,000+*), paid-only toggle, urgent closing badges (*≤ 5 days left*), **Infinite Scroll toggle mode**, **"Create Internship Alert" modal trigger**, and sorting (*Closing Soon*, *Stipend High to Low*). |
| **Job Details** | [`job-details.html`](job-details.html) | Full role description, key responsibilities list, qualifications, skill tags, employer profile, interactive Apply Modal (with cover note & resume file upload validation), save bookmark toggle, and recently viewed tracking. |
| **User Dashboard** | [`dashboard.html`](dashboard.html) | Candidate avatar, interactive profile completion progress bar (25% Name + 25% Email + 25% Headline + 25% Location), stats overview, application status dropdown tracker (*Applied*, *Under Review*, *Shortlisted*, *Rejected*), saved jobs, saved internships, **My Job Alerts manager tab**, recently viewed items, and "Clear All My Local Data" privacy button. |
| **Sign In** | [`login.html`](login.html) | SHA-256 encrypted authentication, email format check, password min length, password show/hide toggle, and remember me session toggle. |
| **Create Account** | [`register.html`](register.html) | Candidate signup validation, full name check, confirm password matching, duplicate email prevention, and LocalStorage user registration. |
| **Privacy Policy** | [`privacy.html`](privacy.html) | Transparency statement covering local data storage, zero remote server tracking, cookie policies, and candidate data erasure rights. |
| **Terms & Conditions** | [`terms.html`](terms.html) | Legal agreement detailing terms of service, fictional sample dataset disclaimers, acceptable use policies, and liability limits. |
| **Custom 404** | [`404.html`](404.html) | Error 404 handler featuring brand headers, a live opportunity search bar, and primary navigation buttons. |

---

## 🛡️ Production Security, Privacy & Feature Highlights

1. **🌐 Multi-Language (i18n) Support**: Built-in 5-language translation dictionary engine ([`js/i18n.js`](js/i18n.js)) supporting **English**, **Hindi (हिंदी)**, **Marathi (मराठी)**, **Tamil (தமிழ்)**, and **Telugu (తెలుగు)** with navbar language dropdown switching.
2. **📜 Infinite Scroll Toggle Mode**: User choice between manual "Load More" pagination and automatic infinite scroll loading on Jobs and Internships search pages.
3. **🔔 Job Alert Subscription Digests**: Candidate search alert creation modal and dedicated "Job Alerts" dashboard management tab.
4. **SHA-256 Password Encryption**: Client-side `crypto.subtle.digest('SHA-256')` hashing prevents plaintext passwords from ever being stored in browser storage.
5. **XSS & Input Sanitization**: All user inputs (`name`, `email`, `headline`, `location`, `coverNote`, `query`) are sanitized via `Career.escapeHtml()` prior to rendering.
6. **Bot & Spam Honeypot Field**: Forms include invisible honeypot inputs (`website_hp`) that catch and drop automated bot submissions.
7. **Resume Upload Security**: Apply Modal enforces extension validation (`.pdf`, `.doc`, `.docx`) and file size limits (≤ 5MB).
8. **GDPR / CCPA Cookie Consent Banner**: Interactive consent banner popping up on initial visit with preference persistence (`careerconnect:cookie_consent`).
9. **HTTP Security Headers**: Deployed production `.htaccess` (Apache) and `_headers` (Netlify/Vercel) specifying `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`.
10. **WCAG AAA Color Contrast**: Standardized CSS variable tokens across Light and Dark themes to ensure a contrast ratio ≥ 7:1 for all text elements.
11. **Touch Target Accessibility**: All buttons, form inputs, links, and icons meet the minimum 44x44px touch target recommendation.
12. **SEO & Social Sharing Assets**: Includes vector SVG Favicon ([`assets/images/favicon.svg`](assets/images/favicon.svg)), Social Sharing Open Graph preview card ([`assets/images/og-preview.svg`](assets/images/og-preview.svg)), [`sitemap.xml`](sitemap.xml), and [`robots.txt`](robots.txt).

---

## 📁 Project Directory Structure

```text
CareerConnect/
│
├── index.html           # Home Page
├── jobs.html            # Find Jobs Page
├── internships.html     # Find Internships Page
├── job-details.html     # Opportunity Details Page
├── dashboard.html       # Candidate Command Center
├── login.html           # Sign In Interface
├── register.html        # Create Account Interface
├── privacy.html         # Privacy Policy
├── terms.html           # Terms & Conditions
├── 404.html             # Custom 404 Error Page
│
├── sitemap.xml          # Search Engine Sitemap
├── robots.txt           # Search Crawler Directives
├── .htaccess            # Apache Server Config & Security Headers
├── _headers             # Netlify/Vercel Security Headers
│
├── css/
│   ├── style.css        # Main Design System, WCAG AAA Tokens & Consent Banner
│   ├── dashboard.css    # Candidate Profile & Application Status Badges
│   └── responsive.css   # Mobile Drawer & Responsive Breakpoints
│
├── js/
│   ├── data.js         # 20 Jobs, 20 Internships & 10 Employers
│   ├── i18n.js         # 5-Language Dictionary Engine (EN, HI, MR, TA, TE)
│   ├── analytics.js    # Privacy-Preserving Client Analytics
│   ├── main.js         # Core Engine, Cookie Banner, Honeypot & Security Logs
│   ├── jobs.js         # Job Search, Filters & Infinite Scroll Controller
│   ├── internships.js  # Internship Search, Domain & Infinite Scroll Controller
│   ├── auth.js         # SHA-256 Encrypted Auth & Validation
│   └── dashboard.js    # Profile Management, Job Alerts & Application Tracking
│
└── assets/
    └── images/
        ├── favicon.svg     # Vector Brand Favicon
        └── og-preview.svg  # Vector Social Preview Sharing Card
```

---

## 📊 Sample Dataset Summary (`js/data.js`)

All opportunities are realistic tech roles headquartered across Indian tech hubs (**Bengaluru, Hyderabad, Pune, Mumbai, Delhi NCR / Noida / Gurugram, and Remote (India)**):
- **20 Sample Job Listings**: Senior Frontend Developer, Flutter Mobile Developer, Backend Software Engineer, AI/ML Engineer, Full Stack Engineer, UI/UX Designer, Data Analyst, Java Backend Developer, Python Developer, Cloud DevOps Engineer, etc.
- **20 Sample Internship Listings**: Frontend Web Intern, Flutter App Intern, Machine Learning Intern, Data Science Intern, UI/UX Design Intern, Full Stack Intern, Java Intern, Python Intern, etc.
- **10 Featured Employers**: Razorpay, Infosys, Swiggy, Microsoft India, Freshworks, PhonePe, TCS, Zomato, Persistent Systems, Adobe India.

---

## 📜 License & Disclaimers

This project is created for portfolio showcase purposes. All company names, job descriptions, and salary figures are fictional sample data.

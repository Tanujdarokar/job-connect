/* ==========================================================================
   CareerConnect — Main Core Framework & Shared Logic (Vanilla JS)
   Production-ready architecture: zero secrets, sanitization, bot prevention,
   security logging, cookie consent, multi-language (i18n), and job alerts.
   ========================================================================== */

(function () {
  "use strict";

  // Production Debug Mode (OFF in Production)
  const DEBUG = false;

  const KEYS = {
    saved: "careerconnect:saved",
    dynamicListings: "careerconnect:dynamic-listings",
    applications: "careerconnect:applications",
    user: "careerconnect:user",
    users: "careerconnect:users",
    theme: "careerconnect:theme",
    recent: "careerconnect:recent",
    consent: "careerconnect:cookie_consent",
    securityLogs: "careerconnect:security_logs",
    alerts: "careerconnect:job_alerts",
    infiniteScroll: "careerconnect:infinite_scroll"
  };

  // Translation Helper shorthand
  function t(key) {
    return window.CareerI18n ? window.CareerI18n.t(key) : key;
  }

  // Safe LocalStorage Reader
  function read(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val === null ? fallback : JSON.parse(val);
    } catch (err) {
      if (DEBUG) console.warn(`CareerConnect storage read error for ${key}:`, err);
      return fallback;
    }
  }

  // Safe LocalStorage Writer
  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      if (DEBUG) console.error(`CareerConnect storage write error for ${key}:`, err);
      toast("Storage quota limit reached. Clear local items in dashboard.", true);
      return false;
    }
  }

  // Security Event Audit Logger
  function logSecurityEvent(type, details = "") {
    try {
      const logs = read(KEYS.securityLogs, []);
      logs.unshift({
        timestamp: new Date().toISOString(),
        type,
        details,
        userEmail: currentUser() ? currentUser().email : "guest"
      });
      write(KEYS.securityLogs, logs.slice(0, 30));
    } catch (e) {
      // Quiet fail
    }
  }

  // HTML Escaper for Security & XSS protection
  function escapeHtml(str) {
    return String(str ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  // Get Listing by ID from window.CareerData
  function getListing(id) {
    if (!window.CareerData) return null;
    return window.CareerData.jobs.find(item => item.id === id) ||
           window.CareerData.internships.find(item => item.id === id) ||
           read(KEYS.dynamicListings, []).find(item => item.id === id) ||
           null;
  }

  function listingType(item) {
    return item.kind === "internship" || item.id.startsWith("intern-") ? "internship" : "job";
  }

  // Floating Toast Notification
  function toast(message, isError = false) {
    let region = document.querySelector(".toast-region");
    if (!region) {
      region = document.createElement("div");
      region.className = "toast-region";
      region.setAttribute("aria-live", "polite");
      document.body.appendChild(region);
    }

    const item = document.createElement("div");
    item.className = `toast${isError ? " error" : ""}`;
    item.innerHTML = `<i class="fa-solid ${isError ? "fa-circle-exclamation" : "fa-circle-check"}"></i> <span>${escapeHtml(message)}</span>`;

    region.appendChild(item);
    setTimeout(() => {
      item.style.opacity = "0";
      item.style.transform = "translateY(8px)";
      item.style.transition = "all 0.2s ease";
      setTimeout(() => item.remove(), 200);
    }, 3200);
  }

  // Bookmark Status Check
  function bookmarked(id) {
    return read(KEYS.saved, []).includes(id);
  }

  // Bookmark Toggle
  function toggleSave(id) {
    const saved = read(KEYS.saved, []);
    const isCurrentlySaved = saved.includes(id);
    const updated = isCurrentlySaved ? saved.filter(item => item !== id) : [...saved, id];

    if (write(KEYS.saved, updated)) {
      toast(isCurrentlySaved ? "Removed from saved opportunities." : "Saved to your dashboard bookmarks!");
      logSecurityEvent("Bookmark_Toggle", `ID: ${id}, Action: ${isCurrentlySaved ? "Unsaved" : "Saved"}`);

      // Update all matching star buttons in DOM
      document.querySelectorAll(`[data-save="${id}"]`).forEach(btn => {
        const isSavedNow = updated.includes(id);
        btn.classList.toggle("saved", isSavedNow);
        btn.setAttribute("aria-pressed", String(isSavedNow));
        btn.innerHTML = isSavedNow ? '<i class="fa-solid fa-bookmark"></i>' : '<i class="fa-regular fa-bookmark"></i>';
      });
    }
  }

  // Current Logged-in User Session Helper
  function currentUser() {
    const persistent = read(KEYS.user, null);
    if (persistent) return persistent;
    try {
      return JSON.parse(sessionStorage.getItem(KEYS.user) || "null");
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user, remember) {
    if (remember) {
      try { sessionStorage.removeItem(KEYS.user); } catch (e) {}
      return write(KEYS.user, user);
    }
    try {
      localStorage.removeItem(KEYS.user);
      sessionStorage.setItem(KEYS.user, JSON.stringify(user));
      return true;
    } catch (e) {
      toast("Unable to establish temporary session.", true);
      return false;
    }
  }

  // Apply Modal & Application Handler
  function apply(id) {
    const user = currentUser();
    if (!user) {
      toast("Please log in to apply for opportunities.", true);
      setTimeout(() => { window.location.href = "login.html"; }, 900);
      return;
    }

    const item = getListing(id);
    if (!item) {
      toast("This opportunity is no longer available.", true);
      return;
    }

    const applications = read(KEYS.applications, []);
    const existing = applications.find(app => app.id === id && app.email.toLowerCase() === user.email.toLowerCase());
    if (existing) {
      toast(`You have already applied to ${item.title} (Status: ${existing.status || "Applied"}).`);
      return;
    }

    // Open Interactive Application Modal
    openApplyModal(item, user);
  }

  function openApplyModal(item, user) {
    let backdrop = document.querySelector(".modal-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop";
      document.body.appendChild(backdrop);
    }

    const isInternship = listingType(item) === "internship";
    const payLabel = isInternship
      ? (item.paid ? `₹${item.stipend.toLocaleString("en-IN")} / mo` : "Unpaid Internship")
      : `₹${item.salary} LPA`;

    backdrop.innerHTML = `
      <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-head">
          <h3 id="modal-title">Apply for ${escapeHtml(item.title)}</h3>
          <button type="button" class="modal-close" data-modal-close aria-label="Close dialog"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <form id="modal-apply-form">
          <!-- Spam / Bot Honeypot Field -->
          <input type="text" name="website_hp" class="honeypot-field" tabindex="-1" autocomplete="off">

          <div class="modal-body">
            <div style="background:var(--bg-surface-2);padding:12px 16px;border-radius:10px;margin-bottom:8px">
              <strong style="display:block;font-size:0.95rem">${escapeHtml(item.company)}</strong>
              <span class="muted" style="font-size:0.85rem">${escapeHtml(item.location)} · ${payLabel}</span>
            </div>

            <div>
              <label>Applicant Name</label>
              <input type="text" value="${escapeHtml(user.name)}" readonly style="background:var(--bg-surface-2)">
            </div>

            <div>
              <label>Email Address</label>
              <input type="email" value="${escapeHtml(user.email)}" readonly style="background:var(--bg-surface-2)">
            </div>

            <div>
              <label for="cover-note">Why are you a good fit? (Cover note)</label>
              <textarea id="cover-note" name="cover_note" placeholder="Mention your relevant skills, projects, or availability..." maxlength="500"></textarea>
            </div>

            <div>
              <label for="resume-upload">Upload Resume (PDF, DOCX - Max 5MB)</label>
              <input type="file" id="resume-upload" accept=".pdf,.doc,.docx" style="padding:6px;font-size:0.85rem">
            </div>
          </div>
          <div class="modal-foot">
            <button type="button" class="button button-secondary" data-modal-close>Cancel</button>
            <button type="submit" class="button button-primary">Submit Application →</button>
          </div>
        </form>
      </div>
    `;

    backdrop.classList.add("open");

    const closeModal = () => {
      backdrop.classList.remove("open");
    };

    backdrop.querySelectorAll("[data-modal-close]").forEach(btn => btn.addEventListener("click", closeModal));

    // Close on backdrop click
    backdrop.onclick = e => {
      if (e.target === backdrop) closeModal();
    };

    const form = backdrop.querySelector("#modal-apply-form");
    form.onsubmit = e => {
      e.preventDefault();

      // Bot / Spam Honeypot Check
      if (form.elements.website_hp && form.elements.website_hp.value) {
        if (DEBUG) console.warn("Bot submission detected and blocked.");
        closeModal();
        return;
      }

      // Resume File Validation (if file selected)
      const fileInput = backdrop.querySelector("#resume-upload");
      if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const validExts = [".pdf", ".doc", ".docx"];
        const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

        if (!validExts.includes(ext)) {
          toast("Invalid file type. Please upload a PDF, DOC, or DOCX resume.", true);
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          toast("File size too large. Resume must be under 5MB.", true);
          return;
        }
      }

      const applications = read(KEYS.applications, []);
      applications.unshift({
        id: item.id,
        type: listingType(item),
        email: user.email,
        status: "Applied",
        appliedAt: new Date().toISOString()
      });

      if (write(KEYS.applications, applications)) {
        toast(`Application submitted for ${item.title}! Track it in your dashboard.`);
        logSecurityEvent("Application_Submitted", `Role: ${item.title}, ID: ${item.id}`);
        closeModal();

        // Update direct apply button on page if present
        document.querySelectorAll(`[data-apply="${item.id}"]`).forEach(btn => {
          btn.textContent = t("applied");
          btn.disabled = true;
          btn.classList.replace("button-primary", "button-secondary");
        });
      }
    };
  }

  // Job Alert Modal Component
  function openJobAlertModal(prefillCriteria = {}) {
    let backdrop = document.querySelector(".modal-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop";
      document.body.appendChild(backdrop);
    }

    const titleVal = prefillCriteria.query || "Software Developer";
    const locVal = prefillCriteria.location || "All Locations";

    backdrop.innerHTML = `
      <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="alert-modal-title">
        <div class="modal-head">
          <h3 id="alert-modal-title"><i class="fa-solid fa-bell" style="color:var(--primary)"></i> Create Job Alert</h3>
          <button type="button" class="modal-close" data-modal-close aria-label="Close dialog"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <form id="job-alert-form">
          <div class="modal-body">
            <p class="muted" style="font-size:0.88rem;margin-bottom:12px">
              Save your target criteria. You will receive local browser notification digests when new matching jobs or internships are posted!
            </p>

            <div>
              <label for="alert-title">Target Keyword / Title</label>
              <input id="alert-title" name="title" type="text" value="${escapeHtml(titleVal)}" required placeholder="e.g. Flutter, React, Data Science">
            </div>

            <div>
              <label for="alert-location">Target Location</label>
              <input id="alert-location" name="location" type="text" value="${escapeHtml(locVal)}" placeholder="e.g. Bengaluru, Remote">
            </div>

            <div>
              <label for="alert-frequency">Alert Notification Frequency</label>
              <select id="alert-frequency" name="frequency">
                <option value="Instant">Instant Local Alert</option>
                <option value="Daily">Daily Digest</option>
              </select>
            </div>
          </div>

          <div class="modal-foot">
            <button type="button" class="button button-secondary" data-modal-close>Cancel</button>
            <button type="submit" class="button button-primary">Create Alert ✓</button>
          </div>
        </form>
      </div>
    `;

    backdrop.classList.add("open");

    const closeModal = () => {
      backdrop.classList.remove("open");
    };

    backdrop.querySelectorAll("[data-modal-close]").forEach(btn => btn.addEventListener("click", closeModal));
    backdrop.onclick = e => { if (e.target === backdrop) closeModal(); };

    const form = backdrop.querySelector("#job-alert-form");
    form.onsubmit = e => {
      e.preventDefault();
      const title = form.elements.title.value.trim();
      const location = form.elements.location.value.trim();
      const frequency = form.elements.frequency.value;

      const alerts = read(KEYS.alerts, []);
      alerts.unshift({
        id: "alert-" + Date.now(),
        title,
        location,
        frequency,
        createdAt: new Date().toISOString()
      });

      if (write(KEYS.alerts, alerts)) {
        toast(`Job Alert created for '${title}'!`);
        logSecurityEvent("Job_Alert_Created", `Title: ${title}`);
        closeModal();
      }
    };
  }

  // Company Logo Mark Component
  function logoMark(mark) {
    return `<span class="company-logo" aria-hidden="true">${escapeHtml(mark)}</span>`;
  }

  // Listing Card HTML Generator
  function card(item) {
    const isInternship = listingType(item) === "internship";
    const link = `job-details.html?id=${encodeURIComponent(item.id)}${isInternship ? "&type=internship" : ""}`;
    const payLabel = isInternship
      ? (item.paid ? `₹${item.stipend.toLocaleString("en-IN")} / mo` : "Unpaid")
      : `₹${item.salary} LPA`;
    const expOrDuration = isInternship ? `${item.duration} Months` : `${item.experience}`;

    const tagsHtml = item.skills.slice(0, 4).map(skill => `<span class="tag">${escapeHtml(skill)}</span>`).join("");

    let deadlineBadge = "";
    if (isInternship) {
      const isUrgent = item.daysLeft <= 5;
      deadlineBadge = `<span class="${isUrgent ? "deadline-urgent" : ""}"><i class="fa-regular fa-clock"></i> ${isUrgent ? "Closing soon · " : ""}${Math.max(0, item.daysLeft)}d left</span>`;
    } else {
      deadlineBadge = `<span><i class="fa-regular fa-calendar"></i> ${item.postedDays}d ago</span>`;
    }

    const isSaved = bookmarked(item.id);

    return `
      <article class="listing-card">
        <div class="listing-top">
          ${logoMark(item.companyMark)}
          <div class="listing-heading">
            <h3><a href="${link}">${escapeHtml(item.title)}</a></h3>
            <p>${escapeHtml(item.company)} <i class="fa-solid fa-circle-check" title="Verified employer"></i></p>
          </div>
          <button class="bookmark${isSaved ? " saved" : ""}" type="button" data-save="${item.id}" aria-label="${isSaved ? "Remove bookmark" : "Save opportunity"}" aria-pressed="${isSaved}">
            <i class="${isSaved ? "fa-solid" : "fa-regular"} fa-bookmark"></i>
          </button>
        </div>

        <div class="listing-meta">
          <span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(item.location)}</span>
          <span><i class="fa-solid fa-laptop-house"></i> ${escapeHtml(item.mode)}</span>
          <span><i class="fa-solid fa-briefcase"></i> ${escapeHtml(expOrDuration)}</span>
        </div>

        <div class="listing-meta" style="margin-top:4px">
          <span><strong style="color:var(--text-main);font-size:0.95rem">${payLabel}</strong></span>
          ${deadlineBadge}
        </div>

        <div class="skill-list">${tagsHtml}</div>

        <div class="listing-bottom">
          <span class="demo-label">${t("demo_listing")}</span>
          <a class="button button-primary button-small" href="${link}">${t("view_details")}</a>
        </div>
      </article>
    `;
  }

  // Header & Navbar Component with Multi-Language Selector
  function header(pageKey) {
    const user = currentUser();
    const currentTheme = read(KEYS.theme, "light");
    const currentLang = window.CareerI18n ? window.CareerI18n.getLang() : "en";

    const navItems = [
      [t("nav_home"), "index.html", "home"],
      [t("nav_jobs"), "jobs.html", "jobs"],
      [t("nav_internships"), "internships.html", "internships"],
      [t("nav_dashboard"), "dashboard.html", "dashboard"]
    ];

    const alertsCount = read(KEYS.alerts, []).length;

    return `
      <header class="site-header">
        <nav class="nav wrap" aria-label="Main Navigation">
          <a class="brand" href="index.html">
            <span class="brand-mark">C</span>
            <span class="brand-text">Career<span class="brand-accent">Connect</span></span>
          </a>

          <button type="button" class="menu-button" aria-label="Toggle navigation menu" aria-expanded="false">
            <i class="fa-solid fa-bars"></i>
          </button>

          <div class="nav-links">
            ${navItems.map(([label, href, key]) => `
              <a href="${href}"${pageKey === key ? ' class="active" aria-current="page"' : ''}>${label}</a>
            `).join("")}
            ${user ? "" : `<a class="nav-mobile-only" href="login.html">${t("nav_login")}</a>`}
          </div>

          <div class="nav-actions">
            <!-- Language Switcher Select -->
            <select class="lang-select" id="global-lang-select" aria-label="Select Language" title="Switch interface language">
              <option value="en"${currentLang === "en" ? " selected" : ""}>🇺🇸 English</option>
              <option value="hi"${currentLang === "hi" ? " selected" : ""}>🇮🇳 हिंदी</option>
              <option value="mr"${currentLang === "mr" ? " selected" : ""}>🇮🇳 मराठी</option>
              <option value="ta"${currentLang === "ta" ? " selected" : ""}>🇮🇳 தமிழ்</option>
              <option value="te"${currentLang === "te" ? " selected" : ""}>🇮🇳 తెలుగు</option>
            </select>

            <!-- Theme Switcher -->
            <button type="button" class="icon-button" data-theme-toggle aria-label="Toggle dark mode" title="Switch color theme">
              <i class="fa-solid ${currentTheme === "dark" ? "fa-sun" : "fa-moon"}"></i>
            </button>

            ${user ? `
              <span class="user-pill"><i class="fa-solid fa-user"></i> ${escapeHtml(user.name.split(" ")[0])}</span>
              <button class="button button-secondary button-small" type="button" data-logout>${t("nav_logout")}</button>
            ` : `
              <a class="button button-secondary button-small" href="login.html">${t("nav_login")}</a>
              <a class="button button-primary button-small" href="register.html">${t("nav_signup")}</a>
            `}
          </div>
        </nav>
      </header>
    `;
  }

  // Footer Component
  function footer() {
    return `
      <footer class="site-footer">
        <div class="wrap">
          <div class="footer-grid">
            <div class="footer-brand">
              <a class="brand" href="index.html">
                <span class="brand-mark">C</span>
                <span class="brand-text">Career<span class="brand-accent">Connect</span></span>
              </a>
              <p>Discover opportunities. Build your future. Explore handpicked jobs and internships from top Indian tech companies.</p>
              <span class="demo-label"><i class="fa-solid fa-flask"></i> Student portfolio demo platform</span>
            </div>

            <div class="footer-col">
              <h3>Explore</h3>
              <div class="footer-links">
                <a href="jobs.html">${t("nav_jobs")}</a>
                <a href="internships.html">${t("nav_internships")}</a>
                <a href="dashboard.html">${t("nav_dashboard")}</a>
                <a href="index.html#why-careerconnect">Why CareerConnect</a>
              </div>
            </div>

            <div class="footer-col">
              <h3>Legal & Privacy</h3>
              <div class="footer-links">
                <a href="privacy.html">Privacy Policy</a>
                <a href="terms.html">Terms & Conditions</a>
                <a href="login.html">${t("nav_login")}</a>
                <a href="register.html">${t("nav_signup")}</a>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} CareerConnect. Portfolio project with fictional demo dataset.</span>
            <span>Made with HTML5, CSS3 & Vanilla JavaScript</span>
          </div>
        </div>
      </footer>
    `;
  }

  // Cookie Consent Banner Component
  function renderCookieConsent() {
    const hasConsented = read(KEYS.consent, null);
    if (hasConsented) return;

    const banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.innerHTML = `
      <div>
        <strong style="font-size:0.95rem;color:var(--text-main);display:flex;align-items:center;gap:8px">
          <i class="fa-solid fa-cookie-bite" style="color:var(--primary)"></i> Privacy & Local Storage Consent
        </strong>
        <p style="margin-top:6px">
          CareerConnect uses essential LocalStorage to preserve your theme preference, language choice, bookmarks, and local demo applications. We do not use remote tracking cookies.
        </p>
      </div>
      <div class="cookie-actions">
        <button type="button" class="button button-primary button-small" id="accept-cookies-btn">Accept Essential Storage</button>
        <a class="button button-secondary button-small" href="privacy.html">Read Privacy Policy</a>
      </div>
    `;

    document.body.appendChild(banner);

    banner.querySelector("#accept-cookies-btn").addEventListener("click", () => {
      write(KEYS.consent, "accepted");
      banner.style.opacity = "0";
      banner.style.transform = "translateY(20px)";
      banner.style.transition = "all 0.25s ease";
      setTimeout(() => banner.remove(), 250);
      toast("Privacy preferences saved.");
    });
  }

  // Home Page HTML Layout Generator
  function homeContent() {
    const featuredJobs = window.CareerData.jobs.slice(0, 3).map(card).join("");
    const featuredInternships = window.CareerData.internships.slice(0, 3).map(card).join("");
    const companyNames = window.CareerData.companies.map(c => `<span class="company-wordmark">${escapeHtml(c.name)}</span>`).join("");

    return `
      <section class="hero">
        <div class="wrap hero-content">
          <span class="eyebrow">${t("hero_eyebrow")}</span>
          <h1>${t("hero_title_1")}<br><span>${t("hero_title_2")}</span></h1>
          <p class="hero-copy">${t("hero_subtitle")}</p>

          <form class="search-box" data-home-search>
            <div class="search-field">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input name="query" type="search" placeholder="${t("hero_search_query")}" aria-label="${t("hero_search_query")}">
            </div>
            <div class="search-field">
              <i class="fa-solid fa-location-dot"></i>
              <input name="location" type="search" placeholder="${t("hero_search_location")}" aria-label="${t("hero_search_location")}">
            </div>
            <button class="button button-primary" type="submit">${t("hero_search_btn")}</button>
          </form>

          <div class="quick-row">
            <span>Popular Searches:</span>
            ${["Frontend", "Flutter", "Data Science", "UI/UX", "Remote"].map(keyword => `
              <a class="chip" href="jobs.html?query=${encodeURIComponent(keyword)}">${keyword}</a>
            `).join("")}
          </div>

          <div class="hero-stats">
            <div class="hero-stat">
              <strong>20+</strong>
              <span>Demo Jobs</span>
            </div>
            <div class="hero-stat">
              <strong>20+</strong>
              <span>Demo Internships</span>
            </div>
            <div class="hero-stat">
              <strong>10</strong>
              <span>Featured Companies</span>
            </div>
          </div>
        </div>
      </section>

      <section class="company-strip">
        <div class="wrap">
          <p>Explore opportunities from leading teams</p>
          <div class="companies">${companyNames}</div>
        </div>
      </section>

      <section class="section wrap">
        <div class="section-head">
          <div>
            <span class="eyebrow">Handpicked Roles</span>
            <h2>Featured Jobs</h2>
            <p>Full-time, part-time, and remote software engineering opportunities.</p>
          </div>
          <a class="text-link" href="jobs.html">Browse All Jobs <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="card-grid">${featuredJobs}</div>
      </section>

      <section class="section wrap" style="padding-top:12px">
        <div class="section-head">
          <div>
            <span class="eyebrow">Build Real Experience</span>
            <h2>Latest Internships</h2>
            <p>Student-friendly internships across Web Dev, AI/ML, Flutter, and UI/UX.</p>
          </div>
          <a class="text-link" href="internships.html">Explore Internships <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div class="card-grid">${featuredInternships}</div>
      </section>

      <section class="section" id="why-careerconnect" style="background:var(--bg-surface-2)">
        <div class="wrap">
          <div class="section-head">
            <div>
              <span class="eyebrow">Why CareerConnect</span>
              <h2>Built for Your Next Big Move</h2>
              <p>Everything you need to discover, save, and track your career applications.</p>
            </div>
          </div>
          <div class="feature-grid">
            <article class="feature-card">
              <div class="feature-icon"><i class="fa-solid fa-sliders"></i></div>
              <h3>Smart Filtering</h3>
              <p>Filter by experience level, work mode, salary package, stipend range, and skill tags with instant live updates.</p>
            </article>

            <article class="feature-card">
              <div class="feature-icon"><i class="fa-solid fa-bookmark"></i></div>
              <h3>Save & Track</h3>
              <p>Bookmark your favorite opportunities and track your application status directly from your personal dashboard.</p>
            </article>

            <article class="feature-card">
              <div class="feature-icon"><i class="fa-solid fa-circle-check"></i></div>
              <h3>Application Tracking</h3>
              <p>Follow your application lifecycle through Applied, Under Review, Shortlisted, and Rejected stages in real time.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="section wrap">
        <div class="section-head">
          <div>
            <span class="eyebrow">User Stories</span>
            <h2>Loved by Freshers & Developers</h2>
            <p>Hear how candidates discover opportunities on CareerConnect.</p>
          </div>
        </div>
        <div class="testimonial-grid">
          <article class="testimonial">
            <div class="stars">★★★★★</div>
            <p>“CareerConnect made finding remote Flutter developer roles so smooth. The clean UI and filtering helped me focus on what matched my skill set.”</p>
            <div class="person">
              <div class="avatar">P</div>
              <div>
                <strong>Priya Nair</strong>
                <small>Frontend Engineer · Bengaluru</small>
              </div>
            </div>
          </article>

          <article class="testimonial">
            <div class="stars">★★★★★</div>
            <p>“Saving internships and tracking my application status in the dashboard kept my final year job hunt totally organized!”</p>
            <div class="person">
              <div class="avatar">A</div>
              <div>
                <strong>Arjun Mehta</strong>
                <small>CS Undergrad · Hyderabad</small>
              </div>
            </div>
          </article>

          <article class="testimonial">
            <div class="stars">★★★★★</div>
            <p>“The stipend indicators and application deadline alerts are super helpful. Highly recommend to anyone searching for tech internships.”</p>
            <div class="person">
              <div class="avatar">R</div>
              <div>
                <strong>Riya Shah</strong>
                <small>Data Science Intern · Pune</small>
              </div>
            </div>
          </article>
        </div>
      </section>
    `;
  }

  // Job Details Page Renderer
  function renderDetails() {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const item = getListing(id);
    const root = document.querySelector("#page-content");

    if (!item) {
      root.innerHTML = `
        <section class="wrap page-intro">
          <span class="eyebrow">Listing Not Found</span>
          <h1>Opportunity Unavailable</h1>
          <p>The job or internship link you followed may have expired or is invalid. Browse our active demo opportunities instead.</p>
          <div style="margin-top:20px;display:flex;gap:12px">
            <a class="button button-primary" href="jobs.html">Browse Jobs</a>
            <a class="button button-secondary" href="internships.html">Browse Internships</a>
          </div>
        </section>
      `;
      return;
    }

    const isInternship = listingType(item) === "internship";
    const payLabel = isInternship
      ? (item.paid ? `₹${item.stipend.toLocaleString("en-IN")} / month` : "Unpaid Internship")
      : `₹${item.salary} LPA`;

    let deadlineFormatted = "";
    if (item.deadline) {
      const parts = item.deadline.split("-");
      if (parts.length === 3) {
        deadlineFormatted = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
      }
    }

    const detailRows = isInternship ? [
      ["Stipend", payLabel],
      ["Duration", `${item.duration} Months`],
      ["Work Mode", item.mode],
      ["Location", item.location],
      ["Application Deadline", deadlineFormatted || item.deadline]
    ] : [
      ["Salary Package", payLabel],
      ["Experience Required", item.experience],
      ["Employment Type", item.type],
      ["Work Mode", item.mode],
      ["Location", item.location]
    ];

    const isSaved = bookmarked(item.id);
    const user = currentUser();
    const applications = read(KEYS.applications, []);
    const hasApplied = user && applications.some(app => app.id === item.id && app.email.toLowerCase() === user.email.toLowerCase());

    root.innerHTML = `
      <div class="wrap page-intro">
        <a class="text-link" href="${isInternship ? "internships.html" : "jobs.html"}">
          <i class="fa-solid fa-arrow-left"></i> Back to ${isInternship ? "Internships" : "Jobs"}
        </a>
      </div>

      <div class="wrap detail-layout">
        <article class="detail-main">
          <div class="detail-title">
            ${logoMark(item.companyMark)}
            <div>
              <h1>${escapeHtml(item.title)}</h1>
              <p>${escapeHtml(item.company)} · ${escapeHtml(item.location)}</p>
            </div>
          </div>

          <div class="detail-section">
            <h2>About this ${isInternship ? "Internship" : "Role"}</h2>
            <p>${escapeHtml(item.description)}</p>
          </div>

          <div class="detail-section">
            <h2>Key Responsibilities</h2>
            <ul>
              ${item.responsibilities.map(r => `<li>${escapeHtml(r)}</li>`).join("")}
            </ul>
          </div>

          <div class="detail-section">
            <h2>Required Qualifications & Skills</h2>
            <ul>
              <li>${escapeHtml(item.qualification)}</li>
              <li>Hands-on experience with key tools: ${item.skills.join(", ")}.</li>
              <li>Proactive mindset, collaborative attitude, and clear communication skills.</li>
            </ul>
          </div>

          <div class="detail-section">
            <h2>Required Skills</h2>
            <div class="skill-list">
              ${item.skills.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join("")}
            </div>
          </div>

          <div class="detail-section">
            <h2>About ${escapeHtml(item.company)}</h2>
            <p>${escapeHtml(item.company)} is a leading ${escapeHtml(item.companyIndustry || "technology")} employer. Headquartered in ${escapeHtml(item.companyCity || item.location)}.</p>
          </div>
        </article>

        <aside class="detail-aside">
          <span class="demo-label" style="margin-bottom:12px"><i class="fa-solid fa-circle-info"></i> Summary Details</span>
          <div class="detail-info">
            ${detailRows.map(([label, val]) => `
              <div>
                <span>${label}</span>
                <strong>${escapeHtml(val)}</strong>
              </div>
            `).join("")}
          </div>

          <button type="button" class="button ${hasApplied ? "button-secondary" : "button-primary"}" data-apply="${item.id}" ${hasApplied ? "disabled" : ""}>
            ${hasApplied ? t("applied") : t("apply_now")}
          </button>

          <button type="button" class="button button-secondary" data-save="${item.id}" aria-pressed="${isSaved}">
            <i class="${isSaved ? "fa-solid" : "fa-regular"} fa-bookmark"></i> ${isSaved ? t("saved") : t("save_opportunity")}
          </button>

          <p class="muted" style="font-size:0.78rem;margin-top:12px;text-align:center">
            Applications are saved in your browser's LocalStorage.
          </p>
        </aside>
      </div>
    `;

    // Save to Recently Viewed
    const recent = read(KEYS.recent, []).filter(rId => rId !== item.id);
    write(KEYS.recent, [item.id, ...recent].slice(0, 8));
  }

  // App Initialization Routine
  function initialize() {
    const pageKey = document.body.dataset.page || "home";

    // Set Language & Theme
    if (window.CareerI18n) {
      document.documentElement.lang = window.CareerI18n.getLang();
    }
    document.body.dataset.theme = read(KEYS.theme, "light");

    // Render Navigation & Footer
    const navContainer = document.querySelector("#navbar-container");
    const footerContainer = document.querySelector("#footer-container");
    if (navContainer) navContainer.innerHTML = header(pageKey);
    if (footerContainer) footerContainer.innerHTML = footer();

    // Render Home Page if applicable
    if (pageKey === "home" && !document.querySelector("#page-content[data-home-dynamic]")) {
      const pageContent = document.querySelector("#page-content");
      if (pageContent) pageContent.innerHTML = homeContent();
    }

    // Cookie Consent Banner
    renderCookieConsent();

    // Language Selector Change Listener
    const langSelect = document.querySelector("#global-lang-select");
    if (langSelect) {
      langSelect.addEventListener("change", e => {
        if (window.CareerI18n) {
          window.CareerI18n.setLang(e.target.value);
          toast(`Language changed to ${e.target.options[e.target.selectedIndex].text}`);
          setTimeout(() => window.location.reload(), 200);
        }
      });
    }

    // Global Click Delegation
    document.addEventListener("click", e => {
      // Save/Bookmark Button Click
      const saveBtn = e.target.closest("[data-save]");
      if (saveBtn) {
        toggleSave(saveBtn.dataset.save);
        return;
      }

      // Apply Button Click
      const applyBtn = e.target.closest("[data-apply]");
      if (applyBtn) {
        apply(applyBtn.dataset.apply);
        return;
      }

      // Theme Toggle Click
      if (e.target.closest("[data-theme-toggle]")) {
        const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
        document.body.dataset.theme = nextTheme;
        write(KEYS.theme, nextTheme);
        const icon = document.querySelector("[data-theme-toggle] i");
        if (icon) icon.className = `fa-solid ${nextTheme === "dark" ? "fa-sun" : "fa-moon"}`;
        toast(`Switched to ${nextTheme} mode.`);
        logSecurityEvent("Theme_Changed", nextTheme);
        return;
      }

      // Logout Click
      if (e.target.closest("[data-logout]")) {
        logSecurityEvent("User_Logout");
        localStorage.removeItem(KEYS.user);
        sessionStorage.removeItem(KEYS.user);
        toast("Logged out successfully.");
        setTimeout(() => { window.location.href = "index.html"; }, 300);
        return;
      }

      // Responsive Mobile Nav Toggle
      const menuBtn = e.target.closest(".menu-button");
      if (menuBtn) {
        const navLinks = document.querySelector(".nav-links");
        const isOpen = navLinks.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        const icon = menuBtn.querySelector("i");
        if (icon) icon.className = `fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`;
      }
    });

    // Home Page Search Submit
    document.addEventListener("submit", e => {
      if (!e.target.matches("[data-home-search]")) return;
      e.preventDefault();
      const formData = new FormData(e.target);
      const params = new URLSearchParams();
      if (formData.get("query")) params.set("query", formData.get("query"));
      if (formData.get("location")) params.set("location", formData.get("location"));
      window.location.href = `jobs.html${params.size ? `?${params}` : ""}`;
    });

    // Sub-module initializations
    if (pageKey === "jobs" && window.CareerJobs) window.CareerJobs.init();
    if (pageKey === "internships" && window.CareerInternships) window.CareerInternships.init();
    if (pageKey === "details") renderDetails();
    if (pageKey === "dashboard" && window.CareerDashboard) window.CareerDashboard.init();
    if ((pageKey === "login" || pageKey === "register") && window.CareerAuth) window.CareerAuth.init(pageKey);
  }

  // Export Core Library
  window.Career = {
    KEYS,
    read,
    write,
    escapeHtml,
    getListing,
    listingType,
    card,
    logoMark,
    toast,
    bookmarked,
    currentUser,
    setCurrentUser,
    apply,
    toggleSave,
    openJobAlertModal,
    logSecurityEvent
  };

  document.addEventListener("DOMContentLoaded", initialize);
})();

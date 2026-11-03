/* ==========================================================================
   CareerConnect — Dynamic Job & Internship Portal Engine (Vanilla JS)

   CORE CONFIGURATION:
   Publish your Google Sheet to the Web as CSV:
   File > Share > Publish to web > Select Sheet > Format: CSV (.csv) > Publish
   Paste the published CSV URL in SHEET_URL below.
   ========================================================================== */

const SHEET_URL = "";

(function () {
  "use strict";

  const STORAGE_KEYS = {
    saved: "careerconnect:saved",
    theme: "careerconnect:theme"
  };

  // State
  let allJobs = [];
  let activeJobs = [];
  let filteredJobs = [];
  let pageLimit = 8;
  let isSavedViewActive = false;

  // HTML Escaper for Security & XSS Protection
  function escapeHtml(str) {
    return String(str ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  // Sanitize URLs to prevent javascript: or data: URI Protocol Injection
  function sanitizeUrl(url) {
    if (!url || typeof url !== "string") return "#";
    const clean = url.trim();
    if (clean.toLowerCase().startsWith("javascript:") || clean.toLowerCase().startsWith("data:") || clean.toLowerCase().startsWith("vbscript:")) {
      return "#";
    }
    return clean;
  }

  // Toast Notification Manager
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

  // Auto-correct Google Sheet URL if user pastes a web/pubhtml link instead of CSV link
  function normalizeSheetUrl(url) {
    if (!url || typeof url !== "string") return "";
    let clean = url.trim();
    if (clean.includes("/pubhtml")) {
      clean = clean.replace("/pubhtml", "/pub");
    }
    if (clean.includes("docs.google.com") && !clean.includes("output=csv")) {
      clean += (clean.includes("?") ? "&" : "?") + "output=csv";
    }
    return clean;
  }

  // Normalize column headers flexibly (handles spaces, capitals, alternate names)
  function normalizeHeaderKey(rawHeader) {
    const clean = String(rawHeader || "").toLowerCase().trim().replace(/[^a-z0-9]/g, "");

    if (clean.includes("title") || clean.includes("role") || clean.includes("position")) return "title";
    if (clean.includes("company") || clean.includes("employer") || clean.includes("organization")) return "company";
    if (clean.includes("type") || clean.includes("jobtype")) return "type";
    if (clean.includes("location") || clean.includes("city")) return "location";
    if (clean.includes("work") || clean.includes("mode")) return "work_mode";
    if (clean.includes("category") || clean.includes("domain") || clean.includes("field")) return "category";
    if (clean.includes("salary") || clean.includes("stipend") || clean.includes("pay") || clean.includes("ctc")) return "salary_or_stipend";
    if (clean.includes("experience") || clean.includes("exp") || clean.includes("level")) return "experience";
    if (clean.includes("skill") || clean.includes("tags") || clean.includes("tech")) return "skills";
    if (clean.includes("description") || clean.includes("details") || clean.includes("about")) return "description";
    if (clean.includes("apply") || clean.includes("link") || clean.includes("url")) return "apply_link";
    if (clean.includes("posted") || clean.includes("date")) return "posted_date";
    if (clean.includes("deadline") || clean.includes("expire")) return "deadline";
    if (clean.includes("status") || clean.includes("state")) return "status";
    if (clean.includes("id")) return "id";

    return clean;
  }

  // Robust Vanilla JS CSV State-Machine Parser
  function parseCSV(text) {
    const lines = [];
    let row = [];
    let entry = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      const nextC = text[i + 1];

      if (c === '"') {
        if (inQuotes && nextC === '"') {
          entry += '"';
          i++; // Skip escaped quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        row.push(entry.trim());
        entry = "";
      } else if ((c === '\n' || c === '\r') && !inQuotes) {
        if (c === '\r' && nextC === '\n') {
          i++; // Skip \n in \r\n
        }
        row.push(entry.trim());
        if (row.some(cell => cell.length > 0)) {
          lines.push(row);
        }
        row = [];
        entry = "";
      } else {
        entry += c;
      }
    }

    if (entry.length > 0 || row.length > 0) {
      row.push(entry.trim());
      if (row.some(cell => cell.length > 0)) {
        lines.push(row);
      }
    }

    if (lines.length < 2) return [];

    // Map headers flexibly
    const headers = lines[0].map(normalizeHeaderKey);
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i];
      if (!values || values.length === 0 || (values.length === 1 && !values[0])) continue;

      const obj = {};
      headers.forEach((header, idx) => {
        obj[header] = values[idx] || "";
      });

      // Include valid row if title or company exists
      if (obj.title || obj.company || obj.id) {
        data.push(obj);
      }
    }

    return data;
  }

  // Active Job & Deadline Validator
  function isActiveAndValid(job) {
    const status = String(job.status || "").trim().toLowerCase();

    // Explicitly excluded statuses
    if (status === "closed" || status === "inactive" || status === "expired" || status === "filled" || status === "0" || status === "false") {
      return false;
    }

    // Check deadline if specified
    if (job.deadline) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const parts = String(job.deadline).trim().split("-");
      if (parts.length === 3) {
        const deadlineDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        deadlineDate.setHours(23, 59, 59, 999);
        if (deadlineDate < today) return false; // Expired deadline
      }
    }

    return true;
  }

  // Days Calculation Helper
  function getDaysAgo(dateStr) {
    if (!dateStr) return 0;
    const parts = String(dateStr).trim().split("-");
    if (parts.length !== 3) return 0;
    const posted = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    const now = new Date();
    const diffTime = Math.abs(now - posted);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  function toCareerListing(job) {
    const isInternship = String(job.type || "").toLowerCase() === "internship";
    const amount = Number.parseFloat(String(job.salary_or_stipend || "").replace(/,/g, "").match(/\d+(?:\.\d+)?/)?.[0]) || 0;
    const deadlineTime = job.deadline ? new Date(`${job.deadline}T23:59:59`).getTime() : NaN;
    const daysLeft = Number.isFinite(deadlineTime)
      ? Math.max(0, Math.ceil((deadlineTime - Date.now()) / (1000 * 60 * 60 * 24)))
      : 10;

    return {
      id: job.id,
      kind: isInternship ? "internship" : "job",
      title: job.title,
      category: job.category || "",
      skills: String(job.skills || "").split(",").map(skill => skill.trim()).filter(Boolean),
      salary: isInternship ? 0 : amount,
      stipend: isInternship ? amount : 0,
      paid: isInternship ? amount > 0 : false,
      duration: 3,
      experience: job.experience || "Freshers",
      mode: job.work_mode || "",
      location: job.location || "",
      company: job.company || "",
      companyMark: job.company ? job.company[0].toUpperCase() : "C",
      postedDays: getDaysAgo(job.posted_date),
      daysLeft,
      deadline: job.deadline || "",
      description: job.description || "",
      qualification: job.experience || "See opportunity details."
    };
  }

  function cacheCareerListings(jobs) {
    const cached = Career.read(Career.KEYS.dynamicListings, []);
    const listingsById = new Map(cached.map(listing => [listing.id, listing]));
    jobs.filter(job => job.id).forEach(job => listingsById.set(job.id, toCareerListing(job)));
    Career.write(Career.KEYS.dynamicListings, [...listingsById.values()]);
  }

  // Inject SEO JSON-LD JobPosting Structured Data
  function injectJSONLD(jobs) {
    let existing = document.querySelector("#job-posting-jsonld");
    if (existing) existing.remove();

    const structuredData = jobs.map(job => ({
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      "title": job.title,
      "description": job.description || job.title,
      "identifier": {
        "@type": "PropertyValue",
        "name": job.company,
        "value": job.id || ("job-" + Math.random().toString(36).substring(2, 7))
      },
      "datePosted": job.posted_date || new Date().toISOString().slice(0, 10),
      "validThrough": job.deadline ? `${job.deadline}T23:59:59Z` : undefined,
      "employmentType": String(job.type).toLowerCase() === "internship" ? "INTERN" : "FULL_TIME",
      "hiringOrganization": {
        "@type": "Organization",
        "name": job.company
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": job.location || "India",
          "addressCountry": "IN"
        }
      }
    }));

    const script = document.createElement("script");
    script.id = "job-posting-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }

  // Render Shimmering Loading Skeleton
  function renderSkeleton() {
    const grid = document.querySelector("#job-results-grid");
    if (!grid) return;

    grid.innerHTML = Array(6).fill(0).map(() => `
      <div class="skeleton-card">
        <div class="skeleton-line" style="width:60%;height:20px;margin-bottom:12px"></div>
        <div class="skeleton-line" style="width:40%;height:14px;margin-bottom:16px"></div>
        <div class="skeleton-line" style="width:80%;height:14px;margin-bottom:10px"></div>
        <div class="skeleton-line" style="width:50%;height:14px;margin-bottom:20px"></div>
        <div class="skeleton-line" style="width:100%;height:38px;border-radius:10px"></div>
      </div>
    `).join("");
  }

  // Fetch Data: Google Sheets CSV -> Local jobs.json Fallback -> Error UI
  async function fetchJobs() {
    renderSkeleton();

    let fetchedData = null;
    let isFromSheet = false;

    const targetSheetUrl = normalizeSheetUrl(SHEET_URL);

    // 1. Try Google Sheet CSV URL if specified
    if (targetSheetUrl && targetSheetUrl.trim().length > 0) {
      try {
        const response = await fetch(targetSheetUrl);
        if (response.ok) {
          const csvText = await response.text();
          fetchedData = parseCSV(csvText);
          if (fetchedData && fetchedData.length > 0) {
            isFromSheet = true;
          }
        }
      } catch (err) {
        console.warn("Google Sheet CSV fetch failed. Falling back to local jobs.json...", err);
      }
    }

    // 2. Fallback to local jobs.json
    if (!fetchedData || fetchedData.length === 0) {
      try {
        const response = await fetch("jobs.json");
        if (response.ok) {
          fetchedData = await response.json();
        }
      } catch (err) {
        console.error("Local jobs.json fetch failed:", err);
      }
    }

    // 3. Handle Complete Fetch Failure
    if (!fetchedData || fetchedData.length === 0) {
      const grid = document.querySelector("#job-results-grid");
      if (grid) {
        grid.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon"><i class="fa-solid fa-triangle-exclamation" style="color:var(--danger)"></i></div>
            <h3>Unable to Load Opportunity Listings</h3>
            <p>We couldn't connect to the Google Sheet or local dataset. Please check your internet connection or try again.</p>
            <button type="button" class="button button-primary button-small" id="retry-fetch-btn"><i class="fa-solid fa-rotate-right"></i> Retry Loading</button>
          </div>
        `;
        document.querySelector("#retry-fetch-btn").addEventListener("click", fetchJobs);
      }
      return;
    }

    allJobs = fetchedData;
    activeJobs = allJobs.filter(isActiveAndValid);
    cacheCareerListings(allJobs);

    // Fallback: If activeJobs is empty (e.g. all deadlines in Google Sheet were past dates), show all fetched listings
    if (activeJobs.length === 0 && allJobs.length > 0) {
      activeJobs = allJobs;
    }

    // Inject SEO Structured Data
    injectJSONLD(activeJobs);

    // Update Banner Indicator
    const sourceBadge = document.querySelector("#data-source-badge");
    if (sourceBadge) {
      sourceBadge.innerHTML = isFromSheet
        ? `<i class="fa-solid fa-file-csv" style="color:#10b981"></i> Connected to Live Google Sheet (${activeJobs.length} active)`
        : `<i class="fa-solid fa-hard-drive"></i> Loaded Local Dataset (jobs.json)`;
    }

    // Populate Dynamic Filter Select Options
    populateFilterOptions();

    // Read URL params and apply filters
    readURLParamsAndFilter();
  }

  // Dynamically Populate Filter Dropdowns from Active Listings
  function populateFilterOptions() {
    const locSelect = document.querySelector("#filter-location");
    const catSelect = document.querySelector("#filter-category");

    if (locSelect) {
      const locations = [...new Set(activeJobs.map(j => j.location).filter(Boolean))];
      locSelect.innerHTML = `<option value="">All Locations</option>` +
        locations.map(loc => `<option value="${escapeHtml(loc)}">${escapeHtml(loc)}</option>`).join("");
    }

    if (catSelect) {
      const categories = [...new Set(activeJobs.map(j => j.category).filter(Boolean))];
      catSelect.innerHTML = `<option value="">All Categories</option>` +
        categories.map(cat => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join("");
    }
  }

  // URL Query Parameters Sync & Read
  function syncURLParams(filters) {
    const params = new URLSearchParams();
    if (filters.query) params.set("query", filters.query);
    if (filters.type) params.set("type", filters.type);
    if (filters.location) params.set("location", filters.location);
    if (filters.mode) params.set("mode", filters.mode);
    if (filters.category) params.set("category", filters.category);
    if (filters.experience) params.set("experience", filters.experience);
    if (filters.sort && filters.sort !== "newest") params.set("sort", filters.sort);

    const newUrl = `${window.location.pathname}${params.size ? `?${params.toString()}` : ""}`;
    window.history.replaceState({}, "", newUrl);
  }

  function readURLParamsAndFilter() {
    const params = new URLSearchParams(window.location.search);
    const form = document.querySelector("#filter-form");
    const searchInput = document.querySelector("#hero-search-input");

    if (form) {
      if (params.get("type")) form.elements.type.value = params.get("type");
      if (params.get("location")) form.elements.location.value = params.get("location");
      if (params.get("mode")) form.elements.mode.value = params.get("mode");
      if (params.get("category")) form.elements.category.value = params.get("category");
      if (params.get("experience")) form.elements.experience.value = params.get("experience");
      if (params.get("sort")) document.querySelector("#sort-select").value = params.get("sort");
    }

    if (searchInput && params.get("query")) {
      searchInput.value = params.get("query");
    }

    applyFilters();
  }

  // Filtering & Sorting Engine
  function applyFilters() {
    const form = document.querySelector("#filter-form");
    const searchInput = document.querySelector("#hero-search-input");
    const sortSelect = document.querySelector("#sort-select");

    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const type = form ? form.elements.type.value : "";
    const location = form ? form.elements.location.value.toLowerCase() : "";
    const mode = form ? form.elements.mode.value : "";
    const category = form ? form.elements.category.value : "";
    const experience = form ? form.elements.experience.value : "";
    const sort = sortSelect ? sortSelect.value : "newest";

    // Update URL Params
    syncURLParams({ query, type, location, mode, category, experience, sort });

    if (isSavedViewActive) {
      const savedIds = JSON.parse(localStorage.getItem(STORAGE_KEYS.saved) || "[]");
      filteredJobs = activeJobs.filter(j => savedIds.includes(j.id));
    } else {
      filteredJobs = activeJobs.filter(job => {
        const searchable = `${job.title} ${job.company} ${job.skills} ${job.location} ${job.category}`.toLowerCase();

        const matchesQuery = !query || searchable.includes(query);
        const matchesType = !type || String(job.type).toLowerCase() === type.toLowerCase();
        const matchesLocation = !location || String(job.location).toLowerCase().includes(location);
        const matchesMode = !mode || String(job.work_mode).toLowerCase() === mode.toLowerCase();
        const matchesCategory = !category || String(job.category).toLowerCase() === category.toLowerCase();
        const matchesExperience = !experience || String(job.experience).toLowerCase().includes(experience.toLowerCase());

        return matchesQuery && matchesType && matchesLocation && matchesMode && matchesCategory && matchesExperience;
      });
    }

    // Sort Results
    if (sort === "deadline") {
      filteredJobs.sort((a, b) => (a.deadline || "9999").localeCompare(b.deadline || "9999"));
    } else if (sort === "salary") {
      filteredJobs.sort((a, b) => {
        const salA = Number.parseInt(String(a.salary_or_stipend).replace(/[^0-9]/g, "")) || 0;
        const salB = Number.parseInt(String(b.salary_or_stipend).replace(/[^0-9]/g, "")) || 0;
        return salB - salA;
      });
    } else {
      // Newest first
      filteredJobs.sort((a, b) => (b.posted_date || "").localeCompare(a.posted_date || ""));
    }

    renderJobs();
    updateStats();
  }

  window.applyFilters = applyFilters;

  // Render Job Cards Grid
  function renderJobs() {
    const grid = document.querySelector("#job-results-grid");
    const countEl = document.querySelector("#job-count-text");
    const moreBtn = document.querySelector("#load-more-btn");

    if (!grid) return;

    const savedIds = JSON.parse(localStorage.getItem(STORAGE_KEYS.saved) || "[]");

    if (countEl) {
      countEl.textContent = `Showing ${Math.min(pageLimit, filteredJobs.length)} of ${filteredJobs.length} active opportunities`;
    }

    if (filteredJobs.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
          <h3>${isSavedViewActive ? "No Saved Jobs Yet" : "No Opportunities Found"}</h3>
          <p>${isSavedViewActive ? "Click the bookmark star on any opportunity card to save it here." : "We couldn't find any opportunities matching your active filters. Try broadening your criteria."}</p>
          <button type="button" class="button button-primary button-small" id="clear-all-filters-btn">
            <i class="fa-solid fa-rotate-left"></i> ${isSavedViewActive ? "Browse All Jobs" : "Clear All Filters"}
          </button>
        </div>
      `;

      const clearBtn = grid.querySelector("#clear-all-filters-btn");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          if (isSavedViewActive) {
            isSavedViewActive = false;
            document.querySelector("#view-saved-toggle").classList.remove("active");
          }
          const form = document.querySelector("#filter-form");
          const searchInput = document.querySelector("#hero-search-input");
          if (form) form.reset();
          if (searchInput) searchInput.value = "";
          pageLimit = 8;
          applyFilters();
        });
      }

      if (moreBtn) moreBtn.hidden = true;
      return;
    }

    const visibleList = filteredJobs.slice(0, pageLimit);

    grid.innerHTML = visibleList.map(job => {
      const isSaved = savedIds.includes(job.id);
      const daysAgo = getDaysAgo(job.posted_date);
      const isNew = daysAgo <= 3;
      const isInternship = String(job.type).toLowerCase() === "internship";

      const skillsList = String(job.skills || "").split(",").map(s => s.trim()).filter(Boolean);
      const skillsHtml = skillsList.map(skill => `<span class="tag">${escapeHtml(skill)}</span>`).join("");

      return `
        <article class="listing-card" id="card-${escapeHtml(job.id)}">
          <div class="listing-top">
            <span class="company-logo">${escapeHtml(job.company ? job.company[0].toUpperCase() : "C")}</span>
            <div class="listing-heading">
              <h3><a href="#" data-open-modal="${escapeHtml(job.id)}">${escapeHtml(job.title)}</a></h3>
              <p>${escapeHtml(job.company)} <i class="fa-solid fa-circle-check" style="color:var(--primary)" title="Verified Employer"></i></p>
            </div>
            <button type="button" class="bookmark${isSaved ? " saved" : ""}" data-bookmark="${escapeHtml(job.id)}" aria-label="${isSaved ? "Remove bookmark" : "Save opportunity"}">
              <i class="${isSaved ? "fa-solid" : "fa-regular"} fa-bookmark"></i>
            </button>
          </div>

          <div class="listing-meta">
            <span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(job.location)}</span>
            <span><i class="fa-solid fa-laptop-house"></i> ${escapeHtml(job.work_mode)}</span>
            <span><i class="fa-solid fa-briefcase"></i> ${escapeHtml(job.experience || "Freshers")}</span>
          </div>

          <div class="listing-meta" style="margin-top:4px">
            <span><strong style="color:var(--text-main);font-size:0.95rem">${escapeHtml(job.salary_or_stipend || "Best in Industry")}</strong></span>
            <span><i class="fa-regular fa-clock"></i> ${daysAgo === 0 ? "Today" : `${daysAgo}d ago`}</span>
          </div>

          <div class="skill-list">${skillsHtml}</div>

          <div class="listing-bottom">
            <div>
              <span class="type-badge ${isInternship ? "intern" : "job"}">${escapeHtml(job.type)}</span>
              ${isNew ? `<span class="new-badge">NEW</span>` : ""}
            </div>

            <div style="display:flex;gap:8px">
              <button type="button" class="button button-secondary button-small" data-open-modal="${escapeHtml(job.id)}">Details</button>
              <a class="button button-primary button-small" href="${escapeHtml(sanitizeUrl(job.apply_link))}" target="_blank" rel="noopener noreferrer">Apply ↗</a>
            </div>
          </div>
        </article>
      `;
    }).join("");

    if (moreBtn) {
      moreBtn.hidden = pageLimit >= filteredJobs.length;
    }
  }

  // Update Stats Strip
  function updateStats() {
    const totalEl = document.querySelector("#stat-total-openings");
    const internEl = document.querySelector("#stat-total-internships");
    const compEl = document.querySelector("#stat-total-companies");

    if (totalEl) totalEl.textContent = activeJobs.length;
    if (internEl) internEl.textContent = activeJobs.filter(j => String(j.type).toLowerCase() === "internship").length;
    if (compEl) {
      const companies = new Set(activeJobs.map(j => j.company).filter(Boolean));
      compEl.textContent = companies.size;
    }
  }

  // Bookmark Toggle Helper
  function toggleBookmark(id) {
    let saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.saved) || "[]");
    const isSaved = saved.includes(id);

    if (isSaved) {
      saved = saved.filter(savedId => savedId !== id);
      toast("Opportunity removed from saved bookmarks.");
    } else {
      saved.push(id);
      toast("Opportunity saved to your bookmarks!");
    }

    localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(saved));

    // Update DOM buttons
    document.querySelectorAll(`[data-bookmark="${id}"]`).forEach(btn => {
      btn.classList.toggle("saved", !isSaved);
      btn.innerHTML = !isSaved ? '<i class="fa-solid fa-bookmark"></i>' : '<i class="fa-regular fa-bookmark"></i>';
    });

    if (isSavedViewActive) {
      applyFilters();
    }
  }

  // Open Interactive Job Details Modal
  function openJobModal(id) {
    const job = activeJobs.find(j => j.id === id);
    if (!job) return;

    let backdrop = document.querySelector(".modal-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop";
      document.body.appendChild(backdrop);
    }

    const savedIds = JSON.parse(localStorage.getItem(STORAGE_KEYS.saved) || "[]");
    const isSaved = savedIds.includes(job.id);
    const skillsList = String(job.skills || "").split(",").map(s => s.trim()).filter(Boolean);

    backdrop.innerHTML = `
      <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-job-title">
        <div class="modal-head">
          <h3 id="modal-job-title">${escapeHtml(job.title)}</h3>
          <button type="button" class="modal-close" data-modal-close aria-label="Close dialog"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="modal-body">
          <div style="background:var(--bg-surface-2);padding:14px 18px;border-radius:12px;margin-bottom:12px">
            <strong style="display:block;font-size:1.05rem;color:var(--text-main)">${escapeHtml(job.company)}</strong>
            <span class="muted" style="font-size:0.88rem">${escapeHtml(job.location)} · ${escapeHtml(job.work_mode)} · ${escapeHtml(job.salary_or_stipend || "Competitive")}</span>
          </div>

          <div>
            <h4 style="font-size:0.95rem;margin-bottom:6px">Role Description</h4>
            <p style="color:var(--text-muted);font-size:0.92rem;line-height:1.6">${escapeHtml(job.description || "No description provided.")}</p>
          </div>

          <div>
            <h4 style="font-size:0.95rem;margin-bottom:8px">Required Skills</h4>
            <div class="skill-list">${skillsList.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join("")}</div>
          </div>

          <div style="display:flex;gap:16px;font-size:0.84rem;color:var(--text-muted)">
            <span><strong>Experience:</strong> ${escapeHtml(job.experience || "Freshers")}</span>
            <span><strong>Deadline:</strong> ${escapeHtml(job.deadline || "Open Until Filled")}</span>
          </div>
        </div>

        <div class="modal-foot">
          <button type="button" class="button button-secondary button-small" data-share-job="${escapeHtml(job.id)}"><i class="fa-solid fa-share-nodes"></i> Share</button>
          <button type="button" class="button button-secondary button-small" data-bookmark="${escapeHtml(job.id)}"><i class="${isSaved ? "fa-solid" : "fa-regular"} fa-bookmark"></i> ${isSaved ? "Saved" : "Bookmark"}</button>
          <a class="button button-primary button-small" href="${escapeHtml(sanitizeUrl(job.apply_link))}" target="_blank" rel="noopener noreferrer">Apply Now ↗</a>
        </div>
      </div>
    `;

    backdrop.classList.add("open");

    const closeModal = () => backdrop.classList.remove("open");

    backdrop.querySelectorAll("[data-modal-close]").forEach(btn => btn.addEventListener("click", closeModal));
    backdrop.onclick = e => { if (e.target === backdrop) closeModal(); };

    // Share Button Handler
    const shareBtn = backdrop.querySelector("[data-share-job]");
    if (shareBtn) {
      shareBtn.addEventListener("click", () => {
        const shareUrl = `${window.location.origin}${window.location.pathname}?query=${encodeURIComponent(job.title)}`;
        if (navigator.share) {
          navigator.share({ title: job.title, text: `Check out this opportunity: ${job.title} at ${job.company}`, url: shareUrl });
        } else {
          navigator.clipboard.writeText(shareUrl);
          toast("Opportunity link copied to clipboard!");
        }
      });
    }
  }

  // Global Event Binding Routine
  function initEvents() {
    // Search & Filter Event Delegation
    const filterForm = document.querySelector("#filter-form");
    const searchInput = document.querySelector("#hero-search-input");
    const sortSelect = document.querySelector("#sort-select");

    if (filterForm) {
      filterForm.addEventListener("input", () => { pageLimit = 8; applyFilters(); });
      filterForm.addEventListener("change", () => { pageLimit = 8; applyFilters(); });
      filterForm.addEventListener("reset", () => { setTimeout(() => { pageLimit = 8; applyFilters(); }, 0); });
    }

    if (searchInput) {
      searchInput.addEventListener("input", () => { pageLimit = 8; applyFilters(); });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", () => { applyFilters(); });
    }

    // Load More Button
    const moreBtn = document.querySelector("#load-more-btn");
    if (moreBtn) {
      moreBtn.addEventListener("click", () => {
        pageLimit += 8;
        renderJobs();
      });
    }

    // Saved Jobs Toggle View Button
    const savedToggle = document.querySelector("#view-saved-toggle");
    if (savedToggle) {
      savedToggle.addEventListener("click", () => {
        isSavedViewActive = !isSavedViewActive;
        savedToggle.classList.toggle("active", isSavedViewActive);
        pageLimit = 8;
        applyFilters();
      });
    }

    // Global Click Delegation (Bookmarks & Details Modal)
    document.addEventListener("click", e => {
      const bookmarkBtn = e.target.closest("[data-bookmark]");
      if (bookmarkBtn) {
        toggleBookmark(bookmarkBtn.dataset.bookmark);
        return;
      }

      const modalBtn = e.target.closest("[data-open-modal]");
      if (modalBtn) {
        e.preventDefault();
        openJobModal(modalBtn.dataset.openModal);
        return;
      }
    });
  }

  // Initialization
  document.addEventListener("DOMContentLoaded", () => {
    initEvents();
    fetchJobs();
  });
})();

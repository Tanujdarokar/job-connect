/* ==========================================================================
   CareerConnect — Find Jobs Module (Vanilla JS)
   Supports: Live Filtering, Infinite Scroll Toggle, and Job Alert Creation
   ========================================================================== */

(function () {
  "use strict";

  function t(key) {
    return window.CareerI18n ? window.CareerI18n.t(key) : key;
  }

  function init() {
    const root = document.querySelector("#page-content");
    if (!root) return;

    const params = new URLSearchParams(location.search);
    const jobs = window.CareerData ? window.CareerData.jobs : [];
    const categories = [...new Set(jobs.map(j => j.category))];

    const isInfinitePref = Career.read(Career.KEYS.infiniteScroll, false);

    root.innerHTML = `
      <section class="wrap page-intro">
        <span class="eyebrow">Explore Full-Time & Remote Careers</span>
        <h1>Find Your Next Job</h1>
        <p>Search tech engineering roles across India's top software employers. Filter by location, salary, experience, and work mode.</p>
      </section>

      <section class="wrap results-layout">
        <aside class="filter-panel">
          <h3>
            <span>${t("filter_title_jobs")}</span>
            <button type="button" class="icon-button button-small" id="create-job-alert-btn" title="${t("create_alert")}" style="width:34px;height:34px">
              <i class="fa-solid fa-bell" style="color:var(--primary)"></i>
            </button>
          </h3>
          <form id="job-filters">
            <div class="filter-field">
              <label for="job-query">${t("filter_keyword")}</label>
              <input id="job-query" name="query" type="search" placeholder="Title, skill, location, or company">
            </div>

            <div class="filter-field">
              <label for="job-location">${t("filter_location")}</label>
              <select id="job-location" name="location">
                <option value="">All Locations</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi NCR / Noida / Gurugram</option>
                <option value="Remote">Remote (India)</option>
              </select>
            </div>

            <div class="filter-field">
              <label for="job-salary">${t("filter_salary")}</label>
              <select id="job-salary" name="salary">
                <option value="0">Any Salary</option>
                <option value="5">₹5 LPA+</option>
                <option value="10">₹10 LPA+</option>
                <option value="15">₹15 LPA+</option>
                <option value="20">₹20 LPA+</option>
              </select>
            </div>

            <div class="filter-field">
              <label for="job-level">${t("filter_experience")}</label>
              <select id="job-level" name="experience">
                <option value="">Any Experience</option>
                <option value="0">Entry Level (0–1 years)</option>
                <option value="1">Early Career (1–3 years)</option>
                <option value="3">Experienced (3+ years)</option>
              </select>
            </div>

            <div class="filter-field">
              <label for="job-mode">${t("filter_mode")}</label>
              <select id="job-mode" name="mode">
                <option value="">Any Work Mode</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div class="filter-field">
              <label for="job-category">${t("filter_category")}</label>
              <select id="job-category" name="category">
                <option value="">All Categories</option>
                ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join("")}
              </select>
            </div>

            <div class="filter-field">
              <label for="job-type">Employment Type</label>
              <select id="job-type" name="type">
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>

            <button type="reset" class="button button-secondary button-small" style="width:100%;margin-top:8px">
              <i class="fa-solid fa-rotate-left"></i> ${t("filter_reset")}
            </button>
          </form>
        </aside>

        <div>
          <div class="results-toolbar">
            <span class="results-count" id="job-count" aria-live="polite">Showing 0 jobs</span>

            <div style="display:flex;align-items:center;gap:14px">
              <!-- Infinite Scroll Checkbox Toggle -->
              <label class="check-line" style="margin:0;font-size:0.82rem" title="Automatically load listings when scrolling down">
                <input type="checkbox" id="job-infinite-toggle"${isInfinitePref ? " checked" : ""}>
                <span>${t("infinite_scroll")}</span>
              </label>

              <label class="muted" for="job-sort" style="font-size:0.86rem">
                ${t("sort_label")}
                <select class="sort-select" id="job-sort">
                  <option value="recent">${t("sort_recent")}</option>
                  <option value="salary">${t("sort_salary_high")}</option>
                  <option value="title">${t("sort_title_az")}</option>
                </select>
              </label>
            </div>
          </div>

          <div class="results-grid" id="job-results"></div>

          <button type="button" class="button button-secondary" id="job-more" style="display:block;margin:28px auto 0">
            ${t("load_more_jobs")}
          </button>
        </div>
      </section>
    `;

    const form = root.querySelector("#job-filters");
    const infiniteToggle = root.querySelector("#job-infinite-toggle");

    // Pre-fill search inputs from URL query params
    if (params.get("query")) form.elements.query.value = params.get("query");
    if (params.get("location")) {
      const locVal = params.get("location").toLowerCase();
      const matchOpt = [...form.elements.location.options].find(o => o.value.toLowerCase().includes(locVal));
      if (matchOpt) form.elements.location.value = matchOpt.value;
    }
    if (params.get("category")) {
      const catVal = params.get("category").toLowerCase();
      const matchCat = categories.find(c => c.toLowerCase().includes(catVal));
      if (matchCat) form.elements.category.value = matchCat;
    }

    let pageLimit = 8;
    let isFetchingScroll = false;
    let totalFilteredCount = 0;

    function render() {
      const formData = new FormData(form);
      const query = String(formData.get("query")).trim().toLowerCase();
      const location = String(formData.get("location")).toLowerCase();
      const minSalary = Number(formData.get("salary")) || 0;
      const expLevel = formData.get("experience");
      const mode = formData.get("mode");
      const category = formData.get("category");
      const type = formData.get("type");

      const filtered = jobs.filter(job => {
        const searchable = `${job.title} ${job.category} ${job.company} ${job.location} ${job.skills.join(" ")}`.toLowerCase();
        const minExpNum = Number.parseInt(job.experience, 10) || 0;

        const matchesQuery = !query || searchable.includes(query);

        let matchesLocation = true;
        if (location) {
          if (location === "delhi") {
            const locLow = job.location.toLowerCase();
            matchesLocation = locLow.includes("delhi") || locLow.includes("noida") || locLow.includes("gurugram");
          } else {
            matchesLocation = job.location.toLowerCase().includes(location);
          }
        }

        const matchesSalary = job.salary >= minSalary;

        let matchesExp = true;
        if (expLevel === "0") matchesExp = minExpNum <= 1;
        else if (expLevel === "1") matchesExp = minExpNum >= 1 && minExpNum <= 3;
        else if (expLevel === "3") matchesExp = minExpNum >= 3;

        const matchesMode = !mode || job.mode === mode;
        const matchesCategory = !category || job.category === category;
        const matchesType = !type || job.type === type;

        return matchesQuery && matchesLocation && matchesSalary && matchesExp && matchesMode && matchesCategory && matchesType;
      });

      totalFilteredCount = filtered.length;

      // Sort Results
      const sortVal = root.querySelector("#job-sort").value;
      if (sortVal === "salary") filtered.sort((a, b) => b.salary - a.salary);
      if (sortVal === "title") filtered.sort((a, b) => a.title.localeCompare(b.title));
      if (sortVal === "recent") filtered.sort((a, b) => a.postedDays - b.postedDays);

      const countEl = root.querySelector("#job-count");
      const resultsEl = root.querySelector("#job-results");
      const moreBtn = root.querySelector("#job-more");

      countEl.textContent = `Showing ${Math.min(pageLimit, filtered.length)} of ${filtered.length} demo jobs`;

      if (filtered.length === 0) {
        resultsEl.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
            <h3>No Jobs Found</h3>
            <p>We couldn't find any opportunities matching your selected filters. Try broadening your search or resetting filters.</p>
            <button type="button" class="button button-primary button-small" id="reset-empty-btn">Reset All Filters</button>
          </div>
        `;
        const resetBtn = resultsEl.querySelector("#reset-empty-btn");
        if (resetBtn) resetBtn.addEventListener("click", () => {
          form.reset();
          pageLimit = 8;
          render();
        });
        moreBtn.hidden = true;
      } else {
        resultsEl.innerHTML = filtered.slice(0, pageLimit).map(Career.card).join("");

        // Hide button if infinite scroll enabled or limit exceeded
        const isInfinite = infiniteToggle ? infiniteToggle.checked : false;
        moreBtn.hidden = isInfinite || pageLimit >= filtered.length;
      }

      isFetchingScroll = false;
    }

    // Infinite Scroll Window Handler
    window.onscroll = () => {
      if (!infiniteToggle || !infiniteToggle.checked || isFetchingScroll || pageLimit >= totalFilteredCount) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 300;

      if (scrollPosition >= threshold) {
        isFetchingScroll = true;
        pageLimit += 8;
        render();
      }
    };

    infiniteToggle.addEventListener("change", e => {
      Career.write(Career.KEYS.infiniteScroll, e.target.checked);
      pageLimit = 8;
      render();
    });

    form.addEventListener("input", () => { pageLimit = 8; render(); });
    form.addEventListener("change", () => { pageLimit = 8; render(); });
    form.addEventListener("reset", () => { setTimeout(() => { pageLimit = 8; render(); }, 0); });

    root.querySelector("#job-sort").addEventListener("change", render);
    root.querySelector("#job-more").addEventListener("click", () => { pageLimit += 8; render(); });

    // Job Alert Modal Trigger
    const alertBtn = root.querySelector("#create-job-alert-btn");
    if (alertBtn) {
      alertBtn.addEventListener("click", () => {
        const formData = new FormData(form);
        Career.openJobAlertModal({
          query: formData.get("query"),
          location: formData.get("location")
        });
      });
    }

    render();
  }

  window.CareerJobs = { init };
})();

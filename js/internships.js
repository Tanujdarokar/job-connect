/* ==========================================================================
   CareerConnect — Find Internships Module (Vanilla JS)
   ========================================================================== */

(function () {
  "use strict";

  function init() {
    const root = document.querySelector("#page-content");
    if (!root) return;

    const params = new URLSearchParams(location.search);
    const internships = window.CareerData ? window.CareerData.internships : [];
    const categories = [...new Set(internships.map(item => item.category))];

    root.innerHTML = `
      <section class="wrap page-intro">
        <span class="eyebrow">Start Building Practical Experience</span>
        <h1>Find Tech Internships</h1>
        <p>Explore paid & unpaid internship opportunities for students and freshers. Gain real-world software project experience.</p>
      </section>

      <section class="wrap results-layout">
        <aside class="filter-panel">
          <h3>
            <span>Filter Internships</span>
            <i class="fa-solid fa-sliders"></i>
          </h3>
          <form id="intern-filters">
            <div class="filter-field">
              <label for="intern-query">Keyword</label>
              <input id="intern-query" name="query" type="search" placeholder="Title, domain, skill, location, or company">
            </div>

            <div class="filter-field">
              <label for="intern-domain">Domain</label>
              <select id="intern-domain" name="category">
                <option value="">All Domains</option>
                ${categories.map(c => `<option value="${c}">${c}</option>`).join("")}
              </select>
            </div>

            <div class="filter-field">
              <label for="intern-mode">Work Mode</label>
              <select id="intern-mode" name="mode">
                <option value="">Any Work Mode</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div class="filter-field">
              <label for="intern-duration">Maximum Duration</label>
              <select id="intern-duration" name="duration">
                <option value="">Any Duration</option>
                <option value="3">Up to 3 Months</option>
                <option value="4">Up to 4 Months</option>
                <option value="6">Up to 6 Months</option>
              </select>
            </div>

            <div class="filter-field">
              <label for="intern-stipend">Minimum Monthly Stipend</label>
              <select id="intern-stipend" name="stipend">
                <option value="0">Any Stipend</option>
                <option value="10000">₹10,000+ / mo</option>
                <option value="15000">₹15,000+ / mo</option>
                <option value="20000">₹20,000+ / mo</option>
              </select>
            </div>

            <label class="check-line">
              <input type="checkbox" name="paid">
              <span>Paid Internships Only</span>
            </label>

            <button type="reset" class="button button-secondary button-small" style="width:100%;margin-top:8px">
              <i class="fa-solid fa-rotate-left"></i> Reset Filters
            </button>
          </form>
        </aside>

        <div>
          <div class="results-toolbar">
            <span class="results-count" id="intern-count" aria-live="polite">Showing 0 internships</span>
            <label class="muted" for="intern-sort" style="font-size:0.86rem">
              Sort:
              <select class="sort-select" id="intern-sort">
                <option value="recent">Most Recent</option>
                <option value="stipend">Stipend: High to Low</option>
                <option value="deadline">Closing Soon</option>
              </select>
            </label>
          </div>

          <div class="results-grid" id="intern-results"></div>

          <button type="button" class="button button-secondary" id="intern-more" style="display:block;margin:28px auto 0">
            Load More Internships
          </button>
        </div>
      </section>
    `;

    const form = root.querySelector("#intern-filters");

    // Pre-fill query
    if (params.get("query")) form.elements.query.value = params.get("query");
    if (params.get("category")) {
      const match = categories.find(c => c.toLowerCase().includes(params.get("category").toLowerCase()));
      if (match) form.elements.category.value = match;
    }

    let pageLimit = 8;

    function render() {
      const formData = new FormData(form);
      const query = String(formData.get("query")).trim().toLowerCase();
      const category = formData.get("category");
      const mode = formData.get("mode");
      const duration = Number(formData.get("duration")) || 0;
      const minStipend = Number(formData.get("stipend")) || 0;
      const paidOnly = formData.get("paid") !== null;

      const filtered = internships.filter(item => {
        const searchable = `${item.title} ${item.category} ${item.company} ${item.location} ${item.skills.join(" ")}`.toLowerCase();

        const matchesQuery = !query || searchable.includes(query);
        const matchesCategory = !category || item.category === category;
        const matchesMode = !mode || item.mode === mode;
        const matchesDuration = !duration || item.duration <= duration;
        const matchesStipend = item.stipend >= minStipend;
        const matchesPaid = !paidOnly || item.paid;

        return matchesQuery && matchesCategory && matchesMode && matchesDuration && matchesStipend && matchesPaid;
      });

      // Sort
      const sortVal = root.querySelector("#intern-sort").value;
      if (sortVal === "stipend") filtered.sort((a, b) => b.stipend - a.stipend);
      if (sortVal === "deadline") filtered.sort((a, b) => a.daysLeft - b.daysLeft);
      if (sortVal === "recent") filtered.sort((a, b) => a.postedDays - b.postedDays);

      const countEl = root.querySelector("#intern-count");
      const resultsEl = root.querySelector("#intern-results");
      const moreBtn = root.querySelector("#intern-more");

      countEl.textContent = `Showing ${Math.min(pageLimit, filtered.length)} of ${filtered.length} demo internships`;

      if (filtered.length === 0) {
        resultsEl.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon"><i class="fa-solid fa-graduation-cap"></i></div>
            <h3>No Internships Found</h3>
            <p>We couldn't find any internship opportunities matching your active filters. Try adjusting your stipend range or domain criteria.</p>
            <button type="button" class="button button-primary button-small" id="reset-intern-btn">Reset All Filters</button>
          </div>
        `;
        const resetBtn = resultsEl.querySelector("#reset-intern-btn");
        if (resetBtn) resetBtn.addEventListener("click", () => {
          form.reset();
          pageLimit = 8;
          render();
        });
        moreBtn.hidden = true;
      } else {
        resultsEl.innerHTML = filtered.slice(0, pageLimit).map(Career.card).join("");
        moreBtn.hidden = pageLimit >= filtered.length;
      }
    }

    form.addEventListener("input", () => { pageLimit = 8; render(); });
    form.addEventListener("change", () => { pageLimit = 8; render(); });
    form.addEventListener("reset", () => { setTimeout(() => { pageLimit = 8; render(); }, 0); });

    root.querySelector("#intern-sort").addEventListener("change", render);
    root.querySelector("#intern-more").addEventListener("click", () => { pageLimit += 8; render(); });

    render();
  }

  window.CareerInternships = { init };
})();

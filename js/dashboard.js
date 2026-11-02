/* ==========================================================================
   CareerConnect — User Dashboard & Privacy Management Module (Vanilla JS)
   ========================================================================== */

(function () {
  "use strict";

  function init() {
    const root = document.querySelector("#page-content");
    if (!root) return;

    const user = Career.currentUser();

    // Redirect to login if user is not signed in
    if (!user) {
      root.innerHTML = `
        <section class="wrap page-intro" style="text-align:center;padding:70px 20px">
          <div class="empty-icon" style="width:64px;height:64px;font-size:1.8rem"><i class="fa-solid fa-lock"></i></div>
          <h1>Dashboard Locked</h1>
          <p>Please sign in to access your personal dashboard, view saved roles, and track applications.</p>
          <div style="margin-top:24px;display:flex;justify-content:center;gap:12px">
            <a class="button button-primary" href="login.html">Sign In to Account</a>
            <a class="button button-secondary" href="register.html">Create Free Account</a>
          </div>
        </section>
      `;
      return;
    }

    const allSaved = Career.read(Career.KEYS.saved, []);
    const allApplications = Career.read(Career.KEYS.applications, []);
    const userApplications = allApplications.filter(app => app.email.toLowerCase() === user.email.toLowerCase());

    const savedItems = allSaved.map(id => Career.getListing(id)).filter(Boolean);
    const savedJobs = savedItems.filter(item => Career.listingType(item) === "job");
    const savedInternships = savedItems.filter(item => Career.listingType(item) === "internship");

    const alerts = Career.read(Career.KEYS.alerts, []);

    // Profile Completion Calculator
    function getCompletionPercent(u) {
      let percent = 0;
      if (u.name) percent += 25;
      if (u.email) percent += 25;
      if (u.headline && u.headline.trim()) percent += 25;
      if (u.location && u.location.trim()) percent += 25;
      return percent;
    }

    const completionPercent = getCompletionPercent(user);
    const shortlistedCount = userApplications.filter(a => a.status === "Shortlisted").length;
    const initials = user.name ? user.name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase() : "U";

    root.innerHTML = `
      <section class="wrap dashboard-wrap">
        <div class="dashboard-heading">
          <div>
            <span class="eyebrow">Candidate Command Center</span>
            <h1>Your Dashboard</h1>
            <p class="muted">Manage your user profile, saved opportunities, job alerts, and live application tracking.</p>
          </div>
          <span class="demo-label"><i class="fa-solid fa-user-check"></i> Demo Candidate Session</span>
        </div>

        <div class="dashboard-grid">
          <aside class="profile-card">
            <div class="profile-top">
              <div class="profile-avatar" id="dash-avatar">${initials}</div>
              <h2 id="dash-name">${Career.escapeHtml(user.name)}</h2>
              <p id="dash-email">${Career.escapeHtml(user.email)}</p>
            </div>

            <div class="completion">
              <div class="completion-label">
                <span>Profile Completion</span>
                <span id="completion-text">${completionPercent}%</span>
              </div>
              <div class="progress" role="progressbar" aria-valuenow="${completionPercent}" aria-valuemin="0" aria-valuemax="100">
                <span id="completion-bar" style="width:${completionPercent}%"></span>
              </div>
            </div>

            <form class="profile-form" id="profile-form">
              <div>
                <label for="prof-headline">Professional Headline</label>
                <input id="prof-headline" name="headline" value="${Career.escapeHtml(user.headline || "")}" maxlength="90" placeholder="e.g. Frontend Engineer / CS Undergrad">
              </div>

              <div>
                <label for="prof-location">Location</label>
                <input id="prof-location" name="location" value="${Career.escapeHtml(user.location || "")}" maxlength="70" placeholder="e.g. Bengaluru, KA">
              </div>

              <button class="button button-secondary button-small" type="submit" style="width:100%">
                <i class="fa-solid fa-floppy-disk"></i> Save Profile Details
              </button>
            </form>

            <div style="margin-top:24px;padding-top:18px;border-top:1px solid var(--border-color)">
              <strong style="display:block;font-size:0.82rem;margin-bottom:6px;color:var(--text-main)">
                <i class="fa-solid fa-shield-halved"></i> Data Privacy & Storage
              </strong>
              <p class="muted" style="font-size:0.78rem;line-height:1.45;margin-bottom:12px">
                Your data stays 100% private in local browser storage. No cookies or server tracking.
              </p>
              <button class="button button-secondary button-small" type="button" id="clear-local-data-btn" style="width:100%;color:var(--danger);border-color:rgba(239,68,68,0.3)">
                <i class="fa-solid fa-trash-can"></i> Clear All My Local Data
              </button>
            </div>
          </aside>

          <div>
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon"><i class="fa-solid fa-paper-plane"></i></div>
                <div class="stat-info">
                  <strong id="stat-apps">${userApplications.length}</strong>
                  <span>Applications</span>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon"><i class="fa-solid fa-bookmark"></i></div>
                <div class="stat-info">
                  <strong>${savedItems.length}</strong>
                  <span>Saved Items</span>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-icon"><i class="fa-solid fa-award"></i></div>
                <div class="stat-info">
                  <strong id="stat-shortlisted">${shortlistedCount}</strong>
                  <span>Shortlisted</span>
                </div>
              </div>
            </div>

            <section class="dashboard-section">
              <div class="dashboard-tabs" role="tablist">
                <button class="tab-button active" type="button" data-tab="applications" role="tab" aria-selected="true">
                  <i class="fa-solid fa-paper-plane"></i> Applications (${userApplications.length})
                </button>
                <button class="tab-button" type="button" data-tab="saved-jobs" role="tab" aria-selected="false">
                  <i class="fa-solid fa-briefcase"></i> Saved Jobs (${savedJobs.length})
                </button>
                <button class="tab-button" type="button" data-tab="saved-internships" role="tab" aria-selected="false">
                  <i class="fa-solid fa-graduation-cap"></i> Saved Internships (${savedInternships.length})
                </button>
                <button class="tab-button" type="button" data-tab="alerts" role="tab" aria-selected="false">
                  <i class="fa-solid fa-bell"></i> Job Alerts (${alerts.length})
                </button>
                <button class="tab-button" type="button" data-tab="recent" role="tab" aria-selected="false">
                  <i class="fa-solid fa-clock-rotate-left"></i> Recently Viewed
                </button>
              </div>

              <div id="dashboard-tab-content"></div>
            </section>
          </div>
        </div>
      </section>
    `;

    // Render Tab Contents
    function renderTab(tabKey) {
      const container = root.querySelector("#dashboard-tab-content");
      if (!container) return;

      root.querySelectorAll("[data-tab]").forEach(btn => {
        const active = btn.dataset.tab === tabKey;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-selected", String(active));
      });

      if (tabKey === "applications") {
        const currentApps = Career.read(Career.KEYS.applications, []).filter(app => app.email.toLowerCase() === user.email.toLowerCase());
        if (currentApps.length === 0) {
          container.innerHTML = `
            <div class="empty-state">
              <div class="empty-icon"><i class="fa-solid fa-inbox"></i></div>
              <h3>No Applications Submitted Yet</h3>
              <p>Explore active jobs or internships and click "Apply Now" to start tracking your application lifecycle.</p>
              <a class="button button-primary button-small" href="jobs.html">Explore Jobs →</a>
            </div>
          `;
          return;
        }

        container.innerHTML = `
          <div class="application-list">
            ${currentApps.map(app => {
              const item = Career.getListing(app.id);
              if (!item) return "";

              const status = app.status || "Applied";
              let badgeClass = "status-applied";
              if (status === "Under Review") badgeClass = "status-under-review";
              if (status === "Shortlisted") badgeClass = "status-shortlisted";
              if (status === "Rejected") badgeClass = "status-rejected";

              const isIntern = Career.listingType(item) === "internship";
              const dateStr = new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

              return `
                <article class="application-card">
                  <div class="application-info">
                    ${Career.logoMark(item.companyMark)}
                    <div>
                      <h3>
                        <a href="job-details.html?id=${encodeURIComponent(item.id)}${isIntern ? "&type=internship" : ""}">
                          ${Career.escapeHtml(item.title)}
                        </a>
                      </h3>
                      <p>${Career.escapeHtml(item.company)} · Applied on ${dateStr}</p>
                    </div>
                  </div>

                  <div class="status-badge ${badgeClass}" id="badge-${item.id}">
                    <i class="fa-solid fa-circle-dot"></i>
                    <select class="status-select" data-status-id="${item.id}" aria-label="Update status for ${Career.escapeHtml(item.title)}">
                      <option value="Applied"${status === "Applied" ? " selected" : ""}>Applied</option>
                      <option value="Under Review"${status === "Under Review" ? " selected" : ""}>Under Review</option>
                      <option value="Shortlisted"${status === "Shortlisted" ? " selected" : ""}>Shortlisted</option>
                      <option value="Rejected"${status === "Rejected" ? " selected" : ""}>Rejected</option>
                    </select>
                  </div>
                </article>
              `;
            }).join("")}
          </div>
        `;

      } else if (tabKey === "saved-jobs") {
        if (savedJobs.length === 0) {
          container.innerHTML = `
            <div class="empty-state">
              <div class="empty-icon"><i class="fa-regular fa-bookmark"></i></div>
              <h3>No Saved Jobs</h3>
              <p>Click the bookmark icon on any job card to save roles to this list.</p>
              <a class="button button-primary button-small" href="jobs.html">Find Jobs →</a>
            </div>
          `;
          return;
        }

        container.innerHTML = `
          <div class="results-grid">
            ${savedJobs.map(Career.card).join("")}
          </div>
        `;

      } else if (tabKey === "saved-internships") {
        if (savedInternships.length === 0) {
          container.innerHTML = `
            <div class="empty-state">
              <div class="empty-icon"><i class="fa-regular fa-bookmark"></i></div>
              <h3>No Saved Internships</h3>
              <p>Click the bookmark icon on any internship card to save opportunities here.</p>
              <a class="button button-primary button-small" href="internships.html">Find Internships →</a>
            </div>
          `;
          return;
        }

        container.innerHTML = `
          <div class="results-grid">
            ${savedInternships.map(Career.card).join("")}
          </div>
        `;

      } else if (tabKey === "alerts") {
        const currentAlerts = Career.read(Career.KEYS.alerts, []);
        if (currentAlerts.length === 0) {
          container.innerHTML = `
            <div class="empty-state">
              <div class="empty-icon"><i class="fa-solid fa-bell"></i></div>
              <h3>No Active Job Alerts</h3>
              <p>Create search alerts on the Jobs or Internships page to receive notification digests for new opportunities.</p>
              <a class="button button-primary button-small" href="jobs.html">Create Job Alert →</a>
            </div>
          `;
          return;
        }

        container.innerHTML = `
          <div class="application-list">
            ${currentAlerts.map(alt => `
              <article class="application-card">
                <div class="application-info">
                  <span class="company-logo" style="color:var(--primary);background:var(--primary-light)"><i class="fa-solid fa-bell"></i></span>
                  <div>
                    <h3>${Career.escapeHtml(alt.title)}</h3>
                    <p>${Career.escapeHtml(alt.location || "All Locations")} · Frequency: ${Career.escapeHtml(alt.frequency || "Instant")}</p>
                  </div>
                </div>

                <button type="button" class="button button-secondary button-small" data-delete-alert="${alt.id}" style="color:var(--danger)">
                  <i class="fa-solid fa-trash-can"></i> Delete Alert
                </button>
              </article>
            `).join("")}
          </div>
        `;

      } else if (tabKey === "recent") {
        const recentIds = Career.read(Career.KEYS.recent, []);
        const recentItems = recentIds.map(id => Career.getListing(id)).filter(Boolean);

        if (recentItems.length === 0) {
          container.innerHTML = `
            <div class="empty-state">
              <div class="empty-icon"><i class="fa-solid fa-clock-rotate-left"></i></div>
              <h3>No Recently Viewed Items</h3>
              <p>View job or internship details to see your recent browsing history here.</p>
              <a class="button button-primary button-small" href="jobs.html">Explore Opportunities →</a>
            </div>
          `;
          return;
        }

        container.innerHTML = `
          <div class="results-grid">
            ${recentItems.map(Career.card).join("")}
          </div>
        `;
      }
    }

    renderTab("applications");

    // Tab Buttons Event Delegation
    root.querySelectorAll("[data-tab]").forEach(btn => {
      btn.addEventListener("click", () => renderTab(btn.dataset.tab));
    });

    // Delete Job Alert Delegation
    root.addEventListener("click", e => {
      const delBtn = e.target.closest("[data-delete-alert]");
      if (!delBtn) return;

      const alertId = delBtn.dataset.deleteAlert;
      const currentAlerts = Career.read(Career.KEYS.alerts, []);
      const updatedAlerts = currentAlerts.filter(a => a.id !== alertId);

      if (Career.write(Career.KEYS.alerts, updatedAlerts)) {
        Career.toast("Job Alert deleted.");
        renderTab("alerts");
      }
    });

    // Application Status Change Handler (In-Place Update without full re-render)
    root.addEventListener("change", e => {
      const select = e.target.closest("[data-status-id]");
      if (!select) return;

      const itemId = select.dataset.statusId;
      const newStatus = select.value;
      const applications = Career.read(Career.KEYS.applications, []);

      const entry = applications.find(a => a.id === itemId && a.email.toLowerCase() === user.email.toLowerCase());
      if (entry) {
        entry.status = newStatus;
        if (Career.write(Career.KEYS.applications, applications)) {
          // Update Badge styling in DOM directly
          const badge = root.querySelector(`#badge-${itemId}`);
          if (badge) {
            badge.className = `status-badge status-${newStatus.toLowerCase().replace(/\s+/g, "-")}`;
          }

          // Update Shortlisted counter in DOM directly
          const updatedShortlisted = applications.filter(a => a.email.toLowerCase() === user.email.toLowerCase() && a.status === "Shortlisted").length;
          const statShortlisted = root.querySelector("#stat-shortlisted");
          if (statShortlisted) statShortlisted.textContent = String(updatedShortlisted);

          Career.toast(`Application status updated to: ${newStatus}`);
        }
      }
    });

    // Profile Form Edit Submit Handler
    const profileForm = root.querySelector("#profile-form");
    if (profileForm) {
      profileForm.addEventListener("submit", e => {
        e.preventDefault();
        const headline = profileForm.elements.headline.value.trim();
        const location = profileForm.elements.location.value.trim();

        const updatedUser = {
          ...user,
          headline,
          location
        };

        const isPersistent = Boolean(Career.read(Career.KEYS.user, null));
        if (Career.setCurrentUser(updatedUser, isPersistent)) {
          // Update user in registered users array
          const users = Career.read(Career.KEYS.users, []);
          const uIdx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
          if (uIdx !== -1) {
            users[uIdx].headline = headline;
            users[uIdx].location = location;
            Career.write(Career.KEYS.users, users);
          }

          // Update progress bar & text dynamically
          const newPct = getCompletionPercent(updatedUser);
          const bar = root.querySelector("#completion-bar");
          const text = root.querySelector("#completion-text");
          if (bar) bar.style.width = `${newPct}%`;
          if (text) text.textContent = `${newPct}%`;

          Career.toast("Profile details updated successfully!");
        }
      });
    }

    // Clear Local Storage Privacy Button Handler
    const clearDataBtn = root.querySelector("#clear-local-data-btn");
    if (clearDataBtn) {
      clearDataBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear all your local applications, saved items, and user session?")) {
          localStorage.clear();
          sessionStorage.clear();
          Career.toast("All local data has been cleared.");
          setTimeout(() => { window.location.href = "index.html"; }, 400);
        }
      });
    }
  }

  window.CareerDashboard = { init };
})();

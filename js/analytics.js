/* ==========================================================================
   CareerConnect — Privacy-Preserving Client Analytics Engine
   Zero cookies, zero remote tracking, 100% anonymized local metrics.
   ========================================================================== */

(function () {
  "use strict";

  const ANALYTICS_KEY = "careerconnect:analytics_events";

  function logEvent(category, action, label = "") {
    try {
      const logs = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || "[]");
      logs.unshift({
        timestamp: new Date().toISOString(),
        category,
        action,
        label,
        path: window.location.pathname
      });
      // Maintain last 50 local events for memory efficiency
      localStorage.setItem(ANALYTICS_KEY, JSON.stringify(logs.slice(0, 50)));
    } catch (e) {
      // Quiet fail if storage unavailable
    }
  }

  // Record initial pageview anonymously
  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page || "home";
    logEvent("PageView", "View", page);
  });

  // Track button interactions
  document.addEventListener("click", e => {
    const applyBtn = e.target.closest("[data-apply]");
    if (applyBtn) {
      logEvent("Interaction", "Click_Apply", applyBtn.dataset.apply);
      return;
    }

    const saveBtn = e.target.closest("[data-save]");
    if (saveBtn) {
      logEvent("Interaction", "Click_Bookmark", saveBtn.dataset.save);
      return;
    }
  });

  window.CareerAnalytics = { logEvent };
})();

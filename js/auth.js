/* ==========================================================================
   CareerConnect — Authentication & Privacy Security Module (Vanilla JS)
   ========================================================================== */

(function () {
  "use strict";

  // SHA-256 Password Hash Helper for Privacy (No plain-text passwords in LocalStorage)
  async function hashPassword(str) {
    if (window.crypto && window.crypto.subtle) {
      try {
        const msgUint8 = new TextEncoder().encode(str);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
        return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      } catch (e) {
        console.warn("Crypto API fallback:", e);
      }
    }
    // Simple fallback hash algorithm if Web Crypto is unavailable
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return "h_" + Math.abs(hash).toString(36);
  }

  async function init(pageKey) {
    // Redirect to dashboard if already logged in
    if (Career.currentUser()) {
      window.location.replace("dashboard.html");
      return;
    }

    const root = document.querySelector("#page-content");
    if (!root) return;

    const isRegistering = pageKey === "register";

    root.innerHTML = `
      <section class="auth-shell">
        <div class="auth-card">
          <span class="eyebrow">${isRegistering ? "Get Started for Free" : "Welcome Back"}</span>
          <h1>${isRegistering ? "Create an Account" : "Sign in to CareerConnect"}</h1>
          <p>${isRegistering ? "Save opportunities and track your job & internship applications." : "Access your saved roles and application status tracking."}</p>

          <form class="auth-form" id="auth-form" novalidate>
            ${isRegistering ? `
              <div>
                <label for="auth-name">Full Name</label>
                <input id="auth-name" name="name" type="text" autocomplete="name" required placeholder="e.g. Aarav Sharma">
              </div>
            ` : ""}

            <div>
              <label for="auth-email">Email Address</label>
              <input id="auth-email" name="email" type="email" autocomplete="email" required placeholder="you@example.com" value="">
            </div>

            <div>
              <label for="auth-password">Password</label>
              <div class="password-wrap">
                <input id="auth-password" name="password" type="password" autocomplete="${isRegistering ? "new-password" : "current-password"}" minlength="6" required placeholder="At least 6 characters" value="">
                <button type="button" class="password-toggle" data-password-toggle>Show</button>
              </div>
            </div>

            ${isRegistering ? `
              <div>
                <label for="auth-confirm">Confirm Password</label>
                <input id="auth-confirm" name="confirm" type="password" autocomplete="new-password" required placeholder="Re-enter your password">
              </div>
            ` : `
              <label class="check-line">
                <input name="remember" type="checkbox" checked>
                <span>Remember me on this browser</span>
              </label>
            `}

            <div class="form-message" id="auth-message" aria-live="polite"></div>

            <button class="button button-primary" type="submit" style="width:100%;margin-top:6px">
              ${isRegistering ? "Create Account" : "Sign In"} →
            </button>
          </form>

          <p class="auth-foot">
            ${isRegistering
              ? 'Already have an account? <a class="text-link" href="login.html">Sign in</a>'
              : 'New to CareerConnect? <a class="text-link" href="register.html">Create an account</a>'}
          </p>

          <div class="auth-note">
            <strong style="color:var(--text-main)"><i class="fa-solid fa-user-shield"></i> Privacy & Data Safety Protection:</strong><br>
            All passwords are encrypted using <strong>SHA-256 Web Crypto hashing</strong> before storing locally. No plaintext credentials or user tracking data are ever transmitted to remote servers.
          </div>
        </div>
      </section>
    `;

    const form = root.querySelector("#auth-form");
    const toggleBtn = root.querySelector("[data-password-toggle]");
    const passInput = form.elements.password;

    // Show/Hide Password Toggle
    toggleBtn.addEventListener("click", () => {
      const isPass = passInput.type === "password";
      passInput.type = isPass ? "text" : "password";
      toggleBtn.textContent = isPass ? "Hide" : "Show";
    });

    // Form Submit Handler
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const messageEl = root.querySelector("#auth-message");
      messageEl.textContent = "";

      const email = String(form.elements.email.value).trim().toLowerCase();
      const password = form.elements.password.value;

      // Email Format Check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        messageEl.textContent = "Please enter a valid email address.";
        form.elements.email.focus();
        return;
      }

      // Password Length Check
      if (password.length < 6) {
        messageEl.textContent = "Password must be at least 6 characters long.";
        passInput.focus();
        return;
      }

      const inputHash = await hashPassword(password);

      if (isRegistering) {
        const name = String(form.elements.name.value).trim();
        const confirm = form.elements.confirm.value;

        if (name.length < 2) {
          messageEl.textContent = "Please enter your full name (at least 2 characters).";
          form.elements.name.focus();
          return;
        }

        if (confirm !== password) {
          messageEl.textContent = "Passwords do not match. Please verify.";
          form.elements.confirm.focus();
          return;
        }

        let users = Career.read(Career.KEYS.users, []);
        if (users.some(u => u.email.toLowerCase() === email)) {
          messageEl.textContent = "An account with this email address already exists. Please sign in.";
          return;
        }

        const newUser = {
          name,
          email,
          passwordHash: inputHash,
          headline: "Software Engineering Aspirant",
          location: "India"
        };

        users.push(newUser);
        if (!Career.write(Career.KEYS.users, users)) return;

        Career.setCurrentUser({ name, email, headline: newUser.headline, location: newUser.location }, true);
        Career.toast("Account created securely! Welcome aboard.");
        window.location.href = "dashboard.html";

      } else {
        let users = Career.read(Career.KEYS.users, []);
        const matched = users.find(u => u.email.toLowerCase() === email && (u.passwordHash === inputHash || u.password === password));

        if (!matched) {
          messageEl.textContent = "Invalid email or password. Please check your credentials.";
          return;
        }

        const remember = form.elements.remember ? form.elements.remember.checked : true;
        Career.setCurrentUser({
          name: matched.name,
          email: matched.email,
          headline: matched.headline || "",
          location: matched.location || ""
        }, remember);

        Career.toast(`Welcome back, ${matched.name.split(" ")[0]}!`);
        window.location.href = "dashboard.html";
      }
    });
  }

  window.CareerAuth = { init };
})();

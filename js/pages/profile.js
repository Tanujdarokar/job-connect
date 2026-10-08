/**
 * JobConnect Candidate Profile Management Page Module
 */

import { getIcon } from '../icons.js';
import { getCurrentUser, updateUserProfile } from '../state.js';
import { renderSeekerSidebar } from '../components/sidebar.js';
import { toast } from '../toast.js';

export function renderProfilePage() {
  const user = getCurrentUser();
  if (!user) {
    window.location.hash = '#/login';
    return '';
  }

  const skills = user.skills || [];
  const experience = user.experience || [];
  const education = user.education || [];

  return `
    <div class="dashboard-layout">
      ${renderSeekerSidebar('#/seeker/profile')}
      <main class="dashboard-main">
        <div style="margin-bottom: 2rem;">
          <h1 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Candidate Profile</h1>
          <p>Keep your profile, work experience, and skills up-to-date to attract top recruiters.</p>
        </div>

        <form id="profile-form">
          <!-- Basic Information Card -->
          <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
            <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem;">
              <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid var(--primary-light);" alt="${user.name}">
              <div>
                <h3 style="font-size: 1.25rem;">${user.name}</h3>
                <p style="font-size: 0.875rem;">${user.email}</p>
                <div class="badge badge-success" style="margin-top: 0.35rem;">Profile Strength: ${user.profileCompletion || 85}%</div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
              <div class="form-group">
                <label class="form-label" for="prof-name">Full Name</label>
                <input type="text" id="prof-name" class="form-input" value="${user.name || ''}" required>
              </div>
              <div class="form-group">
                <label class="form-label" for="prof-phone">Phone Number</label>
                <input type="text" id="prof-phone" class="form-input" value="${user.phone || '+91 98765 43210'}">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="prof-headline">Professional Headline</label>
              <input type="text" id="prof-headline" class="form-input" value="${user.headline || 'Senior Full Stack React & Node Developer'}" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="prof-location">Current Location</label>
              <input type="text" id="prof-location" class="form-input" value="${user.location || 'Ahmedabad, Gujarat'}">
            </div>

            <div class="form-group">
              <label class="form-label" for="prof-bio">About & Bio</label>
              <textarea id="prof-bio" class="form-textarea" rows="3">${user.bio || 'Passionate software engineer crafting high-performance web applications.'}</textarea>
            </div>
          </div>

          <!-- Skills Manager -->
          <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
            <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Core Skills & Technologies</h3>
            <div id="skills-container" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem;">
              ${skills.map((s, idx) => `
                <span class="badge badge-primary" style="font-size: 0.85rem; padding: 0.35rem 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
                  ${s}
                  <button type="button" class="remove-skill-btn" data-index="${idx}" style="cursor: pointer; color: var(--primary); font-weight: bold; border: none; background: none;">×</button>
                </span>
              `).join('')}
            </div>
            <div style="display: flex; gap: 0.75rem;">
              <input type="text" id="new-skill-input" class="form-input" placeholder="Add a new skill (e.g. Next.js, Docker, GraphQL)..." style="max-width: 360px;">
              <button type="button" id="add-skill-btn" class="btn btn-secondary">
                ${getIcon('plus')} Add Skill
              </button>
            </div>
          </div>

          <!-- Resume Attachment -->
          <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
            <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Attached Resume Document</h3>
            <p style="font-size: 0.875rem; margin-bottom: 1.25rem;">Used automatically for 1-click job applications and AI ATS analysis.</p>

            <div style="display: flex; align-items: center; justify-content: space-between; padding: 1.25rem; border: 2px dashed var(--border-color); border-radius: var(--radius-lg); background: var(--bg-muted); flex-wrap: wrap; gap: 1rem;">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center;">
                  ${getIcon('fileText')}
                </div>
                <div>
                  <div style="font-weight: 700; font-size: 0.95rem;">${user.resume?.fileName || 'Aarav_Sharma_FullStack_Resume.pdf'}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">${user.resume?.fileSize || '420 KB'} • Last uploaded ${new Date().toLocaleDateString()}</div>
                </div>
              </div>
              <div>
                <input type="file" id="resume-file-input" style="display: none;">
                <button type="button" id="upload-resume-trigger" class="btn btn-outline">
                  ${getIcon('upload')} Replace Resume (PDF/DOCX)
                </button>
              </div>
            </div>
          </div>

          <!-- Experience Timeline -->
          <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
              <h3 style="font-size: 1.25rem;">Work Experience</h3>
              <button type="button" id="add-exp-btn" class="btn btn-sm btn-outline">
                ${getIcon('plus')} Add Experience
              </button>
            </div>

            <div id="experience-list" style="display: flex; flex-direction: column; gap: 1.25rem;">
              ${experience.map((exp, idx) => `
                <div style="padding: 1.25rem; background: var(--bg-muted); border-radius: var(--radius-lg); border-left: 3px solid var(--primary);">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                      <div style="font-weight: 700; font-size: 1rem;">${exp.title}</div>
                      <div style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">${exp.company} • ${exp.location || 'India'}</div>
                      <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">${exp.startDate} - ${exp.endDate || 'Present'}</div>
                    </div>
                    <button type="button" class="btn-icon remove-exp-btn" data-index="${idx}" style="color: var(--danger); border: none; background: transparent;">
                      ${getIcon('trash')}
                    </button>
                  </div>
                  <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.75rem; line-height: 1.5;">${exp.description || ''}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Save Button -->
          <div style="display: flex; justify-content: flex-end; gap: 1rem;">
            <button type="submit" class="btn btn-primary btn-lg">
              ${getIcon('check')} Save All Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  `;
}

export function attachProfileEvents() {
  const user = getCurrentUser();
  if (!user) return;

  let currentSkills = [...(user.skills || [])];
  let currentExperience = [...(user.experience || [])];

  // Remove skill
  document.querySelectorAll('.remove-skill-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const idx = Number(btn.dataset.index);
      currentSkills.splice(idx, 1);
      updateUserProfile({ skills: currentSkills });
      window.location.reload();
    });
  });

  // Add skill
  const addSkillBtn = document.querySelector('#add-skill-btn');
  const skillInput = document.querySelector('#new-skill-input');
  if (addSkillBtn && skillInput) {
    const handleAdd = () => {
      const val = skillInput.value.trim();
      if (val && !currentSkills.includes(val)) {
        currentSkills.push(val);
        updateUserProfile({ skills: currentSkills });
        window.location.reload();
      }
    };
    addSkillBtn.addEventListener('click', handleAdd);
    skillInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') handleAdd(); });
  }

  // Resume upload simulator
  const uploadTrigger = document.querySelector('#upload-resume-trigger');
  const fileInput = document.querySelector('#resume-file-input');
  if (uploadTrigger && fileInput) {
    uploadTrigger.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        updateUserProfile({
          resume: {
            fileName: file.name,
            fileSize: `${(file.size / 1024).toFixed(0)} KB`,
            uploadedAt: new Date().toISOString(),
          }
        });
        toast.success('Resume Uploaded! 📄', `Updated with ${file.name}`);
        setTimeout(() => window.location.reload(), 800);
      }
    });
  }

  // Add Experience
  const addExpBtn = document.querySelector('#add-exp-btn');
  if (addExpBtn) {
    addExpBtn.addEventListener('click', () => {
      const newExp = {
        id: `exp_${Date.now()}`,
        title: 'Senior Software Engineer',
        company: 'NextGen Solutions',
        location: 'Remote',
        startDate: '2023-01',
        endDate: 'Present',
        current: true,
        description: 'Engineered high-throughput web applications with modern micro-frontend architecture.',
      };
      currentExperience.push(newExp);
      updateUserProfile({ experience: currentExperience });
      toast.success('Experience Added', 'New work history position added.');
      window.location.reload();
    });
  }

  // Remove Experience
  document.querySelectorAll('.remove-exp-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      currentExperience.splice(idx, 1);
      updateUserProfile({ experience: currentExperience });
      toast.info('Experience Removed', 'Work history entry deleted.');
      window.location.reload();
    });
  });

  // Profile Form submit
  const form = document.querySelector('#profile-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.querySelector('#prof-name').value.trim();
      const phone = document.querySelector('#prof-phone').value.trim();
      const headline = document.querySelector('#prof-headline').value.trim();
      const location = document.querySelector('#prof-location').value.trim();
      const bio = document.querySelector('#prof-bio').value.trim();

      updateUserProfile({ name, phone, headline, location, bio });
      toast.success('Profile Saved! ✨', 'Your profile changes are now live.');
    });
  }
}

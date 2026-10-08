/**
 * JobConnect Interactive Live Video Interview Room Module
 */

import { getIcon } from '../icons.js';
import { getCurrentUser } from '../state.js';
import { toast } from '../toast.js';

let audioAnimationId = null;
let timerInterval = null;
let secondsElapsed = 145;

const AI_QUESTIONS = [
  {
    id: 1,
    category: 'System Architecture',
    text: 'How would you architect a high-throughput micro-frontend dashboard with client-side caching and optimistic UI updates?',
    hint: 'Mention State management, WebSockets / SSE for live telemetry, and cache invalidation strategies.',
  },
  {
    id: 2,
    category: 'Performance Optimization',
    text: 'Can you describe a scenario where you diagnosed a severe web performance bottleneck and how you solved it?',
    hint: 'Talk about bundle splitting, layout thrashing, Core Web Vitals (LCP/INP/CLS), and memory profiling.',
  },
  {
    id: 3,
    category: 'Engineering Leadership',
    text: 'How do you handle technical disagreements within an agile squad when balancing technical debt vs product speed?',
    hint: 'Discuss RFC documentation, data-driven prototyping, and transparent risk tradeoffs.',
  },
];

let currentQuestionIndex = 0;
let isMicActive = true;
let isCamActive = true;

export function renderVideoInterviewPage() {
  const user = getCurrentUser() || { name: 'Aarav Sharma' };
  const currentQ = AI_QUESTIONS[currentQuestionIndex];

  return `
    <div class="container" style="padding: 1.5rem 1.25rem;">
      <!-- Room Top Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <a href="#/seeker/interviews" class="btn btn-outline btn-sm">
            ${getIcon('arrowLeft')} Leave Room
          </a>
          <div>
            <h2 style="font-size: 1.35rem; margin-bottom: 0;">Live Interview: System Design & React Architecture</h2>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Host: TechCorp Innovations • Candidate: ${user.name}</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div id="interview-timer" class="badge badge-muted" style="font-size: 0.9rem; font-family: monospace; padding: 0.4rem 0.85rem; font-weight: 700;">
            ⏱️ 00:02:25
          </div>
          <span class="badge badge-success" style="padding: 0.4rem 0.85rem;">HD Encrypted Stream</span>
        </div>
      </div>

      <!-- Main Video Room Layout -->
      <div class="video-room-container">
        <!-- Left: Live Video Feed & Controls -->
        <div class="video-feed-card">
          <!-- Recording Badge -->
          <div class="video-indicator-badge">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #ffffff; display: inline-block;"></span>
            LIVE REC
          </div>

          <!-- Video Canvas Feed / Avatar -->
          <div class="video-canvas-container" id="video-display-area" style="background: radial-gradient(circle, #1e293b 0%, #0f172a 100%);">
            <div id="cam-active-display" style="text-align: center; color: #ffffff;">
              <div style="width: 130px; height: 130px; border-radius: 50%; border: 4px solid var(--primary); margin: 0 auto 1.5rem auto; overflow: hidden; box-shadow: 0 0 30px rgba(79, 70, 229, 0.4);">
                <img src="${user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" style="width: 100%; height: 100%; object-fit: cover;" alt="${user.name}">
              </div>
              <h3 style="color: #ffffff; font-size: 1.25rem;">${user.name}</h3>
              <div style="font-size: 0.85rem; color: #94a3b8; margin-top: 0.25rem;">Frontend Lead Candidate • Ahmedabad</div>
            </div>

            <div id="cam-off-display" style="display: none; text-align: center; color: #94a3b8;">
              <div style="font-size: 3rem; margin-bottom: 0.5rem;">📷</div>
              <div>Camera is Turned Off</div>
            </div>
          </div>

          <!-- Interactive Controls Floating Bar -->
          <div class="video-overlay-controls">
            <button type="button" id="toggle-mic-btn" class="btn btn-sm btn-secondary" style="border-radius: 9999px; padding: 0.5rem 1rem; color: #ffffff; background: rgba(255,255,255,0.15);">
              ${isMicActive ? getIcon('mic') : getIcon('micOff')} <span id="mic-status-label">${isMicActive ? 'Mute' : 'Unmute'}</span>
            </button>
            <button type="button" id="toggle-cam-btn" class="btn btn-sm btn-secondary" style="border-radius: 9999px; padding: 0.5rem 1rem; color: #ffffff; background: rgba(255,255,255,0.15);">
              ${isCamActive ? getIcon('video') : getIcon('videoOff')} <span id="cam-status-label">${isCamActive ? 'Stop Video' : 'Start Video'}</span>
            </button>
            <button type="button" id="end-call-btn" class="btn btn-sm btn-danger" style="border-radius: 9999px; padding: 0.5rem 1.25rem;">
              End Session
            </button>
          </div>
        </div>

        <!-- Right: Real-Time AI Prompter & Audio Visualizer -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <!-- AI Question Card -->
          <div class="card" style="padding: 1.5rem; border-top: 4px solid var(--accent); flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <span class="badge badge-accent">AI Question ${currentQuestionIndex + 1} of ${AI_QUESTIONS.length}</span>
                <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">${currentQ.category}</span>
              </div>
              <h3 style="font-size: 1.15rem; line-height: 1.5; color: var(--text-main); margin-bottom: 1rem;" id="ai-q-text">
                "${currentQ.text}"
              </h3>
              <div style="background: var(--bg-muted); padding: 0.85rem 1rem; border-radius: var(--radius-md); font-size: 0.825rem; color: var(--text-muted); margin-bottom: 1rem;">
                💡 <strong style="color: var(--text-main);">Pro-Tip:</strong> <span id="ai-q-hint">${currentQ.hint}</span>
              </div>
            </div>

            <!-- Answer Simulation / Speech Wave -->
            <div>
              <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.4rem; display: flex; justify-content: space-between;">
                <span>Voice Activity Waveform</span>
                <span style="color: var(--success); font-weight: 600;">Optimal Audio Level</span>
              </div>
              <canvas id="audio-wave-canvas" height="40" style="width: 100%; background: var(--bg-muted); border-radius: var(--radius-md);"></canvas>

              <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
                <button type="button" id="next-q-btn" class="btn btn-outline" style="flex: 1;">
                  Next Question ${getIcon('arrowRight')}
                </button>
                <button type="button" id="submit-answer-btn" class="btn btn-primary" style="flex: 1.2;">
                  ${getIcon('sparkles')} Evaluate Answer
                </button>
              </div>
            </div>
          </div>

          <!-- Real-Time AI Score Gauge -->
          <div id="ai-feedback-card" class="card" style="padding: 1.25rem; background: var(--bg-muted);">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-weight: 700; font-size: 0.95rem;">AI Response Readiness Score</div>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">Clarity, technical depth & structure</div>
              </div>
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--success);" id="ai-eval-score">92%</div>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem; line-height: 1.4;" id="ai-eval-comment">
              Excellent explanation covering client caching tradeoffs, WebSocket telemetry, and resilient UI error states.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachVideoInterviewEvents() {
  // Timer setup
  if (timerInterval) clearInterval(timerInterval);
  const timerEl = document.querySelector('#interview-timer');
  timerInterval = setInterval(() => {
    secondsElapsed++;
    const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
    const secs = String(secondsElapsed % 60).padStart(2, '0');
    if (timerEl) timerEl.textContent = `⏱️ 00:${mins}:${secs}`;
  }, 1000);

  // Audio wave canvas animation
  const canvas = document.querySelector('#audio-wave-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let step = 0;

    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = isMicActive ? '#4f46e5' : '#94a3b8';
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x += 4) {
        const y = isMicActive ? (canvas.height / 2) + Math.sin((x + step) * 0.08) * 10 * Math.random() : canvas.height / 2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      step += 3;
      audioAnimationId = requestAnimationFrame(renderWave);
    };
    renderWave();
  }

  // Toggle Mic
  const micBtn = document.querySelector('#toggle-mic-btn');
  const micLabel = document.querySelector('#mic-status-label');
  if (micBtn) {
    micBtn.addEventListener('click', () => {
      isMicActive = !isMicActive;
      micBtn.innerHTML = `${isMicActive ? getIcon('mic') : getIcon('micOff')} <span>${isMicActive ? 'Mute' : 'Unmute'}</span>`;
      toast.info(isMicActive ? 'Microphone Active' : 'Microphone Muted', '');
    });
  }

  // Toggle Camera
  const camBtn = document.querySelector('#toggle-cam-btn');
  const camActiveDisplay = document.querySelector('#cam-active-display');
  const camOffDisplay = document.querySelector('#cam-off-display');
  if (camBtn) {
    camBtn.addEventListener('click', () => {
      isCamActive = !isCamActive;
      camBtn.innerHTML = `${isCamActive ? getIcon('video') : getIcon('videoOff')} <span>${isCamActive ? 'Stop Video' : 'Start Video'}</span>`;
      if (camActiveDisplay && camOffDisplay) {
        camActiveDisplay.style.display = isCamActive ? 'block' : 'none';
        camOffDisplay.style.display = isCamActive ? 'none' : 'block';
      }
      toast.info(isCamActive ? 'Camera Enabled' : 'Camera Disabled', '');
    });
  }

  // Next Question
  const nextQBtn = document.querySelector('#next-q-btn');
  if (nextQBtn) {
    nextQBtn.addEventListener('click', () => {
      currentQuestionIndex = (currentQuestionIndex + 1) % AI_QUESTIONS.length;
      const q = AI_QUESTIONS[currentQuestionIndex];
      const qText = document.querySelector('#ai-q-text');
      const qHint = document.querySelector('#ai-q-hint');
      if (qText) qText.textContent = `"${q.text}"`;
      if (qHint) qHint.textContent = q.hint;
      toast.info('New AI Question Loaded', q.category);
    });
  }

  // Evaluate Answer
  const evaluateBtn = document.querySelector('#submit-answer-btn');
  if (evaluateBtn) {
    evaluateBtn.addEventListener('click', () => {
      toast.info('AI Evaluating Speech...', 'Analyzing delivery, depth, and terminology.');
      setTimeout(() => {
        const scores = [94, 88, 91, 95];
        const randomScore = scores[Math.floor(Math.random() * scores.length)];
        const scoreEl = document.querySelector('#ai-eval-score');
        if (scoreEl) scoreEl.textContent = `${randomScore}%`;
        toast.success('Evaluation Ready! ⭐', `Candidate answered with ${randomScore}% architectural accuracy.`);
      }, 800);
    });
  }

  // End Call
  const endBtn = document.querySelector('#end-call-btn');
  if (endBtn) {
    endBtn.addEventListener('click', () => {
      if (timerInterval) clearInterval(timerInterval);
      if (audioAnimationId) cancelAnimationFrame(audioAnimationId);
      toast.success('Interview Completed', 'Feedback and session notes have been recorded.');
      window.location.hash = '#/seeker/interviews';
    });
  }
}

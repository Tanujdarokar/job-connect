/**
 * JobConnect Real-Time Chat & Messaging Page Module
 */

import { getIcon } from '../icons.js';
import { getCurrentUser, getChats, getChatById, sendMessage, USER_ROLES } from '../state.js';
import { toast } from '../toast.js';

let activeChatId = 'chat_1';

export function renderChatPage() {
  const user = getCurrentUser();
  if (!user) {
    window.location.hash = '#/login';
    return '';
  }

  const allChats = getChats();
  const currentChat = getChatById(activeChatId) || allChats[0];

  return `
    <div class="container" style="padding: 1.5rem 1.25rem;">
      <div class="chat-layout">
        <!-- Sidebar Threads List -->
        <div class="chat-sidebar">
          <div class="chat-sidebar-header">
            <h3 style="font-size: 1.15rem; margin-bottom: 0.75rem;">Direct Messages</h3>
            <div class="input-icon-wrapper">
              <span class="icon">${getIcon('search')}</span>
              <input type="text" id="chat-search" class="form-input form-input-sm" placeholder="Search conversations...">
            </div>
          </div>

          <ul class="chat-threads-list" id="chat-threads-container">
            ${allChats.map(c => `
              <li class="chat-thread-item ${c.id === activeChatId ? 'active' : ''}" data-chat-id="${c.id}">
                <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">
                  ${user.role === USER_ROLES.EMPLOYER ? '👤' : '💼'}
                </div>
                <div style="flex: 1; min-width: 0;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                    <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      ${user.role === USER_ROLES.EMPLOYER ? 'Aarav Sharma (Candidate)' : 'Priya Patel (TechCorp)'}
                    </div>
                  </div>
                  <div style="font-size: 0.8rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${c.lastMessage || 'Start a conversation'}
                  </div>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- Chat Conversation Area -->
        <div class="chat-main">
          <!-- Chat Header -->
          <div class="chat-header">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 700;">
                ${user.role === USER_ROLES.EMPLOYER ? '👤' : '💼'}
              </div>
              <div>
                <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-main);">
                  ${user.role === USER_ROLES.EMPLOYER ? 'Aarav Sharma' : 'Priya Patel (Recruiter at TechCorp)'}
                </div>
                <div style="font-size: 0.75rem; color: var(--success); font-weight: 600; display: flex; align-items: center; gap: 4px;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--success); display: inline-block;"></span>
                  Online • ${currentChat?.jobTitle || 'Senior Frontend Engineer'}
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem;">
              <a href="#/seeker/interviews/video?id=int_1" class="btn btn-primary btn-sm">
                ${getIcon('video')} Start Video Call
              </a>
            </div>
          </div>

          <!-- Messages Stream -->
          <div class="chat-messages-container" id="chat-messages-stream">
            ${(currentChat?.messages || []).map(m => {
              const isSent = m.senderId === user.id || m.senderId === 'user_seeker_1';
              return `
                <div class="chat-bubble ${isSent ? 'sent' : 'received'}">
                  <div>${m.text}</div>
                  <div class="chat-timestamp">${new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Chat Input Bar -->
          <form id="chat-send-form" class="chat-input-bar">
            <input type="text" id="chat-msg-input" class="form-input" placeholder="Type your message or ask questions..." required autocomplete="off" style="flex: 1;">
            <button type="submit" class="btn btn-primary">
              ${getIcon('send')} Send
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

export function attachChatEvents() {
  const stream = document.querySelector('#chat-messages-stream');
  if (stream) stream.scrollTop = stream.scrollHeight;

  const form = document.querySelector('#chat-send-form');
  const input = document.querySelector('#chat-msg-input');

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      const user = getCurrentUser();
      sendMessage(activeChatId, text, user?.id);
      input.value = '';

      // Render new sent bubble
      if (stream) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble sent';
        bubble.innerHTML = `
          <div>${text}</div>
          <div class="chat-timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        `;
        stream.appendChild(bubble);
        stream.scrollTop = stream.scrollHeight;
      }

      // Simulated instant recruiter reply after 1.2s
      setTimeout(() => {
        const replies = [
          "Thank you for the update! That works perfectly for our hiring team.",
          "Great point. We look forward to diving deeper into this during the technical architecture round.",
          "Awesome! I've shared the code workspace link with the engineering panel.",
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        sendMessage(activeChatId, randomReply, 'user_employer_1');

        if (stream) {
          const replyBubble = document.createElement('div');
          replyBubble.className = 'chat-bubble received';
          replyBubble.innerHTML = `
            <div>${randomReply}</div>
            <div class="chat-timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          `;
          stream.appendChild(replyBubble);
          stream.scrollTop = stream.scrollHeight;
        }
      }, 1200);
    });
  }
}

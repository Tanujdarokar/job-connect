import { storage, delay } from '../../../core/utils/storage';
import { INITIAL_CHATS } from '../../../core/utils/mockData';

const CHATS_KEY = 'chats';

class ChatService {
  async getUserChats(userId) {
    await delay(200);
    const chats = await storage.get(CHATS_KEY, INITIAL_CHATS);
    return chats.filter((chat) => chat.participants.includes(userId));
  }

  async getChatById(chatId) {
    await delay(150);
    const chats = await storage.get(CHATS_KEY, INITIAL_CHATS);
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) throw new Error('Conversation not found');
    return chat;
  }

  async getOrCreateChat({ seekerId, employerId, jobId, jobTitle }) {
    await delay(200);
    const chats = await storage.get(CHATS_KEY, INITIAL_CHATS);
    let chat = chats.find(
      (c) =>
        c.participants.includes(seekerId) &&
        c.participants.includes(employerId) &&
        (!jobId || c.jobId === jobId)
    );

    if (!chat) {
      chat = {
        id: `chat_${Date.now()}`,
        participants: [seekerId, employerId],
        seekerId,
        employerId,
        jobId,
        jobTitle: jobTitle || 'Job Opportunity',
        lastMessage: 'Conversation started',
        lastMessageAt: new Date().toISOString(),
        unreadCountSeeker: 0,
        unreadCountEmployer: 0,
        messages: [
          {
            id: `msg_${Date.now()}`,
            senderId: employerId,
            text: `Hello! Thank you for connecting regarding the ${jobTitle || 'role'}. How can we help you?`,
            timestamp: new Date().toISOString(),
          },
        ],
      };
      chats.unshift(chat);
      await storage.set(CHATS_KEY, chats);
    }
    return chat;
  }

  async sendMessage(chatId, senderId, text) {
    await delay(150);
    const chats = await storage.get(CHATS_KEY, INITIAL_CHATS);
    const index = chats.findIndex((c) => c.id === chatId);
    if (index === -1) throw new Error('Chat not found');

    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId,
      text,
      timestamp: new Date().toISOString(),
    };

    chats[index].messages.push(newMessage);
    chats[index].lastMessage = text;
    chats[index].lastMessageAt = new Date().toISOString();

    await storage.set(CHATS_KEY, chats);
    return { chat: chats[index], message: newMessage };
  }

  async simulateAutoReply(chatId, replySenderId) {
    await delay(1500); // realistic typing wait
    const replies = [
      "Thanks for following up! We're reviewing your information and will share next steps shortly.",
      "Sounds great! Are you available for a quick 15-minute sync this Thursday?",
      "That's very helpful context. Let me coordinate with the hiring engineering manager.",
      "Received! We appreciate your quick response.",
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    return this.sendMessage(chatId, replySenderId, randomReply);
  }
}

export const chatService = new ChatService();
export default chatService;

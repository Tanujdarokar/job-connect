import { storage, delay } from '../../../core/utils/storage';
import { INITIAL_USERS } from '../../../core/utils/mockData';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'current_user';

class ProfileService {
  async updateProfile(userId, updates) {
    await delay(300);
    const users = await storage.get(USERS_KEY, INITIAL_USERS);
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) throw new Error('User not found');

    // Calculate dynamic completion %
    const updatedUser = { ...users[index], ...updates };
    let score = 30; // baseline
    if (updatedUser.name && updatedUser.email) score += 20;
    if (updatedUser.headline) score += 10;
    if (updatedUser.skills && updatedUser.skills.length > 0) score += 15;
    if (updatedUser.experience && updatedUser.experience.length > 0) score += 15;
    if (updatedUser.education && updatedUser.education.length > 0) score += 10;
    updatedUser.profileCompletion = Math.min(100, score);

    users[index] = updatedUser;
    await storage.set(USERS_KEY, users);

    // If current logged-in user, update session
    const currentUser = await storage.get(CURRENT_USER_KEY, null);
    if (currentUser && currentUser.id === userId) {
      await storage.set(CURRENT_USER_KEY, updatedUser);
    }

    return updatedUser;
  }

  async toggleSavedJob(userId, jobId) {
    await delay(150);
    const users = await storage.get(USERS_KEY, INITIAL_USERS);
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) throw new Error('User not found');

    const user = users[index];
    user.savedJobs = user.savedJobs || [];
    const isSaved = user.savedJobs.includes(jobId);

    if (isSaved) {
      user.savedJobs = user.savedJobs.filter((id) => id !== jobId);
    } else {
      user.savedJobs.push(jobId);
    }

    await storage.set(USERS_KEY, users);

    const currentUser = await storage.get(CURRENT_USER_KEY, null);
    if (currentUser && currentUser.id === userId) {
      await storage.set(CURRENT_USER_KEY, user);
    }

    return { savedJobs: user.savedJobs, isSaved: !isSaved };
  }

  async getCandidates(filters = {}) {
    await delay(250);
    const users = await storage.get(USERS_KEY, INITIAL_USERS);
    let seekers = users.filter((u) => u.role === 'seeker');

    if (filters.skill) {
      const s = filters.skill.toLowerCase();
      seekers = seekers.filter((u) => u.skills && u.skills.some((sk) => sk.toLowerCase().includes(s)));
    }
    if (filters.q) {
      const q = filters.q.toLowerCase();
      seekers = seekers.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          (u.headline && u.headline.toLowerCase().includes(q)) ||
          (u.location && u.location.toLowerCase().includes(q))
      );
    }
    return seekers;
  }
}

export const profileService = new ProfileService();
export default profileService;

import { storage, delay } from '../../../core/utils/storage';
import { INITIAL_USERS, INITIAL_JOBS, INITIAL_REVIEWS } from '../../../core/utils/mockData';

class AdminService {
  async getAdminStats() {
    await delay(200);
    const users = await storage.get('users', INITIAL_USERS);
    const jobs = await storage.get('jobs', INITIAL_JOBS);
    const applications = await storage.get('applications', []);
    const reviews = await storage.get('reviews', INITIAL_REVIEWS);

    return {
      totalUsers: users.length,
      totalSeekers: users.filter((u) => u.role === 'seeker').length,
      totalEmployers: users.filter((u) => u.role === 'employer').length,
      totalJobs: jobs.length,
      activeJobs: jobs.filter((j) => j.status === 'active').length,
      totalApplications: applications.length,
      totalReviews: reviews.length,
    };
  }

  async getAllUsers() {
    await delay(200);
    return storage.get('users', INITIAL_USERS);
  }

  async toggleUserBlock(userId) {
    await delay(200);
    const users = await storage.get('users', INITIAL_USERS);
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) throw new Error('User not found');

    users[index].status = users[index].status === 'blocked' ? 'active' : 'blocked';
    await storage.set('users', users);
    return users[index];
  }

  async deleteUser(userId) {
    await delay(200);
    let users = await storage.get('users', INITIAL_USERS);
    users = users.filter((u) => u.id !== userId);
    await storage.set('users', users);
    return true;
  }

  async deleteReview(reviewId) {
    await delay(150);
    let reviews = await storage.get('reviews', INITIAL_REVIEWS);
    reviews = reviews.filter((r) => r.id !== reviewId);
    await storage.set('reviews', reviews);
    return true;
  }
}

export const adminService = new AdminService();
export default adminService;

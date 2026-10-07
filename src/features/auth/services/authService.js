import { storage, delay } from '../../../core/utils/storage';
import {
  INITIAL_USERS,
  INITIAL_JOBS,
  INITIAL_COMPANIES,
  INITIAL_APPLICATIONS,
  INITIAL_REVIEWS,
  INITIAL_CHATS,
  INITIAL_INTERVIEWS,
  INITIAL_NOTIFICATIONS,
} from '../../../core/utils/mockData';
import { USER_ROLES } from '../../../core/constants';

const STORAGE_KEYS = {
  USERS: 'users',
  CURRENT_USER: 'current_user',
  JOBS: 'jobs',
  COMPANIES: 'companies',
  APPLICATIONS: 'applications',
  REVIEWS: 'reviews',
  CHATS: 'chats',
  INTERVIEWS: 'interviews',
  NOTIFICATIONS: 'notifications',
  IS_INITIALIZED: 'db_initialized_v1',
};

class AuthService {
  async initMockDatabase() {
    const isInit = await storage.get(STORAGE_KEYS.IS_INITIALIZED, false);
    if (!isInit) {
      await storage.set(STORAGE_KEYS.USERS, INITIAL_USERS);
      await storage.set(STORAGE_KEYS.JOBS, INITIAL_JOBS);
      await storage.set(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
      await storage.set(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
      await storage.set(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
      await storage.set(STORAGE_KEYS.CHATS, INITIAL_CHATS);
      await storage.set(STORAGE_KEYS.INTERVIEWS, INITIAL_INTERVIEWS);
      await storage.set(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
      await storage.set(STORAGE_KEYS.IS_INITIALIZED, true);
    }
  }

  async getCurrentUser() {
    await this.initMockDatabase();
    await delay(150);
    const user = await storage.get(STORAGE_KEYS.CURRENT_USER, null);
    return user;
  }

  async login({ email, password }) {
    await this.initMockDatabase();
    await delay(350);

    const users = await storage.get(STORAGE_KEYS.USERS, INITIAL_USERS);
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
    );

    if (!user) {
      // Check if user exists with another password
      const userExists = users.some((u) => u.email.toLowerCase() === normalizedEmail);
      if (userExists) {
        throw new Error('Invalid password. Please check your credentials or use "password123".');
      }
      throw new Error('No user account found with this email address.');
    }

    if (user.status === 'blocked') {
      throw new Error('Your account has been suspended by an administrator.');
    }

    // Save current session
    await storage.set(STORAGE_KEYS.CURRENT_USER, user);
    return user;
  }

  async signup(userData) {
    await this.initMockDatabase();
    await delay(400);

    const users = await storage.get(STORAGE_KEYS.USERS, INITIAL_USERS);
    const normalizedEmail = userData.email.trim().toLowerCase();

    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      throw new Error('An account with this email address already exists. Please log in.');
    }

    const newUser = {
      id: `user_${Date.now()}`,
      email: normalizedEmail,
      password: userData.password,
      name: userData.name,
      role: userData.role || USER_ROLES.JOB_SEEKER,
      phone: userData.phone || '',
      headline: userData.headline || (userData.role === USER_ROLES.EMPLOYER ? 'Hiring Lead' : 'Software Professional'),
      companyName: userData.companyName || '',
      companyId: userData.role === USER_ROLES.EMPLOYER ? `comp_${Date.now()}` : undefined,
      location: userData.location || 'India',
      bio: '',
      skills: userData.skills || ['JavaScript', 'React'],
      languages: [{ name: 'English', proficiency: 'Fluent' }],
      experience: [],
      education: [],
      projects: [],
      savedJobs: [],
      profileCompletion: userData.role === USER_ROLES.JOB_SEEKER ? 50 : 80,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`,
      createdAt: new Date().toISOString(),
      status: 'active',
    };

    // If employer signs up with new company name, create mock company record
    if (newUser.role === USER_ROLES.EMPLOYER && newUser.companyName) {
      const companies = await storage.get(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
      const newCompany = {
        id: newUser.companyId,
        name: newUser.companyName,
        tagline: 'Leading the future of technology and innovation',
        logo: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(newUser.companyName)}`,
        banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
        industry: 'Information Technology',
        size: '50-200 employees',
        founded: 2022,
        website: 'https://example.com',
        location: newUser.location,
        rating: 5.0,
        reviewCount: 1,
        verified: false,
        description: `${newUser.companyName} is building innovative digital products and hiring top tier engineers.`,
        benefits: ['Health Insurance', 'Flexible PTO', 'Learning Stipend'],
      };
      companies.push(newCompany);
      await storage.set(STORAGE_KEYS.COMPANIES, companies);
    }

    users.push(newUser);
    await storage.set(STORAGE_KEYS.USERS, users);
    await storage.set(STORAGE_KEYS.CURRENT_USER, newUser);
    return newUser;
  }

  async loginWithOtp({ phone, otp }) {
    await this.initMockDatabase();
    await delay(350);

    // Accept any valid 6-digit OTP
    if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      throw new Error('Please enter a valid 6-digit verification code.');
    }

    const users = await storage.get(STORAGE_KEYS.USERS, INITIAL_USERS);
    // Find seeker or fallback to default seeker
    let user = users.find((u) => u.phone === phone || u.role === USER_ROLES.JOB_SEEKER);
    if (!user) {
      user = users[0];
    }

    await storage.set(STORAGE_KEYS.CURRENT_USER, user);
    return user;
  }

  async loginWithGoogle() {
    await this.initMockDatabase();
    await delay(400);

    // Pick first demo seeker or create google mock profile
    const users = await storage.get(STORAGE_KEYS.USERS, INITIAL_USERS);
    const seeker = users.find((u) => u.role === USER_ROLES.JOB_SEEKER) || users[0];
    await storage.set(STORAGE_KEYS.CURRENT_USER, seeker);
    return seeker;
  }

  async logout() {
    await delay(150);
    await storage.remove(STORAGE_KEYS.CURRENT_USER);
    return true;
  }

  async forgotPassword(email) {
    await delay(300);
    const users = await storage.get(STORAGE_KEYS.USERS, INITIAL_USERS);
    const exists = users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!exists) {
      throw new Error('No user account found with this email address.');
    }
    // Returns simulated 6-digit reset OTP
    return { success: true, otp: '123456', message: 'Verification code sent to your email.' };
  }

  async resetPassword({ email, otp, newPassword }) {
    await delay(350);
    if (otp !== '123456' && otp.length !== 6) {
      throw new Error('Invalid or expired OTP verification code.');
    }
    const users = await storage.get(STORAGE_KEYS.USERS, INITIAL_USERS);
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (userIndex === -1) {
      throw new Error('User not found.');
    }
    users[userIndex].password = newPassword;
    await storage.set(STORAGE_KEYS.USERS, users);
    return { success: true, message: 'Password updated successfully. Please log in.' };
  }

  async resetDemoData() {
    await storage.set(STORAGE_KEYS.USERS, INITIAL_USERS);
    await storage.set(STORAGE_KEYS.JOBS, INITIAL_JOBS);
    await storage.set(STORAGE_KEYS.COMPANIES, INITIAL_COMPANIES);
    await storage.set(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    await storage.set(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    await storage.set(STORAGE_KEYS.CHATS, INITIAL_CHATS);
    await storage.set(STORAGE_KEYS.INTERVIEWS, INITIAL_INTERVIEWS);
    await storage.set(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    await storage.set(STORAGE_KEYS.IS_INITIALIZED, true);
    return true;
  }
}

export const authService = new AuthService();
export default authService;

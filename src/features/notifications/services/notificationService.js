import { storage, delay } from '../../../core/utils/storage';
import { INITIAL_NOTIFICATIONS } from '../../../core/utils/mockData';

const NOTIFICATIONS_KEY = 'notifications';

class NotificationService {
  async getUserNotifications(userId) {
    await delay(150);
    const notifications = await storage.get(NOTIFICATIONS_KEY, INITIAL_NOTIFICATIONS);
    return notifications.filter((n) => !n.userId || n.userId === userId);
  }

  async markAsRead(notificationId) {
    await delay(100);
    const notifications = await storage.get(NOTIFICATIONS_KEY, INITIAL_NOTIFICATIONS);
    const index = notifications.findIndex((n) => n.id === notificationId);
    if (index !== -1) {
      notifications[index].read = true;
      await storage.set(NOTIFICATIONS_KEY, notifications);
    }
    return true;
  }

  async markAllAsRead(userId) {
    await delay(150);
    const notifications = await storage.get(NOTIFICATIONS_KEY, INITIAL_NOTIFICATIONS);
    notifications.forEach((n) => {
      if (!n.userId || n.userId === userId) {
        n.read = true;
      }
    });
    await storage.set(NOTIFICATIONS_KEY, notifications);
    return true;
  }

  async createNotification(notifData) {
    const notifications = await storage.get(NOTIFICATIONS_KEY, INITIAL_NOTIFICATIONS);
    const newNotif = {
      id: `notif_${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
      ...notifData,
    };
    notifications.unshift(newNotif);
    await storage.set(NOTIFICATIONS_KEY, notifications);

    // Trigger browser Web Notifications API if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(notifData.title || 'JobConnect Alert', {
          body: notifData.message,
          icon: '/favicon.svg',
        });
      } catch (e) {
        // Fallback gracefully
      }
    }

    return newNotif;
  }
}

export const notificationService = new NotificationService();
export default notificationService;

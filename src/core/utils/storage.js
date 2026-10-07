import localforage from 'localforage';

// Configure localforage instance for JobConnect
localforage.config({
  name: 'JobConnectDB',
  storeName: 'jobconnect_store',
  description: 'Client-side storage for JobConnect mock database',
});

// Helper to simulate realistic async network latency (e.g. 200-450ms)
export const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const storage = {
  async get(key, defaultValue = null) {
    try {
      const value = await localforage.getItem(key);
      if (value !== null && value !== undefined) {
        return value;
      }
      // Fallback to localStorage
      const localValue = localStorage.getItem(`jobconnect_${key}`);
      if (localValue !== null) {
        const parsed = JSON.parse(localValue);
        await localforage.setItem(key, parsed);
        return parsed;
      }
      return defaultValue;
    } catch (error) {
      console.warn(`Storage get error for key "${key}":`, error);
      const localValue = localStorage.getItem(`jobconnect_${key}`);
      return localValue ? JSON.parse(localValue) : defaultValue;
    }
  },

  async set(key, value) {
    try {
      await localforage.setItem(key, value);
      try {
        localStorage.setItem(`jobconnect_${key}`, JSON.stringify(value));
      } catch (e) {
        // LocalStorage might exceed quota for large data, localforage (IndexedDB) will keep it
      }
      return value;
    } catch (error) {
      console.error(`Storage set error for key "${key}":`, error);
      localStorage.setItem(`jobconnect_${key}`, JSON.stringify(value));
      return value;
    }
  },

  async remove(key) {
    try {
      await localforage.removeItem(key);
      localStorage.removeItem(`jobconnect_${key}`);
    } catch (error) {
      console.error(`Storage remove error for key "${key}":`, error);
      localStorage.removeItem(`jobconnect_${key}`);
    }
  },

  async clear() {
    try {
      await localforage.clear();
      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith('jobconnect_')) {
          localStorage.removeItem(k);
        }
      });
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  },
};

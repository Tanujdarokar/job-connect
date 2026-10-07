import { storage, delay } from '../../../core/utils/storage';
import { INITIAL_JOBS } from '../../../core/utils/mockData';

const STORAGE_KEY = 'jobs';

class JobService {
  async getJobs(filters = {}) {
    await delay(250);
    let jobs = await storage.get(STORAGE_KEY, INITIAL_JOBS);

    // Filter by keyword (title, company, description, or skills)
    if (filters.q) {
      const q = filters.q.toLowerCase().trim();
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.companyName.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q) ||
          job.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Filter by location
    if (filters.location && filters.location !== 'all') {
      const loc = filters.location.toLowerCase();
      jobs = jobs.filter((job) => job.location.toLowerCase().includes(loc));
    }

    // Filter by workplace type (remote, on-site, hybrid)
    if (filters.workplaceType && filters.workplaceType !== 'all') {
      jobs = jobs.filter((job) => job.workplaceType === filters.workplaceType);
    }

    // Filter by job type (full-time, part-time, contract, internship, freelance)
    if (filters.jobType && filters.jobType !== 'all') {
      jobs = jobs.filter((job) => job.jobType === filters.jobType);
    }

    // Filter by experience level
    if (filters.experienceLevel && filters.experienceLevel !== 'all') {
      jobs = jobs.filter((job) => job.experienceLevel === filters.experienceLevel);
    }

    // Filter by minimum salary
    if (filters.minSalary) {
      jobs = jobs.filter((job) => job.salaryMax >= Number(filters.minSalary));
    }

    // Filter by companyId
    if (filters.companyId) {
      jobs = jobs.filter((job) => job.companyId === filters.companyId);
    }

    // Filter by status (default active)
    if (filters.status) {
      jobs = jobs.filter((job) => job.status === filters.status);
    }

    // Sorting
    const sort = filters.sort || 'latest';
    if (sort === 'latest') {
      jobs.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    } else if (sort === 'salary-high') {
      jobs.sort((a, b) => b.salaryMax - a.salaryMax);
    } else if (sort === 'salary-low') {
      jobs.sort((a, b) => a.salaryMin - b.salaryMin);
    } else if (sort === 'popular') {
      jobs.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
    }

    return jobs;
  }

  async getJobById(id) {
    await delay(200);
    const jobs = await storage.get(STORAGE_KEY, INITIAL_JOBS);
    const job = jobs.find((j) => j.id === id);
    if (!job) throw new Error('Job not found');

    // Increment views count
    job.viewsCount = (job.viewsCount || 0) + 1;
    await storage.set(STORAGE_KEY, jobs);
    return job;
  }

  async getSimilarJobs(jobId, limit = 3) {
    await delay(150);
    const jobs = await storage.get(STORAGE_KEY, INITIAL_JOBS);
    const currentJob = jobs.find((j) => j.id === jobId);
    if (!currentJob) return [];

    return jobs
      .filter((j) => j.id !== jobId && (j.companyId === currentJob.companyId || j.jobType === currentJob.jobType || j.skills.some((s) => currentJob.skills.includes(s))))
      .slice(0, limit);
  }

  async getRecommendedJobs(userSkills = [], limit = 6) {
    await delay(200);
    const jobs = await storage.get(STORAGE_KEY, INITIAL_JOBS);
    if (!userSkills.length) return jobs.slice(0, limit).map((j) => ({ ...j, matchScore: 85 }));

    const scoredJobs = jobs.map((job) => {
      const matchCount = job.skills.filter((skill) =>
        userSkills.some((us) => us.toLowerCase() === skill.toLowerCase())
      ).length;
      const matchScore = Math.min(
        98,
        Math.max(60, Math.round((matchCount / Math.max(job.skills.length, 1)) * 100) + 20)
      );
      return { ...job, matchScore };
    });

    scoredJobs.sort((a, b) => b.matchScore - a.matchScore);
    return scoredJobs.slice(0, limit);
  }

  async createJob(jobData) {
    await delay(350);
    const jobs = await storage.get(STORAGE_KEY, INITIAL_JOBS);
    const newJob = {
      id: `job_${Date.now()}`,
      ...jobData,
      postedAt: new Date().toISOString(),
      status: 'active',
      applicantCount: 0,
      viewsCount: 1,
    };
    jobs.unshift(newJob);
    await storage.set(STORAGE_KEY, jobs);
    return newJob;
  }

  async updateJob(id, updates) {
    await delay(300);
    const jobs = await storage.get(STORAGE_KEY, INITIAL_JOBS);
    const index = jobs.findIndex((j) => j.id === id);
    if (index === -1) throw new Error('Job not found');

    jobs[index] = { ...jobs[index], ...updates, updatedAt: new Date().toISOString() };
    await storage.set(STORAGE_KEY, jobs);
    return jobs[index];
  }

  async deleteJob(id) {
    await delay(250);
    let jobs = await storage.get(STORAGE_KEY, INITIAL_JOBS);
    jobs = jobs.filter((j) => j.id !== id);
    await storage.set(STORAGE_KEY, jobs);
    return true;
  }
}

export const jobService = new JobService();
export default jobService;

import { storage, delay } from '../../../core/utils/storage';
import { INITIAL_APPLICATIONS } from '../../../core/utils/mockData';
import { APPLICATION_STATUS } from '../../../core/constants';
import jobService from '../../jobs/services/jobService';

const STORAGE_KEY = 'applications';

class ApplicationService {
  async getSeekerApplications(seekerId) {
    await delay(200);
    const applications = await storage.get(STORAGE_KEY, INITIAL_APPLICATIONS);
    return applications.filter((app) => app.seekerId === seekerId);
  }

  async getJobApplications(jobId) {
    await delay(200);
    const applications = await storage.get(STORAGE_KEY, INITIAL_APPLICATIONS);
    if (jobId) {
      return applications.filter((app) => app.jobId === jobId);
    }
    return applications;
  }

  async getEmployerApplications(employerCompanyId) {
    await delay(250);
    const applications = await storage.get(STORAGE_KEY, INITIAL_APPLICATIONS);
    if (employerCompanyId) {
      return applications.filter((app) => app.companyId === employerCompanyId);
    }
    return applications;
  }

  async hasUserApplied(jobId, seekerId) {
    const applications = await storage.get(STORAGE_KEY, INITIAL_APPLICATIONS);
    return applications.some((app) => app.jobId === jobId && app.seekerId === seekerId);
  }

  async apply(applicationData) {
    await delay(400);
    const applications = await storage.get(STORAGE_KEY, INITIAL_APPLICATIONS);

    // Duplicate check
    const alreadyApplied = applications.some(
      (app) => app.jobId === applicationData.jobId && app.seekerId === applicationData.seekerId
    );
    if (alreadyApplied) {
      throw new Error('You have already applied for this position.');
    }

    // Get job info for snapshot
    const job = await jobService.getJobById(applicationData.jobId);

    const newApplication = {
      id: `app_${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      companyId: job.companyId,
      companyName: job.companyName,
      companyLogo: job.companyLogo,
      location: job.location,
      seekerId: applicationData.seekerId,
      seekerName: applicationData.seekerName,
      seekerEmail: applicationData.seekerEmail,
      seekerHeadline: applicationData.seekerHeadline || 'Software Engineer',
      seekerAvatar: applicationData.seekerAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(applicationData.seekerName)}`,
      resumeUrl: applicationData.resumeUrl || 'Resume.pdf',
      coverLetter: applicationData.coverLetter || '',
      status: APPLICATION_STATUS.APPLIED,
      appliedAt: new Date().toISOString(),
      timeline: [
        {
          status: APPLICATION_STATUS.APPLIED,
          date: new Date().toISOString(),
          note: 'Application submitted successfully',
        },
      ],
    };

    applications.unshift(newApplication);
    await storage.set(STORAGE_KEY, applications);

    // Increment applicant count on job
    try {
      await jobService.updateJob(job.id, {
        applicantCount: (job.applicantCount || 0) + 1,
      });
    } catch (e) {
      console.warn('Failed to update job applicant count', e);
    }

    return newApplication;
  }

  async updateStatus(applicationId, newStatus, note = '') {
    await delay(300);
    const applications = await storage.get(STORAGE_KEY, INITIAL_APPLICATIONS);
    const index = applications.findIndex((app) => app.id === applicationId);
    if (index === -1) throw new Error('Application not found');

    const app = applications[index];
    app.status = newStatus;
    app.timeline = app.timeline || [];
    app.timeline.push({
      status: newStatus,
      date: new Date().toISOString(),
      note: note || `Status changed to ${newStatus}`,
    });

    await storage.set(STORAGE_KEY, applications);
    return app;
  }

  async withdraw(applicationId) {
    await delay(250);
    let applications = await storage.get(STORAGE_KEY, INITIAL_APPLICATIONS);
    applications = applications.filter((app) => app.id !== applicationId);
    await storage.set(STORAGE_KEY, applications);
    return true;
  }
}

export const applicationService = new ApplicationService();
export default applicationService;

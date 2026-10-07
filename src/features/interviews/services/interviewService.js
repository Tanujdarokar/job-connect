import { storage, delay } from '../../../core/utils/storage';
import { INITIAL_INTERVIEWS } from '../../../core/utils/mockData';

const INTERVIEWS_KEY = 'interviews';

class InterviewService {
  async getUserInterviews(userId) {
    await delay(200);
    const interviews = await storage.get(INTERVIEWS_KEY, INITIAL_INTERVIEWS);
    return interviews.filter((i) => i.seekerId === userId || i.employerId === userId);
  }

  async scheduleInterview(interviewData) {
    await delay(350);
    const interviews = await storage.get(INTERVIEWS_KEY, INITIAL_INTERVIEWS);
    const newInterview = {
      id: `int_${Date.now()}`,
      status: 'proposed', // 'proposed', 'confirmed', 'declined', 'rescheduled', 'completed'
      meetingLink: `https://meet.jobconnect.demo/${encodeURIComponent(interviewData.jobTitle.slice(0, 10))}-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...interviewData,
    };
    interviews.unshift(newInterview);
    await storage.set(INTERVIEWS_KEY, interviews);
    return newInterview;
  }

  async updateInterviewStatus(interviewId, status, note = '') {
    await delay(250);
    const interviews = await storage.get(INTERVIEWS_KEY, INITIAL_INTERVIEWS);
    const index = interviews.findIndex((i) => i.id === interviewId);
    if (index === -1) throw new Error('Interview not found');

    interviews[index].status = status;
    if (note) interviews[index].responseNote = note;
    await storage.set(INTERVIEWS_KEY, interviews);
    return interviews[index];
  }
}

export const interviewService = new InterviewService();
export default interviewService;

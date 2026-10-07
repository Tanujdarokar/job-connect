import { delay } from '../../../core/utils/storage';

class AiService {
  async analyzeResume({ resumeText, jobDescription, targetRole = 'Software Engineer' }) {
    await delay(1200); // Simulate realistic AI inference calculation

    const keywords = [
      'React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS', 'Redux', 'REST APIs',
      'Docker', 'AWS', 'GraphQL', 'CI/CD', 'PostgreSQL', 'Testing', 'System Design'
    ];

    const matchedKeywords = keywords.filter((kw) =>
      resumeText.toLowerCase().includes(kw.toLowerCase())
    );

    const missingKeywords = keywords
      .filter((kw) => !matchedKeywords.includes(kw))
      .slice(0, 4);

    const score = Math.min(96, Math.max(62, matchedKeywords.length * 9 + 40));

    return {
      overallScore: score,
      summary: `Your resume shows strong foundational alignment for "${targetRole}", particularly with modern web architecture and state management.`,
      matchedKeywords,
      missingKeywords,
      strengths: [
        'Clear demonstration of technical project ownership and deliverables',
        'Strong mention of high-demand modern frontend technologies',
        'Quantifiable impact metrics in past work experiences',
      ],
      improvements: [
        `Add concrete production examples of ${missingKeywords.slice(0, 2).join(' & ')} to increase ATS match rates`,
        'Include measurable performance benchmarks (e.g. % reduction in bundle size, API latency)',
        'Ensure contact information and LinkedIn URL are at the very top header',
      ],
      atsReadability: score > 80 ? 'Excellent (98% Pass Rate)' : 'Good (85% Pass Rate)',
    };
  }

  async generateCoverLetter({ candidateName, jobTitle, companyName, skills = [], experienceSummary = '' }) {
    await delay(900);

    const skillsString = skills.length > 0 ? skills.slice(0, 4).join(', ') : 'modern web development';

    return `Dear Hiring Team at ${companyName || 'the company'},

I am writing to enthusiastically express my interest in the ${jobTitle || 'Software Engineer'} role. With hands-on engineering experience in ${skillsString} and a track record of crafting performant, scalable user interfaces, I am confident in delivering high impact for your team from day one.

${experienceSummary || `Throughout my career, I have focused on writing clean, accessible code, collaborating across design and backend teams, and shipping production-grade applications that users love.`}

I am inspired by ${companyName || 'your company'}’s mission and technological vision, and I welcome the opportunity to discuss how my skill set and passion align with your team’s ambitious goals.

Thank you for your time and consideration.

Warm regards,
${candidateName || 'Candidate'}`;
  }
}

export const aiService = new AiService();
export default aiService;

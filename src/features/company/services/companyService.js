import { storage, delay } from '../../../core/utils/storage';
import { INITIAL_COMPANIES, INITIAL_REVIEWS } from '../../../core/utils/mockData';

const COMPANIES_KEY = 'companies';
const REVIEWS_KEY = 'reviews';

class CompanyService {
  async getCompanies(search = '') {
    await delay(200);
    let companies = await storage.get(COMPANIES_KEY, INITIAL_COMPANIES);
    if (search) {
      const q = search.toLowerCase();
      companies = companies.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
      );
    }
    return companies;
  }

  async getCompanyById(id) {
    await delay(150);
    const companies = await storage.get(COMPANIES_KEY, INITIAL_COMPANIES);
    const company = companies.find((c) => c.id === id);
    if (!company) throw new Error('Company not found');
    return company;
  }

  async getReviews(companyId) {
    await delay(150);
    const reviews = await storage.get(REVIEWS_KEY, INITIAL_REVIEWS);
    if (companyId) {
      return reviews.filter((r) => r.companyId === companyId);
    }
    return reviews;
  }

  async addReview(reviewData) {
    await delay(300);
    const reviews = await storage.get(REVIEWS_KEY, INITIAL_REVIEWS);
    const newReview = {
      id: `rev_${Date.now()}`,
      ...reviewData,
      createdAt: new Date().toISOString(),
    };
    reviews.unshift(newReview);
    await storage.set(REVIEWS_KEY, reviews);

    // Update company review count and average rating
    const companies = await storage.get(COMPANIES_KEY, INITIAL_COMPANIES);
    const companyIndex = companies.findIndex((c) => c.id === reviewData.companyId);
    if (companyIndex !== -1) {
      const companyReviews = reviews.filter((r) => r.companyId === reviewData.companyId);
      const totalRating = companyReviews.reduce((acc, r) => acc + Number(r.rating || 5), 0);
      companies[companyIndex].rating = +(totalRating / companyReviews.length).toFixed(1);
      companies[companyIndex].reviewCount = companyReviews.length;
      await storage.set(COMPANIES_KEY, companies);
    }

    return newReview;
  }

  async updateCompany(id, updates) {
    await delay(250);
    const companies = await storage.get(COMPANIES_KEY, INITIAL_COMPANIES);
    const index = companies.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Company not found');
    companies[index] = { ...companies[index], ...updates };
    await storage.set(COMPANIES_KEY, companies);
    return companies[index];
  }
}

export const companyService = new CompanyService();
export default companyService;

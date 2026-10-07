import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search,
  MapPin,
  Briefcase,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Building2,
  CheckCircle2,
  Star,
  Users,
  ShieldCheck,
  Zap,
  ChevronRight,
  FileCheck,
  Video,
  Bot,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import Button from '../../../core/components/Button';
import Card from '../../../core/components/Card';
import Badge from '../../../core/components/Badge';
import { INITIAL_JOBS, INITIAL_COMPANIES } from '../../../core/utils/mockData';

export const LandingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const featuredJobs = INITIAL_JOBS.slice(0, 6);
  const featuredCompanies = INITIAL_COMPANIES.slice(0, 6);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchKeyword.trim()) params.set('q', searchKeyword.trim());
    if (searchLocation.trim()) params.set('location', searchLocation.trim());
    navigate(`/jobs?${params.toString()}`);
  };

  const handleTagClick = (tag) => {
    navigate(`/jobs?q=${encodeURIComponent(tag)}`);
  };

  const faqs = [
    {
      q: 'How does JobConnect match candidates with employers?',
      a: 'JobConnect uses an AI-powered semantic matching engine that analyzes your skills, project experience, and salary preferences against verified job requisitions to compute a precision match percentage.',
    },
    {
      q: 'Is JobConnect completely free for job seekers?',
      a: 'Yes! Job seekers can search unlimited jobs, build profiles, upload resumes, run AI resume analysis, and message hiring teams 100% free of charge.',
    },
    {
      q: 'Can employers conduct video interviews directly in JobConnect?',
      a: 'Absolutely. Employers can schedule interviews with one click. Both candidates and recruiters can join integrated video call rooms directly inside the browser with live webcam and microphone previews.',
    },
    {
      q: 'How are salaries and verified company ratings calculated?',
      a: 'Salary insights are benchmarked across thousands of verified Indian tech offers, and company reviews are submitted by verified employees and filtered for authenticity.',
    },
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        {/* Background decorative glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-500/10 via-accent-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-brand-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-40 -right-20 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Floating Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-dark-900 border border-brand-200/80 dark:border-brand-800/80 shadow-sm text-xs font-semibold text-brand-700 dark:text-brand-300 animate-in fade-in slide-in-from-top-4 duration-500">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>{t('hero.badge')}</span>
          </div>

          {/* Main Hero Heading */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              {t('hero.title1')}{' '}
              <span className="gradient-text">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Interactive Search Bar Widget */}
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-brand-500/5 flex flex-col sm:flex-row items-center gap-2"
            >
              {/* Keyword Input */}
              <div className="flex items-center gap-3 px-3 py-2 w-full sm:flex-1 border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-800">
                <Search className="w-5 h-5 text-brand-500 shrink-0" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder={t('hero.searchPlaceholder')}
                  className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              {/* Location Input */}
              <div className="flex items-center gap-3 px-3 py-2 w-full sm:w-60">
                <MapPin className="w-5 h-5 text-indigo-500 shrink-0" />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder={t('hero.locationPlaceholder')}
                  className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-2xl"
                icon={Search}
              >
                {t('hero.searchBtn')}
              </Button>
            </form>

            {/* Popular Search Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
              <span className="text-slate-400 dark:text-slate-500 font-medium">
                {t('hero.popularSearches')}
              </span>
              {['React', 'Node.js', 'Remote', 'Product Designer', 'Python', 'Go', 'DevOps'].map(
                (tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className="px-2.5 py-1 rounded-lg bg-white/80 dark:bg-dark-900/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors shadow-2xs"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Live Platform Stats */}
          <div className="max-w-4xl mx-auto pt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-dark-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/60">
              <p className="text-2xl sm:text-3xl font-extrabold gradient-text">40,000+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('stats.activeJobs')}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-dark-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/60">
              <p className="text-2xl sm:text-3xl font-extrabold gradient-text">1,500+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('stats.companiesHiring')}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-dark-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/60">
              <p className="text-2xl sm:text-3xl font-extrabold gradient-text">250,000+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('stats.jobSeekers')}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-dark-900/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800/60">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">98.4%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{t('stats.successRate')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. User Roles Choice Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card: Job Seeker */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-500/10 via-white to-white dark:from-brand-950/40 dark:via-dark-900 dark:to-dark-900 border border-brand-200 dark:border-brand-900/60 shadow-lg relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center mb-6 shadow-md shadow-brand-500/30">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
              {t('roles.seekerTitle')}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {t('roles.seekerDesc')}
            </p>
            <ul className="space-y-2.5 mb-8 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>AI Resume Scorer & Instant Tailoring</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>Direct In-App Chat with Hiring Managers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>Visual Multi-Stage Application Tracker</span>
              </li>
            </ul>
            <Link to="/jobs">
              <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                Explore All Jobs
              </Button>
            </Link>
          </div>

          {/* Card: Recruiter / Employer */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-accent-500/10 via-white to-white dark:from-accent-950/40 dark:via-dark-900 dark:to-dark-900 border border-accent-200 dark:border-accent-900/60 shadow-lg relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-accent-600 text-white flex items-center justify-center mb-6 shadow-md shadow-accent-500/30">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
              {t('roles.employerTitle')}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {t('roles.employerDesc')}
            </p>
            <ul className="space-y-2.5 mb-8 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-600 dark:text-accent-400 shrink-0" />
                <span>Verified Candidate Pool with Skill Badges</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-600 dark:text-accent-400 shrink-0" />
                <span>Integrated Browser Video Interview Rooms</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-600 dark:text-accent-400 shrink-0" />
                <span>Full Funnel Conversion & Sourcing Analytics</span>
              </li>
            </ul>
            <Link to="/employer/jobs/new">
              <Button variant="accent" size="md" icon={ArrowRight} iconPosition="right">
                Post a Job Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Featured Jobs Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              High Growth Openings
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Featured Job Opportunities
            </h2>
          </div>
          <Link
            to="/jobs"
            className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>View all 40+ jobs</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredJobs.map((job) => (
            <Card
              key={job.id}
              hoverEffect
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="p-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-11 h-11 rounded-xl object-cover border border-slate-100 dark:border-slate-800"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                        {job.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {job.companyName}
                      </p>
                    </div>
                  </div>
                  <Badge variant={job.workplaceType === 'remote' ? 'success' : 'brand'} size="sm">
                    {job.workplaceType}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.location.split(',')[0]}
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    ₹{(job.salaryMin / 100000).toFixed(1)}L - {(job.salaryMax / 100000).toFixed(1)}L
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{job.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">24 applicants</span>
                <span className="font-semibold text-brand-600 dark:text-brand-400 flex items-center gap-1">
                  Apply Now <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. AI Career Tools Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-brand-950 to-dark-950 text-white p-8 sm:p-12 relative overflow-hidden border border-brand-900/50 shadow-2xl">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 text-accent-300 text-xs font-bold border border-accent-500/30">
              <Bot className="w-3.5 h-3.5" />
              <span>Next-Gen AI Career Suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Optimize your resume for ATS & generate customized cover letters in seconds.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Our mock AI engine scans your skills against actual job descriptions, provides an instant compatibility score, and highlights keyword gaps to guarantee more recruiter interview calls.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link to="/ai-tools">
                <Button variant="accent" size="md" icon={FileCheck}>
                  Try AI Resume Analyzer
                </Button>
              </Link>
              <Link to="/salaries">
                <Button variant="outline" size="md" className="border-white/30 text-white hover:bg-white/10" icon={TrendingUp}>
                  Explore Salary Insights
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Top Hiring Companies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Top Employers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Hire & Work at India’s Best Workplaces
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredCompanies.map((comp) => (
            <Card
              key={comp.id}
              hoverEffect
              onClick={() => navigate(`/companies/${comp.id}`)}
              className="p-4 flex flex-col items-center text-center space-y-2"
            >
              <img
                src={comp.logo}
                alt={comp.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-100 dark:border-slate-800"
              />
              <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                {comp.name}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{comp.rating}</span>
                <span className="text-slate-400">({comp.reviewCount})</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-slate-900 dark:text-white hover:text-brand-600 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl gradient-bg p-8 sm:p-14 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-brand-100 text-sm sm:text-base">
              Create your profile today, analyze your resume with AI, and start connecting with top hiring teams across India.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/signup">
              <Button variant="white" size="lg">
                Create Free Account
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="bg-brand-700/80 text-white hover:bg-brand-800">
                Explore Demo Portals
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

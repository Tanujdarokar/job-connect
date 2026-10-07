import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Building2, MapPin, Star, Users, ArrowRight, ExternalLink } from 'lucide-react';
import Card from '../../../core/components/Card';
import Badge from '../../../core/components/Badge';
import Button from '../../../core/components/Button';
import companyService from '../services/companyService';

export const CompaniesPage = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    companyService.getCompanies(search).then((data) => {
      setCompanies(data);
      setIsLoading(false);
    });
  }, [search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Search */}
      <div className="space-y-4 max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Company Directory
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Discover Top Tech Workplaces
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Learn about company culture, employee benefits, open vacancies, and verified ratings.
        </p>

        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company by name, industry, or location..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 shadow-sm"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Card
            key={company.id}
            hoverEffect
            onClick={() => navigate(`/companies/${company.id}`)}
            className="p-6 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-100 dark:border-slate-800 shadow-sm"
                />
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-amber-900/60">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{company.rating}</span>
                  <span className="text-slate-400">({company.reviewCount})</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {company.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {company.industry} • {company.location}
                </p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {company.tagline}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {company.benefits?.slice(0, 2).map((b, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-dark-800 text-slate-600 dark:text-slate-300"
                  >
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">{company.size}</span>
              <span className="font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                View Profile <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompaniesPage;

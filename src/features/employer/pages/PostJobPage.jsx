import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { Briefcase, Building, Plus, Trash2, ArrowRight } from 'lucide-react';
import Button from '../../../core/components/Button';
import Input from '../../../core/components/Input';
import { createNewJob } from '../../jobs/slice/jobsSlice';
import { JOB_TYPES, WORKPLACE_TYPES, EXPERIENCE_LEVELS } from '../../../core/constants';

const postJobSchema = yup.object().shape({
  title: yup.string().required('Job title is required'),
  location: yup.string().required('Location is required'),
  workplaceType: yup.string().required('Workplace environment is required'),
  jobType: yup.string().required('Job type is required'),
  experienceLevel: yup.string().required('Experience level is required'),
  salaryMin: yup.number().typeError('Must be a number').required('Min salary required'),
  salaryMax: yup.number().typeError('Must be a number').required('Max salary required'),
  description: yup.string().min(30, 'Description must be at least 30 characters').required('Description is required'),
});

export const PostJobPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js']);
  const [skillInput, setSkillInput] = useState('');
  const [responsibilities, setResponsibilities] = useState([
    'Architect and implement scalable frontend workflows',
    'Collaborate with cross-functional product and backend teams',
  ]);
  const [respInput, setRespInput] = useState('');
  const [requirements, setRequirements] = useState([
    '3+ years of experience with modern frontend tech stack',
  ]);
  const [reqInput, setReqInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postJobSchema),
    defaultValues: {
      title: '',
      location: 'Ahmedabad, Gujarat',
      workplaceType: 'hybrid',
      jobType: 'full-time',
      experienceLevel: 'mid',
      salaryMin: 1800000,
      salaryMax: 2800000,
      description: '',
    },
  });

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleAddResp = (e) => {
    e.preventDefault();
    if (respInput.trim()) {
      setResponsibilities([...responsibilities, respInput.trim()]);
      setRespInput('');
    }
  };

  const handleAddReq = (e) => {
    e.preventDefault();
    if (reqInput.trim()) {
      setRequirements([...requirements, reqInput.trim()]);
      setReqInput('');
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const newJob = await dispatch(
        createNewJob({
          ...data,
          companyId: user?.companyId || 'comp_1',
          companyName: user?.companyName || 'TechCorp Innovations',
          companyLogo: user?.avatar || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120',
          skills,
          responsibilities,
          requirements,
          benefits: ['Health Insurance', 'Flexible PTO', 'Annual Learning Allowance'],
        })
      ).unwrap();

      toast.success('🎉 Job opening posted live!');
      navigate(`/jobs/${newJob.id}`);
    } catch (err) {
      toast.error(err.message || 'Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Post a New Career Opportunity
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Reach thousands of pre-vetted engineers and product professionals.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Role Overview
          </h2>

          <Input
            label="Job Title"
            placeholder="e.g. Senior Frontend Engineer (React & Next.js)"
            error={errors.title?.message}
            {...register('title')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Location"
              placeholder="e.g. Ahmedabad, Gujarat or Remote"
              error={errors.location?.message}
              {...register('location')}
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Workplace Type
              </label>
              <select
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 p-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                {...register('workplaceType')}
              >
                {WORKPLACE_TYPES.map((w) => (
                  <option key={w.id} value={w.id}>{w.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Employment Type
              </label>
              <select
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 p-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                {...register('jobType')}
              >
                {JOB_TYPES.map((j) => (
                  <option key={j.id} value={j.id}>{j.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Experience Level
              </label>
              <select
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 p-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                {...register('experienceLevel')}
              >
                {EXPERIENCE_LEVELS.map((exp) => (
                  <option key={exp.id} value={exp.id}>{exp.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Salary Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Minimum Annual Salary (INR ₹)"
              type="number"
              placeholder="1200000"
              error={errors.salaryMin?.message}
              {...register('salaryMin')}
            />
            <Input
              label="Maximum Annual Salary (INR ₹)"
              type="number"
              placeholder="2400000"
              error={errors.salaryMax?.message}
              {...register('salaryMax')}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Role Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe the opportunity, key missions, and engineering scope..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 p-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-xs text-rose-500">{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* Skills Required */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Required Skills & Tools
          </h2>

          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="e.g. Next.js, Redux, PostgreSQL"
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
            <Button type="button" onClick={handleAddSkill} variant="secondary" icon={Plus}>
              Add Skill
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold flex items-center gap-1.5 border border-indigo-200 dark:border-indigo-900/50">
                <span>{s}</span>
                <button type="button" onClick={() => setSkills(skills.filter((sk) => sk !== s))}>×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Responsibilities & Requirements List */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Key Responsibilities
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={respInput}
              onChange={(e) => setRespInput(e.target.value)}
              placeholder="Add key deliverable..."
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 px-3.5 py-2 text-sm text-slate-900 dark:text-white"
            />
            <Button type="button" onClick={handleAddResp} variant="secondary" icon={Plus}>Add</Button>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            {responsibilities.map((r, idx) => (
              <li key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-dark-850">
                <span>• {r}</span>
                <button type="button" onClick={() => setResponsibilities(responsibilities.filter((_, i) => i !== idx))} className="text-rose-500">×</button>
              </li>
            ))}
          </ul>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full"
          icon={ArrowRight}
          iconPosition="right"
        >
          Publish Job Posting Live
        </Button>
      </form>
    </div>
  );
};

export default PostJobPage;

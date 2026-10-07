import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Plus,
  Trash2,
  FileText,
  Upload,
  CheckCircle,
  FolderGit2,
  Globe,
  Save,
} from 'lucide-react';
import Button from '../../../core/components/Button';
import Input from '../../../core/components/Input';
import Card from '../../../core/components/Card';
import Badge from '../../../core/components/Badge';
import profileService from '../services/profileService';
import { setUser } from '../../auth/slice/authSlice';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [skills, setSkills] = useState(user?.skills || ['React', 'JavaScript', 'Tailwind CSS']);
  const [skillInput, setSkillInput] = useState('');
  const [experiences, setExperiences] = useState(user?.experience || []);
  const [educations, setEducations] = useState(user?.education || []);
  const [projects, setProjects] = useState(user?.projects || []);
  const [resumeFile, setResumeFile] = useState(user?.resume || null);
  const [isSaving, setIsSaving] = useState(false);

  // New Experience Form Modal/inline state
  const [newExp, setNewExp] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: 'Present',
    description: '',
  });

  // Personal Info Form
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      headline: user?.headline || '',
      location: user?.location || '',
      bio: user?.bio || '',
    },
  });

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    if (skills.includes(skillInput.trim())) {
      toast.error('Skill already added');
      return;
    }
    setSkills([...skills, skillInput.trim()]);
    setSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleAddExperience = () => {
    if (!newExp.title || !newExp.company) {
      toast.error('Please enter Title and Company');
      return;
    }
    setExperiences([...experiences, { ...newExp, id: `exp_${Date.now()}` }]);
    setNewExp({ title: '', company: '', location: '', startDate: '', endDate: 'Present', description: '' });
    toast.success('Experience added');
  };

  const handleRemoveExperience = (id) => {
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a valid PDF document');
      return;
    }

    const mockResume = {
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(0)} KB`,
      uploadedAt: new Date().toISOString(),
      url: URL.createObjectURL(file),
    };
    setResumeFile(mockResume);
    toast.success('Resume PDF uploaded locally!');
  };

  const onSubmit = async (data) => {
    try {
      setIsSaving(true);
      const updated = await profileService.updateProfile(user.id, {
        ...data,
        skills,
        experience: experiences,
        education: educations,
        projects,
        resume: resumeFile,
      });

      dispatch(setUser(updated));
      toast.success('Profile and Resume updated successfully! ✨');
    } catch (err) {
      toast.error(err.message || 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
          alt={user?.name}
          className="w-24 h-24 rounded-3xl object-cover ring-4 ring-brand-500/20 shadow-md"
        />
        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {user?.name}
              </h1>
              <p className="text-sm text-brand-600 dark:text-brand-400 font-semibold">
                {user?.headline || 'Add your career headline'}
              </p>
            </div>
            <Badge variant="brand" size="md">
              {user?.profileCompletion || 85}% Complete
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-3 pt-1">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{user?.location || 'India'}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{user?.email}</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 1. Personal Information */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-4 h-4 text-brand-600" />
            Personal Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" {...register('name')} />
            <Input label="Email Address" type="email" disabled {...register('email')} />
            <Input label="Phone Number" placeholder="+91 98765 43210" {...register('phone')} />
            <Input label="Location (City, State)" placeholder="e.g. Ahmedabad, Gujarat" {...register('location')} />
          </div>

          <Input
            label="Professional Headline"
            placeholder="e.g. Senior Full Stack Engineer (React, Node.js)"
            {...register('headline')}
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              About Me / Bio
            </label>
            <textarea
              rows={3}
              placeholder="Tell employers about your technical passion, achievements, and career focus..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 p-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              {...register('bio')}
            />
          </div>
        </div>

        {/* 2. Skills Chips Builder */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Skills & Competencies
          </h2>

          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Type a skill (e.g. Next.js, Docker, Python) and press Add"
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
            <Button type="button" onClick={handleAddSkill} variant="secondary" icon={Plus}>
              Add Skill
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 text-xs font-semibold border border-brand-200 dark:border-brand-900/60"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-rose-500 text-slate-400"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* 3. Resume PDF Drag-and-Drop */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            Resume Upload
          </h2>

          {resumeFile ? (
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <FileText className="w-8 h-8 text-indigo-600 shrink-0" />
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {resumeFile.fileName}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {resumeFile.fileSize} • Uploaded {new Date(resumeFile.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-brand-600 hover:bg-slate-50">
                  Replace PDF
                  <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
                </label>
                <button
                  type="button"
                  onClick={() => setResumeFile(null)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <label className="border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-brand-500 dark:hover:border-brand-500 transition-colors">
              <Upload className="w-8 h-8 text-brand-500 mb-2" />
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Click to upload or drag & drop your Resume PDF
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Maximum file size: 5 MB (PDF format)
              </p>
              <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
            </label>
          )}
        </div>

        {/* 4. Experience Timeline Builder */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-brand-600" />
            Work Experience
          </h2>

          {/* Existing Experience Items */}
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-dark-850 flex items-start justify-between gap-4"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {exp.title}
                  </h4>
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                    {exp.company} • {exp.location}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveExperience(exp.id)}
                  className="text-slate-400 hover:text-rose-500 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Experience Mini Form */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-dark-850/50 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Add New Role
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Job Title (e.g. Lead Frontend Engineer)"
                value={newExp.title}
                onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={newExp.company}
                onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Start Date (e.g. 2022-01)"
                value={newExp.startDate}
                onChange={(e) => setNewExp({ ...newExp, startDate: e.target.value })}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="End Date (e.g. Present)"
                value={newExp.endDate}
                onChange={(e) => setNewExp({ ...newExp, endDate: e.target.value })}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
              />
            </div>
            <textarea
              rows={2}
              placeholder="Describe your responsibilities and achievements..."
              value={newExp.description}
              onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 p-2.5 text-xs text-slate-900 dark:text-white"
            />
            <Button type="button" onClick={handleAddExperience} variant="secondary" size="sm" icon={Plus}>
              Save Role Entry
            </Button>
          </div>
        </div>

        {/* Save Button Bar */}
        <div className="sticky bottom-6 z-20 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSaving}
            icon={Save}
            className="shadow-xl"
          >
            Save All Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;

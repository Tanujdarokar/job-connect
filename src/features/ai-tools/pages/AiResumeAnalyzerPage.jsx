import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  Sparkles,
  Bot,
  FileCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  FileText,
  TrendingUp,
} from 'lucide-react';
import Card from '../../../core/components/Card';
import Button from '../../../core/components/Button';
import Badge from '../../../core/components/Badge';
import aiService from '../services/aiService';

export const AiResumeAnalyzerPage = () => {
  const { user } = useSelector((state) => state.auth);

  const [targetRole, setTargetRole] = useState('Senior Frontend Engineer');
  const [resumeText, setResumeText] = useState(
    user?.skills?.join(', ') || 'React, TypeScript, Node.js, Redux, Tailwind CSS, Next.js, Docker, AWS'
  );
  const [jobDescription, setJobDescription] = useState(
    'Looking for a Senior Frontend React Developer experienced with TypeScript, state management, REST APIs, responsive UI design, and cloud performance optimization.'
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      toast.error('Please enter or paste your resume text / skills');
      return;
    }

    try {
      setIsAnalyzing(true);
      const result = await aiService.analyzeResume({
        resumeText,
        jobDescription,
        targetRole,
      });
      setAnalysisResult(result);
      toast.success('Resume analysis completed! 🎯');
    } catch (err) {
      toast.error('AI analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateLetter = async () => {
    try {
      setIsGeneratingLetter(true);
      const letter = await aiService.generateCoverLetter({
        candidateName: user?.name || 'Aarav Sharma',
        jobTitle: targetRole,
        companyName: 'TechCorp Innovations',
        skills: user?.skills || ['React', 'TypeScript', 'Node.js'],
      });
      setGeneratedLetter(letter);
      toast.success('Custom cover letter generated! ✍️');
    } catch (err) {
      toast.error('Failed to generate cover letter');
    } finally {
      setIsGeneratingLetter(false);
    }
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast.success('Cover letter copied to clipboard! 📋');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-accent-600 via-brand-600 to-indigo-600 text-white shadow-xl shadow-accent-500/10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
          <Bot className="w-4 h-4 text-amber-300" />
          <span>JobConnect AI Career Suite</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          AI Resume Scorer & Cover Letter Architect
        </h1>
        <p className="text-xs sm:text-sm text-brand-100 max-w-2xl leading-relaxed">
          Benchmark your resume against actual Indian tech job descriptions to reveal keyword gaps, ATS pass probability, and generate tailored cover letters.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleAnalyze} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Target Job Title
            </label>
            <input
              type="text"
              required
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-850 p-2.5 text-xs text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Your Resume Summary & Skills
            </label>
            <textarea
              rows={5}
              required
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume bullet points and skill list..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-850 p-3 text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Target Job Description
            </label>
            <textarea
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste target job description to match against..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-850 p-3 text-xs text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isAnalyzing}
            icon={Sparkles}
          >
            Run AI ATS Analysis
          </Button>
        </div>
      </form>

      {/* Analysis Results View */}
      {analysisResult && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Evaluation Report
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                ATS Match Results: {targetRole}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {analysisResult.summary}
              </p>
            </div>

            <div className="px-6 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center shrink-0">
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {analysisResult.overallScore}%
              </p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">
                {analysisResult.atsReadability}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Strong Key Alignments
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {analysisResult.strengths?.map((s, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                    ✓ {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Keyword Improvements */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Recommended ATS Adjustments
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {analysisResult.improvements?.map((imp, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
                    • {imp}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Cover Letter Generator Trigger */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Generate a tailored cover letter customized to these matching strengths.
            </p>
            <Button
              type="button"
              onClick={handleGenerateLetter}
              variant="accent"
              isLoading={isGeneratingLetter}
              icon={FileText}
            >
              Generate AI Cover Letter
            </Button>
          </div>
        </div>
      )}

      {/* Generated Cover Letter */}
      {generatedLetter && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-accent-500" />
              Generated Cover Letter
            </h3>
            <Button onClick={handleCopyLetter} variant="outline" size="sm" icon={Copy}>
              Copy to Clipboard
            </Button>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-850 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line border border-slate-100 dark:border-slate-800 font-sans">
            {generatedLetter}
          </div>
        </div>
      )}
    </div>
  );
};

export default AiResumeAnalyzerPage;

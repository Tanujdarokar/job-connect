import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import {
  User,
  Mail,
  Lock,
  Building,
  Briefcase,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import Button from '../../../core/components/Button';
import Input from '../../../core/components/Input';
import { signupUser, loginWithGoogle } from '../slice/authSlice';
import { USER_ROLES } from '../../../core/constants';

const signupSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  companyName: yup.string().when('role', {
    is: USER_ROLES.EMPLOYER,
    then: (schema) => schema.required('Company name is required for employers'),
    otherwise: (schema) => schema.notRequired(),
  }),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions to proceed'),
});

export const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [selectedRole, setSelectedRole] = useState(USER_ROLES.JOB_SEEKER);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      role: USER_ROLES.JOB_SEEKER,
      name: '',
      email: '',
      password: '',
      companyName: '',
      terms: true,
    },
  });

  const passwordValue = watch('password') || '';

  const calculatePasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strengthScore = calculatePasswordStrength(passwordValue);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setValue('role', role);
  };

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(
        signupUser({
          ...data,
          role: selectedRole,
        })
      ).unwrap();

      toast.success(`Welcome to JobConnect, ${result.name}! 🎉`);
      if (selectedRole === USER_ROLES.EMPLOYER) {
        navigate('/employer/dashboard', { replace: true });
      } else {
        navigate('/seeker/dashboard', { replace: true });
      }
    } catch (err) {
      toast.error(err || 'Failed to create account');
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await dispatch(loginWithGoogle()).unwrap();
      toast.success(`Account created with Google: ${result.name}! 🎉`);
      navigate('/seeker/dashboard', { replace: true });
    } catch (err) {
      toast.error('Google sign-up failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Create an Account
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Join thousands of professionals finding and hiring tech talent.
        </p>
      </div>

      {/* Role Selector Cards */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleRoleChange(USER_ROLES.JOB_SEEKER)}
          className={`p-3.5 rounded-2xl border text-left transition-all relative ${
            selectedRole === USER_ROLES.JOB_SEEKER
              ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 hover:border-slate-300'
          }`}
        >
          {selectedRole === USER_ROLES.JOB_SEEKER && (
            <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-brand-600 text-white flex items-center justify-center">
              <Check className="w-3 h-3" />
            </div>
          )}
          <Briefcase
            className={`w-5 h-5 mb-2 ${
              selectedRole === USER_ROLES.JOB_SEEKER
                ? 'text-brand-600 dark:text-brand-400'
                : 'text-slate-400'
            }`}
          />
          <p className="text-xs font-bold text-slate-900 dark:text-white">Job Seeker</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Find high-paying roles & apply
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleRoleChange(USER_ROLES.EMPLOYER)}
          className={`p-3.5 rounded-2xl border text-left transition-all relative ${
            selectedRole === USER_ROLES.EMPLOYER
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 hover:border-slate-300'
          }`}
        >
          {selectedRole === USER_ROLES.EMPLOYER && (
            <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              <Check className="w-3 h-3" />
            </div>
          )}
          <Building
            className={`w-5 h-5 mb-2 ${
              selectedRole === USER_ROLES.EMPLOYER
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-slate-400'
            }`}
          />
          <p className="text-xs font-bold text-slate-900 dark:text-white">Employer / HR</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Post jobs & interview talent
          </p>
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 font-medium">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="e.g. Aarav Sharma"
          icon={User}
          error={errors.name?.message}
          {...register('name')}
        />

        {selectedRole === USER_ROLES.EMPLOYER && (
          <Input
            label="Company Name"
            type="text"
            placeholder="e.g. InnovateX Labs"
            icon={Building}
            error={errors.companyName?.message}
            {...register('companyName')}
          />
        )}

        <Input
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          icon={Mail}
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="space-y-1.5">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Min. 6 characters"
            icon={Lock}
            error={errors.password?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            {...register('password')}
          />

          {/* Password strength meter */}
          {passwordValue.length > 0 && (
            <div className="space-y-1 pt-1">
              <div className="flex gap-1 h-1.5 w-full bg-slate-100 dark:bg-dark-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    strengthScore <= 2
                      ? 'w-1/3 bg-rose-500'
                      : strengthScore <= 3
                      ? 'w-2/3 bg-amber-500'
                      : 'w-full bg-emerald-500'
                  }`}
                />
              </div>
              <p className="text-[11px] text-slate-400 text-right">
                Strength:{' '}
                <span
                  className={`font-semibold ${
                    strengthScore <= 2
                      ? 'text-rose-500'
                      : strengthScore <= 3
                      ? 'text-amber-500'
                      : 'text-emerald-500'
                  }`}
                >
                  {strengthScore <= 2 ? 'Weak' : strengthScore <= 3 ? 'Medium' : 'Strong ✨'}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Terms checkbox */}
        <div className="space-y-1 pt-1">
          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-brand-600 focus:ring-brand-500"
              {...register('terms')}
            />
            <span className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              I agree to JobConnect’s Terms of Use, Privacy Policy, and candidate code of conduct.
            </span>
          </label>
          {errors.terms && (
            <p className="text-xs text-rose-500 font-medium">{errors.terms.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isLoading}
          icon={ArrowRight}
          iconPosition="right"
        >
          Create Free Account
        </Button>
      </form>

      {/* Google Mock */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <span className="relative px-3 bg-slate-50 dark:bg-dark-950 text-xs text-slate-400">
          Or sign up with
        </span>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignup}
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-dark-800 transition-colors shadow-sm active:scale-[0.98]"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.8 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
          />
          <path
            fill="#FBBC05"
            d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4L1.6 7c-.8 1.6-1.3 3.4-1.3 5.3s.5 3.7 1.3 5.3l3.7-2.9z"
          />
          <path
            fill="#34A853"
            d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.3-6.7-5.3L1.6 16c1.9 3.8 5.8 6.4 10.4 6.4z"
          />
        </svg>
        <span>Sign up with Google</span>
      </button>

      {/* Switch to Login */}
      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;

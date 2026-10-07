import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import {
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Shield,
  Briefcase,
  Building,
  Sparkles,
  Eye,
  EyeOff,
} from 'lucide-react';
import Button from '../../../core/components/Button';
import Input from '../../../core/components/Input';
import {
  loginUser,
  loginWithOtp,
  loginWithGoogle,
  clearAuthError,
} from '../slice/authSlice';
import { DEMO_CREDENTIALS, USER_ROLES } from '../../../core/constants';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const otpSchema = yup.object().shape({
  phone: yup
    .string()
    .required('Phone number is required')
    .min(10, 'Enter a valid 10-digit phone number'),
  otp: yup
    .string()
    .required('6-digit OTP code is required')
    .length(6, 'OTP must be exactly 6 digits'),
});

export const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const [authMode, setAuthMode] = useState('password'); // 'password' | 'otp'
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Form for Email & Password
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    setValue: setEmailValue,
    formState: { errors: emailErrors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Form for Phone & OTP
  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    setValue: setOtpValue,
    formState: { errors: otpErrors },
  } = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      phone: '+91 98765 43210',
      otp: '123456',
    },
  });

  const from = location.state?.from?.pathname || null;

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch, authMode]);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (from) {
        navigate(from, { replace: true });
      } else if (user.role === USER_ROLES.EMPLOYER) {
        navigate('/employer/dashboard', { replace: true });
      } else if (user.role === USER_ROLES.ADMIN) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/seeker/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, from]);

  const onEmailSubmit = async (data) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      toast.success(`Welcome back, ${result.name}! 👋`);
    } catch (err) {
      toast.error(err || 'Failed to sign in');
    }
  };

  const onOtpSubmit = async (data) => {
    try {
      const result = await dispatch(loginWithOtp(data)).unwrap();
      toast.success(`Logged in successfully as ${result.name}! 🚀`);
    } catch (err) {
      toast.error(err || 'Invalid OTP code');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await dispatch(loginWithGoogle()).unwrap();
      toast.success(`Signed in with Google as ${result.name}! 🎉`);
    } catch (err) {
      toast.error('Google sign-in failed');
    }
  };

  const handleFillDemo = (roleKey) => {
    const cred = DEMO_CREDENTIALS[roleKey];
    if (cred) {
      setEmailValue('email', cred.email);
      setEmailValue('password', cred.password);
      setAuthMode('password');
      toast.success(`Filled demo credentials for ${cred.name} (${cred.role})`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t('auth.welcomeBack')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('auth.loginSubtitle')}
        </p>
      </div>

      {/* Quick Demo Fill Account Banners */}
      <div className="p-4 rounded-2xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-brand-900 dark:text-brand-300">
          <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
          <span>{t('auth.demoFillHeader')}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleFillDemo('SEEKER')}
            className="px-2 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-dark-900 border border-brand-200 dark:border-brand-800 text-slate-800 dark:text-slate-200 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-all flex flex-col items-center gap-1 shadow-sm active:scale-95"
          >
            <Briefcase className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Seeker</span>
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo('EMPLOYER')}
            className="px-2 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-dark-900 border border-brand-200 dark:border-brand-800 text-slate-800 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex flex-col items-center gap-1 shadow-sm active:scale-95"
          >
            <Building className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Employer</span>
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo('ADMIN')}
            className="px-2 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-dark-900 border border-brand-200 dark:border-brand-800 text-slate-800 dark:text-slate-200 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all flex flex-col items-center gap-1 shadow-sm active:scale-95"
          >
            <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Tabs: Email/Password vs OTP */}
      <div className="flex rounded-xl bg-slate-100 dark:bg-dark-850 p-1">
        <button
          type="button"
          onClick={() => setAuthMode('password')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            authMode === 'password'
              ? 'bg-white dark:bg-dark-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          Email & Password
        </button>
        <button
          type="button"
          onClick={() => setAuthMode('otp')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
            authMode === 'otp'
              ? 'bg-white dark:bg-dark-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          Mobile OTP
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 font-medium">
          {error}
        </div>
      )}

      {/* Mode 1: Password Form */}
      {authMode === 'password' && (
        <form onSubmit={handleEmailSubmit(onEmailSubmit)} className="space-y-4">
          <Input
            label={t('auth.emailLabel')}
            type="email"
            placeholder="you@example.com"
            icon={Mail}
            error={emailErrors.email?.message}
            {...registerEmail('email')}
          />

          <div className="space-y-1">
            <Input
              label={t('auth.passwordLabel')}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              icon={Lock}
              error={emailErrors.password?.message}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              {...registerEmail('password')}
            />
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 dark:border-slate-700 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {t('auth.rememberMe')}
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
            icon={ArrowRight}
            iconPosition="right"
          >
            {t('auth.signInBtn')}
          </Button>
        </form>
      )}

      {/* Mode 2: Phone OTP Form */}
      {authMode === 'otp' && (
        <form onSubmit={handleOtpSubmit(onOtpSubmit)} className="space-y-4">
          <Input
            label="Mobile Phone Number"
            type="tel"
            placeholder="+91 98765 43210"
            icon={Phone}
            error={otpErrors.phone?.message}
            {...registerOtp('phone')}
          />

          <div className="space-y-1">
            <Input
              label="6-Digit OTP Code"
              type="text"
              maxLength={6}
              placeholder="123456"
              icon={Shield}
              error={otpErrors.otp?.message}
              helperText="Tip: Any 6-digit number works in demo mode (e.g. 123456)"
              {...registerOtp('otp')}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
            icon={ArrowRight}
            iconPosition="right"
          >
            Verify & Sign In
          </Button>
        </form>
      )}

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <span className="relative px-3 bg-slate-50 dark:bg-dark-950 text-xs text-slate-400">
          {t('auth.orContinueWith')}
        </span>
      </div>

      {/* Google Mock Sign In */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
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
        <span>{t('auth.googleSignIn')}</span>
      </button>

      {/* Switch to Signup */}
      <p className="text-center text-xs text-slate-500 dark:text-slate-400">
        {t('auth.noAccount')}{' '}
        <Link
          to="/signup"
          className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
        >
          {t('auth.createAccount')}
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;

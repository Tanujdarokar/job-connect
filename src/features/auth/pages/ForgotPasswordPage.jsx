import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { Mail, Lock, Shield, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Button from '../../../core/components/Button';
import Input from '../../../core/components/Input';
import authService from '../services/authService';

const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

const resetSchema = yup.object().shape({
  otp: yup
    .string()
    .length(6, 'OTP must be 6 digits')
    .required('OTP is required'),
  newPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('New Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP + New Password, 3: Success
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    setValue: setResetValue,
    formState: { errors: resetErrors },
  } = useForm({
    resolver: yupResolver(resetSchema),
    defaultValues: {
      otp: '123456',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onEmailSubmit = async (data) => {
    try {
      setIsLoading(true);
      await authService.forgotPassword(data.email);
      setSubmittedEmail(data.email);
      setStep(2);
      toast.success('Reset code sent! Use "123456" for demo testing.');
    } catch (err) {
      toast.error(err.message || 'Email not found');
    } finally {
      setIsLoading(false);
    }
  };

  const onResetSubmit = async (data) => {
    try {
      setIsLoading(true);
      await authService.resetPassword({
        email: submittedEmail,
        otp: data.otp,
        newPassword: data.newPassword,
      });
      setStep(3);
      toast.success('Password updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to="/login"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Login</span>
      </Link>

      {/* Step 1: Request OTP */}
      {step === 1 && (
        <>
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Reset Your Password
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Enter your registered email address and we'll send you a 6-digit recovery code.
            </p>
          </div>

          <form onSubmit={handleEmailSubmit(onEmailSubmit)} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              error={emailErrors.email?.message}
              {...registerEmail('email')}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Send Reset Code
            </Button>
          </form>
        </>
      )}

      {/* Step 2: Enter OTP & New Password */}
      {step === 2 && (
        <>
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Set New Password
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Code sent to <span className="font-semibold text-brand-600">{submittedEmail}</span>.
            </p>
          </div>

          <form onSubmit={handleResetSubmit(onResetSubmit)} className="space-y-4">
            <Input
              label="6-Digit Verification Code"
              type="text"
              maxLength={6}
              placeholder="123456"
              icon={Shield}
              error={resetErrors.otp?.message}
              helperText="Demo code: 123456"
              {...registerReset('otp')}
            />

            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={resetErrors.newPassword?.message}
              {...registerReset('newPassword')}
            />

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={resetErrors.confirmPassword?.message}
              {...registerReset('confirmPassword')}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Save New Password
            </Button>
          </form>
        </>
      )}

      {/* Step 3: Success Screen */}
      {step === 3 && (
        <div className="text-center space-y-4 py-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Password Changed!
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
            Your password has been successfully reset. You can now sign in with your new credentials.
          </p>
          <Button
            onClick={() => navigate('/login')}
            variant="primary"
            className="w-full"
          >
            Sign In Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;

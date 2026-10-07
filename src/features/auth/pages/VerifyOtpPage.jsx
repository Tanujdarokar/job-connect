import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import Button from '../../../core/components/Button';
import { loginWithOtp } from '../slice/authSlice';
import { USER_ROLES } from '../../../core/constants';

export const VerifyOtpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, user } = useSelector((state) => state.auth);

  const phone = location.state?.phone || '+91 98765 43210';
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [countdown, setCountdown] = useState(45);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      toast.error('Please enter complete 6-digit OTP');
      return;
    }

    try {
      const result = await dispatch(loginWithOtp({ phone, otp: fullOtp })).unwrap();
      toast.success(`Verified successfully! Welcome, ${result.name}.`);
      if (result.role === USER_ROLES.EMPLOYER) {
        navigate('/employer/dashboard', { replace: true });
      } else {
        navigate('/seeker/dashboard', { replace: true });
      }
    } catch (err) {
      toast.error(err || 'OTP verification failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto mb-2">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Enter Verification Code
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          We sent a 6-digit code to <span className="font-semibold text-slate-700 dark:text-slate-200">{phone}</span>
        </p>
      </div>

      {/* 6-box OTP Input */}
      <div className="flex justify-center gap-2.5">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            id={`otp-input-${idx}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className="w-12 h-12 text-center text-lg font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-dark-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
          />
        ))}
      </div>

      <Button
        onClick={handleVerify}
        variant="primary"
        className="w-full"
        isLoading={isLoading}
        icon={ArrowRight}
        iconPosition="right"
      >
        Confirm & Continue
      </Button>

      {/* Resend timer */}
      <div className="text-center">
        {countdown > 0 ? (
          <p className="text-xs text-slate-400">
            Resend OTP code in <span className="font-bold text-brand-600">{countdown}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={() => {
              setCountdown(45);
              toast.success('New OTP sent: Use 123456');
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Resend Code
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyOtpPage;

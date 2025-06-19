
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Wheat, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { toast } from 'sonner';

type AuthMode = 'choose' | 'phone' | 'email' | 'otp';
type FormMode = 'signin' | 'signup';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('choose');
  const [formMode, setFormMode] = useState<FormMode>('signin');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const { signInWithEmail, signUpWithEmail, signInWithPhone, verifyOTP } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onEmailSubmit = async (data: any) => {
    try {
      let result;
      if (formMode === 'signin') {
        result = await signInWithEmail(data.email, data.password);
      } else {
        result = await signUpWithEmail(data.email, data.password, data.fullName);
      }

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (formMode === 'signup') {
          toast.success('Please check your email to confirm your account');
        } else {
          navigate('/');
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handlePhoneSubmit = async () => {
    if (!phoneNumber) {
      toast.error('Please enter a valid phone number');
      return;
    }

    const formattedPhone = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
    const result = await signInWithPhone(formattedPhone);

    if (result.error) {
      toast.error(result.error.message);
    } else {
      setAuthMode('otp');
      toast.success('OTP sent to your phone');
    }
  };

  const handleOTPVerify = async () => {
    if (otpValue.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    const formattedPhone = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
    const result = await verifyOTP(formattedPhone, otpValue);

    if (result.error) {
      toast.error(result.error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-village-green-50 to-earth-beige-50 font-noto">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-village-green-100 p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            {authMode !== 'choose' && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (authMode === 'otp') {
                    setAuthMode('phone');
                  } else {
                    setAuthMode('choose');
                  }
                  reset();
                }}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-village-green-600 rounded-full flex items-center justify-center">
                <Wheat className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-village-green-800">{t('appName')}</span>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-village-green-800 mb-2">
              {t('loginTitle')}
            </h1>
            <p className="text-village-green-600 text-sm">
              {t('loginSubtitle')}
            </p>
          </div>

          {/* Choose Auth Method */}
          {authMode === 'choose' && (
            <div className="space-y-4">
              <Button
                onClick={() => setAuthMode('phone')}
                className="w-full bg-village-green-600 hover:bg-village-green-700 py-6 text-lg"
              >
                <Phone className="w-5 h-5 mr-3" />
                {t('continueWithPhone')}
              </Button>
              
              <div className="flex items-center gap-4">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="text-gray-500 text-sm">{t('or')}</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              <Button
                onClick={() => setAuthMode('email')}
                variant="outline"
                className="w-full border-village-green-300 text-village-green-700 py-6 text-lg"
              >
                <Mail className="w-5 h-5 mr-3" />
                {t('continueWithEmail')}
              </Button>
            </div>
          )}

          {/* Phone Authentication */}
          {authMode === 'phone' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">{t('mobileNumber')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border-village-green-200 focus:border-village-green-500"
                />
              </div>
              <Button
                onClick={handlePhoneSubmit}
                className="w-full bg-village-green-600 hover:bg-village-green-700"
              >
                {t('sendOTP')}
              </Button>
            </div>
          )}

          {/* OTP Verification */}
          {authMode === 'otp' && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  {t('enterOTP')}
                </p>
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={setOtpValue}
                  className="justify-center"
                >
                  <InputOTPGroup>
                    {[...Array(6)].map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button
                onClick={handleOTPVerify}
                className="w-full bg-village-green-600 hover:bg-village-green-700"
                disabled={otpValue.length !== 6}
              >
                {t('verifyOTP')}
              </Button>
            </div>
          )}

          {/* Email Authentication */}
          {authMode === 'email' && (
            <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-6">
              {formMode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('fullName')}</Label>
                  <Input
                    id="fullName"
                    {...register('fullName', { required: 'Full name is required' })}
                    className="border-village-green-200 focus:border-village-green-500"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName.message as string}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="border-village-green-200 focus:border-village-green-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message as string}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password', { required: 'Password is required', minLength: 6 })}
                  className="border-village-green-200 focus:border-village-green-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message as string}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-village-green-600 hover:bg-village-green-700"
              >
                {formMode === 'signin' ? t('signIn') : t('signUp')}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setFormMode(formMode === 'signin' ? 'signup' : 'signin');
                    reset();
                  }}
                  className="text-village-green-600 hover:text-village-green-700 text-sm"
                >
                  {formMode === 'signin' ? t('newUser') : t('existingUser')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

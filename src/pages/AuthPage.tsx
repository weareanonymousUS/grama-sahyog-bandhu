import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Wheat, Phone, Mail, ArrowLeft, Building, Menu, Shield, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';

type AuthMode = 'choose' | 'phone' | 'email' | 'otp';
type FormMode = 'signin' | 'signup';
type UserType = 'citizen' | 'admin';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('choose');
  const [formMode, setFormMode] = useState<FormMode>('signin');
  const [userType, setUserType] = useState<UserType>('citizen');
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
        // Include user type in metadata for signup
        result = await signUpWithEmail(data.email, data.password, data.fullName, userType);
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

  const resetToChoose = () => {
    setAuthMode('choose');
    setFormMode('signin');
    setUserType('citizen');
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-noto">
      {/* Header */}
      <header className="bg-white shadow-sm border-b p-4" style={{ borderBottomColor: 'rgb(29 78 216)', borderBottomWidth: 1 }}>
        <div className="container mx-auto px-2 sm:px-4 py-0">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-0">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Building className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-blue-800">GRAMSEVA</h1>
                  <p className="text-xs sm:text-sm text-blue-600">Citizen Services Portal</p>
                </div>
              </div>
              {/* Desktop LanguageSwitcher */}
              <div className="hidden md:block ml-auto">
                <LanguageSwitcher />
              </div>
              {/* Mobile Hamburger Menu */}
              <div className="md:hidden flex items-center ml-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open menu">
                      <Menu className="w-6 h-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <div className="px-2 py-2">
                      <LanguageSwitcher />
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-2 sm:p-4 overflow-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl w-full">
          {/* Left Side - Website Description */}
          <div className="hidden lg:block">
            <Card className="p-6 bg-white shadow-xl">
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏛️</div>
                  <h2 className="text-3xl font-bold text-blue-800 mb-4">GRAMSEVA</h2>
                  <p className="text-xl text-blue-600 mb-6">Digital Governance Platform</p>
                </div>
                
                <div className="space-y-4 text-gray-700">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-lg mb-2">🌟 Our Mission</h3>
                    <p>Empowering citizens with seamless access to government services through digital innovation and transparent governance.</p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-lg mb-2">🚀 Key Features</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Submit requests across 8+ government sectors</li>
                      <li>Track application status in real-time</li>
                      <li>Upload supporting documents securely</li>
                      <li>Multi-language support (Telugu, Hindi, English)</li>
                      <li>Direct helpline access to government officials</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-lg mb-2">🏆 Sectors We Serve</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span>• Agriculture</span>
                      <span>• Education</span>
                      <span>• Healthcare</span>
                      <span>• Employment</span>
                      <span>• Housing</span>
                      <span>• Infrastructure</span>
                      <span>• Electricity</span>
                      <span>• Welfare</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    <strong>Government of Telangana</strong><br/>
                    Building a Digital and Progressive State
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Authentication Form */}
          <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md bg-white rounded-xl shadow-lg p-4 sm:p-8 mx-auto" style={{ border: '1px solid rgb(29 78 216)' }}>
            {/* Mobile Description */}
            <div className="lg:hidden text-center mb-6">
              <div className="text-4xl mb-2">🏛️</div>
              <h2 className="text-xl font-bold text-blue-800 mb-2">GRAMSEVA</h2>
              <p className="text-sm text-gray-600">Your gateway to digital government services</p>
            </div>

            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'rgb(31 41 55)' }}>
                {userType === 'admin' ? 'Admin Access' : 'Citizen Portal'}
              </h1>
              <p className="text-xs sm:text-sm" style={{ color: 'rgb(31 41 55)' }}>
                {userType === 'admin' ? 'Government Employee Login' : 'Access Government Services'}
              </p>
            </div>

            {/* User Type Selection */}
            {authMode === 'choose' && (
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => setUserType('citizen')}
                    variant={userType === 'citizen' ? 'default' : 'outline'}
                    className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                      userType === 'citizen' 
                        ? 'bg-blue-600 text-white' 
                        : 'border-blue-300 text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    <User className="w-6 h-6" />
                    <span className="text-sm">Citizen</span>
                  </Button>
                  
                  <Button
                    onClick={() => setUserType('admin')}
                    variant={userType === 'admin' ? 'default' : 'outline'}
                    className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                      userType === 'admin' 
                        ? 'bg-blue-600 text-white' 
                        : 'border-blue-300 text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    <Shield className="w-6 h-6" />
                    <span className="text-sm">Admin</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Choose Auth Method */}
            {authMode === 'choose' && (
              <div className="space-y-4">
                <Button
                  onClick={() => setAuthMode('phone')}
                  className="w-full py-4 sm:py-6 text-base sm:text-lg"
                  style={{ backgroundColor: 'rgb(29 78 216)', color: 'white' }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = 'rgb(30 64 175)')}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = 'rgb(29 78 216)')}
                >
                  <Phone className="w-5 h-5 mr-3" />
                  {t('continueWithPhone')}
                </Button>
                
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="text-gray-500 text-xs sm:text-sm">{t('or')}</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                <Button
                  onClick={() => setAuthMode('email')}
                  variant="outline"
                  className="w-full text-blue-700 border-blue-300 py-4 sm:py-6 text-base sm:text-lg"
                  style={{ borderColor: 'rgb(29 78 216)' }}
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Continue with Email
                </Button>
              </div>
            )}

            {/* Back Button */}
            {authMode !== 'choose' && (
              <Button
                onClick={resetToChoose}
                variant="ghost"
                className="mb-4 p-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
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
                    style={{ borderColor: 'rgb(29 78 216)' }}
                    className="focus:!border-[rgb(29,78,216)] text-base"
                  />
                </div>
                <Button
                  onClick={handlePhoneSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-base"
                >
                  {t('sendOTP')}
                </Button>
              </div>
            )}

            {/* OTP Verification */}
            {authMode === 'otp' && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">
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
                  className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-base"
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
                      style={{ borderColor: 'rgb(29 78 216)' }}
                      className="focus:!border-[rgb(29,78,216)] text-base"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs sm:text-sm">{errors.fullName.message as string}</p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    style={{ borderColor: 'rgb(29 78 216)' }}
                    className="focus:!border-[rgb(29,78,216)] text-base"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs sm:text-sm">{errors.email.message as string}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t('password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password', { required: 'Password is required', minLength: 6 })}
                    style={{ borderColor: 'rgb(29 78 216)' }}
                    className="focus:!border-[rgb(29,78,216)] text-base"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs sm:text-sm">{errors.password.message as string}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full py-3 text-base"
                  style={{ backgroundColor: 'rgb(29 78 216)', color: 'white' }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = 'rgb(30 64 175)')}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = 'rgb(29 78 216)')}
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
                    className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
                  >
                    {formMode === 'signin' ? t('newUser') : t('existingUser')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

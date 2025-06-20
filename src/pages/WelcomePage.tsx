
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useNavigate } from 'react-router-dom';
import { Phone, MapPin, Building } from 'lucide-react';

const WelcomePage = () => {
  const { user, signOut } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/sectors');
  };

  const handleTelanganaHelpline = () => {
    window.open('tel:1800-425-2425', '_self');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-noto">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-blue-800">
                    {language === 'te' ? 'గ్రామ సేవ' : language === 'hi' ? 'ग्राम सेवा' : 'Grama Seva'}
                  </h1>
                  <p className="text-sm text-blue-600">
                    {language === 'te' ? 'పౌర సేవల పోర్టల్' : language === 'hi' ? 'नागरिक सेवा पोर्टल' : 'Citizen Services Portal'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Button 
                variant="outline" 
                onClick={() => navigate('/profile')}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                {language === 'te' ? 'ప్రొఫైల్' : language === 'hi' ? 'प्रोफाइल' : 'Profile'}
              </Button>
              <Button 
                variant="outline" 
                onClick={signOut}
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                {language === 'te' ? 'లాగ్ అవుట్' : language === 'hi' ? 'लॉग आउट' : 'Logout'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              {language === 'te' ? `స్వాగతం, ${user?.user_metadata?.full_name || 'పౌరుడు'}!` : 
               language === 'hi' ? `स्वागत है, ${user?.user_metadata?.full_name || 'नागरिक'}!` : 
               `Welcome, ${user?.user_metadata?.full_name || 'Citizen'}!`}
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {language === 'te' ? 'మీ సమస్యలను పరిష్కరించడానికి మేము ఇక్కడ ఉన్నాము. సరైన విభాగాన్ని ఎంచుకోండి మరియు మీ అభ్యర్థనను సమర్పించండి.' :
               language === 'hi' ? 'हम आपकी समस्याओं को हल करने के लिए यहाँ हैं। सही विभाग चुनें और अपना अनुरोध सबमिट करें।' :
               'We are here to help solve your problems. Choose the right department and submit your request.'}
            </p>
            
            <div className="space-y-4 mb-8">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transform transition hover:scale-105"
              >
                {language === 'te' ? 'ప్రారంభించండి' : language === 'hi' ? 'शुरू करें' : 'Get Started'}
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <Button 
                variant="outline" 
                onClick={() => navigate('/my-requests')}
                className="border-blue-300 text-blue-700 hover:bg-blue-50 p-4"
              >
                <span className="text-lg">📋</span>
                <span className="ml-2">
                  {language === 'te' ? 'నా అభ్యర్థనలు' : language === 'hi' ? 'मेरे अनुरोध' : 'My Requests'}
                </span>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleTelanganaHelpline}
                className="border-green-300 text-green-700 hover:bg-green-50 p-4"
              >
                <Phone className="w-5 h-5" />
                <span className="ml-2">
                  {language === 'te' ? 'హెల్ప్‌లైన్' : language === 'hi' ? 'हेल्पलाइन' : 'Helpline'}
                </span>
              </Button>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md p-8 bg-white shadow-xl">
              <CardContent className="text-center space-y-6">
                <div className="text-6xl mb-4">🏛️</div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {language === 'te' ? 'గ్రామ సేవ' : language === 'hi' ? 'ग्राम सेवा' : 'Grama Seva'}
                </h3>
                <p className="text-gray-600">
                  {language === 'te' ? 'డిజిటల్ గవర్నెన్స్ ప్లాట్‌ఫారం' : 
                   language === 'hi' ? 'डिजिटल गवर्नेंस प्लेटफॉर्म' : 
                   'Digital Governance Platform'}
                </p>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  {language === 'te' ? 'తెలంగాణ ప్రభుత్వం' : language === 'hi' ? 'तेलंगाना सरकार' : 'Government of Telangana'}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const SuccessPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 font-noto flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="text-center shadow-xl">
          <CardContent className="p-12">
            <div className="mb-6">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <div className="text-6xl mb-4">🎉</div>
            </div>
            
            <h1 className="text-3xl font-bold text-green-800 mb-4">
              {language === 'te' ? 'విజయవంతం!' : 
               language === 'hi' ? 'सफल!' : 
               'Success!'}
            </h1>
            
            <p className="text-xl text-gray-700 mb-6">
              {language === 'te' ? 'మీ సమస్య విజయవంతంగా సమర్పించబడింది' : 
               language === 'hi' ? 'आपकी समस्या सफलतापूर्वक सबमिट की गई है' : 
               'Your problem has been successfully submitted'}
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <p className="text-green-800 text-lg font-semibold mb-2">
                {language === 'te' ? 'ఏమి తర్వాత?' : 
                 language === 'hi' ? 'आगे क्या?' : 
                 'What\'s Next?'}
              </p>
              <ul className="text-left text-green-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {language === 'te' ? 'మీ అభ్యర్థన సంబంధిత అధికారులకు పంపబడింది' : 
                   language === 'hi' ? 'आपका अनुरोध संबंधित अधिकारियों को भेजा गया है' : 
                   'Your request has been forwarded to relevant officials'}
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {language === 'te' ? 'మీకు SMS/ఇమెయిల్ ద్వారా అప్‌డేట్‌లు వస్తాయి' : 
                   language === 'hi' ? 'आपको SMS/ईमेल द्वारा अपडेट मिलेंगे' : 
                   'You will receive updates via SMS/Email'}
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {language === 'te' ? 'మీరు "నా అభ్యర్థనలు" విభాగంలో స్థితిని ట్రాక్ చేయవచ్చు' : 
                   language === 'hi' ? 'आप "मेरे अनुरोध" सेक्शन में स्थिति ट्रैक कर सकते हैं' : 
                   'You can track status in "My Requests" section'}
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/my-requests')}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  {language === 'te' ? 'నా అభ్యర్థనలు చూడండి' : 
                   language === 'hi' ? 'मेरे अनुरोध देखें' : 
                   'View My Requests'}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="border-green-300 text-green-700 hover:bg-green-50 px-6 py-3"
                >
                  <Home className="w-5 h-5 mr-2" />
                  {language === 'te' ? 'హోమ్‌కు వెళ్లండి' : 
                   language === 'hi' ? 'होम पर जाएं' : 
                   'Go to Home'}
                </Button>
              </div>
              
              <p className="text-sm text-gray-500 mt-6">
                {language === 'te' ? 'రిఫరెన్స్ ID: REQ-' : 
                 language === 'hi' ? 'संदर्भ ID: REQ-' : 
                 'Reference ID: REQ-'}
                {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessPage;

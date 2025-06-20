
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const SectorSelectionPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const sectors = [
    { 
      id: 'agriculture', 
      icon: '🌾', 
      title: language === 'te' ? 'వ్యవసాయం' : language === 'hi' ? 'कृषि' : 'Agriculture',
      description: language === 'te' ? 'పంట బీమా, ఎరువులు, నీటిపారుదల' : language === 'hi' ? 'फसल बीमा, उर्वरक, सिंचाई' : 'Crop Insurance, Fertilizers, Irrigation',
      color: 'bg-green-50 hover:bg-green-100 border-green-200 hover:border-green-300'
    },
    { 
      id: 'roads', 
      icon: '🛣️', 
      title: language === 'te' ? 'రోడ్లు & మౌలిక సదుపాయాలు' : language === 'hi' ? 'सड़कें और अवसंरचना' : 'Roads & Infrastructure',
      description: language === 'te' ? 'రోడ్ మరమ్మతులు, వీధి దీపాలు' : language === 'hi' ? 'सड़क मरम्मत, स्ट्रीट लाइट' : 'Road Repairs, Street Lights',
      color: 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300'
    },
    { 
      id: 'health', 
      icon: '❤️', 
      title: language === 'te' ? 'ఆరోగ్యం' : language === 'hi' ? 'स्वास्थ्य' : 'Health',
      description: language === 'te' ? 'ఆరోగ్యశ్రీ, ఆసుపత్రి సేవలు' : language === 'hi' ? 'आरोग्यश्री, अस्पताल सेवाएं' : 'Aarogyasri, Hospital Services',
      color: 'bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300'
    },
    { 
      id: 'education', 
      icon: '🎓', 
      title: language === 'te' ? 'విద్య' : language === 'hi' ? 'शिक्षा' : 'Education',
      description: language === 'te' ? 'స్కూల్ ప్రవేశ, స్కాలర్‌షిప్‌లు' : language === 'hi' ? 'स्कूल प्रवेश, छात्रवृत्ति' : 'School Admission, Scholarships',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200 hover:border-blue-300'
    },
    { 
      id: 'electricity', 
      icon: '⚡', 
      title: language === 'te' ? 'విద్యుత్' : language === 'hi' ? 'बिजली' : 'Electricity',
      description: language === 'te' ? 'పవర్ కట్స్, బిల్లు సమస్యలు' : language === 'hi' ? 'बिजली कटौती, बिल समस्याएं' : 'Power Cuts, Bill Issues',
      color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200 hover:border-yellow-300'
    },
    { 
      id: 'employment', 
      icon: '💼', 
      title: language === 'te' ? 'ఉపాధి' : language === 'hi' ? 'रोजगार' : 'Employment',
      description: language === 'te' ? 'NREGA, నైపుణ్య శిక్షణ' : language === 'hi' ? 'NREGA, कौशल प्रशिक्षण' : 'NREGA, Skill Training',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200 hover:border-purple-300'
    },
    { 
      id: 'housing', 
      icon: '🏠', 
      title: language === 'te' ? 'గృహనిర్మాణం' : language === 'hi' ? 'आवास' : 'Housing',
      description: language === 'te' ? 'ఇల్లు కేటాయింపు, పత్రాలు' : language === 'hi' ? 'घर आवंटन, दस्तावेज' : 'House Allocation, Documents',
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200 hover:border-orange-300'
    },
    { 
      id: 'welfare', 
      icon: '👶', 
      title: language === 'te' ? 'మహిళలు & పిల్లల సంక్షేమం' : language === 'hi' ? 'महिला एवं बाल कल्याण' : 'Women & Child Welfare',
      description: language === 'te' ? 'పెన్షన్, అంగన్వాడీ సేవలు' : language === 'hi' ? 'पेंशन, आंगनवाड़ी सेवाएं' : 'Pension, Anganwadi Services',
      color: 'bg-pink-50 hover:bg-pink-100 border-pink-200 hover:border-pink-300'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-noto">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-blue-700 hover:bg-blue-50"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {language === 'te' ? 'వెనుకకు' : language === 'hi' ? 'वापस' : 'Back'}
            </Button>
            <div>
              <h1 className="text-xl font-bold text-blue-800">
                {language === 'te' ? 'మీ విభాగాన్ని ఎంచుకోండి' : 
                 language === 'hi' ? 'अपना विभाग चुनें' : 
                 'Choose Your Sector'}
              </h1>
              <p className="text-sm text-gray-600">
                {language === 'te' ? 'మీ సమస్య రకం ప్రకారం సరైన విభాగాన్ని ఎంచుకోండి' : 
                 language === 'hi' ? 'अपनी समस्या के अनुसार सही विभाग चुनें' : 
                 'Select the appropriate department based on your issue'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector) => (
            <Card 
              key={sector.id} 
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${sector.color}`}
              onClick={() => navigate(`/sector/${sector.id}`)}
            >
              <CardHeader className="pb-3 text-center">
                <div className="text-4xl mb-2">{sector.icon}</div>
                <CardTitle className="text-lg text-gray-800 font-semibold">
                  {sector.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {sector.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {language === 'te' ? 'సహాయం అవసరమా?' : 
                 language === 'hi' ? 'सहायता चाहिए?' : 
                 'Need Help?'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'te' ? 'మీరు ఏ విభాగాన్ని ఎంచుకోవాలో తెలియకపోతే, మా హెల్ప్‌లైన్‌కు కాల్ చేయండి' : 
                 language === 'hi' ? 'यदि आप नहीं जानते कि कौन सा विभाग चुनना है, तो हमारी हेल्पलाइन पर कॉल करें' : 
                 'If you\'re unsure which department to choose, call our helpline'}
              </p>
              <Button 
                variant="outline" 
                onClick={() => window.open('tel:1800-425-2425', '_self')}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                📞 1800-425-2425
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SectorSelectionPage;

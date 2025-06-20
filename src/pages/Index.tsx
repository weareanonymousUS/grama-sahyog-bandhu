
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Phone, Users, FileText, TrendingUp, MapPin, Building, Heart, GraduationCap, Zap, Briefcase, Home, Baby } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user, signOut } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const sectors = [
    { 
      id: 'agriculture', 
      icon: '🌾', 
      title: language === 'te' ? 'వ్యవసాయం' : language === 'hi' ? 'कृषि' : 'Agriculture',
      problems: ['Crop Insurance', 'Fertilizer Issues', 'Irrigation Problems', 'Pest Control', 'Market Prices']
    },
    { 
      id: 'roads', 
      icon: '🛣️', 
      title: language === 'te' ? 'రోడ్లు & మౌలిక సదుపాయాలు' : language === 'hi' ? 'सड़कें और अवसंरचना' : 'Roads & Infrastructure',
      problems: ['Road Repairs', 'Street Lights', 'Drainage Issues', 'Bridge Problems', 'Traffic Signals']
    },
    { 
      id: 'health', 
      icon: '❤️', 
      title: language === 'te' ? 'ఆరోగ్యం' : language === 'hi' ? 'स्वास्थ्य' : 'Health',
      problems: ['Aarogyasri Issues', 'Medicine Shortage', 'Hospital Services', 'Vaccination', 'Emergency Care']
    },
    { 
      id: 'education', 
      icon: '🎓', 
      title: language === 'te' ? 'విద్య' : language === 'hi' ? 'शिक्षा' : 'Education',
      problems: ['School Admission', 'Scholarship Issues', 'Fee Reimbursement', 'Mid-day Meals', 'Infrastructure']
    },
    { 
      id: 'electricity', 
      icon: '⚡', 
      title: language === 'te' ? 'విద్యుత్' : language === 'hi' ? 'बिजली' : 'Electricity',
      problems: ['Power Cuts', 'Bill Issues', 'New Connection', 'Meter Problems', 'Line Faults']
    },
    { 
      id: 'employment', 
      icon: '💼', 
      title: language === 'te' ? 'ఉపాధి' : language === 'hi' ? 'रोजगार' : 'Employment',
      problems: ['Job Card Issues', 'NREGA Work', 'Skill Training', 'Unemployment Allowance', 'Self Help Groups']
    },
    { 
      id: 'housing', 
      icon: '🏠', 
      title: language === 'te' ? 'గృహనిర్మాణం' : language === 'hi' ? 'आवास' : 'Housing',
      problems: ['House Allocation', 'Construction Issues', 'Property Documents', 'Subsidies', 'Land Records']
    },
    { 
      id: 'welfare', 
      icon: '👶', 
      title: language === 'te' ? 'మహిళలు & పిల్లల సంక్షేమం' : language === 'hi' ? 'महिला एवं बाल कल्याण' : 'Women & Child Welfare',
      problems: ['Pension Issues', 'Anganwadi Services', 'Maternity Benefits', 'Child Nutrition', 'Women Safety']
    }
  ];

  const stats = [
    { 
      title: language === 'te' ? 'మొత్తం అభ్యర్థనలు' : language === 'hi' ? 'कुल अनुरोध' : 'Total Requests', 
      value: '12,456', 
      icon: FileText 
    },
    { 
      title: language === 'te' ? 'పరిష్కరించబడినవి' : language === 'hi' ? 'हल किए गए' : 'Resolved', 
      value: '9,823', 
      icon: TrendingUp 
    },
    { 
      title: language === 'te' ? 'రిజిస్టర్డ్ యూజర్లు' : language === 'hi' ? 'पंजीकृत उपयोगकर्ता' : 'Registered Users', 
      value: '45,678', 
      icon: Users 
    }
  ];

  const helplineNumbers = [
    { 
      title: language === 'te' ? 'ప్రధాన హెల్ప్‌లైన్' : language === 'hi' ? 'मुख्य हेल्पलाइन' : 'Main Helpline', 
      number: '1800-425-2425' 
    },
    { 
      title: language === 'te' ? 'వ్యవసాయ సహాయం' : language === 'hi' ? 'कृषि सहायता' : 'Agriculture Support', 
      number: '1800-180-1551' 
    },
    { 
      title: language === 'te' ? 'ఆరోగ్య సేవలు' : language === 'hi' ? 'स्वास्थ्य सेवाएं' : 'Health Services', 
      number: '104' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-village-green-50 to-earth-beige-50 font-noto">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-village-green-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building className="h-8 w-8 text-village-green-600" />
                <div>
                  <h1 className="text-xl font-bold text-village-green-800">
                    {language === 'te' ? 'గ్రామ స్పూర్తి' : language === 'hi' ? 'ग्राम स्पूर्ति' : 'Gram Sphoorthi'}
                  </h1>
                  <p className="text-sm text-village-green-600">
                    {language === 'te' ? 'పౌర సేవల పోర్టల్' : language === 'hi' ? 'नागरिक सेवा पोर्टल' : 'Citizen Services Portal'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Button 
                variant="outline" 
                onClick={() => navigate('/my-requests')}
                className="border-village-green-300 text-village-green-700 hover:bg-village-green-50"
              >
                {language === 'te' ? 'నా అభ్యర్థనలు' : language === 'hi' ? 'मेरे अनुरोध' : 'My Requests'}
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

      {/* Welcome Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-village-green-800 mb-2">
            {language === 'te' ? `స్వాగతం, ${user?.user_metadata?.full_name || 'పౌరుడు'}!` : 
             language === 'hi' ? `स्वागत है, ${user?.user_metadata?.full_name || 'नागरिक'}!` : 
             `Welcome, ${user?.user_metadata?.full_name || 'Citizen'}!`}
          </h2>
          <p className="text-village-green-600 max-w-2xl mx-auto">
            {language === 'te' ? 'మీ సమస్యలను పరిష్కరించడానికి సరైన విభాగాన్ని ఎంచుకోండి. మేము మీకు సహాయం చేయడానికి ఇక్కడ ఉన్నాము.' :
             language === 'hi' ? 'अपनी समस्याओं को हल करने के लिए सही विभाग चुनें। हम आपकी सहायता के लिए यहाँ हैं।' :
             'Choose the right sector to resolve your issues. We are here to help you get the support you need.'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-village-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-village-green-800">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-village-green-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {sectors.map((sector) => (
            <Card 
              key={sector.id} 
              className="cursor-pointer border-village-green-100 hover:border-village-green-300 hover:shadow-lg transition-all duration-300"
              onClick={() => navigate(`/sector/${sector.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{sector.icon}</span>
                  <CardTitle className="text-lg text-village-green-800">{sector.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {sector.problems.slice(0, 3).map((problem, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-village-green-50 text-village-green-700">
                      {problem}
                    </Badge>
                  ))}
                  {sector.problems.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                      +{sector.problems.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Helpline Numbers */}
        <Card className="border-village-green-100">
          <CardHeader>
            <CardTitle className="text-village-green-800 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              {language === 'te' ? 'హెల్ప్‌లైన్ నంబర్లు' : language === 'hi' ? 'हेल्पलाइन नंबर' : 'Helpline Numbers'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {helplineNumbers.map((helpline, index) => (
                <div key={index} className="text-center p-4 bg-village-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">{helpline.title}</p>
                  <a 
                    href={`tel:${helpline.number}`}
                    className="text-lg font-bold text-village-green-700 hover:text-village-green-800"
                  >
                    {helpline.number}
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;

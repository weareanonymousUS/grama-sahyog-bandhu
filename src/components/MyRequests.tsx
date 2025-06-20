
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Phone, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RequestItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  problem_type: string;
  status: string;
  submitted_at: string;
  sector?: string;
  description?: string;
  location?: string;
}

const MyRequests = () => {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    pending: { te: 'పెండింగ్', hi: 'लंबित', en: 'Pending' },
    in_progress: { te: 'ప్రగతిలో', hi: 'प्रगति में', en: 'In Progress' },
    resolved: { te: 'పరిష్కరించబడింది', hi: 'हल हो गया', en: 'Resolved' },
    rejected: { te: 'తిరస్కరించబడింది', hi: 'अस्वीकृत', en: 'Rejected' }
  };

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  const fetchRequests = async () => {
    if (!user) return;

    try {
      const tableNames = [
        'agriculture_requests',
        'roads_infrastructure_requests', 
        'health_requests',
        'education_requests',
        'electricity_requests',
        'employment_requests',
        'housing_requests',
        'welfare_requests'
      ];

      const allRequests: RequestItem[] = [];

      for (const tableName of tableNames) {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('user_id', user.id)
          .order('submitted_at', { ascending: false });

        if (error) {
          console.error(`Error fetching ${tableName}:`, error);
          continue;
        }

        if (data) {
          const sectorName = tableName.replace('_requests', '').replace('roads_infrastructure', 'roads');
          const formattedData = data.map(item => ({
            ...item,
            sector: sectorName
          }));
          allRequests.push(...formattedData);
        }
      }

      // Sort all requests by submitted_at
      allRequests.sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());
      setRequests(allRequests);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: language === 'te' ? 'లోపం' : language === 'hi' ? 'त्रुटि' : 'Error',
        description: language === 'te' ? 'అభ్యర్థనలను లోడ్ చేయడంలో లోపం' : 
                    language === 'hi' ? 'अनुरोध लोड करने में त्रुटि' : 
                    'Error loading requests',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSectorDisplayName = (sector: string) => {
    const sectorNames = {
      agriculture: { te: 'వ్యవసాయం', hi: 'कृषि', en: 'Agriculture' },
      roads: { te: 'రోడ్లు', hi: 'सड़कें', en: 'Roads' },
      health: { te: 'ఆరోగ్యం', hi: 'स्वास्थ्य', en: 'Health' },
      education: { te: 'విద్య', hi: 'शिक्षा', en: 'Education' },
      electricity: { te: 'విద్యుత్', hi: 'बिजली', en: 'Electricity' },
      employment: { te: 'ఉపాధి', hi: 'रोजगार', en: 'Employment' },
      housing: { te: 'గృహనిర్మాణం', hi: 'आवास', en: 'Housing' },
      welfare: { te: 'సంక్షేమం', hi: 'कल्याण', en: 'Welfare' }
    };
    return sectorNames[sector as keyof typeof sectorNames]?.[language] || sector;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-600">
            {language === 'te' ? 'లోడ్ అవుతోంది...' : 
             language === 'hi' ? 'लोड हो रहा है...' : 
             'Loading...'}
          </p>
        </div>
      </div>
    );
  }

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
                {language === 'te' ? 'నా అభ్యర్థనలు' : 
                 language === 'hi' ? 'मेरे अनुरोध' : 
                 'My Requests'}
              </h1>
              <p className="text-sm text-gray-600">
                {language === 'te' ? 'మీ సమర్పించిన అభ్యర్థనలను ట్రాక్ చేయండి' : 
                 language === 'hi' ? 'अपने सबमिट किए गए अनुरोधों को ट्रैक करें' : 
                 'Track your submitted requests'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {requests.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 mb-4">
                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">
                  {language === 'te' ? 'అభ్యర్థనలు లేవు' : 
                   language === 'hi' ? 'कोई अनुरोध नहीं' : 
                   'No Requests Found'}
                </h3>
                <p>
                  {language === 'te' ? 'మీరు ఇంకా ఎటువంటి అభ్యర్థనలు సమర్పించలేదు' : 
                   language === 'hi' ? 'आपने अभी तक कोई अनुरोध सबमिट नहीं किया है' : 
                   'You haven\'t submitted any requests yet'}
                </p>
              </div>
              <Button onClick={() => navigate('/sectors')} className="bg-blue-600 hover:bg-blue-700">
                {language === 'te' ? 'అభ్యర్థన సమర్పించండి' : 
                 language === 'hi' ? 'अनुरोध सबमिट करें' : 
                 'Submit a Request'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold text-blue-800 mb-2">
                        {request.problem_type}
                      </CardTitle>
                      <Badge variant="secondary" className="mb-2">
                        {getSectorDisplayName(request.sector || '')}
                      </Badge>
                    </div>
                    <Badge className={statusColors[request.status as keyof typeof statusColors]}>
                      {statusLabels[request.status as keyof typeof statusLabels][language]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(request.submitted_at)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {request.phone}
                    </div>
                    {request.email && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {request.email}
                      </div>
                    )}
                    {request.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {request.location}
                      </div>
                    )}
                  </div>
                  
                  {request.description && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm text-gray-700 mb-1">
                        {language === 'te' ? 'వివరణ:' : 
                         language === 'hi' ? 'विवरण:' : 
                         'Description:'}
                      </h4>
                      <p className="text-sm text-gray-600">{request.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequests;

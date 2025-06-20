
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Phone, Mail, MapPin, Edit2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    phone_number: '',
    village: '',
    district: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          phone_number: data.phone_number || '',
          village: data.village || '',
          district: data.district || ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...profile,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: language === 'te' ? 'విజయవంతం!' : language === 'hi' ? 'सफल!' : 'Success!',
        description: language === 'te' ? 'ప్రొఫైల్ అప్‌డేట్ చేయబడింది' : 
                    language === 'hi' ? 'प्रोफाइल अपडेट किया गया' : 
                    'Profile updated successfully',
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: language === 'te' ? 'లోపం' : language === 'hi' ? 'त्रुटि' : 'Error',
        description: language === 'te' ? 'ప్రొఫైల్ అప్‌డేట్ చేయడంలో లోపం' : 
                    language === 'hi' ? 'प्रोफाइल अपडेट करने में त्रुटि' : 
                    'Error updating profile',
        variant: 'destructive'
      });
    }
  };

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
                {language === 'te' ? 'ప్రొఫైల్ డాష్‌బోర్డ్' : 
                 language === 'hi' ? 'प्रोफाइल डैशबोर्ड' : 
                 'Profile Dashboard'}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-blue-800 flex items-center">
                <User className="w-6 h-6 mr-2" />
                {language === 'te' ? 'వ్యక్తిగత వివరాలు' : 
                 language === 'hi' ? 'व्यक्तिगत विवरण' : 
                 'Personal Details'}
              </CardTitle>
              <Button
                variant="outline"
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit2 className="w-4 h-4 mr-2" />}
                {isEditing ? 
                  (language === 'te' ? 'సేవ్' : language === 'hi' ? 'सेव' : 'Save') :
                  (language === 'te' ? 'ఎడిట్' : language === 'hi' ? 'एडिट' : 'Edit')
                }
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="full_name" className="flex items-center mb-2">
                  <User className="w-4 h-4 mr-2" />
                  {language === 'te' ? 'పూర్తి పేరు' : language === 'hi' ? 'पूरा नाम' : 'Full Name'}
                </Label>
                <Input
                  id="full_name"
                  value={profile.full_name}
                  onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                  disabled={!isEditing}
                  placeholder={language === 'te' ? 'మీ పూర్తి పేరు' : language === 'hi' ? 'आपका पूरा नाम' : 'Your full name'}
                />
              </div>

              <div>
                <Label htmlFor="phone_number" className="flex items-center mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  {language === 'te' ? 'ఫోన్ నంబర్' : language === 'hi' ? 'फोन नंबर' : 'Phone Number'}
                </Label>
                <Input
                  id="phone_number"
                  value={profile.phone_number}
                  onChange={(e) => setProfile({...profile, phone_number: e.target.value})}
                  disabled={!isEditing}
                  placeholder={language === 'te' ? 'మీ ఫోన్ నంబర్' : language === 'hi' ? 'आपका फोन नंबर' : 'Your phone number'}
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  {language === 'te' ? 'ఇమెయిల్' : language === 'hi' ? 'ईमेल' : 'Email'}
                </Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="village" className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {language === 'te' ? 'గ్రామం' : language === 'hi' ? 'गांव' : 'Village'}
                </Label>
                <Input
                  id="village"
                  value={profile.village}
                  onChange={(e) => setProfile({...profile, village: e.target.value})}
                  disabled={!isEditing}
                  placeholder={language === 'te' ? 'మీ గ్రామం' : language === 'hi' ? 'आपका गांव' : 'Your village'}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="district" className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {language === 'te' ? 'జిల్లా' : language === 'hi' ? 'जिला' : 'District'}
                </Label>
                <Input
                  id="district"
                  value={profile.district}
                  onChange={(e) => setProfile({...profile, district: e.target.value})}
                  disabled={!isEditing}
                  placeholder={language === 'te' ? 'మీ జిల్లా' : language === 'hi' ? 'आपका जिला' : 'Your district'}
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    fetchProfile(); // Reset changes
                  }}
                >
                  {language === 'te' ? 'రద్దు చేయండి' : language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {language === 'te' ? 'సేవ్ చేయండి' : language === 'hi' ? 'सेव करें' : 'Save Changes'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;

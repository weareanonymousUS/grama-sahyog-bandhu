
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';
import DynamicForm from './DynamicForm';

const SectorPage = () => {
  const { sectorId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedProblem, setSelectedProblem] = useState<string>("");

  const sectorData: Record<string, any> = {
    agriculture: {
      title: { te: 'వ్యవసాయం', hi: 'कृषि', en: 'Agriculture' },
      icon: "🌾",
      problems: [
        { id: 'crop-insurance', title: { te: 'పంట బీమా క్లెయిమ్స్', hi: 'फसल बीमा दावे', en: 'Crop Insurance Claims' } },
        { id: 'fertilizer-shortage', title: { te: 'ఎరువుల కొరత', hi: 'उर्वरक की कमी', en: 'Fertilizer Shortage' } },
        { id: 'irrigation-issues', title: { te: 'నీటిపారుదల సమస్యలు', hi: 'सिंचाई की समस्याएं', en: 'Irrigation Problems' } },
        { id: 'pest-control', title: { te: 'పెస్ట్ కంట్రోల్', hi: 'कीट नियंत्रण', en: 'Pest Control' } },
        { id: 'market-prices', title: { te: 'మార్కెట్ ధరలు', hi: 'बाज़ार की कीमतें', en: 'Market Prices' } }
      ],
      officer: {
        name: "K. Ramesh",
        designation: "Agriculture Officer",
        phone: "+91-9876543210",
        email: "ramesh.agri@telangana.gov.in"
      }
    },
    roads: {
      title: { te: 'రోడ్లు & మౌలిక సదుపాయాలు', hi: 'सड़कें और अवसंरचना', en: 'Roads & Infrastructure' },
      icon: "🛣️",
      problems: [
        { id: 'road-repairs', title: { te: 'రోడ్ మరమ్మతులు', hi: 'सड़क की मरम्मत', en: 'Road Repairs' } },
        { id: 'street-lights', title: { te: 'వీధి దీపాలు', hi: 'सड़क की रोशनी', en: 'Street Lights' } },
        { id: 'drainage-issues', title: { te: 'డ్రైనేజీ సమస్యలు', hi: 'जल निकासी की समस्याएं', en: 'Drainage Issues' } },
        { id: 'bridge-problems', title: { te: 'వంతెన సమస్యలు', hi: 'पुल की समस्याएं', en: 'Bridge Problems' } },
        { id: 'traffic-signals', title: { te: 'ట్రాఫిక్ సిగ్నల్స్', hi: 'ट्रैफिक सिग्नल', en: 'Traffic Signals' } }
      ],
      officer: {
        name: "M. Suresh",
        designation: "Roads & Infrastructure Officer",
        phone: "+91-9876543211",
        email: "suresh.roads@telangana.gov.in"
      }
    },
    health: {
      title: { te: 'ఆరోగ్యం', hi: 'स्वास्थ्य', en: 'Health' },
      icon: "❤️",
      problems: [
        { id: 'aarogyasri-card', title: { te: 'ఆరోగ్యశ్రీ కార్డ్ సమస్యలు', hi: 'आरोग्यश्री कार्ड की समस्याएं', en: 'Aarogyasri Card Issues' } },
        { id: 'medicine-shortage', title: { te: 'మందుల కొరత', hi: 'दवा की कमी', en: 'Medicine Shortage' } },
        { id: 'hospital-services', title: { te: 'ఆసుపత్రి సేవలు', hi: 'अस्पताल सेवाएं', en: 'Hospital Services' } },
        { id: 'vaccination', title: { te: 'టీకాలు', hi: 'टीकाकरण', en: 'Vaccination' } },
        { id: 'emergency-care', title: { te: 'అత్యవసర సంరక్షణ', hi: 'आपातकालीन देखभाल', en: 'Emergency Care' } }
      ],
      officer: {
        name: "Dr. Sunitha",
        designation: "District Medical Officer",
        phone: "+91-9876543213",
        email: "sunitha.health@telangana.gov.in"
      }
    },
    education: {
      title: { te: 'విద్య', hi: 'शिक्षा', en: 'Education' },
      icon: "🎓",
      problems: [
        { id: 'school-admission', title: { te: 'పాఠశాల ప్రవేశ సమస్యలు', hi: 'स्कूल प्रवेश की समस्याएं', en: 'School Admission Issues' } },
        { id: 'scholarship-issues', title: { te: 'స్కాలర్‌షిప్ సమస్యలు', hi: 'छात्रवृत्ति की समस्याएं', en: 'Scholarship Issues' } },
        { id: 'fee-reimbursement', title: { te: 'ఫీజు రీయింబర్స్‌మెంట్', hi: 'शुल्क प्रतिपूर्ति', en: 'Fee Reimbursement' } },
        { id: 'midday-meals', title: { te: 'మధ్యాహ్న భోజనం', hi: 'दोपहर का भोजन', en: 'Mid-day Meals' } },
        { id: 'infrastructure', title: { te: 'మౌలిక సదుపాయాలు', hi: 'अवसंरचना', en: 'Infrastructure' } }
      ],
      officer: {
        name: "B. Rajesh",
        designation: "District Education Officer",
        phone: "+91-9876543214",
        email: "rajesh.education@telangana.gov.in"
      }
    },
    electricity: {
      title: { te: 'విద్యుత్', hi: 'बिजली', en: 'Electricity' },
      icon: "⚡",
      problems: [
        { id: 'power-cuts', title: { te: 'పవర్ కట్స్', hi: 'बिजली कटौती', en: 'Power Cuts' } },
        { id: 'bill-issues', title: { te: 'బిల్లు సమస్యలు', hi: 'बिल की समस्याएं', en: 'Bill Issues' } },
        { id: 'new-connection', title: { te: 'కొత్త కనెక్షన్', hi: 'नया कनेक्शन', en: 'New Connection' } },
        { id: 'meter-problems', title: { te: 'మీటర్ సమస్యలు', hi: 'मीटर की समस्याएं', en: 'Meter Problems' } },
        { id: 'line-faults', title: { te: 'లైన్ ఫాల్ట్స్', hi: 'लाइन की खराबी', en: 'Line Faults' } }
      ],
      officer: {
        name: "P. Krishna",
        designation: "Electrical Engineer",
        phone: "+91-9876543215",
        email: "krishna.electrical@telangana.gov.in"
      }
    },
    employment: {
      title: { te: 'ఉపాధి', hi: 'रोजगार', en: 'Employment' },
      icon: "💼",
      problems: [
        { id: 'job-card-issues', title: { te: 'జాబ్ కార్డ్ సమస్యలు', hi: 'जॉब कार्ड की समस्याएं', en: 'Job Card Issues' } },
        { id: 'nrega-work', title: { te: 'NREGA పని', hi: 'NREGA कार्य', en: 'NREGA Work' } },
        { id: 'skill-training', title: { te: 'నైపుణ్య శిక्षण', hi: 'कौशल प्रशिक्षण', en: 'Skill Training' } },
        { id: 'unemployment-allowance', title: { te: 'నిరుద్యోగ భత్యం', hi: 'बेरोजगारी भत्ता', en: 'Unemployment Allowance' } },
        { id: 'self-help-groups', title: { te: 'స్వయం సహాయక సంఘాలు', hi: 'स्व-सहायता समूह', en: 'Self Help Groups' } }
      ],
      officer: {
        name: "L. Venkata Rao",
        designation: "Employment Officer",
        phone: "+91-9876543216",
        email: "venkata.employment@telangana.gov.in"
      }
    },
    housing: {
      title: { te: 'గృహనిర్మాణం', hi: 'आवास', en: 'Housing' },
      icon: "🏠",
      problems: [
        { id: 'house-allocation', title: { te: 'ఇల్లు కేటాయింపు', hi: 'घर आवंटन', en: 'House Allocation' } },
        { id: 'construction-issues', title: { te: 'నిర్మాణ సమస్యలు', hi: 'निर्माण की समस्याएं', en: 'Construction Issues' } },
        { id: 'property-documents', title: { te: 'ఆస్తి పత్రాలు', hi: 'संपत्ति दस्तावेज', en: 'Property Documents' } },
        { id: 'subsidies', title: { te: 'సబ్సిడీలు', hi: 'सब्सिडी', en: 'Subsidies' } },
        { id: 'land-records', title: { te: 'భూ రికార్డులు', hi: 'भूमि रिकॉर्ड', en: 'Land Records' } }
      ],
      officer: {
        name: "G. Madhavi",
        designation: "Housing Officer",
        phone: "+91-9876543217",
        email: "madhavi.housing@telangana.gov.in"
      }
    },
    welfare: {
      title: { te: 'మహిళలు & పిల్లల సంక్షేమం', hi: 'महिला एवं बाल कल्याण', en: 'Women & Child Welfare' },
      icon: "👶",
      problems: [
        { id: 'pension-issues', title: { te: 'పెన్షన్ సమస్యలు', hi: 'पेंशन की समस्याएं', en: 'Pension Issues' } },
        { id: 'anganwadi-services', title: { te: 'అంగన్వాడీ సేవలు', hi: 'आंगनवाड़ी सेवाएं', en: 'Anganwadi Services' } },
        { id: 'maternity-benefits', title: { te: 'ప్రసూతి లाभాలు', hi: 'मातृत्व लाभ', en: 'Maternity Benefits' } },
        { id: 'child-nutrition', title: { te: 'పిల్లల పోషण', hi: 'बाल पोषण', en: 'Child Nutrition' } },
        { id: 'women-safety', title: { te: 'మహిళల భద్రత', hi: 'महिला सुरक्षा', en: 'Women Safety' } }
      ],
      officer: {
        name: "S. Lakshmi",
        designation: "Women & Child Welfare Officer",
        phone: "+91-9876543218",
        email: "lakshmi.welfare@telangana.gov.in"
      }
    }
  };

  const currentSector = sectorId ? sectorData[sectorId] : null;
  const selectedProblemData = currentSector?.problems.find((p: any) => p.id === selectedProblem);

  if (!currentSector) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {language === 'te' ? 'విభాగం కనుగొనబడలేదు' : 
             language === 'hi' ? 'विभाग नहीं मिला' : 
             'Sector Not Found'}
          </h1>
          <Button onClick={() => navigate("/")} className="bg-village-green-600 hover:bg-village-green-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'te' ? 'హోమ్‌కు వెనుకకు' : language === 'hi' ? 'होम पर वापस' : 'Back to Home'}
          </Button>
        </div>
      </div>
    );
  }

  const handleFormSubmit = () => {
    navigate('/my-requests');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-village-green-50 to-earth-beige-50 font-noto">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-village-green-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-village-green-700 hover:bg-village-green-50"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {language === 'te' ? 'వెనుకకు' : language === 'hi' ? 'वापस' : 'Back'}
            </Button>
            <div>
              <h1 className="text-xl font-bold text-village-green-800">
                {currentSector.icon} {currentSector.title[language]}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Problem Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-village-green-800">
              {language === 'te' ? 'మీ సమస్యను ఎంచుకోండి' : 
               language === 'hi' ? 'अपनी समस्या चुनें' : 
               'Select Your Problem'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedProblem} onValueChange={setSelectedProblem}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={
                  language === 'te' ? 'మీరు ఎదుర్కొంటున్న సమస్యను ఎంచుకోండి...' : 
                  language === 'hi' ? 'आपकी समस्या चुनें...' : 
                  'Choose the issue you\'re facing...'
                } />
              </SelectTrigger>
              <SelectContent>
                {currentSector.problems.map((problem: any) => (
                  <SelectItem key={problem.id} value={problem.id}>
                    {problem.title[language]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Contact Officer */}
        {selectedProblemData && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-village-green-800 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                {language === 'te' ? 'సంప్రదింపు అధికారి' : 
                 language === 'hi' ? 'संपर्क अधिकारी' : 
                 'Contact Officer'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>{language === 'te' ? 'పేరు:' : language === 'hi' ? 'नाम:' : 'Name:'}</strong> {currentSector.officer.name}</p>
                <p><strong>{language === 'te' ? 'హోదా:' : language === 'hi' ? 'पदनाम:' : 'Designation:'}</strong> {currentSector.officer.designation}</p>
                <p><strong>{language === 'te' ? 'ఫోన్:' : language === 'hi' ? 'फोन:' : 'Phone:'}</strong> 
                  <a href={`tel:${currentSector.officer.phone}`} 
                     className="text-village-green-600 hover:text-village-green-800 ml-2">
                    {currentSector.officer.phone}
                  </a>
                </p>
                <p><strong>{language === 'te' ? 'ఇమెయిల్:' : language === 'hi' ? 'ईमेल:' : 'Email:'}</strong> 
                  <a href={`mailto:${currentSector.officer.email}`} 
                     className="text-village-green-600 hover:text-village-green-800 ml-2">
                    {currentSector.officer.email}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dynamic Form */}
        {selectedProblemData && (
          <DynamicForm 
            sector={sectorId!}
            problemType={selectedProblemData.title[language]}
            onSubmit={handleFormSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default SectorPage;

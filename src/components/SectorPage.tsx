
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, Upload, FileText, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface Problem {
  id: string;
  title: string;
  titleTelugu: string;
  solutions: string[];
  officer: {
    name: string;
    designation: string;
    phone: string;
    email: string;
  };
}

interface SectorData {
  title: string;
  titleTelugu: string;
  icon: string;
  problems: Problem[];
}

const SectorPage = () => {
  const { sectorId } = useParams();
  const navigate = useNavigate();
  const [selectedProblem, setSelectedProblem] = useState<string>("");
  const [description, setDescription] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  // Sample data - in real app, this would come from a database
  const sectorData: Record<string, SectorData> = {
    agriculture: {
      title: "Agriculture",
      titleTelugu: "వ్యవసాయం",
      icon: "🌾",
      problems: [
        {
          id: "crop-insurance",
          title: "Crop Insurance Claims",
          titleTelugu: "పంట బీమా క్లెయిమ్స్",
          solutions: [
            "PM Fasal Bima Yojana",
            "State Crop Insurance Scheme",
            "Revenue Department Support"
          ],
          officer: {
            name: "K. Ramesh",
            designation: "Agriculture Officer",
            phone: "+91-9876543210",
            email: "ramesh.agri@telangana.gov.in"
          }
        },
        {
          id: "fertilizer-shortage",
          title: "Fertilizer Shortage",
          titleTelugu: "ఎరువుల కొరత",
          solutions: [
            "Direct Benefit Transfer for Fertilizers",
            "Cooperative Society Distribution",
            "Organic Fertilizer Promotion"
          ],
          officer: {
            name: "M. Lakshmi",
            designation: "Assistant Director Agriculture",
            phone: "+91-9876543211",
            email: "lakshmi.agri@telangana.gov.in"
          }
        },
        {
          id: "irrigation-issues",
          title: "Irrigation Problems",
          titleTelugu: "నీటిపారుదల సమస్యలు",
          solutions: [
            "Mission Kakatiya - Tank Restoration",
            "Kaleshwaram Lift Irrigation",
            "Drip Irrigation Subsidies"
          ],
          officer: {
            name: "P. Venkat",
            designation: "Irrigation Officer",
            phone: "+91-9876543212",
            email: "venkat.irrigation@telangana.gov.in"
          }
        }
      ]
    },
    health: {
      title: "Health",
      titleTelugu: "ఆరోగ్యం",
      icon: "❤️",
      problems: [
        {
          id: "aarogyasri-card",
          title: "Aarogyasri Card Issues",
          titleTelugu: "ఆరోగ్యశ్రీ కార్డ్ సమస్యలు",
          solutions: [
            "Aarogyasri Health Care Trust",
            "Online Application Portal",
            "Village Health Volunteer Support"
          ],
          officer: {
            name: "Dr. Sunitha",
            designation: "District Medical Officer",
            phone: "+91-9876543213",
            email: "sunitha.health@telangana.gov.in"
          }
        }
      ]
    },
    education: {
      title: "Education",
      titleTelugu: "విద్య",
      icon: "🎓",
      problems: [
        {
          id: "school-admission",
          title: "School Admission Issues",
          titleTelugu: "పాఠశాల ప్రవేశ సమస్యలు",
          solutions: [
            "RTE Online Admission",
            "Sarva Shiksha Abhiyan",
            "District Education Office Support"
          ],
          officer: {
            name: "B. Rajesh",
            designation: "District Education Officer",
            phone: "+91-9876543214",
            email: "rajesh.education@telangana.gov.in"
          }
        }
      ]
    }
  };

  const currentSector = sectorId ? sectorData[sectorId] : null;
  const selectedProblemData = currentSector?.problems.find(p => p.id === selectedProblem);

  if (!currentSector) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Sector Not Found</h1>
          <Button onClick={() => navigate("/")} className="bg-village-green-600 hover:bg-village-green-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!selectedProblem || !description || !contactNumber) {
      alert("Please fill all required fields");
      return;
    }
    alert("Your request has been submitted successfully! You will receive an SMS confirmation shortly.");
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
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold text-village-green-800">
                {currentSector.icon} {currentSector.title}
              </h1>
              <p className="text-sm text-village-green-600">{currentSector.titleTelugu}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Problem Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-village-green-800">
              Select Your Problem / समस्या चुनें / సమస్యను ఎంచుకోండి
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedProblem} onValueChange={setSelectedProblem}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose the issue you're facing..." />
              </SelectTrigger>
              <SelectContent>
                {currentSector.problems.map((problem) => (
                  <SelectItem key={problem.id} value={problem.id}>
                    {problem.title} ({problem.titleTelugu})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Solutions Display */}
        {selectedProblemData && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-village-green-800 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Available Solutions / उपलब्ध समाधान / అందుబాటులో ఉన్న పరిష్కారాలు
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedProblemData.solutions.map((solution, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Badge className="bg-village-green-100 text-village-green-800">
                      {index + 1}
                    </Badge>
                    <span className="text-gray-700">{solution}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Officer */}
        {selectedProblemData && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-village-green-800 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Contact Officer / संपर्क अधिकारी / సంప్రదింపు అధికారి
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Name:</strong> {selectedProblemData.officer.name}</p>
                <p><strong>Designation:</strong> {selectedProblemData.officer.designation}</p>
                <p><strong>Phone:</strong> 
                  <a href={`tel:${selectedProblemData.officer.phone}`} 
                     className="text-village-green-600 hover:text-village-green-800 ml-2">
                    {selectedProblemData.officer.phone}
                  </a>
                </p>
                <p><strong>Email:</strong> 
                  <a href={`mailto:${selectedProblemData.officer.email}`} 
                     className="text-village-green-600 hover:text-village-green-800 ml-2">
                    {selectedProblemData.officer.email}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-village-green-800 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Submit Request / अनुरोध भेजें / అభ్యర్థన సమర్పించండి
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number / संपर्क नंबर / సంప్రదింపు నంబర్ *
              </label>
              <Input
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Enter your mobile number"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Describe Your Issue / अपनी समस्या बताएं / మీ సమస్యను వివరించండి *
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe your problem in detail..."
                rows={4}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Documents / दस्तावेज़ अपलोड करें / పత్రాలను అప్‌లోడ్ చేయండి
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-village-green-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload photos or documents
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Max file size: 5MB (JPG, PNG, PDF)
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                onClick={handleSubmit}
                className="bg-village-green-600 hover:bg-village-green-700 text-white flex-1"
              >
                Submit Application / आवेदन भेजें / దరఖాస్తు సమర్పించండి
              </Button>
              <Button 
                variant="outline" 
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                Lodge Complaint / शिकायत दर्ज करें / ఫిర్యాదు నమోదు చేయండి
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SectorPage;

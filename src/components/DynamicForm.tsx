import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import DocumentUpload from './DocumentUpload';

interface DynamicFormProps {
  sector: string;
  problemType: string;
  onSubmit: () => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ sector, problemType, onSubmit }) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [documents, setDocuments] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFormFields = () => {
    const commonFields = [
      { name: 'fullName', type: 'text', required: true },
      { name: 'phoneNumber', type: 'tel', required: true },
      { name: 'email', type: 'email', required: false },
      { name: 'description', type: 'textarea', required: true }
    ];

    const sectorSpecificFields: Record<string, any[]> = {
      agriculture: [
        { name: 'landArea', type: 'number', required: true },
        { name: 'cropType', type: 'text', required: false },
        { name: 'surveyNumber', type: 'text', required: false }
      ],
      roads: [
        { name: 'location', type: 'text', required: true },
        { name: 'roadType', type: 'select', options: ['Main Road', 'Village Road', 'Highway'], required: true },
        { name: 'urgencyLevel', type: 'select', options: ['Low', 'Medium', 'High'], required: true }
      ],
      health: [
        { name: 'patientAge', type: 'number', required: false },
        { name: 'hospitalName', type: 'text', required: false },
        { name: 'urgencyLevel', type: 'select', options: ['Low', 'Medium', 'High', 'Emergency'], required: true }
      ],
      education: [
        { name: 'studentName', type: 'text', required: false },
        { name: 'schoolName', type: 'text', required: false },
        { name: 'class', type: 'text', required: false },
        { name: 'academicYear', type: 'text', required: false }
      ],
      electricity: [
        { name: 'consumerNumber', type: 'text', required: false },
        { name: 'location', type: 'text', required: true },
        { name: 'issueType', type: 'select', options: ['Power Cut', 'Billing', 'Connection', 'Repair'], required: true }
      ],
      employment: [
        { name: 'jobCardNumber', type: 'text', required: false },
        { name: 'skillArea', type: 'text', required: false },
        { name: 'workType', type: 'select', options: ['NREGA', 'Skill Training', 'Self Employment', 'Other'], required: false }
      ],
      housing: [
        { name: 'plotNumber', type: 'text', required: false },
        { name: 'constructionType', type: 'select', options: ['New Construction', 'Renovation', 'Repair'], required: false },
        { name: 'familySize', type: 'number', required: false }
      ],
      welfare: [
        { name: 'beneficiaryName', type: 'text', required: false },
        { name: 'beneficiaryAge', type: 'number', required: false },
        { name: 'serviceType', type: 'select', options: ['Pension', 'Anganwadi', 'Maternity', 'Child Care'], required: false }
      ]
    };

    return [...commonFields, ...(sectorSpecificFields[sector] || [])];
  };

  const getFieldLabel = (fieldName: string) => {
    const labels: Record<string, any> = {
      fullName: {
        te: 'పూర్తి పేరు',
        hi: 'पूरा नाम',
        en: 'Full Name'
      },
      phoneNumber: {
        te: 'ఫోన్ నంబర్',
        hi: 'फोन नंबर',
        en: 'Phone Number'
      },
      email: {
        te: 'ఇమెయిల్',
        hi: 'ईमेल',
        en: 'Email'
      },
      description: {
        te: 'వివరణ',
        hi: 'विवरण',
        en: 'Description'
      },
      landArea: {
        te: 'భూమి విస్తీర్ణం (ఎకరాలు)',
        hi: 'भूमि क्षेत्र (एकड़)',
        en: 'Land Area (Acres)'
      },
      cropType: {
        te: 'పంట రకం',
        hi: 'फसल का प्रकार',
        en: 'Crop Type'
      },
      surveyNumber: {
        te: 'సర్వే నంబర్',
        hi: 'सर्वे नंबर',
        en: 'Survey Number'
      },
      location: {
        te: 'స్థానం',
        hi: 'स्थान',
        en: 'Location'
      },
      roadType: {
        te: 'రోడ్ రకం',
        hi: 'सड़क का प्रकार',
        en: 'Road Type'
      },
      urgencyLevel: {
        te: 'అత్యవసర స్థాయి',
        hi: 'तत्काल स्तर',
        en: 'Urgency Level'
      },
      patientAge: {
        te: 'రోగి వయస్సు',
        hi: 'मरीज़ की उम्र',
        en: 'Patient Age'
      },
      hospitalName: {
        te: 'ఆసుపత్రి పేరు',
        hi: 'अस्पताल का नाम',
        en: 'Hospital Name'
      },
      studentName: {
        te: 'విద్యార్థి పేరు',
        hi: 'छात्र का नाम',
        en: 'Student Name'
      },
      schoolName: {
        te: 'పాఠశాల పేరు',
        hi: 'स्कूल का नाम',
        en: 'School Name'
      },
      class: {
        te: 'తరగతి',
        hi: 'कक्षा',
        en: 'Class'
      },
      academicYear: {
        te: 'అకాడమిక్ సంవత్సరం',
        hi: 'शैक्षणिक वर्ष',
        en: 'Academic Year'
      },
      consumerNumber: {
        te: 'వినియోగదారు నంబర్',
        hi: 'उपभोक्ता संख्या',
        en: 'Consumer Number'
      },
      issueType: {
        te: 'సమస్య రకం',
        hi: 'समस्या का प्रकार',
        en: 'Issue Type'
      },
      jobCardNumber: {
        te: 'జాబ్ కార్డ్ నంబర్',
        hi: 'जॉब कार्ड नंबर',
        en: 'Job Card Number'
      },
      skillArea: {
        te: 'నైపుణ్య రంగం',
        hi: 'कौशल क्षेत्र',
        en: 'Skill Area'
      },
      workType: {
        te: 'పని రకం',
        hi: 'काम का प्रकार',
        en: 'Work Type'
      },
      plotNumber: {
        te: 'ప్లాట్ నంబర్',
        hi: 'प्लॉट नंबर',
        en: 'Plot Number'
      },
      constructionType: {
        te: 'నిర్మాణ రకం',
        hi: 'निर्माण प्रकार',
        en: 'Construction Type'
      },
      familySize: {
        te: 'కుటుంబ సభ్యుల సంఖ్య',
        hi: 'परिवार का आकार',
        en: 'Family Size'
      },
      beneficiaryName: {
        te: 'లబ్ధిదారు పేరు',
        hi: 'लाभार्थी का नाम',
        en: 'Beneficiary Name'
      },
      beneficiaryAge: {
        te: 'లబ్ధిదారు వయస్సు',
        hi: 'लाभार्थी की उम्र',
        en: 'Beneficiary Age'
      },
      serviceType: {
        te: 'సేవ రకం',
        hi: 'सेवा का प्रकार',
        en: 'Service Type'
      }
    };
    return labels[fieldName]?.[language] || fieldName;
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getTableName = (sector: string) => {
    const tableMap: Record<string, string> = {
      agriculture: 'agriculture_requests',
      roads: 'roads_infrastructure_requests',
      health: 'health_requests',
      education: 'education_requests',
      electricity: 'electricity_requests',
      employment: 'employment_requests',
      housing: 'housing_requests',
      welfare: 'welfare_requests'
    };
    return tableMap[sector] || 'citizen_requests';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const tableName = getTableName(sector);
      
      // Prepare data based on sector
      const requestData: any = {
        user_id: user.id,
        name: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email || null,
        problem_type: problemType,
        description: formData.description,
        documents: documents,
        status: 'pending'
      };

      // Add sector-specific fields
      if (sector === 'agriculture') {
        requestData.land_area = formData.landArea;
        requestData.crop_type = formData.cropType;
        requestData.survey_number = formData.surveyNumber;
        requestData.location = formData.location;
      } else if (sector === 'roads') {
        requestData.location = formData.location;
        requestData.road_type = formData.roadType;
        requestData.urgency_level = formData.urgencyLevel;
      } else if (sector === 'health') {
        requestData.patient_age = formData.patientAge;
        requestData.hospital_name = formData.hospitalName;
        requestData.urgency_level = formData.urgencyLevel;
      } else if (sector === 'education') {
        requestData.student_name = formData.studentName;
        requestData.school_name = formData.schoolName;
        requestData.class = formData.class;
        requestData.academic_year = formData.academicYear;
      } else if (sector === 'electricity') {
        requestData.consumer_number = formData.consumerNumber;
        requestData.location = formData.location;
        requestData.issue_type = formData.issueType;
      } else if (sector === 'employment') {
        requestData.job_card_number = formData.jobCardNumber;
        requestData.skill_area = formData.skillArea;
        requestData.work_type = formData.workType;
      } else if (sector === 'housing') {
        requestData.plot_number = formData.plotNumber;
        requestData.construction_type = formData.constructionType;
        requestData.family_size = formData.familySize;
      } else if (sector === 'welfare') {
        requestData.beneficiary_name = formData.beneficiaryName;
        requestData.beneficiary_age = formData.beneficiaryAge;
        requestData.service_type = formData.serviceType;
      }

      const { error } = await supabase
        .from(tableName)
        .insert(requestData);

      if (error) throw error;

      toast({
        title: language === 'te' ? 'విజయవంతం!' : language === 'hi' ? 'सफल!' : 'Success!',
        description: language === 'te' ? 'మీ అభ్యర్థన విజయవంతంగా సమర్పించబడింది.' : 
                    language === 'hi' ? 'आपका अनुरोध सफलतापूर्वक सबमिट किया गया।' : 
                    'Your request has been submitted successfully.',
      });

      onSubmit();
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: language === 'te' ? 'లోపం' : language === 'hi' ? 'त्रुटि' : 'Error',
        description: language === 'te' ? 'అభ్యర్థన సమర్పించడంలో లోపం. దయచేసి మళ్లీ ప్రయత్నించండి.' : 
                    language === 'hi' ? 'अनुरोध सबमिट करने में त्रुटि। कृपया पुनः प्रयास करें।' : 
                    'Error submitting request. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            placeholder={`${language === 'te' ? 'దయచేసి వివరంగా వివరించండి...' : 
                         language === 'hi' ? 'कृपया विस्तार से बताएं...' : 
                         'Please describe in detail...'}`}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            rows={4}
          />
        );
      case 'select':
        return (
          <Select value={formData[field.name] || ''} onValueChange={(value) => handleInputChange(field.name, value)}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'te' ? 'ఎంచుకోండి...' : language === 'hi' ? 'चुनें...' : 'Select...'} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            type={field.type}
            placeholder={getFieldLabel(field.name)}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-blue-800 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          {language === 'te' ? 'అభ్యర్థన వివరాలు' : language === 'hi' ? 'अनुरोध विवरण' : 'Request Details'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {getFormFields().map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getFieldLabel(field.name)} {field.required && <span className="text-red-500">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}

          <DocumentUpload 
            documents={documents}
            onDocumentsChange={setDocuments}
          />

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? 
              (language === 'te' ? 'సమర్పిస్తోంది...' : language === 'hi' ? 'सबमिट कर रहे हैं...' : 'Submitting...') :
              (language === 'te' ? 'అభ్యర్థన సమర్పించండి' : language === 'hi' ? 'अनुरोध सबमिट करें' : 'Submit Request')
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DynamicForm;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText, Image } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DocumentUploadProps {
  onDocumentsChange: (documents: string[]) => void;
  documents: string[];
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onDocumentsChange, documents }) => {
  const [uploading, setUploading] = useState(false);
  const { language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !user) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: language === 'te' ? 'లోపం' : language === 'hi' ? 'त्रुटि' : 'Error',
            description: language === 'te' ? 'ఫైల్ పరిమాణం 5MB కంటే తక్కువగా ఉండాలి' : 
                        language === 'hi' ? 'फाइल का आकार 5MB से कम होना चाहिए' : 
                        'File size must be less than 5MB',
            variant: 'destructive'
          });
          continue;
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
          toast({
            title: language === 'te' ? 'లోపం' : language === 'hi' ? 'त्रुटि' : 'Error',
            description: language === 'te' ? 'కేవలం JPG, PNG, PDF ఫైల్‌లు మాత్రమే అనుమతించబడతాయి' : 
                        language === 'hi' ? 'केवल JPG, PNG, PDF फाइलें स्वीकार की जाती हैं' : 
                        'Only JPG, PNG, PDF files are allowed',
            variant: 'destructive'
          });
          continue;
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from('documents')
          .upload(fileName, file);

        if (error) {
          throw error;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrl);
      }

      const newDocuments = [...documents, ...uploadedUrls];
      onDocumentsChange(newDocuments);

      toast({
        title: language === 'te' ? 'విజయవంతం!' : language === 'hi' ? 'सफल!' : 'Success!',
        description: language === 'te' ? 'పత్రాలు విజయవంతంగా అప్‌లోడ్ చేయబడ్డాయి' : 
                    language === 'hi' ? 'दस्तावेज़ सफलतापूर्वक अपलोड किए गए' : 
                    'Documents uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      toast({
        title: language === 'te' ? 'లోపం' : language === 'hi' ? 'त्रुटि' : 'Error',
        description: language === 'te' ? 'పత్రాలు అప్‌లోడ్ చేయడంలో లోపం' : 
                    language === 'hi' ? 'दस्तावेज़ अपलोड करने में त्रुटि' : 
                    'Error uploading documents',
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };

  const removeDocument = (index: number) => {
    const newDocuments = documents.filter((_, i) => i !== index);
    onDocumentsChange(newDocuments);
  };

  const getFileIcon = (url: string) => {
    if (url.includes('.pdf')) {
      return <FileText className="w-4 h-4" />;
    }
    return <Image className="w-4 h-4" />;
  };

  const getFileName = (url: string) => {
    return url.split('/').pop() || 'Document';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {language === 'te' ? 'సహాయక పత్రాలు' : language === 'hi' ? 'सहायक दस्तावेज़' : 'Supporting Documents'}
      </label>
      
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors mb-4">
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 mb-2">
          {language === 'te' ? 'ఫైల్స్ అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి లేదా డ్రాగ్ & డ్రాప్ చేయండి' : 
           language === 'hi' ? 'फाइलें अपलोड करने के लिए क्लिक करें या ड्रैग एंड ड्रॉप करें' : 
           'Click to upload files or drag and drop'}
        </p>
        <p className="text-xs text-gray-500 mb-4">
          {language === 'te' ? 'గరిష్ట ఫైల్ పరిమాణం: 5MB (JPG, PNG, PDF)' : 
           language === 'hi' ? 'अधिकतम फाइल आकार: 5MB (JPG, PNG, PDF)' : 
           'Max file size: 5MB (JPG, PNG, PDF)'}
        </p>
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
          id="file-upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('file-upload')?.click()}
          disabled={uploading}
          className="border-blue-300 text-blue-700 hover:bg-blue-50"
        >
          {uploading ? 
            (language === 'te' ? 'అప్‌లోడ్ అవుతోంది...' : language === 'hi' ? 'अपलोड हो रहा है...' : 'Uploading...') :
            (language === 'te' ? 'ఫైల్‌లను ఎంచుకోండి' : language === 'hi' ? 'फाइलें चुनें' : 'Choose Files')
          }
        </Button>
      </div>

      {/* Uploaded Documents List */}
      {documents.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">
            {language === 'te' ? 'అప్‌లోడ్ చేసిన పత్రాలు:' : 
             language === 'hi' ? 'अपलोड किए गए दस्तावेज़:' : 
             'Uploaded Documents:'}
          </p>
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
              <div className="flex items-center space-x-2">
                {getFileIcon(doc)}
                <span className="text-sm text-gray-700 truncate max-w-xs">
                  {getFileName(doc)}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeDocument(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;

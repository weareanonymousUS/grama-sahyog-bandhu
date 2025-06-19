
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([]);
  const [inputText, setInputText] = useState('');
  const { t, language } = useLanguage();

  const botResponses = {
    agriculture: {
      en: "For agriculture schemes, you can apply for PM-KISAN, Soil Health Card, and Crop Insurance. Which one interests you?",
      hi: "कृषि योजनाओं के लिए, आप पीएम-किसान, मिट्टी स्वास्थ्य कार्ड, और फसल बीमा के लिए आवेदन कर सकते हैं। कौन सी योजना में आपकी रुचि है?",
      te: "వ్యవసాయ పథకాల కోసం, మీరు PM-KISAN, మట్టి ఆరోగ్య కార్డ్, మరియు పంట బీమా కోసం దరఖాస్తు చేసుకోవచ్చు. ఏది మీకు ఆసక్తిగా ఉంది?"
    },
    education: {
      en: "For education support, you can access scholarships, mid-day meal schemes, and digital learning programs. Would you like details on any specific program?",
      hi: "शिक्षा सहायता के लिए, आप छात्रवृत्ति, मध्याह्न भोजन योजना, और डिजिटल शिक्षा कार्यक्रमों का उपयोग कर सकते हैं। क्या आप किसी विशिष्ट कार्यक्रम के बारे में जानकारी चाहते हैं?",
      te: "విద్యా సహాయం కోసం, మీరు స్కాలర్‌షిప్‌లు, మధ్యాహ్న భోజన పథకాలు, మరియు డిజిటల్ లెర్నింగ్ ప్రోగ్రామ్‌లను యాక్సెస్ చేయవచ్చు. ఏదైనా నిర్దిష్ట ప్రోగ్రామ్ గురించి వివరాలు కావాలా?"
    },
    health: {
      en: "Health services include Ayushman Bharat, vaccination programs, and maternal health schemes. Which health service do you need help with?",
      hi: "स्वास्थ्य सेवाओं में आयुष्मान भारत, टीकाकरण कार्यक्रम, और मातृ स्वास्थ्य योजनाएं शामिल हैं। आपको किस स्वास्थ्य सेवा में सहायता चाहिए?",
      te: "ఆరోగ్య సేవలలో ఆయుష్మాన్ భారత్, వ్యాక్సినేషన్ ప్రోగ్రామ్‌లు, మరియు మాతృ ఆరోగ్య పథకాలు ఉన్నాయి. మీకు ఏ ఆరోగ్య సేవలో సహాయం కావాలి?"
    },
    default: {
      en: "I can help you with government schemes, application processes, grievance filing, and more. What would you like to know?",
      hi: "मैं सरकारी योजनाओं, आवेदन प्रक्रियाओं, शिकायत दर्ज करने और अन्य विषयों में आपकी मदद कर सकता हूँ। आप क्या जानना चाहते हैं?",
      te: "నేను ప్రభుత్వ పథకాలు, దరఖాస్తు ప్రక్రియలు, ఫిర్యాదు దాఖలు మరియు మరిన్నింటిలో మీకు సహాయం చేయగలను. మీరు ఏమి తెలుసుకోవాలని అనుకుంటున్నారు?"
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessages = [...messages, { text: inputText, isBot: false }];
    setMessages(newMessages);

    // Simple bot logic with improved keyword detection
    setTimeout(() => {
      let response;
      const lowerInput = inputText.toLowerCase();
      
      if (lowerInput.includes('agriculture') || lowerInput.includes('వ్యవసాయ') || lowerInput.includes('कृषि') || 
          lowerInput.includes('farming') || lowerInput.includes('crop') || lowerInput.includes('farmer')) {
        response = botResponses.agriculture[language];
      } else if (lowerInput.includes('education') || lowerInput.includes('విద్య') || lowerInput.includes('शिक्षा') ||
                 lowerInput.includes('school') || lowerInput.includes('scholarship') || lowerInput.includes('study')) {
        response = botResponses.education[language];
      } else if (lowerInput.includes('health') || lowerInput.includes('ఆరోగ্য') || lowerInput.includes('स्वास्थ्य') ||
                 lowerInput.includes('hospital') || lowerInput.includes('medical') || lowerInput.includes('doctor')) {
        response = botResponses.health[language];
      } else {
        response = botResponses.default[language];
      }
      
      setMessages([...newMessages, { text: response, isBot: true }]);
    }, 1000);

    setInputText('');
  };

  const initChat = () => {
    if (messages.length === 0) {
      setMessages([{ text: t('helpMessage'), isBot: true }]);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => {
          setIsOpen(true);
          initChat();
        }}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-village-green-500 hover:bg-village-green-600 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-village-green-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">{t('helpTitle')}</h3>
            <Button
              onClick={() => setIsOpen(false)}
              size="icon"
              variant="ghost"
              className="text-white hover:bg-village-green-600 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-village-green-500 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={language === 'te' ? 'మీ సందేశం టైప్ చేయండి...' : 
                          language === 'hi' ? 'अपना संदेश टाइप करें...' : 
                          'Type your message...'}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon" className="bg-village-green-500 hover:bg-village-green-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

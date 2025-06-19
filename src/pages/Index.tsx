
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Wheat, 
  Car, 
  Heart, 
  GraduationCap, 
  Zap, 
  Briefcase, 
  Home, 
  Users, 
  Phone 
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const sectors = [
    {
      id: "agriculture",
      title: "Agriculture",
      titleTelugu: "వ్యవసాయం",
      icon: Wheat,
      color: "bg-village-green-100 hover:bg-village-green-200",
      iconColor: "text-village-green-700"
    },
    {
      id: "roads",
      title: "Roads & Infrastructure",
      titleTelugu: "రోడ్లు మరియు మౌలిక సదుపాయాలు",
      icon: Car,
      color: "bg-earth-beige-100 hover:bg-earth-beige-200",
      iconColor: "text-earth-beige-700"
    },
    {
      id: "health",
      title: "Health",
      titleTelugu: "ఆరోగ్యం",
      icon: Heart,
      color: "bg-red-100 hover:bg-red-200",
      iconColor: "text-red-700"
    },
    {
      id: "education",
      title: "Education",
      titleTelugu: "విద్య",
      icon: GraduationCap,
      color: "bg-blue-100 hover:bg-blue-200",
      iconColor: "text-blue-700"
    },
    {
      id: "electricity",
      title: "Electricity",
      titleTelugu: "విద్యుత్",
      icon: Zap,
      color: "bg-yellow-100 hover:bg-yellow-200",
      iconColor: "text-yellow-700"
    },
    {
      id: "employment",
      title: "Employment",
      titleTelugu: "ఉపాధి",
      icon: Briefcase,
      color: "bg-purple-100 hover:bg-purple-200",
      iconColor: "text-purple-700"
    },
    {
      id: "housing",
      title: "Housing",
      titleTelugu: "గృహనిర్మాణం",
      icon: Home,
      color: "bg-orange-100 hover:bg-orange-200",
      iconColor: "text-orange-700"
    },
    {
      id: "women-child",
      title: "Women & Child Welfare",
      titleTelugu: "మహిళలు మరియు పిల్లల కల్యాణం",
      icon: Users,
      color: "bg-pink-100 hover:bg-pink-200",
      iconColor: "text-pink-700"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-village-green-50 to-earth-beige-50 font-noto">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-village-green-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-village-green-600 rounded-full flex items-center justify-center">
                <Wheat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-village-green-800">Grama Sphoorthi</h1>
                <p className="text-sm text-village-green-600">గ్రామ స్ఫూర్తి</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-village-green-300 text-village-green-700">
              తెలుగు
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-village-green-800 mb-4 leading-tight">
            Empowering Villages.<br />
            Direct Government Support.<br />
            <span className="text-earth-beige-700">No Middlemen.</span>
          </h2>
          <p className="text-lg md:text-xl text-village-green-700 mb-2">
            గ్రామాలను శక్తివంతం చేయడం. ప్రత్యక్ష ప్రభుత్వ మద్దతు. మధ్యవర్తులు లేరు.
          </p>
          <p className="text-base md:text-lg text-village-green-600 mb-8">
            Direct access to government schemes, file grievances, and request services across 8 key sectors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-village-green-600 hover:bg-village-green-700 text-white px-8 py-3 text-lg">
              Get Started
            </Button>
            <Button variant="outline" className="border-village-green-300 text-village-green-700 px-8 py-3 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Helpline: 181
            </Button>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-village-green-800 mb-2">
            Choose Your Sector
          </h3>
          <p className="text-center text-village-green-600 mb-8">
            మీ రంగాన్ని ఎంచుకోండి
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sectors.map((sector) => {
              const IconComponent = sector.icon;
              return (
                <Card 
                  key={sector.id}
                  className={`${sector.color} border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105`}
                  onClick={() => navigate(`/sector/${sector.id}`)}
                >
                  <CardContent className="p-6 text-center">
                    <IconComponent className={`w-12 h-12 ${sector.iconColor} mx-auto mb-4`} />
                    <h4 className="font-semibold text-gray-800 mb-1">{sector.title}</h4>
                    <p className="text-sm text-gray-600">{sector.titleTelugu}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-3xl font-bold text-village-green-600">500+</h4>
              <p className="text-village-green-700">Villages Connected</p>
              <p className="text-sm text-village-green-600">అనుసంధానించబడిన గ్రామాలు</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-earth-beige-600">1000+</h4>
              <p className="text-village-green-700">Applications Processed</p>
              <p className="text-sm text-village-green-600">ప్రాసెస్ చేయబడిన దరఖాస్తులు</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-village-green-600">24/7</h4>
              <p className="text-village-green-700">Support Available</p>
              <p className="text-sm text-village-green-600">మద్దతు అందుబాటులో</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-village-green-800 text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="font-semibold mb-3">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-village-green-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-village-green-200">Terms of Service</a></li>
                <li><a href="#" className="hover:text-village-green-200">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Helpline Numbers</h5>
              <ul className="space-y-2 text-sm">
                <li>General: 181</li>
                <li>Agriculture: 1800-425-1551</li>
                <li>Health: 104</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Government of Telangana</h5>
              <p className="text-sm text-village-green-200">
                An initiative to bring government services directly to the people
              </p>
            </div>
          </div>
          <div className="border-t border-village-green-700 mt-8 pt-4 text-center text-sm">
            <p>&copy; 2024 Grama Sphoorthi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

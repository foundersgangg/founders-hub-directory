
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import CompanyCard from "@/components/CompanyCard";

// Mock data for companies
const companies = [
  {
    id: 1,
    name: "TechFlow",
    slug: "techflow",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center",
    description: "AI-powered workflow automation for modern businesses",
    industry: "AI & Automation",
    funding: "$2.5M",
    founded: "2023"
  },
  {
    id: 2,
    name: "GreenSpace",
    slug: "greenspace",
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=100&fit=crop&crop=center",
    description: "Sustainable urban farming solutions for smart cities",
    industry: "AgTech",
    funding: "$1.8M",
    founded: "2022"
  },
  {
    id: 3,
    name: "DataBridge",
    slug: "databridge",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center",
    description: "Real-time data analytics platform for enterprise",
    industry: "Data Analytics",
    funding: "$5.2M",
    founded: "2021"
  },
  {
    id: 4,
    name: "HealthConnect",
    slug: "healthconnect",
    logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop&crop=center",
    description: "Telemedicine platform connecting patients with specialists",
    industry: "HealthTech",
    funding: "$3.1M",
    founded: "2023"
  },
  {
    id: 5,
    name: "EduPath",
    slug: "edupath",
    logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop&crop=center",
    description: "Personalized learning platform powered by AI",
    industry: "EdTech",
    funding: "$1.5M",
    founded: "2022"
  },
  {
    id: 6,
    name: "FinSecure",
    slug: "finsecure",
    logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop&crop=center",
    description: "Next-generation cybersecurity for financial institutions",
    industry: "FinTech",
    funding: "$4.7M",
    founded: "2021"
  }
];

const Companies = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-black">
              Founders Gang
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/companies" className="text-black font-medium">
                Companies
              </Link>
              <Link to="/founders" className="text-black hover:text-gray-600 transition-colors">
                Founders
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-black">
              Startup Directory
            </h1>
            <p className="text-xl text-gray-600">
              Discover innovative companies that are reshaping industries and building the future.
            </p>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Companies;

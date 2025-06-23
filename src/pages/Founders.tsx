
import { Link } from "react-router-dom";
import FounderCard from "@/components/FounderCard";

// Mock data for founders
const founders = [
  {
    id: 1,
    name: "Sarah Chen",
    slug: "sarah-chen",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop&crop=center",
    title: "CEO & Co-founder",
    company: "TechFlow",
    companySlug: "techflow",
    bio: "Former Google engineer turned entrepreneur, passionate about AI automation",
    location: "San Francisco, CA",
    twitter: "sarahchen",
    linkedin: "sarahchen"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    slug: "marcus-rodriguez",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=center",
    title: "Founder & CEO",
    company: "GreenSpace",
    companySlug: "greenspace",
    bio: "Agricultural scientist building sustainable farming solutions for urban environments",
    location: "Austin, TX",
    twitter: "marcusrod",
    linkedin: "marcusrodriguez"
  },
  {
    id: 3,
    name: "Priya Patel",
    slug: "priya-patel",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=center",
    title: "Co-founder & CTO",
    company: "DataBridge",
    companySlug: "databridge",
    bio: "MIT graduate specializing in real-time data processing and machine learning",
    location: "Boston, MA",
    twitter: "priyapatel",
    linkedin: "priyapatel"
  },
  {
    id: 4,
    name: "David Kim",
    slug: "david-kim",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center",
    title: "Founder & CEO",
    company: "HealthConnect",
    companySlug: "healthconnect",
    bio: "Healthcare entrepreneur focused on making quality medical care accessible worldwide",
    location: "Seattle, WA",
    twitter: "davidkim",
    linkedin: "davidkim"
  }
];

const Founders = () => {
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
              <Link to="/companies" className="text-black hover:text-gray-600 transition-colors">
                Companies
              </Link>
              <Link to="/founders" className="text-black font-medium">
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
              Founder Directory
            </h1>
            <p className="text-xl text-gray-600">
              Meet the visionary entrepreneurs who are building the companies of tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {founders.map((founder) => (
              <FounderCard key={founder.id} founder={founder} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Founders;

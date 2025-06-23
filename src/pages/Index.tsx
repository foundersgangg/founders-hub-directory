
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import CompanyCard from "@/components/CompanyCard";
import FounderCard from "@/components/FounderCard";

const Index = () => {
  // Sample data for 6 startups
  const featuredStartups = [
    {
      id: 1,
      name: "TechFlow",
      slug: "techflow",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center",
      description: "Revolutionizing workflow automation with AI-powered solutions for modern businesses.",
      industry: "AI/ML",
      funding: "$2.5M",
      founded: "2023"
    },
    {
      id: 2,
      name: "GreenTech Solutions",
      slug: "greentech-solutions",
      logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center",
      description: "Sustainable energy solutions for a cleaner tomorrow through innovative solar technology.",
      industry: "CleanTech",
      funding: "$5.2M",
      founded: "2022"
    },
    {
      id: 3,
      name: "HealthAI",
      slug: "healthai",
      logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center",
      description: "AI-driven healthcare diagnostics making medical analysis faster and more accurate.",
      industry: "HealthTech",
      funding: "$8.1M",
      founded: "2021"
    },
    {
      id: 4,
      name: "FinanceFlow",
      slug: "financeflow",
      logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop&crop=center",
      description: "Streamlining financial operations for SMEs with intelligent automation and insights.",
      industry: "FinTech",
      funding: "$3.7M",
      founded: "2022"
    },
    {
      id: 5,
      name: "EduNext",
      slug: "edunext",
      logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop&crop=center",
      description: "Personalized learning experiences powered by adaptive AI technology for students.",
      industry: "EdTech",
      funding: "$4.3M",
      founded: "2023"
    },
    {
      id: 6,
      name: "SpaceVenture",
      slug: "spaceventure",
      logo: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=100&h=100&fit=crop&crop=center",
      description: "Making space technology accessible through innovative satellite solutions and services.",
      industry: "SpaceTech",
      funding: "$12.5M",
      founded: "2020"
    }
  ];

  // Sample data for 6 founders
  const featuredFounders = [
    {
      id: 1,
      name: "Sarah Chen",
      slug: "sarah-chen",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b372?w=150&h=150&fit=crop&crop=face",
      title: "CEO & Co-founder",
      company: "TechFlow",
      companySlug: "techflow",
      bio: "Former Google engineer with 10+ years in AI/ML. Passionate about democratizing automation.",
      location: "San Francisco, CA",
      twitter: "@sarahchen",
      linkedin: "sarah-chen"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      slug: "marcus-rodriguez",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      title: "Founder & CTO",
      company: "GreenTech Solutions",
      companySlug: "greentech-solutions",
      bio: "MIT graduate specializing in renewable energy systems and sustainable technology development.",
      location: "Austin, TX",
      twitter: "@marcusrod",
      linkedin: "marcus-rodriguez"
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      slug: "dr-emily-watson",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=150&h=150&fit=crop&crop=face",
      title: "CEO & Founder",
      company: "HealthAI",
      companySlug: "healthai",
      bio: "Former Johns Hopkins researcher with expertise in medical AI and diagnostic technologies.",
      location: "Boston, MA",
      twitter: "@dremilywatson",
      linkedin: "emily-watson-md"
    },
    {
      id: 4,
      name: "David Kim",
      slug: "david-kim",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      title: "Co-founder & CEO",
      company: "FinanceFlow",
      companySlug: "financeflow",
      bio: "Ex-Goldman Sachs analyst building the future of SME financial management and automation.",
      location: "New York, NY",
      twitter: "@davidkim",
      linkedin: "david-kim-fintech"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      slug: "lisa-thompson",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      title: "Founder & Chief Learning Officer",
      company: "EduNext",
      companySlug: "edunext",
      bio: "Former Stanford education researcher passionate about personalized learning and AI in education.",
      location: "Palo Alto, CA",
      twitter: "@lisathompson",
      linkedin: "lisa-thompson-edu"
    },
    {
      id: 6,
      name: "Alex Petrov",
      slug: "alex-petrov",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      title: "CEO & Founder",
      company: "SpaceVenture",
      companySlug: "spaceventure",
      bio: "Former SpaceX engineer with a vision to make space technology accessible to everyone.",
      location: "Los Angeles, CA",
      twitter: "@alexpetrov",
      linkedin: "alex-petrov-space"
    }
  ];

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
              <Link to="/founders" className="text-black hover:text-gray-600 transition-colors">
                Founders
              </Link>
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
                  Discover the Future of
                  <span className="block">Startups</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Explore innovative startups and meet the visionary founders who are reshaping industries and building tomorrow's solutions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/companies">
                  <Button size="lg" className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto">
                    Browse Startups
                  </Button>
                </Link>
                <Link to="/founders">
                  <Button variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white w-full sm:w-auto">
                    Meet Founders
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://msyaxvyhyyyejcinomls.supabase.co/storage/v1/object/public/images/uploads/1750703539887-4l3lsi.jpg"
                  alt="Founders Gang Community"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Startups Section */}
      <section className="py-16 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Featured Startups</h2>
            <p className="text-gray-600 text-lg">Discover innovative companies shaping the future</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredStartups.map((startup) => (
              <CompanyCard key={startup.id} company={startup} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/companies">
              <Button variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white">
                View All Startups
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Founders Section */}
      <section className="py-16 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Featured Founders</h2>
            <p className="text-gray-600 text-lg">Meet the visionaries building tomorrow's solutions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredFounders.map((founder) => (
              <FounderCard key={founder.id} founder={founder} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/founders">
              <Button variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white">
                View All Founders
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Join the Founders Gang Community
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Connect with innovative founders, discover groundbreaking startups, and be part of the entrepreneurial revolution. Whether you're building the next unicorn or looking to invest in the future, our community is where opportunities meet ambition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 w-full sm:w-auto">
                Join Community
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black w-full sm:w-auto">
                Submit Your Startup
              </Button>
            </div>
            <div className="flex justify-center mt-8">
              <ArrowDown className="w-6 h-6 text-gray-400 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-black">
              Ready to explore the startup ecosystem?
            </h2>
            <p className="text-gray-600 text-lg">
              Join thousands of entrepreneurs, investors, and innovators discovering the next big thing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

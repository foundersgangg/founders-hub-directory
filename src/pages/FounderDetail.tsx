
import { useParams, Link } from "react-router-dom";
import { Twitter, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - in real app this would come from API
const founderData: { [key: string]: any } = {
  "sarah-chen": {
    name: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop&crop=center",
    title: "CEO & Co-founder",
    company: "TechFlow",
    companySlug: "techflow",
    location: "San Francisco, CA",
    twitter: "sarahchen",
    linkedin: "sarahchen",
    website: "https://sarahchen.dev",
    bio: "Sarah is a former Google engineer turned entrepreneur with a passion for AI automation. She holds a Master's degree in Computer Science from Stanford and has over 8 years of experience in machine learning and distributed systems.",
    background: "Before founding TechFlow, Sarah led the automation team at Google Cloud, where she helped enterprise clients reduce operational overhead by 40% on average. Her work on predictive scaling algorithms has been cited in over 50 research papers. She's also an active angel investor, having backed 15 early-stage startups in the AI and automation space.",
    achievements: [
      "Forbes 30 Under 30 in Enterprise Technology (2023)",
      "Winner of TechCrunch Disrupt Startup Battlefield (2023)",
      "Published 12 research papers on distributed systems",
      "Angel investor in 15+ AI startups"
    ],
    previousExperience: [
      {
        company: "Google",
        role: "Senior Software Engineer",
        duration: "2019-2023",
        description: "Led automation initiatives for Google Cloud Platform"
      },
      {
        company: "Stripe",
        role: "Software Engineer",
        duration: "2017-2019", 
        description: "Built fraud detection systems using machine learning"
      }
    ]
  }
};

const FounderDetail = () => {
  const { slug } = useParams();
  const founder = founderData[slug as string];

  if (!founder) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Founder not found</h1>
          <Link to="/founders">
            <Button>Back to Founders</Button>
          </Link>
        </div>
      </div>
    );
  }

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
            </div>
          </div>
        </div>
      </nav>

      {/* Founder Header */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                <img 
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-black mb-2">{founder.name}</h1>
                  <p className="text-xl text-gray-600 mb-2">{founder.title}</p>
                  <Link to={`/company/${founder.companySlug}`} className="text-lg text-black hover:text-gray-600 transition-colors font-medium">
                    {founder.company}
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>{founder.location}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{founder.bio}</p>
                <div className="flex gap-4">
                  <Button className="bg-black text-white hover:bg-gray-800">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Website
                  </Button>
                  <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Details */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-black mb-4">Background</h2>
                <p className="text-gray-600 leading-relaxed">{founder.background}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-black mb-4">Previous Experience</h3>
                <div className="space-y-4">
                  {founder.previousExperience.map((exp: any, index: number) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-black">{exp.role}</h4>
                        <span className="text-sm text-gray-600">{exp.duration}</span>
                      </div>
                      <div className="text-gray-800 mb-2">{exp.company}</div>
                      <p className="text-gray-600 text-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-bold text-black mb-4">Achievements</h3>
                <ul className="space-y-2">
                  {founder.achievements.map((achievement: string, index: number) => (
                    <li key={index} className="text-gray-600 text-sm">
                      • {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-bold text-black mb-4">Current Company</h3>
                <Link to={`/company/${founder.companySlug}`} className="block group">
                  <div className="text-center">
                    <div className="font-semibold text-black group-hover:text-gray-600 transition-colors mb-1">
                      {founder.company}
                    </div>
                    <div className="text-sm text-gray-600">{founder.title}</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FounderDetail;

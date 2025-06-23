
import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
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
                Submit Startup
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

      {/* Stats Section */}
      <section className="py-16 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-black">500+</div>
              <div className="text-gray-600">Startups Listed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-black">200+</div>
              <div className="text-gray-600">Founders Profiled</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-black">$2B+</div>
              <div className="text-gray-600">Total Funding</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-black">
              Ready to explore the startup ecosystem?
            </h2>
            <p className="text-gray-600 text-lg">
              Join thousands of entrepreneurs, investors, and innovators discovering the next big thing.
            </p>
            <div className="flex justify-center">
              <ArrowDown className="w-6 h-6 text-gray-400 animate-bounce" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

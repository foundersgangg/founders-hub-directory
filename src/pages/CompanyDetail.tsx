
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowUp, Twitter, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const CompanyDetail = () => {
  const { slug } = useParams();
  const [company, setCompany] = useState<any>(null);
  const [founder, setFounder] = useState<any>(null);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchCompany(slug);
    }
  }, [slug]);

  const fetchCompany = async (companySlug: string) => {
    setLoading(true);
    setError(null);
    
    // Fetch company data
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .select('*')
      .eq('slug', companySlug)
      .single();

    if (companyError) {
      console.error('Error fetching company:', companyError);
      setError('Company not found');
      setLoading(false);
      return;
    }

    setCompany(companyData);

    // Fetch company metrics
    const { data: metricsData } = await supabase
      .from('company_metrics')
      .select('*')
      .eq('company_id', companyData.id);

    if (metricsData) {
      setMetrics(metricsData);
    }

    // Fetch founder for this company
    const { data: founderData } = await supabase
      .from('founders')
      .select('*')
      .eq('company_slug', companySlug)
      .single();

    if (founderData) {
      setFounder(founderData);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading company...</p>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Company not found</h1>
          <Link to="/companies">
            <Button>Back to Companies</Button>
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

      {/* Company Header */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                <img 
                  src={company.logo || "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop&crop=center"}
                  alt={`${company.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-black mb-2">{company.name}</h1>
                  <p className="text-xl text-gray-600">{company.description}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <span className="px-3 py-1 bg-gray-100 text-black rounded-full text-sm">
                    {company.industry}
                  </span>
                  {company.funding && (
                    <span className="px-3 py-1 bg-gray-100 text-black rounded-full text-sm">
                      {company.funding} raised
                    </span>
                  )}
                  {company.founded && (
                    <span className="px-3 py-1 bg-gray-100 text-black rounded-full text-sm">
                      Founded {company.founded}
                    </span>
                  )}
                </div>
                <div className="flex gap-4">
                  {company.website && (
                    <Button className="bg-black text-white hover:bg-gray-800">
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Visit Website
                    </Button>
                  )}
                  {company.twitter && (
                    <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                      <Twitter className="w-4 h-4 mr-2" />
                      Follow
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {company.about && (
                <div>
                  <h2 className="text-2xl font-bold text-black mb-4">About {company.name}</h2>
                  <p className="text-gray-600 leading-relaxed">{company.about}</p>
                </div>
              )}
              
              {metrics.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-black mb-4">Key Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {metrics.map((metric: any, index: number) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="text-2xl font-bold text-black">{metric.value}</div>
                        <div className="text-sm text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-bold text-black mb-4">Company Details</h3>
                <div className="space-y-3">
                  {company.location && (
                    <div>
                      <span className="text-sm text-gray-600">Location</span>
                      <div className="font-medium text-black">{company.location}</div>
                    </div>
                  )}
                  {company.employees && (
                    <div>
                      <span className="text-sm text-gray-600">Team Size</span>
                      <div className="font-medium text-black">{company.employees}</div>
                    </div>
                  )}
                  {company.founded && (
                    <div>
                      <span className="text-sm text-gray-600">Founded</span>
                      <div className="font-medium text-black">{company.founded}</div>
                    </div>
                  )}
                  {company.funding && (
                    <div>
                      <span className="text-sm text-gray-600">Funding</span>
                      <div className="font-medium text-black">{company.funding}</div>
                    </div>
                  )}
                </div>
              </div>

              {founder && (
                <div className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="text-lg font-bold text-black mb-4">Founder</h3>
                  <Link to={`/founder/${founder.slug}`} className="block group">
                    <div className="flex items-center gap-3">
                      <img 
                        src={founder.image || "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=center"}
                        alt={founder.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-black group-hover:text-gray-600 transition-colors">
                          {founder.name}
                        </div>
                        <div className="text-sm text-gray-600">{founder.title}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyDetail;


import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Twitter, Link as LinkIcon } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const FounderDetail = () => {
  const { slug } = useParams();
  const [founder, setFounder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchFounder(slug);
    }
  }, [slug]);

  const fetchFounder = async (founderSlug: string) => {
    setLoading(true);
    setError(null);
    
    const { data, error } = await supabase
      .from('founders')
      .select('*')
      .eq('slug', founderSlug)
      .single();

    if (error) {
      console.error('Error fetching founder:', error);
      setError('Founder not found');
    } else {
      setFounder(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Helmet>
          <title>Loading Founder | Founders Gang</title>
          <meta name="description" content="Loading founder information..." />
        </Helmet>
        <div className="text-center">
          <p className="text-gray-600">Loading founder...</p>
        </div>
      </div>
    );
  }

  if (error || !founder) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Helmet>
          <title>Founder Not Found | Founders Gang</title>
          <meta name="description" content="The requested founder could not be found." />
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="text-center">
          <h1 className="text-2xl font-dream font-bold text-black mb-4">Founder not found</h1>
          <Link to="/founders">
            <Button>Back to Founders</Button>
          </Link>
        </div>
      </div>
    );
  }

  const founderImage = founder.image || "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=1200&h=630&fit=crop&crop=center";
  const currentUrl = `${window.location.origin}/founder/${founder.slug}`;
  const founderTitle = `${founder.name} - ${founder.title}${founder.company ? ` at ${founder.company}` : ''} | Founders Gang`;
  const founderDescription = `Meet ${founder.name}, ${founder.title}${founder.company ? ` at ${founder.company}` : ''}. ${founder.bio || ''}${founder.location ? ` Based in ${founder.location}.` : ''} ${founder.background ? founder.background.substring(0, 100) + '...' : ''}`;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{founderTitle}</title>
        <meta name="description" content={founderDescription} />
        <meta name="keywords" content={`${founder.name}, founder, entrepreneur, startup founder, ${founder.company || ''}, founders gang, ${founder.location || ''}, ${founder.title}`} />
        <link rel="canonical" href={currentUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={founderTitle} />
        <meta property="og:description" content={founderDescription} />
        <meta property="og:image" content={founderImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={`${founder.name} - Founder Profile`} />
        <meta property="og:site_name" content="Founders Gang" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@foundersgang" />
        <meta name="twitter:creator" content={founder.twitter ? `@${founder.twitter.replace('@', '')}` : "@foundersgang"} />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={founderTitle} />
        <meta name="twitter:description" content={founderDescription} />
        <meta name="twitter:image" content={founderImage} />
        <meta name="twitter:image:alt" content={`${founder.name} - Founder Profile`} />
        
        {/* Additional SEO tags */}
        <meta name="author" content={`${founder.name}, Founders Gang`} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="theme-color" content="#000000" />
        <meta property="profile:first_name" content={founder.name.split(' ')[0]} />
        <meta property="profile:last_name" content={founder.name.split(' ').slice(1).join(' ')} />
        {founder.website && <link rel="alternate" href={founder.website} />}
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": founder.name,
            "jobTitle": founder.title,
            "description": founder.bio || founder.background,
            "url": founder.website || currentUrl,
            "image": founderImage,
            "worksFor": founder.company ? {
              "@type": "Organization",
              "name": founder.company
            } : undefined,
            "address": founder.location ? {
              "@type": "PostalAddress",
              "addressLocality": founder.location
            } : undefined,
            "sameAs": [
              founder.twitter && `https://twitter.com/${founder.twitter.replace('@', '')}`,
              founder.linkedin && founder.linkedin,
              founder.website
            ].filter(Boolean)
          })}
        </script>
      </Helmet>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-dream font-bold text-black">
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
                  src={founder.image || "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop&crop=center"}
                  alt={founder.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-4xl font-dream font-bold text-black mb-2">{founder.name}</h1>
                  <p className="text-xl text-gray-600 mb-2">{founder.title}</p>
                  {founder.company && founder.company_slug && (
                    <Link to={`/company/${founder.company_slug}`} className="text-lg text-black hover:text-gray-600 transition-colors font-medium">
                      {founder.company}
                    </Link>
                  )}
                </div>
                {founder.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>{founder.location}</span>
                  </div>
                )}
                {founder.bio && (
                  <p className="text-gray-600 leading-relaxed">{founder.bio}</p>
                )}
                <div className="flex gap-4">
                  {founder.website && (
                    <Button className="bg-black text-white hover:bg-gray-800">
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Website
                    </Button>
                  )}
                  {founder.twitter && (
                    <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                  )}
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
              {founder.background && (
                <div>
                  <h2 className="text-2xl font-dream font-bold text-black mb-4">Background</h2>
                  <p className="text-gray-600 leading-relaxed">{founder.background}</p>
                </div>
              )}
              
              {founder.previous_experience && Array.isArray(founder.previous_experience) && founder.previous_experience.length > 0 && (
                <div>
                  <h3 className="text-xl font-dream font-bold text-black mb-4">Previous Experience</h3>
                  <div className="space-y-4">
                    {founder.previous_experience.map((exp: any, index: number) => (
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
              )}
            </div>

            <div className="space-y-8">
              {founder.achievements && founder.achievements.length > 0 && (
                <div className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="text-lg font-dream font-bold text-black mb-4">Achievements</h3>
                  <ul className="space-y-2">
                    {founder.achievements.map((achievement: string, index: number) => (
                      <li key={index} className="text-gray-600 text-sm">
                        • {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {founder.company && founder.company_slug && (
                <div className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="text-lg font-dream font-bold text-black mb-4">Current Company</h3>
                  <Link to={`/company/${founder.company_slug}`} className="block group">
                    <div className="text-center">
                      <div className="font-semibold text-black group-hover:text-gray-600 transition-colors mb-1">
                        {founder.company}
                      </div>
                      <div className="text-sm text-gray-600">{founder.title}</div>
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

export default FounderDetail;

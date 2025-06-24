
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CompanyCard from "@/components/CompanyCard";
import AddCompanyForm from "@/components/AddCompanyForm";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Companies = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setCompanies(data);
    }
    setLoading(false);
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    fetchCompanies();
  };

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-white">
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

        <div className="pt-32 pb-16">
          <div className="container mx-auto px-6">
            <AddCompanyForm 
              onSuccess={handleAddSuccess} 
              onCancel={() => setShowAddForm(false)} 
            />
          </div>
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
            <div className="flex items-center justify-center gap-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-black">
                Startup Directory
              </h1>
              {isAdmin && (
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Startup
                </Button>
              )}
            </div>
            <p className="text-xl text-gray-600">
              Discover innovative companies that are reshaping industries and building the future.
            </p>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading companies...</p>
            </div>
          ) : companies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No companies found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Companies;

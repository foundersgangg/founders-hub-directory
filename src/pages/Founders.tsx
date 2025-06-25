
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import FounderCard from "@/components/FounderCard";
import AddFounderForm from "@/components/AddFounderForm";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Founders = () => {
  const [founders, setFounders] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchFounders();
  }, []);

  const fetchFounders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('founders')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setFounders(data);
    }
    setLoading(false);
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    fetchFounders();
  };

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-white">
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
                <Link to="/founders" className="text-black font-medium">
                  Founders
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-32 pb-16">
          <div className="container mx-auto px-6">
            <AddFounderForm 
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
            <Link to="/" className="text-2xl font-dream font-bold text-black">
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
            <div className="flex items-center justify-center gap-4">
              <h1 className="text-4xl lg:text-5xl font-dream font-bold text-black">
                Founder Directory
              </h1>
              {isAdmin && (
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Founder
                </Button>
              )}
            </div>
            <p className="text-xl text-gray-600">
              Meet the visionary entrepreneurs who are building the companies of tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading founders...</p>
            </div>
          ) : founders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No founders found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {founders.map((founder) => (
                <FounderCard key={founder.id} founder={founder} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Founders;

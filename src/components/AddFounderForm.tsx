
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AddFounderFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddFounderForm = ({ onSuccess, onCancel }: AddFounderFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    image: '',
    title: '',
    company: '',
    company_slug: '',
    bio: '',
    location: '',
    twitter: '',
    linkedin: '',
    website: '',
    background: '',
  });
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const { data } = await supabase
      .from('companies')
      .select('name, slug')
      .order('name');
    
    if (data) {
      setCompanies(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('founders')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Founder added successfully",
      });
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' && { slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })
    }));
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompany = companies.find(c => c.name === e.target.value);
    setFormData(prev => ({
      ...prev,
      company: e.target.value,
      company_slug: selectedCompany?.slug || '',
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Founder</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug *</label>
              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="e.g. CEO & Founder"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <select
              name="company"
              value={formData.company}
              onChange={handleCompanyChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company.slug} value={company.name}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Twitter</label>
              <input
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <input
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Background</label>
            <textarea
              name="background"
              value={formData.background}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md h-24"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Adding...' : 'Add Founder'}
            </Button>
            <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddFounderForm;

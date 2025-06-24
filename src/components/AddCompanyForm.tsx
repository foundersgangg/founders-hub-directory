
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AddCompanyFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddCompanyForm = ({ onSuccess, onCancel }: AddCompanyFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    logo: '',
    description: '',
    industry: '',
    funding: '',
    founded: '',
    employees: '',
    location: '',
    website: '',
    twitter: '',
    about: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('companies')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Company added successfully",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' && { slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Company</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name *</label>
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
            <label className="block text-sm font-medium mb-1">Logo URL</label>
            <input
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md h-24"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Industry *</label>
              <input
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Funding</label>
              <input
                name="funding"
                value={formData.funding}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Founded</label>
              <input
                name="founded"
                value={formData.founded}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Employees</label>
              <input
                name="employees"
                value={formData.employees}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <input
                name="website"
                value={formData.website}
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

          <div>
            <label className="block text-sm font-medium mb-1">About</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md h-24"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Adding...' : 'Add Company'}
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

export default AddCompanyForm;

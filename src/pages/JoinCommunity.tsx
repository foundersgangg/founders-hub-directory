
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const JoinCommunity = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    founderName: "",
    email: "",
    phone: "",
    cityState: "",
    startupName: "",
    startupDescription: "",
    startupStage: "",
    website: "",
    teamSize: "",
    lookingFor: [] as string[]
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      lookingFor: checked 
        ? [...prev.lookingFor, value]
        : prev.lookingFor.filter(item => item !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Application Submitted!",
      description: "Thank you for joining the Founders Gang community. We'll be in touch soon!",
    });
  };

  const lookingForOptions = [
    "Feedback",
    "Co-founders or teammates", 
    "Mentorship",
    "Early users",
    "Investors",
    "Networking",
    "Nothing right now"
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
              <Link to="/join">
                <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Form Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">Join Founders Gang</h1>
            <p className="text-gray-600 text-lg">
              Connect with like-minded entrepreneurs and grow your startup
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="founderName">Founder Name</Label>
              <Input
                id="founderName"
                type="text"
                value={formData.founderName}
                onChange={(e) => handleInputChange("founderName", e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number (WhatsApp preferred)</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="cityState">City & State</Label>
              <Input
                id="cityState"
                type="text"
                value={formData.cityState}
                onChange={(e) => handleInputChange("cityState", e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="startupName">Startup Name</Label>
              <Input
                id="startupName"
                type="text"
                value={formData.startupName}
                onChange={(e) => handleInputChange("startupName", e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="startupDescription">What does your startup do?</Label>
              <Textarea
                id="startupDescription"
                value={formData.startupDescription}
                onChange={(e) => handleInputChange("startupDescription", e.target.value)}
                required
                className="mt-1"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="startupStage">What stage is your startup currently in?</Label>
              <Select value={formData.startupStage} onValueChange={(value) => handleInputChange("startupStage", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select startup stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea Stage</SelectItem>
                  <SelectItem value="prototype">Prototype/MVP Ready</SelectItem>
                  <SelectItem value="launched">Launched (Getting Users)</SelectItem>
                  <SelectItem value="revenue">Revenue-Generating</SelectItem>
                  <SelectItem value="funded">Funded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="website">Startup Website or Social Media (if any)</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="mt-1"
                placeholder="https://"
              />
            </div>

            <div>
              <Label htmlFor="teamSize">How many people are on your team (including you)?</Label>
              <Input
                id="teamSize"
                type="number"
                value={formData.teamSize}
                onChange={(e) => handleInputChange("teamSize", e.target.value)}
                required
                className="mt-1"
                min="1"
              />
            </div>

            <div>
              <Label>What are you looking for right now?</Label>
              <div className="mt-2 space-y-3">
                {lookingForOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={formData.lookingFor.includes(option)}
                      onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                    />
                    <Label htmlFor={option} className="text-sm font-normal">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-black text-white hover:bg-gray-800"
              size="lg"
            >
              Join Community
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default JoinCommunity;

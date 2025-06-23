
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";

interface Founder {
  id: number;
  name: string;
  slug: string;
  image: string;
  title: string;
  company: string;
  companySlug: string;
  bio: string;
  location: string;
  twitter: string;
  linkedin: string;
}

interface FounderCardProps {
  founder: Founder;
}

const FounderCard = ({ founder }: FounderCardProps) => {
  return (
    <Link to={`/founder/${founder.slug}`} className="group block">
      <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="text-center mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 shadow-sm">
            <img 
              src={founder.image}
              alt={founder.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-black group-hover:text-gray-700 transition-colors">
                {founder.name}
              </h3>
            </div>
            <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors transform group-hover:-translate-y-1 rotate-45" />
          </div>
          <p className="text-sm text-gray-600 mb-1">{founder.title}</p>
          <Link 
            to={`/company/${founder.companySlug}`} 
            className="text-sm text-black hover:text-gray-600 transition-colors font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            {founder.company}
          </Link>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
          {founder.bio}
        </p>
        
        <div className="text-xs text-gray-500 text-center">
          {founder.location}
        </div>
      </div>
    </Link>
  );
};

export default FounderCard;

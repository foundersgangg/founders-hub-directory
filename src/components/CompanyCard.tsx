
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";

interface Company {
  id: number;
  name: string;
  slug: string;
  logo: string;
  description: string;
  industry: string;
  funding: string;
  founded: string;
}

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <Link to={`/company/${company.slug}`} className="group block">
      <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
            <img 
              src={company.logo}
              alt={`${company.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-black group-hover:text-gray-700 transition-colors mb-1">
              {company.name}
            </h3>
            <span className="text-sm text-gray-600 px-2 py-1 bg-gray-100 rounded-full">
              {company.industry}
            </span>
          </div>
          <ArrowUp className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors transform group-hover:-translate-y-1 rotate-45" />
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {company.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{company.funding} raised</span>
          <span>Founded {company.founded}</span>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;

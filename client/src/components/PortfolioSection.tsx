import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  projectUrl: string;
};

type ApiResponse = {
  success: boolean;
  data: PortfolioItem[];
};

const PortfolioSection = () => {
  const { data: portfolioData, isLoading } = useQuery<ApiResponse>({
    queryKey: ['/api/cms/content/portfolio'],
    refetchOnWindowFocus: false
  });
  
  // Use portfolio data from API
  const portfolioItems = portfolioData?.data || [];

  return (
    <section id="portfolio" className="py-16 bg-gray-50 dark:bg-gray-900 transition-all">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our Portfolio</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Explore our latest projects and successful implementations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <div key={index} className="portfolio-item group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-primary bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a 
                    href={item.projectUrl} 
                    className="bg-white text-primary px-4 py-2 rounded-md flex items-center font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project <ExternalLink size={16} className="ml-2" />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="bg-gray-100 border border-primary/30 dark:bg-gray-800 dark:border-primary/50 text-primary font-medium text-xs px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      {tag === "Mobile App" && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                      {tag === "UI/UX" && <span className="w-2 h-2 rounded-full bg-purple-500"></span>}
                      {tag === "React Native" && <span className="w-2 h-2 rounded-full bg-cyan-500"></span>}
                      {tag === "Web App" && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                      {tag === "Mobile" && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                      {tag === "Cloud Solution" && <span className="w-2 h-2 rounded-full bg-indigo-500"></span>}
                      {tag === "Dashboard" && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                      {tag === "FinTech" && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                      {tag === "Accounting" && <span className="w-2 h-2 rounded-full bg-yellow-500"></span>}
                      {tag === "POS" && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                      {tag === "Retail" && <span className="w-2 h-2 rounded-full bg-orange-500"></span>}
                      {tag === "EdTech" && <span className="w-2 h-2 rounded-full bg-teal-500"></span>}
                      {tag === "Assessment" && <span className="w-2 h-2 rounded-full bg-pink-500"></span>}
                      {tag === "Cloud Platform" && <span className="w-2 h-2 rounded-full bg-violet-500"></span>}
                      {!["Mobile App", "UI/UX", "React Native", "Web App", "Mobile", "Cloud Solution", 
                        "Dashboard", "FinTech", "Accounting", "POS", "Retail", "EdTech", 
                        "Assessment", "Cloud Platform"].includes(tag) && 
                        <span className="w-2 h-2 rounded-full bg-gray-500"></span>}
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
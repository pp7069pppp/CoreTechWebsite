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
  data: {
    data: PortfolioItem[];
  };
};

const PortfolioSection = () => {
  const { data: portfolioData, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ['/api/cms/content/portfolio'],
    refetchOnWindowFocus: false
  });

  // Default portfolio items as fallback
  const defaultPortfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "luvr",
      description: "A modern dating application connecting like-minded individuals through advanced matching algorithms.",
      imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Mobile App", "UI/UX", "React Native"],
      projectUrl: "#"
    },
    {
      id: 2,
      title: "SplitBuddy",
      description: "Expense sharing application that makes it easy to split bills with friends and track shared expenses.",
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Web App", "Mobile App", "FinTech"],
      projectUrl: "#"
    },
    {
      id: 3,
      title: "ezHisab",
      description: "Comprehensive accounting solution for small businesses with inventory and financial management.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Web App", "Accounting", "Dashboard"],
      projectUrl: "#"
    },
    {
      id: 4,
      title: "ezPOS",
      description: "Point of sale system designed for retail businesses with inventory and sales tracking capabilities.",
      imageUrl: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["POS", "Retail", "Cloud Solution"],
      projectUrl: "#"
    },
    {
      id: 5,
      title: "ezExam",
      description: "Online examination platform for educational institutions with automated grading and reporting features.",
      imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["EdTech", "Assessment", "Cloud Platform"],
      projectUrl: "#"
    }
  ];
  
  // Use portfolio data from API if available, otherwise use defaults
  const portfolioItems = Array.isArray(portfolioData?.data?.data) 
    ? portfolioData.data.data 
    : defaultPortfolioItems;

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
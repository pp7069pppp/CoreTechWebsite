import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

// Define Hero content type
type HeroContent = {
  heading: string;
  subheading: string;
};

// Define API response type
type ApiResponse = {
  success: boolean;
  data: HeroContent;
};

const HeroSection = () => {
  // Default content in case API data isn't available
  const defaultHero = {
    heading: "Innovative Solutions for Tomorrow's Challenges",
    subheading: "CoreTech delivers cutting-edge technology solutions that transform how businesses operate in the digital landscape."
  };
  
  // Fetch hero content from API
  const { data: heroData, isLoading } = useQuery<ApiResponse>({
    queryKey: ['/api/cms/content/hero'],
    refetchOnWindowFocus: false
  });
  
  // Use content from API if available, otherwise use defaults
  const heroContent = heroData?.data || defaultHero;
  
  // Split the heading to style part of it with primary color
  const headingParts = heroContent.heading.split(' ');
  const firstPart = headingParts.slice(0, Math.floor(headingParts.length * 0.6)).join(' ');
  const secondPart = headingParts.slice(Math.floor(headingParts.length * 0.6)).join(' ');
  
  return (
    <section id="home" className="pt-28 pb-16 md:pt-40 md:pb-20 transition-all relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
            {firstPart}{' '}
            <span className="text-primary">{secondPart}</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
            {heroContent.subheading}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <a href="#services" className="px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-blue-700 transition-all flex items-center justify-center">
              Explore Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="#contact" className="px-8 py-3 bg-white dark:bg-gray-800 text-primary dark:text-white border border-primary font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              Contact Us
            </a>
          </div>
        </div>
      </div>
      
      {/* Hero Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1] opacity-[0.04] dark:opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1531297484001-80022131f5a1')] bg-cover bg-center"></div>
      </div>
    </section>
  );
};

export default HeroSection;

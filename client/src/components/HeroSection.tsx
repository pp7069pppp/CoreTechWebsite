import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="pt-28 pb-16 md:pt-40 md:pb-20 transition-all relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
            Innovative Solutions for 
            <span className="text-primary"> Tomorrow's Challenges</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
            CoreTech delivers cutting-edge technology solutions that transform how businesses operate in the digital landscape.
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

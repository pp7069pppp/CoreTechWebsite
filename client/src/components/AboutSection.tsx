import { useQuery } from "@tanstack/react-query";

// Define About content type
type Stat = {
  value: string;
  label: string;
};

type AboutContent = {
  title: string;
  description1: string;
  description2: string;
  stats: Stat[];
  imageUrl: string;
};

// Define API response type
type ApiResponse = {
  success: boolean;
  data: AboutContent;
};

const AboutSection = () => {
  // Default content
  const defaultAbout: AboutContent = {
    title: "About CoreTech",
    description1: "Founded in 2010, CoreTech has been at the forefront of technology innovation, helping businesses navigate the complex digital landscape.",
    description2: "Our mission is to empower organizations through technology, providing solutions that drive efficiency, growth, and competitive advantage.",
    stats: [
      { value: "200+", label: "Projects Completed" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "50+", label: "Expert Team Members" },
      { value: "12+", label: "Years of Excellence" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  };

  // Fetch about content from API
  const { data: aboutData, isLoading } = useQuery<ApiResponse>({
    queryKey: ['/api/cms/content/about'],
    refetchOnWindowFocus: false
  });
  
  // Use content from API if available, otherwise use defaults
  const aboutContent = aboutData?.data || defaultAbout;

  return (
    <section id="about" className="py-16 bg-gray-50 dark:bg-gray-900 transition-all">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{aboutContent.title}</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <p className="text-lg">
              {aboutContent.description1}
            </p>
            <p className="text-lg">
              {aboutContent.description2}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {aboutContent.stats.map((stat, index) => (
                <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-primary">{stat.value}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative">
              <img 
                src={aboutContent.imageUrl} 
                alt="CoreTech office building" 
                className="rounded-lg shadow-lg object-cover w-full h-[400px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold">Innovation is our core value</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

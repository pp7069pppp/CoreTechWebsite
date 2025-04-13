const AboutSection = () => {
  // Stats data
  const stats = [
    { value: "200+", label: "Projects Completed" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Expert Team Members" },
    { value: "12+", label: "Years of Excellence" },
  ];

  return (
    <section id="about" className="py-16 bg-gray-50 dark:bg-gray-900 transition-all">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">About CoreTech</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <p className="text-lg">
              Founded in 2010, CoreTech has been at the forefront of technology innovation, helping businesses navigate the complex digital landscape.
            </p>
            <p className="text-lg">
              Our mission is to empower organizations through technology, providing solutions that drive efficiency, growth, and competitive advantage.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, index) => (
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
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
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

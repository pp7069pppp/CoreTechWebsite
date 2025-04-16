import { Laptop, Smartphone, Cloud, Lock, LineChart, Bot } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: <Laptop className="text-white w-8 h-8" />,
      title: "Custom Software Development",
      description: "Tailored solutions designed to address your specific business challenges and opportunities."
    },
    {
      icon: <Smartphone className="text-white w-8 h-8" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that engage users and drive business growth."
    },
    {
      icon: <Cloud className="text-white w-8 h-8" />,
      title: "Cloud Solutions",
      description: "Secure, scalable cloud infrastructure and migration services to optimize your operations."
    },
    {
      icon: <Lock className="text-white w-8 h-8" />,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your business from evolving digital threats."
    },
    {
      icon: <LineChart className="text-white w-8 h-8" />,
      title: "Data Analytics",
      description: "Transform raw data into actionable insights that drive informed business decisions."
    },
    {
      icon: <Bot className="text-white w-8 h-8" />,
      title: "AI & Machine Learning",
      description: "Innovative AI solutions that automate processes and uncover new business opportunities."
    }
  ];

  return (
    <section id="services" className="py-16 transition-all">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            We provide comprehensive technology solutions tailored to your business needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="service-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
              <div className="p-1 bg-primary"></div>
              <div className="p-6">
                <div className="relative mb-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/60 to-primary shadow-lg rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <div className="text-white w-8 h-8">
                      {service.icon}
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-gray-900 rounded-full border-2 border-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

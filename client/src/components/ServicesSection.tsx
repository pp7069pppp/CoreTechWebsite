import { Laptop, Smartphone, Cloud, Lock, LineChart, Bot } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: <Laptop className="text-primary text-xl" />,
      title: "Custom Software Development",
      description: "Tailored solutions designed to address your specific business challenges and opportunities."
    },
    {
      icon: <Smartphone className="text-primary text-xl" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that engage users and drive business growth."
    },
    {
      icon: <Cloud className="text-primary text-xl" />,
      title: "Cloud Solutions",
      description: "Secure, scalable cloud infrastructure and migration services to optimize your operations."
    },
    {
      icon: <Lock className="text-primary text-xl" />,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your business from evolving digital threats."
    },
    {
      icon: <LineChart className="text-primary text-xl" />,
      title: "Data Analytics",
      description: "Transform raw data into actionable insights that drive informed business decisions."
    },
    {
      icon: <Bot className="text-primary text-xl" />,
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
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
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

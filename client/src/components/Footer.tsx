import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type ContactInfo = {
  address: string;
  email: string;
  phone: string;
  socialLinks: {
    type: string;
    url: string;
  }[];
};

type ApiResponse = {
  success: boolean;
  data: ContactInfo;
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const { data: contactData } = useQuery<ApiResponse>({
    queryKey: ['/api/cms/content/contact'],
    refetchOnWindowFocus: false
  });

  const contactInfo = contactData?.data;

  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  return (
    <footer className="bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800 transition-all">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <a href="#" className="flex items-center space-x-2 mb-6">
              <span className="text-primary text-2xl font-bold">CoreTech</span>
            </a>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Innovative technology solutions for businesses of all sizes.
            </p>
            <div className="flex space-x-4">
              {contactInfo?.socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all"
                >
                  {getSocialIcon(link.type)}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#home" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">Home</a></li>
              <li><a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">About</a></li>
              <li><a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">Services</a></li>
              <li><a href="#portfolio" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">Portfolio</a></li>
              <li><a href="#team" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">Team</a></li>
              <li><a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-4">
              <li><a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">Software Development</a></li>
              <li><a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">Mobile Apps</a></li>
              <li><a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">Cloud Solutions</a></li>
              <li><a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">Cybersecurity</a></li>
              <li><a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">Data Analytics</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-primary" />
                <span className="text-gray-600 dark:text-gray-300">{contactInfo?.address}</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-1 text-primary" />
                <a href={`mailto:${contactInfo?.email}`} className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">{contactInfo?.email}</a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-1 text-primary" />
                <a href={`tel:${contactInfo?.phone}`} className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">{contactInfo?.phone}</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300">
            &copy; {currentYear} CoreTech. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all text-sm">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
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
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="#home" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">Home</a></li>
              <li><a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">About</a></li>
              <li><a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">Services</a></li>
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
                <span className="text-gray-600 dark:text-gray-300">123 Tech Street, San Francisco, CA 94107</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-1 text-primary" />
                <a href="mailto:info@coretech.com" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">info@coretech.com</a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-1 text-primary" />
                <a href="tel:+14155550123" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all">+1 (415) 555-0123</a>
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

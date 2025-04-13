import { useState, useEffect } from "react";
import { useTheme } from "./ui/theme-provider";
import { Moon, Sun, Menu, X } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 z-50 transition-all ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="#" className="flex items-center space-x-2">
              <span className="text-primary text-3xl font-bold">CoreTech</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="nav-link text-sm font-medium hover:text-primary transition-all">Home</a>
            <a href="#about" className="nav-link text-sm font-medium hover:text-primary transition-all">About</a>
            <a href="#services" className="nav-link text-sm font-medium hover:text-primary transition-all">Services</a>
            <a href="#team" className="nav-link text-sm font-medium hover:text-primary transition-all">Team</a>
            <a href="#contact" className="nav-link text-sm font-medium hover:text-primary transition-all">Contact</a>
            <button 
              onClick={toggleTheme} 
              className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <nav className={`md:hidden pt-4 pb-6 space-y-4 transition-all animate-fade-in ${isMenuOpen ? 'block' : 'hidden'}`}>
          <a href="#home" onClick={closeMenu} className="block py-2 text-sm font-medium hover:text-primary transition-all">Home</a>
          <a href="#about" onClick={closeMenu} className="block py-2 text-sm font-medium hover:text-primary transition-all">About</a>
          <a href="#services" onClick={closeMenu} className="block py-2 text-sm font-medium hover:text-primary transition-all">Services</a>
          <a href="#team" onClick={closeMenu} className="block py-2 text-sm font-medium hover:text-primary transition-all">Team</a>
          <a href="#contact" onClick={closeMenu} className="block py-2 text-sm font-medium hover:text-primary transition-all">Contact</a>
          <button 
            onClick={toggleTheme}
            className="flex items-center mt-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
            <span className="text-sm">Toggle Theme</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

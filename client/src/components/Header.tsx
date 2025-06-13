import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeSelector } from "./ThemeSelector";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
            <a href="#portfolio" className="nav-link text-sm font-medium hover:text-primary transition-all">Portfolio</a>
            <a href="#team" className="nav-link text-sm font-medium hover:text-primary transition-all">Team</a>
            <a href="#contact" className="nav-link text-sm font-medium hover:text-primary transition-all">Contact</a>
            <ThemeSelector />
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
          <a href="#portfolio" onClick={closeMenu} className="block py-2 text-sm font-medium hover:text-primary transition-all">Portfolio</a>
          <a href="#team" onClick={closeMenu} className="block py-2 text-sm font-medium hover:text-primary transition-all">Team</a>
          <a href="#contact" onClick={closeMenu} className="block py-2 text-sm font-medium hover:text-primary transition-all">Contact</a>
          <div className="pt-2">
            <ThemeSelector />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

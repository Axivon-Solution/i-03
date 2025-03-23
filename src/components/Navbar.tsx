
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Train, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group transition-all duration-300"
          >
            <Train className="h-6 w-6 text-irctc-blue transition-transform duration-500 group-hover:scale-110" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-irctc-blue to-irctc-dark-blue">
              IRCTC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm" className="text-irctc-dark-blue hover:text-irctc-blue">
                <Link to="/profile">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </Button>
              <Button asChild variant="default" size="sm" className="bg-irctc-blue hover:bg-irctc-dark-blue">
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-irctc-dark-blue p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLinks mobile />
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
              <Button asChild variant="ghost" size="sm" className="justify-start text-irctc-dark-blue hover:text-irctc-blue">
                <Link to="/profile">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </Button>
              <Button asChild variant="default" size="sm" className="justify-start bg-irctc-blue hover:bg-irctc-dark-blue">
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// NavLinks component
const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
  const location = useLocation();
  const links = [
    { path: '/', label: 'Home' },
    { path: '/trains', label: 'Trains' },
    { path: '/pnr', label: 'PNR Status' },
    { path: '/bookings', label: 'My Bookings' },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`relative ${
            mobile
              ? 'block py-2'
              : 'inline-block'
          } text-sm font-medium transition-colors duration-200 hover:text-irctc-blue ${
            location.pathname === link.path
              ? 'text-irctc-blue'
              : 'text-irctc-dark-gray'
          }`}
        >
          {link.label}
          {location.pathname === link.path && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-irctc-blue transform origin-bottom scale-x-100 transition-transform" />
          )}
        </Link>
      ))}
    </>
  );
};

export default Navbar;

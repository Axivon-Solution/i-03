
import { useRef, useEffect } from 'react';
import { ArrowRight, Train } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import SearchForm from '@/components/SearchForm';
import { Link } from 'react-router-dom';

const Index = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative h-screen flex items-center overflow-hidden"
      >
        <div 
          ref={parallaxRef}
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1530866495561-507c9faab2ed?q=80&w=2069&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
            transform: 'scale(1.1)'
          }}
        />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-slide-down">
              Book Your Train Journey
              <span className="block text-irctc-light-blue">With Ease</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto animate-slide-down" style={{ animationDelay: '100ms' }}>
              Seamless bookings, real-time updates, and hassle-free travel planning for your next adventure.
            </p>
            
            <div className="pt-8 animate-slide-down" style={{ animationDelay: '200ms' }}>
              <SearchForm />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center cursor-pointer">
            <ArrowRight className="h-5 w-5 text-white transform rotate-90" />
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Service
            </h2>
            <p className="text-lg text-irctc-dark-gray max-w-2xl mx-auto">
              Experience the best way to book train tickets with our intuitive platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-6 rounded-xl transition-all duration-300 hover:shadow-lg animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-irctc-light-blue/30 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-irctc-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-irctc-dark-gray">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Routes */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Routes
            </h2>
            <p className="text-lg text-irctc-dark-gray max-w-2xl mx-auto">
              Explore some of the most popular train journeys across the country
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularRoutes.map((route, index) => (
              <div 
                key={index}
                className="group overflow-hidden rounded-xl shadow-sm animate-on-scroll opacity-0 transition-all duration-300 hover:shadow-md"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={route.image} 
                    alt={route.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-semibold">{route.title}</h3>
                    <p className="text-sm opacity-90">{route.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-irctc-dark-gray">Starting from</p>
                      <p className="text-lg font-semibold">₹{route.price}</p>
                    </div>
                    <Button 
                      asChild
                      size="sm"
                      variant="outline"
                      className="text-irctc-blue border-irctc-blue hover:bg-irctc-light-blue/20"
                    >
                      <Link to={route.link}>
                        Explore
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 animate-on-scroll opacity-0">
            <Button 
              asChild
              variant="default"
              className="bg-irctc-blue hover:bg-irctc-dark-blue"
            >
              <Link to="/trains">
                View All Routes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-irctc-blue to-irctc-dark-blue text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center animate-on-scroll opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Book your tickets now and experience the comfort and convenience of our service
            </p>
            <Button 
              asChild
              size="lg"
              variant="outline" 
              className="text-white border-white hover:bg-white/10"
            >
              <Link to="/trains">
                <Train className="mr-2 h-5 w-5" />
                Book Tickets Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Train className="h-6 w-6 text-irctc-light-blue" />
                <span className="text-xl font-bold text-white">IRCTC</span>
              </div>
              <p className="text-sm opacity-80 max-w-xs">
                The official portal for booking train tickets across India.
                Plan your journey with ease and comfort.
              </p>
            </div>
            
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="text-white font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.href} className="text-sm hover:text-irctc-light-blue transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-70">
              &copy; {new Date().getFullYear()} IRCTC Clone. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 text-sm opacity-70">
              <a href="#" className="hover:text-white mr-4">Terms of Service</a>
              <a href="#" className="hover:text-white mr-4">Privacy Policy</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Static data
const features = [
  {
    icon: require('lucide-react').Shield,
    title: 'Secure Booking',
    description: 'Your security is our priority. All transactions are encrypted and protected.'
  },
  {
    icon: require('lucide-react').Zap,
    title: 'Fast & Easy',
    description: 'Book your tickets in minutes with our streamlined booking process.'
  },
  {
    icon: require('lucide-react').Bell,
    title: 'Real-Time Updates',
    description: 'Get instant notifications about your journey, delays, and platform changes.'
  },
  {
    icon: require('lucide-react').Wallet,
    title: 'Flexible Payments',
    description: 'Multiple payment options for your convenience including UPI, cards, and more.'
  },
  {
    icon: require('lucide-react').Map,
    title: 'Train Tracking',
    description: 'Track your train in real-time and get accurate arrival and departure information.'
  },
  {
    icon: require('lucide-react').UserCheck,
    title: 'Personalized Experience',
    description: 'Get recommendations based on your travel history and preferences.'
  }
];

const popularRoutes = [
  {
    title: 'Delhi to Mumbai',
    description: 'Rajdhani Express',
    image: 'https://images.unsplash.com/photo-1599037302573-4ba8a0c19725?q=80&w=2071&auto=format&fit=crop',
    price: 2255,
    link: '/trains'
  },
  {
    title: 'Delhi to Jaipur',
    description: 'Shatabdi Express',
    image: 'https://images.unsplash.com/photo-1516407658124-7b35d6dd9c4d?q=80&w=2070&auto=format&fit=crop',
    price: 1045,
    link: '/trains'
  },
  {
    title: 'Mumbai to Chennai',
    description: 'Humsafar Express',
    image: 'https://images.unsplash.com/photo-1617653695386-1d78957d33e8?q=80&w=2070&auto=format&fit=crop',
    price: 1595,
    link: '/trains'
  },
  {
    title: 'Delhi to Prayagraj',
    description: 'Vande Bharat Express',
    image: 'https://images.unsplash.com/photo-1580931688131-0201297225c2?q=80&w=2070&auto=format&fit=crop',
    price: 1770,
    link: '/trains'
  },
  {
    title: 'Mumbai to Bengaluru',
    description: 'Tejas Express',
    image: 'https://images.unsplash.com/photo-1499946386204-ac8240df98fe?q=80&w=2070&auto=format&fit=crop',
    price: 1640,
    link: '/trains'
  },
  {
    title: 'Delhi to Prayagraj',
    description: 'Gatimaan Express',
    image: 'https://images.unsplash.com/photo-1531506133007-c40d9ca5f64d?q=80&w=2070&auto=format&fit=crop',
    price: 1085,
    link: '/trains'
  }
];

const footerLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'News', href: '#' },
      { label: 'Contact Us', href: '#' }
    ]
  },
  {
    title: 'Travel Info',
    links: [
      { label: 'Cancellation', href: '#' },
      { label: 'Refunds', href: '#' },
      { label: 'Holiday Packages', href: '#' },
      { label: 'Travel Insurance', href: '#' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'FAQs', href: '#' },
      { label: 'Feedback', href: '#' },
      { label: 'Customer Service', href: '#' }
    ]
  }
];

export default Index;

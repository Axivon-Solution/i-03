
import { ReactNode, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnimatedRouteProps {
  children: ReactNode;
}

const AnimatedRoute = ({ children }: AnimatedRouteProps) => {
  const location = useLocation();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';

    const animationTimeout = setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 50);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [location.pathname]);

  return (
    <div 
      ref={elementRef}
      className="transition-all duration-500 ease-out"
      style={{ opacity: 0, transform: 'translateY(10px)' }}
    >
      {children}
    </div>
  );
};

export default AnimatedRoute;

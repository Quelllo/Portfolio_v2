import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Mail } from 'lucide-react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const navRef = useRef(null);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  // Dark sections that require white text
  const darkSections = ['footer'];

  const checkBackgroundColor = () => {
    if (!navRef.current) return;

    // Get the nav's position
    const navRect = navRef.current.getBoundingClientRect();
    const navCenterY = navRect.top + navRect.height / 2;
    
    // Sample multiple points across the nav bar (10 points for good coverage)
    const samplePoints = 10;
    let darkCount = 0;
    let totalChecked = 0;
    
    for (let i = 0; i < samplePoints; i++) {
      // Calculate x position across the nav bar
      const x = navRect.left + (navRect.width * (i + 1) / (samplePoints + 1));
      const y = navCenterY;
      
      // Get element at this point
      const elementBelow = document.elementFromPoint(x, y);
      
      if (elementBelow) {
        // Walk up the DOM tree to find background color
        let currentElement = elementBelow;
        let foundColor = false;
        
        while (currentElement && currentElement !== document.body && !foundColor) {
          const computedStyle = window.getComputedStyle(currentElement);
          const bgColor = computedStyle.backgroundColor;
          
          // Skip transparent backgrounds
          if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
            currentElement = currentElement.parentElement;
            continue;
          }
          
          // Parse RGB values
          const rgbMatch = bgColor.match(/\d+/g);
          if (rgbMatch && rgbMatch.length >= 3) {
            const r = parseInt(rgbMatch[0]);
            const g = parseInt(rgbMatch[1]);
            const b = parseInt(rgbMatch[2]);
            
            // Calculate luminance (perceived brightness)
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            
            // Count as dark if luminance < 0.4
            if (luminance < 0.4) {
              darkCount++;
            }
            totalChecked++;
            foundColor = true;
          }
          
          currentElement = currentElement.parentElement;
        }
      }
    }
    
    // Only change to dark background if more than 60% of points are dark
    if (totalChecked > 0) {
      const darkPercentage = darkCount / totalChecked;
      setIsDarkBackground(darkPercentage > 0.6);
      return;
    }
    
    // Fallback: Check what section is at the nav's position
    const footer = document.getElementById('footer');
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      // If nav is overlapping with footer (dark section)
      if (navRect.bottom >= footerRect.top && navRect.top <= footerRect.bottom) {
        setIsDarkBackground(true);
        return;
      }
    }

    // Check all sections to see which one the nav is over
    const sections = ['hero', 'about', 'projects', 'contact'];
    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionRect = section.getBoundingClientRect();
        // Check if nav is over this section
        if (navRect.top < sectionRect.bottom && navRect.bottom > sectionRect.top) {
          // All main sections are light, so set to light
          setIsDarkBackground(false);
          return;
        }
      }
    }

    // Check if we're near the bottom of the page (likely over footer)
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // If we're within 150px of the bottom, likely over footer
    if (documentHeight - scrollPosition < 150) {
      setIsDarkBackground(true);
      return;
    }
    
    // Also check if nav is visually near the footer (within 200px)
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const distanceToFooter = footerRect.top - navRect.bottom;
      if (distanceToFooter < 200 && distanceToFooter > -50) {
        setIsDarkBackground(true);
        return;
      }
    }

    // Default to light
    setIsDarkBackground(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(navItems[index].id);
          }
        }
      });

      // Check background color behind nav
      checkBackgroundColor();
    };

    // Initial check
    checkBackgroundColor();
    
    // Check if user is at bottom of page
    const checkBottomOfPage = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const threshold = 100; // Hide when within 100px of bottom
      
      // Hide nav if user is at the bottom of the page
      if (documentHeight - scrollPosition < threshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    
    const scrollHandler = () => {
      handleScroll();
      checkBottomOfPage();
    };
    
    const resizeHandler = () => {
      checkBackgroundColor();
      checkBottomOfPage();
    };
    
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);
    
    // Initial check
    checkBottomOfPage();
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : 100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ 
        duration: isVisible ? (hasAnimated ? 0.3 : 0.6) : 0.3, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: isVisible && !hasAnimated ? 0.5 : 0
      }}
      onAnimationComplete={() => {
        if (isVisible && !hasAnimated) {
          setHasAnimated(true);
        }
      }}
      className={`fixed bottom-8 left-0 right-0 flex justify-center z-50 ${
        isVisible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div className="relative bg-white rounded-full px-6 py-3 border border-gray-200 shadow-lg transition-all duration-300">
        <div className="relative flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : isDarkBackground
                    ? 'text-white hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{
                  color: isActive ? 'white' : isDarkBackground ? 'white' : undefined
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active background */}
                {isActive && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-gradient-to-r from-accent to-purple-500 rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Icon and Label */}
                <div className="relative flex items-center gap-2" style={{
                  color: isActive ? 'white' : isDarkBackground ? 'white' : undefined
                }}>
                  <Icon size={20} style={{
                    color: isActive ? 'white' : isDarkBackground ? 'white' : undefined
                  }} />
                  <span className="text-sm font-medium hidden sm:inline" style={{
                    color: isActive ? 'white' : isDarkBackground ? 'white' : undefined
                  }}>
                    {item.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;


import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const texts = ['UI/UX Designer', 'Graphic Designer', 'Creative Developer'];

  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentIndex < currentText.length) {
          setDisplayText(currentText.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (currentIndex > 0) {
          setDisplayText(currentText.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isDeleting, textIndex]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream dark:bg-charcoal transition-colors duration-500 grid-bg"
    >
      {/* Editorial number background */}
      <div className="editorial-number -right-16 top-24 select-none">01</div>

      {/* Geometric accent elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute top-1/4 left-0 w-2 h-32 bg-orange"
        />
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="absolute bottom-1/4 right-0 w-2 h-48 bg-orange"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute top-1/3 right-1/4 w-64 h-64 border-4 border-orange rotate-45"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Main Text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Overline */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="h-px bg-orange flex-1 max-w-[100px]" />
                <span className="font-mono text-orange text-sm font-bold tracking-widest uppercase">
                  Portfolio 2025
                </span>
              </motion.div>

              {/* Name - Massive Display Type */}
              <motion.h1
                className="font-display text-7xl sm:text-8xl lg:text-9xl font-black text-black-true dark:text-cream mb-6 leading-[0.9]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              >
                Tom<br />
                <span className="text-orange">Konarski</span>
              </motion.h1>

              {/* Typing animation */}
              <motion.div
                className="font-mono text-2xl sm:text-3xl lg:text-4xl text-black-true dark:text-cream mb-6 min-h-[3rem] font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <span className="text-orange">{'>'}</span> {displayText}
                <span className="inline-block w-1 h-8 bg-orange ml-1 animate-pulse" />
              </motion.div>

              {/* Description */}
              <motion.p
                className="font-mono text-base sm:text-lg text-gray-warm max-w-xl mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Crafting beautiful, intuitive digital experiences with a focus on user-centered design and modern web technologies.
              </motion.p>

              {/* CTA Button - Brutalist */}
              <motion.button
                onClick={scrollToAbout}
                className="group brutal-border bg-orange px-10 py-5 font-mono font-bold text-lg uppercase tracking-wide text-cream relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Work
                  <ArrowDown size={20} className="group-hover:translate-y-1 transition-transform" />
                </span>
                {/* Hover effect */}
                <div className="absolute inset-0 bg-orange-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column - Stats/Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="brutal-border bg-cream dark:bg-charcoal p-8"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-gray-warm mb-2">
                Current Status
              </div>
              <div className="font-display text-3xl font-bold text-black-true dark:text-cream">
                Available for Freelance
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange animate-pulse" />
                <span className="font-mono text-sm text-gray-warm">Open to new projects</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="brutal-border bg-black-true dark:bg-cream p-8"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-cream dark:text-black-true mb-2">
                Specialties
              </div>
              <div className="space-y-2">
                <div className="font-mono text-sm text-cream dark:text-black-true flex items-center gap-2">
                  <span className="text-orange">→</span> Frontend Development
                </div>
                <div className="font-mono text-sm text-cream dark:text-black-true flex items-center gap-2">
                  <span className="text-orange">→</span> React & TypeScript
                </div>
                <div className="font-mono text-sm text-cream dark:text-black-true flex items-center gap-2">
                  <span className="text-orange">→</span> Design Systems
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-gray-warm">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-orange" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;


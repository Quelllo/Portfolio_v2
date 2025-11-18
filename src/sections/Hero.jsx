import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const texts = ['UI/UX Designer', 'Graphic Designer'];

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
    }, isDeleting ? 50 : 100); // Faster when deleting

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isDeleting, textIndex]); // texts is constant, safe to ignore

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300"
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            borderRadius: ['30%', '50%', '30%'],
          }}
          transition={{
            opacity: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
            scale: { duration: 20, repeat: Infinity, ease: 'linear' },
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            borderRadius: { duration: 20, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-gradient-to-br from-accent/20 to-purple-300/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            borderRadius: ['40%', '60%', '40%'],
          }}
          transition={{
            opacity: { duration: 1.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] },
            scale: { duration: 25, repeat: Infinity, ease: 'linear' },
            rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
            borderRadius: { duration: 25, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-300/20 to-pink-300/20 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent animated-gradient"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Tom Konarski
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 min-h-[1.5em]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {displayText}
            <span className="animate-pulse">|</span>
          </motion.p>

          <motion.p
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Crafting beautiful, intuitive digital experiences with a focus on user-centered design and modern web technologies.
          </motion.p>

          <motion.button
            onClick={scrollToProjects}
            className="px-8 py-4 bg-accent text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;


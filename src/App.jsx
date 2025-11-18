import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

function App() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="min-h-screen bg-white overflow-x-hidden w-full max-w-full"
      >
        <Navigation />
        
        <main className="overflow-x-hidden w-full max-w-full">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;

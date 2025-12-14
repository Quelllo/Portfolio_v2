import { lazy, Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Contact from './sections/Contact';

// Lazy load Projects section (below the fold, heavy with all project data)
const Projects = lazy(() => import('./sections/Projects'));

// Lazy load 21st dev toolbar (only needed in development, large bundle)
const TwentyFirstToolbar = lazy(() => 
  import('@21st-extension/toolbar-react').then(module => ({ default: module.TwentyFirstToolbar }))
);
const ReactPlugin = lazy(() => 
  import('@21st-extension/react').then(module => ({ default: module.ReactPlugin }))
);

function App() {
  const isDev = import.meta.env.DEV;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="min-h-screen bg-cream dark:bg-charcoal overflow-x-hidden w-full max-w-full transition-colors duration-500"
      >
        {/* Only load dev toolbar in development mode */}
        {isDev && (
          <Suspense fallback={null}>
            <LazyToolbar />
          </Suspense>
        )}
        <Navigation />
        
        <main className="overflow-x-hidden w-full max-w-full">
          <Hero />
          <About />
          <Suspense 
            fallback={
              <section className="relative py-32 bg-black-true dark:bg-black-true">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="h-96 flex items-center justify-center">
                    <div className="font-mono text-gray-warm">Loading projects...</div>
                  </div>
                </div>
              </section>
            }
          >
            <Projects />
          </Suspense>
          <Contact />
        </main>

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

// Separate component for lazy-loaded toolbar to handle async plugin loading
function LazyToolbar() {
  const [plugin, setPlugin] = useState(null);

  useEffect(() => {
    import('@21st-extension/react').then((module) => {
      setPlugin(module.ReactPlugin);
    });
  }, []);

  if (!plugin) return null;

  return <TwentyFirstToolbar config={{ plugins: [plugin] }} />;
}

export default App;

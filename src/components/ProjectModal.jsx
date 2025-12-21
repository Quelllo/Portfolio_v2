import { memo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, CheckCircle2 } from 'lucide-react';

/**
 * Optimized ProjectModal component with:
 * - Memoization to prevent re-renders when parent updates
 * - useCallback for event handlers
 * - GPU-friendly animations (transform, opacity only)
 * - Reduced animation complexity for better performance
 */
const ProjectModal = memo(({ project, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  // Scroll to top when modal opens
  useEffect(() => {
    if (project && modalRef.current) {
      // Scroll the backdrop container to top
      modalRef.current.scrollTo({ top: 0, behavior: 'instant' });
      // Also ensure content is at top
      if (contentRef.current) {
        contentRef.current.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }, [project]);

  // Memoized close handler to prevent re-renders
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Memoized backdrop click handler
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Memoized content click handler to prevent modal from closing
  const handleContentClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-black-true/90 backdrop-blur-md z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
        style={{
          // Use will-change for better performance during animation
          willChange: 'opacity',
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ 
            duration: 0.3, // Reduced from 0.4 for snappier feel
            ease: [0.34, 1.56, 0.64, 1],
          }}
          onClick={handleContentClick}
          className="brutal-border bg-cream dark:bg-charcoal max-w-5xl w-full my-0 sm:my-8 overflow-hidden min-h-full sm:min-h-0"
          style={{
            // Use transform instead of scale for better performance
            willChange: 'transform, opacity',
          }}
        >
          {/* Modal Header */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              width={1200}
              height={480}
              loading="eager" // Modal images should load immediately
              decoding="async"
              className="w-full h-full object-cover"
              style={{
                transform: 'translateZ(0)', // Force GPU acceleration
              }}
            />
            <div className="absolute inset-0 bg-black-true/60" />
            
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleClose();
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 sm:p-3 bg-orange hover:bg-orange-dark active:bg-orange-dark transition-colors duration-200 z-50 touch-manipulation"
              style={{ touchAction: 'manipulation' }}
              aria-label="Close modal"
            >
              <X size={24} className="text-cream pointer-events-none" />
            </button>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black-true/90 to-transparent">
              <span className="font-mono text-xs text-orange uppercase tracking-widest font-bold mb-2 block">
                Project Details
              </span>
              <h2 className="font-display text-5xl font-black text-cream mb-3 leading-none">
                {project.title}
              </h2>
              <p className="font-mono text-base text-cream/90 max-w-3xl">
                {project.detailedDescription}
              </p>
            </div>
          </div>

          {/* Modal Content */}
          <div ref={contentRef} className="p-4 sm:p-8 max-h-[calc(100vh-20rem)] sm:max-h-[65vh] overflow-y-auto">
            {/* Tools Used */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-12 bg-orange" />
                <h3 className="font-display text-3xl font-bold text-black-true dark:text-cream">
                  Tools & Technologies
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {project.tools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.03, // Reduced delay for faster animation
                      duration: 0.3,
                    }}
                    className="brutal-border bg-cream dark:bg-charcoal p-5"
                  >
                    <h4 className="font-mono text-sm font-bold text-orange mb-2 uppercase tracking-wider">
                      {tool.name}
                    </h4>
                    <p className="font-mono text-xs text-gray-warm leading-relaxed">
                      {tool.purpose}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Development Steps */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-12 bg-orange" />
                <h3 className="font-display text-3xl font-bold text-black-true dark:text-cream">
                  Development Process
                </h3>
              </div>
              <div className="space-y-6">
                {project.steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.03, // Reduced delay
                      duration: 0.3,
                    }}
                    className="flex gap-5"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-orange flex items-center justify-center font-mono font-bold text-cream text-lg">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="font-display text-xl font-bold text-black-true dark:text-cream mb-2 flex items-center gap-2">
                        {step.title}
                        <CheckCircle2 size={18} className="text-orange" />
                      </h4>
                      <p className="font-mono text-sm text-gray-warm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8 pt-8 border-t-2 border-orange/20">
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-sm font-bold px-4 py-2 border-2 border-orange text-orange uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="brutal-border bg-orange px-8 py-4 font-mono font-bold uppercase tracking-wide text-cream flex items-center gap-3"
                >
                  <ExternalLink size={20} />
                  Visit Project
                </motion.a>
              )}
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="brutal-border bg-black-true dark:bg-cream px-8 py-4 font-mono font-bold uppercase tracking-wide text-cream dark:text-black-true"
              >
                Close
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

ProjectModal.displayName = 'ProjectModal';

export default ProjectModal;


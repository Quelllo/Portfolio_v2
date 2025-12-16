import { memo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

// Behance icon SVG component (lucide-react doesn't have Behance icon)
const Behance = ({ size = 14, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M22 7h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4M22 7v6M22 7H18M18 11h4M12 7H8a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM6 7H2v6h4M6 5h4" />
  </svg>
);

// Shopify icon SVG component (simplified bag icon)
const Shopify = ({ size = 14, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

/**
 * Optimized ProjectCard component with:
 * - Memoization to prevent unnecessary re-renders
 * - Lazy image loading with IntersectionObserver
 * - Fixed image dimensions to prevent layout shifts
 * - GPU-friendly animations (transform, opacity only)
 * - Optimized hover effects (specific properties, not transition-all)
 */
const ProjectCard = memo(({ project, index, isInView, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);
  const cardRef = useRef(null);

  // Lazy load images using IntersectionObserver (more efficient than preloading all)
  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Start loading image when card is visible
            const img = new Image();
            img.onload = () => setImageLoaded(true);
            img.onerror = () => setImageLoaded(true); // Show placeholder on error
            img.src = project.image;
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before card enters viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [project.image]);

  // Memoized click handler to prevent re-renders
  const handleClick = () => {
    onSelect(project);
  };

  // Memoized link click handler
  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1, 
        ease: [0.34, 1.56, 0.64, 1],
        // Use will-change for better GPU acceleration
      }}
      onClick={handleClick}
      className="group relative cursor-pointer"
      style={{ willChange: isInView ? 'transform, opacity' : 'auto' }}
    >
      {/* Brutalist border card */}
      <div className="brutal-border bg-cream dark:bg-charcoal overflow-hidden h-full flex flex-col">
        {/* Image container with fixed aspect ratio to prevent layout shifts */}
        <div className={`relative h-56 overflow-hidden ${project.imageFit === 'contain' ? 'bg-black-true' : 'bg-gray-warm/10'}`} style={{ aspectRatio: '16/9' }}>
          {/* Image with fixed dimensions and lazy loading */}
          <div ref={imgRef} className="absolute inset-0">
            {isVisible && (
              <img
                src={project.image}
                alt={project.title}
                width={400}
                height={225}
                loading="lazy"
                decoding="async"
                className={`w-full h-full ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'} transition-[opacity,filter] duration-300 grayscale group-hover:grayscale-0`}
                style={{
                  opacity: imageLoaded ? 1 : 0,
                  transform: 'translateZ(0)', // Force GPU acceleration
                  willChange: imageLoaded ? 'filter, opacity' : 'opacity', // Only hint when loaded
                }}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
              />
            )}
            {/* Placeholder while loading */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-warm/20 animate-pulse" />
            )}
          </div>
          
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <span className="font-mono text-xs font-bold text-orange tracking-wider">
              PROJECT {String(index + 1).padStart(2, '0')}
            </span>
            <ExternalLink 
              size={16} 
              className="text-gray-warm transition-colors duration-200"
              style={{
                // Use CSS for hover instead of Tailwind group-hover
              }}
            />
          </div>

          <h3 className="font-display text-2xl font-bold mb-3 text-black-true dark:text-cream transition-colors duration-200">
            {project.title}
          </h3>
          
          <p className="font-mono text-sm text-gray-warm mb-4 leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2 py-1 border border-black-true dark:border-cream text-black-true dark:text-cream"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 pt-4 border-t border-black-true/10 dark:border-cream/10">
            <button
              onClick={handleClick}
              className="font-mono text-xs uppercase tracking-wider text-orange hover:underline font-bold transition-opacity duration-200"
            >
              View Details →
            </button>
            {project.shopifyUrl && (
              <a
                href={project.shopifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="font-mono text-xs uppercase tracking-wider text-gray-warm hover:text-black-true dark:hover:text-cream transition-colors duration-200 font-bold"
              >
                <Shopify size={14} className="inline mr-1" />
                Shopify
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="font-mono text-xs uppercase tracking-wider text-gray-warm hover:text-black-true dark:hover:text-cream transition-colors duration-200 font-bold"
              >
                <Github size={14} className="inline mr-1" />
                Code
              </a>
            )}
            {project.behanceUrl && (
              <a
                href={project.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="font-mono text-xs uppercase tracking-wider text-gray-warm hover:text-black-true dark:hover:text-cream transition-colors duration-200 font-bold"
              >
                <Behance size={14} className="inline mr-1" />
                Behance
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;


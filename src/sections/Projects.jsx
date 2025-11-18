import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const projects = [
    {
      title: 'Crypto Swap',
      description: 'Cross-Chain USDC Experience with Circles Bridge Kit and Arc.',
      image: '/crypto.png',
      tags: ['React', 'Typescript', 'Stripe'],
      color: 'from-blue-500 to-cyan-500',
      githubUrl: 'https://github.com/Quelllo/Bill-Splitting',
    },
    {
      title: 'Gateway',
      description: 'A mobile and VR app that allows students to access live lectures from anywhere.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
      tags: ['React', 'Firebase', 'Tailwind'],
      color: 'from-purple-500 to-pink-500',
      githubUrl: '',
    },
    {
      title: 'Portfolio CMS',
      description: 'Custom content management system for creative professionals to showcase their work.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      tags: ['Next.js', 'Sanity', 'Framer Motion'],
      color: 'from-orange-500 to-red-500',
      githubUrl: '',
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather app with detailed forecasts, maps, and location-based recommendations.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
      tags: ['React', 'OpenWeather API', 'Charts'],
      color: 'from-green-500 to-teal-500',
      githubUrl: '',
    },
    {
      title: 'Social Media App',
      description: 'Modern social platform with stories, real-time chat, and content discovery features.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      tags: ['React Native', 'GraphQL', 'AWS'],
      color: 'from-indigo-500 to-purple-500',
      githubUrl: '',
    },
    {
      title: 'Analytics Platform',
      description: 'Data visualization dashboard for tracking business metrics and generating insights.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      tags: ['React', 'D3.js', 'Python'],
      color: 'from-pink-500 to-rose-500',
      githubUrl: '',
    },
  ];

  // Preload all images
  useEffect(() => {
    const imagePromises = projects.map((project) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Resolve even on error to not block rendering
        img.src = project.image;
      });
    });

    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // projects array is constant, so we can safely ignore the dependency

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 dark:text-white">Featured Projects</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A selection of projects that showcase my skills in design, development, and problem-solving.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView && imagesLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                {imagesLoaded ? (
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                  >
                    <ExternalLink size={18} />
                    <span className="text-sm font-medium">Live Demo</span>
                  </motion.button>
                  <motion.a
                    href={project.githubUrl || '#'}
                    target={project.githubUrl ? '_blank' : undefined}
                    rel={project.githubUrl ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 transition-colors ${
                      project.githubUrl
                        ? 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer'
                        : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <Github size={18} />
                    <span className="text-sm font-medium">Code</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;


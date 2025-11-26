import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, X, CheckCircle2 } from 'lucide-react';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: 'Crypto Swap',
      description: 'Cross-Chain USDC Experience with Circles Bridge Kit and Arc.',
      image: '/crypto.png',
      tags: ['React', 'Typescript', 'Stripe'],
      color: 'from-blue-500 to-cyan-500',
      githubUrl: 'https://github.com/Quelllo/Bill-Splitting',
      detailedDescription: 'A comprehensive cross-chain cryptocurrency swap platform enabling seamless USDC transfers across different blockchain networks.',
      tools: [
        { name: 'React', purpose: 'Frontend framework for building the user interface' },
        { name: 'TypeScript', purpose: 'Type-safe development and better code quality' },
        { name: 'Stripe', purpose: 'Payment processing and transaction handling' },
        { name: 'Circles Bridge Kit', purpose: 'Cross-chain bridge integration' },
        { name: 'Arc', purpose: 'Enhanced UI components and animations' },
      ],
      steps: [
        { title: 'Project Planning', description: 'Analyzed cross-chain swap requirements and designed the system architecture' },
        { title: 'Setup Development Environment', description: 'Initialized React project with TypeScript and configured build tools' },
        { title: 'Integration', description: 'Integrated Circles Bridge Kit for cross-chain functionality' },
        { title: 'Payment System', description: 'Implemented Stripe payment gateway for secure transactions' },
        { title: 'UI/UX Design', description: 'Created intuitive interface for seamless user experience' },
        { title: 'Testing & Deployment', description: 'Conducted thorough testing and deployed to production' },
      ],
    },
    {
      title: 'Gateway',
      description: 'A mobile and VR app that allows students to access live lectures from anywhere.',
      image: '/gateway_01.jpg',
      tags: ['Figma', 'Photoshop', 'Unity'],
      color: 'from-purple-500 to-pink-500',
      githubUrl: '',
      detailedDescription: 'An innovative educational platform that bridges physical and virtual classrooms, enabling remote students to attend lectures in immersive VR environments.',
      tools: [
        { name: 'Unity', purpose: 'VR environment development and 3D rendering' },
        { name: 'Figma', purpose: 'UI/UX design and prototyping' },
        { name: 'Photoshop', purpose: 'Asset creation and image editing' },
        { name: 'C#', purpose: 'Unity scripting and application logic' },
      ],
      steps: [
        { title: 'Research & Concept', description: 'Researched VR education solutions and defined user requirements' },
        { title: 'Design Mockups', description: 'Created detailed UI/UX designs in Figma for both mobile and VR interfaces' },
        { title: 'Asset Creation', description: 'Designed and optimized visual assets using Photoshop' },
        { title: 'Unity Development', description: 'Built VR environment and implemented interaction mechanics' },
        { title: 'Mobile Integration', description: 'Developed companion mobile app for lecture management' },
        { title: 'Testing & Refinement', description: 'Conducted user testing and refined based on feedback' },
      ],
    },
    {
      title: 'BRZRK',
      description: 'BRZRK spray-on chalk.',
      image: '/brzrk_banner_upscaled.jpg',
      tags: ['Photoshop', 'Shopify', 'Framer'],
      color: 'from-orange-500 to-red-500',
      githubUrl: 'https://brzrk.co.uk/',
      detailedDescription: 'A vibrant e-commerce platform for BRZRK spray-on chalk products, featuring dynamic visuals and seamless shopping experience.',
      tools: [
        { name: 'Shopify', purpose: 'E-commerce platform and payment processing' },
        { name: 'Photoshop', purpose: 'Product photography editing and banner design' },
        { name: 'Framer', purpose: 'Interactive prototypes and animations' },
        { name: 'Liquid', purpose: 'Shopify theme customization' },
      ],
      steps: [
        { title: 'Brand Analysis', description: 'Analyzed BRZRK brand identity and target audience' },
        { title: 'Visual Design', description: 'Created bold, energetic visuals using Photoshop' },
        { title: 'Prototype Creation', description: 'Built interactive prototypes in Framer for client approval' },
        { title: 'Shopify Setup', description: 'Configured Shopify store with custom theme' },
        { title: 'Product Photography', description: 'Edited and optimized product images' },
        { title: 'Launch & Optimization', description: 'Launched store and optimized for conversions' },
      ],
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather app with detailed forecasts, maps, and location-based recommendations.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
      tags: ['React', 'OpenWeather API', 'Charts'],
      color: 'from-green-500 to-teal-500',
      githubUrl: '',
      detailedDescription: 'A comprehensive weather application providing real-time forecasts, interactive maps, and personalized recommendations based on weather conditions.',
      tools: [
        { name: 'React', purpose: 'Component-based UI development' },
        { name: 'OpenWeather API', purpose: 'Real-time weather data retrieval' },
        { name: 'Chart.js', purpose: 'Data visualization for weather trends' },
        { name: 'Tailwind CSS', purpose: 'Responsive styling and design' },
      ],
      steps: [
        { title: 'API Integration', description: 'Connected to OpenWeather API for real-time data' },
        { title: 'Component Architecture', description: 'Designed modular React component structure' },
        { title: 'Data Visualization', description: 'Implemented charts for temperature and forecast trends' },
        { title: 'Location Services', description: 'Added geolocation for automatic location detection' },
        { title: 'UI Polish', description: 'Created beautiful, intuitive interface with smooth animations' },
        { title: 'Optimization', description: 'Optimized API calls and implemented caching' },
      ],
    },
    {
      title: 'Social Media App',
      description: 'Modern social platform with stories, real-time chat, and content discovery features.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      tags: ['React Native', 'GraphQL', 'AWS'],
      color: 'from-indigo-500 to-purple-500',
      githubUrl: '',
      detailedDescription: 'A full-featured social media platform with real-time messaging, story sharing, and advanced content discovery algorithms.',
      tools: [
        { name: 'React Native', purpose: 'Cross-platform mobile development' },
        { name: 'GraphQL', purpose: 'Efficient data querying and real-time updates' },
        { name: 'AWS', purpose: 'Cloud infrastructure and storage' },
        { name: 'Socket.io', purpose: 'Real-time chat functionality' },
      ],
      steps: [
        { title: 'Architecture Design', description: 'Designed scalable system architecture for social features' },
        { title: 'Backend Setup', description: 'Built GraphQL API with AWS infrastructure' },
        { title: 'Authentication', description: 'Implemented secure user authentication and authorization' },
        { title: 'Real-time Features', description: 'Developed chat and live updates using Socket.io' },
        { title: 'Content System', description: 'Created story and post sharing functionality' },
        { title: 'Discovery Algorithm', description: 'Implemented content recommendation system' },
      ],
    },
    {
      title: 'Analytics Platform',
      description: 'Data visualization dashboard for tracking business metrics and generating insights.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      tags: ['React', 'D3.js', 'Python'],
      color: 'from-pink-500 to-rose-500',
      githubUrl: '',
      detailedDescription: 'A powerful analytics dashboard providing real-time business insights through interactive data visualizations and automated reporting.',
      tools: [
        { name: 'React', purpose: 'Dynamic dashboard interface' },
        { name: 'D3.js', purpose: 'Advanced data visualization' },
        { name: 'Python', purpose: 'Backend data processing and analysis' },
        { name: 'Flask', purpose: 'RESTful API development' },
      ],
      steps: [
        { title: 'Requirements Gathering', description: 'Identified key business metrics and visualization needs' },
        { title: 'Data Pipeline', description: 'Built Python backend for data processing' },
        { title: 'API Development', description: 'Created RESTful API using Flask' },
        { title: 'Visualization Design', description: 'Designed interactive charts using D3.js' },
        { title: 'Dashboard Development', description: 'Built responsive React dashboard' },
        { title: 'Analytics Features', description: 'Implemented automated reporting and insights generation' },
      ],
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
    <>
      <section id="projects" className="relative py-32 bg-black-true dark:bg-black-true transition-colors duration-500 overflow-hidden" ref={ref}>
        {/* Editorial number background */}
        <div className="editorial-number -right-16 top-32 select-none opacity-[0.04]">03</div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-24"
          >
            <div className="flex items-baseline gap-6 mb-4">
              <span className="font-mono text-orange text-sm font-bold tracking-widest uppercase">
                // Portfolio
              </span>
              <div className="h-px bg-orange flex-1 opacity-30" />
            </div>
            <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black text-cream leading-none mb-6">
              Selected<br />Works
            </h2>
            <p className="font-mono text-lg text-gray-warm max-w-2xl">
              A collection of projects that showcase my approach to design, development, and creative problem-solving.
            </p>
          </motion.div>

          {/* Projects Grid - Brutalist Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView && imagesLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer"
              >
                {/* Brutalist border card */}
                <div className="brutal-border bg-cream dark:bg-charcoal overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-warm/10">
                    {imagesLoaded ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-warm/20 animate-pulse" />
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-orange opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-orange tracking-wider">
                        PROJECT {String(index + 1).padStart(2, '0')}
                      </span>
                      <ExternalLink size={16} className="text-gray-warm group-hover:text-orange transition-colors" />
                    </div>

                    <h3 className="font-display text-2xl font-bold mb-3 text-black-true dark:text-cream group-hover:text-orange transition-colors">
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
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="font-mono text-xs uppercase tracking-wider text-orange hover:underline font-bold"
                      >
                        View Details →
                      </button>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="font-mono text-xs uppercase tracking-wider text-gray-warm hover:text-black-true dark:hover:text-cream transition-colors font-bold"
                        >
                          <Github size={14} className="inline mr-1" />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal - Brutalist */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black-true/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="brutal-border bg-cream dark:bg-charcoal max-w-5xl w-full my-8 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black-true/60" />
                
                {/* Close button - top right */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-3 bg-orange hover:bg-orange-dark transition-colors"
                >
                  <X size={24} className="text-cream" />
                </button>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black-true/90 to-transparent">
                  <span className="font-mono text-xs text-orange uppercase tracking-widest font-bold mb-2 block">
                    Project Details
                  </span>
                  <h2 className="font-display text-5xl font-black text-cream mb-3 leading-none">
                    {selectedProject.title}
                  </h2>
                  <p className="font-mono text-base text-cream/90 max-w-3xl">
                    {selectedProject.detailedDescription}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 max-h-[65vh] overflow-y-auto">
                {/* Tools Used */}
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-2 h-12 bg-orange" />
                    <h3 className="font-display text-3xl font-bold text-black-true dark:text-cream">
                      Tools & Technologies
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProject.tools.map((tool, index) => (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
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
                    {selectedProject.steps.map((step, index) => (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
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
                    {selectedProject.tags.map((tag) => (
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
                  {selectedProject.githubUrl && (
                    <motion.a
                      href={selectedProject.githubUrl}
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
                    onClick={() => setSelectedProject(null)}
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
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;


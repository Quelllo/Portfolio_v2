import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useCallback, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';

// Lazy load ProjectModal (only needed when a project is selected)
const ProjectModal = lazy(() => import('../components/ProjectModal'));

/**
 * Optimized Projects section with:
 * - Removed expensive image preloading (now handled by IntersectionObserver in ProjectCard)
 * - Memoized project selection handler to prevent re-renders
 * - Split into smaller components for better performance
 * - GPU-friendly animations only
 */
const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
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
      behanceUrl: 'https://www.behance.net/gallery/215065945/Gateway-A-UXUI-Case-Study',
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
      imageFit: 'contain',
      tags: ['Photoshop', 'Shopify', 'Illustrator'],
      color: 'from-orange-500 to-red-500',
      shopifyUrl: 'https://brzrk.co.uk/',
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
      title: 'Real Estate Photography',
      description: 'A portfolio website for a real estate photographer showcasing property photography services and featured listings.',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop&auto=format',
      tags: ['React', 'Tailwind CSS', 'Vite'],
      websiteUrl: 'https://ramenstudios.co.uk',
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
      title: 'Dog Grooming',
      description: 'Modern social platform with stories, real-time chat, and content discovery features.',
      image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=1200&h=800&fit=crop&auto=format',
      tags: ['React', 'Tailwind CSS', 'Vite'],
      websiteUrl: 'https://69476593ce856d1a380411c3--flourishing-parfait-b123b7.netlify.app/',
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
      title: 'Graphic Design Agency',
      description: 'Professional portfolio website for a creative design agency, featuring brand identity work, print design, and digital campaigns.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop&auto=format',
      tags: ['React', 'Tailwind CSS', 'Vite'],
      websiteUrl: 'https://6947633d9e223608eccbe923--flourishing-parfait-b123b7.netlify.app/',
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

  // Memoize projects array to prevent recreation on every render
  const projectsMemo = useMemo(() => projects, []);

  // Memoized project selection handler to prevent re-renders of all cards
  const handleProjectSelect = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  // Memoized modal close handler
  const handleModalClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

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

          {/* Projects Grid - Optimized with memoized cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center md:justify-items-stretch">
            {projectsMemo.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isInView={isInView}
                onSelect={handleProjectSelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal - Lazy loaded for better initial bundle size */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal project={selectedProject} onClose={handleModalClose} />
        </Suspense>
      )}
    </>
  );
};

export default Projects;


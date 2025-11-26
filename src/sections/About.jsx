import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Car } from 'lucide-react';
import profileImage from '../assets/images/256x256.jpg';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skills = [
    {
      icon: <Code2 size={32} strokeWidth={1.5} />,
      number: '01',
      title: 'Frontend Development',
      description: 'Building responsive, performant web applications with React, TypeScript, and modern tooling.',
    },
    {
      icon: <Palette size={32} strokeWidth={1.5} />,
      number: '02',
      title: 'UI/UX Design',
      description: 'Creating intuitive interfaces with a focus on aesthetics, usability, and accessibility.',
    },
    {
      icon: <Car size={32} strokeWidth={1.5} />,
      number: '03',
      title: 'Car Poster Design',
      description: 'Creating stunning automotive poster designs with attention to detail and visual impact.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  return (
    <section 
      id="about" 
      className="relative py-32 bg-cream dark:bg-charcoal transition-colors duration-500 grid-bg overflow-hidden" 
      ref={ref}
    >
      {/* Editorial number background */}
      <div className="editorial-number -left-12 top-12 select-none">02</div>
      
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
              // About
            </span>
            <div className="h-px bg-orange flex-1 opacity-30" />
          </div>
          <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black text-black-true dark:text-cream leading-none">
            Who I Am
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-16 items-start mb-32">
          {/* Image - Brutalist Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-start"
          >
            <div className="relative group">
              <div className="w-full aspect-square max-w-md brutal-border bg-cream dark:bg-charcoal overflow-hidden">
                <img 
                  src={profileImage} 
                  alt="Tom Konarski" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              {/* Decorative corner element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange opacity-20 -z-10" />
            </div>
          </motion.div>

          {/* Text Content - Asymmetric Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-7 space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="font-mono text-lg sm:text-xl leading-relaxed text-black-true dark:text-cream">
                Hi! I'm a <span className="font-bold text-orange">passionate designer</span> and developer who loves creating beautiful, functional digital experiences.
              </p>
              <p className="font-mono text-base sm:text-lg leading-relaxed text-gray-warm">
                With a keen eye for detail and a user-first mindset, I bridge the gap between design and development—turning concepts into polished, high-impact work.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-8 border-t-2 border-orange/20">
              <p className="font-mono text-base sm:text-lg leading-relaxed text-gray-warm">
                When I'm not coding or designing, you'll find me exploring the latest design trends, 
                contributing to open-source projects, or sharing knowledge with the creative community.
              </p>
            </motion.div>

            {/* Stats/Highlights */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              <div className="text-center lg:text-left">
                <div className="font-display text-4xl font-bold text-orange">5+</div>
                <div className="font-mono text-xs uppercase tracking-wider text-gray-warm mt-1">Years</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display text-4xl font-bold text-orange">50+</div>
                <div className="font-mono text-xs uppercase tracking-wider text-gray-warm mt-1">Projects</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display text-4xl font-bold text-orange">∞</div>
                <div className="font-mono text-xs uppercase tracking-wider text-gray-warm mt-1">Ideas</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills - Brutalist Cards with Numbers */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={itemVariants}
              className="relative group"
            >
              {/* Background number */}
              <div className="absolute -top-6 -left-4 font-display text-9xl font-black text-orange opacity-[0.06] select-none pointer-events-none">
                {skill.number}
              </div>
              
              {/* Card */}
              <div className="relative brutal-border bg-cream dark:bg-charcoal p-8 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-orange">
                    {skill.icon}
                  </div>
                  <span className="font-mono text-sm font-bold text-gray-warm">
                    {skill.number}
                  </span>
                </div>
                
                <h3 className="font-display text-2xl font-bold mb-4 text-black-true dark:text-cream leading-tight">
                  {skill.title}
                </h3>
                
                <p className="font-mono text-sm leading-relaxed text-gray-warm">
                  {skill.description}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-orange transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;


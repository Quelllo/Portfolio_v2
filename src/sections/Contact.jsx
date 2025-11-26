import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Check if environment variables are set
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your .env file and restart the dev server.');
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          message: formData.message,
          to_email: 'enquiries@tomkonarski.com',
        },
        publicKey
      );

      console.log('EmailJS success:', result);
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you for your message! I\'ll get back to you soon.' 
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error details:', error);
      let errorMessage = 'Sorry, there was an error sending your message. Please try again or email me directly.';
      
      // Provide more specific error messages
      if (error.text) {
        errorMessage = `Error: ${error.text}`;
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setSubmitStatus({ 
        type: 'error', 
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <Linkedin size={24} />,
      url: 'https://www.linkedin.com/in/tomkonarski/',
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-50',
    },
    {
      name: 'GitHub',
      icon: <Github size={24} />,
      url: 'https://github.com/Quelllo',
      color: 'hover:text-gray-900',
      bgColor: 'hover:bg-gray-100',
    },
    {
      name: 'Email',
      icon: <Mail size={24} />,
      url: 'mailto:enquiries@tomkonarski.com',
      color: 'hover:text-red-600',
      bgColor: 'hover:bg-red-50',
    },
  ];

  return (
    <section id="contact" className="relative py-32 bg-cream dark:bg-charcoal transition-colors duration-500 grid-bg overflow-hidden" ref={ref}>
      {/* Editorial number background */}
      <div className="editorial-number -left-12 top-32 select-none">04</div>
      
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
              // Contact
            </span>
            <div className="h-px bg-orange flex-1 opacity-30" />
          </div>
          <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black text-black-true dark:text-cream leading-none mb-6">
            Let's Talk
          </h2>
          <p className="font-mono text-lg text-gray-warm max-w-2xl">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Contact Form - Brutalist */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wider text-black-true dark:text-cream mb-3 font-bold">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 border-3 border-black-true dark:border-cream bg-cream dark:bg-charcoal font-mono text-black-true dark:text-cream placeholder:text-gray-warm focus:outline-none focus:border-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tom Konarski"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider text-black-true dark:text-cream mb-3 font-bold">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 border-3 border-black-true dark:border-cream bg-cream dark:bg-charcoal font-mono text-black-true dark:text-cream placeholder:text-gray-warm focus:outline-none focus:border-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider text-black-true dark:text-cream mb-3 font-bold">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows="6"
                  className="w-full px-6 py-4 border-3 border-black-true dark:border-cream bg-cream dark:bg-charcoal font-mono text-black-true dark:text-cream placeholder:text-gray-warm focus:outline-none focus:border-orange transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Status Message */}
              {submitStatus.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 border-3 font-mono text-sm ${
                    submitStatus.type === 'success'
                      ? 'bg-orange/10 text-orange border-orange'
                      : 'bg-red-500/10 text-red-600 border-red-600'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`w-full brutal-border py-5 px-8 font-mono font-bold uppercase tracking-wide flex items-center justify-center gap-3 transition-colors ${
                  isSubmitting
                    ? 'bg-gray-warm text-cream cursor-not-allowed opacity-50'
                    : 'bg-orange text-cream hover:bg-orange-dark'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-cream border-t-transparent"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links & Info - Brutalist Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Info Card */}
            <div className="brutal-border bg-black-true dark:bg-cream p-8">
              <h3 className="font-display text-3xl font-bold mb-4 text-cream dark:text-black-true">
                Let's Connect
              </h3>
              <p className="font-mono text-sm text-cream/80 dark:text-black-true/80 leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-gray-warm font-bold">
                Find Me On
              </h4>
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="brutal-border bg-cream dark:bg-charcoal px-6 py-5 flex items-center gap-4 group"
                  >
                    <div className="text-orange group-hover:scale-110 transition-transform">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <span className="font-mono font-bold text-black-true dark:text-cream group-hover:text-orange transition-colors">
                        {link.name}
                      </span>
                    </div>
                    <div className="text-gray-warm group-hover:text-orange transition-colors">
                      →
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="brutal-border bg-orange p-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-cream animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-cream font-bold">
                  Status
                </span>
              </div>
              <div className="font-display text-2xl font-bold text-cream">
                Available for Work
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


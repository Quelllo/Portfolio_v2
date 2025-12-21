import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="footer" className="bg-black-true text-cream py-16 border-t-4 border-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-3xl font-black text-orange mb-4">TK</h3>
            <p className="font-mono text-sm text-cream/70 leading-relaxed">
              Designing and building digital experiences that matter.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-mono text-xs uppercase tracking-widest text-orange mb-4 font-bold">
              Quick Links
            </h4>
            <div className="space-y-2">
              {['About', 'Projects', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block font-mono text-sm text-cream/70 hover:text-orange transition-colors accent-underline"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-mono text-xs uppercase tracking-widest text-orange mb-4 font-bold">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/Quelllo"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border-2 border-cream hover:border-orange hover:bg-orange transition-all"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/tomkonarski/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border-2 border-cream hover:border-orange hover:bg-orange transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:enquiries@tomkonarski.com"
                className="p-3 border-2 border-cream hover:border-orange hover:bg-orange transition-all"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-8 border-t border-cream/20"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-cream/50">
              © {new Date().getFullYear()} Tom Konarski. All rights reserved.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-cream/50">
              <span>Built with</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Heart size={14} className="text-orange fill-orange" />
              </motion.div>
              <span>using React & Tailwind by Tom :)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;


import React from "react";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Twitter, 
  Linkedin,
  Users,
  Calendar,
  Shield,
  ChevronUp
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: "Dashboard", path: "/dashboard", icon: Users },
    { name: "Employees", path: "/employees", icon: Users },
    { name: "Leave Management", path: "/leaves", icon: Calendar },
    { name: "Reports", path: "/reports", icon: Shield }
  ];

  const supportLinks = [
    { name: "Help Center", path: "/help" },
    { name: "Contact Support", path: "/support" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" }
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, url: "#" },
    { name: "Twitter", icon: Twitter, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"></div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">HR</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Dashboard
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Streamline your HR processes with our comprehensive dashboard. 
              Managing employees, leave requests, and organizational data has never been easier.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Heart size={14} className="text-red-400" />
              <span>Built with MERN Stack</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Users size={16} className="mr-2 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 text-sm group"
                  >
                    <link.icon size={14} className="mr-2 group-hover:text-blue-400 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Shield size={16} className="mr-2 text-purple-400" />
              Support
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-400 text-sm">
                <Mail size={14} className="mr-3 text-blue-400" />
                <span>support@hrdashboard.com</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Phone size={14} className="mr-3 text-green-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start text-gray-400 text-sm">
                <MapPin size={14} className="mr-3 text-red-400 mt-0.5" />
                <span>123 Business Ave<br />Suite 100<br />City, State 12345</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-8 h-8 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon size={16} className="text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest updates and feature announcements
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-r-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-2 md:mb-0">
              <p className="text-sm text-gray-400">
                © {currentYear} HR Dashboard. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500">
                Made with passion for better HR management
              </span>
              <button
                onClick={scrollToTop}
                className="w-8 h-8 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Scroll to top"
              >
                <ChevronUp size={16} className="text-gray-400 hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 25%),
                           radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.3) 0%, transparent 25%)`
        }}></div>
      </div>
    </footer>
  );
};

export default Footer;
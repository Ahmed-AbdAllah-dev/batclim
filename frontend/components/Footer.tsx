// components/Footer.tsx
"use client";
import { Facebook, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getSiteSettings } from "@/lib/strapi";

export function Footer() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        console.log('Loading footer settings...');
        const data = await getSiteSettings();
        console.log('Footer settings:', data);
        setSettings(data || null);
      } catch (err) {
        console.error('Error loading settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  if (loading) {
    return (
      <footer className="bg-gray-950 text-gray-300 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 text-sm">
          Loading...
        </div>
      </footer>
    );
  }

  if (!settings) return null;

  const companyName = settings.CompanyName || settings.companyName || 'BATCLIM';
  const companyDescription = settings.CompanyDescription || settings.companyDescription || "Algeria's trusted partner for industrial refrigeration solutions.";
  const contactPhone = settings.ContactPhone || settings.contactPhone;
  const contactEmail = settings.ContactEmail || settings.contactEmail;
  const address = settings.Address || settings.address;
  const socialLinks = settings.SocialLinks || settings.socialLinks || [];
  const footerLinks = settings.FooterLinks || settings.footerLinks || [];

  const quickLinks = [
    { id: "services", label: "Services" },
    { id: "industries", label: "Industries" },
    { id: "benefits", label: "Why Choose Us" },
    { id: "contact", label: "Contact" },
  ];

  const servicesList = [
    "Cold Rooms",
    "Freeze Rooms",
    "Multi-tube Chillers",
    "Maintenance Services",
  ];

  return (
    <footer className="bg-gray-950 text-gray-400 relative overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-dot-grid-dark opacity-40 pointer-events-none" />
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      {/* Gradient top border */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-blue-700/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <span className="text-white text-xs font-bold">BC</span>
              </div>
              <div className="text-2xl font-extrabold text-white tracking-tight">{companyName}</div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{companyDescription}</p>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((link: any) => {
                  const platform = link.Platform || link.platform || '';
                  const url = link.Url || link.url || '#';
                  let Icon = Facebook;
                  if (platform.toLowerCase() === 'linkedin') Icon = Linkedin;
                  return (
                    <motion.a
                      key={link.id}
                      href={url}
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                      aria-label={platform}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon size={16} />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Our Services</h3>
            <ul className="space-y-3">
              {servicesList.map((service) => (
                <li key={service} className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-200 text-sm cursor-default">
                  <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Contact Us</h3>
            <ul className="space-y-4">
              {contactPhone && (
                <li className="flex items-start gap-3">
                  <Phone size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <a href={`tel:${contactPhone}`} className="hover:text-white transition-colors text-sm">
                    {contactPhone}
                  </a>
                </li>
              )}
              {contactEmail && (
                <li className="flex items-start gap-3">
                  <Mail size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors text-sm break-all">
                    {contactEmail}
                  </a>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-3">
                  <MapPin size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{address}</span>
                </li>
              )}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} <span className="text-gray-300 font-medium">{companyName}</span>. All rights reserved.
          </p>

          {footerLinks.length > 0 && (
            <div className="flex gap-6">
              {footerLinks.map((link: any) => (
                <a
                  key={link.id}
                  href={link.Url || link.url || '#'}
                  className="text-sm text-gray-500 hover:text-white transition-colors duration-200"
                >
                  {link.Label || link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
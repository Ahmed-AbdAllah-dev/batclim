// components/Contact.tsx
"use client";
import { Phone, Mail, MapPin, Clock, AlertTriangle, Send, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { getSiteSettings } from "@/lib/strapi";

export function Contact() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading]   = useState(true);
  const [sending, setSending]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSiteSettings();
        setSettings(data || null);
      } catch (err) {
        console.error("Error loading settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send message. Please try again.");
        return;
      }

      setSent(true);
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const contactPhone   = settings?.ContactPhone   || settings?.contactPhone;
  const contactEmail   = settings?.ContactEmail   || settings?.contactEmail;
  const address        = settings?.Address        || settings?.address;
  const emergencyPhone = settings?.EmergencyPhone || settings?.emergencyPhone;
  const businessHours  = settings?.BusinessHours  || settings?.businessHours || settings?.Hours || [];

  if (loading) {
    return (
      <section id="contact" className="py-20 lg:py-28 bg-gray-50 bg-dot-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton h-10 w-48 mx-auto rounded-xl mb-4" />
            <div className="skeleton h-6 w-80 mx-auto rounded-xl" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              {[0,1,2,3,4].map(i => <div key={i} className="skeleton h-12 w-full rounded-xl" />)}
            </div>
            <div className="space-y-6">
              {[0,1,2].map(i => <div key={i} className="skeleton h-20 w-full rounded-xl" />)}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const inputClasses = "w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200 text-sm";
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";

  const contactInfoItems = [
    contactPhone && {
      icon: Phone,
      label: "Phone",
      value: contactPhone,
      href: `tel:${contactPhone}`,
    },
    contactEmail && {
      icon: Mail,
      label: "Email",
      value: contactEmail,
      href: `mailto:${contactEmail}`,
    },
    address && {
      icon: MapPin,
      label: "Location",
      value: address,
      href: null,
    },
  ].filter(Boolean) as any[];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-gray-50 bg-dot-grid relative overflow-hidden">
      {/* Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-50/70 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-4 tracking-wide uppercase">
            Contact Us
          </span>
          <h2 className="text-gray-900 mb-4 section-title-accent-center">Get in Touch</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Ready to discuss your refrigeration needs? Contact us for a free
            consultation and customized quote.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* ── Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-gray-900 font-bold text-xl mb-6">Send a Message</h3>

              {/* Success message */}
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700"
                  >
                    <CheckCircle2 size={20} className="flex-shrink-0 text-green-500" />
                    <span className="font-medium text-sm">Thank you! We received your message and will contact you shortly.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700"
                  >
                    <AlertTriangle size={20} className="flex-shrink-0 text-red-500" />
                    <span className="font-medium text-sm">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClasses}>Full Name *</label>
                    <input
                      id="name" name="name" required
                      value={formData.name} onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClasses}>Email Address *</label>
                    <input
                      id="email" name="email" type="email" required
                      value={formData.email} onChange={handleChange}
                      placeholder="your.email@company.com"
                      className={`${inputClasses} ${error && error.toLowerCase().includes('email') ? 'border-red-400 focus:border-red-400 focus:ring-red-500/30' : ''}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClasses}>Phone Number *</label>
                    <input
                      id="phone" name="phone" type="tel" required
                      value={formData.phone} onChange={handleChange}
                      placeholder="+213 XXX XXX XXX"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className={labelClasses}>Company Name</label>
                    <input
                      id="company" name="company"
                      value={formData.company} onChange={handleChange}
                      placeholder="Your company name"
                      className={inputClasses}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className={labelClasses}>Message *</label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={formData.message} onChange={handleChange}
                    placeholder="Tell us about your refrigeration needs..."
                    className={`${inputClasses} resize-none`}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={!sending ? { scale: 1.02 } : {}}
                  whileTap={!sending ? { scale: 0.98 } : {}}
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl btn-orange text-base font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Verifying & Sending...
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* ── Contact Information ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-5"
          >
            <h3 className="text-gray-900 font-bold text-xl mb-2">Contact Information</h3>

            {contactInfoItems.map((item: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm group hover:border-blue-200 hover:shadow-md transition-all duration-200"
              >
                <div className="w-11 h-11 bg-blue-50 group-hover:bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                  <item.icon className="text-blue-600" size={20} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-gray-800 hover:text-blue-600 transition-colors font-medium text-sm">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-800 font-medium text-sm">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Business Hours */}
            {businessHours.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: contactInfoItems.length * 0.1 }}
                className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="text-blue-600" size={18} />
                  <h4 className="font-semibold text-gray-900">Business Hours</h4>
                </div>
                <div className="space-y-2">
                  {businessHours.map((item: any, i: number) => (
                    <div key={item.id} className={`flex justify-between text-sm py-1.5 ${i < businessHours.length - 1 ? 'border-b border-gray-50' : ''}`}>
                      <span className="text-gray-600">{item.Day || item.day}</span>
                      <span className="font-medium text-gray-800">{item.Hours || item.hours}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Emergency */}
            {emergencyPhone && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (contactInfoItems.length + 1) * 0.1 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <h4 className="font-bold text-gray-900">Emergency Service</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  Need urgent refrigeration repair? We offer 24/7 emergency support for existing clients.
                </p>
                <a
                  href={`tel:${emergencyPhone}`}
                  className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm transition-colors"
                >
                  <Phone size={15} />
                  {emergencyPhone}
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
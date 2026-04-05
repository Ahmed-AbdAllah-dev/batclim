// components/Services.tsx
"use client";
import * as Icons from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { getServices } from "@/lib/strapi";

const COLD_ROOMS_IMAGE = "https://images.unsplash.com/photo-1741739813128-cb658a9a0f9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcmVmcmlnZXJhdGlvbiUyMGNvbGQlMjBzdG9yYWdlJTIwd2FyZWhvdXNlfGVufDF8fHx8MTc3MjA5MTc0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const CHILLERS_IMAGE = "https://images.unsplash.com/photo-1720670996646-2f5d69a10ee7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwY2hpbGxlciUyMGVxdWlwbWVudCUyMG1hY2hpbmVyeXxlbnwxfHx8fDE3NzIwOTE3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadServices() {
      try {
        console.log('Loading services from Strapi...');
        const data = await getServices();
        console.log('Services data:', data);
        setServices(data || []);
      } catch (err) {
        console.error('Error loading services:', err);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ElementType } = {
      Snowflake: Icons.Snowflake,
      Gauge: Icons.Gauge,
    };
    return iconMap[iconName] || Icons.Snowflake;
  };

  const getServiceImage = (index: number) => {
    return index === 0 ? COLD_ROOMS_IMAGE : CHILLERS_IMAGE;
  };

  const extractTextFromRichText = (richText: any): string => {
    if (!richText) return '';
    if (typeof richText === 'string') return richText;
    if (Array.isArray(richText)) {
      return richText
        .map(block => {
          if (block.children) {
            return block.children
              .map((child: any) => child.text || '')
              .join('');
          }
          return '';
        })
        .join(' ');
    }
    return '';
  };

  if (loading) {
    return (
      <section id="services" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <div className="skeleton h-10 w-48 mx-auto rounded-xl" />
            <div className="skeleton h-6 w-80 mx-auto rounded-xl" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[0, 1].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-100">
                <div className="skeleton h-64 w-full" />
                <div className="p-8 space-y-4">
                  <div className="skeleton h-7 w-40 rounded-lg" />
                  <div className="skeleton h-4 w-full rounded" />
                  <div className="skeleton h-4 w-3/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) return <div className="py-16 text-center text-red-500">{error}</div>;
  if (!services.length) return <div className="py-16 text-center text-gray-400">No services found</div>;

  return (
    <section id="services" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle bg decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

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
            What We Offer
          </span>
          <h2 className="text-gray-900 mb-4 section-title-accent-center">Our Services</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Professional industrial refrigeration solutions tailored to your business needs
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service: any, index: number) => {
            const id = service.id;
            const title = service.Title || 'Service';
            const description = extractTextFromRichText(service.description);
            const iconName = service.icon || 'Snowflake';
            const features = service.features || [];

            console.log(`Service ${index}:`, { title, description, iconName, features });

            const IconComponent = getIcon(iconName);
            const serviceImage = getServiceImage(index);

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden transition-shadow duration-300"
              >
                {/* Image with hover overlay */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={serviceImage}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient overlay always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Icon badge on image */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
                      <IconComponent className="text-white" size={22} />
                    </div>
                    <h3 className="text-white font-bold text-xl drop-shadow-md">{title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <p className="text-gray-500 mb-6 leading-relaxed">{description}</p>

                  {features.length > 0 && (
                    <ul className="space-y-2.5 mb-7">
                      {features.map((feature: any, idx: number) => (
                        <motion.li
                          key={feature.id || idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + idx * 0.06 }}
                          className="flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="text-blue-500 mt-0.5 flex-shrink-0" size={17} />
                          <span className="text-gray-700 text-sm">{feature.feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={scrollToContact}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:shadow-blue-200"
                  >
                    Get a Quote
                    <ArrowRight size={15} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
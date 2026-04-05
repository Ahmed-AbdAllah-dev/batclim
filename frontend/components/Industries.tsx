// components/Industries.tsx
"use client";
import * as Icons from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getIndustries } from "@/lib/strapi";

export function Industries() {
  const [industries, setIndustries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadIndustries() {
      try {
        console.log('Loading industries...');
        const data = await getIndustries();
        console.log('Industries data:', data);
        setIndustries(data || []);
      } catch (err) {
        console.error('Error loading industries:', err);
        setError('Failed to load industries');
      } finally {
        setLoading(false);
      }
    }
    loadIndustries();
  }, []);

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Building2;
    return <IconComponent className="text-blue-600" size={28} />;
  };

  if (loading) {
    return (
      <section id="industries" className="py-20 lg:py-28 bg-gray-50 bg-dot-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton h-10 w-56 mx-auto rounded-xl mb-4" />
            <div className="skeleton h-6 w-72 mx-auto rounded-xl" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[0,1,2,3].map(i => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100">
                <div className="skeleton h-16 w-16 rounded-full mx-auto mb-4" />
                <div className="skeleton h-5 w-32 mx-auto rounded mb-2" />
                <div className="skeleton h-4 w-full rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) return <div className="py-16 text-center text-red-500">{error}</div>;

  if (!industries || industries.length === 0) {
    return (
      <section id="industries" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4">Industries We Serve</h2>
          <p className="text-gray-500">No industries found.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="industries" className="py-20 lg:py-28 bg-gray-50 bg-dot-grid relative overflow-hidden">
      {/* Decoration */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/60 rounded-full blur-[100px] pointer-events-none" />

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
            Our Clients
          </span>
          <h2 className="text-gray-900 mb-4 section-title-accent-center">
            Industries We Serve
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Trusted by Algeria's leading businesses across multiple sectors
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry: any, index: number) => {
            const attributes = industry.attributes || industry;
            const id = industry.id;

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group relative bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-default"
              >
                {/* Top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 group-hover:bg-blue-100 rounded-2xl mb-5 transition-colors duration-300 relative"
                >
                  {getIcon(attributes.icon)}
                  {/* Pulse ring on hover */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                </motion.div>

                <h3 className="text-gray-900 font-bold mb-2 text-lg group-hover:text-blue-700 transition-colors duration-200">
                  {attributes.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{attributes.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
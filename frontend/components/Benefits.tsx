// components/Benefits.tsx
"use client";
import * as Icons from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { getBenefits } from "@/lib/strapi";

// Static team image URL (only this stays static)
const TEAM_IMAGE_URL = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1080&q=80";

export function Benefits() {
  const [benefits, setBenefits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBenefits() {
      try {
        console.log('Loading benefits from Strapi...');
        const data = await getBenefits();
        console.log('Benefits data:', data);
        setBenefits(data || []);
      } catch (err) {
        console.error('Error loading benefits:', err);
        setError('Failed to load benefits');
      } finally {
        setLoading(false);
      }
    }
    loadBenefits();
  }, []);

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Shield: Icons.Shield,
      Wrench: Icons.Wrench,
      Award: Icons.Award,
      Zap: Icons.Zap,
      Clock: Icons.Clock,
      Users: Icons.Users,
    };
    const IconComponent = iconMap[iconName] || Icons.Shield;
    return <IconComponent className="text-blue-600" size={20} />;
  };

  if (loading) {
    return (
      <section id="benefits" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="skeleton h-96 rounded-2xl" />
            <div className="space-y-4">
              <div className="skeleton h-10 w-56 rounded-xl" />
              <div className="skeleton h-5 w-full rounded" />
              <div className="skeleton h-5 w-3/4 rounded" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-500">{error}</div>
    </section>
  );

  if (!benefits || benefits.length === 0) return null;

  return (
    <section id="benefits" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={TEAM_IMAGE_URL}
                alt="Professional team"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
            </div>
            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Icons.Award className="text-white" size={22} />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">15+ Years</div>
                  <div className="text-gray-500 text-sm">of Experience</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-4 tracking-wide uppercase">
                Why Choose Us
              </span>
              <h2 className="text-gray-900 mb-4 section-title-accent">
                Why Choose <span className="text-gradient-blue">Batclim?</span>
              </h2>
              <p className="text-gray-500 mb-10 leading-relaxed text-lg">
                We combine technical expertise with local knowledge to deliver refrigeration
                solutions that work in Algeria's unique climate and industrial environment.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {benefits.map((benefit: any, index: number) => {
                const attributes = benefit.attributes || benefit;
                const id = benefit.id;

                return (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors duration-200 cursor-default"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center transition-colors duration-200">
                        {getIcon(attributes.icon)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold mb-1 text-base group-hover:text-blue-700 transition-colors">
                        {attributes.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{attributes.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
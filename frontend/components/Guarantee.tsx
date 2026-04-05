"use client";
import { ShieldCheck, FileCheck, Headphones, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const guaranteeItems = [
  {
    icon: FileCheck,
    title: "Parts & Labor",
    description: "Full coverage on all components and installation work",
  },
  {
    icon: Headphones,
    title: "Free Support",
    description: "Complimentary technical support throughout the warranty period",
  },
  {
    icon: CheckCircle,
    title: "Performance Guarantee",
    description: "We ensure your system performs to specifications",
  },
];

export function Guarantee() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-900 to-[#0a1628]" />
      {/* Dot grid overlay */}
      <div className="absolute inset-0 bg-dot-grid-dark opacity-60" />
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-400/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Pulsing shield icon */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center relative">
              <ShieldCheck size={48} className="text-white" />
              {/* Pulse rings */}
              <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-40" />
              <span className="absolute -inset-3 rounded-full border border-white/15 animate-pulse" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-5">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              <span className="text-white/80 text-sm font-medium">Our Promise to You</span>
            </div>
          </motion.div>

          <h2 className="text-white mb-4">
            1-Year Complete Warranty
          </h2>
          <p className="text-xl text-blue-200/80 max-w-2xl mx-auto leading-relaxed">
            Every installation comes with our comprehensive 1-year guarantee, covering
            parts, labor, and performance.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {guaranteeItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group text-center p-8 rounded-2xl glass hover:bg-white/15 transition-colors duration-300 border border-white/10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 group-hover:bg-white/20 mb-5 transition-colors duration-300">
                <item.icon size={28} className="text-white" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
              <p className="text-blue-200/80 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// components/Hero.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "motion/react";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { getHomePage } from "@/lib/strapi";

const HERO_BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1741739813128-cb658a9a0f9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcmVmcmlnZXJhdGlvbiUyMGNvbGQlMjBzdG9yYWdlJTIwd2FyZWhvdXNlfGVufDF8fHx8MTc3MjA5MTc0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const extractTextFromRichText = (richText: any): string => {
  if (!richText) return '';
  if (typeof richText === 'string') return richText;
  if (Array.isArray(richText)) {
    return richText
      .map(block => {
        if (block.children) {
          return block.children.map((child: any) => child.text || '').join('');
        }
        return '';
      })
      .join(' ');
  }
  return '';
};

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) { setDisplay(value); return; }
    const controls = animate(0, num, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        setDisplay(num % 1 === 0 ? Math.floor(v).toString() : v.toFixed(1));
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  const prefix = value.match(/^[^0-9]*/)?.[0] || '';
  const suf = value.match(/[^0-9.]+$/)?.[0] || suffix;

  return (
    <div ref={ref} className="text-4xl font-extrabold text-white tabular-nums">
      {prefix}{display}{suf}
    </div>
  );
}

// Floating particle dots
const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 4,
}));

export function Hero() {
  const [hero, setHero] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHero() {
      try {
        const data = await getHomePage();
        if (data?.Hero && data.Hero.length > 0) {
          setHero(data.Hero[0]);
        }
      } catch (err) {
        console.error('Error loading hero:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHero();
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={HERO_BACKGROUND_IMAGE} alt="Industrial refrigeration" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/95 via-blue-950/88 to-blue-900/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-4 max-w-3xl">
            <div className="skeleton h-16 w-3/4 opacity-30 bg-white/20 rounded-xl" />
            <div className="skeleton h-8 w-2/3 opacity-20 bg-white/20 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  if (!hero || !hero.title) return null;

  const title          = hero.title;
  const description    = hero.description ? extractTextFromRichText(hero.description) : '';
  const ctaPrimaryText   = hero.ctaPrimaryText;
  const ctaSecondaryText = hero.ctaSecondaryText;
  const trustIndicators  = hero.Trust || [];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BACKGROUND_IMAGE}
          alt="Industrial refrigeration"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/96 via-blue-950/88 to-blue-900/65" />
        {/* Subtle gradient glow */}
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
              opacity: 0.15,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-20">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-sm text-white/85 font-medium">Algeria's #1 Industrial Refrigeration</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-white mb-6 leading-none"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-lg sm:text-xl text-blue-100/90 mb-10 leading-relaxed max-w-2xl"
            >
              {description}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            {ctaPrimaryText && (
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToContact}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl btn-orange text-base font-semibold"
              >
                {ctaPrimaryText}
                <ArrowRight size={18} />
              </motion.button>
            )}
            {ctaSecondaryText && (
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToContact}
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl glass border border-white/25 text-white text-base font-semibold hover:bg-white/15 transition-colors"
              >
                <Phone size={16} />
                {ctaSecondaryText}
              </motion.button>
            )}
          </motion.div>

          {/* Trust indicators */}
          {trustIndicators.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-white/15"
            >
              {trustIndicators.map((item: any, i: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 + i * 0.1 }}
                  className="flex flex-col"
                >
                  <AnimatedCounter value={item.value} />
                  <div className="text-sm text-blue-200/80 mt-1 font-medium">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} />
      </motion.button>
    </section>
  );
}
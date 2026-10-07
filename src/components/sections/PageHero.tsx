"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  badge?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageHero({ badge, title, description, children }: PageHeroProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,183,94,0.06)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        {badge && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="kicker mb-6"
          >
            {badge}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.04] mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-muted max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export function Section({ children, className = "", id, dark = false }: SectionProps) {
  return (
    <motion.section
      id={id}
      // Never hide content: a fast scroll can skip the intersection and leave an
      // opacity:0 section invisible forever. Slide only; opacity stays 1.
      initial={{ y: 24 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`py-20 md:py-28 ${dark ? "bg-charcoal" : ""} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
    </motion.section>
  );
}

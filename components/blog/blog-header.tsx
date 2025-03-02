"use client";

import { motion } from "framer-motion";

export function BlogHeader() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog & Artikel</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">Temukan wawasan dan informasi terbaru dari tim ahli kami tentang industri, tren, dan tips bisnis.</p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Award, Users, CheckCircle } from "lucide-react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Terpercaya",
      description: "Lebih dari 10 tahun pengalaman melayani berbagai klien dari berbagai sektor industri.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Berkualitas",
      description: "Layanan kami mengutamakan kualitas dan kepuasan klien sebagai prioritas utama.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Profesional",
      description: "Tim kami terdiri dari para profesional berpengalaman di bidangnya masing-masing.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl font-bold mb-4">
            Tentang Kami
          </motion.h2>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="w-20 h-1 bg-primary mx-auto mb-6"></motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cipta Mandiri Perkasa adalah perusahaan yang berkomitmen untuk memberikan solusi terbaik bagi kebutuhan bisnis Anda.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} ref={ref}>
            <h3 className="text-2xl font-bold mb-6">Visi & Misi Kami</h3>
            <p className="text-gray-600 mb-6">Visi kami adalah menjadi mitra bisnis terpercaya yang membantu klien mencapai pertumbuhan berkelanjutan melalui solusi inovatif dan layanan berkualitas tinggi.</p>
            <p className="text-gray-600 mb-6">Misi kami adalah memberikan layanan profesional dengan integritas tinggi, membangun hubungan jangka panjang dengan klien, dan terus berinovasi untuk menghadapi tantangan bisnis modern.</p>
            <ul className="space-y-3">
              {["Layanan profesional dengan standar tertinggi", "Solusi yang disesuaikan dengan kebutuhan klien", "Pendekatan inovatif untuk setiap tantangan", "Komitmen untuk hasil yang terukur"].map((item, index) => (
                <motion.li key={index} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3, delay: 0.1 * index }} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5 }}>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img src="/placeholder.svg?height=600&width=800" alt="About Cipta Mandiri Perkasa" className="w-full h-auto" />
            </div>
          </motion.div>
        </div>

        <div className="mt-20">
          <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-2xl md:text-3xl font-bold text-center mb-12">
            Mengapa Memilih Kami
          </motion.h3>

          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

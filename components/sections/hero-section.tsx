"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ClickSpark } from "../ui/click-spark";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-90 z-0"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] z-0"></div>

      <div className="container mx-auto px-4 z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Solusi Bisnis Terpercaya untuk Kesuksesan Anda</h1>
            <p className="text-xl text-gray-200 mb-8">Cipta Mandiri Perkasa hadir untuk memberikan layanan profesional dan solusi terbaik untuk kebutuhan bisnis Anda.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ClickSpark>
                <Button size="lg" asChild>
                  <Link href="/#contact" className="group">
                    Hubungi Kami
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </ClickSpark>
              <Button variant="outline" size="lg" asChild>
                <Link href="/#about">Pelajari Lebih Lanjut</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary to-secondary blur-lg opacity-75"></div>
              <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
                <img src="/placeholder.svg?height=600&width=800" alt="Business solutions" className="w-full h-auto" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

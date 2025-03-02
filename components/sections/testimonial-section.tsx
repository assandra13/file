"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "../ui/button";

interface Testimonial {
  id: string;
  name: string;
  position?: string;
  company?: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialSection({ testimonials = [] }: TestimonialSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // If no testimonials are provided, use placeholders
  const testimonialItems =
    testimonials.length > 0
      ? testimonials
      : [
          {
            id: "1",
            name: "Budi Santoso",
            position: "CEO",
            company: "PT Maju Bersama",
            content: "Cipta Mandiri Perkasa telah membantu perusahaan kami dalam mengembangkan strategi bisnis yang efektif. Layanan mereka sangat profesional dan hasil yang diberikan melebihi ekspektasi kami.",
            rating: 5,
            avatar: "/placeholder.svg?height=100&width=100",
          },
          {
            id: "2",
            name: "Siti Rahayu",
            position: "Marketing Director",
            company: "CV Sukses Mandiri",
            content: "Kami sangat puas dengan layanan konsultasi yang diberikan. Tim Cipta Mandiri Perkasa sangat responsif dan memahami kebutuhan bisnis kami dengan baik.",
            rating: 5,
            avatar: "/placeholder.svg?height=100&width=100",
          },
          {
            id: "3",
            name: "Ahmad Fauzi",
            position: "Operations Manager",
            company: "PT Karya Utama",
            content: "Solusi yang diberikan oleh Cipta Mandiri Perkasa telah membantu kami meningkatkan efisiensi operasional secara signifikan. Sangat merekomendasikan layanan mereka.",
            rating: 4,
            avatar: "/placeholder.svg?height=100&width=100",
          },
        ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonialItems.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonialItems.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl font-bold mb-4">
            Testimoni Klien
          </motion.h2>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="w-20 h-1 bg-primary mx-auto mb-6"></motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Apa kata klien kami tentang layanan yang kami berikan.
          </motion.p>
        </div>

        <div ref={ref} className="relative max-w-4xl mx-auto">
          <div className="relative bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="absolute top-6 right-8 text-primary opacity-20">
              <Quote size={60} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={currentIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="relative z-10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <img src={testimonialItems[currentIndex].avatar || "/placeholder.svg?height=100&width=100"} alt={testimonialItems[currentIndex].name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < testimonialItems[currentIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <h3 className="text-xl font-bold">{testimonialItems[currentIndex].name}</h3>
                    {(testimonialItems[currentIndex].position || testimonialItems[currentIndex].company) && (
                      <p className="text-gray-600">
                        {testimonialItems[currentIndex].position}
                        {testimonialItems[currentIndex].position && testimonialItems[currentIndex].company && ", "}
                        {testimonialItems[currentIndex].company}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-lg text-gray-700 italic">"{testimonialItems[currentIndex].content}"</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" size="icon" className="rounded-full" onClick={prevSlide}>
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>

            <div className="flex space-x-2">
              {testimonialItems.map((_, index) => (
                <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-gray-300"}`} aria-label={`Go to testimonial ${index + 1}`} />
              ))}
            </div>

            <Button variant="outline" size="icon" className="rounded-full" onClick={nextSlide}>
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

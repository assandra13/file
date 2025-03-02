"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

export function GallerySection({ images = [] }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // If no images are provided, use placeholders
  const galleryImages =
    images.length > 0
      ? images
      : [
          { id: "1", url: "/placeholder.svg?height=600&width=800", title: "Project 1" },
          { id: "2", url: "/placeholder.svg?height=600&width=800", title: "Project 2" },
          { id: "3", url: "/placeholder.svg?height=600&width=800", title: "Project 3" },
          { id: "4", url: "/placeholder.svg?height=600&width=800", title: "Project 4" },
          { id: "5", url: "/placeholder.svg?height=600&width=800", title: "Project 5" },
        ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl font-bold mb-4">
            Galeri Kami
          </motion.h2>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="w-20 h-1 bg-primary mx-auto mb-6"></motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lihat beberapa proyek dan kegiatan yang telah kami lakukan.
          </motion.p>
        </div>

        <div ref={ref} className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.div key={currentIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="relative aspect-[16/9]">
                <img src={galleryImages[currentIndex].url || "/placeholder.svg"} alt={galleryImages[currentIndex].title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold">{galleryImages[currentIndex].title}</h3>
                  {galleryImages[currentIndex].description && <p className="text-white/80 mt-2">{galleryImages[currentIndex].description}</p>}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <Button variant="secondary" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white" onClick={prevSlide}>
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous</span>
          </Button>

          <Button variant="secondary" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white" onClick={nextSlide}>
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next</span>
          </Button>

          <div className="flex justify-center mt-6 space-x-2">
            {galleryImages.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-gray-300"}`} aria-label={`Go to slide ${index + 1}`} />
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className={`cursor-pointer rounded-lg overflow-hidden ${index === currentIndex ? "ring-4 ring-primary" : ""}`}
              onClick={() => goToSlide(index)}
            >
              <img src={image.url || "/placeholder.svg"} alt={image.title} className="w-full h-24 object-cover" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

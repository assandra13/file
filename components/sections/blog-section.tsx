"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { formatDate } from "../../lib/utils";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featured_image?: string;
  created_at: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

interface BlogSectionProps {
  posts: BlogPost[];
}

export function BlogSection({ posts = [] }: BlogSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // If no posts are provided, use placeholders
  const blogPosts =
    posts.length > 0
      ? posts
      : [
          {
            id: "1",
            title: "Strategi Bisnis untuk Pertumbuhan Berkelanjutan",
            excerpt: "Pelajari strategi bisnis terbaik untuk memastikan pertumbuhan berkelanjutan di era digital yang kompetitif.",
            slug: "strategi-bisnis-pertumbuhan-berkelanjutan",
            featured_image: "/placeholder.svg?height=400&width=600",
            created_at: new Date().toISOString(),
            author: {
              name: "Ahmad Fauzi",
              avatar: "/placeholder.svg?height=100&width=100",
            },
          },
          {
            id: "2",
            title: "Mengoptimalkan Kinerja Tim dalam Proyek Besar",
            excerpt: "Tips dan trik untuk meningkatkan produktivitas dan kolaborasi tim saat menangani proyek-proyek berskala besar.",
            slug: "mengoptimalkan-kinerja-tim-proyek-besar",
            featured_image: "/placeholder.svg?height=400&width=600",
            created_at: new Date(Date.now() - 86400000).toISOString(),
            author: {
              name: "Siti Rahma",
              avatar: "/placeholder.svg?height=100&width=100",
            },
          },
          {
            id: "3",
            title: "Inovasi Teknologi dalam Industri Konstruksi",
            excerpt: "Bagaimana teknologi terbaru mengubah cara industri konstruksi beroperasi dan meningkatkan efisiensi.",
            slug: "inovasi-teknologi-industri-konstruksi",
            featured_image: "/placeholder.svg?height=400&width=600",
            created_at: new Date(Date.now() - 172800000).toISOString(),
            author: {
              name: "Budi Santoso",
              avatar: "/placeholder.svg?height=100&width=100",
            },
          },
        ];

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

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl font-bold mb-4">
            Blog & Artikel
          </motion.h2>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="w-20 h-1 bg-primary mx-auto mb-6"></motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Temukan wawasan dan informasi terbaru dari tim ahli kami.
          </motion.p>
        </div>

        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={itemVariants} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48 overflow-hidden">
                  <img src={post.featured_image || "/placeholder.svg?height=400&width=600"} alt={post.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">{post.title}</h3>
                </Link>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-primary font-medium hover:underline">
                  Baca Selengkapnya
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button asChild>
            <Link href="/blog">
              Lihat Semua Artikel
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

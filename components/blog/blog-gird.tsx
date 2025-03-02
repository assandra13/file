"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "../../lib/utils";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featured_image?: string;
  created_at: string;
}

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <>
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Belum ada artikel</h2>
          <p className="text-gray-600">Artikel akan segera ditambahkan. Silakan kunjungi kembali nanti.</p>
        </div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
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
      )}
    </>
  );
}

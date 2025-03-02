"use client";

import type React from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "../../lib/utils";
import { Search, Calendar, Tag } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface RecentPost {
  id: string;
  title: string;
  slug: string;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface BlogSidebarProps {
  recentPosts: RecentPost[];
  categories: Category[];
}

export function BlogSidebar({ recentPosts, categories }: BlogSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4">Cari Artikel</h3>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input type="text" placeholder="Kata kunci..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1" />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4">Artikel Terbaru</h3>
        {recentPosts.length === 0 ? (
          <p className="text-gray-500">Belum ada artikel terbaru.</p>
        ) : (
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex gap-3">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                  <img src="/placeholder.svg?height=100&width=100" alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <Link href={`/blog/${post.slug}`}>
                    <h4 className="font-medium line-clamp-2 hover:text-primary transition-colors">{post.title}</h4>
                  </Link>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4">Kategori</h3>
        {categories.length === 0 ? (
          <p className="text-gray-500">Belum ada kategori.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link key={category.id} href={`/blog?category=${category.slug}`} className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm hover:bg-primary hover:text-white transition-colors">
                <Tag className="h-3 w-3 mr-1" />
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

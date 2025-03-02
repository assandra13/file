"use client";

import { motion } from "framer-motion";
import { formatDate } from "../../lib/utils";
import { Calendar, Share2, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  featured_image?: string;
  created_at: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

interface BlogPostProps {
  post: BlogPost;
}

export function BlogPost({ post }: BlogPostProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post.title;

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, "_blank");
  };

  const shareOnInstagram = () => {
    // Instagram doesn't have a direct share URL, but we can open Instagram
    window.open("https://www.instagram.com/", "_blank");
  };

  return (
    <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-lg shadow-lg overflow-hidden">
      {post.featured_image && (
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img src={post.featured_image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Bagikan
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={shareOnFacebook}>
                <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                Facebook
              </DropdownMenuItem>
              <DropdownMenuItem onClick={shareOnTwitter}>
                <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                Twitter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={shareOnInstagram}>
                <Instagram className="h-4 w-4 mr-2 text-pink-600" />
                Instagram
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

        {post.author && (
          <div className="flex items-center mb-8 pb-8 border-b">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <img src={post.author.avatar || "/placeholder.svg?height=100&width=100"} alt={post.author.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-gray-500">Penulis</p>
            </div>
          </div>
        )}

        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-8 pt-8 border-t flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={shareOnFacebook}>
            <Facebook className="h-4 w-4 mr-2 text-blue-600" />
            Facebook
          </Button>
          <Button variant="outline" size="sm" onClick={shareOnTwitter}>
            <Twitter className="h-4 w-4 mr-2 text-blue-400" />
            Twitter
          </Button>
          <Button variant="outline" size="sm" onClick={shareOnInstagram}>
            <Instagram className="h-4 w-4 mr-2 text-pink-600" />
            Instagram
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "../ui/card";
import { RichTextEditor } from "../admin/rict-text-editor";
import { slugify } from "../../lib/utils";
import { ArrowLeft, Save } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  created_at: string;
  updated_at?: string;
  status?: string;
}

interface BlogPostFormProps {
  post?: BlogPost;
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const isEditing = !!post;

  useEffect(() => {
    if (!isSlugManuallyEdited && title) {
      setSlug(slugify(title));
    }
  }, [title, isSlugManuallyEdited]);

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugManuallyEdited(true);
    setSlug(slugify(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !slug || !excerpt || !content) {
      toast({
        title: "Validasi gagal",
        description: "Harap isi semua field yang diperlukan.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const postData = {
        title,
        slug,
        excerpt,
        content,
        featured_image: featuredImage,
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        // Update existing post
        const { error } = await supabase.from("blog_posts").update(postData).eq("id", post.id);

        if (error) throw error;

        toast({
          title: "Artikel berhasil diperbarui",
          description: "Perubahan pada artikel telah disimpan.",
        });
      } else {
        // Create new post
        const { error } = await supabase.from("blog_posts").insert({
          ...postData,
          created_at: new Date().toISOString(),
          status: "Published",
        });

        if (error) throw error;

        toast({
          title: "Artikel berhasil dibuat",
          description: "Artikel baru telah dipublikasikan.",
        });
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (error: any) {
      toast({
        title: isEditing ? "Gagal memperbarui artikel" : "Gagal membuat artikel",
        description: error.message || "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyimpan...
              </span>
            ) : (
              <span className="flex items-center">
                <Save className="mr-2 h-4 w-4" />
                Simpan Artikel
              </span>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Artikel</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan judul artikel" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug URL</Label>
            <Input id="slug" value={slug} onChange={handleSlugChange} placeholder="slug-url-artikel" required />
            <p className="text-xs text-gray-500">URL: https://ciptamandiriperkasa.id/blog/{slug}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Ringkasan</Label>
            <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Masukkan ringkasan singkat artikel (akan ditampilkan di halaman blog)" rows={3} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="featured_image">URL Gambar Utama</Label>
            <Input id="featured_image" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} placeholder="https://example.com/image.jpg" />
            <p className="text-xs text-gray-500">Masukkan URL gambar utama artikel</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Konten Artikel</Label>
            <Tabs defaultValue="editor">
              <TabsList className="mb-2">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="editor">
                <Card>
                  <CardContent className="p-0">
                    <RichTextEditor value={content} onChange={setContent} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="preview">
                <Card>
                  <CardContent className="prose max-w-none p-6">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </form>
  );
}

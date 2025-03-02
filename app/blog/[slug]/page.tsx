import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "../../../lib/supabase/server";
import { Navbar } from "../../../components/navbar";
import { Footer } from "../../../components/footer";
import { BlogPost } from "../../../components/blog/blog-post";
import { BlogSidebar } from "../../../components/blog/blog-sidebar";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const supabase = createClient();

  const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", params.slug).single();

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan - Cipta Mandiri Perkasa",
      description: "Artikel yang Anda cari tidak ditemukan.",
    };
  }

  return {
    title: `${post.title} - Cipta Mandiri Perkasa`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://ciptamandiriperkasa.id/blog/${post.slug}`,
      images: post.featured_image ? [{ url: post.featured_image }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const supabase = createClient();

  // Fetch the blog post
  const { data: post } = await supabase.from("blog_posts").select("*").eq("slug", params.slug).single();

  if (!post) {
    notFound();
  }

  // Fetch recent posts for sidebar
  const { data: recentPosts } = await supabase.from("blog_posts").select("id, title, slug, created_at").neq("id", post.id).order("created_at", { ascending: false }).limit(5);

  // Fetch categories for sidebar
  const { data: categories } = await supabase.from("categories").select("*").order("name", { ascending: true });

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BlogPost post={post} />
            </div>

            <div>
              <BlogSidebar recentPosts={recentPosts || []} categories={categories || []} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

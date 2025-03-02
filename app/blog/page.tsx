import type { Metadata } from "next";
import { createClient } from "../../lib/supabase/client";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { BlogHeader } from "../../components/blog/blog-header";
import { BlogGrid } from "../../components/blog/blog-gird";
import { Pagination } from "../../components/blog/pagination";

export const metadata: Metadata = {
  title: "Blog - Cipta Mandiri Perkasa",
  description: "Artikel dan berita terbaru dari Cipta Mandiri Perkasa",
};

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 9;

  const supabase = createClient();

  // Get total count
  const { count } = await supabase.from("blog_posts").select("*", { count: "exact", head: true });

  // Fetch paginated posts
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })
    .range((currentPage - 1) * postsPerPage, currentPage * postsPerPage - 1);

  const totalPages = Math.ceil((count || 0) / postsPerPage);

  return (
    <main className="min-h-screen">
      <Navbar />

      <BlogHeader />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <BlogGrid posts={posts || []} />

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

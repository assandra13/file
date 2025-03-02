import { createClient } from "../../../../../lib/supabase/server";
import { DashboardHeader } from "../../../../../components/admin/dashboard-header";
import { BlogPostForm } from "../../../../../components/admin/blog-post-form";
import { notFound } from "next/navigation";

interface EditBlogPostPageProps {
  params: {
    id: string;
  };
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const supabase = createClient();

  // Fetch the blog post
  const { data: post } = await supabase.from("blog_posts").select("*").eq("id", params.id).single();

  if (!post) {
    notFound();
  }

  return (
    <div className="p-6">
      <DashboardHeader title="Edit Artikel" description="Edit artikel blog yang sudah ada" />

      <div className="mt-6">
        <BlogPostForm post={post} />
      </div>
    </div>
  );
}

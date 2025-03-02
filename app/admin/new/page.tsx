import { DashboardHeader } from "../../../components/admin/dashboard-header";
import { BlogPostForm } from "../../../components/admin/blog-post-form";

export default function NewBlogPostPage() {
  return (
    <div className="p-6">
      <DashboardHeader title="Artikel Baru" description="Buat artikel blog baru untuk website Anda" />

      <div className="mt-6">
        <BlogPostForm />
      </div>
    </div>
  );
}

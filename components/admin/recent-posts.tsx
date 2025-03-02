import Link from "next/link";
import { formatDate } from "../../lib/utils";
import { Button } from "../ui/button";
import { ArrowRight, Edit } from "lucide-react";

interface Post {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  status?: string;
}

interface RecentPostsProps {
  posts: Post[];
}

export function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Artikel Terbaru</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/blog">
            Lihat Semua
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Belum ada artikel yang dibuat.</div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">{post.title}</h3>
                <p className="text-sm text-gray-500">
                  {formatDate(post.created_at)} • {post.status || "Published"}
                </p>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/admin/blog/${post.id}/edit`}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Link>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

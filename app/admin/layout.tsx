import type React from "react";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { AdminSidebar } from "../../components/admin/admin-sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If not authenticated, redirect to login page
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

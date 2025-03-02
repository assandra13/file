"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { LayoutDashboard, FileText, Image, MessageSquare, Settings, LogOut, Menu, X, ChevronRight } from "lucide-react";

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logout berhasil",
      description: "Anda telah keluar dari sistem admin.",
    });
    router.push("/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin/dashboard",
    },
    {
      title: "Blog",
      icon: <FileText className="h-5 w-5" />,
      href: "/admin/blog",
    },
    {
      title: "Galeri",
      icon: <Image className="h-5 w-5" />,
      href: "/admin/gallery",
    },
    {
      title: "Testimoni",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/admin/testimonials",
    },
    {
      title: "Pengaturan",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
    },
  ];

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/admin/dashboard" className="text-xl font-bold text-primary">
              Admin Panel
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link key={item.href} href={item.href} className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"}`}>
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                  {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile toggle button */}
      <Button variant="outline" size="icon" onClick={toggleSidebar} className={`fixed bottom-4 right-4 z-50 rounded-full shadow-lg md:hidden ${isOpen ? "hidden" : "flex"}`}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open sidebar</span>
      </Button>
    </>
  );
}

import { FileText, Image, MessageSquare, Users } from "lucide-react";

interface DashboardStatsProps {
  postsCount: number;
  galleryCount: number;
  testimonialCount: number;
}

export function DashboardStats({ postsCount, galleryCount, testimonialCount }: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Artikel",
      value: postsCount,
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      color: "bg-blue-50 text-blue-500",
    },
    {
      title: "Galeri",
      value: galleryCount,
      icon: <Image className="h-8 w-8 text-green-500" />,
      color: "bg-green-50 text-green-500",
    },
    {
      title: "Testimoni",
      value: testimonialCount,
      icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
      color: "bg-purple-50 text-purple-500",
    },
    {
      title: "Pengunjung Bulan Ini",
      value: "1,234",
      icon: <Users className="h-8 w-8 text-orange-500" />,
      color: "bg-orange-50 text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

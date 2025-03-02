"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../lib/supabase/client";
import { formatDate } from "../../lib/utils";
import { FileText, Image, MessageSquare } from "lucide-react";

interface Activity {
  id: string;
  user: string;
  action: string;
  resource_type: string;
  resource_id: string;
  created_at: string;
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchActivities() {
      try {
        // This would be a real API call in a production app
        // For now, we'll simulate some activity data
        const mockActivities: Activity[] = [
          {
            id: "1",
            user: "Admin",
            action: "created",
            resource_type: "blog_post",
            resource_id: "1",
            created_at: new Date().toISOString(),
          },
          {
            id: "2",
            user: "Admin",
            action: "updated",
            resource_type: "gallery",
            resource_id: "2",
            created_at: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            id: "3",
            user: "Admin",
            action: "deleted",
            resource_type: "testimonial",
            resource_id: "3",
            created_at: new Date(Date.now() - 7200000).toISOString(),
          },
        ];

        setActivities(mockActivities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchActivities();
  }, []);

  const getActivityIcon = (resourceType: string) => {
    switch (resourceType) {
      case "blog_post":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "gallery":
        return <Image className="h-4 w-4 text-green-500" />;
      case "testimonial":
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityText = (activity: Activity) => {
    const resourceTypeMap: Record<string, string> = {
      blog_post: "artikel",
      gallery: "gambar galeri",
      testimonial: "testimoni",
    };

    const actionMap: Record<string, string> = {
      created: "membuat",
      updated: "memperbarui",
      deleted: "menghapus",
    };

    const resourceType = resourceTypeMap[activity.resource_type] || activity.resource_type;
    const action = actionMap[activity.action] || activity.action;

    return `${activity.user} ${action} ${resourceType}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-bold mb-6">Aktivitas Terbaru</h2>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Belum ada aktivitas terbaru.</div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
              <div className="bg-white p-2 rounded-full border">{getActivityIcon(activity.resource_type)}</div>
              <div className="ml-4">
                <p className="text-sm font-medium">{getActivityText(activity)}</p>
                <p className="text-xs text-gray-500">{formatDate(activity.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

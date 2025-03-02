export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          featured_image: string | null;
          created_at: string;
          updated_at: string | null;
          status: string | null;
          author_id: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          featured_image?: string | null;
          created_at: string;
          updated_at?: string | null;
          status?: string | null;
          author_id?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          featured_image?: string | null;
          created_at?: string;
          updated_at?: string | null;
          status?: string | null;
          author_id?: string | null;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          created_at?: string;
        };
      };
      gallery: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          url?: string;
          created_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          position: string | null;
          company: string | null;
          content: string;
          rating: number;
          avatar: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          position?: string | null;
          company?: string | null;
          content: string;
          rating: number;
          avatar?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          position?: string | null;
          company?: string | null;
          content?: string;
          rating?: number;
          avatar?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

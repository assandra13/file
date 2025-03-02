import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { HeroSection } from "../components/sections/hero-section";
import { AboutSection } from "../components/sections/about-section";
import { GallerySection } from "../components/sections/gallery-section";
import { BlogSection } from "../components/sections/blog-section";
import { TestimonialSection } from "../components/sections/testimonial-section";
import { ContactSection } from "../components/sections/contact-section";
import { createClient } from "../lib/supabase/client";

export default async function Home() {
  const supabase = createClient();

  // Fetch latest blog posts
  const { data: blogPosts } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false }).limit(3);

  // Fetch testimonials
  const { data: testimonials } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });

  // Fetch gallery images
  const { data: galleryImages } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GallerySection images={galleryImages || []} />
      <BlogSection posts={blogPosts || []} />
      <TestimonialSection testimonials={testimonials || []} />
      <ContactSection />
      <Footer />
    </main>
  );
}

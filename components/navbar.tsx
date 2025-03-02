"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/#about", label: "Tentang Kami" },
    { href: "/#gallery", label: "Galeri" },
    { href: "/#blog", label: "Blog" },
    { href: "/#testimonials", label: "Testimoni" },
    { href: "/#contact", label: "Kontak" },
  ];

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm" initial={{ y: 0 }} animate={{ y: hidden ? -100 : 0 }} transition={{ duration: 0.3 }}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          Cipta Mandiri Perkasa
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-gray-700 hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div className="md:hidden bg-white" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-700 hover:text-primary transition-colors py-2" onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                Login
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

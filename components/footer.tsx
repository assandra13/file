import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Cipta Mandiri Perkasa</h3>
            <p className="text-gray-400 mb-4">Menyediakan solusi bisnis terpercaya untuk membantu Anda mencapai kesuksesan.</p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://instagram.com" className="hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Tautan</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-400 hover:text-primary transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-400 hover:text-primary transition-colors">
                  Layanan
                </Link>
              </li>
              <li>
                <Link href="/#blog" className="text-gray-400 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-400 hover:text-primary transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Kontak</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-400">Jl. Contoh No. 123, Jakarta Selatan, Indonesia</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span className="text-gray-400">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <span className="text-gray-400">info@ciptamandiriperkasa.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Cipta Mandiri Perkasa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

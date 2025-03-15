'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Footer() {
  const { status } = useSession();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-orange-500 text-white py-8 px-4 sm:px-6 shadow-lg">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding Section */}
        <div className="flex flex-col items-center md:items-start">
          <div className="text-2xl font-extrabold flex items-center gap-2">
            <span className="text-3xl animate-bounce">🌟</span> 9ties
          </div>
          <p className="mt-2 text-sm sm:text-base text-yellow-200">
            Light up your earnings with us! 🪔
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold text-yellow-400 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <Link href="/terms" className="hover:text-yellow-200 transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-yellow-200 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-200 transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact/Social Section */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-bold text-yellow-400 mb-4">Get in Touch</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="flex items-center gap-2">
              <span className="text-xl">✉️</span>
              <a href="mailto:webtoonviralhit@gmail.com" className="hover:text-yellow-200 transition-colors">
                support@9ties.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-xl">📱</span>
              <a href="https://wa.me/9707839680" className="hover:text-yellow-200 transition-colors">
                +91 9707839680
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-4">
            {/* Placeholder for social icons */}
            <a href="#" className="text-2xl hover:text-yellow-200 transition-colors">📘</a>
            <a href="#" className="text-2xl hover:text-yellow-200 transition-colors">🐦</a>
            <a href="#" className="text-2xl hover:text-yellow-200 transition-colors">📸</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-yellow-400 pt-4 text-center text-sm sm:text-base text-yellow-200">
        © {currentYear} 9ties. All rights reserved. 🌸 Made with 💖 in India.
      </div>
    </footer>
  );
}
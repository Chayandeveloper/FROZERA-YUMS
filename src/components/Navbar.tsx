"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Our Products", href: "#products" },
    { name: "Why Frozera", href: "#why-frozera" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-primary-900/80 backdrop-blur-md border-b border-white/10 py-3 shadow-lg" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full border border-accent/30 overflow-hidden bg-blue-900 shadow-[0_0_15px_rgba(212,165,116,0.2)] group-hover:border-accent transition-colors">
            <img 
              src="/products/WhatsApp Image 2026-07-14 at 15.26.06.jpeg" 
              alt="Frozera Yums Logo" 
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <span className="font-display font-bold text-xl tracking-wide text-white group-hover:text-accent transition-colors">
            Frozera <span className="text-accent group-hover:text-white transition-colors">Yums</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button className="group relative overflow-hidden bg-accent text-primary-900 px-6 py-2.5 rounded-full font-bold text-sm tracking-wide shadow-[0_0_15px_rgba(212,165,116,0.4)] hover:shadow-[0_0_25px_rgba(212,165,116,0.6)] transition-all flex items-center gap-2">
             <ShoppingCart className="w-4 h-4" />
             <span>Order Now</span>
             {/* Shine effect */}
             <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white hover:text-accent transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-primary-900/95 backdrop-blur-lg border-b border-white/10 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col px-4 gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-white/80 hover:text-accent font-medium text-lg py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-accent text-primary-900 w-full py-3 rounded-xl font-bold mt-2 flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" /> Order Now
          </button>
        </div>
      </div>

      {/* Global Shine Keyframe */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shine {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
      `}} />
    </nav>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ChevronDown, Leaf } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate headline words on load
      const words = headlineRef.current?.querySelectorAll('.headline-word');
      if (words) {
        gsap.fromTo(words, 
          { opacity: 0, y: 40, rotateX: -20 },
          {
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            duration: 1.2, 
            stagger: 0.2, 
            ease: "back.out(1.2)",
            delay: 0.2 // Small delay so the page can load
          }
        );
      }

      // Fade out scroll cue on scroll
      if (scrollCueRef.current && heroRef.current) {
        gsap.to(scrollCueRef.current, {
          opacity: 0,
          y: 20,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-primary-900 perspective-1000">
      
      {/* --- BACKGROUND LAYERS --- */}
      
      {/* Blurred Product Photo */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/products/3.jpeg" 
          alt="Frozen Nuggets Background" 
          className="w-full h-full object-cover opacity-60 blur-md scale-105" 
        />
        {/* Dark Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/90 via-primary-900/70 to-primary-900" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Diagonal Texture Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 10px)`
        }}
      />

      {/* Ambient Steam/Particles (CSS Animated SVG) */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center opacity-40 mix-blend-screen">
         <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* We use CSS keyframes (defined below) to animate these up */}
            <path className="steam-particle-1" d="M30 110 Q20 50 40 -10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path className="steam-particle-2" d="M50 110 Q70 60 40 -10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path className="steam-particle-3" d="M70 110 Q60 50 80 -10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
         </svg>
      </div>

      {/* Ambient center glow behind everything */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/15 blur-[120px] rounded-full z-0 pointer-events-none" />

      
      {/* --- FOREGROUND CONTENT --- */}
      
      <div className="z-10 flex flex-col items-center text-center space-y-6 px-4">
        
        {/* Logo with Pulsing Gold Halo */}
        <div className="relative w-36 h-36 mb-4 flex items-center justify-center">
          {/* Pulsing Halo Rings */}
          <div className="absolute inset-[-10px] rounded-full border-2 border-accent/40 animate-[spin_10s_linear_infinite] opacity-60" />
          <div className="absolute inset-[-20px] rounded-full border border-accent/20 animate-[spin_15s_linear_infinite_reverse] opacity-40" />
          <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl animate-pulse" />
          
          {/* Actual Logo Image */}
          <div className="relative w-full h-full rounded-full border-4 border-white/20 overflow-hidden shadow-[0_0_40px_rgba(212,165,116,0.3)] bg-blue-900/50 backdrop-blur-md">
            <img 
              src="/products/WhatsApp Image 2026-07-14 at 15.26.06.jpeg" 
              alt="Frozera Yums Logo" 
              className="w-full h-full object-cover scale-110"
            />
          </div>
        </div>

        {/* Staggered Headline */}
        <h1 ref={headlineRef} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight flex flex-wrap justify-center gap-x-4 gap-y-2 preserve-3d">
          <span className="headline-word inline-block drop-shadow-xl">Vegetarian</span>
          <span className="headline-word inline-block text-accent drop-shadow-[0_0_30px_rgba(212,165,116,0.4)]">Frozen</span>
          <span className="headline-word inline-block drop-shadow-xl">Delights</span>
        </h1>
        
        {/* Animated Veg Pill */}
        <div className="headline-word inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/40 border border-accent/30 backdrop-blur-md shadow-[0_0_20px_rgba(212,165,116,0.15)] mt-4">
          <Leaf className="w-5 h-5 text-accent animate-[sway_3s_ease-in-out_infinite]" />
          <span className="font-medium text-white/90 tracking-wide">100% Pure Veg · No Onion No Garlic</span>
        </div>
        
      </div>

      {/* --- SCROLL CUE --- */}
      
      <div ref={scrollCueRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-semibold animate-pulse">Scroll to explore</span>
        <ChevronDown className="w-6 h-6 text-accent/80 animate-bounce" />
      </div>

      {/* CSS for custom keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sway {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        
        .steam-particle-1 {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: steamUp 8s linear infinite;
        }
        .steam-particle-2 {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: steamUp 12s linear infinite 2s;
        }
        .steam-particle-3 {
          stroke-dasharray: 90;
          stroke-dashoffset: 90;
          animation: steamUp 10s linear infinite 4s;
        }
        
        @keyframes steamUp {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
      `}} />
    </section>
  );
}

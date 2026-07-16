"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CheckCircle2, ShieldCheck, ThermometerSnowflake, Utensils, Factory } from "lucide-react";

export default function WhyFrozera() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        
        const cards = gsap.utils.toArray('.bento-card');
        const icons = gsap.utils.toArray('.bento-icon');
        
        // Staggered card entrance
        gsap.fromTo(cards, 
          { opacity: 0, y: 50 },
          {
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.15, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        );

        // Icon draw-in/rotate scale animation
        icons.forEach((icon: any) => {
          gsap.fromTo(icon,
            { scale: 0, rotate: -45, opacity: 0 },
            {
              scale: 1,
              rotate: 0,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: icon,
                start: "top 85%",
              }
            }
          );
        });
      }
    }, sectionRef);
    
    return () => {
      ctx.revert();
    };
  }, []);

  const features = [
    {
      id: "fssai",
      title: "FSSAI Certified",
      desc: "Meeting the highest standards of food safety and quality assurance.",
      icon: <ShieldCheck className="w-8 h-8 text-accent relative z-10 bento-icon transition-transform group-hover:scale-110" />,
      stat: "Lic. 103XXXXXXXXXXX",
      bgClass: "bg-gradient-to-br from-primary-800 to-primary-900",
      className: "col-span-1 md:col-span-2 lg:col-span-1",
      pattern: "radial-gradient(circle at 100% 0%, rgba(212,165,116,0.05) 0%, transparent 50%)"
    },
    {
      id: "frozen",
      title: "Frozen Fresh",
      desc: "Flash-frozen immediately after prep to lock in taste and texture.",
      icon: <ThermometerSnowflake className="w-8 h-8 text-accent relative z-10 bento-icon transition-transform group-hover:scale-110" />,
      stat: "-18°C Maintained",
      bgClass: "bg-gradient-to-bl from-primary-800 to-primary-900",
      className: "col-span-1 md:col-span-2 lg:col-span-1",
      pattern: "radial-gradient(circle at 0% 100%, rgba(255,255,255,0.03) 0%, transparent 60%)"
    },
    {
      id: "easy",
      title: "Easy to Cook",
      desc: "From freezer to plate in minutes. No thawing required.",
      icon: <Utensils className="w-8 h-8 text-accent relative z-10 bento-icon transition-transform group-hover:scale-110" />,
      stat: "0 Mins Thawing",
      bgClass: "bg-gradient-to-tr from-primary-800 to-primary-900",
      className: "col-span-1 md:col-span-2 lg:col-span-1",
      pattern: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212,165,116,0.02) 10px, rgba(212,165,116,0.02) 20px)"
    },
    {
      id: "hygiene",
      title: "Hygienic Manufacturing",
      desc: "Produced in our state-of-the-art facility in Guwahati, Assam.",
      icon: <Factory className="w-8 h-8 text-accent relative z-10 bento-icon transition-transform group-hover:scale-110" />,
      stat: "ISO Compliant",
      bgClass: "bg-gradient-to-tl from-primary-800 to-primary-900",
      className: "col-span-1 md:col-span-2 lg:col-span-1",
      pattern: "radial-gradient(circle at 50% 50%, rgba(212,165,116,0.05) 0%, transparent 70%)"
    }
  ];

  return (
    <section ref={sectionRef} id="why-frozera" className="py-32 px-4 bg-primary-800 relative overflow-hidden">
      {/* Subtle Diagonal Line Texture matching top bar requested style */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 10px)`
        }}
      />
      
      {/* Top Border Glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 bento-card">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Why <span className="text-accent">Frozera Yums?</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            We believe frozen food should never compromise on quality, taste, or nutrition.
          </p>
        </div>

        {/* Bento Grid: 4 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* FEATURED TILE (Spans 2x2 on desktop) */}
          <div className="bento-card group relative col-span-1 md:col-span-4 lg:col-span-2 row-span-2 rounded-3xl overflow-hidden border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(212,165,116,0.2)] hover:border-accent/40 bg-primary-900">
            {/* Blurred Product Background Photo */}
            <div className="absolute inset-0 z-0">
               <img src="/products/3.jpeg" alt="Real Ingredients" className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700 blur-[2px]" />
               <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/80 to-transparent" />
               <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/60 to-transparent" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
              <div className="mb-auto">
                <div className="inline-flex relative p-[2px] rounded-full bg-gradient-to-tr from-accent/20 to-accent shadow-[0_0_15px_rgba(212,165,116,0.3)] mb-6 overflow-hidden">
                  <div className="absolute inset-0 bg-primary-900/80 rounded-full" />
                  <div className="p-4 relative">
                    <CheckCircle2 className="w-12 h-12 text-accent bento-icon transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest rounded mb-4">
                  100% Pure Veg
                </div>
                <h3 className="font-display text-4xl font-bold text-white mb-4">Real Ingredients</h3>
                <p className="text-white/70 text-lg leading-relaxed max-w-md">
                  No artificial fillers, colors, or preservatives. Just pure, wholesome goodness sourced from the finest local farms to guarantee authentic taste in every single bite.
                </p>
              </div>
            </div>
          </div>

          {/* STANDARD TILES (Remaining 4) */}
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className={`bento-card group relative rounded-3xl overflow-hidden border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(212,165,116,0.2)] hover:border-accent/40 ${feature.bgClass} ${feature.className} p-6 flex flex-col`}
            >
              {/* Subtle CSS background pattern */}
              <div 
                className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500" 
                style={{ backgroundImage: feature.pattern }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  {/* Glowing Gradient Ring */}
                  <div className="inline-flex relative p-[2px] rounded-full bg-gradient-to-br from-accent/20 to-accent/80 shadow-[0_0_10px_rgba(212,165,116,0.2)]">
                    <div className="absolute inset-0 bg-primary-900 rounded-full" />
                    <div className="p-3 relative">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Subtle Stat/Number */}
                  <span className="font-mono text-xs text-accent/80 bg-accent/5 px-2 py-1 rounded border border-accent/10">
                    {feature.stat}
                  </span>
                </div>
                
                <div className="mt-auto">
                  <h3 className="font-display text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

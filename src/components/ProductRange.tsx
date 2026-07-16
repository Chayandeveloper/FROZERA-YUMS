"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Info, ShoppingCart } from "lucide-react";

// --- Subcomponent: 3D Tilt Card ---
function ProductCard({ product, index }: { product: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [packSizeIndex, setPackSizeIndex] = useState(0);

  // Price animation refs
  const priceRef = useRef<HTMLSpanElement>(null);
  const priceVal = useRef({ val: product.packs[0].priceValue });

  useEffect(() => {
    const targetPrice = product.packs[packSizeIndex].priceValue;
    
    // Animate the price number up/down
    gsap.to(priceVal.current, {
      val: targetPrice,
      duration: 0.4,
      ease: "power2.out",
      onUpdate: () => {
        if (priceRef.current) {
          priceRef.current.innerText = `₹${Math.round(priceVal.current.val)}`;
        }
      }
    });
  }, [packSizeIndex, product.packs]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation limits (-10 to 10 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 }); // Reset position
  };

  return (
    <div 
      className="product-card-container relative perspective-1000 w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className="product-card relative rounded-3xl bg-gradient-to-b from-primary-800 to-primary-900 border border-white/10 p-8 shadow-2xl h-full flex flex-col transition-all duration-200 ease-out preserve-3d"
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)` 
            : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
          boxShadow: isHovered 
            ? `0 30px 60px -12px rgba(0,0,0,0.5), 0 0 40px -10px rgba(212, 165, 116, 0.4)` 
            : `0 20px 40px -10px rgba(0,0,0,0.5), 0 0 0 0 rgba(212, 165, 116, 0)`,
        }}
      >
        {/* Animated Glowing Accent Behind Card Content */}
        <div 
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(212,165,116,0.15),transparent_80%)]"
          style={{
            opacity: isHovered ? 1 : 0,
            '--mouse-x': isHovered ? `${(rotation.y / 10 + 1) * 50}%` : '50%',
            '--mouse-y': isHovered ? `${(rotation.x / -10 + 1) * 50}%` : '50%',
          } as React.CSSProperties}
        />

        {/* Floating Badge */}
        <div className="absolute top-6 left-6 z-30 pointer-events-none translate-z-20">
          <div className="relative bg-accent text-primary-900 font-bold uppercase tracking-wider text-xs px-4 py-1.5 shadow-[0_10px_20px_rgba(0,0,0,0.3)] rounded-full border border-accent-dark/20">
            {product.badge}
          </div>
        </div>

        {/* Floating Product Image Container */}
        <div className="relative w-full h-48 sm:h-64 mb-6 sm:mb-10 translate-z-10 pointer-events-none flex justify-center items-center">
          {/* Soft radial shadow under the floating product */}
          <div className="absolute bottom-0 w-3/4 h-8 bg-black/60 blur-[20px] rounded-full translate-y-6" />
          
          {/* Steam Wisp SVG */}
          <svg className="absolute w-full h-full opacity-30 text-white animate-pulse mix-blend-screen -translate-y-4" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M40 80 Q30 60 50 40 T60 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-50" />
            <path d="M60 90 Q80 70 50 50 T40 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-30" />
            <path d="M50 85 Q45 65 55 45 T50 15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-40" />
          </svg>

          {/* Product Image */}
          <div className="relative w-48 sm:w-56 h-48 sm:h-64 transform rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500 rounded-2xl overflow-hidden shadow-[0_20px_30px_rgba(0,0,0,0.4)] border-2 border-white/20 bg-black/40 p-2">
            <img src={product.imageSrc} alt={product.name} className="w-full h-full object-contain hover:scale-105 transition-transform duration-700 rounded-xl" />
          </div>
        </div>

        {/* Text Content */}
        <div className="relative z-20 translate-z-10 flex flex-col flex-grow">
          <h3 className="font-display text-3xl font-bold text-white mb-3">
            {product.name}
          </h3>
          <p className="text-white/60 text-sm mb-6 flex-grow">
            {product.description}
          </p>

          <div className="space-y-6">
            {/* Interactive Pack Size & Price */}
            <div className="flex items-center justify-between bg-black/30 border border-white/5 rounded-2xl p-2 backdrop-blur-sm">
              <div className="flex bg-white/5 rounded-xl p-1">
                {product.packs.map((pack: any, pIdx: number) => (
                  <button
                    key={pIdx}
                    onClick={() => setPackSizeIndex(pIdx)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      packSizeIndex === pIdx 
                        ? 'bg-accent text-primary-900 shadow-md' 
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {pack.size}
                  </button>
                ))}
              </div>
              <div className="pr-4 text-right">
                <span className="text-xs text-white/40 uppercase tracking-wider block mb-0.5">Price</span>
                <span ref={priceRef} className="text-accent font-display font-bold text-2xl drop-shadow-sm">
                  ₹{product.packs[0].priceValue}
                </span>
              </div>
            </div>

            {/* Cooking Info */}
            <div className="flex items-start gap-4">
               <Info className="w-5 h-5 text-accent/70 shrink-0 mt-0.5" />
               <div className="text-sm text-white/50 space-y-1">
                 {product.cooking.map((method: any, mIdx: number) => (
                   <div key={mIdx} className="flex gap-2">
                     <span className="text-white/80 font-medium min-w-[70px]">{method.method}:</span>
                     <span>{method.time}</span>
                   </div>
                 ))}
               </div>
            </div>
            
            {/* CTA Button */}
            <button className="group relative w-full overflow-hidden bg-white/5 border border-accent/30 rounded-xl py-4 flex items-center justify-center gap-2 mt-4 transition-all hover:border-accent">
              <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <ShoppingCart className="w-5 h-5 text-accent group-hover:text-primary-900 relative z-10 transition-colors duration-300" />
              <span className="text-white font-bold group-hover:text-primary-900 relative z-10 transition-colors duration-300 tracking-wide uppercase">Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Section Component ---
export default function ProductRange() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const products = [
    {
      name: "Paneer Nuggets",
      badge: "Bestseller",
      imageSrc: "/products/2.jpeg",
      description: "Crispy on the outside, melt-in-your-mouth soft on the inside. Crafted with premium fresh malai paneer and aromatic spices.",
      packs: [
        { size: "8 pcs", priceValue: 99 },
        { size: "24 pcs", priceValue: 250 },
      ],
      cooking: [
        { method: "Air Fry", time: "10-12 mins at 200°C" },
        { method: "Deep Fry", time: "3-4 mins at 180°C" },
      ],
    },
    {
      name: "Corn Nuggets",
      badge: "100% Veg",
      imageSrc: "/products/3.jpeg",
      description: "Sweet golden corn kernels folded into a perfectly seasoned crispy coating. A guaranteed crowd-favorite snack.",
      packs: [
        { size: "8 pcs", priceValue: 99 },
        { size: "24 pcs", priceValue: 250 },
      ],
      cooking: [
        { method: "Air Fry", time: "10-12 mins at 200°C" },
        { method: "Deep Fry", time: "3-4 mins at 180°C" },
      ],
    },
    {
      name: "Crispy Aloo Tikki",
      badge: "Classic",
      imageSrc: "/products/4.jpeg",
      description: "Authentic Indian spiced potato patties with a perfectly crunchy exterior and soft, flavorful center.",
      packs: [
        { size: "8 pcs", priceValue: 89 },
        { size: "24 pcs", priceValue: 220 },
      ],
      cooking: [
        { method: "Air Fry", time: "12-15 mins at 200°C" },
        { method: "Shallow Fry", time: "5-6 mins medium heat" },
      ],
    },
    {
      name: "Cheese Corn Samosa",
      badge: "New",
      imageSrc: "/products/5.jpeg",
      description: "Bite-sized crispy triangles filled with melting gooey cheese and sweet corn kernels.",
      packs: [
        { size: "12 pcs", priceValue: 120 },
        { size: "30 pcs", priceValue: 280 },
      ],
      cooking: [
        { method: "Deep Fry", time: "3-5 mins at 180°C" },
        { method: "Air Fry", time: "10-12 mins at 200°C" },
      ],
    },
    {
      name: "Veggie Burger Patty",
      badge: "Favorite",
      imageSrc: "/products/6.jpeg",
      description: "Thick, juicy mixed vegetable patties packed with peas, carrots, and special herbs for the perfect burger.",
      packs: [
        { size: "6 pcs", priceValue: 149 },
        { size: "12 pcs", priceValue: 280 },
      ],
      cooking: [
        { method: "Pan Fry", time: "6-8 mins turning once" },
        { method: "Air Fry", time: "12-14 mins at 200°C" },
      ],
    },
    {
      name: "Spicy Spring Rolls",
      badge: "Spicy",
      imageSrc: "/products/WhatsApp Image 2026-07-15 at 19.48.11.jpeg",
      description: "Crispy rolls generously stuffed with spiced vegetables and glass noodles. A perfect party starter.",
      packs: [
        { size: "10 pcs", priceValue: 110 },
        { size: "25 pcs", priceValue: 260 },
      ],
      cooking: [
        { method: "Deep Fry", time: "4-5 mins at 180°C" },
        { method: "Air Fry", time: "10-12 mins at 200°C" },
      ],
    },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (typeof window !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
        
        const cards = gsap.utils.toArray('.product-card-container');
        
        gsap.fromTo(cards, 
          { opacity: 0, y: 100, rotateX: 10 },
          {
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            duration: 1, 
            stagger: 0.2, 
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        );
      }
    }, sectionRef);
    
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="products" className="relative py-32 px-4 bg-primary-900 border-t border-white/5 overflow-hidden">
      
      {/* Subtle Background Pattern (Diagonal lines) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 20px)`
        }}
      />
      
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-dark/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Our <span className="text-accent">Product Range</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Experience the perfect crunch with every bite. Crafted with real ingredients and flash-frozen immediately to lock in the absolute best flavor.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 perspective-1000">
          {products.map((product, idx) => (
            <ProductCard key={idx} product={product} index={idx} />
          ))}
        </div>
      </div>
      
      {/* Global CSS for 3D preservation */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .translate-z-10 { transform: translateZ(10px); }
        .translate-z-20 { transform: translateZ(20px); }
        .translate-z-40 { transform: translateZ(40px); }
      `}} />
    </section>
  );
}

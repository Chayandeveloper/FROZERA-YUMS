"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function CanvasScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const totalFrames = 300; 
  
  useEffect(() => {
    // Only register on client side
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    
    const isMobile = window.innerWidth < 768;
    // On mobile, sample fewer frames (e.g., 100 frames total by skipping every 2 frames)
    const frameCount = isMobile ? 100 : totalFrames;
    const frameSkip = isMobile ? 3 : 1; 
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const images: HTMLImageElement[] = [];
    const airframes = { frame: 0 };
    
    const currentFrame = (index: number) => {
      // frames are 1-indexed in filename: ezgif-frame-001.png
      const actualIndex = (index * frameSkip) + 1;
      const paddedIndex = actualIndex.toString().padStart(3, "0");
      return `/frames/ezgif-frame-${paddedIndex}.png`;
    };

    let loadedCount = 0;
    
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setLoaded(true);
          renderFrame(0);
        }
      };
      // For images that fail to load, we should also increment so we don't stall
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
          renderFrame(0);
        }
      };
      images.push(img);
    }
    
    const renderFrame = (index: number) => {
      if (images[index] && images[index].complete && images[index].naturalHeight !== 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        const img = images[index];
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
      }
    };

    let tl: gsap.core.Timeline;

    let ctx = gsap.context(() => {
      // Only create animation once loaded
      const initAnimation = () => {
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=400%", // 4x viewport height for scrolling
            scrub: 1, 
            pin: true,
          },
        });

        tl.to(airframes, {
          frame: frameCount - 1,
          snap: "frame",
          ease: "none",
          onUpdate: () => renderFrame(Math.round(airframes.frame)),
        });
        
        // Text Checkpoints
        // Use explicit times in the timeline to sync with frame progress
        tl.to(".text-checkpoint-1", { opacity: 1, y: 0, duration: 0.1 }, 0.1)
          .to(".text-checkpoint-1", { opacity: 0, y: -20, duration: 0.1 }, 0.3)
          .to(".text-checkpoint-2", { opacity: 1, y: 0, duration: 0.1 }, 0.4)
          .to(".text-checkpoint-2", { opacity: 0, y: -20, duration: 0.1 }, 0.6)
          .to(".text-checkpoint-3", { opacity: 1, y: 0, duration: 0.1 }, 0.7)
          .to(".text-checkpoint-3", { opacity: 0, y: -20, duration: 0.1 }, 0.9);
      };

      if (loaded) {
        initAnimation();
      }
    }, containerRef);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(Math.round(airframes.frame));
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [loaded]);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-primary-900 overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary-900 z-50">
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-accent transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-display text-accent font-medium tracking-widest uppercase text-sm">Loading 3D Experience... {progress}%</p>
          <p className="text-white/50 text-xs mt-2 text-center max-w-xs">If frames are missing, this might finish instantly but show nothing.</p>
        </div>
      )}
      
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-10" />
      
      {/* Overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
        <div className="text-checkpoint-1 opacity-0 translate-y-10 absolute text-center px-4 w-full">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
            100% Pure <span className="text-accent">Veg</span>
          </h2>
        </div>
        
        <div className="text-checkpoint-2 opacity-0 translate-y-10 absolute text-center px-4 w-full">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
            No Onion, <span className="text-accent">No Garlic</span>
          </h2>
        </div>
        
        <div className="text-checkpoint-3 opacity-0 translate-y-10 absolute text-center px-4 w-full">
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
            Crispy Outside,<br />
            <span className="text-accent">Sweet Inside</span>
          </h2>
        </div>
      </div>
    </section>
  );
}

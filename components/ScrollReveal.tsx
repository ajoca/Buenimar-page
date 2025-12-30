"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade" | "slide-up" | "slide-left" | "slide-right" | "zoom";
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ 
  children, 
  animation = "fade", 
  delay = 0,
  className = "" 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.add("revealed");
            }, delay);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  const animationClasses: Record<string, string> = {
    fade: "opacity-0 transition-all duration-1000 ease-out",
    "slide-up": "opacity-0 translate-y-10 transition-all duration-1000 ease-out",
    "slide-left": "opacity-0 translate-x-10 transition-all duration-1000 ease-out",
    "slide-right": "opacity-0 -translate-x-10 transition-all duration-1000 ease-out",
    zoom: "opacity-0 scale-95 transition-all duration-1000 ease-out",
  };

  const revealedClasses = "opacity-100 translate-y-0 translate-x-0 scale-100";

  return (
    <div 
      ref={ref} 
      className={`${animationClasses[animation]} ${className}`}
      style={{
        willChange: "opacity, transform"
      }}
    >
      <style jsx>{`
        .revealed {
          ${revealedClasses.split(' ').map(cls => {
            if (cls.includes('opacity')) return 'opacity: 1 !important;';
            if (cls.includes('translate-y')) return 'transform: translateY(0) !important;';
            if (cls.includes('translate-x')) return 'transform: translateX(0) !important;';
            if (cls.includes('scale')) return 'transform: scale(1) !important;';
            return '';
          }).join('\n')}
        }
      `}</style>
      {children}
    </div>
  );
}

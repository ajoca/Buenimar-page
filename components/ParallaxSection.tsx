"use client";

import { useEffect, useRef, ReactNode, CSSProperties } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  backgroundImage?: string;
}

export default function ParallaxSection({ 
  children, 
  speed = 0.5,
  className = "",
  backgroundImage
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || !bgRef.current) return;
      
      const scrolled = window.scrollY;
      const rect = ref.current.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      
      // Solo aplicar parallax cuando el elemento está en viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (scrolled - elementTop + window.innerHeight) * speed;
        bgRef.current.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  const bgStyle: CSSProperties = backgroundImage ? {
    backgroundImage: `url('${backgroundImage}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "absolute",
    top: "-20%",
    left: 0,
    right: 0,
    bottom: "-20%",
    zIndex: 0,
    willChange: "transform"
  } : {};

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {backgroundImage && <div ref={bgRef} style={bgStyle} />}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

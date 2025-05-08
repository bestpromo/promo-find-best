
import React, { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Carousel,
  CarouselContent, 
  CarouselItem 
} from "@/components/ui/carousel";

// Store logos for each row
const storeLogos = [
  // Row 1 - Slides left
  [
    { id: "amazon", src: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200&h=100&fit=crop", alt: "Amazon" },
    { id: "walmart", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=100&fit=crop", alt: "Walmart" },
    { id: "target", src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&h=100&fit=crop", alt: "Target" },
    { id: "bestbuy", src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=100&fit=crop", alt: "Best Buy" },
    { id: "apple", src: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=200&h=100&fit=crop", alt: "Apple" },
    { id: "nike", src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=100&fit=crop", alt: "Nike" },
    { id: "adidas", src: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=200&h=100&fit=crop", alt: "Adidas" },
    { id: "ikea", src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=100&fit=crop", alt: "Ikea" },
  ],
  // Row 2 - Slides right
  [
    { id: "samsung", src: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=100&fit=crop", alt: "Samsung" },
    { id: "sony", src: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=200&h=100&fit=crop", alt: "Sony" },
    { id: "dell", src: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=200&h=100&fit=crop", alt: "Dell" },
    { id: "hp", src: "https://images.unsplash.com/photo-1551419762-4a3d998f6292?w=200&h=100&fit=crop", alt: "HP" },
    { id: "asus", src: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=200&h=100&fit=crop", alt: "Asus" },
    { id: "lenovo", src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=100&fit=crop", alt: "Lenovo" },
    { id: "microsoft", src: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=200&h=100&fit=crop", alt: "Microsoft" },
    { id: "intel", src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&h=100&fit=crop", alt: "Intel" },
  ],
  // Row 3 - Slides left
  [
    { id: "lg", src: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?w=200&h=100&fit=crop", alt: "LG" },
    { id: "philips", src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=100&fit=crop", alt: "Philips" },
    { id: "canon", src: "https://images.unsplash.com/photo-1526661934280-676cef25bc9b?w=200&h=100&fit=crop", alt: "Canon" },
    { id: "nikon", src: "https://images.unsplash.com/photo-1617462197268-9c690cccd9bc?w=200&h=100&fit=crop", alt: "Nikon" },
    { id: "gopro", src: "https://images.unsplash.com/photo-1542567455-cd733f23fbb1?w=200&h=100&fit=crop", alt: "GoPro" },
    { id: "netflix", src: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=200&h=100&fit=crop", alt: "Netflix" },
    { id: "spotify", src: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=200&h=100&fit=crop", alt: "Spotify" },
    { id: "disney", src: "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=200&h=100&fit=crop", alt: "Disney" },
  ]
];

export function StoresCarousel() {
  const carouselRefs = useRef<HTMLDivElement[]>([]);
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Set up autoplay functionality
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    const carouselElements = carouselRefs.current;
    
    // Only autoplay if not hovering over any logo (on desktop)
    if (!hoveredLogo || isMobile) {
      // Set up different speeds and directions for each carousel
      intervals.push(
        setInterval(() => {
          if (carouselElements[0]) {
            carouselElements[0].scrollLeft += 1;
            // Reset position when reached the end
            if (carouselElements[0].scrollLeft >= carouselElements[0].scrollWidth - carouselElements[0].clientWidth - 10) {
              carouselElements[0].scrollLeft = 0;
            }
          }
        }, 30),
        
        setInterval(() => {
          if (carouselElements[1]) {
            carouselElements[1].scrollLeft -= 1;
            // Reset position when reached the start
            if (carouselElements[1].scrollLeft <= 10) {
              carouselElements[1].scrollLeft = carouselElements[1].scrollWidth - carouselElements[1].clientWidth;
            }
          }
        }, 30),
        
        setInterval(() => {
          if (carouselElements[2]) {
            carouselElements[2].scrollLeft += 1;
            // Reset position when reached the end
            if (carouselElements[2].scrollLeft >= carouselElements[2].scrollWidth - carouselElements[2].clientWidth - 10) {
              carouselElements[2].scrollLeft = 0;
            }
          }
        }, 30)
      );
    }
    
    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [hoveredLogo, isMobile]);
  
  return (
    <div className="w-full space-y-10">
      {storeLogos.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className="overflow-hidden"
        >
          <div 
            ref={el => {
              if (el) carouselRefs.current[rowIndex] = el;
            }}
            className="flex gap-8 overflow-x-hidden whitespace-nowrap"
          >
            {/* Duplicate the logos to create an infinite effect */}
            {[...row, ...row].map((logo, logoIndex) => (
              <div 
                key={`${logo.id}-${logoIndex}`}
                className="inline-block"
                onMouseEnter={() => !isMobile && setHoveredLogo(logo.id)}
                onMouseLeave={() => !isMobile && setHoveredLogo(null)}
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className={`w-[100px] h-auto object-contain transition-all duration-300
                    ${hoveredLogo === logo.id || isMobile ? '' : 'grayscale'}`}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

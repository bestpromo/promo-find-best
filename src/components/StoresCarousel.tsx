
import React, { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Store logos array with just the newly uploaded images
const storeLogos = [
  "/lovable-uploads/88dcc6fd-8166-4c85-b6b2-58f17723e690.png", // Acer
  "/lovable-uploads/7d7bb335-0caf-4291-8ef2-979104c2a6c6.png", // Adcos
  "/lovable-uploads/28224410-0554-4383-a887-32b08d97eb8f.png", // Adidas
  "/lovable-uploads/e65d9307-d6f5-440e-8d1c-6953ba18ba65.png", // AliExpress
  "/lovable-uploads/2ba7d23a-8e70-410e-be69-fcecd63afcfd.png", // Animale
  "/lovable-uploads/cb39475a-6b38-470a-8c82-d60889338c68.png", // Awx
  "/lovable-uploads/2cfd1233-25b0-49ad-84b7-db9c635efed1.png", // Authentic Feet
  "/lovable-uploads/e964e9f1-270c-47e8-960e-15473dfb6719.png", // Beleza na Web
  "/lovable-uploads/852a7636-2d5b-47b0-9b79-f4ebedc9bff0.png", // Booking.com
  "/lovable-uploads/47c8e312-fe90-4407-bf2e-ce150c38c6d4.png", // Brastemp
  "/lovable-uploads/01bd82e8-64e0-46a1-a804-9070edb63297.png", // Brinox
  "/lovable-uploads/fb05a423-4622-4ea0-b9f4-e3ef09158158.png", // LOR
  "/lovable-uploads/c8521786-faf0-467c-8395-31e4c9e661d6.png", // Carraro
  "/lovable-uploads/5440b8d0-c189-491e-9f08-09168c184caa.png", // Carrefour.com
  "/lovable-uploads/91747c4c-7faf-4889-bbf1-1707ddef7fa0.png", // Casa Tema
  "/lovable-uploads/aa7a6f66-8fb4-4297-b915-0763227a232a.png", // Centauro
  "/lovable-uploads/f4c06a54-d13c-4967-a114-1fd0276a278e.png", // Clovis
  "/lovable-uploads/948a426f-f5c1-4b22-94e2-e2a7e2af9e2e.png", // Cobasi
  "/lovable-uploads/af342ac9-fffd-427a-baac-b92bb269f896.png", // Comfy
  "/lovable-uploads/d9fe34e2-cb8d-4daf-98ae-0a72774e6412.png", // Consul
];

// Function to shuffle array using Fisher-Yates algorithm
const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// Create three rows of randomly shuffled logos without repetition
const createStoreRows = () => {
  const shuffled = shuffleArray([...storeLogos]);
  const totalLogos = shuffled.length;
  
  // Distribute logos evenly among 3 rows without repetition
  const itemsPerRow = Math.ceil(totalLogos / 3);
  
  return [
    shuffled.slice(0, itemsPerRow).map((src, idx) => ({ 
      id: `store-1-${idx}`, 
      src, 
      alt: `Store Logo ${idx + 1}` 
    })),
    shuffled.slice(itemsPerRow, itemsPerRow * 2).map((src, idx) => ({ 
      id: `store-2-${idx}`, 
      src, 
      alt: `Store Logo ${itemsPerRow + idx + 1}` 
    })),
    shuffled.slice(itemsPerRow * 2).map((src, idx) => ({ 
      id: `store-3-${idx}`, 
      src, 
      alt: `Store Logo ${itemsPerRow * 2 + idx + 1}` 
    }))
  ];
};

export function StoresCarousel() {
  const carouselRefs = useRef<HTMLDivElement[]>([]);
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [storeRows] = useState(() => createStoreRows());
  
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
      {storeRows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className="overflow-hidden w-full"
        >
          <div 
            ref={el => {
              if (el) carouselRefs.current[rowIndex] = el;
            }}
            className="flex gap-8 overflow-x-hidden whitespace-nowrap w-full"
          >
            {/* Display each logo just once, no repetition */}
            {row.map((logo) => (
              <div 
                key={logo.id}
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

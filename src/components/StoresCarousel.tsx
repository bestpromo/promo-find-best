
import React, { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Store logos array with all the uploaded images
const storeLogos = [
  // Original logos
  "/lovable-uploads/6617a7c5-8074-4111-8a1d-aa1db000076b.png", // Acer
  "/lovable-uploads/c3ce27e8-0152-41ec-8250-ffc78e99779f.png", // Adcos
  "/lovable-uploads/fa4c58e9-54da-4ada-8bd8-6c0d1b0e767e.png", // Adidas
  "/lovable-uploads/e69f710b-ef71-4630-9f8e-2f108562ae56.png", // AliExpress
  "/lovable-uploads/afcfb7ab-4ae6-4c9d-b99c-9b988624a2e8.png", // Animale
  "/lovable-uploads/a2153cbf-d2b2-4198-936a-3cd06d44b655.png", // Awx
  "/lovable-uploads/0ad9287e-72b1-4f3b-af64-8c69767bbf7d.png", // Beleza na Web
  "/lovable-uploads/1669f39a-ddcb-449b-baf8-64d803e3be0c.png", // Booking.com
  "/lovable-uploads/4499b5a1-1991-4158-bfef-8690c512b56b.png", // LOR
  "/lovable-uploads/44784ed5-8d74-4fc7-a5ec-3239a7fae604.png", // Carraro
  "/lovable-uploads/947563d4-8a41-487f-b680-1b7ece78c05b.png", // Cobasi
  "/lovable-uploads/ab2d00a5-1bc7-4107-a527-1b9930e9061d.png", // Consul
  "/lovable-uploads/5af05afa-ee11-402e-9dea-74fd9ffc5b4e.png", // Dafiti
  "/lovable-uploads/62672d52-976f-4b99-8403-08b4e0a14810.png", // Diesel
  "/lovable-uploads/b64ae7f5-9c74-4af1-8d5f-b7adbf1b2ddb.png", // Dolce Gusto
  "/lovable-uploads/a28cbe0d-2635-4480-8bc3-6ee5a50df577.png", // Drogasil
  "/lovable-uploads/e76698c3-e135-4fcf-9e18-2641ece94788.png", // Drogaria Venancio
  "/lovable-uploads/856de304-c334-447d-9ba9-4052db8e3c8c.png", // Eudora
  "/lovable-uploads/9c747782-2032-4ec0-be00-5d1234653e1a.png", // Fast Shop
  "/lovable-uploads/e8e5703b-f09c-46ee-a56b-f647884928aa.png", // GOL
  
  // New uploaded logos
  "/lovable-uploads/6425547e-cd3b-4ed7-904f-f66ed441c3eb.png", // Nespresso
  "/lovable-uploads/58ec9c77-c40c-4e66-9fcb-4a4cd1e54d32.png", // Nike
  "/lovable-uploads/f792f5e3-c2d0-4167-878e-74cc22293cf2.png", // O Boticário
  "/lovable-uploads/f98ebfd2-7a51-4d70-abc6-916de0b186f0.png", // Pague Menos
  "/lovable-uploads/57b75932-1835-4ee9-ac7d-ae41c5c5efe3.png", // Olympikus
  "/lovable-uploads/4c82d0b2-ab06-429b-9f4c-ca522d23cbeb.png", // Polishop
  "/lovable-uploads/7471ef48-9c73-4885-a85d-12915489d027.png", // Reserva
  "/lovable-uploads/3dbd7b17-465c-4222-9555-0fd488f0de30.png", // Schutz
  "/lovable-uploads/17e8eec9-9044-46ec-83e7-65de2fd37cd1.png", // Sestini
  "/lovable-uploads/e82e7ae8-eb0c-4210-a0bf-60170fa5082f.png", // Shark
  "/lovable-uploads/c164fc9f-f602-4712-afb9-d790ece9df37.png", // Spicy
  "/lovable-uploads/2e94c79f-8c3c-492c-a812-9ee272f5625f.png", // Stanley
  "/lovable-uploads/647102a6-e7a2-49fa-aaa4-99a560e15dce.png", // Taqi
  "/lovable-uploads/465c89bb-758d-4be0-8c22-db46a8e297c4.png", // Telha Norte
  "/lovable-uploads/71fb918e-7b63-4e98-b166-fbef78462c06.png", // Tok&Stok
  "/lovable-uploads/df1d8364-5940-43ed-8b59-f696ce35aae9.png", // Under Armour
  "/lovable-uploads/67fde6df-ffc4-4d44-a67e-837bb33d195f.png", // Web Continental
  "/lovable-uploads/11d3966f-9193-401c-bddb-be272ef16924.png", // Web Fones
  "/lovable-uploads/93cdb668-8b49-46e7-9ad9-2730426a01f3.png", // Wine
  "/lovable-uploads/76bf38ec-c7c9-489e-b119-f4c4e9cf6fb8.png", // ZZ Mall
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

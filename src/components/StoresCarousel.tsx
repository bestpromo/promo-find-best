import React, { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Store logos array with all uploaded images
const storeLogos = [
  // Previously uploaded images from batches 1-3
  "/lovable-uploads/acer.png", // Acer
  "/lovable-uploads/adcos.png", // Adcos
  "/lovable-uploads/adidas.png", // Adidas
  "/lovable-uploads/aliexpress.png", // AliExpress
  "/lovable-uploads/animale.png", // Animale
  "/lovable-uploads/artwalker.png", // Awx
  "/lovable-uploads/authenticfeet.png", // Authentic Feet
  "/lovable-uploads/belezanaweb.png", // Beleza na Web
  "/lovable-uploads/booking.png", // Booking.com
  "/lovable-uploads/brastemp.png", // Brastemp
  "/lovable-uploads/brinox.png", // Brinox
  "/lovable-uploads/cafelor.png", // LOR
  "/lovable-uploads/carraro.png", // Carraro
  "/lovable-uploads/carrefour.png", // Carrefour.com
  "/lovable-uploads/casatema.png", // Casa Tema
  "/lovable-uploads/centauro.png", // Centauro
  "/lovable-uploads/cloviscalcados.png", // Clovis
  "/lovable-uploads/cobasi.png", // Cobasi
  "/lovable-uploads/comfy.png", // Comfy
  "/lovable-uploads/consul.png", // Consul
  
  // Second batch of images
  "/lovable-uploads/continental.png", // Continental
  "/lovable-uploads/dafiti.png", // Dafiti
  "/lovable-uploads/decathlon.png", // Decathlon
  "/lovable-uploads/diesel.png", // Diesel
  "/lovable-uploads/dolcegusto.png", // Dolce Gusto
  "/lovable-uploads/drogal.png", // Drogal
  "/lovable-uploads/drogasil.png", // Drogasil
  "/lovable-uploads/drograria-venancio.png", // Drogaria Venancio
  "/lovable-uploads/efacil.png", // eFacil
  "/lovable-uploads/electrolux.png", // Electrolux
  "/lovable-uploads/eudora.png", // Eudora
  "/lovable-uploads/extra.png", // Extra
  "/lovable-uploads/extrafarma.png", // Extrafarma
  "/lovable-uploads/fastshop.png", // FastShop
  "/lovable-uploads/gama.png", // Gama Italy
  "/lovable-uploads/gocase.png", // Gocase
  "/lovable-uploads/gol.png", // GOL
  "/lovable-uploads/grandcru.png", // Grand Cru
  "/lovable-uploads/highstil.png", // Highstil
  "/lovable-uploads/hipervarejo.png", // Hiper Varejo
  
  // Third batch of images
  "/lovable-uploads/iguatemi.png", // Iguatemi 365
  "/lovable-uploads/intimissi.png", // Intimissimi
  "/lovable-uploads/iplace.png", // iPlace
  "/lovable-uploads/kabum.png", // KaBuM
  "/lovable-uploads/kipling.png", // Kipling
  "/lovable-uploads/kitchenaid.png", // KitchenAid
  "/lovable-uploads/lebiscuit.png", // Le Biscuit
  "/lovable-uploads/lego.png", // LEGO
  "/lovable-uploads/leroymerlin.png", // Leroy Merlin
  "/lovable-uploads/LG.png", // LG
  "/lovable-uploads/locaweb.png", // LocaWeb
  "/lovable-uploads/loccitane.png", // L'Occitane
  "/lovable-uploads/mac.png", // MAC
  "/lovable-uploads/madeiramadeira.png", // Madeira Madeira
  "/lovable-uploads/martinsatacado.png", // Martins
  "/lovable-uploads/mizuno.png", // Mizuno
  "/lovable-uploads/mobly.png", // Mobly
  "/lovable-uploads/natura.png", // Natura
  "/lovable-uploads/nespresso.png", // Nespresso
  "/lovable-uploads/nike.png", // Nike
  
  // Fourth batch of newly uploaded images
  "/lovable-uploads/oboticario.png", // O Boticário
  "/lovable-uploads/paguemenos.png", // Pague Menos
  "/lovable-uploads/olympikus.png", // Olympikus
  "/lovable-uploads/polishop.png", // Polishop
  "/lovable-uploads/reserva.png", // Reserva
  "/lovable-uploads/schutz.png", // Schutz
  "/lovable-uploads/sestini.png", // Sestini
  "/lovable-uploads/shark-hair.png", // Shark
  "/lovable-uploads/spicy.png", // Spicy
  "/lovable-uploads/stanley.png", // Stanley
  "/lovable-uploads/taqi.png", // Lojas taQi
  "/lovable-uploads/telhanorte.png", // Telha Norte
  "/lovable-uploads/tokstok.png", // Tok&Stok
  "/lovable-uploads/underarmour.png", // Under Armour
  "/lovable-uploads/webcontinental.png", // Web Continental
  "/lovable-uploads/webfones.png", // Web Fones
  "/lovable-uploads/wine.png", // Wine
  "/lovable-uploads/zzmall.png", // ZZ Mall
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
    <div className="w-full space-y-4 max-w-screen-xl mx-auto">
      {storeRows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className="overflow-hidden w-full"
        >
          <div 
            ref={el => {
              if (el) carouselRefs.current[rowIndex] = el;
            }}
            className="flex gap-6 overflow-x-hidden whitespace-nowrap w-full"
            style={{ 
              width: '100vw', 
              marginLeft: 'calc(-50vw + 50%)',
              padding: '0 1rem'
            }}
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
                  className={`min-w-[100px] w-[100px] h-auto object-contain transition-all duration-300
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

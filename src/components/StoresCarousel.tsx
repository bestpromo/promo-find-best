import React, { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Store logos array with all uploaded images
const storeLogos = [
  { name: "Acer", img_url: "/lovable-uploads/acer.png", url: "https://tidd.ly/4j4TEuT" },
  { name: "Adcos", img_url: "/lovable-uploads/adcos.png", url: "https://tidd.ly/3SC4uNS" },
  { name: "Adidas", img_url: "/lovable-uploads/adidas.png", url: "https://tidd.ly/3YFOez0" },
  { name: "AliExpress", img_url: "/lovable-uploads/aliexpress.png", url: "https://tidd.ly/3H5KEIn" },
  { name: "Animale", img_url: "/lovable-uploads/animale.png", url: "https://tidd.ly/3F5t8DE" },
  { name: "Awx", img_url: "/lovable-uploads/artwalker.png", url: "https://tidd.ly/4kgZ330" },
  { name: "Authentic Feet", img_url: "/lovable-uploads/authenticfeet.png", url: "https://tidd.ly/4de9X75" },
  { name: "Beleza na Web", img_url: "/lovable-uploads/belezanaweb.png", url: "https://tidd.ly/44ADupw" },
  { name: "Booking.com", img_url: "/lovable-uploads/booking.png", url: "https://tidd.ly/455Hcre" },
  { name: "Brastemp", img_url: "/lovable-uploads/brastemp.png", url: "https://tidd.ly/44uMRXG" },
  { name: "Brinox", img_url: "/lovable-uploads/brinox.png", url: "https://tidd.ly/4dbUB30" },
  { name: "LOR", img_url: "/lovable-uploads/cafelor.png", url: "https://tidd.ly/458fjyO" },
  { name: "Carraro", img_url: "/lovable-uploads/carraro.png", url: "https://tidd.ly/4iYnDEw" },
  { name: "Carrefour.com", img_url: "/lovable-uploads/carrefour.png", url: "https://tidd.ly/4k8eL00" },
  { name: "Casa Tema", img_url: "/lovable-uploads/casatema.png", url: "https://tidd.ly/3GQy1AR" },
  { name: "Centauro", img_url: "/lovable-uploads/centauro.png", url: "https://tidd.ly/3SxCwmw" },
  { name: "Clovis", img_url: "/lovable-uploads/cloviscalcados.png", url: "https://tidd.ly/4ddM2op" },
  { name: "Cobasi", img_url: "/lovable-uploads/cobasi.png", url: "https://tidd.ly/3SC5hOQ" },
  { name: "Comfy", img_url: "/lovable-uploads/comfy.png", url: "https://tidd.ly/3RYgitR" },
  { name: "Consul", img_url: "/lovable-uploads/consul.png", url: "https://tidd.ly/3EYcxBJ" },
  { name: "Shopee", img_url: "/lovable-uploads/shopee.png", url: "https://s.shopee.com.br/4AnLJwk1pI" },
  { name: "Continental", img_url: "/lovable-uploads/continental.png", url: "https://tidd.ly/4ddMqmR" },
  { name: "Dafiti", img_url: "/lovable-uploads/dafiti.png", url: "https://tidd.ly/4d9gDmY" },
  { name: "Decathlon", img_url: "/lovable-uploads/decathlon.png", url: "https://tidd.ly/4kl3Znv" },
  { name: "Diesel", img_url: "/lovable-uploads/diesel.png", url: "https://tidd.ly/3YJelFf" },
  { name: "Amazon", img_url: "/lovable-uploads/amazon.png", url: "https://amzn.to/4k8XaoO" },
  { name: "Dolce Gusto", img_url: "/lovable-uploads/dolcegusto.png", url: "https://tidd.ly/43bgOtl" },
  { name: "Drogal", img_url: "/lovable-uploads/drogal.png", url: "https://tidd.ly/43rwg63" },
  { name: "Drogasil", img_url: "/lovable-uploads/drogasil.png", url: "https://tidd.ly/3EfiIRt" },
  { name: "Drogaria Venancio", img_url: "/lovable-uploads/drograria-venancio.png", url: "https://tidd.ly/3SxkaSB" },
  { name: "eFacil", img_url: "/lovable-uploads/efacil.png", url: "https://tidd.ly/3GRUM7B" },
  { name: "Electrolux", img_url: "/lovable-uploads/electrolux.png", url: "https://tidd.ly/4jRU5tu" },
  { name: "Eudora", img_url: "/lovable-uploads/eudora.png", url: "https://tidd.ly/3F03y2W" },
  { name: "Extra", img_url: "/lovable-uploads/extra.png", url: "https://tidd.ly/4kh41g5" },
  { name: "Extrafarma", img_url: "/lovable-uploads/extrafarma.png", url: "https://tidd.ly/4de8duP" },
  { name: "FastShop", img_url: "/lovable-uploads/fastshop.png", url: "https://tidd.ly/3ZcEdti" },
  { name: "Gama Italy", img_url: "/lovable-uploads/gama.png", url: "#https://tidd.ly/43A8Fzd" },
  { name: "Gocase", img_url: "/lovable-uploads/gocase.png", url: "https://tidd.ly/4mhlbw0" },
  { name: "GOL", img_url: "/lovable-uploads/gol.png", url: "https://tidd.ly/4iUX3gh" },
  { name: "Grand Cru", img_url: "/lovable-uploads/grandcru.png", url: "https://tidd.ly/4iSoGpv" },
  { name: "Highstil", img_url: "/lovable-uploads/highstil.png", url: "https://tidd.ly/4jZeGMQ" },
  { name: "Hiper Varejo", img_url: "/lovable-uploads/hipervarejo.png", url: "https://tidd.ly/42Rw28a" },
  { name: "Mercado Livre", img_url: "/lovable-uploads/mercadolivre.png", url: "https://mercadolivre.com/sec/2oNiJWa" },
  { name: "Iguatemi 365", img_url: "/lovable-uploads/iguatemi.png", url: "https://tidd.ly/4kaX9AF" },
  { name: "Intimissimi", img_url: "/lovable-uploads/intimissi.png", url: "#https://tidd.ly/4j4ToMl" },
  { name: "iPlace", img_url: "/lovable-uploads/iplace.png", url: "https://tidd.ly/4kfmvxs" },
  { name: "KaBuM", img_url: "/lovable-uploads/kabum.png", url: "https://tidd.ly/3YCFr0U" },
  { name: "Kipling", img_url: "/lovable-uploads/kipling.png", url: "https://tidd.ly/3RWtr6C" },
  { name: "KitchenAid", img_url: "/lovable-uploads/kitchenaid.png", url: "https://tidd.ly/436wM89#" },
  { name: "Le Biscuit", img_url: "/lovable-uploads/lebiscuit.png", url: "https://tidd.ly/4jLOFQM" },
  { name: "LEGO", img_url: "/lovable-uploads/lego.png", url: "https://tidd.ly/3Zh5laD" },
  { name: "Leroy Merlin", img_url: "/lovable-uploads/leroymerlin.png", url: "https://tidd.ly/42U3x9N" },
  { name: "LG", img_url: "/lovable-uploads/LG.png", url: "https://tidd.ly/4mdBtG2" },
  { name: "LocaWeb", img_url: "/lovable-uploads/locaweb.png", url: "https://tidd.ly/4iSpY3P" },
  { name: "L'Occitane", img_url: "/lovable-uploads/loccitane.png", url: "https://tidd.ly/455JMgU" },
  { name: "MAC", img_url: "/lovable-uploads/mac.png", url: "https://tidd.ly/4jLRh17" },
  { name: "Madeira Madeira", img_url: "/lovable-uploads/madeiramadeira.png", url: "https://tidd.ly/4568IF3" },
  { name: "Martins", img_url: "/lovable-uploads/martinsatacado.png", url: "https://tidd.ly/4mdUqZ0" },
  { name: "Mizuno", img_url: "/lovable-uploads/mizuno.png", url: "https://tidd.ly/3F5wvdM" },
  { name: "Mobly", img_url: "/lovable-uploads/mobly.png", url: "https://tidd.ly/3F5GK1B" },
  { name: "Natura", img_url: "/lovable-uploads/natura.png", url: "https://tidd.ly/4k8qbB8" },
  { name: "Nespresso", img_url: "/lovable-uploads/nespresso.png", url: "https://tidd.ly/3F60Qcb" },
  { name: "Nike", img_url: "/lovable-uploads/nike.png", url: "https://tidd.ly/3Z9xiB1" },
  { name: "O Boticário", img_url: "/lovable-uploads/oboticario.png", url: "https://tidd.ly/4me0MYr" },
  { name: "Pague Menos", img_url: "/lovable-uploads/paguemenos.png", url: "https://tidd.ly/4j0CPkM" },
  { name: "Olympikus", img_url: "/lovable-uploads/olympikus.png", url: "https://tidd.ly/42U3YAX" },
  { name: "Polishop", img_url: "/lovable-uploads/polishop.png", url: "https://tidd.ly/4iWhE36" },
  { name: "Reserva", img_url: "/lovable-uploads/reserva.png", url: "https://tidd.ly/4kfFyI0" },
  { name: "Schutz", img_url: "/lovable-uploads/schutz.png", url: "https://tidd.ly/3F6MY1c" },
  { name: "Sestini", img_url: "/lovable-uploads/sestini.png", url: "https://tidd.ly/4jSkVlv" },
  { name: "Shark", img_url: "/lovable-uploads/shark-hair.png", url: "https://tidd.ly/4mc0qBN" },
  { name: "Spicy", img_url: "/lovable-uploads/spicy.png", url: "https://tidd.ly/4dnZ0QI" },
  { name: "Stanley", img_url: "/lovable-uploads/stanley.png", url: "https://tidd.ly/4jOnkxl" },
  { name: "Lojas taQi", img_url: "/lovable-uploads/taqi.png", url: "https://tidd.ly/42VZABu" },
  { name: "Telha Norte", img_url: "/lovable-uploads/telhanorte.png", url: "https://tidd.ly/43cWQ1q" },
  { name: "Tok&Stok", img_url: "/lovable-uploads/tokstok.png", url: "https://tidd.ly/43td6N2" },
  { name: "Under Armour", img_url: "/lovable-uploads/underarmour.png", url: "https://tidd.ly/4m8qUEh" },
  { name: "Web Continental", img_url: "/lovable-uploads/webcontinental.png", url: "https://tidd.ly/43qT9Xd" },
  { name: "Web Fones", img_url: "/lovable-uploads/webfones.png", url: "https://tidd.ly/3H3ZtLv" },
  { name: "Wine", img_url: "/lovable-uploads/wine.png", url: "https://tidd.ly/3SxFJ5y" },
  { name: "ZZ Mall", img_url: "/lovable-uploads/zzmall.png", url: "https://tidd.ly/3EQVwJH" }
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
  
  console.log(
    shuffled.slice(0, itemsPerRow).map((src, idx) => ({ 
      id: `store${idx}`, 
      src: `${src['img_url']}`, 
      alt: `${src['name']}` 
    }))
  );

  return [    
    shuffled.slice(0, itemsPerRow).map((src, idx) => ({ 
      id: `store${idx}`, 
      src: `${src['img_url']}`, 
      alt: `${src['name']}`,
      url: `${src['url']}`
    })),
    shuffled.slice(itemsPerRow, itemsPerRow * 2).map((src, idx) => ({ 
      id: `store${idx}`, 
      src: `${src['img_url']}`, 
      alt: `${src['name']}`,
      url: `${src['url']}` 
    })),
    shuffled.slice(itemsPerRow * 2).map((src, idx) => ({ 
      id: `store${idx}`, 
      src: `${src['img_url']}`, 
      alt: `${src['name']}`,
      url: `${src['url']}` 
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
                <a href={logo.url} target="_blank">
                  <img 
                    src={logo.src} 
                    alt={logo.alt}
                    className={`min-w-[100px] w-[100px] h-auto object-contain transition-all duration-300
                      ${hoveredLogo === logo.id || isMobile ? '' : 'grayscale'}`}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

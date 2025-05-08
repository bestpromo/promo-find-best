
import React, { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Store logos array with all uploaded images
const storeLogos = [
  // Previously uploaded images from batches 1-3
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
  
  // Second batch of images
  "/lovable-uploads/5a7850a7-abe8-4b50-817c-ce47e4cf096d.png", // Continental
  "/lovable-uploads/acb2a395-1fcd-4d2c-837c-a545a4d1dce3.png", // Dafiti
  "/lovable-uploads/a25fc40f-02a6-442c-9c3d-50a283292cc3.png", // Decathlon
  "/lovable-uploads/16f22aa7-3e94-465f-8050-cfd933865b79.png", // Diesel
  "/lovable-uploads/e4d1eb29-a096-49ec-89d2-18f38eb82cbd.png", // Dolce Gusto
  "/lovable-uploads/e47c9291-8203-473f-8204-79443b064b98.png", // Drogal
  "/lovable-uploads/486826f7-545c-4646-8b49-980587ad776d.png", // Drogasil
  "/lovable-uploads/ce517950-3c20-4f3d-8330-86ca6ea1e560.png", // Drogaria Venancio
  "/lovable-uploads/55c32105-8a79-4676-bc0e-b9d4ea195f96.png", // eFacil
  "/lovable-uploads/5faaaff3-4a94-4f38-a90e-a4941c3ca8b3.png", // Electrolux
  "/lovable-uploads/e5efeaf0-138c-4c21-af4c-13bd194298d6.png", // Eudora
  "/lovable-uploads/20872afd-1bca-4e25-9e96-67f21f7e7382.png", // Extra
  "/lovable-uploads/141c0038-5c08-4c13-8fbc-283738814dc6.png", // Extrafarma
  "/lovable-uploads/5a7f1f50-55f3-47da-9d30-3be37ccc5ef1.png", // FastShop
  "/lovable-uploads/e66693ae-0a1f-4a83-a800-d377fc216b64.png", // Gama Italy
  "/lovable-uploads/110910e5-18ca-4ae7-a2cc-7182af209aa9.png", // Gocase
  "/lovable-uploads/3d687675-8d7a-4dbc-9ac6-9e9477f4aedd.png", // GOL
  "/lovable-uploads/43f77d97-1636-4fe5-9853-e78a726d226e.png", // Grand Cru
  "/lovable-uploads/646c7b0e-8241-4066-aabf-f64511cff297.png", // Highstil
  "/lovable-uploads/a5112307-23fa-4d69-a1ce-5b195584346b.png", // Hiper Varejo
  
  // Third batch of images
  "/lovable-uploads/8ffc70e3-71cf-4330-b75d-e99db56458eb.png", // Iguatemi 365
  "/lovable-uploads/68e0eb54-053c-485c-ba24-11a072d22106.png", // Intimissimi
  "/lovable-uploads/7cb3060b-efc7-43ee-a6bb-53d22c71a125.png", // iPlace
  "/lovable-uploads/e45864f8-34fe-4f46-a137-40c209d725b5.png", // KaBuM
  "/lovable-uploads/04135679-626b-4d0c-8b3d-7b4448c92d3a.png", // Kipling
  "/lovable-uploads/d5c4c38b-2ed3-4fd5-b098-e6341e349f1a.png", // KitchenAid
  "/lovable-uploads/e6984a3b-aa62-425a-a622-f1e776f8f9a7.png", // Le Biscuit
  "/lovable-uploads/8647b7ee-2ff1-4733-8fb3-ec4c5c22aa5c.png", // LEGO
  "/lovable-uploads/04b5bcd2-451f-436a-b26b-bf0c72bb7fb4.png", // Leroy Merlin
  "/lovable-uploads/d291178f-82de-4f23-8630-7e1a95b63686.png", // LG
  "/lovable-uploads/822400fb-225a-4db2-881b-0bcd77b7cc65.png", // LocaWeb
  "/lovable-uploads/ccb6d93a-d2b4-4908-a374-9cd2376d6fb5.png", // L'Occitane
  "/lovable-uploads/a08ac726-dbbc-42ba-9ea4-9dc566d13e2a.png", // MAC
  "/lovable-uploads/4e1bf931-9006-4ab1-9d77-b71bae0a7212.png", // Madeira Madeira
  "/lovable-uploads/9fe46244-6c6b-434e-8567-5dbd46d2a3c3.png", // Martins
  "/lovable-uploads/e9e7b6bd-927b-437a-837b-a8765aaa3dad.png", // Mizuno
  "/lovable-uploads/11a021c7-8ef2-47a3-85f6-7a6d14af9231.png", // Mobly
  "/lovable-uploads/2745ec7c-6399-4359-aa72-b86bd8dbda91.png", // Natura
  "/lovable-uploads/77e372b4-7170-466b-bc2a-303565c0c7bc.png", // Nespresso
  "/lovable-uploads/640af075-017b-452b-a298-464a5f96d3a2.png", // Nike
  
  // Fourth batch of newly uploaded images
  "/lovable-uploads/f889bbff-3a76-45f3-a61d-c0f86d9324b9.png", // O Boticário
  "/lovable-uploads/20eac3e6-f6ae-4447-a11f-b9074b65e5a0.png", // Pague Menos
  "/lovable-uploads/33a3afb7-903d-4fee-9145-bf4700b9f983.png", // Olympikus
  "/lovable-uploads/262d5e8d-332a-42f5-bdd0-16e388b9cab6.png", // Polishop
  "/lovable-uploads/8c592c65-94f9-43bb-beaf-21beb2f0aeb2.png", // Reserva
  "/lovable-uploads/5bdb84af-9522-40f5-954d-a611a3530354.png", // Schutz
  "/lovable-uploads/8bdcc61d-207f-4294-bd40-8f497b9b1c49.png", // Sestini
  "/lovable-uploads/ddc04248-c2c3-4829-bedc-606c5e4d001f.png", // Shark
  "/lovable-uploads/860d2738-b66e-4fea-a41f-9cbea5da1019.png", // Spicy
  "/lovable-uploads/9d61deba-d876-4c0e-830b-96a40c2b5a42.png", // Stanley
  "/lovable-uploads/07964a8b-68ab-4d79-8cab-d4e3e19c7636.png", // Lojas taQi
  "/lovable-uploads/40133e68-c044-49dd-a665-b270d7dcd732.png", // Telha Norte
  "/lovable-uploads/a6993aa4-2391-4409-ae53-ada759185a30.png", // Tok&Stok
  "/lovable-uploads/f8bcb855-bd71-4b24-8c32-92573a744b34.png", // Under Armour
  "/lovable-uploads/b3dd5830-8b0e-4feb-9444-11d35d60ec71.png", // Web Continental
  "/lovable-uploads/714f77bd-73ba-40e4-a4e4-eb1daa257841.png", // Web Fones
  "/lovable-uploads/16d7e1e0-cfa1-4d8e-9d27-99f652be1165.png", // Wine
  "/lovable-uploads/d34b9123-54ae-412e-884f-c3a2e28fee90.png", // ZZ Mall
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

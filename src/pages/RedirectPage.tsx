
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useClickRegistration } from "@/hooks/useClickRegistration";
import { useRedirectCountdown } from "@/hooks/useRedirectCountdown";
import { RedirectStatus } from "@/components/redirect/RedirectStatus";
import { RedirectInfo } from "@/components/redirect/RedirectInfo";
import { CountdownProgress } from "@/components/redirect/CountdownProgress";

const RedirectPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { registrationStatus, registerClick } = useClickRegistration();

  const offerId = searchParams.get("offer_id");
  const deepLinkUrl = searchParams.get("deep_link_url");
  const title = searchParams.get("title");
  const brandName = searchParams.get("brand_name");
  const price = searchParams.get("price");

  const handleRedirect = () => {
    try {
      console.log('=== INICIANDO REDIRECIONAMENTO ===');
      console.log('deepLinkUrl:', deepLinkUrl);
      console.log('Status do registro:', registrationStatus);
      
      if (!deepLinkUrl) {
        console.error('deepLinkUrl não encontrada, redirecionando para home');
        navigate("/");
        return;
      }

      console.log('Redirecionando para:', deepLinkUrl);
      window.location.href = deepLinkUrl;
    } catch (error) {
      console.error('Erro durante redirecionamento:', error);
      navigate("/");
    }
  };

  const { countdown, progress } = useRedirectCountdown({
    initialCountdown: 3,
    registrationStatus,
    onComplete: handleRedirect
  });

  useEffect(() => {
    console.log('=== REDIRECT PAGE LOADED ===');
    console.log('URL completa:', window.location.href);
    console.log('Parâmetros recebidos:', {
      offerId,
      deepLinkUrl,
      title,
      brandName,
      price
    });

    if (!deepLinkUrl || !offerId) {
      console.log('Parâmetros obrigatórios faltando - redirecionando para home');
      navigate("/");
      return;
    }

    // Registrar o clique imediatamente
    console.log('Iniciando registro do clique...');
    registerClick(offerId);
  }, [deepLinkUrl, offerId, navigate, registerClick]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Logo do Bestpromo */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/5a8f2c7c-9460-4fbf-a4ab-7160fe6749d2.png" 
            alt="Bestpromo Logo" 
            className="h-16 mx-auto"
          />
        </div>

        <RedirectStatus registrationStatus={registrationStatus} offerId={offerId} />

        <RedirectInfo 
          countdown={countdown}
          title={title}
          brandName={brandName}
          price={price}
        />

        <CountdownProgress progress={progress} />
      </div>
    </div>
  );
};

export default RedirectPage;


import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

const RedirectPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const [progress, setProgress] = useState(0);

  const offerId = searchParams.get("offer_id");
  const deepLinkUrl = searchParams.get("deep_link_url");
  const title = searchParams.get("title");
  const brandName = searchParams.get("brand_name");
  const price = searchParams.get("price");

  useEffect(() => {
    if (!deepLinkUrl || !offerId) {
      navigate("/");
      return;
    }

    // Registrar o clique imediatamente ao carregar a página
    registerClick();

    const interval = setInterval(() => {
      setCountdown((prev) => {
        const newCountdown = prev - 1;
        setProgress((3 - newCountdown) * 33.33);
        
        if (newCountdown <= 0) {
          clearInterval(interval);
          handleRedirect();
          return 0;
        }
        
        return newCountdown;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [deepLinkUrl, offerId, navigate]);

  const registerClick = async () => {
    try {
      console.log('Registrando clique para offer_id:', offerId);
      console.log('Dados que serão enviados:', {
        offer_id: offerId,
        clicked_at: new Date().toISOString(),
        user_ip: '',
        user_agent: navigator.userAgent,
        referrer_url: window.location.origin
      });
      
      const { data, error } = await supabase
        .from('catalog_offer_click')
        .insert([{
          offer_id: offerId,
          clicked_at: new Date().toISOString(),
          user_ip: '', // Pode ser preenchido no backend se necessário
          user_agent: navigator.userAgent,
          referrer_url: window.location.origin
        }])
        .select();

      if (error) {
        console.error('Erro ao registrar clique:', error);
        console.error('Detalhes do erro:', JSON.stringify(error, null, 2));
      } else {
        console.log('Clique registrado com sucesso:', data);
      }
    } catch (error) {
      console.error('Erro durante registro do clique:', error);
    }
  };

  const handleRedirect = () => {
    try {
      console.log('Redirecionando para:', deepLinkUrl);
      // Redirecionar para a URL da loja parceira na mesma aba
      window.location.href = deepLinkUrl;
    } catch (error) {
      console.error('Erro durante redirecionamento:', error);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md w-full">
        {/* Logo do Bestpromo */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/5a8f2c7c-9460-4fbf-a4ab-7160fe6749d2.png" 
            alt="Bestpromo Logo" 
            className="h-16 mx-auto"
          />
        </div>

        {/* Mensagem de redirecionamento */}
        <div className="mb-8">
          <p className="text-lg text-gray-700 mb-2">
            Estamos redirecionando você para a loja parceira em ({countdown > 0 ? countdown : '0'}...)
          </p>
          {title && (
            <p className="text-sm text-gray-500 mb-1">
              Produto: {title}
            </p>
          )}
          {brandName && (
            <p className="text-sm text-gray-500 mb-1">
              Loja: {brandName}
            </p>
          )}
          {price && (
            <p className="text-sm text-orange-500 font-semibold">
              Preço: R$ {parseFloat(price).toFixed(2)}
            </p>
          )}
        </div>

        {/* Loading indicator */}
        <div className="w-full">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default RedirectPage;

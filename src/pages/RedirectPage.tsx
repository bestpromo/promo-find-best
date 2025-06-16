
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

const RedirectPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // Aumentei para 5 segundos
  const [progress, setProgress] = useState(0);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<'pending' | 'success' | 'error'>('pending');

  const offerId = searchParams.get("offer_id");
  const deepLinkUrl = searchParams.get("deep_link_url");
  const title = searchParams.get("title");
  const brandName = searchParams.get("brand_name");
  const price = searchParams.get("price");

  useEffect(() => {
    console.log('=== REDIRECT PAGE LOADED ===');
    console.log('URL completa:', window.location.href);
    console.log('offer_id:', offerId);
    console.log('deepLinkUrl:', deepLinkUrl);

    if (!deepLinkUrl || !offerId) {
      console.log('Parâmetros obrigatórios faltando - redirecionando para home');
      navigate("/");
      return;
    }

    // Registrar o clique imediatamente
    registerClick();

    // Iniciar o countdown apenas após o registro
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const newCountdown = prev - 1;
        setProgress((5 - newCountdown) * 20); // Ajustado para 5 segundos
        
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
    if (isRegistering) {
      console.log('Registro já em andamento, ignorando...');
      return;
    }

    setIsRegistering(true);
    setRegistrationStatus('pending');

    try {
      console.log('=== INICIANDO REGISTRO DE CLIQUE ===');
      console.log('offer_id:', offerId);
      
      if (!offerId || offerId.trim() === '') {
        console.error('ERRO: offer_id inválido');
        setRegistrationStatus('error');
        return;
      }

      // Preparar dados para inserção
      const clickData = {
        offer_id: offerId.toString().trim(),
        clicked_at: new Date().toISOString(),
        user_ip: null,
        user_agent: navigator.userAgent,
        referrer_url: window.location.origin
      };
      
      console.log('Dados para inserção:', clickData);
      
      // Tentar inserir o registro com timeout
      const insertPromise = supabase
        .from('catalog_offer_click')
        .insert([clickData]);
      
      // Adicionar timeout de 10 segundos
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout na inserção')), 10000)
      );

      const { data, error } = await Promise.race([insertPromise, timeoutPromise]) as any;

      if (error) {
        console.error('ERRO na inserção:', error);
        setRegistrationStatus('error');
        
        // Tentar uma segunda vez com uma abordagem diferente
        console.log('Tentando inserção novamente...');
        const { error: retryError } = await supabase
          .from('catalog_offer_click')
          .insert({
            offer_id: offerId,
            clicked_at: new Date().toISOString()
          });
        
        if (retryError) {
          console.error('Erro na segunda tentativa:', retryError);
        } else {
          console.log('Segunda tentativa bem-sucedida!');
          setRegistrationStatus('success');
        }
      } else {
        console.log('=== REGISTRO REALIZADO COM SUCESSO ===');
        console.log('Dados inseridos:', data);
        setRegistrationStatus('success');
        
        // Verificar se foi realmente inserido
        setTimeout(async () => {
          const { data: verifyData, error: verifyError } = await supabase
            .from('catalog_offer_click')
            .select('*')
            .eq('offer_id', offerId)
            .order('clicked_at', { ascending: false })
            .limit(1);
          
          console.log('Verificação pós-inserção:', { verifyData, verifyError });
        }, 1000);
      }
    } catch (error) {
      console.error('ERRO CRÍTICO durante registro:', error);
      setRegistrationStatus('error');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleRedirect = () => {
    try {
      console.log('Redirecionando para:', deepLinkUrl);
      console.log('Status do registro:', registrationStatus);
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

        {/* Status do registro */}
        <div className="mb-4">
          {registrationStatus === 'pending' && (
            <p className="text-yellow-600 text-sm">Registrando clique...</p>
          )}
          {registrationStatus === 'success' && (
            <p className="text-green-600 text-sm">✓ Clique registrado com sucesso!</p>
          )}
          {registrationStatus === 'error' && (
            <p className="text-red-600 text-sm">⚠ Erro ao registrar clique</p>
          )}
        </div>

        {/* Mensagem de redirecionamento */}
        <div className="mb-8">
          <p className="text-lg text-gray-700 mb-2">
            Estamos redirecionando você para a loja parceira em {countdown > 0 ? countdown : '0'} segundos...
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

        {/* Debug info - só aparece se houver erro */}
        {registrationStatus === 'error' && (
          <div className="mt-4 text-xs text-gray-400">
            <p>offer_id: {offerId}</p>
            <p>Verifique o console para mais detalhes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedirectPage;

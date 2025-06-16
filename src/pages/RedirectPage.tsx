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
    console.log('=== DEBUGGING URL PARAMS ===');
    console.log('URL completa:', window.location.href);
    console.log('Todos os parâmetros:', Object.fromEntries(searchParams.entries()));
    console.log('offer_id extraído:', offerId);
    console.log('deepLinkUrl extraído:', deepLinkUrl);

    if (!deepLinkUrl || !offerId) {
      console.log('Parâmetros obrigatórios faltando - redirecionando para home');
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
      console.log('=== INÍCIO DO REGISTRO DE CLIQUE ===');
      console.log('offer_id recebido:', offerId);
      console.log('Tipo do offer_id:', typeof offerId);
      console.log('offer_id é válido?', offerId && offerId.trim() !== '');
      
      // Verificar se offer_id é válido
      if (!offerId || offerId.trim() === '') {
        console.error('ERRO: offer_id está vazio ou inválido');
        return;
      }

      // Verificar conexão com Supabase
      console.log('Testando conexão com Supabase...');
      const { data: testData, error: testError } = await supabase
        .from('catalog_offer_click')
        .select('count', { count: 'exact', head: true });
      
      if (testError) {
        console.error('Erro na conexão com Supabase:', testError);
        return;
      }
      
      console.log('Conexão com Supabase OK. Contagem atual de registros:', testData);
      
      // Verificar se a tabela existe e tem a estrutura esperada
      console.log('Verificando estrutura da tabela...');
      const { data: sampleData, error: sampleError } = await supabase
        .from('catalog_offer_click')
        .select('*')
        .limit(1);
      
      if (sampleError) {
        console.error('Erro ao verificar estrutura da tabela:', sampleError);
      } else {
        console.log('Estrutura da tabela OK. Amostra:', sampleData);
      }
      
      // Preparar dados para inserção com conversão explícita do offer_id
      const clickData = {
        offer_id: offerId.toString().trim(), // Garantir que seja string limpa
        clicked_at: new Date().toISOString(),
        user_ip: null,
        user_agent: navigator.userAgent,
        referrer_url: window.location.origin
      };
      
      console.log('Dados preparados para inserção:', clickData);
      console.log('JSON dos dados:', JSON.stringify(clickData, null, 2));
      
      // Tentar inserir o registro
      console.log('Tentando inserir registro...');
      const insertPromise = supabase
        .from('catalog_offer_click')
        .insert([clickData])
        .select();
      
      console.log('Promise criada, aguardando resultado...');
      const { data, error } = await insertPromise;
      console.log('Resultado recebido do Supabase');

      if (error) {
        console.error('=== ERRO AO REGISTRAR CLIQUE ===');
        console.error('Código do erro:', error.code);
        console.error('Mensagem do erro:', error.message);
        console.error('Detalhes completos:', error);
        console.error('Hint:', error.hint);
        console.error('Details:', error.details);
        
        // Tentar inserção alternativa sem select
        console.log('Tentando inserção sem select...');
        const { error: insertError } = await supabase
          .from('catalog_offer_click')
          .insert([clickData]);
        
        if (insertError) {
          console.error('Erro na inserção alternativa:', insertError);
        } else {
          console.log('Inserção alternativa realizada com sucesso!');
        }
      } else {
        console.log('=== CLIQUE REGISTRADO COM SUCESSO ===');
        console.log('Dados retornados:', data);
        console.log('Número de registros inseridos:', data?.length || 0);
        
        // Verificar se realmente foi inserido
        console.log('Verificando se o registro foi realmente inserido...');
        const { data: verifyData, error: verifyError } = await supabase
          .from('catalog_offer_click')
          .select('*')
          .eq('offer_id', offerId)
          .order('clicked_at', { ascending: false })
          .limit(1);
        
        if (verifyError) {
          console.error('Erro ao verificar inserção:', verifyError);
        } else {
          console.log('Verificação da inserção:', verifyData);
        }
      }
    } catch (error) {
      console.error('=== ERRO DURANTE EXECUÇÃO ===');
      console.error('Erro capturado:', error);
      console.error('Stack trace:', error instanceof Error ? error.stack : 'N/A');
      console.error('Tipo do erro:', typeof error);
      console.error('Nome do erro:', error instanceof Error ? error.name : 'N/A');
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

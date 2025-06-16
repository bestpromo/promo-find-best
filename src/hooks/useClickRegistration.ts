
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";

export type RegistrationStatus = 'pending' | 'success' | 'error';

export const useClickRegistration = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus>('pending');

  const registerClick = async (offerId: string) => {
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

  return {
    isRegistering,
    registrationStatus,
    registerClick
  };
};

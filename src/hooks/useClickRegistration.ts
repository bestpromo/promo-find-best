
import { useState, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";

export type RegistrationStatus = 'pending' | 'success' | 'error';

export const useClickRegistration = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus>('pending');
  const registeredOffers = useRef<Set<string>>(new Set());

  const registerClick = async (offerId: string) => {
    // Verificar se já foi registrado nesta sessão
    if (registeredOffers.current.has(offerId)) {
      console.log('Clique já registrado para offer_id:', offerId);
      setRegistrationStatus('success');
      return;
    }

    // Verificar se já está registrando
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

      // Marcar como registrado antes da inserção para evitar duplicatas
      registeredOffers.current.add(offerId);

      // Preparar dados para inserção
      const clickData = {
        offer_id: offerId.toString().trim(),
        clicked_at: new Date().toISOString(),
        user_ip: null,
        user_agent: navigator.userAgent,
        referrer_url: window.location.origin
      };
      
      console.log('Dados para inserção:', clickData);
      
      // Inserir o registro
      const { data, error } = await supabase
        .from('catalog_offer_click')
        .insert([clickData]);

      if (error) {
        console.error('ERRO na inserção:', error);
        // Remover da lista de registrados em caso de erro
        registeredOffers.current.delete(offerId);
        setRegistrationStatus('error');
      } else {
        console.log('=== REGISTRO REALIZADO COM SUCESSO ===');
        console.log('Dados inseridos:', data);
        setRegistrationStatus('success');
      }
    } catch (error) {
      console.error('ERRO CRÍTICO durante registro:', error);
      // Remover da lista de registrados em caso de erro
      registeredOffers.current.delete(offerId);
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

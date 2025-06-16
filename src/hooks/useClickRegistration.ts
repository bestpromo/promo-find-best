
import { useState, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";

export type RegistrationStatus = 'pending' | 'success' | 'error';

export const useClickRegistration = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus>('pending');
  const registeredOffers = useRef<Set<string>>(new Set());

  const registerClick = async (offerId: string) => {
    console.log('=== REGISTERCLICK INICIADO ===');
    console.log('offer_id recebido:', offerId);
    console.log('Já registrado?', registeredOffers.current.has(offerId));
    console.log('Já está registrando?', isRegistering);

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
    console.log('Status definido como pending');

    try {
      console.log('=== INICIANDO REGISTRO DE CLIQUE ===');
      console.log('offer_id:', offerId);
      
      if (!offerId || offerId.trim() === '') {
        console.error('ERRO: offer_id inválido');
        setRegistrationStatus('error');
        setIsRegistering(false);
        return;
      }

      // Verificar conexão com Supabase
      console.log('Testando conexão com Supabase...');
      const { data: testData, error: testError } = await supabase
        .from('catalog_offer_click')
        .select('count(*)', { count: 'exact', head: true });
      
      if (testError) {
        console.error('ERRO de conexão com Supabase:', testError);
        setRegistrationStatus('error');
        setIsRegistering(false);
        return;
      }
      console.log('Conexão com Supabase OK');

      // Marcar como registrado antes da inserção para evitar duplicatas
      registeredOffers.current.add(offerId);
      console.log('Offer_id marcado como registrado');

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
      console.log('Executando inserção...');
      const { data, error } = await supabase
        .from('catalog_offer_click')
        .insert([clickData])
        .select();

      console.log('Resposta da inserção - data:', data);
      console.log('Resposta da inserção - error:', error);

      if (error) {
        console.error('ERRO na inserção:', error);
        console.error('Código do erro:', error.code);
        console.error('Mensagem do erro:', error.message);
        console.error('Detalhes do erro:', error.details);
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
      console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
      // Remover da lista de registrados em caso de erro
      registeredOffers.current.delete(offerId);
      setRegistrationStatus('error');
    } finally {
      console.log('Finalizando registro, definindo isRegistering como false');
      setIsRegistering(false);
    }
  };

  return {
    isRegistering,
    registrationStatus,
    registerClick
  };
};

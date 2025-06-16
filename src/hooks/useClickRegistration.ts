
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

      // Primeiro, vamos verificar o schema da tabela
      console.log('=== VERIFICANDO SCHEMA DA TABELA ===');
      const { data: schemaData, error: schemaError } = await supabase
        .from('catalog_offer_click')
        .select('*')
        .limit(1);
      
      console.log('Schema check - data:', schemaData);
      console.log('Schema check - error:', schemaError);

      // Marcar como registrado antes da inserção para evitar duplicatas
      registeredOffers.current.add(offerId);
      console.log('Offer_id marcado como registrado');

      // Preparar dados com estrutura mais simples
      const clickData = {
        offer_id: offerId.toString().trim()
      };
      
      console.log('=== DADOS PARA INSERÇÃO ===');
      console.log('Dados simplificados:', clickData);
      console.log('Tipo do offer_id:', typeof clickData.offer_id);
      console.log('Comprimento do offer_id:', clickData.offer_id.length);
      
      // Inserir o registro com dados mínimos
      console.log('=== EXECUTANDO INSERÇÃO ===');
      const { data, error } = await supabase
        .from('catalog_offer_click')
        .insert([clickData])
        .select();

      console.log('=== RESULTADO DA INSERÇÃO ===');
      console.log('Data retornada:', data);
      console.log('Error retornado:', error);

      if (error) {
        console.error('=== DETALHES DO ERRO ===');
        console.error('Código do erro:', error.code);
        console.error('Mensagem do erro:', error.message);
        console.error('Detalhes do erro:', error.details);
        console.error('Hint do erro:', error.hint);
        console.error('Erro completo:', JSON.stringify(error, null, 2));
        
        // Remover da lista de registrados em caso de erro
        registeredOffers.current.delete(offerId);
        setRegistrationStatus('error');
      } else {
        console.log('=== REGISTRO REALIZADO COM SUCESSO ===');
        console.log('Dados inseridos:', data);
        setRegistrationStatus('success');
      }
    } catch (error) {
      console.error('=== ERRO CRÍTICO ===');
      console.error('Erro capturado:', error);
      console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
      console.error('Erro em JSON:', JSON.stringify(error, null, 2));
      
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

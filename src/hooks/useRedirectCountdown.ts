
import { useState, useEffect } from 'react';
import { RegistrationStatus } from './useClickRegistration';

interface UseRedirectCountdownProps {
  initialCountdown: number;
  onComplete: () => void;
  registrationStatus: RegistrationStatus;
  startImmediately?: boolean;
}

export const useRedirectCountdown = ({ 
  initialCountdown, 
  onComplete, 
  registrationStatus,
  startImmediately = true 
}: UseRedirectCountdownProps) => {
  const [countdown, setCountdown] = useState(initialCountdown);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!startImmediately) return;

    console.log('Iniciando countdown de', initialCountdown, 'segundos');
    
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const newCountdown = prev - 1;
        const newProgress = ((initialCountdown - newCountdown) / initialCountdown) * 100;
        setProgress(newProgress);
        
        console.log('Countdown:', newCountdown, 'Progress:', newProgress);
        
        if (newCountdown <= 0) {
          clearInterval(interval);
          console.log('Countdown finalizado, executando redirecionamento...');
          onComplete();
          return 0;
        }
        
        return newCountdown;
      });
    }, 1000);

    return () => {
      console.log('Limpando intervalo do countdown');
      clearInterval(interval);
    };
  }, [initialCountdown, onComplete, startImmediately]);

  return {
    countdown,
    progress
  };
};

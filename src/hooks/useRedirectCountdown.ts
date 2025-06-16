
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

    const interval = setInterval(() => {
      setCountdown((prev) => {
        const newCountdown = prev - 1;
        setProgress((initialCountdown - newCountdown) * (100 / initialCountdown));
        
        if (newCountdown <= 0) {
          clearInterval(interval);
          console.log('Countdown finalizado, iniciando redirecionamento...');
          onComplete();
          return 0;
        }
        
        return newCountdown;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialCountdown, onComplete, startImmediately]);

  return {
    countdown,
    progress
  };
};

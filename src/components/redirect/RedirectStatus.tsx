
import { RegistrationStatus } from "@/hooks/useClickRegistration";

interface RedirectStatusProps {
  registrationStatus: RegistrationStatus;
  offerId: string | null;
}

export const RedirectStatus = ({ registrationStatus, offerId }: RedirectStatusProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-center mb-4">
        {registrationStatus === 'pending' && (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
            <p className="text-yellow-600 font-medium">Registrando clique...</p>
          </div>
        )}
        {registrationStatus === 'error' && (
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">⚠</span>
            </div>
            <p className="text-red-600 font-medium">Erro ao registrar clique</p>
          </div>
        )}
      </div>

      {/* Debug info - só aparece se houver erro */}
      {registrationStatus === 'error' && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg">
          <p className="text-xs text-red-600">
            offer_id: {offerId}
          </p>
          <p className="text-xs text-red-500 mt-1">
            Verifique o console para mais detalhes
          </p>
        </div>
      )}
    </div>
  );
};

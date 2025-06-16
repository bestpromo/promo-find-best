
import { RegistrationStatus } from "@/hooks/useClickRegistration";

interface RedirectStatusProps {
  registrationStatus: RegistrationStatus;
  offerId: string | null;
}

export const RedirectStatus = ({ registrationStatus, offerId }: RedirectStatusProps) => {
  return (
    <>
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

      {/* Debug info - só aparece se houver erro */}
      {registrationStatus === 'error' && (
        <div className="mt-4 text-xs text-gray-400">
          <p>offer_id: {offerId}</p>
          <p>Verifique o console para mais detalhes</p>
        </div>
      )}
    </>
  );
};

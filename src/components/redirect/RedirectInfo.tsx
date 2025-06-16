
interface RedirectInfoProps {
  countdown: number;
  title?: string | null;
  brandName?: string | null;
  price?: string | null;
}

export const RedirectInfo = ({ countdown, title, brandName, price }: RedirectInfoProps) => {
  return (
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
  );
};


interface ProductPartnerInfoProps {
  storeName: string;
}

export const ProductPartnerInfo = ({ storeName }: ProductPartnerInfoProps) => {
  return (
    <div className="flex items-start justify-center gap-1 mt-2">
      <span className="text-xs font-bold text-gray-600">
        Parceiro: {storeName}
      </span>
      <svg 
        aria-label="Verified" 
        className="h-3 w-3 flex-shrink-0 mt-0.5" 
        fill="rgb(0, 149, 246)" 
        height="18" 
        role="img" 
        viewBox="0 0 40 40" 
        width="18"
      >
        <title>Verified</title>
        <path 
          d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" 
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
};

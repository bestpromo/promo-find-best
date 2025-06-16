
interface ProductImageProps {
  imageUrl: string;
  name: string;
  displayMode: 'grid' | 'list';
}

export const ProductImage = ({ imageUrl, name, displayMode }: ProductImageProps) => {
  return (
    <div className={`p-0 ${displayMode === 'list' ? 'w-48 shrink-0' : ''}`}>
      <div className={`${displayMode === 'list' ? 'w-48 h-48' : 'w-full aspect-square'} bg-gray-100 flex items-center justify-center overflow-hidden`}>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
      </div>
    </div>
  );
};

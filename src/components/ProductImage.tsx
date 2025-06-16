
interface ProductImageProps {
  imageUrl: string;
  name: string;
  displayMode: 'grid' | 'list';
}

export const ProductImage = ({ imageUrl, name, displayMode }: ProductImageProps) => {
  return (
    <div className={`p-0 ${displayMode === 'list' ? 'w-48 shrink-0' : ''}`}>
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.currentTarget.src = '/placeholder.svg';
        }}
      />
    </div>
  );
};

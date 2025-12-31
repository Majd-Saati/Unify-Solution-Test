interface BikeCardImageProps {
  imageUrl: string | null;
  alt: string;
}

export function BikeCardImage({ imageUrl, alt }: BikeCardImageProps) {
  return (
    <div className="w-full mb-4 rounded-lg overflow-hidden bg-gray-100 h-64 flex items-center justify-center">
      {imageUrl ? (
        <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <p className="text-gray-400 text-sm">No image available</p>
      )}
    </div>
  );
}


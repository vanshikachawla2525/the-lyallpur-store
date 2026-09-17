import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: string; // e.g. 'aspect-square', 'aspect-[4/3]', 'aspect-[16/11]'
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  aspectRatio = 'aspect-square',
  className = '',
  imgClassName = '',
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${aspectRatio} bg-[#F4EDE4] ${className}`}>
      {/* Shimmer Placeholder Skeleton until image is loaded */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#EDE3D8] via-[#F7F2EB] to-[#EDE3D8] animate-pulse" />
      )}

      {/* Actual Image with layout shift prevention & smooth opacity fade-in */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover object-center transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
        {...props}
      />

      {/* Fallback state if image fails */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F2EAE0] text-[#7A6658] p-3 text-center">
          <span className="text-xs font-serif font-semibold">{alt}</span>
          <span className="text-[10px] text-[#A39284] mt-1">The Lyallpur Store</span>
        </div>
      )}
    </div>
  );
};

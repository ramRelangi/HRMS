import React from 'react';

type AvatarProps = {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`rounded-full overflow-hidden flex-shrink-0 ${sizeClasses[size]} ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=1E40AF&color=fff`;
        }}
      />
    </div>
  );
};

export default Avatar;
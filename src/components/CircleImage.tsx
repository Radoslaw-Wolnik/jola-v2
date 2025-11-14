import React from "react";

interface CircleImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CircleImage: React.FC<CircleImageProps> = ({ src, alt, className = "" }) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="inline-flex items-center justify-center rounded-full p-4 bg-blue">
        <img
          src={src}
          alt={alt}
          className="block max-w-10 max-h-10 w-auto h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default CircleImage;

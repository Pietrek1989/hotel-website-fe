import React, { FC } from "react";

interface ImageProps {
  imageUrl: string;
  onDelete: (imageUrl: string) => void;
}

const ImageCard: FC<ImageProps> = ({ imageUrl, onDelete }) => {
  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt="Gallery"
        className="object-cover hover:scale-105 w-64 h-32"
      />
      <button
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-red font-bold text-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out"
        onClick={() => onDelete(imageUrl)}
      >
        X
      </button>
    </div>
  );
};

export default ImageCard;

import React, { useState, useEffect, useRef } from "react";
import SpinnerLoad from "../other/Spinner";

interface ImageProps {
  imageUrl: string;
  onDelete: (imageUrl: string) => void;
}

const ImageCard: React.FC<ImageProps> = ({ imageUrl, onDelete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const retries = useRef(0);

  const loadImage = () => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
      retries.current = 0;
    };
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
      if (retries.current < 5) {
        // limit the number of retries
        retries.current += 1;
        setTimeout(loadImage, 2000); // try again after 2 seconds
      }
    };
  };

  useEffect(() => {
    loadImage();
  }, [imageUrl]);

  return (
    <div className="relative">
      {isLoading || hasError ? (
        <SpinnerLoad />
      ) : (
        <>
          <img
            src={imageUrl}
            alt="Gallery"
            className="object-cover hover:scale-105 w-64 h-32"
          />
          <button
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-red-500 font-bold text-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out"
            onClick={() => onDelete(imageUrl)}
          >
            X
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCard;

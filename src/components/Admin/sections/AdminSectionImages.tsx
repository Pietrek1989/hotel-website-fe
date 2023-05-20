import React, { FC, useState, useEffect, useRef } from "react";
import { ImageState } from "../../../types and interfaces";
import { fetchImages } from "../../mainPage/helperFunctions";
import ImageCard from "../ImageCard";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

const AdminSectionImages: FC = () => {
  const [images, setImages] = useState<ImageState["gallery"]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageUrlToDelete, setImageUrlToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetImages = async () => {
      const imagesData = await fetchImages();
      setImages(imagesData.gallery);
    };
    fetchAndSetImages();
  }, []);

  const deleteImage = async (imageUrl: string) => {
    try {
      await fetch(`${process.env.REACT_APP_BE_URL}/files/gallery`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: imageUrl }),
      });
      setImages(images.filter((url) => url !== imageUrl));
    } catch (error) {
      console.error(`Failed to delete image: ${error}`);
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("gallery", file);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/files/gallery`,
        {
          method: "POST",
          body: formData,
        }
      );
      const image = await response.json();
      setImages((prevImages) => [...prevImages, image.gallery]);
    } catch (error) {
      console.error(`Failed to upload image: ${error}`);
    }
  };

  const askToDeleteImage = (imageUrl: string) => {
    setImageUrlToDelete(imageUrl);
    setIsDeleteModalOpen(true);
  };

  const deleteImageConfirmed = async () => {
    setIsDeleteModalOpen(false);
    if (imageUrlToDelete) {
      await deleteImage(imageUrlToDelete);
    }
  };

  return (
    <>
      <div className="grid grid-cols-6 gap-4 container mt-20">
        {images.map((imageUrl, index) => (
          <ImageCard
            key={index}
            imageUrl={imageUrl}
            onDelete={askToDeleteImage}
          />
        ))}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="transition-all duration-500 ease-in-out hover:text-white text-2xl hover:text-5xl  py-2 px-4 bg-blue text-white"
        >
          <span>+</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={uploadImage}
          style={{ display: "none" }}
        />
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteImageConfirmed}
      />
    </>
  );
};

export default AdminSectionImages;

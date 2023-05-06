import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import Modal from "react-modal";
import { ImageState } from "../../types and interfaces";

const Gallery = () => {
  SwiperCore.use([Navigation]);
  const [images, setImages] = useState<ImageState>({ gallery: [], hero: [] });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  useEffect(() => {
    // Fetch images from your API
    fetchImages();
  }, []);

  const fetchImages = async () => {
    // Replace with your API call
    const response = await fetch("your-api-url");
    const data = await response.json();
    setImages(data);
  };

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.gallery.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <Swiper navigation>
        {images.gallery.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`galerry number ${index}`}
              onClick={() => openModal(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <img src={images.gallery[selectedImageIndex]} alt="Selected" />
        <button onClick={prevImage}>Previous</button>
        <button onClick={nextImage}>Next</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Gallery;

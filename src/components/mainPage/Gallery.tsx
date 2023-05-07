import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import Modal from "react-modal";
import { ImageState } from "../../types and interfaces";
import { fetchImages } from "./helperFunctions";
import "../../styles/galery.css";

const Gallery = () => {
  SwiperCore.use([Navigation]);
  const [images, setImages] = useState<ImageState>({ gallery: [], hero: [] });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  useEffect(() => {
    (async () => {
      const fetchedImages = await fetchImages();
      setImages(fetchedImages);
    })();
    console.log("in comp", images);
  }, []);

  useEffect(() => {
    if (modalIsOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [modalIsOpen]);

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
  // Inside the Gallery component
  // Inside the Gallery component
  return (
    <div className="my-10" id="gallery">
      <Swiper
        navigation
        slidesPerView={10}
        spaceBetween={5}

        // Adjust the number of small icons displayed in a single line
        // Adjust the space between small icons
      >
        {images.gallery.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="small-icon " // Apply the CSS class to the img element
              src={image}
              alt={`gallery number ${index}`}
              onClick={() => openModal(index)} // Make sure the onClick event is here
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <img src={images.gallery[selectedImageIndex]} alt="Selected" />
        <button className="arrow-btn" onClick={prevImage}>
          Previous
        </button>
        <button className="arrow-btn" onClick={nextImage}>
          Next
        </button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Gallery;

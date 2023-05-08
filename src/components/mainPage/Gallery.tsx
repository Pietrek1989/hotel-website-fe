import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import Modal from "react-modal";
import { ImageState } from "../../types and interfaces";
import { fetchImages } from "./helperFunctions";
import "../../styles/galery.css";
import { BsFillCaretRightFill, BsFillCaretLeftFill } from 'react-icons/bs';
import {CgClose} from 'react-icons/cg'
import { motion, AnimatePresence } from "framer-motion";
import CustomModal from "./CustomModal";




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
      <CustomModal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    className="relative gallery-modal"
  >
        <img src={images.gallery[selectedImageIndex]} alt="Selected" />
               <motion.button
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }} className="absolute arrow-btn top-50 left-0" onClick={prevImage}>
        <BsFillCaretLeftFill />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}className="absolute arrow-btn top-50 right-0" onClick={nextImage}>
        <BsFillCaretRightFill />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}onClick={closeModal} className="absolute arrow-btn top-5 right-5"><CgClose /></motion.button>
      </CustomModal>

</div>
  );
};

export default Gallery;

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  className?: string;
  children: React.ReactNode;
  onPrev: () => void;
  onNext: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  className,
  children,
  onPrev,
  onNext,
  
}) => {
  useEffect(() => {
    const handleKeyDown = (e : any) => {
      if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "Escape") {
        onRequestClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onRequestClose, onPrev, onNext]);
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="ReactModal__Overlay" onClick={onRequestClose}>
          <motion.div
            className={`ReactModal__Content ${className}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;

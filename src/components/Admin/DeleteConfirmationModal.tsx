import React, { FC } from "react";
import Modal from "react-modal";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this image?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onRequestClose}>No</button>
    </Modal>
  );
};

export default DeleteConfirmationModal;

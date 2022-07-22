import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import {
  Overlay,
  ModalWindow,
  CloseBtn,
  IcoClose,
  ModalImage,
} from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ activeUrl, imgAlt, onClose }) => {
  useEffect(() => {
    const handleEscPress = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscPress);

    return () => {
      window.removeEventListener('keydown', handleEscPress);
    };
  });

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow aria-modal="true">
        <CloseBtn onClick={onClose}>
          <IcoClose />
        </CloseBtn>
        <ModalImage src={activeUrl} alt={imgAlt} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  activeUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

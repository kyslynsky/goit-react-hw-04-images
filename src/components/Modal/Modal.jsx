import React, { Component } from 'react';
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

export class Modal extends Component {
  handleEscPress = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscPress);
  }

  render() {
    const { activeUrl, imgAlt, onClose } = this.props;

    return createPortal(
      <Overlay onClick={onClose}>
        <ModalWindow aria-modal="true">
          <CloseBtn onClick={onClose}>
            <IcoClose />
          </CloseBtn>
          <ModalImage src={activeUrl} alt={imgAlt} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  activeUrl: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

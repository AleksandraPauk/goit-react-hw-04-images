import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { Overlay, ModalStyle } from './Modal.style';

export const Modal =({image, closeModal})=> {

  useEffect(() => {
    window.addEventListener('keydown', closeByKey)
    return () => {
      window.removeEventListener('keydown', closeByKey);
    }
  }, [])

  const closeByBackdrop = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const closeByKey = event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };
    return (
      <Overlay onClick={closeByBackdrop}>
        <ModalStyle>
          <img
            src={image.largeImageURL}
            alt={image.tags}
          />
        </ModalStyle>
      </Overlay>
    );
  }

    Modal.propTypes = {
    image: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags:PropTypes.string.isRequired,
    }),
    closeModal: PropTypes.func.isRequired,
  }


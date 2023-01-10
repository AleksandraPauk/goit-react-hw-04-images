import { Component } from 'react';
import PropTypes from 'prop-types';

import { Overlay, ModalStyle } from './Modal.style';


export class Modal extends Component {

  static propTypes = {
    image: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags:PropTypes.string.isRequired,
    }),
    closeModal: PropTypes.func.isRequired,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.closeByKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByKey);
  }

  closeByBackdrop = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  closeByKey = event => {
    if (event.key === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <Overlay onClick={this.closeByBackdrop}>
        <ModalStyle>
          <img
            src={this.props.image.largeImageURL}
            alt={this.props.image.tags}
          />
        </ModalStyle>
      </Overlay>
    );
  }
}

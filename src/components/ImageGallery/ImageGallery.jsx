import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyle } from './ImageGallery.styled';

import PropTypes from 'prop-types';

export const ImageGallery = ({
  images,
  openModal
}) => {
  return (
    <ImageGalleryStyle>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onClick={() => {
              openModal(image);
            }}
          />
        );
      })}
    </ImageGalleryStyle>
  );
};


ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired}
  )),
  openModal: PropTypes.func.isRequired
}
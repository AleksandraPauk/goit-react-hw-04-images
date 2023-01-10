import {
  ImageGalleryItemStyle,
  ImageGalleryImage,
} from '../ImageGalleryItem/ImageGalleryItem.styled';

import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  image: { webformatURL, tags },
  onClick,
}) => {
  return (
    <ImageGalleryItemStyle>
      <ImageGalleryImage src={webformatURL} alt={tags} onClick={onClick} />
    </ImageGalleryItemStyle>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired
}
import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, alt, onImgClick }) => (
  <GalleryItem onClick={onImgClick}>
    <Image src={src} alt={alt} />
  </GalleryItem>
);

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onImgClick: PropTypes.func.isRequired,
};

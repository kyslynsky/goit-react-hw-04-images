import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

export const ImageGallery = ({ hits }) => (
  <ul>
    <ImageGalleryItem data={hits} />
  </ul>
);

ImageGallery.propTypes = {
  hits: PropTypes.array,
};

import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ data }) => (
  <>
    {data.map(({ id, webformatURL, tags }) => {
      return (
        <li key={id}>
          <img src={webformatURL} alt={tags} />
        </li>
      );
    })}
  </>
);

ImageGalleryItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

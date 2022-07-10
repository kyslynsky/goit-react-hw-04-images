import axios from 'axios';

const { REACT_APP_API_KEY } = process.env;
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${REACT_APP_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};

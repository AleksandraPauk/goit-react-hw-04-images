import axios from 'axios';

const imagesApi = axios.create({
  baseURL: 'https://pixabay.com',
});

export const getImages = async (params = {}) => {
  const result = await imagesApi.get('/api/', {
    params: {
      key: '31465723-59c9170543570d8286da770f4',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      ...params,
    },
  });
  return result.data;
};

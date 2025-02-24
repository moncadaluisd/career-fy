import axios from 'axios';

/**
 * Get the html of a url
 * @param {string} url
 * @returns {string}
 */
export const scrappingService = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });
    return data;
  } catch (error) {
    console.error('Error al obtener HTML:', error);
    return null;
  }
};

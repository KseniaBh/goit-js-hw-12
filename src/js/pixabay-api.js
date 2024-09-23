import axios from 'axios';

export default async function httpRequest(key, text, pageN, perPage) {
  const searchParams = new URLSearchParams({
    key: `${key}`,
    q: `${text}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: `${perPage}`,
    page: `${pageN}`,
  });
  const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
  return response.data;
}
import axios from 'axios';
const QUERYURL =
  'https://pixabay.com/api/?key=29314851-8b512a5abc572021537d02a85&q=';

export const fetchImagesByQuery = async query => {

    const result = await axios.get(`${QUERYURL}${query}`);

      return result.data.hits;

};

export const fetchImagesByPage = async (query,page) => {

    const result = await axios.get(`${QUERYURL}${query}&page=${page}`);
    console.log(`${QUERYURL}${query}&page=${page}`)

      return result.data.hits;

};

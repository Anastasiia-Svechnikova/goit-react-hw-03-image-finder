import axios from 'axios';
const QUERYURL =
  'https://pixabay.com/api/?key=29314851-8b512a5abc572021537d02a85';

export const fetchImages = async (query, page) => {
     try{ const result = await axios.get(`${QUERYURL}&q=${query}&page=${page}`);
console.log(result)
         return result.data;
         
     }
     catch (error) {
         throw new Error(error);
    }
   

};


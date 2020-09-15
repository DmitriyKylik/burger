import axios from 'axios';
// axios-orders
const instance = axios.create({
  baseURL: 'https://react-my-burger-375d2.firebaseio.com/'
  // baseURL: 'https://react-my-burger-375d2.firebaseio.co/'
});

export default instance;

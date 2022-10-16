import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_REGISTRY_API_BASE_URL,
  withCredentials: false,
});

console.log(process.env.REACT_APP_REGISTRY_API_BASE_URL);

const RegistryApiBase = function (options) {
  const onSuccess = function (response) {
    return response;
  };

  const onError = function (error) {
    console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default RegistryApiBase;

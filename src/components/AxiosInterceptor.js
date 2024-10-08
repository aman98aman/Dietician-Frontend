import axios from 'axios';

const api = axios.create({
  baseURL: "https://dietbackend.azurewebsites.net/",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    if (
      config?.method === "post" &&
      config?.data &&
      !(config?.data instanceof FormData)
    ) {
    
      return { 
        ...config,
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;

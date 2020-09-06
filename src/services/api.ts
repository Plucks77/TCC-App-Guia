import axios from "axios";

const api = axios.create({
  baseURL: "https://tcc-backend-turismo.herokuapp.com/",
});

export default api;

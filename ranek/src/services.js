//AXIOS

// Import da bibliotea axios atraves do npm install axios
import axios from "axios";
//Variavel executando o AXIOS.CREATE({})
const axiosInstance = axios.create({
    //Prorpiedade contendo o caminho base do site, o que nunca se altera
  baseURL: "http://localhost:3000"
});

//Variavel retornando caminho do site que nunca se altera atraves do return axiosInstance.
export const api = {
     //Fazendo GET puxando e inserindo o resto da URL através do .get(endpoint)
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  }
};
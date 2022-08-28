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
  //eNVIA INFORMAÇÃO
  post(endpoint, body) {
    //O BODY tem de ser sempre um objeto, que no caso será o USUARIO 
    //através da função criarUsuario() em store/index.js
    return axiosInstance.post(endpoint, body);
  },
  //deleta informação
  delete(endpoint){
    return axiosInstance.delete(endpoint)
  }
};
//Função usando AXIOS para passar o CEP digitado em UsuarioForm.vue para a API
export function getCep(cep){
  return axios.get(`https://viacep.com.br/ws/${cep}/json/ `)
}
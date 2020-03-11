import axios from "axios";

//o IP estava errado, arrumei e já coloquei o endereço do backend numa varaivel, vai facilitar de trocar em tudo depois
//const SERVER_URL = "http://localhost/gold-silver-backend/api";
const SERVER_URL = "http://eletricagoldsilver.com.br/api";

//arrumei o metodo também, siga esse padrão para as demais chamadas;
export async function listarProdutos(){
    const ret = await axios.get(`${SERVER_URL}/product/`);
    return ret.data;
};

export async function produtoPorId(id){
    const ret = await axios.get(`${SERVER_URL}/product/?id=${id}`);
    return ret.data;
};

export async function updateProduct(id, pars){
    const ret = await axios.put(`${SERVER_URL}/product/${id}`, {...pars});
    return ret;
}

export async function saveProduct(pars){
    let params = new URLSearchParams();
      for(let p in pars) {
        params.append(p,pars[p])
    }
    
    const ret = await axios.post(`${SERVER_URL}/product/create.php`, params);
    console.log(ret);
}
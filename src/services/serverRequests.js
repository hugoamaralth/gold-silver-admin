import axios from "axios";
import { SERVER_URL } from './vars'

//o IP estava errado, arrumei e já coloquei o endereço do backend numa varaivel, vai facilitar de trocar em tudo depois

//arrumei o metodo também, siga esse padrão para as demais chamadas;
export async function listarProdutos(){
    const ret = await axios.get(`${SERVER_URL}/api/product/`);
    return ret.data;
};

export async function produtoPorId(id){
    const ret = await axios.get(`${SERVER_URL}/api/product/?id=${id}`);
    ret.data[0].image = eval(ret.data[0].image);
    return ret.data;
};

export async function updateProduct(id, pars){
    let params = new URLSearchParams();
      for(let p in pars) {
        params.append(p,pars[p])
    }
    params.append("prodId", id);
    const ret = await axios.post(`${SERVER_URL}/api/product/update`, params);
    return ret;
}

export async function saveProduct(pars){
    let params = new URLSearchParams();
      for(let p in pars) {
        params.append(p,pars[p])
    }
    const ret = await axios.post(`${SERVER_URL}/api/product/create.php`, params);
    return ret
}

export async function uploadImages(images){
    const ret = await axios.post(`${SERVER_URL}/api/product/uploadPic.php`, images);
    return ret.data;
}
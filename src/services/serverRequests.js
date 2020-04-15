import axios from "axios";
import { SERVER_URL } from './vars'

//o IP estava errado, arrumei e já coloquei o endereço do backend numa varaivel, vai facilitar de trocar em tudo depois

//arrumei o metodo também, siga esse padrão para as demais chamadas;
export async function listarProdutos() {
    const ret = await axios.get(`${SERVER_URL}/api/product/`);
    ret.data.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    })
    return ret.data;
};

export async function produtoPorId(id) {
    const ret = await axios.get(`${SERVER_URL}/api/product/?id=${id}`);
    ret.data[0].image = eval(ret.data[0].image);
    return ret.data;
};

export async function updateProduct(id, pars) {
    let params = new URLSearchParams();
    for (let p in pars) {
        params.append(p, pars[p])
    }
    params.append("prodId", id);
    const ret = await axios.post(`${SERVER_URL}/api/product/update`, params);
    return ret;
}

export async function saveProduct(pars) {
    let params = new URLSearchParams();
    for (let p in pars) {
        params.append(p, pars[p])
    }
    const ret = await axios.post(`${SERVER_URL}/api/product/create.php`, params);
    return ret;
}

export async function uploadImages(images) {
    const ret = await axios.post(`${SERVER_URL}/api/product/uploadPic.php`, images);
    return ret;
}

export async function saveCliente(pars) {
    let params = new URLSearchParams();
    for (let p in pars) {
        params.append(p, pars[p]);
    }
    let ret = await axios.post(`${SERVER_URL}/api/client/create.php`, params);
    return ret;
}

export async function clientePorId(id) {
    const ret = await axios.get(`${SERVER_URL}/api/client/?id=${id}`);
    return ret.data;
}

export async function listarClientes() {
    const ret = await axios.get(`${SERVER_URL}/api/client/`);
    return ret.data;
}

export async function deletarProduto(id) {
    const ret = await axios.get(`${SERVER_URL}/api/product/delete.php?id=${id}`);
    return ret;
}

export async function deletarCliente(id) {
    const ret = await axios.get(`${SERVER_URL}/api/client/delete.php?id=${id}`);
    return ret;
}

export async function listarCategorias() {
    const ret = await axios.get(`${SERVER_URL}/api/product/categories.php`);
    return ret;
}

export async function listarMarcas() {
    const ret = await axios.get(`${SERVER_URL}/api/product/brands.php`);
    return ret;
}

export async function listarCompras() {
    const ret = await axios.get(`${SERVER_URL}/api/client/getSales.php`);
    return ret;
}

export async function listarComprasDetalhes(code) {
    const ret = await axios.get(`${SERVER_URL}/api/payment/getBuyDetails.php?code=${code}`)
    return ret.data
}
export async function getAddressByCep(cep) {
    const ret = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return ret.data;
}

export async function createNewBrand(name) {
    const params = new URLSearchParams();
    params.append("name", name);
    const ret = await axios.post(`${SERVER_URL}/api/product/brands.php`, params);
    return ret
}

export async function createNewCategory(name) {
    const params = new URLSearchParams();
    params.append("name", name);
    const ret = await axios.post(`${SERVER_URL}/api/product/categories.php`, params);
    return ret
}

export async function getCode(code) {
    const ret = await axios.get(`${SERVER_URL}/api/payment/getCodeShipping.php?code=${code}`);
    return ret.data;
}

export async function saveDetail(code, scode) {
    const ret = await axios.get(`${SERVER_URL}/api/payment/setCodeShipping.php?code=${code}&scode=${scode}`);
    return ret.data;
}
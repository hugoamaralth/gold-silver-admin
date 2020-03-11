import React from "react";
import { Switch, Route} from "react-router-dom";
import ListaProdutos from "./components/ListaProdutos";
import NovoProduto from "./components/NovoProduto";
import EditProduto from "./components/EditProduto";
import EditClientes from "./components/EditClientes";
import ListaClientes from "./components/ListaCliente";
import NovoCliente from "./components/NovoCliente";

 
export default props =>
   <Switch>
       <Route path="/admin/produtos/list" component={ListaProdutos}/>
       <Route path="/admin/produtos/new" component={NovoProduto}/>
       <Route path="/admin/produtos/edit/:id" component={EditProduto}/>
       <Route path="/admin/clientes/list" component={ListaClientes}/>
       <Route path="/admin/clientes/edit/" component={EditClientes}/>
       <Route path="/admin/clientes/new" component={NovoCliente}/>
       
   </Switch>
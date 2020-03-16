import React from "react";
import { Switch, Route} from "react-router-dom";
import ListaProdutos from "./components/ListaProdutos";
import NovoProduto from "./components/NovoProduto";
import EditProduto from "./components/EditProduto";
import EditClientes from "./components/EditClientes";
import ListaClientes from "./components/ListaCliente";
import NovoCliente from "./components/NovoCliente";
import Compras from "./components/Compras"

 
export default props =>
   <Switch>
       <Route path="/admin/produtos" exact component={ListaProdutos}/>
       <Route path="/admin/produtos/new" component={NovoProduto}/>
       <Route path="/admin/produtos/edit/:id" component={EditProduto}/>
       <Route path="/admin/clientes" exact component={ListaClientes}/>
       <Route path="/admin/clientes/edit/:id" component={EditClientes}/>
       <Route path="/admin/clientes/new" component={NovoCliente}/>
       <Route path="/admin/compras" component={Compras}/>
       
   </Switch>
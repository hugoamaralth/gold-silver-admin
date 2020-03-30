import React from "react";
import { Switch, Route} from "react-router-dom";
import ListaProdutos from "./pages/ListaProdutos";
import NovoProduto from "./pages/NovoProduto";
import EditProduto from "./pages/EditProduto";
import EditClientes from "./pages/EditClientes";
import ListaClientes from "./pages/ListaCliente";
import NovoCliente from "./pages/NovoCliente";
import Compras from "./pages/Compras"

 
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
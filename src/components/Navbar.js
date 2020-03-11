import React from "react";
import { Link } from "react-router-dom";

export default props =>

  <>
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/admin">
        <div className="sidebar-brand-text mx-3">Gold{"&"}Silver<sup>Admin</sup></div>
      </Link>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <Link className="nav-link" to="/admin">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">
        Produtos
      </div>

      <li className="nav-item">
        <Link className="nav-link collapsed" to="/admin/produtos/list" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-bars"></i>
          <span>Lista de Produtos</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link collapsed" to="/admin/produtos/new" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
          <i className="fas fa-fw fa-wrench"></i>
          <span>Novo Produto</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">
        Clientes
      </div>

      <li className="nav-item">
        <Link className="nav-link collapsed" to="/admin/clientes/list" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-bars"></i>
          <span>Lista de Clientes</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link collapsed" to="/admin/clientes/new" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-fw fa-wrench"></i>
          <span>Novo Cliente</span>
        </Link>
      </li>


      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  </>
import React from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        
        <Link className="navbar-brand" to="/">
          Fin<span>App</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" end to="/">
                Início
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/buscar">
                Buscar Ação
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/mercado">
                Visão Geral
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
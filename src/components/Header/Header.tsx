import React from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      {/* 'container': limita a largura do conteúdo e centraliza */}
      <div className="container">
        
        {/* 'navbar-brand': usado para o logo ou nome principal */}
        <Link className="navbar-brand" to="/">
          FinApp
        </Link>

        {/* Este é o botão "hambúrguer" que aparece no mobile */}
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

        {/* Este 'div' agrupa os links e é o que "colapsa" no mobile */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* 'ms-auto': (margin-start: auto) joga os links para a direita */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {/* 'end': garante que a Home só fique ativa na rota "/" exata */}
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
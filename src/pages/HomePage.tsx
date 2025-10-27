import React from 'react';
import { Link } from 'react-router-dom'; 

export const HomePage = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{ minHeight: '60vh' }}
    >
      
      <h1 className="display-2 fw-bold">
        Bem-vindo ao <span className="text-primary">FinApp</span>
      </h1>
      
      <p
        className="lead fs-4 text-muted my-4"
        style={{ maxWidth: '700px' }}
      >
        Explore dados do mercado de ações. Busque por empresas,
        veja cotações em tempo real e analise os principais
        movimentos do mercado.
      </p>
    
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link
          className="btn btn-primary btn-lg shadow px-4 me-sm-3"
          to="/buscar"
        >
          Buscar Ação
        </Link>
        <Link
          className="btn btn-outline-secondary btn-lg shadow px-4"
          to="/mercado"
        >
          Ver Visão Geral
        </Link>
      </div>
    </div>
  );
};
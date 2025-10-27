import React from 'react';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer text-center py-4 mt-auto border-top">
      <div className="container">
        <span className="text-muted">
          <strong>FinApp</strong> por Hugo Pontello. Um projeto de portfólio
          construído com React, TS e Bootstrap para o projeto do ZettaLab 2025.
          <br />
          Dados financeiros fornecidos por{' '}
          <a
            href="https://www.alphavantage.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alpha Vantage
          </a>
          .
        </span>
      </div>
    </footer>
  );
};
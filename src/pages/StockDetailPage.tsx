import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getStockOverview,
  getStockQuote,
  ApiOverview,
  ApiQuote,
} from '../services/api';

export const StockDetailPage = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate(); // Hook para navegação

  const [overview, setOverview] = useState<ApiOverview | null>(null);
  const [quote, setQuote] = useState<ApiQuote | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) {
      navigate('/'); 
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [overviewData, quoteData] = await Promise.all([
          getStockOverview(symbol),
          getStockQuote(symbol),
        ]);

        setOverview(overviewData);
        setQuote(quoteData);

      } catch (err: any) {
        setError(err.message || 'Ocorreu um erro desconhecido.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [symbol, navigate]); 
  const renderLoading = () => (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
      <p className="mt-2">Buscando dados para {symbol}...</p>
    </div>
  );

  const renderError = () => (
    <div className="alert alert-danger">
      <strong>Erro ao carregar dados:</strong> {error}
    </div>
  );

  const renderPrice = (q: ApiQuote) => {
    const price = parseFloat(q['05. price']);
    const changePct = parseFloat(q['10. change percent']);
    const color = changePct >= 0 ? 'text-success' : 'text-danger';
    const icon = changePct >= 0 ? '▲' : '▼';

    return (
      <div className="mb-3">
        <h2 className="display-4 mb-0">${price.toFixed(2)}</h2>
        <h4 className={`fw-bold ${color}`}>
          {icon} {changePct.toFixed(2)}%
        </h4>
      </div>
    );
  };

  const renderOverview = (ov: ApiOverview, q: ApiQuote) => (
    <div className="row g-4">
      {/* Coluna da Esquerda: Preço e Descrição */}
      <div className="col-lg-8">
        {renderPrice(q)}
        
        <h4 className="mt-4">Sobre {ov.Name}</h4>
        <p className="lead">{ov.Description}</p>
      </div>

      {/* Coluna da Direita (Sidebar): Dados Rápidos */}
      <div className="col-lg-4">
        <div className="card">
          <div className="card-header">
            <strong>Dados Rápidos</strong>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
              <span>Símbolo:</span>
              <strong>{ov.Symbol}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Setor:</span>
              <strong className="text-end">{ov.Sector}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Indústria:</span>
              <strong className="text-end">{ov.Industry}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>P/E Ratio:</span>
              <strong>{ov.PERatio}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Dividend Yield:</span>
              <strong>{parseFloat(ov.DividendYield) * 100}%</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Valor de Mercado:</span>
              <strong>${(parseInt(ov.MarketCapitalization) / 1_000_000_000).toFixed(2)}B</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  
  return (
    <div>
      {/* 1. Primeiro, checa o Loading */}
      {isLoading && renderLoading()}

      {/* 2. Se não estiver carregando, checa se deu Erro */}
      {!isLoading && error && renderError()}

      {/* 3. Se não tiver loading E não tiver erro E tiver os dados... */}
      {!isLoading && !error && overview && quote && (
        <>
          <h1 className="h3">{overview.Name}</h1>
          <hr className="my-3" />
          {renderOverview(overview, quote)}
        </>
      )}
    </div>
  );
};
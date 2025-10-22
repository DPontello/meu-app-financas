import React, { useState, useEffect } from 'react';

import {
  getMarketOverview,
  ApiMarketOverview,
  ApiTickerItem,
} from '../services/api';

export const MarketPage = () => {

  // Guarda todos os dados da API (gainers, losers, etc.)
  const [marketData, setMarketData] = useState<ApiMarketOverview | null>(null);

  // Controla o "carregando" da página
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Guarda qualquer erro
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await getMarketOverview();
        setMarketData(data);

      } catch (err: any) {
        setError(err.message || 'Ocorreu um erro desconhecido.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // <-- O array vazio garante que isso rode só uma vez

  // --- FUNÇÃO AUXILIAR PARA RENDERIZAR UMA LISTA DE AÇÕES ---
  const renderTickerList = (title: string, items: ApiTickerItem[]) => {
    const getChangeColor = (change: string) => {
      const percentage = parseFloat(change.replace('%', ''));
      return percentage > 0 ? 'text-success' : 'text-danger';
    };

    return (
      <div className="mb-4">
        <h3>{title}</h3>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">Símbolo</th>
                <th scope="col">Preço</th>
                <th scope="col">Mudança %</th>
                <th scope="col">Volume</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.ticker}>
                  <td className="fw-bold">{item.ticker}</td>
                  <td>${parseFloat(item.price).toFixed(2)}</td>
                  <td className={getChangeColor(item.change_percentage)}>
                    {item.change_percentage}
                  </td>
                  <td>{item.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };


  return (
    <div>
      <h2 className="mb-4">Visão Geral do Mercado</h2>

      {/* 1. Mostra o "Spinner" de Carregamento */}
      {isLoading && (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando dados do mercado...</span>
          </div>
          <p className="mt-2">Buscando dados da Alpha Vantage...</p>
        </div>
      )}

      {/* 2. Mostra o Alerta de Erro */}
      {error && (
        <div className="alert alert-danger">
          <strong>Erro ao carregar dados:</strong> {error}
          <p className="mb-0 small">
            Nota: A API Alpha Vantage (plano gratuito) tem um limite
            de 5 chamadas por minuto e esta função pode ser limitada.
            Tente novamente em um minuto.
          </p>
        </div>
      )}

      {/* 3. Mostra os Dados (se carregou, sem erro e tem dados) */}
      {!isLoading && !error && marketData && (
        <div>
          <p className="text-muted">
            Última atualização: {marketData.last_updated}
          </p>
          {renderTickerList('Principais Altas (Top Gainers)', marketData.top_gainers)}
          {renderTickerList('Principais Baixas (Top Losers)', marketData.top_losers)}
          {renderTickerList('Mais Negociadas (Most Active)', marketData.most_actively_traded)}
        </div>
      )}
    </div>
  );
};
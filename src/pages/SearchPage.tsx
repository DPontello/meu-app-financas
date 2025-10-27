import React, { useState, useEffect } from 'react';

import { searchSymbols, ApiSearchResult } from '../services/api';
import { Link } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

export const SearchPage = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<ApiSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const debouncedQuery = useDebounce(query, 500);
  
  useEffect(() => {
    const performSearch = async () => {
      setIsLoading(true);
      setError(null);
      setHasSearched(true);
      try {
        const data = await searchSymbols(debouncedQuery);
        setResults(data);
      } catch (err: any) {
        setError(err.message || 'Ocorreu um erro desconhecido.');
      } finally {
        setIsLoading(false);
      }
    };
    if (debouncedQuery.trim()) {
      performSearch();
    } else {
      setResults([]);
      setError(null);
      setHasSearched(false);
    }
  }, [debouncedQuery]);
  return (
    <div>
      <h2 className="mb-4">Buscar por Ação</h2>
      <div className="mb-3 position-relative">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Digite o símbolo ou nome da empresa (ex: AAPL, Microsoft, PETR4...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        {isLoading && (
          <div
            className="spinner-border text-primary position-absolute"
            role="status"
            style={{ top: '12px', right: '16px' }}
          >
            <span className="visually-hidden">Carregando...</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        {error && (
          <div className="alert alert-danger">
            <strong>Erro:</strong> {error}
          </div>
        )}
        {hasSearched && !isLoading && !error && results.length === 0 && (
          <p className="text-muted">
            Nenhum resultado encontrado para "{debouncedQuery}".
          </p>
        )}
        {results.length > 0 && !error && (
          <div>
            <h3>Resultados da Busca</h3>
            <div className="list-group">
              {results.map((item) => (
                <Link
                  key={item['1. symbol']}
                  to={`/stock/${item['1. symbol']}`}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5 className="mb-0 text-primary">{item['1. symbol']}</h5>
                    <small className="text-muted">{item['2. name']}</small>
                  </div>
                  <span className="badge bg-secondary rounded-pill">
                    {item['4. region']}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


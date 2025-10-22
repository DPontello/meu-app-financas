import React, { useState, FormEvent } from 'react';
import { searchSymbols, ApiSearchResult } from '../services/api';

export const SearchPage = () => {

  // Guarda o valor do campo de busca (o que o usuário digita)
  const [query, setQuery] = useState<string>('');

  // Guarda os resultados que vêm da API
  const [results, setResults] = useState<ApiSearchResult[]>([]);

  // Controla se esta no meio de uma requisição (para mostrar loading)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Guarda qualquer mensagem de erro (ex: limite da API estourado)
  const [error, setError] = useState<string | null>(null);
  
  // Controla se uma busca já foi feita (para mostrar "nenhum resultado")
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Esta função é chamada quando o formulário é enviado (submit)
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults([]); 
    setHasSearched(true); 

  
    try {
      const data = await searchSymbols(query);
      setResults(data);

    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Buscar por Ação</h2>

      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Digite o símbolo ou nome da empresa (ex: AAPL, Microsoft, PETR4...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading} 
          />
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isLoading} 
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Carregando...</span>
              </>
            ) : (
              'Buscar'
            )}
          </button>
        </div>
      </form>
      <div className="mt-4">
        {error && (
          <div className="alert alert-danger">
            <strong>Erro:</strong> {error}
          </div>
        )}
        {hasSearched && !isLoading && !error && results.length === 0 && (
          <p className="text-muted">Nenhum resultado encontrado para "{query}".</p>
        )}
        {results.length > 0 && !error && (
          <div>
            <h3>Resultados da Busca</h3>
            <ul className="list-group">
              {results.map((item) => (
                <li 
                  key={item['1. symbol']} 
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5 className="mb-0">{item['1. symbol']}</h5>
                    <small className="text-muted">{item['2. name']}</small>
                  </div>
                  <span className="badge bg-secondary rounded-pill">
                    {item['4. region']}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
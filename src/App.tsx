import React from 'react';
// Importa os componentes de rota
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa componentes de layout
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

// Importa páginas
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { MarketPage } from './pages/MarketPage';


function App() {
  return (
    <BrowserRouter>
      {}
      <div className="d-flex flex-column min-vh-100">
        
        {}
        <Header />

        {}
        <main className="container py-4 flex-grow-1">
          
          {/* Define as rotas da aplicação */}
          <Routes>
            {}
            <Route path="/" element={<HomePage />} />
            <Route path="/buscar" element={<SearchPage />} />
            <Route path="/mercado" element={<MarketPage />} />
            
            {/* Rota "Coringa" para páginas não encontradas */}
            <Route path="*" element={<h2>Página não encontrada (404)</h2>} />
          </Routes>
        </main>

        {}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
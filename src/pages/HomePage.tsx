import React from 'react';

export const HomePage = () => {
  return (
    // 'text-center': classe do Bootstrap para centralizar texto
    <div className="text-center">
      <h1>Bem-vindo ao FinApp</h1>
      <p className="lead">Seu aplicativo para consulta de ações.</p>
      <p>Use o menu acima para navegar.</p>
    </div>
  );
};
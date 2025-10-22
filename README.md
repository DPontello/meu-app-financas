# FinApp

Aplicação web para consulta de informações do mercado de ações, permitindo a busca por empresas e a visualização de dados de mercado e cotações em tempo real.

🔗 **Deploy:** [(https://vercel.com/dpontellos-projects/meu-app-financas)]

---

## Tecnologias Utilizadas

- **React** v18+
- **TypeScript**
- **React Router** v6 (para roteamento)
- **Bootstrap** v5.3+ (para layout e responsividade)
- **SASS / SCSS** (para estilização customizada)
- **Git** (para controle de versão)

---

## API

O projeto utiliza a **API da Alpha Vantage** para obter dados financeiros, cotações e informações de empresas.

- **Documentação:** [https://www.alphavantage.co/documentation/](https://www.alphavantage.co/documentation/)

### Funções da API Utilizadas

- `SYMBOL_SEARCH`: Para buscar símbolos de ações por nome ou ticker (usado na Página de Busca).
- `TOP_GAINERS_LOSERS`: Para exibir as principais altas, baixas e mais negociadas (usado na Página de Mercado).
- `GLOBAL_QUOTE`: Para obter o preço atual, variação diária e percentual de uma ação específica (usado na Página de Detalhes).
- `OVERVIEW`: Para obter a descrição, setor, indústria e dados fundamentalistas da empresa (usado na Página de Detalhes).

---

## Estrutura do Projeto
/src

├── /components # Componentes reutilizáveis (Header, Footer)

├── /pages # Páginas/rotas da aplicação
  ── HomePage.tsx
  ── SearchPage.tsx
  ── MarketPage.tsx
  ── StockDetailPage.tsx

├── /services # Módulo central de comunicação com a API
  ── api.ts

├── /styles # Arquivos SASS/SCSS globais
  ── main.scss

├── App.tsx # Roteador principal da aplicação
 ── index.tsx # Ponto de entrada (configuração do Bootstrap)


---

## Funcionalidades

- **Layout Responsivo:** Adapta-se a todos os tamanhos de tela (mobile, tablet, desktop) utilizando breakpoints do Bootstrap 5.
- **Componentização:** `Header` e `Footer` são componentes separados e reutilizados em todas as páginas.
- **Navegação (4 Rotas):**
  - `/` (Home): Página inicial de apresentação.
  - `/buscar` (Busca): Página interativa de busca.
  - `/mercado` (Visão Geral): Página com dados do mercado (Top Gainers/Losers).
  - `/stock/:symbol` (Detalhes): Rota dinâmica que exibe informações detalhadas de uma ação específica (ex: `/stock/PETR4.SAO`).

### Busca de Ações (SearchPage)

- Permite ao usuário buscar ações por símbolo (ex: `AAPL`, `PETR4`) ou nome (`Microsoft`).
- Tratamento de estado de loading durante a requisição.
- Exibição de mensagens de erro (ex: limite de API atingido) ou nenhum resultado.
- Resultados da busca são links que levam à página de detalhes.

### Visão Geral do Mercado (MarketPage)

- Carrega dados automaticamente ao abrir a página (`useEffect`).
- Exibe tabelas responsivas (`table-responsive`) para "Principais Altas", "Principais Baixas" e "Mais Negociadas".
- Informa ao usuário que os dados se referem ao mercado dos EUA (limitação da API).

### Página de Detalhes da Ação (StockDetailPage)

- Utiliza `useParams` para ler o símbolo da ação da URL.
- Dispara múltiplas chamadas de API em paralelo (`Promise.all`) para buscar preço (`GLOBAL_QUOTE`) e descrição (`OVERVIEW`) simultaneamente.
- Exibe o preço, a variação (com cores dinâmicas), a descrição completa da empresa e um card com dados fundamentalistas (P/E, Valor de Mercado, etc.).

---

## Como Rodar o Projeto Localmente

1. Clone este repositório:

```bash
git clone https://github.com/DPontello/meu-app-financas.git

cd meu-app-financas
npm install  

```
2. Navegue até a pasta do projeto e instale as dependências:

```bash
cd meu-app-financas
npm install

```
3. Crie um arquivo .env na raiz do projeto (mesma pasta do package.json) e adicione sua chave da Alpha Vantage:
```
REACT_APP_ALPHAVANTAGE_API_KEY=SUA_CHAVE_PESSOAL_AQUI
```
4. Inicie o servidor de desenvolvimento:
```bash
npm start
```


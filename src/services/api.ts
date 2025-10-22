const BASE_URL = "https://www.alphavantage.co/query";
const API_KEY = process.env.REACT_APP_ALPHAVANTAGE_API_KEY;

export interface ApiSearchResult {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

export interface ApiTickerItem {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
}

export interface ApiMarketOverview {
  top_gainers: ApiTickerItem[];
  top_losers: ApiTickerItem[];
  most_actively_traded: ApiTickerItem[];
  metadata: string;
  last_updated: string;
}

export const searchSymbols = async (keywords: string): Promise<ApiSearchResult[]> => {
  // verifica se a chave da API foi carregada
  if (!API_KEY) {
    throw new Error("Chave da API (API_KEY) não encontrada. Verifique o .env");
  }

  const url = `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);

    // verifica se a requisição foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();

    // A Alpha Vantage tem um limite de 5 chamadas/minuto no plano gratuito.
    // Se o limite for atingido, ela retorna um objeto 'Note' ou 'Information'.
    if (data.Note || data.Information) {
      throw new Error(data.Note || data.Information);
    }

   
    if (data.bestMatches) {
      return data.bestMatches;
    }
    return [];
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    throw error;
  }
}

export const getMarketOverview = async (): Promise<ApiMarketOverview> => {
  if (!API_KEY) {
    throw new Error("Chave da API (API_KEY) não encontrada. Verifique o .env");
  }

  // Usamos a função TOP_GAINERS_LOSERS da API
  const url = `${BASE_URL}?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`);
    }

    const data = await response.json();

    // Verificação de limite de API (muito importante para esta função)
    if (data.Note || data.Information) {
      throw new Error(data.Note || data.Information);
    }

    // A API retorna os dados diretamente no objeto principal
    return data;

  } catch (error) {
    console.error("Erro ao buscar dados do mercado:", error);
    throw error;
  }
}
// Interface para o GLOBAL QUOTE (Cotação)
export interface ApiQuote {
  '01. symbol': string;
  '05. price': string;
  '09. change': string;
  '10. change percent': string;
}

// Interface para o OVERVIEW (Descrição)
export interface ApiOverview {
  Symbol: string;
  Name: string;
  Description: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  PERatio: string; 
  DividendYield: string;
}

// Função para buscar o PREÇO ATUAL (Global Quote)
export const getStockQuote = async (symbol: string): Promise<ApiQuote> => {
  if (!API_KEY) {
    throw new Error("Chave da API (API_KEY) não encontrada.");
  }

  const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);

    const data = await response.json();
    if (data.Note || data.Information) throw new Error(data.Note || data.Information);
    
    if (data['Global Quote']) {
      return data['Global Quote'];
    }

    if (Object.keys(data).length === 0) {
      throw new Error("Nenhum dado de cotação encontrado para este símbolo.");
    }

    throw new Error("Formato de resposta inesperado para Cotação.");

  } catch (error) {
    console.error("Erro ao buscar cotação:", error);
    throw error;
  }
};


// Função para buscar a DESCRIÇÃO (Overview)
export const getStockOverview = async (symbol: string): Promise<ApiOverview> => {
  if (!API_KEY) {
    throw new Error("Chave da API (API_KEY) não encontrada.");
  }

  const url = `${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
    
    const data = await response.json();
    if (data.Note || data.Information) throw new Error(data.Note || data.Information);

    if (!data.Symbol) {
       throw new Error("Nenhuma informação (overview) encontrada para este símbolo.");
    }
    
    return data;

  } catch (error) {
    console.error("Erro ao buscar overview:", error);
    throw error;
  }
};
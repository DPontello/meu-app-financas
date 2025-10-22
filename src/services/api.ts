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
};
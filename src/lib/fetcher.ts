const API_BASE_URL =
  'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod';

interface ApiRequestOptions {
  endpoint: string;
  method: string;
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}

export const fetcher = async ({
  endpoint,
  method = 'GET',
  headers = {},
  body,
}: ApiRequestOptions) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      ...headers,
      ...(method === 'POST' && { 'Content-Type': 'application/json' }),
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data);
    }
    return data;
  } catch (error) {
    // Log error to monitoring system
    console.error('Fetch error:', error);
    throw error;
  }
};

// frontend/src/services/api.ts

// Uses VITE_API_URL from .env
export const API_URL = import.meta.env.VITE_API_URL;

// Generic fetch helper
export async function fetchFromAPI(endpoint: string, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    credentials: 'include', // optional: if you use cookies
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

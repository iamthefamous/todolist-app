// API configuration with fallback and helpful logging
const DEFAULT_API_URL = 'http://localhost:5000';
const API_BASE_URL = import.meta.env.VITE_API_URL ?? DEFAULT_API_URL;

if (!import.meta.env.VITE_API_URL) {
	console.warn('[src/config/api.js] VITE_API_URL is not set — using fallback:', API_BASE_URL);
} else {
	console.log('[src/config/api.js] VITE_API_URL=', import.meta.env.VITE_API_URL);
}

export default API_BASE_URL;

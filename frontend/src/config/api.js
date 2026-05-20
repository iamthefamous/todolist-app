// API configuration with sane defaults for local development.
const DEFAULT_API_URL = 'http://localhost:8080';
const rawApiUrl = import.meta.env.VITE_API_URL ?? (import.meta.env.PROD ? '' : DEFAULT_API_URL);
const API_BASE_URL = String(rawApiUrl).replace(/\/+$/g, '');

if (!import.meta.env.VITE_API_URL) {
	console.warn('[src/config/api.js] VITE_API_URL is not set — using fallback:', API_BASE_URL);
} else {
	console.log('[src/config/api.js] VITE_API_URL=', import.meta.env.VITE_API_URL, 'normalized ->', API_BASE_URL);
}

export default API_BASE_URL;

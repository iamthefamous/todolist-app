// API configuration with fallback and helpful logging
const PRODUCTION_API_URL = 'https://todolist-python-1qi7vq31b-asylbeks-projects-ddc3ce96.vercel.app';
// For Docker, use relative path; for local dev, use localhost
const DEFAULT_API_URL = import.meta.env.PROD ? PRODUCTION_API_URL : (window.location.origin.includes('localhost:5173') ? 'http://localhost:8080' : '');
const rawApiUrl = import.meta.env.VITE_API_URL ?? DEFAULT_API_URL;
// remove any trailing slashes so later concatenation won't produce '//' which can cause redirects
const API_BASE_URL = String(rawApiUrl).replace(/\/+$/g, '') || DEFAULT_API_URL;

if (!import.meta.env.VITE_API_URL) {
	console.warn('[src/config/api.js] VITE_API_URL is not set — using fallback:', API_BASE_URL);
} else {
	console.log('[src/config/api.js] VITE_API_URL=', import.meta.env.VITE_API_URL, 'normalized ->', API_BASE_URL);
}

export default API_BASE_URL;

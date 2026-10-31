// Real HTTP client for optional server endpoints. It never fabricates API responses.
const BASE_URL = import.meta.env.VITE_API_URL || '';
async function request(method, endpoint, body) {
  if (!BASE_URL) throw new Error('No REST API URL configured. Configure VITE_API_URL or use the Firebase data services.');
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method, headers: { 'Content-Type': 'application/json' },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  if (!response.ok) throw new Error(`API request failed (${response.status})`);
  if (response.status === 204) return null;
  return response.json();
}
export const apiClient = {
  get: (endpoint) => request('GET', endpoint),
  post: (endpoint, body) => request('POST', endpoint, body),
  put: (endpoint, body) => request('PUT', endpoint, body),
  delete: (endpoint) => request('DELETE', endpoint),
};
export default apiClient;

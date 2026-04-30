// Root URL for all backend API requests
export const baseURL = 'http://localhost:8080';

/**
 * Extracts a meaningful error message from a failed `fetch` response.
 *
 * @async
 * @param {Response} response - The failed `fetch` response object.
 * @returns {Promise<string>} A readable error message extracted from the response.
 */
export async function parseError(response) {
  const raw = await response.text();

  let backendMessage;
  console.log(`HTTP ${response.status}`);

  try {
    // Try to parse JSON from the raw text
    const data = JSON.parse(raw);
    backendMessage = data.message || data.error || raw;
  } catch {
    // If it's not JSON, just use the raw text
    backendMessage = raw;
  }

  return backendMessage;
}
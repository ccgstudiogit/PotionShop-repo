export async function parseError(response) {
  const raw = await response.text();

  let backendMessage = `HTTP ${response.status}`;

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
export const API_BASE_URL = "https://www.liiga.fi/api/v2";

export async function fetchJson(path, options) {
    const response = await fetch(`${API_BASE_URL}${path}`, options);

    if (!response.ok) {
        throw new Error(`Liiga API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

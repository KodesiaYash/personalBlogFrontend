export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function fetchAPI(endpoint: string, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, options)
  if (!res.ok) {
    throw new Error(`An error occurred: ${res.status}`)
  }
  return res.json()
}


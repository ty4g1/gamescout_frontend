import { API_BASE_URL } from "./url"

export const patchApi = async <T>(endpoint: string, data: any): Promise<{data: T | null, error: string | null}> => {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result: T = await response.json()
    return { data: result, error: null }
  } catch (err) {
    return { 
      data: null, 
      error: err instanceof Error ? err.message : 'An error occurred' 
    }
  }
}
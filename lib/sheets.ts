export interface SheetData {
  settings: string[][]
  destinos: string[][]
  vehiculos: string[][]
}

export async function fetchSheetData(): Promise<SheetData> {
  const response = await fetch('/api/sheets')
  
  if (!response.ok) {
    throw new Error('Failed to fetch sheet data')
  }
  
  return response.json()
}
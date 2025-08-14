import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.TRASLADO_DE_MOTOS_API_KEY
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID

    if (!apiKey || !spreadsheetId) {
      return NextResponse.json(
        { error: 'API key or spreadsheet ID not configured' },
        { status: 500 }
      )
    }

    const sheets = google.sheets({
      version: 'v4',
      auth: apiKey,
    })

    // Fetch all three tabs
    const [settingsResponse, destinosResponse, vehiculosResponse] = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'settings!A:Z',
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'destinos!A:Z',
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'vehiculos!A:Z',
      }),
    ])

    const data = {
      settings: settingsResponse.data.values || [],
      destinos: destinosResponse.data.values || [],
      vehiculos: vehiculosResponse.data.values || [],
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching sheet data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sheet data' },
      { status: 500 }
    )
  }
}
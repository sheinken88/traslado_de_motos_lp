import { Settings, Route, Vehicle, ParsedSheetData } from "@/types/sheets";

export interface SheetData {
  settings: string[][];
  destinos: string[][];
  vehiculos: string[][];
}

export async function fetchSheetData(): Promise<SheetData> {
  const response = await fetch("/api/sheets");

  if (!response.ok) {
    throw new Error("Failed to fetch sheet data");
  }

  return response.json();
}

/**
 * Parse raw sheet data into typed objects
 */
export function parseSheetData(rawData: SheetData): ParsedSheetData {
  return {
    settings: parseSettings(rawData.settings),
    routes: parseRoutes(rawData.destinos),
    vehicles: parseVehicles(rawData.vehiculos),
  };
}

/**
 * Parse settings from key-value pairs
 */
function parseSettings(settingsData: string[][]): Settings {
  const settings: Partial<Settings> = {};

  settingsData.forEach((row) => {
    if (row.length >= 2) {
      const key = row[0] as keyof Settings;
      const value = row[1];

      // Parse numeric values
      if (key !== "ULT_ACTUALIZACION") {
        settings[key] = parseFloat(value) as any;
      } else {
        settings[key] = value as any;
      }
    }
  });

  return settings as Settings;
}

/**
 * Parse destinations/routes data
 */
function parseRoutes(destinosData: string[][]): Route[] {
  const routes: Route[] = [];

  // Always skip the first row (header row)
  const dataRows = destinosData.slice(1);

  dataRows.forEach((row) => {
    if (row.length >= 3) {
      routes.push({
        origin: row[0],
        destination: row[1],
        km: parseInt(row[2], 10),
      });
    }
  });

  return routes;
}

/**
 * Parse vehicles data
 */
function parseVehicles(vehiculosData: string[][]): Vehicle[] {
  const vehicles: Vehicle[] = [];

  // Always skip the first row (header row)
  const dataRows = vehiculosData.slice(1);

  dataRows.forEach((row) => {
    if (row.length >= 2) {
      vehicles.push({
        category: row[0],
        estimatedPrice: parseInt(row[1], 10),
      });
    }
  });

  return vehicles;
}

/**
 * Fetch and parse sheet data in one call
 */
export async function fetchParsedSheetData(): Promise<ParsedSheetData> {
  const rawData = await fetchSheetData();
  return parseSheetData(rawData);
}

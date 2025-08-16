export interface Settings {
  ULT_ACTUALIZACION: string;
  PR_X_DIA_ESPERA: number;
  KM_X_LITRO: number;
  LITRO_DIESEL: number;
  PR_X_KMS: number;
  CHOFER: number;
  ALOJAMIENTO: number;
  PEAJES: number;
  COMIDAS: number;
  AEREO: number;
  GARAGE_TRAILER: number;
  PRECIO_DOLAR: number;
  INSURANCE_RATE: number;
  INSURANCE_MARKUP: number;
  MARGIN_GENERAL: number;
}

export interface Route {
  origin: string;
  destination: string;
  km: number;
}

export interface Vehicle {
  category: string;
  estimatedPrice: number;
}

export interface QuoteCalculation {
  // Direct costs
  fuelCost: number;
  driverCost: number;
  accommodationCost: number;
  mealCost: number;
  tollCost: number;
  airGarageCost: number;
  
  // Totals
  totalDirectCost: number;
  priceWithMargin: number;  // Direct costs with margin applied
  insuranceCost: number;     // Insurance with its own markup
  finalPrice: number;        // priceWithMargin + insuranceCost
  
  // Additional info
  totalBlocks: number;
  totalKm: number;
}

export interface ParsedSheetData {
  settings: Settings;
  routes: Route[];
  vehicles: Vehicle[];
}
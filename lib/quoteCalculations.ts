import { Settings, Route, Vehicle, QuoteCalculation } from '@/types/sheets';

export class QuoteCalculator {
  private settings: Settings;
  private routes: Route[];
  private vehicles: Vehicle[];

  constructor(settings: Settings, routes: Route[], vehicles: Vehicle[]) {
    this.settings = settings;
    this.routes = routes;
    this.vehicles = vehicles;
  }

  /**
   * Calculate complete quote for motorcycle transportation
   */
  calculateQuote(
    origin: string,
    destination: string,
    vehicleCategory: string,
    quantity: number,
    waitingDays: number
  ): QuoteCalculation {
    // Find route
    const route = this.findRoute(origin, destination);
    if (!route) {
      throw new Error(`Route not found: ${origin} → ${destination}`);
    }

    // Calculate transportation blocks (850km each, always round up)
    const totalBlocks = Math.ceil(route.km / 850);
    
    // Calculate all cost components
    const fuelCost = this.calculateFuel(route.km);
    const driverCost = this.calculateDriver(route.km);
    const accommodationCost = this.calculateAccommodation(totalBlocks, waitingDays);
    const { mealCost, airGarageCost } = this.calculateWaitingCosts(totalBlocks, waitingDays);
    const tollCost = this.settings.PEAJES;
    
    // Total direct costs (subject to margin)
    const totalDirectCost = fuelCost + driverCost + accommodationCost + 
                           mealCost + tollCost + airGarageCost;
    
    // Apply margin to direct costs only
    const priceWithMargin = totalDirectCost / this.settings.MARGIN_GENERAL;
    
    // Calculate insurance (with its own markup, not subject to general margin)
    const insuranceCost = this.calculateInsurance(vehicleCategory, quantity);
    
    // Final price = margin-applied direct costs + insurance
    const finalPrice = priceWithMargin + insuranceCost;

    return {
      fuelCost: Math.round(fuelCost),
      driverCost: Math.round(driverCost),
      accommodationCost: Math.round(accommodationCost),
      mealCost: Math.round(mealCost),
      tollCost: Math.round(tollCost),
      airGarageCost: Math.round(airGarageCost),
      totalDirectCost: Math.round(totalDirectCost),
      priceWithMargin: Math.round(priceWithMargin),
      insuranceCost: Math.round(insuranceCost),
      finalPrice: Math.round(finalPrice),
      totalBlocks,
      totalKm: route.km
    };
  }

  /**
   * Calculate fuel cost based on distance and fuel efficiency
   */
  private calculateFuel(km: number): number {
    const litersNeeded = km / this.settings.KM_X_LITRO;
    return litersNeeded * this.settings.LITRO_DIESEL;
  }

  /**
   * Calculate driver cost based on 850km blocks
   */
  private calculateDriver(km: number): number {
    const blocks = Math.ceil(km / 850);
    return blocks * this.settings.CHOFER;
  }

  /**
   * Calculate accommodation cost (only for additional blocks)
   */
  private calculateAccommodation(blocks: number, waitingDays: number): number {
    // No accommodation for extended waits (> 5 days)
    if (waitingDays > 5) {
      return 0;
    }
    
    // Accommodation for additional blocks only (first block doesn't need accommodation)
    return (blocks - 1) * this.settings.ALOJAMIENTO;
  }

  /**
   * Calculate costs related to waiting days
   */
  private calculateWaitingCosts(blocks: number, waitingDays: number): { mealCost: number; airGarageCost: number } {
    let mealCost = 0;
    let airGarageCost = 0;
    
    // Extended wait: add air transport and garage costs
    if (waitingDays > 4) {
      airGarageCost = this.settings.AEREO + this.settings.GARAGE_TRAILER;
    }
    
    // Meal costs for normal trips (not for extended waits > 5 days)
    if (waitingDays <= 5) {
      mealCost = (blocks - 1) * this.settings.COMIDAS;
    }
    
    return { mealCost, airGarageCost };
  }

  /**
   * Calculate insurance with its own markup (separate from general margin)
   */
  private calculateInsurance(vehicleCategory: string, quantity: number): number {
    const vehicle = this.vehicles.find(v => v.category === vehicleCategory);
    if (!vehicle) {
      throw new Error(`Vehicle category not found: ${vehicleCategory}`);
    }
    
    const totalValue = vehicle.estimatedPrice * quantity;
    const grossInsurance = totalValue * this.settings.INSURANCE_RATE;
    
    // Insurance has its own markup
    return grossInsurance * (1 + this.settings.INSURANCE_MARKUP);
  }

  /**
   * Find route by origin and destination (bidirectional search)
   */
  private findRoute(origin: string, destination: string): Route | null {
    // Direct search
    let route = this.routes.find(r => 
      r.origin.toLowerCase() === origin.toLowerCase() && 
      r.destination.toLowerCase() === destination.toLowerCase()
    );
    
    // Reverse search if not found
    if (!route) {
      route = this.routes.find(r => 
        r.origin.toLowerCase() === destination.toLowerCase() && 
        r.destination.toLowerCase() === origin.toLowerCase()
      );
    }
    
    return route || null;
  }

  /**
   * Get all available origins
   */
  getOrigins(): string[] {
    const origins = new Set<string>();
    this.routes.forEach(route => {
      origins.add(route.origin);
      origins.add(route.destination);
    });
    return Array.from(origins).sort();
  }

  /**
   * Get all available destinations for a given origin
   */
  getDestinationsForOrigin(origin: string): string[] {
    const destinations = new Set<string>();
    
    this.routes.forEach(route => {
      if (route.origin.toLowerCase() === origin.toLowerCase()) {
        destinations.add(route.destination);
      } else if (route.destination.toLowerCase() === origin.toLowerCase()) {
        destinations.add(route.origin);
      }
    });
    
    return Array.from(destinations).sort();
  }

  /**
   * Get all vehicle categories
   */
  getVehicleCategories(): string[] {
    return this.vehicles.map(v => v.category);
  }
}
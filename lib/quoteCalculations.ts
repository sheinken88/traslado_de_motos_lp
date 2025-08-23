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
   * Calculate complete quote for multiple motorcycle types
   */
  calculateQuoteMultipleVehicles(
    origin: string,
    destination: string,
    vehicles: Array<{type: string, quantity: number}>,
    waitingDays: number,
    includeInsurance: boolean = true
  ): QuoteCalculation {
    // Find route
    const route = this.findRoute(origin, destination);
    if (!route) {
      throw new Error(`Route not found: ${origin} → ${destination}`);
    }

    // Calculate total quantity for driver/accommodation calculations
    const totalQuantity = vehicles.reduce((sum, v) => sum + v.quantity, 0);

    // Calculate transportation blocks (850km each, always round up)
    const totalBlocks = Math.ceil(route.km / 850);
    
    // Calculate all cost components (same for all vehicles)
    const fuelCost = this.calculateFuel(route.km);
    const driverCost = this.calculateDriver(route.km);
    const accommodationCost = this.calculateAccommodation(totalBlocks, waitingDays);
    const { mealCost, airGarageCost } = this.calculateWaitingCosts(totalBlocks, waitingDays);
    const tollCost = this.settings.PEAJES;
    
    // Calculate insurance for each vehicle type separately (only if includeInsurance is true)
    const insuranceCost = includeInsurance 
      ? vehicles.reduce((sum, vehicle) => {
          return sum + this.calculateInsurance(vehicle.type, vehicle.quantity);
        }, 0)
      : 0;
    
    // Total direct costs (subject to margin)
    const totalDirectCost = fuelCost + driverCost + accommodationCost + 
                           mealCost + tollCost + airGarageCost;
    
    // Apply margin to direct costs only
    const priceWithMargin = totalDirectCost / this.settings.MARGIN_GENERAL;
    
    // Final price = margin-applied direct costs + insurance
    const finalPrice = priceWithMargin + insuranceCost;

    // Detailed calculation log
    console.log('=================== QUOTE CALCULATION BREAKDOWN ===================');
    console.log(`Route: ${origin} → ${destination} (${route.km} km)`);
    console.log(`Vehicles: ${vehicles.map(v => `${v.quantity}x ${v.type}`).join(', ')}`);
    console.log(`Waiting Days: ${waitingDays}`);
    console.log('-------------------------------------------------------------------');
    console.log('OPERATIONAL COSTS:');
    console.log(`  Fuel Cost: $${Math.round(fuelCost).toLocaleString('es-AR')}`);
    console.log(`    → ${route.km} km ÷ ${this.settings.KM_X_LITRO} km/L × $${this.settings.LITRO_DIESEL}/L`);
    console.log(`  Driver Cost: $${Math.round(driverCost).toLocaleString('es-AR')}`);
    console.log(`    → ${totalBlocks} blocks × $${this.settings.CHOFER.toLocaleString('es-AR')}/block`);
    console.log(`  Accommodation: $${Math.round(accommodationCost).toLocaleString('es-AR')}`);
    console.log(`    → ${accommodationCost > 0 ? `${totalBlocks - 1} nights × $${this.settings.ALOJAMIENTO.toLocaleString('es-AR')}` : 'Not required (waiting > 5 days)'}`);
    console.log(`  Meals: $${Math.round(mealCost).toLocaleString('es-AR')}`);
    console.log(`    → ${mealCost > 0 ? `${totalBlocks - 1} × $${this.settings.COMIDAS.toLocaleString('es-AR')}` : 'Not required (waiting > 5 days)'}`);
    console.log(`  Tolls: $${Math.round(tollCost).toLocaleString('es-AR')}`);
    console.log(`  Air/Garage: $${Math.round(airGarageCost).toLocaleString('es-AR')}`);
    console.log(`    → ${airGarageCost > 0 ? `Air: $${this.settings.AEREO.toLocaleString('es-AR')} + Garage: $${this.settings.GARAGE_TRAILER.toLocaleString('es-AR')}` : 'Not required (waiting ≤ 4 days)'}`);
    console.log('-------------------------------------------------------------------');
    console.log(`TOTAL DIRECT COSTS: $${Math.round(totalDirectCost).toLocaleString('es-AR')}`);
    console.log(`AFTER MARGIN (÷${this.settings.MARGIN_GENERAL}): $${Math.round(priceWithMargin).toLocaleString('es-AR')}`);
    console.log('-------------------------------------------------------------------');
    if (includeInsurance) {
      console.log('INSURANCE CALCULATION:');
      vehicles.forEach(vehicle => {
        const veh = this.vehicles.find(v => v.category === vehicle.type);
        if (veh) {
          const vehicleValue = veh.estimatedPrice * vehicle.quantity;
          const grossIns = vehicleValue * this.settings.INSURANCE_RATE;
          const finalIns = grossIns * (1 + this.settings.INSURANCE_MARKUP);
          console.log(`  ${vehicle.quantity}x ${vehicle.type}:`);
          console.log(`    Vehicle value: $${vehicleValue.toLocaleString('es-AR')}`);
          console.log(`    Insurance (${(this.settings.INSURANCE_RATE * 100).toFixed(2)}%): $${Math.round(grossIns).toLocaleString('es-AR')}`);
          console.log(`    + Markup (${(this.settings.INSURANCE_MARKUP * 100).toFixed(1)}%): $${Math.round(finalIns).toLocaleString('es-AR')}`);
        }
      });
      console.log(`  TOTAL INSURANCE: $${Math.round(insuranceCost).toLocaleString('es-AR')}`);
    } else {
      console.log('INSURANCE: Not included (checkbox unchecked)');
    }
    console.log('===================================================================');
    console.log(`FINAL PRICE: $${Math.round(finalPrice).toLocaleString('es-AR')}`);
    console.log('===================================================================');

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
   * Calculate complete quote for motorcycle transportation
   */
  calculateQuote(
    origin: string,
    destination: string,
    vehicleCategory: string,
    quantity: number,
    waitingDays: number,
    includeInsurance: boolean = true
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
    const insuranceCost = includeInsurance 
      ? this.calculateInsurance(vehicleCategory, quantity)
      : 0;
    
    // Final price = margin-applied direct costs + insurance
    const finalPrice = priceWithMargin + insuranceCost;

    // Detailed calculation log (for single vehicle)
    console.log('=================== QUOTE CALCULATION BREAKDOWN ===================');
    console.log(`Route: ${origin} → ${destination} (${route.km} km)`);
    console.log(`Vehicle: ${quantity}x ${vehicleCategory}`);
    console.log(`Waiting Days: ${waitingDays}`);
    console.log('-------------------------------------------------------------------');
    console.log('OPERATIONAL COSTS:');
    console.log(`  Fuel Cost: $${Math.round(fuelCost).toLocaleString('es-AR')}`);
    console.log(`    → ${route.km} km ÷ ${this.settings.KM_X_LITRO} km/L × $${this.settings.LITRO_DIESEL}/L`);
    console.log(`  Driver Cost: $${Math.round(driverCost).toLocaleString('es-AR')}`);
    console.log(`    → ${totalBlocks} blocks × $${this.settings.CHOFER.toLocaleString('es-AR')}/block`);
    console.log(`  Accommodation: $${Math.round(accommodationCost).toLocaleString('es-AR')}`);
    console.log(`    → ${accommodationCost > 0 ? `${totalBlocks - 1} nights × $${this.settings.ALOJAMIENTO.toLocaleString('es-AR')}` : 'Not required (waiting > 5 days)'}`);
    console.log(`  Meals: $${Math.round(mealCost).toLocaleString('es-AR')}`);
    console.log(`    → ${mealCost > 0 ? `${totalBlocks - 1} × $${this.settings.COMIDAS.toLocaleString('es-AR')}` : 'Not required (waiting > 5 days)'}`);
    console.log(`  Tolls: $${Math.round(tollCost).toLocaleString('es-AR')}`);
    console.log(`  Air/Garage: $${Math.round(airGarageCost).toLocaleString('es-AR')}`);
    console.log(`    → ${airGarageCost > 0 ? `Air: $${this.settings.AEREO.toLocaleString('es-AR')} + Garage: $${this.settings.GARAGE_TRAILER.toLocaleString('es-AR')}` : 'Not required (waiting ≤ 4 days)'}`);
    console.log('-------------------------------------------------------------------');
    console.log(`TOTAL DIRECT COSTS: $${Math.round(totalDirectCost).toLocaleString('es-AR')}`);
    console.log(`AFTER MARGIN (÷${this.settings.MARGIN_GENERAL}): $${Math.round(priceWithMargin).toLocaleString('es-AR')}`);
    console.log('-------------------------------------------------------------------');
    if (includeInsurance) {
      console.log('INSURANCE CALCULATION:');
      const veh = this.vehicles.find(v => v.category === vehicleCategory);
      if (veh) {
        const vehicleValue = veh.estimatedPrice * quantity;
        const grossIns = vehicleValue * this.settings.INSURANCE_RATE;
        const finalIns = grossIns * (1 + this.settings.INSURANCE_MARKUP);
        console.log(`  ${quantity}x ${vehicleCategory}:`);
        console.log(`    Vehicle value: $${vehicleValue.toLocaleString('es-AR')}`);
        console.log(`    Insurance (${(this.settings.INSURANCE_RATE * 100).toFixed(2)}%): $${Math.round(grossIns).toLocaleString('es-AR')}`);
        console.log(`    + Markup (${(this.settings.INSURANCE_MARKUP * 100).toFixed(1)}%): $${Math.round(finalIns).toLocaleString('es-AR')}`);
      }
      console.log(`  TOTAL INSURANCE: $${Math.round(insuranceCost).toLocaleString('es-AR')}`);
    } else {
      console.log('INSURANCE: Not included (checkbox unchecked)');
    }
    console.log('===================================================================');
    console.log(`FINAL PRICE: $${Math.round(finalPrice).toLocaleString('es-AR')}`);
    console.log('===================================================================');

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
  calculateInsurance(vehicleCategory: string, quantity: number): number {
    const vehicle = this.vehicles.find(v => v.category === vehicleCategory);
    if (!vehicle) {
      throw new Error(`Vehicle category not found: "${vehicleCategory}"`);
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
    const normalizeString = (str: string) => str.toLowerCase().trim();
    
    // Direct search
    let route = this.routes.find(r => 
      normalizeString(r.origin) === normalizeString(origin) && 
      normalizeString(r.destination) === normalizeString(destination)
    );
    
    // Reverse search if not found
    if (!route) {
      route = this.routes.find(r => 
        normalizeString(r.origin) === normalizeString(destination) && 
        normalizeString(r.destination) === normalizeString(origin)
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
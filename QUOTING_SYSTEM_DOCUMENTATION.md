# Motorcycle Transportation Quoting System - Complete Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Google Sheets Data Structure](#google-sheets-data-structure)
3. [Calculation Logic & Formulas](#calculation-logic--formulas)
4. [Step-by-Step Examples](#step-by-step-examples)
5. [Implementation Guide](#implementation-guide)
6. [Testing Scenarios](#testing-scenarios)

---

## System Overview

This documentation explains the comprehensive motorcycle transportation quoting system that calculates pricing based on:
- **Distance-based costs** (fuel, driver blocks)
- **Vehicle type and quantity** (insurance calculation)
- **Waiting days logic** (accommodation, meals, air transport)
- **Two-tier pricing structure** (operational margin + insurance markup)

### Key Calculation Principle
The system applies **different pricing logic** to operational costs vs. insurance:
- **Operational costs** are subject to general business margin (÷ 0.45)
- **Insurance** has its own markup (×1.104) and is added AFTER the margin

---

## Google Sheets Data Structure

### Settings Tab
Contains all configurable parameters:

| Parameter | Current Value | Description |
|-----------|---------------|-------------|
| `ULT_ACTUALIZACION` | 2025-07-28 | Last update date |
| `PR_X_DIA_ESPERA` | 30000 | Price per waiting day |
| `KM_X_LITRO` | 7.7 | Fuel efficiency (km per liter) |
| `LITRO_DIESEL` | 1600 | Price per liter of diesel (ARS) |
| `PR_X_KMS` | 950 | Price per kilometer |
| `CHOFER` | 150000 | Driver cost per 850km block |
| `ALOJAMIENTO` | 60000 | Accommodation cost per block |
| `PEAJES` | 20000 | Fixed toll costs |
| `COMIDAS` | 60000 | Meal cost per block |
| `AEREO` | 180000 | Air transport cost |
| `GARAGE_TRAILER` | 100000 | Garage/trailer storage cost |
| `PRECIO_DOLAR` | 1300 | Dollar exchange rate |
| `INSURANCE_RATE` | 0.0088 | Base insurance rate (0.88%) |
| `INSURANCE_MARKUP` | 0.104 | Insurance handling markup (10.4%) |
| `MARGIN_GENERAL` | 0.45 | **Business margin divisor** |

> **Important**: `MARGIN_GENERAL = 0.45` means final operational costs are `cost ÷ 0.45`, resulting in a **122% markup** (55% margin).

### Destinations Tab
Maps origin-destination pairs to distances:

| Origin | Destination | Kilometers |
|--------|-------------|------------|
| Buenos Aires | Bariloche | 3200 |
| Buenos Aires | Salta | 2900 |
| Buenos Aires | Cordoba | 1360 |
| Buenos Aires | Tucuman | 2460 |
| Buenos Aires | Jujuy | 2952 |
| Buenos Aires | Catamarca | 2220 |
| Buenos Aires | Mendoza | 2148 |
| Buenos Aires | Neuquen | 2270 |

### Vehicles Tab
Maps motorcycle categories to estimated values:

| Category | Estimated Price (ARS) |
|----------|----------------------|
| Motos +800cc | 41,600,000 |
| Motos 500-800cc | 20,150,000 |
| Motos 250-500cc | 9,100,000 |
| Motos -250cc | 5,200,000 |

---

## Calculation Logic & Formulas

### Step 1: Fuel Cost
```
liters_needed = total_kilometers ÷ KM_X_LITRO
fuel_cost = liters_needed × LITRO_DIESEL
```

**Formula**: `(km ÷ 7.7) × 1600`

### Step 2: Driver Cost (Block System)
Driver costs are calculated in 850km blocks, **always rounding up**:
```
total_blocks = CEILING(total_kilometers ÷ 850)
driver_cost = total_blocks × CHOFER
```

**Formula**: `CEILING(km ÷ 850) × 150000`

### Step 3: Accommodation Cost
Only charged for **additional blocks** (first block doesn't need accommodation):
```
IF waiting_days > 5:
    accommodation_cost = 0
ELSE:
    accommodation_cost = (total_blocks - 1) × ALOJAMIENTO
```

**Formula**: `MAX(0, (blocks - 1)) × 60000` (if waiting ≤ 5 days)

### Step 4: Waiting Days Logic
The system has **three different cost structures** based on waiting duration:

#### Scenario A: Standard Trip (≤ 4 days)
```
meal_cost = (total_blocks - 1) × COMIDAS
air_garage_cost = 0
```

#### Scenario B: Extended Wait (5 days)
```
meal_cost = (total_blocks - 1) × COMIDAS  
air_garage_cost = AEREO + GARAGE_TRAILER
```

#### Scenario C: Very Extended Wait (> 5 days)
```
meal_cost = 0  // Driver returns by air, no meals needed
accommodation_cost = 0  // No accommodation needed
air_garage_cost = AEREO + GARAGE_TRAILER
```

### Step 5: Total Direct Costs
```
total_direct_cost = fuel_cost + driver_cost + accommodation_cost + 
                   meal_cost + toll_cost + air_garage_cost
```

### Step 6: Apply Business Margin (CRITICAL)
**Only apply margin to direct costs**:
```
price_with_margin = total_direct_cost ÷ MARGIN_GENERAL
price_with_margin = total_direct_cost ÷ 0.45
```

### Step 7: Insurance Calculation (Separate)
Insurance is calculated **independently** with its own markup:
```
FOR EACH motorcycle:
    vehicle_value = EstimatedPrice × quantity
    gross_insurance = vehicle_value × INSURANCE_RATE
    insurance_with_markup = gross_insurance × (1 + INSURANCE_MARKUP)
```

**Formula**: `(vehicle_price × quantity × 0.0088) × 1.104`

### Step 8: Final Price
```
final_price = price_with_margin + insurance_with_markup
```

---

## Step-by-Step Examples

### Example 1: Standard Trip - Buenos Aires to Cordoba
**Parameters:**
- Distance: 1,360 km
- Vehicle: 1 × Moto 500-800cc (ARS 20,150,000)
- Waiting days: 3

#### Calculations:

**1. Fuel Cost**
```
Liters needed: 1360 ÷ 7.7 = 176.62 liters
Fuel cost: 176.62 × 1600 = ARS 282,597
```

**2. Driver Cost**
```
Blocks: CEILING(1360 ÷ 850) = 2 blocks
Driver cost: 2 × 150,000 = ARS 300,000
```

**3. Accommodation Cost**
```
Waiting days: 3 (≤ 5, so accommodation applies)
Accommodation: (2 - 1) × 60,000 = ARS 60,000
```

**4. Meal Cost**
```
Waiting days: 3 (≤ 4, so meals apply)
Meal cost: (2 - 1) × 60,000 = ARS 60,000
```

**5. Fixed Costs**
```
Tolls: ARS 20,000
Air/Garage: ARS 0 (waiting ≤ 4 days)
```

**6. Total Direct Costs**
```
Total: 282,597 + 300,000 + 60,000 + 60,000 + 20,000 = ARS 722,597
```

**7. Apply Business Margin**
```
Price with margin: 722,597 ÷ 0.45 = ARS 1,605,771
```

**8. Insurance (Separate Calculation)**
```
Vehicle value: 20,150,000 × 1 = ARS 20,150,000
Gross insurance: 20,150,000 × 0.0088 = ARS 177,320
Insurance with markup: 177,320 × 1.104 = ARS 195,761
```

**9. Final Price**
```
Final price: 1,605,771 + 195,761 = ARS 1,801,532
```

### Example 2: Long Distance with Extended Wait - Buenos Aires to Bariloche
**Parameters:**
- Distance: 3,200 km  
- Vehicle: 1 × Moto +800cc (ARS 41,600,000)
- Waiting days: 6 (triggers air transport)

#### Calculations:

**1. Fuel Cost**
```
Liters: 3200 ÷ 7.7 = 415.58 liters
Fuel cost: 415.58 × 1600 = ARS 665,328
```

**2. Driver Cost**
```
Blocks: CEILING(3200 ÷ 850) = 4 blocks
Driver cost: 4 × 150,000 = ARS 600,000
```

**3. Accommodation Cost**
```
Waiting days: 6 (> 5, so NO accommodation)
Accommodation: ARS 0
```

**4. Meal Cost**
```
Waiting days: 6 (> 5, so NO meals - driver returns by air)
Meal cost: ARS 0
```

**5. Air/Garage Costs**
```
Waiting days: 6 (> 4, so air transport applies)
Air/Garage: 180,000 + 100,000 = ARS 280,000
```

**6. Fixed Costs**
```
Tolls: ARS 20,000
```

**7. Total Direct Costs**
```
Total: 665,328 + 600,000 + 0 + 0 + 20,000 + 280,000 = ARS 1,565,328
```

**8. Apply Business Margin**
```
Price with margin: 1,565,328 ÷ 0.45 = ARS 3,478,507
```

**9. Insurance (Separate)**
```
Vehicle value: 41,600,000 × 1 = ARS 41,600,000
Gross insurance: 41,600,000 × 0.0088 = ARS 366,080
Insurance with markup: 366,080 × 1.104 = ARS 404,152
```

**10. Final Price**
```
Final price: 3,478,507 + 404,152 = ARS 3,882,659
```

### Example 3: Multiple Motorcycles - Buenos Aires to Mendoza
**Parameters:**
- Distance: 2,148 km
- Vehicles: 3 × Moto 250-500cc (ARS 9,100,000 each)
- Waiting days: 2

#### Calculations:

**1. Fuel Cost**
```
Liters: 2148 ÷ 7.7 = 279.22 liters
Fuel cost: 279.22 × 1600 = ARS 446,753
```

**2. Driver Cost**
```
Blocks: CEILING(2148 ÷ 850) = 3 blocks
Driver cost: 3 × 150,000 = ARS 450,000
```

**3. Accommodation Cost**
```
Waiting days: 2 (≤ 5, so accommodation applies)
Accommodation: (3 - 1) × 60,000 = ARS 120,000
```

**4. Meal Cost**
```
Waiting days: 2 (≤ 4, so meals apply)  
Meal cost: (3 - 1) × 60,000 = ARS 120,000
```

**5. Fixed Costs**
```
Tolls: ARS 20,000
Air/Garage: ARS 0
```

**6. Total Direct Costs**
```
Total: 446,753 + 450,000 + 120,000 + 120,000 + 20,000 = ARS 1,156,753
```

**7. Apply Business Margin**
```
Price with margin: 1,156,753 ÷ 0.45 = ARS 2,570,562
```

**8. Insurance (Multiple Vehicles)**
```
Total vehicle value: 9,100,000 × 3 = ARS 27,300,000
Gross insurance: 27,300,000 × 0.0088 = ARS 240,240
Insurance with markup: 240,240 × 1.104 = ARS 265,225
```

**9. Final Price**
```
Final price: 2,570,562 + 265,225 = ARS 2,835,787
```

---

## Implementation Guide

### QuoteCalculator.tsx Modifications

The component has been updated with:

1. **New Input Fields:**
   - Waiting days selector (1-10 days)
   - Quantity selector (1-5 motorcycles)
   - Vehicle categories from Google Sheets

2. **Improved UI:**
   - Collapsible cost breakdown ("Ver desglose" button)
   - Clean summary display with key details
   - Maintains existing design system

3. **Real-time Calculation:**
   - Uses `QuoteCalculatorService` for accurate pricing
   - Fetches live data from Google Sheets
   - Shows detailed cost components on demand

### Key Code Structure:

```typescript
// Service instantiation
const calculator = new QuoteCalculatorService(settings, routes, vehicles)

// Calculation call
const quote = calculator.calculateQuote(origin, destination, vehicleType, quantity, waitingDays)

// Result structure
interface QuoteCalculation {
  fuelCost: number;
  driverCost: number;
  accommodationCost: number;
  mealCost: number;
  tollCost: number;
  airGarageCost: number;
  totalDirectCost: number;
  priceWithMargin: number;    // Direct costs after margin
  insuranceCost: number;       // Insurance with markup
  finalPrice: number;          // Final total
  totalBlocks: number;
  totalKm: number;
}
```

---

## Testing Scenarios

### Scenario 1: Short Route, Standard Wait
- **Route:** Buenos Aires → Cordoba (1,360 km)
- **Vehicle:** 1 × Moto -250cc
- **Wait:** 3 days
- **Expected:** Low cost, standard pricing structure

### Scenario 2: Long Route, Extended Wait
- **Route:** Buenos Aires → Bariloche (3,200 km) 
- **Vehicle:** 1 × Moto +800cc
- **Wait:** 7 days
- **Expected:** High cost, air transport charges, no accommodation/meals

### Scenario 3: Multiple Vehicles
- **Route:** Buenos Aires → Salta (2,900 km)
- **Vehicles:** 2 × Moto 500-800cc
- **Wait:** 4 days
- **Expected:** Double insurance, standard operational costs

### Scenario 4: Boundary Testing
- **Wait Days:** Test 4, 5, and 6 days to verify logic changes
- **Distance:** Test routes near 850km multiples (840km, 850km, 860km)
- **Vehicles:** Test different categories for insurance scaling

---

## Key Business Rules Summary

1. **Driver Blocks:** Always round UP (849km = 1 block, 851km = 2 blocks)
2. **Accommodation:** Only for additional blocks, only if waiting ≤ 5 days
3. **Meals:** Only if waiting ≤ 5 days (driver stays for trip)
4. **Air Transport:** Triggered when waiting > 4 days
5. **Insurance Separation:** Insurance markup is separate from operational margin
6. **Margin Application:** 55% margin on operational costs only (÷ 0.45)

This system ensures **transparent, accurate pricing** while maintaining **competitive insurance rates** and **appropriate business margins**.
export interface TCar {
  isOffer: any;
  batteryCapacity: number;
  bodyType: string;
  brand: string;
  color: string[];
  condition: "New" | "Used" | "Certified Pre-Owned"; // Assuming common conditions
  createdAt: string; // ISO date string
  currency: string;
  description: string;
  doors: number;
  drivetrain: string;
  engine: {
    fuelEconomy: Record<string, unknown>; // Structure not fully shown
    size: string;
    cylinders: number;
    horsepower: number;
    torque: number;
  };
  features: {
    interior: string[];
    exterior: string[];
    safety: string[];
    infotainment: string[];
  };
  fuelType: string;
  generation: string;
  id: string;
  image: string[];
  inStock: boolean;
  leaseOptions: {
    monthlyPayment: number;
    term: number;
    downPayment: number;
  };
  mileage: number;
  model: string;
  offerDateAndTime: string;
  originalPrice: number;
  price: number;
  quantity: number;
  range: number;
  rating: number;
  reviewCount: number;
  seatingCapacity: number;
  stockNumber: string;
  transmission: string;
  trim: string;
  updatedAt: string; // ISO date string
  vin: string;
  warranty: {
    type: string;
    months: number;
    miles: number;
  };
  year: number;
  _id: string;
}

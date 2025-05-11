/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TAddress {
  street: string;
  street2: string;
  city: string;
  state: string;
  district: string;
  // Add any other address fields that might exist
}

export interface TOperatingHours {
  open: string;
  close: string;
  daysOpen: string[];
}

export interface TSocialMediaLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
}

export interface TShopOwner {
  _id: string;
  authorShopId?: string;
  address: TAddress;
  birthDate: string;
  createdAt: string;
  email: string;
  firstName: string;
  isActive: boolean;
  isShop: boolean;
  lastName: string;
  password: string;
  phoneNumber: string;
  profileImage: string;
  role: string;
  updatedAt: string;
  __v: number;
}

export interface TShop {
  businessHours: any;
  email: string;
  address: any;
  _id: string;
  carBrands: string[];
  certifications: string[];
  customerServiceContact: string;
  description: string;
  establishedYear: string;
  isActive: boolean;
  operatingHours: TOperatingHours;
  ownerName: string;
  paymentMethods: string[];
  phoneNumber: string;
  serviceAreas: string[];
  servicesOffered: string[];
  shopAddress: string;
  shopFeatures: string[];
  shopLogo: string;
  shopName: string;
  socialMediaLinks: TSocialMediaLinks;
  warrantyOffered: boolean;
  website: string;
  __v: number;
  // If the owner details are embedded
  authorShopId?: TShopOwner;
}

// If the shop and owner are separate but related:
export interface TShopWithOwner extends TShop {
  authorShopId: TShopOwner;
}

// Example usage:
// const myShop: ShopWithOwner = {...};

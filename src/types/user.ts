interface Address {
  street: string;
  street2?: string; // Optional field
  city: string;
  state: string;
  district: string;
  subdistrict?: string;
  village?: string;
  union?: string;
  postalCode?: string;
  country?: string;
}

export interface TUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "user" | "admin";
  isActive: boolean;
  birthDate: string; // or Date if you transform it
  profileImage?: string;
  address: Address;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  __v: number;
}

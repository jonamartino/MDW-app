interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface Organization {
  _id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: Address;
  website: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface Activity {
  _id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  capacity: number;
  organization: Address;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isActive: boolean;
  isFull: boolean;
}
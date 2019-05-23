export interface CustomerI {
  name: string;
  city: string;
  order: string;
}

export interface CustomerId extends CustomerI {
  id: string;
}

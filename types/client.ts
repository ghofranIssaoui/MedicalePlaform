//! inetrface client 
export interface ClientType  {
    name: string;
    email: string;
    password: string;
    phone?: string;
    age?: number;
    gender?: string;
    location?: string;
    createdAt: Date;
  }
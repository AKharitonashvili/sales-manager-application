import { Product } from '../products/products.model';

export interface SalesManager {
  username: string | null;
  name: string | null;
  surname: string | null;
  registrationDate: string | null;
  totalSalesRevenue: number | null;
  id: string | null;
  products?: Product[];
}

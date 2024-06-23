interface ProductSkeleton {
  name?: string | null;
  price?: number | null;
  category?: string | null;
}

export interface Product extends ProductSkeleton {
  quantity?: number | null;
  id?: string | null;
  description?: string | null;
  saleDate?: string | null;
}

export interface ProductForm {
  quantity: number | null;
  description: string | null;
  name: string | null;
  price: number | null;
  category: string | null;
}

export interface SoldProduct extends ProductSkeleton {
  id?: string | null;
  saleDate?: string | null;
}

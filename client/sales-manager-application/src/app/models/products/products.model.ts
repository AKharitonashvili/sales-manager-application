export interface Product {
  name?: string | null;
  price?: number | null;
  quantity?: number | null;
  id?: string | null;
  image?: string | null;
  category?: string | null;
}

export interface ProductForm {
  name: string | null;
  price: number | null;
  quantity: number | null;
  category: string | null;
}

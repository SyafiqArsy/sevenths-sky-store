export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  category_id: number;

  name: string;
  slug: string;
  description: string;

  sku: string;

  price: string;
  stock: number;

  image: string;
  image_public_id?: string | null;

  is_active: boolean;

  category: Category;
}
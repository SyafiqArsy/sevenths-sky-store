const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts() {
  const response = await fetch(
    `${API_URL}/products`,
    {
      cache: "no-store",
    }
  );

  const result = await response.json();

  return result.data;
}

export async function getCategories() {
  const response = await fetch(
    `${API_URL}/categories`,
    {
      cache: "no-store",
    }
  );

  const result = await response.json();

  return result.data;
}

export async function getLatestProducts(limit: number = 3) {
  const response = await fetch(
    `${API_URL}/products`,
    {
      cache: "no-store",
    }
  );

  const result = await response.json();

  return result.data.slice(0, limit);
}

export async function getProduct(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
    {
      cache: "no-store",
    }
  );

  const result = await response.json();

  return result.data;
}
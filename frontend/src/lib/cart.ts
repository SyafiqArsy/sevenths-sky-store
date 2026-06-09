const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function addToCart(
  token: string,
  productId: number,
  quantity: number
) {
  const response = await fetch(
    `${API_URL}/cart/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: productId,
        quantity,
      }),
    }
  );

  return response.json();
}

export async function getCart(
  token: string
) {
  const response = await fetch(
    `${API_URL}/cart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return response.json();
}

export async function updateCartItem(
  token: string,
  itemId: number,
  quantity: number
) {
  const response = await fetch(
    `${API_URL}/cart/items/${itemId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity,
      }),
    }
  );

  return response.json();
}

export async function removeCartItem(
  token: string,
  itemId: number
) {
  const response = await fetch(
    `${API_URL}/cart/items/${itemId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}
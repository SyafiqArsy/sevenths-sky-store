const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getOrders(
  token: string
) {
  const response = await fetch(
    `${API_URL}/orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}

export async function getOrder(
  token: string,
  id: number
) {
  const response = await fetch(
    `${API_URL}/orders/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}
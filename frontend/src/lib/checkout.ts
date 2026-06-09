const API_URL = process.env.NEXT_PUBLIC_API_URL;

type CheckoutPayload = {
  recipient_name: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
};

export async function checkout(
  token: string,
  payload: CheckoutPayload
) {
  const response = await fetch(
    `${API_URL}/checkout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  return response.json();
}
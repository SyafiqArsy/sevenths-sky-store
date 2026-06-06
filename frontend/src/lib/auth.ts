const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(
  email: string,
  password: string
) {
  const response = await fetch(
    `${API_URL}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  return response.json();
}

export async function register(
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) {
  const response = await fetch(
    `${API_URL}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation,
      }),
    }
  );

  return response.json();
}

export async function getMe(token: string) {
  const response = await fetch(
    `${API_URL}/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return response.json();
}

export async function logout(token: string) {
  const response = await fetch(
    `${API_URL}/logout`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}
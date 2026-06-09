const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export async function getAdminOrders(
  token: string,
  search = ""
) {
  const response = await fetch(
    `${API_URL}/admin/orders?search=${search}`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return response.json();
}

export async function getAdminProducts(
  token: string,
  search = ""
) {
  const response = await fetch(
    `${API_URL}/admin/products?search=${search}`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return response.json();
}

export async function deleteProduct(
  token: string,
  id: number
) {
  const response = await fetch(
    `${API_URL}/admin/products/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.json();
}

export async function getAdminCategories(
  token: string,
  search = ""
) {
  const response = await fetch(
    `${API_URL}/admin/categories?search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return response.json();
}

export async function updateOrderStatus(
  token: string,
  orderId: number,
  orderStatus: string
) {
  const response = await fetch(
    `${API_URL}/admin/orders/${orderId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        order_status: orderStatus,
      }),
    }
  );

  return response.json();
}

export async function createProduct(
  token: string,
  formData: FormData
) {
  const response = await fetch(
    `${API_URL}/admin/products`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  return response.json();
}

export async function getAdminProduct(
  token: string,
  id: number
) {
  const response = await fetch(
    `${API_URL}/admin/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return response.json();
}

export async function updateProduct(
  token: string,
  id: number,
  formData: FormData
) {
  const response = await fetch(
    `${API_URL}/admin/products/${id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  return response.json();
}

export async function createCategory(
  token: string,
  data: {
    name: string;
  }
) {
  const response = await fetch(
    `${API_URL}/admin/categories`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
        Authorization:
          `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
}

export async function updateCategory(
  token: string,
  id: number,
  data: {
    name: string;
  }
) {
  const response = await fetch(
    `${API_URL}/admin/categories/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
        Authorization:
          `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
}

export async function deleteCategory(
  token: string,
  id: number
) {
  const response = await fetch(
    `${API_URL}/admin/categories/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  return response.json();
}

export async function getCategoryById(
  token: string,
  id: number
) {
  const response = await fetch(
    `${API_URL}/admin/categories`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const result =
    await response.json();

  return result.data.find(
    (category: { id: number }) =>
      category.id === id
  );
}

export async function getDashboardStats(
  token: string
) {
  const response = await fetch(
    `${API_URL}/admin/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  return response.json();
}
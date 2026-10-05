const LOCAL_API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const FALLBACK_API = "https://dummyjson.com";
const API_URL = `${LOCAL_API}/products`;

// Ask one server for data. Throws if the server is off or answers with an error.
async function request(url) {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

// DummyJSON sends { products: [...] }, json-server sends a plain array
function toList(data) {
  return Array.isArray(data) ? data : data.products;
}

// Try your own server first. If it is off, use DummyJSON.
export async function getProducts() {
  try {
    const data = await request(API_URL);
    return toList(data);
  } catch (error) {
    const data = await request(`${FALLBACK_API}/products?limit=0`);
    return toList(data);
  }
}

export async function getProductById(id) {
  try {
    return await request(`${API_URL}/${id}`);
  } catch (error) {
    return await request(`${FALLBACK_API}/products/${id}`);
  }
}

export async function addProduct(product) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  return response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return response.json();
}

export async function updateProduct(id, product) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
}
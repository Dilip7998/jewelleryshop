import type { EnquiryInput, Product, ProductInput } from "./types";
import type { Offer } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type RequestOptions = RequestInit & {
  token?: string | null;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;
  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Request failed with ${response.status}`);
  }

  return response.json();
}

export async function loginAdmin(email: string, password: string) {
  return request<{ token: string; admin: { email: string; name: string } }>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password })
    }
  );
}

export async function fetchProducts() {
  return request<Product[]>("/products");
}

export async function createProduct(product: ProductInput, token: string) {
  return request<Product>("/products", {
    method: "POST",
    token,
    body: JSON.stringify(product)
  });
}

export async function updateProduct(
  id: string,
  product: ProductInput,
  token: string
) {
  return request<Product>(`/products/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(product)
  });
}

export async function deleteProduct(id: string, token: string) {
  return request<{ success: boolean }>(`/products/${id}`, {
    method: "DELETE",
    token
  });
}

export async function fetchCategories() {
  return request<string[]>("/categories");
}

export async function fetchOffers() {
  return request<Offer[]>("/offers");
}

export async function createOffer(offer: Omit<Offer, "id" | "_id">, token: string) {
  return request<Offer>("/offers", {
    method: "POST",
    token,
    body: JSON.stringify(offer)
  });
}

export async function deleteOffer(id: string, token: string) {
  return request<{ success: boolean }>(`/offers/${id}`, {
    method: "DELETE",
    token
  });
}

export async function createCategory(name: string, token: string) {
  return request<{ name: string }>("/categories", {
    method: "POST",
    token,
    body: JSON.stringify({ name })
  });
}

export async function deleteCategory(name: string, token: string) {
  return request<{ success: boolean }>(`/categories/${encodeURIComponent(name)}`, {
    method: "DELETE",
    token
  });
}

export async function submitEnquiry(input: EnquiryInput) {
  return request<{ success: boolean }>("/enquiries", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export async function fetchEnquiries(token: string) {
  return request<Array<EnquiryInput & { _id: string; createdAt: string }>>(
    "/enquiries",
    { token }
  );
}

export async function deleteEnquiry(id: string, token: string) {
  return request<{ success: boolean }>(`/enquiries/${id}`, {
    method: "DELETE",
    token
  });
}

export async function subscribeNewsletter(email: string) {
  return request<{ success: boolean }>("/newsletter", {
    method: "POST",
    body: JSON.stringify({ email })
  });
}

export async function uploadImages(files: File[], token: string) {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const response = await fetch(`${API_URL}/uploads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Image upload failed");
  }

  return response.json() as Promise<{
    images: Array<{ url: string; name: string }>;
    urls: string[];
  }>;
}

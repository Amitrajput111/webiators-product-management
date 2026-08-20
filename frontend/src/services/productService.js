import { API_BASE_URL } from '../config/api';

const API_URL = `${API_BASE_URL}/api/products`;

export async function getProducts(params = {}) {
  const query = new URLSearchParams();

  if (params.search) {
    query.append('search', params.search);
  }

  if (params.category) {
    query.append('category', params.category);
  }

  const queryString = query.toString();

  const response = await fetch(
    `${API_URL}${queryString ? `?${queryString}` : ''}`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Unable to fetch products');
  }

  return data;
}

export async function getProduct(id) {
  const response = await fetch(`${API_URL}/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Unable to fetch product');
  }

  return data;
}
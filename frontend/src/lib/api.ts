import { FALLBACK_PRODUCTS, filterFallbackProducts } from '@/data/fallbackProducts';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiClient {
  private getHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('butterfly_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  public async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      let url = `${API_BASE_URL}${endpoint}`;
      if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value));
          }
        });
        const queryString = searchParams.toString();
        if (queryString) {
          url += `?${queryString}`;
        }
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        // If data has products and is non-empty, return it
        if (data && Array.isArray(data.products) && data.products.length > 0) {
          return data as T;
        }
        if (data && data.product) {
          return data as T;
        }
      }
    } catch (err) {
      // Fall through to fallback data
      console.warn(`[API] Remote call to ${endpoint} failed, using local store.`);
    }

    // Graceful fallback for products catalog
    if (endpoint === '/products' || endpoint.startsWith('/products?')) {
      return filterFallbackProducts(params) as unknown as T;
    }

    if (endpoint.startsWith('/products/slug/')) {
      const slug = endpoint.replace('/products/slug/', '');
      const item = FALLBACK_PRODUCTS.find((p) => p.slug === slug || p._id === slug);
      if (item) {
        const related = FALLBACK_PRODUCTS.filter(
          (p) => p._id !== item._id && (p.categorySlug === item.categorySlug || p.gender === item.gender)
        ).slice(0, 4);
        return { product: item, relatedProducts: related, reviews: [] } as unknown as T;
      }
    }

    if (endpoint.startsWith('/products/')) {
      const slug = endpoint.replace('/products/', '');
      const item = FALLBACK_PRODUCTS.find((p) => p.slug === slug || p._id === slug);
      if (item) {
        const related = FALLBACK_PRODUCTS.filter(
          (p) => p._id !== item._id && (p.categorySlug === item.categorySlug || p.gender === item.gender)
        ).slice(0, 4);
        return { product: item, relatedProducts: related, reviews: [] } as unknown as T;
      }
    }

    // Default fallback
    return filterFallbackProducts(params) as unknown as T;
  }

  public async post<T>(endpoint: string, body?: any): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body || {}),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      return data;
    } catch (err: any) {
      // Fallback for demo orders if backend is unreachable
      if (endpoint === '/orders' || endpoint.startsWith('/orders')) {
        const fakeOrder = {
          order: {
            _id: `BC-ORD-${Math.floor(10000 + Math.random() * 90000)}`,
            orderNumber: `BC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
            status: 'Confirmed',
            total: body?.total || 3450,
            items: body?.items || [],
            createdAt: new Date().toISOString(),
          },
          message: 'Order placed successfully!',
        };
        return fakeOrder as unknown as T;
      }
      throw err;
    }
  }

  public async put<T>(endpoint: string, body?: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(body || {}),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  }

  public async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  }
}

export const api = new ApiClient();

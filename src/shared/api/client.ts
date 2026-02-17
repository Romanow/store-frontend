import { DetailedOrderResponse, ItemInfo, OrderResponse, WarrantyResponse } from './types';
import { buildGatewayUrl } from '../config';
import { getAccessToken } from '../lib/auth';

const buildAuthorizationHeader = (): string | null => {
  const token = getAccessToken();
  if (!token) {
    return null;
  }

  return `Bearer ${token}`;
};

const withAuthHeader = () => {
  const authorization = buildAuthorizationHeader();
  if (!authorization) {
    return {};
  }

  return { Authorization: authorization };
};

const fetchJson = async <T>(
  url: string,
  init?: RequestInit,
  options?: {
    authRequired?: boolean;
  }
): Promise<T> => {
  const { authRequired = false } = options ?? {};
  const headers = new Headers(init?.headers);
  headers.set('Content-Type', 'application/json');

  if (authRequired) {
    const authHeaders = withAuthHeader();
    if (authHeaders.Authorization) {
      headers.set('Authorization', authHeaders.Authorization);
    }
  }

  const response = await fetch(buildGatewayUrl(url), {
    credentials: 'include',
    ...init,
    headers
  });

  if (!response.ok) {
    let message = 'Unexpected request error';
    try {
      const payload = (await response.json()) as { message?: string };
      if (payload.message) {
        message = payload.message;
      }
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  if (response.status === 204 || response.status === 202 || response.status === 201) {
    return undefined as T;
  }

  const contentLength = response.headers.get('content-length');
  const contentType = response.headers.get('content-type');
  if (contentLength === '0' || !contentType?.includes('application/json')) {
    return undefined as T;
  }

  return (await response.json()) as T;
};

export const apiClient = {
  getItems: () => fetchJson<ItemInfo[]>('/warehouse/api/public/v1/items'),
  createOrder: (items: string[]) =>
    fetchJson<void>(
      '/store/api/protected/v1/orders/purchase',
      {
        method: 'POST',
        body: JSON.stringify(items)
      },
      { authRequired: true }
    ),
  cancelOrder: (orderUid: string) =>
    fetchJson<void>(
      `/store/api/protected/v1/orders/${orderUid}/cancel`,
      {
        method: 'DELETE'
      },
      { authRequired: true }
    ),
  requestWarranty: (orderUid: string, itemNames: string[]) =>
    fetchJson<WarrantyResponse[]>(
      `/store/api/protected/v1/orders/${orderUid}/warranty`,
      {
        method: 'POST',
        body: JSON.stringify(itemNames)
      },
      { authRequired: true }
    ),
  getOrders: () => fetchJson<OrderResponse[]>('/store/api/protected/v1/orders', undefined, { authRequired: true }),
  getOrderDetails: (orderUid: string) =>
    fetchJson<DetailedOrderResponse>(`/store/api/protected/v1/orders/${orderUid}`, undefined, { authRequired: true })
};

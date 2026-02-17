import { ItemInfo } from '../api/types';

const CART_STORAGE_KEY = 'store_frontend_cart_items';

export const loadCartItems = (): ItemInfo[] => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as ItemInfo[];
  } catch {
    return [];
  }
};

export const saveCartItems = (items: ItemInfo[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore storage write errors
  }
};

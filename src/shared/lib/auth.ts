import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { JwtClaims } from '../api/types';

const LOCAL_STORAGE_KEYS = ['access_token', 'token'];
const COOKIE_KEYS = ['ACCESS_TOKEN', 'access_token', 'token', 'Authorization', 'authorization'];

const normalizeToken = (value: string): string => {
  const trimmed = value.trim();
  if (trimmed.toLowerCase().startsWith('bearer ')) {
    return trimmed.slice(7).trim();
  }
  return trimmed;
};

export const getAccessToken = (): string | null => {
  for (const key of LOCAL_STORAGE_KEYS) {
    const fromStorage = localStorage.getItem(key);
    if (fromStorage) {
      return normalizeToken(fromStorage);
    }
  }

  for (const key of COOKIE_KEYS) {
    const fromCookie = Cookies.get(key);
    if (fromCookie) {
      return normalizeToken(fromCookie);
    }
  }

  return null;
};

export const readUserFromJwt = (): JwtClaims | null => {
  const token = getAccessToken();
  if (!token) {
    return null;
  }

  try {
    const claims = jwtDecode<JwtClaims>(token);
    const resolvedName = claims.name ?? claims.preferred_username ?? claims.sub;
    return {
      ...claims,
      name: resolvedName
    };
  } catch {
    return null;
  }
};

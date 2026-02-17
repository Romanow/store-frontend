export const buildGatewayUrl = (path: string): string => {
  const normalizedBase = (import.meta.env.VITE_GATEWAY_URL as string).replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

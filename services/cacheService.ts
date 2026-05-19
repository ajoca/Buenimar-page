type CacheEntry<T> = {
  data: T;
  cachedAt: number;
  ttlMs: number;
};

const cacheStore = new Map<string, CacheEntry<unknown>>();

export const cacheProfiles = {
  dashboard: 5 * 60 * 1000,
  alerts: 1 * 60 * 1000,
  heavyReports: 0,
};

export function getCachedValue<T>(key: string): T | null {
  const entry = cacheStore.get(key);
  if (!entry) {
    return null;
  }

  if (entry.ttlMs > 0 && Date.now() - entry.cachedAt > entry.ttlMs) {
    cacheStore.delete(key);
    return null;
  }

  return entry.data as T;
}

export function setCachedValue<T>(key: string, data: T, ttlMs: number) {
  cacheStore.set(key, {
    data,
    ttlMs,
    cachedAt: Date.now(),
  });
}

export function clearCacheKey(key: string) {
  cacheStore.delete(key);
}

// TODO: Reemplazar este cache in-memory por Redis o almacenamiento distribuido en produccion.

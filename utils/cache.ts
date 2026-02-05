/**
 * In-Memory Cache Implementation
 * Provides city-specific caching with TTL (Time To Live)
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class SimpleCache<T> {
  private cache: CacheEntry<T> | null = null;
  private ttl: number;

  constructor(ttlMinutes: number = 10) {
    this.ttl = ttlMinutes * 60 * 1000; // Convert minutes to milliseconds
  }

  /**
   * Store data in cache
   */
  set(data: T): void {
    this.cache = {
      data,
      timestamp: Date.now(),
      ttl: this.ttl,
    };
  }

  /**
   * Get data from cache if valid
   */
  get(): T | null {
    if (!this.cache) {
      return null;
    }

    const age = Date.now() - this.cache.timestamp;
    if (age > this.cache.ttl) {
      // Cache expired, but return data anyway (stale data is better than no data)
      return this.cache.data;
    }

    return this.cache.data;
  }

  /**
   * Check if cache is valid (not expired)
   */
  isValid(): boolean {
    if (!this.cache) {
      return false;
    }

    const age = Date.now() - this.cache.timestamp;
    return age <= this.cache.ttl;
  }

  /**
   * Clear cache
   */
  clear(): void {
    this.cache = null;
  }

  /**
   * Get cache age in seconds
   */
  getAge(): number {
    if (!this.cache) {
      return Infinity;
    }
    return Math.floor((Date.now() - this.cache.timestamp) / 1000);
  }
}

// City-specific cache storage
const cityCaches = new Map<string, SimpleCache<unknown>>();

/**
 * Get or create cache for a specific city
 */
export function getCityCache<T>(city: string): SimpleCache<T> {
  if (!cityCaches.has(city)) {
    cityCaches.set(city, new SimpleCache<T>(10)); // 10 minutes TTL
  }
  // Type assertion is safe here as we control the cache creation
  return cityCaches.get(city) as SimpleCache<T>;
}

/**
 * Clear cache for a specific city
 */
export function clearCityCache(city: string): void {
  cityCaches.delete(city);
}

/**
 * Clear all caches
 */
export function clearAllCaches(): void {
  cityCaches.clear();
}

export default SimpleCache;

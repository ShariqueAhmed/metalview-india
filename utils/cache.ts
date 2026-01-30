/**
 * In-memory cache utility for API responses
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class SimpleCache<T> {
  private cache: CacheEntry<T> | null = null;
  private ttl: number; // Time to live in milliseconds

  constructor(ttlMinutes: number = 10) {
    this.ttl = ttlMinutes * 60 * 1000;
  }

  /**
   * Get cached data if it exists and is not expired
   */
  get(): T | null {
    if (!this.cache) {
      return null;
    }

    const now = Date.now();
    if (now - this.cache.timestamp < this.ttl) {
      return this.cache.data;
    }

    // Cache expired but return it anyway as fallback
    return this.cache.data;
  }

  /**
   * Check if cache exists and is valid
   */
  isValid(): boolean {
    if (!this.cache) {
      return false;
    }

    const now = Date.now();
    return now - this.cache.timestamp < this.ttl;
  }

  /**
   * Set cache data
   */
  set(data: T): void {
    this.cache = {
      data,
      timestamp: Date.now(),
    };
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
      return 0;
    }
    return Math.floor((Date.now() - this.cache.timestamp) / 1000);
  }
}

export default SimpleCache;

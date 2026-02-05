/**
 * Centralized Error Handling Utilities
 * Provides retry logic, circuit breakers, and error types
 */

export enum ErrorSource {
  GROWW = 'groww',
  ANGELONE = 'angelone',
  MONEYCONTROL = 'moneycontrol',
  EBULLION = 'ebullion',
  CACHE = 'cache',
  UNKNOWN = 'unknown',
}

export class MetalPriceError extends Error {
  constructor(
    message: string,
    public source: ErrorSource,
    public statusCode?: number,
    public retryable: boolean = true,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'MetalPriceError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Circuit Breaker State
 */
enum CircuitState {
  CLOSED = 'closed', // Normal operation
  OPEN = 'open', // Failing, reject requests immediately
  HALF_OPEN = 'half_open', // Testing if service recovered
}

interface CircuitBreakerOptions {
  failureThreshold: number; // Number of failures before opening
  resetTimeout: number; // Time in ms before attempting to close
  monitoringPeriod: number; // Time window for tracking failures
}

/**
 * Circuit Breaker Implementation
 * Prevents cascading failures by stopping requests to failing services
 */
class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failures: number = 0;
  private lastFailureTime: number = 0;
  private successCount: number = 0;
  private readonly options: CircuitBreakerOptions;

  constructor(options: Partial<CircuitBreakerOptions> = {}) {
    this.options = {
      failureThreshold: options.failureThreshold ?? 5,
      resetTimeout: options.resetTimeout ?? 60000, // 1 minute
      monitoringPeriod: options.monitoringPeriod ?? 60000, // 1 minute
    };
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - this.lastFailureTime > this.options.resetTimeout) {
        this.state = CircuitState.HALF_OPEN;
        this.successCount = 0;
      } else {
        throw new MetalPriceError(
          'Circuit breaker is OPEN - service unavailable',
          ErrorSource.UNKNOWN,
          503,
          false
        );
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    if (this.state === CircuitState.HALF_OPEN) {
      this.successCount++;
      if (this.successCount >= 2) {
        this.state = CircuitState.CLOSED;
        this.successCount = 0;
      }
    }
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.failures >= this.options.failureThreshold) {
      this.state = CircuitState.OPEN;
    }
  }

  getState(): CircuitState {
    return this.state;
  }

  reset(): void {
    this.state = CircuitState.CLOSED;
    this.failures = 0;
    this.successCount = 0;
    this.lastFailureTime = 0;
  }
}

// Circuit breakers per API source
const circuitBreakers = new Map<ErrorSource, CircuitBreaker>();

function getCircuitBreaker(source: ErrorSource): CircuitBreaker {
  if (!circuitBreakers.has(source)) {
    circuitBreakers.set(source, new CircuitBreaker());
  }
  return circuitBreakers.get(source)!;
}

/**
 * Retry configuration
 */
interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  retryable?: (error: unknown) => boolean;
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  retryable: (error) => {
    if (error instanceof MetalPriceError) {
      return error.retryable;
    }
    return true;
  },
};

/**
 * Fetch with retry logic and exponential backoff
 */
export async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
  source: ErrorSource = ErrorSource.UNKNOWN
): Promise<T> {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...options };
  const circuitBreaker = getCircuitBreaker(source);

  let lastError: unknown;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      return await circuitBreaker.execute(fn);
    } catch (error) {
      lastError = error;

      // Don't retry if error is not retryable
      if (!config.retryable(error)) {
        throw error;
      }

      // Don't retry on last attempt
      if (attempt === config.maxRetries) {
        break;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        config.initialDelay * Math.pow(config.backoffMultiplier, attempt),
        config.maxDelay
      );

      // Add jitter to prevent thundering herd
      const jitter = Math.random() * 0.3 * delay;
      await new Promise((resolve) => setTimeout(resolve, delay + jitter));
    }
  }

  // Wrap error if not already a MetalPriceError
  if (lastError instanceof MetalPriceError) {
    throw lastError;
  }

  throw new MetalPriceError(
    `Failed after ${config.maxRetries} retries: ${lastError instanceof Error ? lastError.message : 'Unknown error'}`,
    source,
    undefined,
    false,
    lastError instanceof Error ? lastError : undefined
  );
}

/**
 * Request deduplication
 * Prevents duplicate concurrent requests
 */
const pendingRequests = new Map<string, Promise<unknown>>();

export async function fetchWithDedup<T>(
  key: string,
  fn: () => Promise<T>,
  ttl: number = 5000
): Promise<T> {
  const existingRequest = pendingRequests.get(key);
  if (existingRequest) {
    return existingRequest as Promise<T>;
  }

  const promise = fn()
    .then((result) => {
      // Remove from pending after a delay
      setTimeout(() => pendingRequests.delete(key), ttl);
      return result;
    })
    .catch((error) => {
      pendingRequests.delete(key);
      throw error;
    });

  pendingRequests.set(key, promise);
  return promise;
}

/**
 * Error formatter for user-friendly messages
 */
export function formatErrorForUser(error: unknown): string {
  if (error instanceof MetalPriceError) {
    if (!error.retryable) {
      return `Service temporarily unavailable. Please try again later.`;
    }
    return error.message || 'An error occurred while fetching data.';
  }

  if (error instanceof Error) {
    return error.message || 'An unexpected error occurred.';
  }

  return 'An unexpected error occurred. Please try again.';
}

/**
 * Error logger (can be extended to send to external service)
 */
export function logError(error: unknown, context?: Record<string, unknown>): void {
  if (error instanceof MetalPriceError) {
    console.error('[MetalPriceError]', {
      message: error.message,
      source: error.source,
      statusCode: error.statusCode,
      retryable: error.retryable,
      stack: error.stack,
      context,
    });
  } else if (error instanceof Error) {
    console.error('[Error]', {
      message: error.message,
      stack: error.stack,
      context,
    });
  } else {
    console.error('[Unknown Error]', { error, context });
  }
}

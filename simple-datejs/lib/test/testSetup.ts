/**
 * Global test setup for @rnwonder/simple-datejs test suite
 * Configures global mocks and test environment
 */

import { vi, beforeEach, afterEach, afterAll, expect } from "vitest";

// ============================================================================
// Global Test Configuration
// ============================================================================

// Make vitest functions globally available
(globalThis as any).vi = vi;

// ============================================================================
// Global Mocks Setup
// ============================================================================

// Mock performance API if not available
if (typeof global.performance === "undefined") {
  global.performance = {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByName: vi.fn(() => []),
    getEntriesByType: vi.fn(() => []),
    clearMarks: vi.fn(),
    clearMeasures: vi.fn(),
  } as any;
}

// Mock ResizeObserver if not available
if (typeof global.ResizeObserver === "undefined") {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
}

// Mock IntersectionObserver if not available
if (typeof global.IntersectionObserver === "undefined") {
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
}

// ============================================================================
// Global Test Hooks
// ============================================================================

// Global setup before each test
beforeEach(() => {
  // Clear all mocks before each test
  vi.clearAllMocks();

  // Reset any global state
  vi.clearAllTimers();
});

// Global cleanup after each test
afterEach(() => {
  // Restore all mocks after each test
  vi.restoreAllMocks();

  // Clean up any remaining timers only if they were mocked
  try {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  } catch (error) {
    // Ignore timer errors if timers weren't mocked
  }
});

// ============================================================================
// Console Suppression for Clean Test Output
// ============================================================================

// Suppress console warnings during tests unless explicitly needed
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

console.warn = vi.fn();
console.error = vi.fn();

// Restore console methods after all tests
afterAll(() => {
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});

// ============================================================================
// Timezone Handling
// ============================================================================

// Set a consistent timezone for tests to avoid timezone-related flakiness
process.env.TZ = "UTC";

// ============================================================================
// Custom Matchers
// ============================================================================

// Extend expect with custom matchers for date testing
expect.extend({
  toBeValidDateObject(received: any) {
    const pass =
      received !== null &&
      typeof received === "object" &&
      typeof received.day === "number" &&
      typeof received.month === "number" &&
      typeof received.year === "number" &&
      received.day > 0 &&
      received.day <= 31 &&
      received.month >= 0 &&
      received.month <= 11 &&
      received.year > 0;

    if (pass) {
      return {
        message: () =>
          `expected ${JSON.stringify(received)} not to be a valid date object`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${JSON.stringify(received)} to be a valid date object with day (1-31), month (0-11), and year (>0)`,
        pass: false,
      };
    }
  },

  toBeValidJSDate(received: any) {
    const pass = received instanceof Date && !isNaN(received.getTime());

    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid JavaScript Date`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid JavaScript Date`,
        pass: false,
      };
    }
  },

  toBeWithinTimeRange(
    received: number,
    expected: number,
    tolerance: number = 100,
  ) {
    const pass = Math.abs(received - expected) <= tolerance;

    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within ${tolerance}ms of ${expected}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within ${tolerance}ms of ${expected}`,
        pass: false,
      };
    }
  },
});

// ============================================================================
// Type Declarations for Custom Matchers
// ============================================================================

declare global {
  namespace Vi {
    interface JestAssertion<T = any> {
      toBeValidDateObject(): T;
      toBeValidJSDate(): T;
      toBeWithinTimeRange(expected: number, tolerance?: number): T;
    }
  }
}

export {};

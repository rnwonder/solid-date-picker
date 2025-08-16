import { vi, expect } from "vitest";
import type {
  DateObjectUnits,
  MakeOptionalRequired,
  TimeMeridiem,
} from "../types";
import { afterEach } from "node:test";
import { beforeEach } from "node:test";
import { describe } from "node:test";

/**
 * Test Utilities for @rnwonder/simple-datejs
 * Provides common helpers for date objects, DOM mocking, and assertions
 */

// ============================================================================
// Date Object Utilities
// ============================================================================

/**
 * Creates a standardized date object for testing
 */
export const createTestDateObject = (
  day: number,
  month: number,
  year: number,
): MakeOptionalRequired<DateObjectUnits> => ({
  day,
  month,
  year,
});

/**
 * Creates a Date object from test parameters with timezone handling
 */
export const createTestDate = (
  year: number,
  month: number,
  day: number,
): Date => {
  return new Date(year, month, day);
};

/**
 * Creates a mock date with specific time for testing time-dependent functions
 */
export const createMockDateTime = (
  year: number,
  month: number,
  day: number,
  hour: number = 0,
  minute: number = 0,
  second: number = 0,
): Date => {
  return new Date(year, month, day, hour, minute, second);
};

/**
 * Compares two date objects for equality in tests
 */
export const expectDateObjectsEqual = (
  actual: DateObjectUnits,
  expected: DateObjectUnits,
): void => {
  expect(actual.day).toBe(expected.day);
  expect(actual.month).toBe(expected.month);
  expect(actual.year).toBe(expected.year);
};

/**
 * Validates that a date object has all required properties
 */
export const expectValidDateObject = (dateObj: DateObjectUnits): void => {
  expect(dateObj).toHaveProperty("day");
  expect(dateObj).toHaveProperty("month");
  expect(dateObj).toHaveProperty("year");
  expect(typeof dateObj.day).toBe("number");
  expect(typeof dateObj.month).toBe("number");
  expect(typeof dateObj.year).toBe("number");
};

// ============================================================================
// DOM Mocking Utilities
// ============================================================================

/**
 * Creates a mock DOM element with configurable getBoundingClientRect
 * Uses real DOM element in jsdom environment for better compatibility
 */
export const createMockElement = (rect: Partial<DOMRect> = {}): HTMLElement => {
  const defaultRect: DOMRect = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  };

  // Create a real DOM element in jsdom environment
  const element = document.createElement("div");

  // Mock getBoundingClientRect with custom values
  element.getBoundingClientRect = vi.fn(() => ({ ...defaultRect, ...rect }));

  // Set additional properties
  Object.defineProperty(element, "offsetHeight", {
    value: rect.height || 0,
    writable: true,
  });
  Object.defineProperty(element, "offsetWidth", {
    value: rect.width || 0,
    writable: true,
  });
  Object.defineProperty(element, "clientHeight", {
    value: rect.height || 0,
    writable: true,
  });
  Object.defineProperty(element, "clientWidth", {
    value: rect.width || 0,
    writable: true,
  });

  return element;
};

/**
 * Creates a mock window object with configurable dimensions
 */
export const createMockWindow = (
  innerWidth: number = 1024,
  innerHeight: number = 768,
) => {
  return {
    innerWidth,
    innerHeight,
    outerWidth: innerWidth,
    outerHeight: innerHeight,
    scrollX: 0,
    scrollY: 0,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
};

/**
 * Creates a mock document object for DOM testing
 * In jsdom environment, we can use the real document object
 */
export const createMockDocument = () => {
  // In jsdom environment, return the real document with some mocked methods
  const mockDoc = document;

  // Mock getBoundingClientRect for body and documentElement
  if (mockDoc.body) {
    mockDoc.body.getBoundingClientRect = vi.fn(() => ({
      top: 0,
      left: 0,
      width: 1024,
      height: 768,
      bottom: 768,
      right: 1024,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));
  }

  if (mockDoc.documentElement) {
    mockDoc.documentElement.getBoundingClientRect = vi.fn(() => ({
      top: 0,
      left: 0,
      width: 1024,
      height: 768,
      bottom: 768,
      right: 1024,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }));
  }

  return mockDoc;
};

/**
 * Sets up DOM mocks for portal positioning tests
 * In jsdom environment, we enhance the existing window and document objects
 */
export const setupPortalMocks = (
  elementRect: Partial<DOMRect> = {},
  windowDimensions: { width: number; height: number } = {
    width: 1024,
    height: 768,
  },
) => {
  const mockElement = createMockElement(elementRect);

  // In jsdom, enhance the existing window object
  Object.defineProperty(window, "innerWidth", {
    value: windowDimensions.width,
    writable: true,
  });
  Object.defineProperty(window, "innerHeight", {
    value: windowDimensions.height,
    writable: true,
  });
  Object.defineProperty(window, "outerWidth", {
    value: windowDimensions.width,
    writable: true,
  });
  Object.defineProperty(window, "outerHeight", {
    value: windowDimensions.height,
    writable: true,
  });

  // Setup document mocks
  const mockDocument = createMockDocument();

  return { mockElement, mockWindow: window, mockDocument };
};

// ============================================================================
// Time Mocking Utilities
// ============================================================================

/**
 * Sets up fake timers with a specific date
 */
export const setupMockTime = (date: Date | string = "2023-06-15T12:00:00Z") => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(date));
};

/**
 * Restores real timers
 */
export const restoreTime = () => {
  vi.useRealTimers();
};

/**
 * Creates a mock Date constructor that returns a specific date
 */
export const mockDateConstructor = (mockDate: Date) => {
  const OriginalDate = Date;
  const MockDate = vi.fn(() => mockDate) as any;
  MockDate.now = vi.fn(() => mockDate.getTime());
  MockDate.parse = OriginalDate.parse;
  MockDate.UTC = OriginalDate.UTC;
  MockDate.prototype = OriginalDate.prototype;

  global.Date = MockDate;

  return () => {
    global.Date = OriginalDate;
  };
};

// ============================================================================
// Test Data Sets
// ============================================================================

/**
 * Common test dates for various scenarios
 */
export const TEST_DATES = {
  // Standard dates
  STANDARD: createTestDateObject(15, 5, 2023), // June 15, 2023
  NEW_YEAR: createTestDateObject(1, 0, 2023), // January 1, 2023
  LEAP_YEAR: createTestDateObject(29, 1, 2024), // February 29, 2024 (leap year)

  // Edge cases
  MONTH_END: createTestDateObject(31, 11, 2023), // December 31, 2023
  MONTH_START: createTestDateObject(1, 6, 2023), // July 1, 2023

  // Historical dates
  PAST: createTestDateObject(10, 2, 2020), // March 10, 2020
  FUTURE: createTestDateObject(25, 8, 2025), // September 25, 2025

  // Year boundaries
  YEAR_2000: createTestDateObject(1, 0, 2000), // Y2K
  YEAR_1999: createTestDateObject(31, 11, 1999), // Pre-Y2K

  // Century boundaries
  CENTURY_START: createTestDateObject(1, 0, 2001),
  CENTURY_END: createTestDateObject(31, 11, 2000),
} as const;

/**
 * Test locales for internationalization testing
 */
export const TEST_LOCALES = [
  "en-US",
  "en-GB",
  "es-MX",
  "fr-FR",
  "de-DE",
  "ja-JP",
  "zh-CN",
  "ar-SA",
  "hi-IN",
  "pt-BR",
] as const;

/**
 * Test scenarios for time conversion
 */
export const TIME_CONVERSION_SCENARIOS = [
  // 24-hour to 12-hour conversions
  { hour24: 0, expected12: { hour: 12, meridiem: "AM" as TimeMeridiem } },
  { hour24: 1, expected12: { hour: 1, meridiem: "AM" as TimeMeridiem } },
  { hour24: 11, expected12: { hour: 11, meridiem: "AM" as TimeMeridiem } },
  { hour24: 12, expected12: { hour: 12, meridiem: "PM" as TimeMeridiem } },
  { hour24: 13, expected12: { hour: 1, meridiem: "PM" as TimeMeridiem } },
  { hour24: 23, expected12: { hour: 11, meridiem: "PM" as TimeMeridiem } },
] as const;

/**
 * Test scenarios for date ranges
 */
export const DATE_RANGE_SCENARIOS = [
  {
    name: "same_month_range",
    start: createTestDateObject(10, 5, 2023),
    end: createTestDateObject(20, 5, 2023),
  },
  {
    name: "cross_month_range",
    start: createTestDateObject(25, 4, 2023),
    end: createTestDateObject(5, 5, 2023),
  },
  {
    name: "cross_year_range",
    start: createTestDateObject(20, 11, 2023),
    end: createTestDateObject(10, 0, 2024),
  },
  {
    name: "single_day_range",
    start: createTestDateObject(15, 5, 2023),
    end: createTestDateObject(15, 5, 2023),
  },
] as const;

/**
 * Test data for DOM positioning scenarios
 */
export const POSITIONING_SCENARIOS = [
  {
    name: "top_left",
    elementRect: { top: 100, left: 100, width: 200, height: 30 },
    windowSize: { width: 1024, height: 768 },
  },
  {
    name: "bottom_right",
    elementRect: { top: 600, left: 800, width: 200, height: 30 },
    windowSize: { width: 1024, height: 768 },
  },
  {
    name: "center",
    elementRect: { top: 350, left: 400, width: 200, height: 30 },
    windowSize: { width: 1024, height: 768 },
  },
  {
    name: "small_screen",
    elementRect: { top: 200, left: 150, width: 200, height: 30 },
    windowSize: { width: 480, height: 800 },
  },
] as const;

/**
 * Test data for year ranges
 */
export const YEAR_RANGE_SCENARIOS = [
  { start: 2020, end: 2025, count: 6 },
  { start: 1990, end: 2030, count: 41 },
  { start: 2023, end: 2023, count: 1 },
  { start: 2000, end: 2010, count: 11 },
] as const;

// ============================================================================
// Assertion Helpers
// ============================================================================

/**
 * Asserts that a value is a valid date object
 */
export const assertValidDateObject = (
  value: any,
): asserts value is DateObjectUnits => {
  expect(value).toBeDefined();
  expect(typeof value).toBe("object");
  expect(value).not.toBeNull();
  expect(typeof value.day).toBe("number");
  expect(typeof value.month).toBe("number");
  expect(typeof value.year).toBe("number");
  expect(value.day).toBeGreaterThan(0);
  expect(value.day).toBeLessThanOrEqual(31);
  expect(value.month).toBeGreaterThanOrEqual(0);
  expect(value.month).toBeLessThanOrEqual(11);
  expect(value.year).toBeGreaterThan(0);
};

/**
 * Asserts that a value is a valid JavaScript Date
 */
export const assertValidJSDate = (value: any): asserts value is Date => {
  expect(value).toBeInstanceOf(Date);
  expect(value.getTime()).not.toBeNaN();
};

/**
 * Asserts that a date range is valid
 */
export const assertValidDateRange = (start: any, end: any): void => {
  // TypeScript now knows startObj and endObj are DateObjectUnits due to the assertions above
  const startDate = new Date(start?.year, start.month, start.day);
  const endDate = new Date(end.year, end.month, end.day);

  expect(startDate.getTime()).toBeLessThanOrEqual(endDate.getTime());
};

/**
 * Asserts that a positioning result has required properties
 */
export const assertValidPositioning = (position: any): void => {
  expect(position).toBeDefined();
  expect(typeof position).toBe("object");
  expect(position).not.toBeNull();
};

// ============================================================================
// Test Environment Setup
// ============================================================================

/**
 * Sets up a clean test environment with all necessary mocks
 */
export const setupTestEnvironment = () => {
  // Setup DOM mocks
  setupPortalMocks();

  // Setup time mocks
  setupMockTime();

  // Return cleanup function
  return () => {
    restoreTime();
    vi.clearAllMocks();
  };
};

/**
 * Creates a test suite wrapper with common setup and teardown
 */
export const createTestSuite = (name: string, tests: () => void) => {
  describe(name, () => {
    let cleanup: (() => void) | undefined;

    beforeEach(() => {
      cleanup = setupTestEnvironment();
    });

    afterEach(() => {
      cleanup?.();
    });

    tests();
  });
};

// ============================================================================
// Performance Testing Utilities
// ============================================================================

/**
 * Measures execution time of a function
 */
export const measureExecutionTime = async (
  fn: () => void | Promise<void>,
): Promise<number> => {
  const start = performance.now();
  await fn();
  const end = performance.now();
  return end - start;
};

/**
 * Asserts that a function executes within a time limit
 */
export const expectExecutionTime = async (
  fn: () => void | Promise<void>,
  maxTime: number,
): Promise<void> => {
  const executionTime = await measureExecutionTime(fn);
  expect(executionTime).toBeLessThan(maxTime);
};

// ============================================================================
// Export all utilities
// ============================================================================

export * from "../types";

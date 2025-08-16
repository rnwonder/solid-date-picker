import { describe, test, expect } from "vitest";
import {
  createTestDateObject,
  createTestDate,
  expectDateObjectsEqual,
  expectValidDateObject,
  createMockElement,
  setupMockTime,
  restoreTime,
  TEST_DATES,
  TIME_CONVERSION_SCENARIOS,
  assertValidDateObject,
  assertValidJSDate,
} from "./testUtils";

describe("Test Utils", () => {
  describe("Date Object Utilities", () => {
    test("createTestDateObject should create valid date object", () => {
      const dateObj = createTestDateObject(15, 5, 2023);
      expect(dateObj).toEqual({ day: 15, month: 5, year: 2023 });
      expectValidDateObject(dateObj);
    });

    test("createTestDate should create valid JS Date", () => {
      const date = createTestDate(2023, 5, 15);
      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2023);
      expect(date.getMonth()).toBe(5);
      expect(date.getDate()).toBe(15);
    });

    test("expectDateObjectsEqual should compare date objects correctly", () => {
      const date1 = createTestDateObject(15, 5, 2023);
      const date2 = createTestDateObject(15, 5, 2023);
      expectDateObjectsEqual(date1, date2);
    });
  });

  describe("DOM Mocking Utilities", () => {
    test("createMockElement should create mock element with getBoundingClientRect", () => {
      const mockElement = createMockElement({ 
        top: 100, 
        left: 200, 
        width: 150, 
        height: 30 
      });
      
      expect(mockElement.getBoundingClientRect).toBeDefined();
      const rect = mockElement.getBoundingClientRect();
      expect(rect.top).toBe(100);
      expect(rect.left).toBe(200);
      expect(rect.width).toBe(150);
      expect(rect.height).toBe(30);
    });
  });

  describe("Time Mocking Utilities", () => {
    test("setupMockTime should set fake timers", () => {
      setupMockTime('2023-06-15T12:00:00Z');
      const now = new Date();
      expect(now.getFullYear()).toBe(2023);
      expect(now.getMonth()).toBe(5); // June is month 5
      expect(now.getDate()).toBe(15);
      restoreTime();
    });
  });

  describe("Test Data Sets", () => {
    test("TEST_DATES should contain valid date objects", () => {
      expectValidDateObject(TEST_DATES.STANDARD);
      expectValidDateObject(TEST_DATES.NEW_YEAR);
      expectValidDateObject(TEST_DATES.LEAP_YEAR);
    });

    test("TIME_CONVERSION_SCENARIOS should contain valid time data", () => {
      expect(TIME_CONVERSION_SCENARIOS).toHaveLength(6);
      expect(TIME_CONVERSION_SCENARIOS[0].hour24).toBe(0);
      expect(TIME_CONVERSION_SCENARIOS[0].expected12.hour).toBe(12);
      expect(TIME_CONVERSION_SCENARIOS[0].expected12.meridiem).toBe('AM');
    });
  });

  describe("Assertion Helpers", () => {
    test("assertValidDateObject should validate date objects", () => {
      const validDate = { day: 15, month: 5, year: 2023 };
      expect(() => assertValidDateObject(validDate)).not.toThrow();
    });

    test("assertValidJSDate should validate JS dates", () => {
      const validDate = new Date(2023, 5, 15);
      expect(() => assertValidJSDate(validDate)).not.toThrow();
    });

    test("assertValidDateObject should throw for invalid objects", () => {
      expect(() => assertValidDateObject(null)).toThrow();
      expect(() => assertValidDateObject({ day: 'invalid' })).toThrow();
      expect(() => assertValidDateObject({ day: 32, month: 5, year: 2023 })).toThrow();
    });
  });
});
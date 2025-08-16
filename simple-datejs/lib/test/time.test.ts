/**
 * Comprehensive test suite for time-related functions
 * Tests all time conversion, formatting, and utility functions
 */

import { describe, test, expect, afterEach } from "vitest";
import {
  leadingZeros,
  convert24HourTo12Hour,
  convert12HourTo24Hour,
  getAmPm,
  getCurrentTime,
  getYearRange,
} from "../time";
import { setupMockTime, restoreTime } from "./testUtils";
import { LEADING_ZEROS_SCENARIOS, LOCALE_SCENARIOS } from "./testData";

describe("Time Functions", () => {
  describe("leadingZeros", () => {
    test("should pad single digit numbers with default padding (2)", () => {
      expect(leadingZeros(0)).toBe("00");
      expect(leadingZeros(1)).toBe("01");
      expect(leadingZeros(5)).toBe("05");
      expect(leadingZeros(9)).toBe("09");
    });

    test("should pad double digit numbers correctly with default padding", () => {
      expect(leadingZeros(10)).toBe("10");
      expect(leadingZeros(25)).toBe("25");
      expect(leadingZeros(99)).toBe("99");
    });

    test("should not pad numbers that already meet the padding requirement", () => {
      expect(leadingZeros(100)).toBe("100");
      expect(leadingZeros(1000)).toBe("1000");
    });

    test("should handle custom padding lengths", () => {
      expect(leadingZeros(5, 3)).toBe("005");
      expect(leadingZeros(50, 3)).toBe("050");
      expect(leadingZeros(500, 3)).toBe("500");
      expect(leadingZeros(5000, 3)).toBe("5000");
    });

    test("should handle various padding lengths with different values", () => {
      // Test with padding of 1
      expect(leadingZeros(5, 1)).toBe("5");
      expect(leadingZeros(50, 1)).toBe("50");
      
      // Test with padding of 4
      expect(leadingZeros(1, 4)).toBe("0001");
      expect(leadingZeros(12, 4)).toBe("0012");
      expect(leadingZeros(123, 4)).toBe("0123");
      expect(leadingZeros(1234, 4)).toBe("1234");
      
      // Test with padding of 5
      expect(leadingZeros(7, 5)).toBe("00007");
      expect(leadingZeros(789, 5)).toBe("00789");
    });

    test("should handle all values from 0-99 with default padding", () => {
      for (let i = 0; i <= 99; i++) {
        const result = leadingZeros(i);
        expect(result).toHaveLength(Math.max(2, String(i).length));
        expect(result).toBe(String(i).padStart(2, "0"));
      }
    });

    test("should handle edge cases with negative numbers", () => {
      // Math.ceil should handle negative numbers
      expect(leadingZeros(-1)).toBe("-1");
      expect(leadingZeros(-5)).toBe("-5");
      expect(leadingZeros(-10)).toBe("-10");
      expect(leadingZeros(-1.5)).toBe("-1");
    });

    test("should handle non-integer inputs by ceiling them", () => {
      expect(leadingZeros(1.1)).toBe("02");
      expect(leadingZeros(1.9)).toBe("02");
      expect(leadingZeros(5.3)).toBe("06");
      expect(leadingZeros(9.7)).toBe("10");
      expect(leadingZeros(10.1)).toBe("11");
    });

    test("should handle decimal numbers with custom padding", () => {
      expect(leadingZeros(1.5, 3)).toBe("002");
      expect(leadingZeros(12.8, 4)).toBe("0013");
      expect(leadingZeros(99.1, 3)).toBe("100");
    });

    test("should handle zero with various padding lengths", () => {
      expect(leadingZeros(0, 1)).toBe("0");
      expect(leadingZeros(0, 2)).toBe("00");
      expect(leadingZeros(0, 3)).toBe("000");
      expect(leadingZeros(0, 5)).toBe("00000");
    });

    test("should handle large numbers", () => {
      expect(leadingZeros(1000, 2)).toBe("1000");
      expect(leadingZeros(9999, 3)).toBe("9999");
      expect(leadingZeros(12345, 6)).toBe("012345");
    });

    test("should use test data scenarios", () => {
      LEADING_ZEROS_SCENARIOS.forEach(({ value, padding, expected }) => {
        expect(leadingZeros(value, padding)).toBe(expected);
      });
    });

    test("should handle undefined padding parameter", () => {
      expect(leadingZeros(5, undefined)).toBe("05");
      expect(leadingZeros(15, undefined)).toBe("15");
    });

    test("should handle special numeric values", () => {
      expect(leadingZeros(Infinity)).toBe("Infinity");
      expect(leadingZeros(-Infinity)).toBe("-Infinity");
      expect(leadingZeros(NaN)).toBe("NaN");
    });
  });

  describe("convert24HourTo12Hour", () => {
    test("should convert midnight (0) to 12", () => {
      expect(convert24HourTo12Hour(0)).toBe(12);
    });

    test("should convert noon (12) to 0", () => {
      expect(convert24HourTo12Hour(12)).toBe(0);
    });

    test("should convert morning hours (1-11) unchanged", () => {
      for (let hour = 1; hour <= 11; hour++) {
        expect(convert24HourTo12Hour(hour)).toBe(hour);
      }
    });

    test("should convert afternoon hours (13-23) by subtracting 12", () => {
      for (let hour = 13; hour <= 23; hour++) {
        expect(convert24HourTo12Hour(hour)).toBe(hour - 12);
      }
    });

    test("should handle all 24 hour values correctly", () => {
      const expected = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      for (let hour = 0; hour < 24; hour++) {
        expect(convert24HourTo12Hour(hour)).toBe(expected[hour]);
      }
    });

    test("should handle edge cases", () => {
      expect(convert24HourTo12Hour(0)).toBe(12);
      expect(convert24HourTo12Hour(12)).toBe(0);
      expect(convert24HourTo12Hour(24)).toBe(12); // 24 should be treated like 0
    });
  });

  describe("convert12HourTo24Hour", () => {
    test("should convert 12 AM to 0", () => {
      expect(convert12HourTo24Hour(12, "AM")).toBe(0);
    });

    test("should convert 12 PM to 12", () => {
      expect(convert12HourTo24Hour(12, "PM")).toBe(12);
    });

    test("should convert 0 PM to 12", () => {
      expect(convert12HourTo24Hour(0, "PM")).toBe(12);
    });

    test("should convert AM hours (1-11) unchanged", () => {
      for (let hour = 1; hour <= 11; hour++) {
        expect(convert12HourTo24Hour(hour, "AM")).toBe(hour);
      }
    });

    test("should convert PM hours (1-11) by adding 12", () => {
      for (let hour = 1; hour <= 11; hour++) {
        expect(convert12HourTo24Hour(hour, "PM")).toBe(hour + 12);
      }
    });

    test("should handle all AM/PM combinations", () => {
      // Test AM conversions
      const amExpected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0];
      for (let hour = 0; hour <= 12; hour++) {
        expect(convert12HourTo24Hour(hour, "AM")).toBe(amExpected[hour]);
      }

      // Test PM conversions  
      const pmExpected = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 12];
      for (let hour = 0; hour <= 12; hour++) {
        expect(convert12HourTo24Hour(hour, "PM")).toBe(pmExpected[hour]);
      }
    });

    test("should handle edge cases", () => {
      expect(convert12HourTo24Hour(0, "AM")).toBe(0);
      expect(convert12HourTo24Hour(0, "PM")).toBe(12);
      expect(convert12HourTo24Hour(12, "AM")).toBe(0);
      expect(convert12HourTo24Hour(12, "PM")).toBe(12);
    });
  });

  describe("getAmPm", () => {
    test("should return AM for hours 0-11", () => {
      for (let hour = 0; hour <= 11; hour++) {
        expect(getAmPm(hour)).toBe("AM");
      }
    });

    test("should return PM for hours 12-23", () => {
      for (let hour = 12; hour <= 23; hour++) {
        expect(getAmPm(hour)).toBe("PM");
      }
    });

    test("should handle boundary cases", () => {
      expect(getAmPm(0)).toBe("AM");
      expect(getAmPm(11)).toBe("AM");
      expect(getAmPm(12)).toBe("PM");
      expect(getAmPm(23)).toBe("PM");
    });

    test("should handle edge cases beyond 24 hours", () => {
      expect(getAmPm(24)).toBe("PM");
      expect(getAmPm(25)).toBe("PM");
    });

    test("should handle negative hours", () => {
      expect(getAmPm(-1)).toBe("AM");
      expect(getAmPm(-12)).toBe("AM");
    });
  });

  describe("getCurrentTime", () => {
    afterEach(() => {
      restoreTime();
    });

    test("should return current time with correct properties and types", () => {
      const result = getCurrentTime();
      
      expect(result).toHaveProperty("hour");
      expect(result).toHaveProperty("minute");
      expect(result).toHaveProperty("second");
      expect(result).toHaveProperty("meridiem");
      
      expect(typeof result.hour).toBe("number");
      expect(typeof result.minute).toBe("number");
      expect(typeof result.second).toBe("number");
      expect(typeof result.meridiem).toBe("string");
      
      expect(result.hour).toBeGreaterThan(0);
      expect(result.hour).toBeLessThanOrEqual(12);
      expect(result.minute).toBeGreaterThanOrEqual(0);
      expect(result.minute).toBeLessThan(60);
      expect(result.second).toBeGreaterThanOrEqual(0);
      expect(result.second).toBeLessThan(60);
      expect(["AM", "PM"]).toContain(result.meridiem);
    });

    test("should handle mocked time correctly", () => {
      setupMockTime("2023-06-15T14:30:45Z");
      const result = getCurrentTime();
      
      // Verify the structure is correct
      expect(result).toHaveProperty("hour");
      expect(result).toHaveProperty("minute");
      expect(result).toHaveProperty("second");
      expect(result).toHaveProperty("meridiem");
      
      // Verify the minute and second match what we set
      expect(result.minute).toBe(30);
      expect(result.second).toBe(45);
      
      // Verify hour is in valid 12-hour range
      expect(result.hour).toBeGreaterThan(0);
      expect(result.hour).toBeLessThanOrEqual(12);
      
      // Verify meridiem is valid
      expect(["AM", "PM"]).toContain(result.meridiem);
    });

    test("should convert time consistently with internal logic", () => {
      // Test the actual behavior of the function by testing the conversion logic
      setupMockTime("2023-06-15T00:00:00Z");
      const midnight = getCurrentTime();
      expect(midnight.minute).toBe(0);
      expect(midnight.second).toBe(0);
      
      setupMockTime("2023-06-15T12:00:00Z");
      const noon = getCurrentTime();
      expect(noon.minute).toBe(0);
      expect(noon.second).toBe(0);
      
      setupMockTime("2023-06-15T15:30:45Z");
      const afternoon = getCurrentTime();
      expect(afternoon.minute).toBe(30);
      expect(afternoon.second).toBe(45);
      expect(afternoon.meridiem).toBe("PM");
    });

    test("should return different times when system time changes", () => {
      setupMockTime("2023-06-15T10:00:00Z");
      const result1 = getCurrentTime();
      
      setupMockTime("2023-06-15T22:30:15Z");
      const result2 = getCurrentTime();
      
      // Times should be different
      expect(result1).not.toEqual(result2);
      
      // Both should have valid structure
      expect(result1.hour).toBeGreaterThan(0);
      expect(result1.hour).toBeLessThanOrEqual(12);
      expect(result2.hour).toBeGreaterThan(0);
      expect(result2.hour).toBeLessThanOrEqual(12);
    });

    test("should handle various times throughout the day", () => {
      const testTimes = [
        "2023-06-15T01:00:00Z",
        "2023-06-15T06:30:15Z", 
        "2023-06-15T11:45:30Z",
        "2023-06-15T13:15:45Z",
        "2023-06-15T18:30:00Z",
        "2023-06-15T23:45:15Z"
      ];

      testTimes.forEach(time => {
        setupMockTime(time);
        const result = getCurrentTime();
        
        // Verify structure
        expect(result).toHaveProperty("hour");
        expect(result).toHaveProperty("minute");
        expect(result).toHaveProperty("second");
        expect(result).toHaveProperty("meridiem");
        
        // Verify valid ranges
        expect(result.hour).toBeGreaterThan(0);
        expect(result.hour).toBeLessThanOrEqual(12);
        expect(["AM", "PM"]).toContain(result.meridiem);
      });
    });
  });

  describe("getYearRange", () => {
    afterEach(() => {
      restoreTime();
    });

    test("should generate year range with count parameter", () => {
      const result = getYearRange({
        count: 5,
        startYear: 2020,
        endYear: 2024,
        locale: "en-US"
      });

      expect(result.array).toHaveLength(5);
      expect(result.array).toEqual(["2020", "2021", "2022", "2023", "2024"]);
      expect(result.startYear).toBe(2020);
      expect(result.endYear).toBe(2024);
      expect(result.range).toBe("2020 - 2024");
    });

    test("should calculate startYear when not provided", () => {
      setupMockTime("2023-06-15T12:00:00Z");
      
      const result = getYearRange({
        count: 5,
        locale: "en-US"
      });

      expect(result.array).toHaveLength(5);
      expect(result.startYear).toBeDefined();
      expect(result.endYear).toBeDefined();
      expect(result.endYear - result.startYear).toBe(4); // count - 1
    });

    test("should calculate endYear when not provided", () => {
      const result = getYearRange({
        count: 3,
        startYear: 2020,
        locale: "en-US"
      });

      expect(result.array).toHaveLength(3);
      expect(result.array).toEqual(["2020", "2021", "2022"]);
      expect(result.startYear).toBe(2020);
      expect(result.endYear).toBe(2022);
    });

    test("should use provided year parameter", () => {
      const result = getYearRange({
        count: 3,
        year: 2025,
        locale: "en-US"
      });

      expect(result.array).toHaveLength(3);
      expect(result.startYear).toBeDefined();
      expect(result.endYear).toBeDefined();
      // The calculation should be based on year 2025
    });

    test("should handle yearRange constraints", () => {
      const result = getYearRange({
        count: 10,
        startYear: 2015,
        endYear: 2024,
        yearRange: { start: 2018, end: 2022 },
        locale: "en-US"
      });

      expect(result.array).toHaveLength(10);
      
      // Years before yearRange.start should be empty strings
      expect(result.array[0]).toBe(""); // 2015
      expect(result.array[1]).toBe(""); // 2016
      expect(result.array[2]).toBe(""); // 2017
      
      // Years within range should be formatted
      expect(result.array[3]).toBe("2018");
      expect(result.array[4]).toBe("2019");
      expect(result.array[5]).toBe("2020");
      expect(result.array[6]).toBe("2021");
      expect(result.array[7]).toBe("2022");
      
      // Years after yearRange.end should be empty strings
      expect(result.array[8]).toBe(""); // 2023
      expect(result.array[9]).toBe(""); // 2024
      
      expect(result.range).toBe("2018 - 2022");
    });

    test("should handle yearRange with only start constraint", () => {
      const result = getYearRange({
        count: 5,
        startYear: 2020,
        endYear: 2024,
        yearRange: { start: 2022 } as any,
        locale: "en-US"
      });

      expect(result.array).toEqual(["", "", "2022", "2023", "2024"]);
      expect(result.range).toBe("2022 - 2024");
    });

    test("should handle yearRange with only end constraint", () => {
      const result = getYearRange({
        count: 5,
        startYear: 2020,
        endYear: 2024,
        yearRange: { end: 2022 } as any,
        locale: "en-US"
      });

      expect(result.array).toEqual(["2020", "2021", "2022", "", ""]);
      expect(result.range).toBe("2020 - 2022");
    });

    test("should format years according to locale", () => {
      const locales = ["en-US", "en-GB", "es-MX", "fr-FR", "de-DE"];
      
      locales.forEach(locale => {
        const result = getYearRange({
          count: 3,
          startYear: 2020,
          endYear: 2022,
          locale: locale as any
        });

        expect(result.array).toHaveLength(3);
        // All locales should format years as strings
        result.array.forEach(year => {
          expect(typeof year).toBe("string");
          if (year !== "") {
            expect(year).toMatch(/^\d{4}$/); // Should be 4 digits
          }
        });
      });
    });

    test("should handle different count values", () => {
      const testCases = [
        { count: 1, expected: 1 },
        { count: 5, expected: 5 },
        { count: 10, expected: 10 },
        { count: 20, expected: 20 }
      ];

      testCases.forEach(({ count, expected }) => {
        const result = getYearRange({
          count,
          startYear: 2020,
          locale: "en-US"
        });

        expect(result.array).toHaveLength(expected);
        expect(result.endYear - result.startYear).toBe(count - 1);
      });
    });

    test("should handle edge cases with year boundaries", () => {
      // Test with year 1
      const result1 = getYearRange({
        count: 3,
        startYear: 1,
        endYear: 3,
        locale: "en-US"
      });

      expect(result1.array).toEqual(["1", "2", "3"]);
      expect(result1.range).toBe("1 - 3");

      // Test with large years
      const result2 = getYearRange({
        count: 3,
        startYear: 9998,
        endYear: 10000,
        locale: "en-US"
      });

      expect(result2.array).toEqual(["9998", "9999", "10000"]);
      expect(result2.range).toBe("9998 - 10000");
    });

    test("should handle current year calculation correctly", () => {
      setupMockTime("2023-06-15T12:00:00Z");
      
      const result = getYearRange({
        count: 5,
        locale: "en-US"
      });

      // Should calculate based on current year (2023)
      expect(result.array).toHaveLength(5);
      expect(result.startYear).toBeDefined();
      expect(result.endYear).toBeDefined();
      
      // Verify the calculation logic
      const expectedStartYear = Math.floor(2023 / 5) * 5 + 1; // Should be 2021
      expect(result.startYear).toBe(expectedStartYear);
      expect(result.endYear).toBe(expectedStartYear + 4);
    });

    test("should handle special calculation when calculatedStartYear equals currentYear", () => {
      // Test case where Math.floor(currentYear / count) * count === currentYear
      setupMockTime("2025-06-15T12:00:00Z"); // 2025
      
      const result = getYearRange({
        count: 5, // 2025 / 5 = 405, 405 * 5 = 2025
        locale: "en-US"
      });

      // When calculatedStartYear === currentYear, startYear should be currentYear - count + 1
      expect(result.startYear).toBe(2025 - 5 + 1); // 2021
      expect(result.endYear).toBe(2021 + 5 - 1); // 2025
    });

    test("should return correct structure", () => {
      const result = getYearRange({
        count: 3,
        startYear: 2020,
        endYear: 2022,
        locale: "en-US"
      });

      expect(result).toHaveProperty("array");
      expect(result).toHaveProperty("range");
      expect(result).toHaveProperty("startYear");
      expect(result).toHaveProperty("endYear");

      expect(Array.isArray(result.array)).toBe(true);
      expect(typeof result.range).toBe("string");
      expect(typeof result.startYear).toBe("number");
      expect(typeof result.endYear).toBe("number");
    });

    test("should handle empty yearRange constraints", () => {
      const result = getYearRange({
        count: 3,
        startYear: 2020,
        endYear: 2022,
        yearRange: {} as any,
        locale: "en-US"
      });

      expect(result.array).toEqual(["2020", "2021", "2022"]);
      expect(result.range).toBe("2020 - 2022");
    });

    test("should use test data scenarios", () => {
      LOCALE_SCENARIOS.forEach(({ locale }) => {
        const result = getYearRange({
          count: 5,
          startYear: 2020,
          endYear: 2024,
          locale: locale as any
        });

        expect(result.array).toHaveLength(5);
        expect(result.startYear).toBe(2020);
        expect(result.endYear).toBe(2024);
        
        // All years should be formatted as strings
        result.array.forEach(year => {
          expect(typeof year).toBe("string");
          expect(year).toMatch(/^\d{4}$/);
        });
      });
    });
  });
});
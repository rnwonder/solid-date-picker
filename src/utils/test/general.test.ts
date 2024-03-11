import { describe, expect, test } from "vitest";
import {
  checkIfItsTodayDate,
  isBeforeDate,
} from "../general";

import {getMonthName, getToday} from "../generate";



describe("checkIfItsTodayDate", () => {
  test("should return true if date is today", () => {
    const today = new Date();
    expect(checkIfItsTodayDate(today)).toBe(true);
  });
  test("should return false if date is not today", () => {
    const today = new Date();
    expect(
      checkIfItsTodayDate({
        day: today.getDate() + 1,
        month: today.getMonth(),
        year: today.getFullYear(),
      })
    ).toBe(false);
  });
  test("should return true if date is today (object)", () => {
    const today = new Date();
    const todayObject = {
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
    };
    expect(checkIfItsTodayDate(todayObject)).toBe(true);
  });
  test("should return true if date is not today (object)", () => {
    const todayObject = {
      day: 12,
      month: 2,
      year: 2021,
    };
    expect(checkIfItsTodayDate(todayObject)).toBe(false);
  });
});

describe("getToday", () => {
  test("should return today's date", () => {
    const today = new Date();
    expect(getToday()).toEqual({
      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
    });
  });
});

describe("isBeforeDate", () => {
  test("should return true if first date is before second date", () => {
    const first = new Date(2021, 1, 1);
    const second = new Date(2021, 1, 2);
    expect(isBeforeDate(first, second)).toBe(true);
  });
  test("should return false if first date is after second date", () => {
    const first = new Date(2021, 1, 2);
    const second = new Date(2021, 1, 1);
    expect(isBeforeDate(first, second)).toBe(false);
  });
  test("should return false if first date is equal to second date", () => {
    const first = new Date(2021, 1, 1);
    const second = new Date(2021, 1, 1);
    expect(isBeforeDate(first, second)).toBe(false);
  });
  test("should return true if first date is before second date (object)", () => {
    const first = { day: 1, month: 1, year: 2021 };
    const second = { day: 2, month: 1, year: 2021 };
    expect(isBeforeDate(first, second)).toBe(true);
  });
  test("should return false if first date is after second date (object)", () => {
    const first = { day: 2, month: 1, year: 2021 };
    const second = { day: 1, month: 1, year: 2021 };
    expect(isBeforeDate(first, second)).toBe(false);
  });
  test("should return false if first date is equal to second date (object)", () => {
    const first = { day: 1, month: 1, year: 2021 };
    const second = { day: 1, month: 1, year: 2021 };
    expect(isBeforeDate(first, second)).toBe(false);
  });
});

/**
 * Date formatting tests
 */

describe("getMonthName", () => {
  test("should return month name in long format", () => {
    expect(getMonthName(0)).toBe("January");
    expect(getMonthName(1)).toBe("February");
    expect(getMonthName(2)).toBe("March");
    expect(getMonthName(3)).toBe("April");
    expect(getMonthName(4)).toBe("May");
    expect(getMonthName(5)).toBe("June");
    expect(getMonthName(6)).toBe("July");
    expect(getMonthName(7)).toBe("August");
    expect(getMonthName(8)).toBe("September");
    expect(getMonthName(9)).toBe("October");
    expect(getMonthName(10)).toBe("November");
    expect(getMonthName(11)).toBe("December");
  });
  test("should return month name in short format", () => {
    expect(getMonthName(0, "short")).toBe("Jan");
    expect(getMonthName(1, "short")).toBe("Feb");
    expect(getMonthName(2, "short")).toBe("Mar");
    expect(getMonthName(3, "short")).toBe("Apr");
    expect(getMonthName(4, "short")).toBe("May");
    expect(getMonthName(5, "short")).toBe("Jun");
    expect(getMonthName(6, "short")).toBe("Jul");
    expect(getMonthName(7, "short")).toBe("Aug");
    expect(getMonthName(8, "short")).toBe("Sep");
    expect(getMonthName(9, "short")).toBe("Oct");
    expect(getMonthName(10, "short")).toBe("Nov");
    expect(getMonthName(11, "short")).toBe("Dec");
  });
  test("should return month name in narrow format", () => {
    expect(getMonthName(0, "narrow")).toBe("J");
    expect(getMonthName(1, "narrow")).toBe("F");
    expect(getMonthName(2, "narrow")).toBe("M");
    expect(getMonthName(3, "narrow")).toBe("A");
    expect(getMonthName(4, "narrow")).toBe("M");
    expect(getMonthName(5, "narrow")).toBe("J");
    expect(getMonthName(6, "narrow")).toBe("J");
    expect(getMonthName(7, "narrow")).toBe("A");
    expect(getMonthName(8, "narrow")).toBe("S");
    expect(getMonthName(9, "narrow")).toBe("O");
    expect(getMonthName(10, "narrow")).toBe("N");
    expect(getMonthName(11, "narrow")).toBe("D");
  });
});



/* Tests for regional formatting */
describe("TimeAnalog for getMonthName function", () => {
  test("should return month name in Spanish long format", () => {
    expect(getMonthName(0, "long", "es-MX")).toBe("enero");
    expect(getMonthName(1, "long", "es-MX")).toBe("febrero");
    expect(getMonthName(2, "long", "es-MX")).toBe("marzo");
    expect(getMonthName(3, "long", "es-MX")).toBe("abril");
    expect(getMonthName(4, "long", "es-MX")).toBe("mayo");
    expect(getMonthName(5, "long", "es-MX")).toBe("junio");
    expect(getMonthName(6, "long", "es-MX")).toBe("julio");
    expect(getMonthName(7, "long", "es-MX")).toBe("agosto");
    expect(getMonthName(8, "long", "es-MX")).toBe("septiembre");
    expect(getMonthName(9, "long", "es-MX")).toBe("octubre");
    expect(getMonthName(10, "long", "es-MX")).toBe("noviembre");
    expect(getMonthName(11, "long", "es-MX")).toBe("diciembre");
  });
  test("should return month name in Spanish short format", () => {
    expect(getMonthName(0, "short", "es-MX")).toBe("ene");
    expect(getMonthName(1, "short", "es-MX")).toBe("feb");
    expect(getMonthName(2, "short", "es-MX")).toBe("mar");
    expect(getMonthName(3, "short", "es-MX")).toBe("abr");
    expect(getMonthName(4, "short", "es-MX")).toBe("may");
    expect(getMonthName(5, "short", "es-MX")).toBe("jun");
    expect(getMonthName(6, "short", "es-MX")).toBe("jul");
    expect(getMonthName(7, "short", "es-MX")).toBe("ago");
    expect(getMonthName(8, "short", "es-MX")).toBe("sept");
    expect(getMonthName(9, "short", "es-MX")).toBe("oct");
    expect(getMonthName(10, "short", "es-MX")).toBe("nov");
    expect(getMonthName(11, "short", "es-MX")).toBe("dic");
  });
  test("should return month name in Spanish narrow format", () => {
    expect(getMonthName(0, "narrow", "es-MX")).toBe("E");
    expect(getMonthName(1, "narrow", "es-MX")).toBe("F");
    expect(getMonthName(2, "narrow", "es-MX")).toBe("M");
    expect(getMonthName(3, "narrow", "es-MX")).toBe("A");
    expect(getMonthName(4, "narrow", "es-MX")).toBe("M");
    expect(getMonthName(5, "narrow", "es-MX")).toBe("J");
    expect(getMonthName(6, "narrow", "es-MX")).toBe("J");
    expect(getMonthName(7, "narrow", "es-MX")).toBe("A");
    expect(getMonthName(8, "narrow", "es-MX")).toBe("S");
    expect(getMonthName(9, "narrow", "es-MX")).toBe("O");
    expect(getMonthName(10, "narrow", "es-MX")).toBe("N");
    expect(getMonthName(11, "narrow", "es-MX")).toBe("D");
  });
});

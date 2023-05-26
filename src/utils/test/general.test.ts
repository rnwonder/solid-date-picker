import { describe, expect, test } from "vitest";
import {
  checkIfItsTodayDate,
  convertDateObjectToDate,
  convertDateToDateObject,
  formatDateObject,
  getMonthName,
  getToday,
  isBeforeDate,
} from "../general";

describe("convertDateObjectToDate", () => {
  test("should return Date from date object", () => {
    const date = { day: 1, month: 1, year: 2021 };
    expect(convertDateObjectToDate(date)).toMatchInlineSnapshot(

    '2021-01-31T23:00:00.000Z');
  });
});

describe("convertDateToDateObject", () => {
  test("should return date object from Date", () => {
    const date = new Date(2021, 1, 1);
    expect(convertDateToDateObject(date)).toMatchInlineSnapshot(`
      {
        "day": 1,
        "month": 1,
        "year": 2021,
      }
    `);
  });
});

describe("checkIfItsTodayDate", () => {
  test("should return true if date is today", () => {
    const today = new Date();
    expect(
      checkIfItsTodayDate(today)
    ).toBe(true);
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

describe("formatDateObject", () => {
  test("should return date object in short format", () => {
    const date = {
      day: 1,
      month: 1,
      year: 2021,
    };
    expect(formatDateObject(date)).toMatchInlineSnapshot('"Feb 1, 2021"');
  });
  test("should return date object in long format", () => {
    const date = {
      day: 1,
      month: 1,
      year: 2021,
    };
    expect(
      formatDateObject(date, {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
    ).toMatchInlineSnapshot('"February 01, 2021"');
  });
});

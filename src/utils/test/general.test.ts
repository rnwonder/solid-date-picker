import { describe, expect, test } from "vitest";
import {
  checkIfItsTodayDate,
  convertDateObjectToDate,
  convertDateToDateObject,
  getToday,
  isBeforeDate,
} from "../general";

describe("convertDateObjectToDate", () => {
  test("should return Date from date object", () => {
    const date = { day: 1, month: 1, year: 2021 };
    expect(convertDateObjectToDate(date)).toMatchInlineSnapshot(
      "2021-01-31T23:00:00.000Z"
    );
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
      checkIfItsTodayDate({
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
      })
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

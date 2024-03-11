import { describe, expect, test } from "vitest";
import {
  convertDateObjectToDate,
  convertDateToDateObject,
  formatDate,
} from "../format";

describe("convertDateObjectToDate", () => {
  test("should return Date from date object", () => {
    const date = { day: 1, month: 1, year: 2021 };
    /* EDIT - adjusted to allow test to correctly pass for any timezone */
    const timeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
    const convertedDate = convertDateObjectToDate(date);
    const tzAdjDate = new Date(convertedDate.getTime() - timeZoneOffset);
    expect(tzAdjDate).toMatchInlineSnapshot("2021-02-01T00:00:00.000Z");
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

describe("formatDate", () => {
  test("should return string in short format", () => {
    const date = {
      day: 1,
      month: 1,
      year: 2021,
    };
    expect(formatDate(date)).toMatchInlineSnapshot('"Feb 1, 2021"');
  });

  test("should return string in long format", () => {
    const date = {
      day: 1,
      month: 1,
      year: 2021,
    };
    expect(
      formatDate(date, {
        localeOptions: {
          year: "numeric",
          month: "long",
          day: "2-digit",
        },
      }),
    ).toMatchInlineSnapshot('"February 01, 2021"');
  });

  /* Tests for date formatting in UK locale */
  test("should return string in the UK short format", () => {
    const date = {
      day: 1,
      month: 1,
      year: 2021,
    };
    expect(
      formatDate(date, {
        locale: "en-GB",
      }),
    ).toMatchInlineSnapshot('"1 Feb 2021"');
  });

  test("should return string in the UK long format", () => {
    const date = {
      day: 1,
      month: 1,
      year: 2021,
    };
    expect(
      formatDate(date, {
        locale: "en-GB",
        localeOptions: { dateStyle: "long" },
      }),
    ).toMatchInlineSnapshot('"1 February 2021"');
  });

  test("should return string in the UK full format", () => {
    const date = {
      day: 1,
      month: 1,
      year: 2021,
    };
    expect(
      formatDate(date, {
        locale: "en-GB",
        localeOptions: { dateStyle: "full" },
      }),
    ).toMatchInlineSnapshot('"Monday, 1 February 2021"');
  });

  /* Tests for date formatting in Spanish */
  test("should return string in Spanish short format", () => {
    const date = {
      day: 1,
      month: 1,
      year: 2021,
    };
    expect(
      formatDate(date, {
        locale: "es-MX",
      }),
    ).toMatchInlineSnapshot('"1 feb 2021"');
  });

  test("should return string in Spanish long format", () => {
    const date = {
      day: 1,
      month: 1,
      year: 2021,
    };
    expect(
      formatDate(date, {
        locale: "es-MX",
        localeOptions: { dateStyle: "long" },
      }),
    ).toMatchInlineSnapshot('"1 de febrero de 2021"');
  });

  test("should return string in Spanish full format", () => {
    const date = {
      day: 1,
      month: 1,
      year: 2021,
    };
    expect(
      formatDate(date, {
        locale: "es-MX",
        localeOptions: { dateStyle: "full" },
      }),
    ).toMatchInlineSnapshot('"lunes, 1 de febrero de 2021"');
  });

  /* Tests for date formatting in French */
  test("should return string in French short format", () => {
    const date = {
      day: 1,
      month: 1,
      year: 2021,
    };
    expect(
      formatDate(date, {
        locale: "fr-FR",
      }),
    ).toMatchInlineSnapshot('"1 févr. 2021"');
  });

  /* Tests for date formatting with format string */
  test("should return string in format string `d dd D DD DDD`", () => {
    const date = {
      day: 1,
      month: 1,
      year: 2021,
    };
    expect(
      formatDate(date, {
        format: "d dd D DD DDD m",
      }),
    ).toMatchInlineSnapshot('"1 01 M Mon Monday 2"');
  });

  test("should return string in format string `m mm M MM MMM`", () => {
    const date = {
      day: 1,
      month: 1,
      year: 2021,
    };
    expect(
      formatDate(date, {
        format: "m mm M MM MMM",
      }),
    ).toMatchInlineSnapshot('"2 02 F Feb February"');
  });

  test("should return string in format string `yy yyyy`", () => {
    const date = new Date("2021 2 1");
    expect(
      formatDate(date, {
        format: "yy yyyy",
      }),
    ).toMatchInlineSnapshot('"21 2021"');
  });

  test("should return string in format string `dd/mm/yy`", () => {
    const date = "2021 12 1";
    expect(
      formatDate(date, {
        format: "dd/MMM/yy",
      }),
    ).toMatchInlineSnapshot('"01/December/21"');
  });

  test("should return string in format string `dd/mm/yy`", () => {
    const date = "2021 12 12";
    expect(
      formatDate(date, {
        format: "dd/mm/yy",
      }),
    ).toMatchInlineSnapshot('"12/12/21"');
  });

  test("should return string in format string `DDD - MMM - yyyy` in Spanish", () => {
    const date = 1612134000000;
    expect(
      formatDate(date, {
        format: "DDD - MMM - yyyy",
        locale: "es-MX",
      }),
    ).toMatchInlineSnapshot('"lunes - febrero - 2021"');
  });
});

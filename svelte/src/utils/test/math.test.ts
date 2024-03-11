import { describe, expect, test } from "vitest";
import DateMath from "../../../../solidjs/src/utils/math";

describe("DateMath.diff", () => {
  test("should return the difference between two dates in milliseconds", () => {
    const date1 = "2017-02-13";
    const date2 = "2018-03-13";

    const date1Set = DateMath.set(date1);
    const date2Set = DateMath.set(date2);

    expect(date2Set.diff(date1Set)).toMatchInlineSnapshot(`
      {
        "milliseconds": 33955200000,
      }
    `);
  });
  test("should return the difference between two dates in seconds", () => {
    const date1 = "2017-02-13";
    const date2 = "2018-03-13";

    const date1Set = DateMath.set(date1);
    const date2Set = DateMath.set(date2);

    expect(date2Set.diff(date1Set, ["seconds"])).toMatchInlineSnapshot(`
      {
        "seconds": 33955200,
      }
    `);
  });
  test("should return the difference between two dates in hours", () => {
    const date1 = "2017-02-13";
    const date2 = "2018-03-13";

    const date1Set = DateMath.set(date1);
    const date2Set = DateMath.set(date2);

    expect(date2Set.diff(date1Set, ["hours"])).toMatchInlineSnapshot(`
      {
        "hours": 9432,
      }
    `);
  });
  test("should return the difference between two dates in days", () => {
    const date1 = "2017-02-13";
    const date2 = "2018-03-13";

    const date1Set = DateMath.set(date1);
    const date2Set = DateMath.set(date2);

    expect(date2Set.diff(date1Set, ["days"])).toMatchInlineSnapshot(`
      {
        "days": 393,
      }
    `);
  });
  test("should return the difference between two dates in weeks", () => {
    const date1 = "2017-02-13";
    const date2 = "2018-03-13";

    const date1Set = DateMath.set(date1);
    const date2Set = DateMath.set(date2);

    expect(date2Set.diff(date1Set, ["weeks"])).toMatchInlineSnapshot(`
      {
        "weeks": 56.142857142857146,
      }
    `);
  });
  test("should return the difference between two dates in months", () => {
    const date1 = "2017-02-13";
    const date2 = "2018-03-13";

    const date1Set = DateMath.set(date1);
    const date2Set = DateMath.set(date2);

    expect(date2Set.diff(date1Set, ["months"])).toMatchInlineSnapshot(`
      {
        "months": 13,
      }
    `);
  });
  test("should return the difference between two dates in quarters", () => {
    const date1 = "2017-02-13";
    const date2 = "2018-03-13";

    const date1Set = DateMath.set(date1);
    const date2Set = DateMath.set(date2);

    expect(date2Set.diff(date1Set, ["quarters"])).toMatchInlineSnapshot(`
      {
        "quarters": 4.333333333333333,
      }
    `);
  });
  test("should return the difference between two dates in years", () => {
    const date1 = "2017-02-13";
    const date2 = "2018-03-13";

    const date1Set = DateMath.set(date1);
    const date2Set = DateMath.set(date2);

    expect(date2Set.diff(date1Set, ["years"])).toMatchInlineSnapshot(`
      {
        "years": 1.0833333333333333,
      }
    `);
  });
  test("should return the difference between two dates in all", () => {
    const date1 = "2017-02-13";
    const date2 = "2018-03-13";

    const date1Set = DateMath.set(date1);
    const date2Set = DateMath.set(date2);

    expect(
      date2Set.diff(date1Set, [
        "milliseconds",
        "seconds",
        "minutes",
        "hours",
        "days",
        "weeks",
        "quarters",
        "years",
      ]),
    ).toMatchInlineSnapshot(`
      {
        "days": 393,
        "hours": 9432,
        "milliseconds": 33955200000,
        "minutes": 565920,
        "quarters": 4.333333333333333,
        "seconds": 33955200,
        "weeks": 56.142857142857146,
        "years": 1.0833333333333333,
      }
    `);
  });
});

describe("DateMath.plus", () => {
  test("Add 2 days to a given date and return date in ISO string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(DateMath.set(date).plus({ day: 2 }).toISO()).toMatchInlineSnapshot(
      '"2023-02-15T23:00:00.000Z"',
    );
  });

  test("Add 2 days to a given date and return date in object", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(DateMath.set(date).plus({ day: 2 }).toObject())
      .toMatchInlineSnapshot(`
      {
        "day": 16,
        "month": 1,
        "year": 2023,
      }
    `);
  });

  test("Add 2 days to a given date and return date in millisecond string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date).plus({ day: 2 }).toMillis(),
    ).toMatchInlineSnapshot("1676502000000");
  });

  test("Add 2 days to a given date and return date in JSDate string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(DateMath.set(date).plus({ day: 2 }).toJSDate()).toBeInstanceOf(Date);
  });

  test("Add 2 days to a given date and return date in string format string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date).plus({ day: 2 }).toString(),
    ).toMatchInlineSnapshot('"Feb 16, 2023"');
  });
  test("Add 2 years to a given date and return date in string format string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date).plus({ year: 2 }).toString(),
    ).toMatchInlineSnapshot('"Feb 14, 2025"');
  });
  test("Add 2 months to a given date and return date in string format string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date).plus({ month: 2 }).toString(),
    ).toMatchInlineSnapshot('"Apr 14, 2023"');
  });
  test("Add 24 hours to a given date and return date in string format string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date).plus({ hour: 24 }).toString(),
    ).toMatchInlineSnapshot('"Feb 15, 2023"');
  });
  test("Add 1440 minutes to a given date and return date in string format string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date).plus({ minute: 1440 }).toString(),
    ).toMatchInlineSnapshot('"Feb 15, 2023"');
  });

  test("Add 86400 seconds to a given date and return date in string format string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date)
        .plus({ second: 86400 })
        .toString({ format: "DDD, MMM dd yyyy" }),
    ).toMatchInlineSnapshot('"Wednesday, February 15 2023"');
  });

  test("Add 2 years, 2 months, 2 days, 24 hours, 1440 minutes and 86400 seconds to a given date and return date in string format string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date)
        .plus({
          year: 2,
          month: 2,
          day: 2,
          hour: 24,
          minute: 1440,
          second: 86400,
        })
        .toString(),
    ).toMatchInlineSnapshot('"Apr 19, 2025"');
  });
});

describe("DateMath.minus", () => {
  test("Subtract 2 days to a given date and return date in ISO string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(DateMath.set(date).minus({ day: 2 }).toISO()).toMatchInlineSnapshot(
      '"2023-02-11T23:00:00.000Z"',
    );
  });

  test("Subtract 2 days to a given date and return date in object string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(DateMath.set(date).minus({ day: 2 }).toObject())
      .toMatchInlineSnapshot(`
          {
            "day": 12,
            "month": 1,
            "year": 2023,
          }
        `);
  });

  test("Subtract 2 days to a given date and return date in millisecond string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date).minus({ day: 2 }).toMillis(),
    ).toMatchInlineSnapshot("1676156400000");
  });

  test("Subtract 2 days to a given date and return date in string format string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date).minus({ day: 2 }).toString(),
    ).toMatchInlineSnapshot('"Feb 12, 2023"');
  });
  test("Subtract 2 years to a given date and return date in string format string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date).minus({ year: 2 }).toString(),
    ).toMatchInlineSnapshot('"Feb 14, 2021"');
  });
  test("Subtract 2 months to a given date and return date in string format string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date).minus({ month: 2 }).toString(),
    ).toMatchInlineSnapshot('"Dec 14, 2022"');
  });
  test("Subtract 24 hours to a given date and return date in string format string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date).minus({ hour: 24 }).toString(),
    ).toMatchInlineSnapshot('"Feb 13, 2023"');
  });
  test("Subtract 1440 minutes to a given date and return date in string format string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date).minus({ minute: 1440 }).toString(),
    ).toMatchInlineSnapshot('"Feb 13, 2023"');
  });

  test("Subtract 86400 seconds to a given date and return date in string format string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date).minus({ second: 86400 }).toString(),
    ).toMatchInlineSnapshot('"Feb 13, 2023"');
  });

  test("Subtract 2 years, 2 months, 2 days, 24 hours, 1440 minutes and 86400 seconds to a given date and return date in string format string", () => {
    const date = { month: 1, day: 14, year: 2023 };

    expect(
      DateMath.set(date)
        .minus({
          year: 2,
          month: 2,
          day: 2,
          hour: 24,
          minute: 1440,
          second: 86400,
        })
        .toString({ localeOptions: { dateStyle: "full" } }),
    ).toMatchInlineSnapshot('"Wednesday, December 9, 2020"');
  });
});

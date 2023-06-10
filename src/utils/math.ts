import {
  DateMathDiff,
  DateMathDiffUnit,
  DateOption,
  DateTimeObject,
  Locale,
  LocaleOptions,
} from "../interface/general";
import {
  convertDateToDateObject,
  getJSDateFormat,
  labelFormat,
} from "./format";

class DateMath {
  private readonly date: Date;

  private constructor(date: Date) {
    this.date = date;
  }

  static set(date: DateOption) {
    const formattedDate = getJSDateFormat(date);
    return new DateMath(formattedDate);
  }

  plus(options: DateTimeObject): DateMath {
    const {
      day = 0,
      month = 0,
      year = 0,
      hour = 0,
      minute = 0,
      second = 0,
    } = options;
    const newDate = new Date(this.date.getTime());

    if (year) newDate.setUTCFullYear(newDate.getUTCFullYear() + year);
    if (month) newDate.setUTCMonth(newDate.getUTCMonth() + month);
    if (day) newDate.setUTCDate(newDate.getUTCDate() + day);
    if (hour) newDate.setUTCHours(newDate.getUTCHours() + hour);
    if (minute) newDate.setUTCMinutes(newDate.getUTCMinutes() + minute);
    if (second) newDate.setUTCSeconds(newDate.getUTCSeconds() + second);

    return new DateMath(newDate);
  }

  minus(options: DateTimeObject): DateMath {
    const {
      day = 0,
      month = 0,
      year = 0,
      hour = 0,
      minute = 0,
      second = 0,
    } = options;
    const newDate = new Date(this.date.getTime());

    if (year) newDate.setUTCFullYear(newDate.getUTCFullYear() - year);
    if (month) newDate.setUTCMonth(newDate.getUTCMonth() - month);
    if (day) newDate.setUTCDate(newDate.getUTCDate() - day);
    if (hour) newDate.setUTCHours(newDate.getUTCHours() - hour);
    if (minute) newDate.setUTCMinutes(newDate.getUTCMinutes() - minute);
    if (second) newDate.setUTCSeconds(newDate.getUTCSeconds() - second);

    return new DateMath(newDate);
  }

  diffNow(units?: DateMathDiffUnit[]) {
    return this.diff(new DateMath(new Date()), units);
  }

  diff(
    other: DateMath,
    units: DateMathDiffUnit[] = ["milliseconds"]
  ): DateMathDiff {
    const diffTime = this.date.getTime() - other.date.getTime();
    const diffObject: DateMathDiff = {};

    const milliseconds = Math.abs(diffTime);

    if (units.includes("milliseconds")) {
      diffObject["milliseconds"] = milliseconds;
    }
    if (units.includes("seconds")) {
      diffObject["seconds"] = milliseconds / 1000;
    }
    if (units.includes("minutes")) {
      diffObject["minutes"] = milliseconds / (1000 * 60);
    }
    if (units.includes("hours")) {
      diffObject["hours"] = milliseconds / (1000 * 60 * 60);
    }
    if (units.includes("days")) {
      diffObject["days"] = milliseconds / (1000 * 60 * 60 * 24);
    }
    if (units.includes("weeks")) {
      diffObject["weeks"] = milliseconds / (1000 * 60 * 60 * 24 * 7);
    }
    if (units.includes("months")) {
      diffObject["months"] =
        (this.date.getUTCFullYear() - other.date.getUTCFullYear()) * 12 +
        (this.date.getUTCMonth() - other.date.getUTCMonth());
    }
    if (units.includes("quarters")) {
      diffObject["quarters"] =
        (diffObject["months"] ??
          (this.date.getUTCFullYear() - other.date.getUTCFullYear()) * 12 +
            (this.date.getUTCMonth() - other.date.getUTCMonth())) / 3;
    }
    if (units.includes("years")) {
      diffObject["years"] =
        (diffObject["months"] ??
          (this.date.getUTCFullYear() - other.date.getUTCFullYear()) * 12 +
            (this.date.getUTCMonth() - other.date.getUTCMonth())) / 12;
    }

    return diffObject;
  }

  toString(options?: {
    format?: string;
    localeOptions?: LocaleOptions;
    locale?: Locale;
  }) {
    const { localeOptions, locale, format } = options || {};
    return labelFormat({
      date: this.date,
      option: localeOptions || {
        month: "short",
        day: "numeric",
        year: "numeric",
      },
      locale,
      format,
    });
  }

  toObject() {
    return convertDateToDateObject(this.date);
  }

  toJSDate() {
    return this.date;
  }

  toMillis() {
    return this.date.getTime();
  }

  toISO() {
    return this.date.toISOString();
  }
}

export default DateMath;


const date = { month: 1, day: 14, year: 2023 };
const kk = DateMath.set(date).minus({ second: 86400 }).toString()

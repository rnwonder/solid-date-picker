import { leadingZeros } from "./time";
import {
  DateObjectUnits,
  DateOption,
  Locale,
  LocaleOptions,
  MakeOptionalRequired,
} from "./types";

export const formatDateWithString = (
  dateToFormat: Date | DateObjectUnits,
  format: string,
  locale: Locale = "en-US",
) => {
  const date = getJSDateFormat(dateToFormat);

  format = format
    .replace(
      /(?<!~)(?<!y)yyyy(?!y)/g,
      date.toLocaleString(locale, { year: "numeric" }),
    )
    .replace(
      /(?<!~)(?<!y)yy(?!y)/g,
      date.toLocaleString(locale, { year: "2-digit" }),
    )
    .replace(
      /(?<!~)(?<!m)m(?!m)/g,
      date.toLocaleString(locale, { month: "numeric" }),
    )
    .replace(
      /(?<!~)(?<!m)mm(?!m)/g,
      date.toLocaleString(locale, { month: "2-digit" }),
    )
    .replace(
      /(?<!~)(?<!d)dd(?!d)/g,
      date.toLocaleString(locale, { day: "2-digit" }),
    )
    .replace(
      /(?<!~)(?<!d)d(?!d)/g,
      date.toLocaleString(locale, { day: "numeric" }),
    )
    .replace(
      /(?<!~)(?<!D)DDD(?!D)/g,
      checkIfItStartsWithM(date.toLocaleString(locale, { weekday: "long" })),
    )
    .replace(
      /(?<!~)(?<!D)DD(?!D)/g,
      checkIfItStartsWithM(date.toLocaleString(locale, { weekday: "short" })),
    )
    .replace(
      /(?<!~)(?<!D)D(?!D)/g,
      checkIfItStartsWithM(date.toLocaleString(locale, { weekday: "narrow" })),
    )
    .replace(
      /(?<!~)(?<!M)MMM(?!M)/g,
      date.toLocaleString(locale, { month: "long" }),
    )
    .replace(
      /(?<!~)(?<!M)MM(?!M)/g,
      date.toLocaleString(locale, { month: "short" }),
    )
    .replace(
      /(?<!~)(?<!M)M(?!M)/g,
      date.toLocaleString(locale, { month: "narrow" }),
    )

    .replace(/~y/g, "y")
    .replace(/~m/g, "m")
    .replace(/~M/g, "M")
    .replace(/~d/g, "d")
    .replace(/~D/g, "D");
  return format;
};

export const getJSDateFormat = (date: DateOption): Date => {
  let newDate: Date;

  if (typeof date === "string" || typeof date === "number") {
    newDate = new Date(date);
  } else if (date instanceof Date) {
    newDate = date;
  } else {
    newDate = new Date(
      date.year || 2023,
      !date.month && date.month !== 0 ? 1 : date.month,
      date.day,
    );
  }
  return newDate;
};

export const convertDateToDateObject = (
  date: Date,
): MakeOptionalRequired<DateObjectUnits> => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return {
    year,
    month,
    day,
  };
};

export const convertDateObjectToDate = (date: DateObjectUnits): Date => {
  const now = new Date();
  const year = date?.year ?? now.getFullYear();
  const month = date?.month === 0 ? 0 : date?.month ?? now.getMonth();
  const day = date?.day ?? now.getDate();
  return new Date(year, month, day);
};

export const formatDate = (
  date: DateOption,
  options?: {
    localeOptions?: LocaleOptions;
    locale?: Locale;
    format?: string;
  },
) => {
  const { localeOptions, locale, format } = options || {};
  const newDate = getJSDateFormat(date);
  return labelFormat({
    date: newDate,
    option: localeOptions || {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
    locale,
    format,
  });
};

export const labelFormat = ({
  format,
  option,
  date,
  locale,
}: {
  date: Date;
  format?: string;
  option: LocaleOptions;
  locale?: Locale;
}) => {
  return format
    ? formatDateWithString(date, format, locale)
    : date.toLocaleDateString(locale ?? "en-US", option);
};

const checkIfItStartsWithM = (string: string) => {
  if (string.startsWith("M")) {
    return "~" + string;
  } else {
    return string;
  }
};

export const formatHourWithLeadingZero = (hour?: number) => {
  return hour === 0 ? 12 : hour !== undefined ? leadingZeros(hour) : "";
};

export const formatMinuteSecondWithLeadingZero = (minSec?: number) => {
  return minSec !== undefined ? leadingZeros(minSec) : "";
};

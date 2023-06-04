import {
  DateObjectUnits,
  DateOption,
  Locale,
  LocaleOptions,
} from "../interface/general";

export const formatDateWithString = (
  dateToFormat: Date | DateObjectUnits,
  format: string,
  locale: Locale = "en-US"
) => {
  const date = getJSDateFormat(dateToFormat);
  if (!date) return "";
  format = format
    .replace(
      /(?<!~)(?<!y)yyyy(?!y)/g,
      date.toLocaleString(locale, { year: "numeric" })
    )
    .replace(
      /(?<!~)(?<!y)yy(?!y)/g,
      date.toLocaleString(locale, { year: "2-digit" })
    )
    .replace(
      /(?<!~)(?<!m)m(?!m)/g,
      date.toLocaleString(locale, { month: "numeric" })
    )
    .replace(
      /(?<!~)(?<!m)mm(?!m)/g,
      date.toLocaleString(locale, { month: "2-digit" })
    )
    .replace(
      /(?<!~)(?<!M)M(?!M)/g,
      date.toLocaleString(locale, { month: "narrow" })
    )
    .replace(
      /(?<!~)(?<!M)MM(?!M)/g,
      date.toLocaleString(locale, { month: "short" })
    )
    .replace(
      /(?<!~)(?<!M)MMM(?!M)/g,
      date.toLocaleString(locale, { month: "long" })
    )
    .replace(
      /(?<!~)(?<!d)dd(?!d)/g,
      date.toLocaleString(locale, { day: "2-digit" })
    )
    .replace(
      /(?<!~)(?<!d)d(?!d)/g,
      date.toLocaleString(locale, { day: "numeric" })
    )
    .replace(
      /(?<!~)(?<!D)DDD(?!D)/g,
      date.toLocaleString(locale, { weekday: "long" })
    )
    .replace(
      /(?<!~)(?<!D)DD(?!D)/g,
      date.toLocaleString(locale, { weekday: "short" })
    )
    .replace(
      /(?<!~)(?<!D)D(?!D)/g,
      date.toLocaleString(locale, { weekday: "narrow" })
    )
    .replace(/~y/g, "y")
    .replace(/~m/g, "m")
    .replace(/~M/g, "M")
    .replace(/~d/g, "d")
    .replace(/~D/g, "D");
  return format;
};

export const getJSDateFormat = (date: DateOption): Date | undefined => {
  let newDate: Date | undefined = undefined;

  if (typeof date === "string" || typeof date === "number") {
    newDate = new Date(date);
  }
  if (date instanceof Date) {
    newDate = date;
  }
  if (
    !(date instanceof Date) &&
    typeof date !== "string" &&
    typeof date !== "number"
  ) {
    newDate = new Date(date.year || 2023, date.month || 1, date.day);
  }

  if (typeof date === "string") {
    newDate = new Date(date);
  }

  if (typeof date === "number") {
    newDate = new Date(date);
  }

  return newDate;
};

export const convertDateToDateObject = (date: Date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };
};

export const convertDateObjectToDate = (date: DateObjectUnits) => {
  const now = new Date();
  return new Date(
    date?.year || now.getFullYear(),
    date?.month === 0 ? 0 : date?.month || now.getMonth(),
    date?.day || now.getDay()
  );
};

export const formatDate = (
  date: DateOption,
  options?: {
    localeOptions?: LocaleOptions;
    locale?: Locale;
    format?: string;
  }
) => {
  const { localeOptions, locale, format } = options || {};
  const newDate = getJSDateFormat(date);
  if (!newDate) return "";
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

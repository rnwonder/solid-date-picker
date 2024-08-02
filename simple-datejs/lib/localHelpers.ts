import { CustomAccessor } from "./generate";
import { Locale } from "./types";

export const getAccessorValue = <T>(accessor: CustomAccessor<T>): T => {
  return typeof accessor === "function" ? (accessor as () => T)() : accessor;
};

export const numberFormatter = (num: number, locale?: Locale) => {
  return new Intl.NumberFormat((locale as any) || "en-US", {
    useGrouping: false,
  }).format(num);
};

export const modifiedDate = (
  year: number,
  month: number,
  day: number | undefined,
) => {
  const result = new Date(year, month, day);
  result.setFullYear(year);
  return result;
};

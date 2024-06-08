import {
  Locale,
  MakeOptionalRequired,
  MonthDaysObject,
} from "../interface/general";
import { numberFormatter } from "@rnwonder/simple-datejs/datePicker";

export const convertFormattedNumberBackToNumber = (
  locale: Locale,
  value: MakeOptionalRequired<MonthDaysObject>,
): MonthDaysObject<number> => {
  // Helper function to convert a single character
  const convertDigit = (char: string): number => {
    if (!isNaN(Number(char))) {
      return Number(char);
    }

    for (let i = 0; i <= 9; i++) {
      if (numberFormatter(i, locale) === char) {
        return i;
      }
    }

    throw new Error(`Unrecognized digit '${char}' for locale '${locale}'`);
  };

  // Convert each character in the value string and combine them
  let numericValue = 0;
  let multiplier = 1;

  // Remove common thousands separators from the value string
  const cleanValue = value.value.replace(/[,٬.’  '\s]/g, "");

  for (let i = cleanValue.length - 1; i >= 0; i--) {
    const digit = convertDigit(cleanValue[i]);
    numericValue += digit * multiplier;
    multiplier *= 10;
  }

  return {
    ...value,
    value: numericValue,
  };
};

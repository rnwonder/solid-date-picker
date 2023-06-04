import {
  checkIfItsTodayDate,
  isBeforeDate,
} from "./general";
import {
  convertDateObjectToDate,
  convertDateToDateObject,
  formatDate,
} from "./format";

import {getMonthName, getToday} from "./generate";

export * from "./general";
export * from "./portal";
export * from "./format";
export * from "./generate"
export * from "./action";
export * from "./dayProps";

export const utils = () => ({
  getToday,
  convertDateObjectToDate,
  convertDateToDateObject,
  checkIfItsTodayDate,
  isBeforeDate,
  getMonthName,
  formatDate,
});

export {generateYearsArray} from "./generate";
export {getToday} from "./generate";
export {getMonthDaysArray} from "./generate";
export {handleDateRange} from "./action";
export {applyDateRangeProps} from "./dayProps";

import { checkIfItsTodayDate, isBeforeDate } from "./general";
import {
  convertDateObjectToDate,
  convertDateToDateObject,
  formatDate,
} from "./format";

import { getMonthName, getToday } from "./generate";

export * from "./general";
export * from "./portal";
export * from "./format";
export * from "./generate";
export * from "./action";
export * from "./dayProps";
export * from "./math";

export const utils = () => ({
  getToday,
  convertDateObjectToDate,
  convertDateToDateObject,
  checkIfItsTodayDate,
  isBeforeDate,
  getMonthName,
  formatDate,
});

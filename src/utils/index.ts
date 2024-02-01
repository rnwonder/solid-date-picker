import { checkIfItsTodayDate, isBeforeDate } from "./general";
import {
  convertDateObjectToDate,
  convertDateToDateObject,
  formatDate,
} from "./format";

import { clickOutside, getMonthName, getToday } from "./generate";

export * from "./general";
export * from "./portal";
export * from "./format";
export * from "./generate";
export * from "./action";
export * from "./dayProps";
export * from "./math";
export * from "./class";

export const utils = () => ({
  getToday,
  convertDateObjectToDate,
  convertDateToDateObject,
  checkIfItsTodayDate,
  isBeforeDate,
  getMonthName,
  formatDate,
  clickOutside,
});

import {
  checkIfItsTodayDate,
  getMonthName,
  getToday,
  isBeforeDate,
} from "./general";
import {
  convertDateObjectToDate,
  convertDateToDateObject,
  formatDate,
} from "./format";

export * from "./general";
export * from "./portal";
export * from "./format";

export const utils = () => ({
  getToday,
  convertDateObjectToDate,
  convertDateToDateObject,
  checkIfItsTodayDate,
  isBeforeDate,
  getMonthName,
  formatDate,
});

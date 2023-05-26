import {
  checkIfItsTodayDate,
  convertDateObjectToDate,
  convertDateToDateObject, formatDateObject,
  getMonthName,
  getToday,
  isBeforeDate,
} from "./general";

export * from "./general";
export * from "./portal";

export const utils = () => ({
  getToday,
  convertDateObjectToDate,
  convertDateToDateObject,
  checkIfItsTodayDate,
  isBeforeDate,
  getMonthName,
  formatDateObject,
});

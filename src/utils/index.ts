import {
  checkIfItsTodayDate,
  convertDateObjectToDate,
  convertDateToDateObject,
  getToday, isBeforeDate,
} from "./general";

export * from "./general";
export * from "./portal";



export const utils = () => ({
  getToday,
  convertDateObjectToDate,
  convertDateToDateObject,
  checkIfItsTodayDate,
  isBeforeDate,
});


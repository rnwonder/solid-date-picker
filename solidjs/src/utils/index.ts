import { checkIfItsTodayDate, isBeforeDate } from "./general";
import {
  convertDateObjectToDate,
  convertDateToDateObject,
  formatDate,
} from "../../../utils/format";

import { clickOutside, getMonthName, getToday } from "./generate";

export * from "./general";
export * from "./portal";
export * from "../../../utils/format";
export * from "./generate";
export * from "./action";
export * from "./dayProps";
export * from "../../../utils/math";
export * from "./class";
export * from "./selector";
export * from "../../../utils/time";

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

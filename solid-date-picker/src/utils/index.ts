import {
  clickOutside,
  getMonthName,
  getToday,
  isBeforeDate,
  formatDate,
  labelFormat,
  convertDateObjectToDate,
  convertDateToDateObject,
  checkIfItsTodayDate,
  convert12HourTo24Hour,
  convert24HourTo12Hour,
  getAmPm,
  getCurrentTime,
  getYearRange,
  smartDropDownPosition,
} from "@rnwonder/simple-datejs/utils";

const utils = () => ({
  clickOutside,
  getMonthName,
  getToday,
  isBeforeDate,
  formatDate,
  labelFormat,
  convertDateObjectToDate,
  convertDateToDateObject,
  checkIfItsTodayDate,
  convert12HourTo24Hour,
  convert24HourTo12Hour,
  getAmPm,
  getCurrentTime,
  getYearRange,
  smartDropDownPosition,
});

export * from "./portal";
export * from "./class";

export { utils };

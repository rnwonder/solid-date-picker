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
  smartDropDownPosition,
  leadingZeros,
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
  leadingZeros,
  getAmPm,
  getCurrentTime,
  smartDropDownPosition,
});

export * from "./portal";
export * from "./class";
export * from "./general";

export { utils };

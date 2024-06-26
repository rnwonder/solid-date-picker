import { exportUtils } from "./libExport";

const utils = exportUtils();

export const {
  getToday,
  convertDateObjectToDate,
  convertDateToDateObject,
  checkIfItsTodayDate,
  isBeforeDate,
  getMonthName,
  formatDate,
  clickOutside,
  convert24HourTo12Hour,
  getAmPm,
  convert12HourTo24Hour,
  getCurrentTime,
  smartDropDownPosition,
  labelFormat,
  leadingZeros,
} = utils;

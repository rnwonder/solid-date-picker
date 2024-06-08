import {
  checkIfItsTodayDate,
  clickOutside,
  getMonthName,
  getToday,
  isBeforeDate,
} from "./general";
import {
  convertDateObjectToDate,
  convertDateToDateObject,
  formatDate,
  labelFormat,
} from "./format";
import {
  convert12HourTo24Hour,
  convert24HourTo12Hour,
  getAmPm,
  getCurrentTime,
  leadingZeros,
} from "./time";
import { upgradedSmartDropDown } from "./portal";

export const exportUtils = () => ({
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
  smartDropDownPosition: upgradedSmartDropDown,
  labelFormat,
  leadingZeros,
});

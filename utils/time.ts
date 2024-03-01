import { TimeMeridiem } from "../solidjs/src/interface/general";

export const leadingZeros = (value: number, numberOfLeadingZero?: number) => {
  return String(Math.ceil(value)).padStart(numberOfLeadingZero ?? 2, "0");
};

export const convert24HourTo12Hour = (hour: number) => {
  if (hour === 0) {
    return 12;
  }
  if (hour === 12) {
    return 0;
  }
  if (hour > 12) {
    return hour - 12;
  }
  return hour;
};

export const getAmPm = (hour: number): TimeMeridiem => {
  return hour >= 12 ? "PM" : "AM";
};

export const convert12HourTo24Hour = (hour: number, meridiem: "AM" | "PM") => {
  if (meridiem === "AM") {
    return hour === 12 ? 0 : hour;
  }
  return hour === 0 ? 12 : hour === 12 ? hour : hour + 12;
};

export function getCurrentTime() {
  const date = new Date();
  let hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  let meridiem: TimeMeridiem = "AM";

  if (hour > 12) {
    hour -= 12;
    meridiem = "PM";
  }
  if (hour === 12) {
    meridiem = "PM";
  }
  if (hour === 0) {
    hour = 12;
  }
  return {
    hour: hour,
    minute: minute,
    second: second,
    meridiem,
  };
}

import { Accessor, createEffect, Setter } from "solid-js";
import { Locale, MonthDaysObject } from "../interface/general";
import {
  breakArrayIntoSubArrays,
  getMonthDaysArray,
} from "@rnwonder/simple-datejs/datePicker";

export const createDaysArray = (props: {
  month: () => number;
  year: () => number;
  weekStartDay?: number;
  locale: Locale;
  setDayRowsArray: Setter<MonthDaysObject<string>[][]>;
  dayRowsArray: Accessor<MonthDaysObject<string>[][]>;
}) => {
  createEffect(() => {
    const days = getMonthDaysArray(props.month(), props.year(), {
      weekStartDay: props.weekStartDay,
      locale: props.locale,
    });
    props.setDayRowsArray(breakArrayIntoSubArrays(days, 7));
  });

  return props.dayRowsArray;
};

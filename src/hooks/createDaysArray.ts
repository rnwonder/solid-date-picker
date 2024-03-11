import { createEffect, createSignal } from "solid-js";
import { MonthDaysObject } from "../interface/general";
import { breakArrayIntoSubArrays, getMonthDaysArray } from "../utils";

export const [dayRowsArray, setDayRowsArray] = createSignal<
  Array<Array<MonthDaysObject>>
>([]);

export const createDaysArray = (props: {
  month: () => number;
  year: () => number;
  weekStartDay?: number;
}) => {
  createEffect(() => {
    const days = getMonthDaysArray(props.month(), props.year(), {
      weekStartDay: props.weekStartDay,
    });
    setDayRowsArray(breakArrayIntoSubArrays(days, 7));
  });

  return dayRowsArray;
};

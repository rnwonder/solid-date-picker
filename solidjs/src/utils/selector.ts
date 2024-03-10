import { Accessor, Setter } from "solid-js";
import { isNotPartOfEnabledDays } from "./general";
import {
  DateArray,
  DateObjectUnits,
  DatePickerOnChange,
  MakeOptionalRequired,
} from "../interface/general";
import { getOnChangeSingleData } from "./generate";

export const isOptionSelectedOnSelector = (
  value: string,
  index: Accessor<number>,
  props: {
    useValueAsName?: boolean;
    option?: Accessor<number>;
  },
): boolean => {
  return props.useValueAsName
    ? props.option?.() === Number(value)
    : props.option?.() === index();
};

export const isOptionDisabledOnSelector = (
  value: string,
  index: Accessor<number>,
  props: {
    useValueAsName?: boolean;
    minDate?: MakeOptionalRequired<DateObjectUnits>;
    maxDate?: MakeOptionalRequired<DateObjectUnits>;
    enabledDays?: DateArray[];
    year?: Accessor<number>;
  },
): boolean => {
  // year
  if (props.useValueAsName) {
    if (props.minDate || props.maxDate) {
      return (
        (props.minDate?.year ? Number(value) < props.minDate?.year : false) ||
        (props.maxDate?.year ? Number(value) > props.maxDate?.year : false)
      );
    }

    if (props.enabledDays) {
      return props.enabledDays.every((enabled) => {
        if ("start" in enabled && "end" in enabled) {
          return (
            enabled.start.year !== Number(value) ||
            enabled.end.year !== Number(value)
          );
        }
        return enabled.year !== Number(value);
      });
    }
  } else {
    // month
    if (props.minDate || props.maxDate) {
      return (
        (props.minDate
          ? (props.minDate.year === props.year?.() &&
              index() < props.minDate.month) ||
            props.minDate?.year > (props.year?.() || 0)
          : false) ||
        (props.maxDate
          ? props.maxDate.year === props.year?.() &&
            index() > props.maxDate.month
          : false)
      );
    }

    if (props.enabledDays && props.year?.()) {
      return isNotPartOfEnabledDays({
        year: props.year?.(),
        month: index(),
        enabledDays: props.enabledDays,
      });
    }
  }
  return false;
};

export const handleSelectorOptionClick = (
  index: number,
  value: string,
  props: {
    useValueAsName?: boolean;
    setOption?: Setter<number>;
    onYearChange?: (year: number) => void;
    onMonthChange?: (month: number) => void;
    onChange?: (data: DatePickerOnChange) => void;
    startDay?: DateObjectUnits;
    type?: "single" | "multiple" | "range";
  },
  callback?: () => void,
) => {
  if (props.useValueAsName) {
    const year = Number(value);
    props.setOption?.(year);
    props.onYearChange?.(year);
    const changeData = getOnChangeSingleData({
      startDay: props.startDay,
      year: year,
      type: props.type || "single",
    });
    if (changeData) {
      props.onChange?.(changeData);
    }
  } else {
    props.setOption?.(index);
    props.onMonthChange?.(index);
    const changeData = getOnChangeSingleData({
      startDay: props.startDay,
      month: index,
      type: props.type || "single",
    });
    if (changeData) {
      props.onChange?.(changeData);
    }
  }
  callback?.();
};

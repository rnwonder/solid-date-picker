import {
  CustomAccessor,
  CustomSetter,
  getOnChangeSingleData,
} from "./generate";
import { isNotPartOfEnabledDays } from "./general";
import {
  DateArray,
  DateObjectUnits,
  DatePickerOnChange,
  MakeOptionalRequired,
} from "./types";
import { getAccessorValue } from "./localHelpers";

export const isOptionSelectedOnSelector = (
  value: string,
  index: CustomAccessor<number>,
  props: {
    useValueAsName?: boolean;
    option?: CustomAccessor<number>;
  },
): boolean => {
  return props.useValueAsName
    ? getAccessorValue(props.option) === Number(value)
    : getAccessorValue(props.option) === getAccessorValue(index);
};

export const isOptionDisabledOnSelector = (
  value: string,
  index: CustomAccessor<number>,
  props: {
    useValueAsName?: boolean;
    minDate?: MakeOptionalRequired<DateObjectUnits>;
    maxDate?: MakeOptionalRequired<DateObjectUnits>;
    enabledDays?: DateArray[];
    year?: CustomAccessor<number>;
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
          ? (props.minDate.year === getAccessorValue(props.year) &&
              getAccessorValue(index) < props.minDate.month) ||
            props.minDate?.year > (getAccessorValue(props.year) || 0)
          : false) ||
        (props.maxDate
          ? props.maxDate.year === getAccessorValue(props.year) &&
            getAccessorValue(index) > props.maxDate.month
          : false)
      );
    }

    if (props.enabledDays && getAccessorValue(props.year)) {
      return isNotPartOfEnabledDays({
        year: getAccessorValue(props.year)!,
        month: getAccessorValue(index),
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
    setOption?: CustomSetter<number>;
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

# @rnwonder/solid-date-picker

A simple and reusable Datepicker component for SolidJS ([Demo](https://stackblitz.com/edit/solidjs-templates-dof6jl?file=src%2FApp.tsx))

![Screenshot 2023-05-20 084944.jpg](https://res.cloudinary.com/dfbebf7x0/image/upload/v1684569302/Screenshot_2023-05-20_085338_ruwgsx.jpg)
![Screenshot 2023-05-20 084944.jpg](https://res.cloudinary.com/dfbebf7x0/image/upload/v1684569301/Screenshot_2023-05-20_085412_imossu.jpg)

## Installation

```bash
npm i @rnwonder/solid-date-picker
yarn add @rnwonder/solid-date-picker
pnpm add @rnwonder/solid-date-picker
```

This package depends on `solid-js` so you need to have it installed

## Usage

```tsx
import "@rnwonder/solid-date-picker/dist/index.css";
import DatePicker, {
  IDatePickerInputDataValue,
} from "@rnwonder/solid-date-picker";

const App = () => {
  const [value, setValue] = createSignal<IDatePickerInputDataValue>({
    value: {},
    label: "",
  });

  return (
    <DatePicker
      value={value}
      setValue={setValue}
      onChange={(data) => {
        if (data.type === "range") {
          console.log(data.startDate, data.endDate);
        }
        if (data.type === "single") {
          console.log(data.selectedDate);
        }
      }}
    />
  );
};
```

### Datepicker Props

Scroll down to see the relevant types

| Props                            | Type                                  | Default                                            | Description                                                                                                                     |
|----------------------------------| ------------------------------------- | -------------------------------------------------- |---------------------------------------------------------------------------------------------------------------------------------|
| `afterNextButtonAreaJSX`         | `IRenderJSX`                          | `undefined`                                        | This allows you pass in JSX after the next button                                                                               |
| `beforePrevButtonAreaJSX`        | `IRenderJSX`                          | `undefined`                                        | This allows you pass in JSX before the previous button                                                                          |
| `calendarBottomAreaJSX`          | `IRenderJSX`                          | `undefined`                                        | This allow you to add JSX below the calendar area                                                                               |
| `calendarJSX`                    | `IRenderJSX`                          | `undefined`                                        | This allow you to replace the default calendar area with your JSX                                                               |
| `calendarLeftAreaJSX`            | `IRenderJSX`                          | `undefined`                                        | This allow you to add JSX to the left of the calendar area                                                                      |
| `calendarRightAreaJSX`           | `IRenderJSX`                          | `undefined`                                        | This allow you to add JSX to the right of the calendar area                                                                     |
| `calendarTopAreaJSX`             | `IRenderJSX`                          | `undefined`                                        | This allow you to add JSX above the calendar area. Note this replaces the existing top area                                     |
| `calendarPositionX`              | `"left" \| "right" \| "center"`       | `center`                                           | This allows you set the horizontal position of the datepicker                                                                   |
| `calendarPositionY`              | `"top" \| "bottom" \| "auto"`         | `auto`                                             | This allows you set the vertical position of the datepicker                                                                     |
| `componentsToAllowOutsideClick`  | `Array<HTMLElement>`                  | `undefined`                                        | For elements outside the datepicker that you want to allow to be clicked when the datepicker is showing/open without closing it |
| `hideTopArea`                    | `boolean`                             | `undefined`                                        | This allows you to hide the top part of the datepicker                                                                          |
| `locale`                         | `Intl.LocalesArgument`                | `undefined`                                        | This allows you specify the locale for the datepicker                                                                           |
| `maxDate`                        | `DateObjectUnits`                     | `undefined`                                        | This allows you specify the maximum date that can be selected                                                                   |
| `minDate`                        | `DateObjectUnits`                     | `undefined`                                        | This allows you specify the minimum date that can be selected                                                                   |
| `month`                          | `Accessor<number>`                    | `undefined`                                        | This allows you pass in a state accessor value replacing the default one                                                        |
| `monthSelectorFormat`            | `"short" \| "long" `                  | `short`                                            | This allows you specify the format of the month selector                                                                        |
| `monthSelectorJSX`               | `"IRenderJSX"`                        | `undefined`                                        | This allows you pass in your own month selector replacing the default one                                                       |
| `monthYearSelectorFlexDirection` | `"row" \| "column"`                   | `row`                                              | This allows you change the orientation of the month and year selectors                                                          |
| `nextIcon`                       | `JSXElement`                          | `undefined`                                        | This allows you change the next button icon                                                                                     |
| `onChange`                       | `(data: IDatePickerOnChange) => void` | `undefined`                                        | This allows you to listen for change event                                                                                      |
| `onClose`                        | `() => void`                          | `undefined`                                        | This allows you to listen for close event                                                                                       |
| `onOpen`                         | `() => void`                          | `undefined`                                        | This allows you to listen for open event                                                                                        |
| `placeholder`                    | `string`                              | `undefined`                                        | Placeholder for the datepicker input                                                                                            |
| `prevIcon`                       | `JSXElement`                          | `undefined`                                        | This allows you change the previous button icon                                                                                 |
| `ref`                            | `any`                                 | `undefined`                                        | This allows you to get the ref of the dropdown                                                                                  |
| `removeNavButtons`               | `boolean`                             | `undefined`                                        | This allows you to remove both next and prev buttons                                                                            |
| `renderInput`                    | `IRenderInput`                        | `undefined`                                        | This allows you to render your own input                                                                                        |
| `shouldCloseOnSelect`            | `boolean`                             | `false`                                            | Should datepicker pop up close when date is selected                                                                            |
| `setMonth`                       | `Setter<boolean>`                     | `undefined`                                        | This allows you to pass your own month setter                                                                                   |
| `setYear`                        | `Setter<boolean>`                     | `undefined`                                        | This allows you to pass your own year setter                                                                                    |
| `setValue`                       | `Setter<IDatePickerInputDataValue>`   | `undefined`                                        | The datepicker sets your value signal with this                                                                                 |
| `type`                           | `"range" \| "single"`                 | `single`                                           | Determines the datepicker type if it will be a single date or range date picker                                                 |
| `value`                          | `Accessor<IDatePickerInputDataValue>` | `{label: "", value: {},}`                          | This is the value the datepicker listens to. It is REQUIRED                                                                     |
| `year`                           | `Accessor<number>`                    | `undefined`                                        | This allows you pass in a state that accessor value replacing the default one                                                   |
| `yearRange`                      | `{start: number, end: number}`        | `{start: cureentYear - 51, end: currentYear + 20}` | This allows you modify the range of years in the year selector                                                                  |
| `zIndex`                         | `number `                             | `1000`                                             | This allows you set the z-index of the dropdown                                                                                 |

### Relevant Types

```ts
interface DateObjectUnits {
  year?: number | undefined;
  month?: number | undefined;
  day?: number | undefined;
}

interface IDatePickerInputDataValue {
  value: IDatePickerInputValueTypes;
  label: string;
}

interface IDatePickerInputValueTypes {
  start?: string;
  end?: string;
  selected?: string;
}

type IDatePickerOnChange =
  | {
      selectedDate?: DateObjectUnits;
      type: "single";
    }
  | {
      startDate?: DateObjectUnits;
      endDate?: DateObjectUnits;
      type: "range";
    };

interface IMonthDaysObject {
  value: number;
  month: IMonthStatus;
}

interface IRenderJSXProps {
  month: Accessor<number>;
  setMonth: Setter<number>;
  year: Accessor<number>;
  setYear: Setter<number>;
  handleNextMonth: () => void;
  handlePrevMonth: () => void;
  handleDayClick: (day: IMonthDaysObject) => void;
  setRefToAllowOutsideClick: Setter<HTMLElement | undefined>;
}

interface IRenderInputJSXProps {
  value: Accessor<IDatePickerInputDataValue>;
  showDate: () => void;
}

type IRenderJSX = JSX.Element | ((props: IRenderJSXProps) => JSX.Element);

type IRenderInput =
  | JSX.Element
  | ((props: IRenderInputJSXProps) => JSX.Element);
```

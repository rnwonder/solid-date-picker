# @rnwonder/solid-date-picker

A simple and reusable Datepicker component for SolidJS ([Demo](https://stackblitz.com/edit/solidjs-templates-dof6jl?file=src%2FApp.tsx))

[Documentation](https://date-picker-doc-rnwonder.vercel.app)

![Screenshot 2023-05-20 084944.jpg](https://res.cloudinary.com/dfbebf7x0/image/upload/v1684569302/Screenshot_2023-05-20_085338_ruwgsx.jpg)
![Screenshot 2023-05-20 084945.jpg](https://res.cloudinary.com/dfbebf7x0/image/upload/v1684569301/Screenshot_2023-05-20_085412_imossu.jpg)
![Screenshot 2023-05-20 084946.jpg](https://res.cloudinary.com/dfbebf7x0/image/upload/v1684899114/Screenshot_2023-05-24_043041_to0svp.jpg)

## Installation

```bash
npm i @rnwonder/solid-date-picker
```

```bash
yarn add @rnwonder/solid-date-picker
```

```bash
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
        if (data.type === "multiple") {
          console.log(data.multipleDates);
        }
      }}
    />
  );
};
```

### Styling

You can style the datepicker using the following classes or data attributes.

#### For data attributes with [boolean] you can pass in either true or false which determines the condition for the styles to be applied.

#### For example data-day-number-area-range-between="true" will apply the styles to the day number area that is between the date range.

#### data-day-number-area-range-between="false" will apply the styles to the day number area that is not between the date range.

| Class Name                                                     | Data Attribute                                   | Element Type | Description                                                                                                               |
| -------------------------------------------------------------- | ------------------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `date-picker-main-btn`                                         | `data-type="date-picker-main-btn"`               | `button`     | This is the main class for all buttons, i.e. Nav buttons, month and year selector and calendar days                       |
| `date-picker-input`                                            | `data-type="date-picker-input"`                  | `input`      | This is the class for the input element                                                                                   |
| `date-picker-wrapper`                                          | `data-type="date-picker-wrapper"`                | `div`        | This is the class for the datepicker container                                                                            |
| `date-picker-top `                                             | `data-type="date-picker-top "`                   | `div`        | This is the class for the datepicker top area container                                                                   |
| `date-prev-next-btn`                                           | `data-type="date-prev-next-btn"`                 | `button`     | This is the class for the navigation buttons in the top area                                                              |
| `date-month-year-selector-area`                                | `data-type="date-month-year-selector-area"`      | `div`        | This is the class for the month and year selector area                                                                    |
| `date-selector-trigger`                                        | `data-type="date-selector-trigger"`              | `button`     | This is the class for the month and year selector btn                                                                     |
| `date-selector-wrapper`                                        | `data-type="date-selector-wrapper"`              | `div`        | This is the class for the selectors area                                                                                  |
| `date-selector-option`                                         | `data-type="date-selector-option"`               | `button`     | This is the class for the selectors options                                                                               |
| `date-picker-calendar-row`                                     | `data-type="date-picker-calendar-row"`           | `div`        | This is the class for each calendar row                                                                                   |
| `date-picker-weekday-name`                                     | `data-day-number-area={false}`                   | `div`        | This is the class for each calendar week day name                                                                         |
| `date-picker-day-number-area`                                  | `data-day-number-area={true}`                    | `div`        | This is the class for each calendar day area                                                                              |
| ``                                                             | `data-day-number-area-range-between=[boolean]`   | `div`        | This is the class for each calendar day area that is either between the date range or not it can be true or false         |
| ``                                                             | `data-day-number-area-range-tip=[boolean]`       | `div`        | This is the class for both calendar day areas that are either at the start of the range or at the end                     |
| ``                                                             | `data-day-number-area-range-tip-start=[boolean]` | `div`        | This is the class for the calendar day area at the start of the range or the selected date for single date type           |
| ``                                                             | `data-day-number-area-range-tip-end=[boolean]`   | `div`        | This is the class for the calendar day area at the end of the range                                                       |
| `date-picker-day-number`                                       | `data-type="date-picker-day-number"`             | `button`     | This is the class for each calendar day number btn                                                                        |
| ``                                                             | `data-day-number-range-start-or-end=[boolean]`   | `button`     | This is the class for calendar day number btn at the start or end of the range                                            |
| ``                                                             | `data-day-number-range-between=[boolean]`        | `button`     | This is the class for calendar day number btn that is between the range                                                   |
| ``                                                             | `data-day-number-range-start=[boolean]`          | `button`     | This is the class for calendar day number btn that is at the start of the range or the selected date for single date type |
| ``                                                             | `data-day-number-range-end=[boolean]`            | `button`     | This is the class for calendar day number btn that is at the end of the range                                             |
| ``                                                             | `data-day-number-current-day=[boolean]`          | `button`     | This is the class for the calendar day number btn that is the current date                                                |
| ``                                                             | `data-day-number-is-weekend`                     | `button`     | This is the class for the calendar day number btn when it is a weekend                                                    |
| ``                                                             | `data-day-number-is-sunday`                      | `button`     | This is the class for the calendar day number btn when it is a sunday                                                     |
| ``                                                             | `data-day-number-is-saturday`                    | `button`     | This is the class for the calendar day number btn when it is a saturday                                                   |
| `day-number-multiple-select`                                   | `data-day-number-is-multiple-selected=true`      | `button`     | This is the class for the calendar day number btn when it is one of the dates selected when the type is "multiple"        |
| `day-number-not-current-month` `\|` `day-number-current-month` | `data-day-number-not-current-month=[boolean]"`   | `button`     | This is the class for the calendar day number btn that are not in the current month                                       |

#### Color Props

| Props                 | Type     | Default   | Description                                                |
| --------------------- | -------- | --------- | ---------------------------------------------------------- |
| `backgroundColor`     | `string` | `#fffff`  | This is the background color for the calendar              |
| `primaryColor`        | `string` | `#0277bd` | This is the primary background color for the calendar      |
| `primaryTextColor`    | `string` | `#fffff`  | This is the primary text color for the calendar            |
| `secondaryColor`      | `string` | `#AAD1E9` | This is the secondary background color for the calendar    |
| `secondaryTextColor`  | `string` | `#0277bd` | This is the secondary text color for the calendar          |
| `textColor`           | `string` | `#000000` | This is the default text color                             |
| `weekDaysNameColor`   | `string` | `#909090` | This is the text color for the week day names              |
| `weekEndDayBgColor`   | `string` | `inherit` | This is the background color for the calendar weekend days |
| `weekEndDayTextColor` | `string` | `inherit` | This is the text color for the calendar weekend days       |

### Other Datepicker Props

| Props                            | Type                                        | Default                                            | Description                                                                                                                                                                      |
| -------------------------------- | ------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `afterNextButtonAreaJSX`         | `IRenderJSX`                                | `undefined`                                        | This allows you pass in JSX after the next button                                                                                                                                |
| `beforePrevButtonAreaJSX`        | `IRenderJSX`                                | `undefined`                                        | This allows you pass in JSX before the previous button                                                                                                                           |
| `calendarBottomAreaJSX`          | `IRenderJSX`                                | `undefined`                                        | This allow you to add JSX below the calendar area                                                                                                                                |
| `calendarJSX`                    | `IRenderJSX`                                | `undefined`                                        | This allow you to replace the default calendar area with your JSX                                                                                                                |
| `calendarLeftAreaJSX`            | `IRenderJSX`                                | `undefined`                                        | This allow you to add JSX to the left of the calendar area                                                                                                                       |
| `calendarRightAreaJSX`           | `IRenderJSX`                                | `undefined`                                        | This allow you to add JSX to the right of the calendar area                                                                                                                      |
| `calendarTopAreaJSX`             | `IRenderJSX`                                | `undefined`                                        | This allow you to add JSX above the calendar area. Note this replaces the existing top area                                                                                      |
| `calendarPositionX`              | `"left" \| "right" \| "center"`             | `center`                                           | This allows you set the horizontal position of the datepicker                                                                                                                    |
| `calendarPositionY`              | `"top" \| "bottom" \| "auto"`               | `auto`                                             | This allows you set the vertical position of the datepicker                                                                                                                      |
| `componentsToAllowOutsideClick`  | `Array<HTMLElement>`                        | `undefined`                                        | For elements outside the datepicker that you want to allow to be clicked when the datepicker is showing/open without closing it                                                  |
| `customDaysClassName`            | `CustomDaysClassName[]`                     | `undefined`                                        | This allows you to add custom class names to specific calendar day numbers                                                                                                       |
| `disabledDays`                   | `DisableDate[]`                             | `undefined`                                        | This allows you to disable specific dates and/or a range of dates                                                                                                                |
| `hideCalendar`                   | `boolean`                                   | `false`                                            | This hides the calendar area                                                                                                                                                     |
| `hideOutSideDays`                | `boolean`                                   | `false`                                            | This hides dates that are not on the current month                                                                                                                               |
| `hideTopArea`                    | `boolean`                                   | `undefined`                                        | This allows you to hide the top part of the datepicker                                                                                                                           |
| `inputLabel`                     | `Accessor<string>`                          | `undefined`                                        | This allows you pass your own value to the default input replacing the default label value                                                                                       |
| `inputProps`                     | `JSX.InputHTMLAttributes<HTMLInputElement>` | `undefined`                                        | These props will be added to the default input                                                                                                                                   |
| `inputWrapperWidth`              | `string`                                    | `100%`                                             | The date picker is positioned based on this width. Always remember to change this to fit-content if your custom input component has a fixed width that is not 100%               |
| `locale`                         | `Intl.LocalesArgument`                      | `undefined`                                        | This allows you specify the locale for the datepicker. Note this is still a work in progress only "en" is fully supported for now. Reach out if you really need it or contribute |
| `maxDate`                        | `DateObjectUnits`                           | `undefined`                                        | This allows you specify the maximum date that can be selected                                                                                                                    |
| `minDate`                        | `DateObjectUnits`                           | `undefined`                                        | This allows you specify the minimum date that can be selected                                                                                                                    |
| `month`                          | `Accessor<number>`                          | `undefined`                                        | This allows you pass in a state accessor value replacing the default one                                                                                                         |
| `monthSelectorFormat`            | `"short" \| "long" `                        | `short`                                            | This allows you specify the format of the month selector                                                                                                                         |
| `monthSelectorJSX`               | `"IRenderJSX"`                              | `undefined`                                        | This allows you pass in your own month selector replacing the default one                                                                                                        |
| `monthYearSelectorFlexDirection` | `"row" \| "column"`                         | `row`                                              | This allows you change the orientation of the month and year selectors                                                                                                           |
| `nextIcon`                       | `JSXElement`                                | `undefined`                                        | This allows you change the next button icon                                                                                                                                      |
| `onChange`                       | `(data: IDatePickerOnChange) => void`       | `undefined`                                        | This allows you to listen for change event                                                                                                                                       |
| `onClose`                        | `() => void`                                | `undefined`                                        | This allows you to listen for close event                                                                                                                                        |
| `onDisabledDayError`             | `() => void`                                | `undefined`                                        | This is called when a disabled date is clicked                                                                                                                                   |
| `onOpen`                         | `() => void`                                | `undefined`                                        | This allows you to listen for open event                                                                                                                                         |
| `placeholder`                    | `string`                                    | `undefined`                                        | Placeholder for the datepicker input                                                                                                                                             |
| `prevIcon`                       | `JSXElement`                                | `undefined`                                        | This allows you change the previous button icon                                                                                                                                  |
| `ref`                            | `any`                                       | `undefined`                                        | This allows you to get the ref of the dropdown                                                                                                                                   |
| `removeNavButtons`               | `boolean`                                   | `undefined`                                        | This allows you to remove both next and prev buttons                                                                                                                             |
| `renderInput`                    | `IRenderInput`                              | `undefined`                                        | This allows you to render your own input                                                                                                                                         |
| `shouldCloseOnSelect`            | `boolean`                                   | `false`                                            | Should datepicker pop up close when date is selected                                                                                                                             |
| `shouldHighlightWeekends`        | `boolean`                                   | `false`                                            | Should weekend days be highlighted                                                                                                                                               |
| `setMonth`                       | `Setter<boolean>`                           | `undefined`                                        | This allows you to pass your own month setter                                                                                                                                    |
| `setYear`                        | `Setter<boolean>`                           | `undefined`                                        | This allows you to pass your own year setter                                                                                                                                     |
| `setValue`                       | `Setter<IDatePickerInputDataValue>`         | `undefined`                                        | The datepicker sets your value signal with this                                                                                                                                  |
| `showEndOfRange`                 | `boolean`                                   | `false`                                            | Show the end of a range when the date picker is opened instead of the start                                                                                                      |
| `startingMonth`                  | `number`                                    | `undefined`                                        | This determines the month that will be shown whn the date picker is opened and it has no value                                                                                   |
| `startingYear`                   | `number`                                    | `undefined`                                        | This determines the year that will be shown whn the date picker is opened and it has no value                                                                                    |
| `twoMonthsDisplay`               | `boolean`                                   | `false`                                            | Shows two months                                                                                                                                                                 |
| `type`                           | `"range" \| "single" \| "multiple"`         | `single`                                           | Determines the datepicker type if it will be a single date or range date picker                                                                                                  |
| `value`                          | `Accessor<IDatePickerInputDataValue>`       | `{label: "", value: {},}`                          | This is the value the datepicker listens to. It is REQUIRED                                                                                                                      |
| `weekDaysJSX`                    | `IRenderJSX`                                | `undefined`                                        | This replaces the default week day names JSX                                                                                                                                     |
| `weekDaysType`                   | `"short" \| "single"`                       | `short`                                            | This determines if the week day names is in the short form or in single letter form                                                                                              |
| `year`                           | `Accessor<number>`                          | `undefined`                                        | This allows you pass in a state that accessor value replacing the default one                                                                                                    |
| `yearRange`                      | `{start: number, end: number}`              | `{start: cureentYear - 51, end: currentYear + 20}` | This allows you modify the range of years in the year selector                                                                                                                   |
| `zIndex`                         | `number `                                   | `1000`                                             | This allows you set the z-index of the dropdown                                                                                                                                  |

#### Send a message to the author on [twitter](https://twitter.com/Rnwonder101) if you have any questions or suggestions.

#### Feel free to open an issue [here](https://github.com/rnwonder/solid-date-picker/issues) if you run into any problem while using this library.

#### You can also contribute to this project [here](https://github.com/rnwonder/solid-date-picker/pulls).

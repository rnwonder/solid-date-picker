# @rnwonder/solid-date-picker

A simple and reusable Datepicker component for SolidJS ([Demo](https://stackblitz.com/edit/solidjs-templates-dof6jl?file=src%2FApp.tsx))

[Documentation](https://soliddatepicker.live/)

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
import DatePicker, { PickerValue } from "@rnwonder/solid-date-picker";

const App = () => {
  const [value, setValue] = createSignal<PickerValue>({
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

### Styling With Props, Classes, or Attributes

- You can style the datepicker using class props, color props, default css class names or data attributes.
- Check out the [documentation](https://soliddatepicker.live/docs/styling/) for more details

### Themes
- We have a growing list of themes you can use. Please check them out [here](https://soliddatepicker.live/docs/themes/)

### Other Datepicker Props
- We have some other props that can be useful when working with the datepicker. Please check them out [here](https://soliddatepicker.live/docs/other-props/)

### Formatting
- Formatting the datepicker input label is done with the `formatInputLabel`, `formatInputLabelRangeStart`, `formatInputLabelRangeEnd`, `localOptions` and `locale` props 
- Check out the [documentation](https://soliddatepicker.live/docs/formatting/) for more details

### Utility Functions
- We have some utility functions that can be useful when working with the datepicker. Please check them out [here](https://soliddatepicker.live/docs/utilities/)

### Other Components
- We have some other components that can be useful when working with the datepicker. Please check them out [here](https://soliddatepicker.live/docs/other-components/)

### Contributing
- Send a message to the author on [twitter](https://twitter.com/Rnwonder101) if you have any questions or suggestions. Don't forget to follow me on twitter.
- Feel free to open an issue [here](https://github.com/rnwonder/solid-date-picker/issues) if you run into any problem while using this library.
- You can also contribute to this project [here](https://github.com/rnwonder/solid-date-picker/pulls).

<a href="https://www.buymeacoffee.com/rnwonderw" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40px" width="170px"></a>

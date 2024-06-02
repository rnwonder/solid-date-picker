# Simple datejs

A light weight simple date management library

[Documentation](https://soliddatepicker.live/docs/helpers-utilities/)

## Installation

```bash
npm i @rnwonder/simple-datejs
```

```bash
yarn add @rnwonder/simple-datejs
```

```bash
pnpm add @rnwonder/simple-datejs
```

## Usage

```tsx
import { DateMath, utils } from "@rnwonder/simple-datejs";

const today = new Date();

const isToday = utils.checkIfItsTodayDate(today); // ✅ true

const date1 = DateMath.set("2018-03-13");
const date2 = DateMath.set("2017-02-13");

date1.diff(date2); // { "milliseconds": 33955200000 }
date1.diff(date2, ["days", "year"]); // { "days": 393, "years": 1.0833333333333333 }

const date = { month: 1, day: 14, year: 2023 };

DateMath.set(date).plus({ day: 2 }).toObject(); // { "day": 16, "month": 1, "year": 2023 }

DateMath.set(date).plus({ day: 2 }).toISO(); // 2023-02-15T23:00:00.000Z

DateMath.set(date).plus({ hour: 24, minute: 1440 }).toMillis(); // 1676502000000

DateMath.set(date).plus({ day: 2 }).toJSDate(); // Date

DateMath.set(date).plus({ day: 2 }).toString(); // Feb 16, 2023

DateMath.set(date)
  .plus({ second: 86400 })
  .toString({ format: "DDD, MMM dd yyyy" }); // Wednesday, February 15 2023

DateMath.set(date)
  .minus({
    year: 2,
    month: 2,
    day: 2,
    hour: 24,
    minute: 1440,
    second: 86400,
  })
  .toString({
    localeOptions: { dateStyle: "full" },
  }); // Wednesday, December 9, 2020
```

# Default imports

```ts
import DateMath from "@rnwonder/simple-datejs/dateMath";
import utils from "@rnwonder/simple-datejs/utils";
import { checkIfItsTodayDate } from "@rnwonder/simple-datejs/utils";
```

### Like the library? Give us a star on Github

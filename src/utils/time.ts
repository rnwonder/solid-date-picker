export const leadingZeros = (value: number, numberOfLeadingZero?: number) => {
    return String(Math.ceil(value)).padStart(numberOfLeadingZero ?? 2, "0");
};

export const convert24HourTo12Hour = (time: number) => {
    if (time === 0) {
        return 12;
    }
    if (time > 12) {
        return time - 12;
    }
    return time;
};

export const getAmPm = (time: number) => {
    return time >= 12 ? "PM" : "AM";
};

export const convert12HourTo24Hour = (time: number, meridiem: "AM" | "PM") => {
    if (meridiem === "AM") {
        return time === 12 ? 0 : time;
    }
    return time === 12 ? time : time + 12;
};

export const getCurrentDate = () => {
    const formatter = new Intl.DateTimeFormat(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    const [weekday, month, day] = formatter.format(new Date()).split(" ");
    return {
        weekday,
        month,
        day,
        formattedDate: `${weekday} ${day} ${month}`,
    };
};

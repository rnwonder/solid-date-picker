/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx,svelte}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#18181B",
        "primary-focus": "#e0e0e0",
        "eerie-black": "#1b1b1b",
        "dreamless-sleep": "#111111",
        "black-tie": "#474747",
        "dark-time": "#8f8f8f",
      },
      transformOrigin: {
        "center-bottom": "center bottom ",
      },
      height: {
        time: "20px",
        "time-2": "36px",
      },
      width: {
        time: "20px",
        "time-2": "36px",
      },
      lineHeight: {
        time: "20px",
      },
    },
    screens: {
      smallMobile: {
        max: "320px",
      },
      mobile: {
        max: "640px",
      },
      breakTwoCalendar: {
        max: "566px",
      },
      aboveBreakTwoCalendar: {
        min: "567px",
      },
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
  },
  daisyui: {
    themes: false,
  },
  prefix: "rn-",

  plugins: [require("daisyui")],
};

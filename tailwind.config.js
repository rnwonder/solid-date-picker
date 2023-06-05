/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0277bd",
        "primary-focus": "#02639d",
        "eerie-black": "#1b1b1b",
        "dreamless-sleep": "#111111",
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

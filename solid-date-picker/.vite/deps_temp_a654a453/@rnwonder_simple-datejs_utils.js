import {
  B,
  D,
  H,
  L,
  N,
  S,
  a,
  b,
  b2,
  d,
  f,
  h,
  j,
  k,
  p,
  v,
  w
} from "./chunk-T6W67QRM.js";

// node_modules/.pnpm/@rnwonder+simple-datejs@0.0.9012/node_modules/@rnwonder/simple-datejs/dist/libExport-DiFuaXUr.js
var U = ({
  inputRef: h3,
  dropDownRef: l2,
  positionX: H3,
  positionY: t2
}) => {
  const n2 = typeof h3 == "function" ? h3() : h3, s2 = typeof l2 == "function" ? l2() : l2;
  if (!n2 || !s2)
    return {};
  const o = n2 == null ? void 0 : n2.getBoundingClientRect(), e = s2 == null ? void 0 : s2.offsetHeight, r2 = s2 == null ? void 0 : s2.offsetWidth, c2 = window.innerHeight - (o == null ? void 0 : o.bottom), f3 = o == null ? void 0 : o.top, D3 = o == null ? void 0 : o.left, k2 = window.innerWidth - (o == null ? void 0 : o.right), d3 = window.innerWidth;
  let a3, T2;
  const b3 = t2 === "top" || t2 === "bottom", w2 = `${(o == null ? void 0 : o.top) - e - 10}px`, W = `${o == null ? void 0 : o.bottom}px`;
  t2 === "top" && (a3 = w2), t2 === "bottom" && (a3 = W), c2 > e && !b3 ? a3 = W : (f3 > e && !b3 || c2 < e && t2 === "bottom" && f3 > e) && (a3 = w2), (!(c2 > e) && !(f3 > e) && !b3 || t2 === "top" && !(f3 > e) || t2 === "bottom" && !(c2 > e) && !(f3 > e)) && (a3 = "0px");
  let i2 = 0;
  if (H3 === "left")
    i2 = D3 >= r2 ? D3 - r2 : 0;
  else if (H3 === "right")
    i2 = k2 >= r2 ? o == null ? void 0 : o.right : d3 - r2;
  else {
    const m2 = (o == null ? void 0 : o.left) + (o == null ? void 0 : o.width) / 2, g2 = r2 / 2;
    m2 - g2 >= 0 && m2 + g2 <= d3 ? i2 = m2 - g2 : m2 - g2 < 0 ? i2 = 0 : i2 = d3 - r2;
  }
  return T2 = `${i2}px`, { top: a3, left: T2 };
};
var G = () => ({
  getToday: k,
  convertDateObjectToDate: v,
  convertDateToDateObject: d,
  checkIfItsTodayDate: b2,
  isBeforeDate: j,
  getMonthName: B,
  formatDate: H,
  clickOutside: N,
  convert24HourTo12Hour: p,
  getAmPm: S,
  convert12HourTo24Hour: h,
  getCurrentTime: L,
  getYearRange: w,
  smartDropDownPosition: U,
  labelFormat: f,
  formatHourWithLeadingZero: a,
  formatMinuteSecondWithLeadingZero: b,
  leadingZeros: D
});

// node_modules/.pnpm/@rnwonder+simple-datejs@0.0.9012/node_modules/@rnwonder/simple-datejs/dist/utils.js
var t = G();
var {
  getToday: r,
  convertDateObjectToDate: a2,
  convertDateToDateObject: n,
  checkIfItsTodayDate: i,
  isBeforeDate: c,
  getMonthName: m,
  formatDate: s,
  clickOutside: g,
  convert24HourTo12Hour: u,
  getAmPm: D2,
  convert12HourTo24Hour: d2,
  getCurrentTime: T,
  getYearRange: f2,
  smartDropDownPosition: l,
  labelFormat: H2,
  leadingZeros: h2,
  formatHourWithLeadingZero: p2,
  formatMinuteSecondWithLeadingZero: v2
} = t;
export {
  i as checkIfItsTodayDate,
  g as clickOutside,
  d2 as convert12HourTo24Hour,
  u as convert24HourTo12Hour,
  a2 as convertDateObjectToDate,
  n as convertDateToDateObject,
  s as formatDate,
  p2 as formatHourWithLeadingZero,
  v2 as formatMinuteSecondWithLeadingZero,
  D2 as getAmPm,
  T as getCurrentTime,
  m as getMonthName,
  r as getToday,
  f2 as getYearRange,
  c as isBeforeDate,
  H2 as labelFormat,
  h2 as leadingZeros,
  l as smartDropDownPosition
};
//# sourceMappingURL=@rnwonder_simple-datejs_utils.js.map

// node_modules/.pnpm/@rnwonder+simple-datejs@0.0.9012/node_modules/@rnwonder/simple-datejs/dist/format-BWmYLTth.js
var D = (t, n) => String(Math.ceil(t)).padStart(n ?? 2, "0");
var p = (t) => t === 0 ? 12 : t === 12 ? 0 : t > 12 ? t - 12 : t;
var S = (t) => t >= 12 ? "PM" : "AM";
var h = (t, n) => n === "AM" ? t === 12 ? 0 : t : t === 0 ? 12 : t === 12 ? t : t + 12;
function L() {
  const t = /* @__PURE__ */ new Date();
  let n = t.getHours();
  const o = t.getMinutes(), e = t.getSeconds();
  let r = "AM";
  return n > 12 && (n -= 12, r = "PM"), n === 12 && (r = "PM"), n === 0 && (n = 12), {
    hour: n,
    minute: o,
    second: e,
    meridiem: r
  };
}
function w({
  startYear: t,
  endYear: n,
  count: o,
  year: e,
  yearRange: r
}) {
  const i = e || (/* @__PURE__ */ new Date()).getFullYear();
  if (!t) {
    const c = Math.floor(i / o) * o;
    c === i ? t = i - o + 1 : t = c + 1;
  }
  n || (n = t + o - 1);
  const s = [];
  let l = t, u = n;
  for (let c = t; c <= n; c++) {
    if (r != null && r.start && c < (r == null ? void 0 : r.start)) {
      s.push(""), l = r == null ? void 0 : r.start;
      continue;
    }
    if (r != null && r.end && c > (r == null ? void 0 : r.end)) {
      s.push(""), u = r == null ? void 0 : r.end;
      continue;
    }
    s.push(c + "");
  }
  return {
    array: s,
    range: `${l} - ${u}`,
    startYear: t,
    endYear: n
  };
}
var M = (t, n, o = "en-US") => {
  const e = g(t);
  return n = n.replace(
    new RegExp("(?<!~)(?<!y)yyyy(?!y)", "g"),
    e.toLocaleString(o, { year: "numeric" })
  ).replace(
    new RegExp("(?<!~)(?<!y)yy(?!y)", "g"),
    e.toLocaleString(o, { year: "2-digit" })
  ).replace(
    new RegExp("(?<!~)(?<!m)m(?!m)", "g"),
    e.toLocaleString(o, { month: "numeric" })
  ).replace(
    new RegExp("(?<!~)(?<!m)mm(?!m)", "g"),
    e.toLocaleString(o, { month: "2-digit" })
  ).replace(
    new RegExp("(?<!~)(?<!d)dd(?!d)", "g"),
    e.toLocaleString(o, { day: "2-digit" })
  ).replace(
    new RegExp("(?<!~)(?<!d)d(?!d)", "g"),
    e.toLocaleString(o, { day: "numeric" })
  ).replace(
    new RegExp("(?<!~)(?<!D)DDD(?!D)", "g"),
    m(e.toLocaleString(o, { weekday: "long" }))
  ).replace(
    new RegExp("(?<!~)(?<!D)DD(?!D)", "g"),
    m(e.toLocaleString(o, { weekday: "short" }))
  ).replace(
    new RegExp("(?<!~)(?<!D)D(?!D)", "g"),
    m(e.toLocaleString(o, { weekday: "narrow" }))
  ).replace(
    new RegExp("(?<!~)(?<!M)MMM(?!M)", "g"),
    e.toLocaleString(o, { month: "long" })
  ).replace(
    new RegExp("(?<!~)(?<!M)MM(?!M)", "g"),
    e.toLocaleString(o, { month: "short" })
  ).replace(
    new RegExp("(?<!~)(?<!M)M(?!M)", "g"),
    e.toLocaleString(o, { month: "narrow" })
  ).replace(/~y/g, "y").replace(/~m/g, "m").replace(/~M/g, "M").replace(/~d/g, "d").replace(/~D/g, "D"), n;
};
var g = (t) => {
  let n;
  return typeof t == "string" || typeof t == "number" ? n = new Date(t) : t instanceof Date ? n = t : n = new Date(
    t.year || 2023,
    !t.month && t.month !== 0 ? 1 : t.month,
    t.day
  ), n;
};
var d = (t) => {
  const n = t.getFullYear(), o = t.getMonth(), e = t.getDate();
  return {
    year: n,
    month: o,
    day: e
  };
};
var v = (t) => {
  const n = /* @__PURE__ */ new Date(), o = (t == null ? void 0 : t.year) ?? n.getFullYear(), e = (t == null ? void 0 : t.month) === 0 ? 0 : (t == null ? void 0 : t.month) ?? n.getMonth(), r = (t == null ? void 0 : t.day) ?? n.getDate();
  return new Date(o, e, r);
};
var H = (t, n) => {
  const { localeOptions: o, locale: e, format: r } = n || {}, i = g(t);
  return f({
    date: i,
    option: o || {
      month: "short",
      day: "numeric",
      year: "numeric"
    },
    locale: e,
    format: r
  });
};
var f = ({
  format: t,
  option: n,
  date: o,
  locale: e
}) => t ? M(o, t, e) : o.toLocaleDateString(e ?? "en-US", n);
var m = (t) => t.startsWith("M") ? "~" + t : t;
var a = (t) => t === 0 ? 12 : t !== void 0 ? D(t) : "";
var b = (t) => t !== void 0 ? D(t) : "";

// node_modules/.pnpm/@rnwonder+simple-datejs@0.0.9012/node_modules/@rnwonder/simple-datejs/dist/general-X39y17am.js
var E = (e, n, t) => {
  const a2 = new Date(
    n,
    e,
    1 - ((t == null ? void 0 : t.weekStartDay) || 0)
  ).getDay(), s = new Date(n, e + 1, 0).getDate(), o = [], c = e === 0 ? 11 : e - 1, i = c === 11 ? n - 1 : n, l = new Date(
    i,
    c + 1,
    0
  ).getDate();
  let g2 = l - a2 + 1;
  g2 === l + 1 && (g2 = 1);
  for (let u = 0; u < a2; u++)
    o.push({ value: g2 + u, month: "prev" });
  for (let u = 1; u <= s; u++)
    o.push({ value: u, month: "current" });
  const m2 = 35 - o.length >= 0 ? 35 - o.length : 42 - o.length;
  for (let u = 1; u <= m2; u++) {
    const w2 = u;
    o.push({ value: w2, month: "next" });
  }
  return o;
};
var D2 = () => {
  const e = /* @__PURE__ */ new Date();
  return {
    day: e.getDate(),
    month: e.getMonth(),
    year: e.getFullYear()
  };
};
function F(e, n) {
  const t = [];
  for (let r = n; r >= e; r--)
    t.push(r);
  return t;
}
var M2 = /* @__PURE__ */ new Date();
var P = M2.getFullYear();
var y = (e, n) => n === "prev" ? e === 0 ? 11 : e - 1 : n === "next" ? e === 11 ? 0 : e + 1 : e;
var f2 = (e, n, t) => t === "prev" ? n === 0 ? e - 1 : e : t === "next" && n === 11 ? e + 1 : e;
var R = (e, n) => ({
  year: n === 0 ? e - 1 : e,
  month: n === 0 ? 11 : n - 1
});
var W = (e, n) => ({
  year: n === 11 ? e + 1 : e,
  month: n === 11 ? 0 : n + 1
});
function p2(e, n) {
  const t = [];
  for (let r = 0; r < e.length; r += n)
    t.push(e.slice(r, r + n));
  return t;
}
var L2 = ({
  startDay: e,
  month: n,
  year: t,
  type: r,
  setStartDay: a2
}) => {
  if (r === "single") {
    const s = {
      ...e || D2(),
      ...n !== void 0 && { month: n },
      ...t !== void 0 && { year: t }
    };
    return a2 == null || a2(s), {
      selectedDate: s,
      type: r
    };
  }
  return null;
};
var v2 = (e) => typeof e == "function" ? e() : e;
var k = () => {
  const e = /* @__PURE__ */ new Date();
  return {
    day: e.getDate(),
    month: e.getMonth(),
    year: e.getFullYear()
  };
};
var b2 = (e) => {
  const n = k();
  return e instanceof Date ? e.getDate() === n.day && e.getMonth() === n.month && e.getFullYear() === n.year : e.day === n.day && e.month === n.month && e.year === n.year;
};
var j = (e, n) => {
  const t = e instanceof Date ? e : v(e), r = n instanceof Date ? n : v(n);
  return t.getTime() < r.getTime();
};
var B = (e, n = "long", t) => new Date(2e3, e, 1).toLocaleString(t ?? "en", { month: n });
var N = (e, n) => {
  const t = (r) => {
    e && !e.contains(r.target) && n(r);
  };
  return document.addEventListener("click", t), () => {
    document.removeEventListener("click", t);
  };
};
var q = ({
  day: e,
  endDate: n,
  startDate: t,
  year: r,
  month: a2,
  monthStatus: s
}) => {
  if (!t || !n)
    return false;
  const o = new Date(
    f2(r, a2, s),
    y(a2, s),
    e
  ), c = new Date(t.year, t.month, t.day), i = new Date(n.year, n.month, n.day);
  return o > c && o < i;
};
var x = ({
  dateRange: e,
  day: n,
  year: t,
  month: r,
  monthStatus: a2
}) => {
  if (!e)
    return false;
  const s = new Date(
    f2(t, r, a2),
    y(r, a2),
    n
  ), o = new Date(e.year, e.month, e.day);
  return s.getTime() === o.getTime();
};
var C = ({
  maxDate: e,
  minDate: n,
  day: t,
  year: r,
  month: a2
}) => {
  if (!n && !e)
    return false;
  const s = new Date(
    f2(
      v2(r),
      v2(a2),
      t.month
    ),
    y(v2(a2), t.month),
    t.value
  );
  if (n && e) {
    const o = new Date(n.year, n.month, n.day), c = new Date(e.year, e.month, e.day);
    return s < o || s > c;
  } else if (n) {
    const o = new Date(n.year, n.month, n.day);
    return s < o;
  } else if (e) {
    const o = new Date(e.year, e.month, e.day);
    return s > o;
  }
  return false;
};
var d2 = ({
  disabledDays: e,
  month: n,
  day: t,
  year: r
}) => e ? !!e.find((s) => {
  if ("start" in s && "end" in s) {
    const o = v(s.start), c = v(s.end), i = v({
      day: t.value,
      month: y(n, t.month),
      year: f2(r, n, t.month)
    });
    return i >= o && i <= c;
  } else
    return s.day === t.value && s.month === y(n, t.month) && s.year === f2(r, n, t.month);
}) : false;
var O = ({
  enabledDays: e,
  day: n,
  year: t,
  month: r,
  next: a2,
  prev: s
}) => e ? e.every((o) => {
  const c = n ? {
    day: n.value,
    month: y(r, n.month),
    year: f2(t, r, n.month)
  } : {
    year: t,
    month: r
  };
  if ("start" in o && "end" in o) {
    const i = o.start, l = o.end;
    if (T(c, i, l, { next: a2, prev: s }))
      return false;
  } else if (Y(c, o))
    return false;
  return true;
}) : false;
function Y(e, n) {
  return e.day ? e.year === n.year && e.month === n.month && e.day === n.day : e.year === n.year && e.month === n.month;
}
function T(e, n, t, r) {
  if (r != null && r.next)
    return n.year === void 0 || e.year === void 0 || n.year > e.year || e.year === n.year && (e.month === void 0 || n.month === void 0 || n.month >= e.month);
  if (r != null && r.prev)
    return t.year === void 0 || e.year === void 0 || t.year < e.year || e.year === t.year && (e.month === void 0 || t.month === void 0 || t.month <= e.month);
  const a2 = n.year === void 0 || e.year === void 0 || e.year > n.year || e.year === n.year && (e.month === void 0 || n.month === void 0 || e.month > n.month || e.month === n.month && (e.day ? n.day === void 0 || e.day >= n.day : true)), s = t.year === void 0 || e.year === void 0 || e.year < t.year || e.year === t.year && (e.month === void 0 || t.month === void 0 || e.month < t.month || e.month === t.month && (e.day ? t.day === void 0 || e.day <= t.day : true));
  return a2 && s;
}
var V = (e, n, t) => {
  for (let r = new Date(e); r <= n; r.setDate(r.getDate() + 1))
    if (d2({
      day: {
        month: "current",
        value: r.getDate()
      },
      month: r.getMonth(),
      year: r.getFullYear(),
      disabledDays: t
    }))
      return true;
  return false;
};
var $ = (e, n, t) => {
  for (let r = new Date(e); r <= n; r.setDate(r.getDate() + 1))
    if (O({
      day: {
        month: "current",
        value: r.getDate()
      },
      month: r.getMonth(),
      year: r.getFullYear(),
      enabledDays: t
    }))
      return true;
};
var G = ({
  year: e,
  month: n,
  day: t
}) => {
  const r = y(n, t.month), a2 = f2(e, n, t.month), o = new Date(a2, r, t.value).getDay();
  return {
    isWeekend: o === 0 || o === 6,
    isSaturday: o === 6,
    isSunday: o === 0
  };
};
var H2 = (e, n) => e.day === n.day && e.month === n.month && e.year === n.year;

export {
  D,
  p,
  S,
  h,
  L,
  w,
  d,
  v,
  H,
  f,
  a,
  b,
  E,
  F,
  P,
  y,
  f2,
  R,
  W,
  p2,
  L2,
  v2,
  k,
  b2,
  j,
  B,
  N,
  q,
  x,
  C,
  d2,
  O,
  V,
  $,
  G,
  H2
};
//# sourceMappingURL=chunk-T6W67QRM.js.map

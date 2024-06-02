import {
  $,
  C,
  E,
  F,
  G,
  H2 as H,
  L2 as L,
  O,
  P,
  R,
  V,
  W,
  b2 as b,
  d,
  d2,
  f2 as f,
  j,
  p2 as p,
  q,
  v2 as v,
  x,
  y
} from "./chunk-T6W67QRM.js";

// node_modules/.pnpm/@rnwonder+simple-datejs@0.0.9012/node_modules/@rnwonder/simple-datejs/dist/datePicker.js
var H2 = (i, a, e) => e.useValueAsName ? v(e.option) === Number(i) : v(e.option) === v(a);
var j2 = (i, a, e) => {
  var n, r, g, c, h;
  if (e.useValueAsName) {
    if (e.minDate || e.maxDate)
      return ((n = e.minDate) != null && n.year ? Number(i) < ((r = e.minDate) == null ? void 0 : r.year) : false) || ((g = e.maxDate) != null && g.year ? Number(i) > ((c = e.maxDate) == null ? void 0 : c.year) : false);
    if (e.enabledDays)
      return e.enabledDays.every((m) => "start" in m && "end" in m ? m.start.year !== Number(i) || m.end.year !== Number(i) : m.year !== Number(i));
  } else {
    if (e.minDate || e.maxDate)
      return (e.minDate ? e.minDate.year === v(e.year) && v(a) < e.minDate.month || ((h = e.minDate) == null ? void 0 : h.year) > (v(e.year) || 0) : false) || (e.maxDate ? e.maxDate.year === v(e.year) && v(a) > e.maxDate.month : false);
    if (e.enabledDays && v(e.year))
      return O({
        year: v(e.year),
        month: v(a),
        enabledDays: e.enabledDays
      });
  }
  return false;
};
var q2 = (i, a, e, n) => {
  var r, g, c, h, m, l;
  if (e.useValueAsName) {
    const f2 = Number(a);
    (r = e.setOption) == null || r.call(e, f2), (g = e.onYearChange) == null || g.call(e, f2);
    const u = L({
      startDay: e.startDay,
      year: f2,
      type: e.type || "single"
    });
    u && ((c = e.onChange) == null || c.call(e, u));
  } else {
    (h = e.setOption) == null || h.call(e, i), (m = e.onMonthChange) == null || m.call(e, i);
    const f2 = L({
      startDay: e.startDay,
      month: i,
      type: e.type || "single"
    });
    f2 && ((l = e.onChange) == null || l.call(e, f2));
  }
  n == null || n();
};
var v2 = ({
  year: i,
  month: a,
  endDay: e,
  day: n,
  startDay: r,
  customDaysClassName: g,
  multipleObject: c,
  hideOutSideDays: h,
  hoverRangeValue: m,
  minDate: l,
  maxDate: f2,
  disabledDays: u,
  enabledDays: P2
}) => {
  var A;
  const x2 = `${v(i)}-${y(v(a), n.month)}-${n.value}`;
  return {
    dayRangeEndHover: B(
      m,
      r,
      n,
      i,
      a
    ),
    dayRangeStartEnd: (v(m).start || r) && (v(m).end || e) && (x({
      year: v(i),
      month: v(a),
      day: n.value,
      dateRange: v(m).start || r,
      monthStatus: n.month
    }) || x({
      year: v(i),
      month: v(a),
      day: n.value,
      dateRange: v(m).end || e,
      monthStatus: n.month
    })),
    dayRangeBetween: q({
      year: v(i),
      month: v(a),
      day: n.value,
      startDate: v(m).start || r,
      endDate: v(m).end || e,
      monthStatus: n.month
    }),
    dayRangeStart: x({
      year: v(i),
      month: v(a),
      day: n.value,
      dateRange: v(m).start || r,
      monthStatus: n.month
    }),
    dayRangeEnd: x({
      year: v(i),
      month: v(a),
      day: n.value,
      dateRange: v(m).end || e,
      monthStatus: n.month
    }),
    daysCurrent: b(
      new Date(
        f(
          v(i),
          v(a),
          n.month
        ),
        y(v(a), n.month),
        n.value
      )
    ) && n.month === "current",
    daysNotCurrentMonth: n.month !== "current",
    ...G({
      year: v(i),
      month: v(a),
      day: n
    }),
    customDayClass: (A = g == null ? void 0 : g.find(
      (S) => S.year === f(
        v(i),
        v(a),
        n.month
      ) && S.month === y(v(a), n.month) && S.day === n.value
    )) == null ? void 0 : A.className,
    isMultipleSelected: !!(c != null && c.find(
      (S) => S.year === f(
        v(i),
        v(a),
        n.month
      ) && S.month === y(v(a), n.month) && S.day === n.value
    )),
    hidden: h ? n.month !== "current" : false,
    disabled: d2({
      disabledDays: u,
      day: n,
      month: v(a),
      year: v(i)
    }) || C({
      day: n,
      month: a,
      year: i,
      minDate: l,
      maxDate: f2
    }) || O({
      enabledDays: P2,
      day: n,
      month: v(a),
      year: v(i)
    }),
    date: x2,
    dateValue: x2
  };
};
var B = (i, a, e, n, r) => {
  var g, c;
  return !((g = v(i).end) != null && g.day) || !((c = v(i).start) != null && c.day) || !(a != null && a.day) ? false : j(
    v(i).start,
    a
  ) ? H(v(i).start, {
    year: f(
      v(n),
      v(r),
      e.month
    ),
    month: y(v(r), e.month),
    day: e.value
  }) : j(a, v(i).end) ? H(v(i).end, {
    year: f(
      v(n),
      v(r),
      e.month
    ),
    month: y(v(r), e.month),
    day: e.value
  }) : false;
};
var W2 = ({
  year: i,
  day: a,
  startDay: e,
  endDay: n,
  disabledDays: r,
  month: g,
  hover: c,
  hoverEndDay: h,
  enabledDays: m,
  disallowSameDayRange: l
}) => {
  if ((e && n || !e && !n) && !c && !h)
    return {
      start: {
        year: f(
          v(i),
          v(g),
          a.month
        ),
        month: y(v(g), a.month),
        day: a.value
      },
      end: void 0,
      initial: true
    };
  if (e && !n) {
    const f2 = new Date(
      e == null ? void 0 : e.year,
      e == null ? void 0 : e.month,
      e == null ? void 0 : e.day
    ), u = new Date(
      f(
        v(i),
        v(g),
        a.month
      ),
      y(v(g), a.month),
      a.value
    );
    if (f2.getTime() === u.getTime())
      return l ? {
        start: e
      } : {
        start: e,
        end: d(u)
      };
    if (f2.getTime() < u.getTime() && (r && V(f2, u, r) || m && $(f2, u, m)))
      return c ? {
        start: e
      } : {
        start: d(u),
        initial: true
      };
    if (f2.getTime() > u.getTime() && (r && V(f2, u, r) || m && $(u, f2, m)))
      return c ? {
        start: e
      } : {
        start: d(u),
        initial: true
      };
    if (f2.getTime() < u.getTime())
      return {
        end: d(u),
        start: e
      };
    if (f2.getTime() > u.getTime())
      return {
        start: d(u),
        end: d(f2)
      };
  }
  return {
    start: e,
    end: n
  };
};
export {
  v2 as applyDateRangeProps,
  p as breakArrayIntoSubArrays,
  H as compareObjectDate,
  P as currentYear,
  F as generateYearsArray,
  y as getDatePickerRefactoredMonth,
  f as getDatePickerRefactoredYear,
  E as getMonthDaysArray,
  L as getOnChangeSingleData,
  W as getRefactoredNextDate,
  R as getRefactoredPrevDate,
  W2 as handleDateRange,
  q2 as handleSelectorOptionClick,
  O as isNotPartOfEnabledDays,
  j2 as isOptionDisabledOnSelector,
  H2 as isOptionSelectedOnSelector
};
//# sourceMappingURL=@rnwonder_simple-datejs_datePicker.js.map

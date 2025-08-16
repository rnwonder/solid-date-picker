/**
 * Comprehensive test data sets for @rnwonder/simple-datejs
 * Provides structured test data for various testing scenarios
 */

import type { 
  TimeMeridiem,
} from "../types";

// ============================================================================
// Date Test Data
// ============================================================================

/**
 * Standard date objects for common testing scenarios
 */
export const STANDARD_DATES = {
  // Current year dates
  JANUARY_1ST: { day: 1, month: 0, year: 2023 },
  FEBRUARY_14TH: { day: 14, month: 1, year: 2023 },
  MARCH_15TH: { day: 15, month: 2, year: 2023 },
  APRIL_30TH: { day: 30, month: 3, year: 2023 },
  MAY_31ST: { day: 31, month: 4, year: 2023 },
  JUNE_15TH: { day: 15, month: 5, year: 2023 },
  JULY_4TH: { day: 4, month: 6, year: 2023 },
  AUGUST_25TH: { day: 25, month: 7, year: 2023 },
  SEPTEMBER_30TH: { day: 30, month: 8, year: 2023 },
  OCTOBER_31ST: { day: 31, month: 9, year: 2023 },
  NOVEMBER_15TH: { day: 15, month: 10, year: 2023 },
  DECEMBER_31ST: { day: 31, month: 11, year: 2023 },
} as const;

/**
 * Edge case dates for boundary testing
 */
export const EDGE_CASE_DATES = {
  // Leap year dates
  LEAP_YEAR_FEB_28: { day: 28, month: 1, year: 2024 },
  LEAP_YEAR_FEB_29: { day: 29, month: 1, year: 2024 },
  NON_LEAP_YEAR_FEB_28: { day: 28, month: 1, year: 2023 },
  
  // Month boundaries
  JANUARY_31ST: { day: 31, month: 0, year: 2023 },
  FEBRUARY_1ST: { day: 1, month: 1, year: 2023 },
  
  // Year boundaries
  DECEMBER_31ST_2022: { day: 31, month: 11, year: 2022 },
  JANUARY_1ST_2023: { day: 1, month: 0, year: 2023 },
  
  // Century boundaries
  DECEMBER_31ST_1999: { day: 31, month: 11, year: 1999 },
  JANUARY_1ST_2000: { day: 1, month: 0, year: 2000 },
  DECEMBER_31ST_2000: { day: 31, month: 11, year: 2000 },
  JANUARY_1ST_2001: { day: 1, month: 0, year: 2001 },
  
  // Historical dates
  UNIX_EPOCH: { day: 1, month: 0, year: 1970 },
  PRE_UNIX: { day: 31, month: 11, year: 1969 },
  
  // Future dates
  FAR_FUTURE: { day: 15, month: 5, year: 2099 },
  
  // Years with special handling (< 100)
  YEAR_99: { day: 15, month: 5, year: 99 },
  YEAR_1: { day: 1, month: 0, year: 1 },
} as const;

/**
 * Date ranges for testing range functionality
 */
export const DATE_RANGES = {
  SAME_DAY: {
    start: { day: 15, month: 5, year: 2023 },
    end: { day: 15, month: 5, year: 2023 }
  },
  SAME_WEEK: {
    start: { day: 12, month: 5, year: 2023 }, // Monday
    end: { day: 18, month: 5, year: 2023 }   // Sunday
  },
  SAME_MONTH: {
    start: { day: 1, month: 5, year: 2023 },
    end: { day: 30, month: 5, year: 2023 }
  },
  CROSS_MONTH: {
    start: { day: 25, month: 4, year: 2023 }, // May 25
    end: { day: 5, month: 5, year: 2023 }     // June 5
  },
  CROSS_YEAR: {
    start: { day: 20, month: 11, year: 2023 }, // December 20, 2023
    end: { day: 10, month: 0, year: 2024 }     // January 10, 2024
  },
  LONG_RANGE: {
    start: { day: 1, month: 0, year: 2020 },
    end: { day: 31, month: 11, year: 2025 }
  }
} as const;

// ============================================================================
// Time Test Data
// ============================================================================

/**
 * Time conversion test scenarios
 */
export const TIME_SCENARIOS = {
  MIDNIGHT: { hour24: 0, hour12: 12, meridiem: 'AM' as TimeMeridiem },
  EARLY_MORNING: { hour24: 6, hour12: 6, meridiem: 'AM' as TimeMeridiem },
  LATE_MORNING: { hour24: 11, hour12: 11, meridiem: 'AM' as TimeMeridiem },
  NOON: { hour24: 12, hour12: 12, meridiem: 'PM' as TimeMeridiem },
  EARLY_AFTERNOON: { hour24: 13, hour12: 1, meridiem: 'PM' as TimeMeridiem },
  LATE_AFTERNOON: { hour24: 17, hour12: 5, meridiem: 'PM' as TimeMeridiem },
  EVENING: { hour24: 20, hour12: 8, meridiem: 'PM' as TimeMeridiem },
  LATE_NIGHT: { hour24: 23, hour12: 11, meridiem: 'PM' as TimeMeridiem },
} as const;

/**
 * Leading zeros test scenarios
 */
export const LEADING_ZEROS_SCENARIOS = [
  { value: 0, padding: 2, expected: '00' },
  { value: 1, padding: 2, expected: '01' },
  { value: 9, padding: 2, expected: '09' },
  { value: 10, padding: 2, expected: '10' },
  { value: 99, padding: 2, expected: '99' },
  { value: 100, padding: 2, expected: '100' },
  { value: 5, padding: 3, expected: '005' },
  { value: 50, padding: 3, expected: '050' },
  { value: 500, padding: 3, expected: '500' },
] as const;

/**
 * Year range test scenarios
 */
export const YEAR_RANGE_SCENARIOS = [
  { count: 5, startYear: 2020, endYear: undefined, expected: [2020, 2021, 2022, 2023, 2024] },
  { count: 3, startYear: undefined, endYear: 2025, expected: [2023, 2024, 2025] },
  { count: 7, startYear: 2018, endYear: 2025, expected: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
  { count: 1, startYear: 2023, endYear: 2023, expected: [2023] },
  { count: 10, startYear: 1995, endYear: 2010, expected: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004] },
] as const;

// ============================================================================
// Locale Test Data
// ============================================================================

/**
 * Comprehensive locale test data
 */
export const LOCALE_SCENARIOS = [
  {
    locale: 'en-US',
    name: 'English (US)',
    dateFormat: 'M/d/yyyy',
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    shortMonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  {
    locale: 'en-GB',
    name: 'English (UK)',
    dateFormat: 'd/M/yyyy',
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    shortMonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  {
    locale: 'es-MX',
    name: 'Spanish (Mexico)',
    dateFormat: 'd/M/yyyy',
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    shortMonthNames: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  },
  {
    locale: 'fr-FR',
    name: 'French (France)',
    dateFormat: 'd/M/yyyy',
    monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    shortMonthNames: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
  },
  {
    locale: 'de-DE',
    name: 'German (Germany)',
    dateFormat: 'd.M.yyyy',
    monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    shortMonthNames: ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.']
  },
  {
    locale: 'ja-JP',
    name: 'Japanese (Japan)',
    dateFormat: 'yyyy/M/d',
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    shortMonthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  }
] as const;

// ============================================================================
// DOM Test Data
// ============================================================================

/**
 * DOM positioning test scenarios
 */
export const DOM_POSITIONING_SCENARIOS = [
  {
    name: 'top_left_corner',
    elementRect: { top: 50, left: 50, width: 200, height: 30, bottom: 80, right: 250 },
    windowSize: { width: 1024, height: 768 },
    expectedPosition: 'bottom-left'
  },
  {
    name: 'top_right_corner',
    elementRect: { top: 50, left: 800, width: 200, height: 30, bottom: 80, right: 1000 },
    windowSize: { width: 1024, height: 768 },
    expectedPosition: 'bottom-right'
  },
  {
    name: 'bottom_left_corner',
    elementRect: { top: 700, left: 50, width: 200, height: 30, bottom: 730, right: 250 },
    windowSize: { width: 1024, height: 768 },
    expectedPosition: 'top-left'
  },
  {
    name: 'bottom_right_corner',
    elementRect: { top: 700, left: 800, width: 200, height: 30, bottom: 730, right: 1000 },
    windowSize: { width: 1024, height: 768 },
    expectedPosition: 'top-right'
  },
  {
    name: 'center',
    elementRect: { top: 350, left: 400, width: 200, height: 30, bottom: 380, right: 600 },
    windowSize: { width: 1024, height: 768 },
    expectedPosition: 'bottom-center'
  },
  {
    name: 'small_screen_mobile',
    elementRect: { top: 200, left: 100, width: 200, height: 30, bottom: 230, right: 300 },
    windowSize: { width: 375, height: 667 },
    expectedPosition: 'bottom-left'
  }
] as const;

/**
 * Mock DOM element configurations
 */
export const MOCK_DOM_CONFIGS = {
  STANDARD_INPUT: {
    tagName: 'INPUT',
    type: 'text',
    getBoundingClientRect: () => ({ top: 100, left: 200, width: 150, height: 30, bottom: 130, right: 350 })
  },
  DROPDOWN_CONTAINER: {
    tagName: 'DIV',
    className: 'dropdown-container',
    getBoundingClientRect: () => ({ top: 130, left: 200, width: 250, height: 200, bottom: 330, right: 450 })
  },
  SMALL_BUTTON: {
    tagName: 'BUTTON',
    getBoundingClientRect: () => ({ top: 50, left: 50, width: 80, height: 25, bottom: 75, right: 130 })
  }
} as const;

// ============================================================================
// Array and Generation Test Data
// ============================================================================

/**
 * Array chunking test scenarios
 */
export const ARRAY_CHUNKING_SCENARIOS = [
  {
    input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    chunkSize: 3,
    expected: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
  },
  {
    input: [1, 2, 3, 4, 5, 6],
    chunkSize: 2,
    expected: [[1, 2], [3, 4], [5, 6]]
  },
  {
    input: [1, 2, 3, 4, 5],
    chunkSize: 5,
    expected: [[1, 2, 3, 4, 5]]
  },
  {
    input: [1],
    chunkSize: 3,
    expected: [[1]]
  },
  {
    input: [],
    chunkSize: 2,
    expected: []
  }
] as const;

/**
 * Month days generation test scenarios
 */
export const MONTH_DAYS_SCENARIOS = [
  {
    year: 2023,
    month: 0, // January
    weekStartDay: 0, // Sunday
    expectedDaysCount: 31,
    expectedFirstDay: 1, // Sunday (January 1, 2023)
  },
  {
    year: 2023,
    month: 1, // February
    weekStartDay: 1, // Monday
    expectedDaysCount: 28,
    expectedFirstDay: 3, // Wednesday (February 1, 2023)
  },
  {
    year: 2024,
    month: 1, // February (leap year)
    weekStartDay: 0, // Sunday
    expectedDaysCount: 29,
    expectedFirstDay: 4, // Thursday (February 1, 2024)
  },
  {
    year: 2023,
    month: 11, // December
    weekStartDay: 0, // Sunday
    expectedDaysCount: 31,
    expectedFirstDay: 5, // Friday (December 1, 2023)
  }
] as const;

// ============================================================================
// Validation Test Data
// ============================================================================

/**
 * Date validation test scenarios
 */
export const VALIDATION_SCENARIOS = {
  VALID_DATES: [
    { day: 1, month: 0, year: 2023 },
    { day: 29, month: 1, year: 2024 }, // Leap year
    { day: 31, month: 11, year: 2023 },
    { day: 15, month: 5, year: 1970 },
  ],
  INVALID_DATES: [
    { day: 32, month: 0, year: 2023 }, // Invalid day
    { day: 29, month: 1, year: 2023 }, // Non-leap year Feb 29
    { day: 31, month: 3, year: 2023 }, // April 31 (doesn't exist)
    { day: 0, month: 5, year: 2023 },  // Day 0
    { day: 15, month: 12, year: 2023 }, // Month 12 (should be 0-11)
    { day: 15, month: -1, year: 2023 }, // Negative month
  ],
  EDGE_CASES: [
    { day: 1, month: 0, year: 1 },     // Year 1
    { day: 31, month: 11, year: 9999 }, // Year 9999
    { day: 29, month: 1, year: 2000 },  // Y2K leap year
  ]
} as const;

// ============================================================================
// Performance Test Data
// ============================================================================

/**
 * Performance test scenarios with large data sets
 */
export const PERFORMANCE_SCENARIOS = {
  LARGE_DATE_ARRAY: Array.from({ length: 1000 }, (_, i) => ({
    day: (i % 28) + 1,
    month: i % 12,
    year: 2000 + Math.floor(i / 365)
  })),
  LARGE_YEAR_RANGE: { start: 1900, end: 2100 },
  MANY_LOCALES: ['en-US', 'en-GB', 'es-MX', 'fr-FR', 'de-DE', 'ja-JP', 'zh-CN', 'ar-SA', 'hi-IN', 'pt-BR', 'ru-RU', 'ko-KR'],
  COMPLEX_DATE_RANGES: Array.from({ length: 100 }, (_, i) => ({
    start: { day: 1, month: i % 12, year: 2020 + Math.floor(i / 12) },
    end: { day: 28, month: (i + 1) % 12, year: 2020 + Math.floor((i + 1) / 12) }
  }))
} as const;

// ============================================================================
// Error Test Data
// ============================================================================

/**
 * Error scenarios for testing error handling
 */
export const ERROR_SCENARIOS = {
  NULL_VALUES: [null, undefined],
  INVALID_TYPES: ['string', 123, true, [], {}],
  MALFORMED_DATES: [
    { day: 'invalid', month: 5, year: 2023 },
    { day: 15, month: 'invalid', year: 2023 },
    { day: 15, month: 5, year: 'invalid' },
    { day: NaN, month: 5, year: 2023 },
    { day: Infinity, month: 5, year: 2023 },
  ],
  INVALID_LOCALES: ['invalid-locale', 'xx-XX', ''],
  INVALID_RANGES: [
    { start: { day: 15, month: 5, year: 2023 }, end: { day: 10, month: 5, year: 2023 } }, // End before start
    { start: null, end: { day: 15, month: 5, year: 2023 } },
    { start: { day: 15, month: 5, year: 2023 }, end: null },
  ]
} as const;

export default {
  STANDARD_DATES,
  EDGE_CASE_DATES,
  DATE_RANGES,
  TIME_SCENARIOS,
  LEADING_ZEROS_SCENARIOS,
  YEAR_RANGE_SCENARIOS,
  LOCALE_SCENARIOS,
  DOM_POSITIONING_SCENARIOS,
  MOCK_DOM_CONFIGS,
  ARRAY_CHUNKING_SCENARIOS,
  MONTH_DAYS_SCENARIOS,
  VALIDATION_SCENARIOS,
  PERFORMANCE_SCENARIOS,
  ERROR_SCENARIOS,
};
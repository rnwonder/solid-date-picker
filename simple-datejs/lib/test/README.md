# Test Utilities for @rnwonder/simple-datejs

This directory contains comprehensive test utilities and infrastructure for testing the @rnwonder/simple-datejs library.

## Overview

The test suite is designed to provide complete coverage for all exported functions from the library's four main entry points:
- `lib/main.ts` - DateMath class and utils object exports
- `lib/dateMath.ts` - Default DateMath export and all its methods  
- `lib/utils.ts` - All 15 utility functions exported from the utils object
- `lib/datePicker.ts` - All 16 date picker utility functions

## Test Infrastructure

### Core Files

- **`testUtils.ts`** - Main test utilities module with helpers for date objects, DOM mocking, and assertions
- **`testData.ts`** - Comprehensive test data sets for various testing scenarios
- **`testSetup.ts`** - Global test setup and configuration (optional)
- **`README.md`** - This documentation file

### Test Utilities (`testUtils.ts`)

#### Date Object Utilities

```typescript
import { createTestDateObject, expectDateObjectsEqual, expectValidDateObject } from './testUtils';

// Create standardized date objects
const date = createTestDateObject(15, 5, 2023); // June 15, 2023

// Compare date objects in tests
expectDateObjectsEqual(actualDate, expectedDate);

// Validate date object structure
expectValidDateObject(dateObject);
```

#### DOM Mocking Utilities

```typescript
import { createMockElement, setupPortalMocks } from './testUtils';

// Create real DOM elements with mocked getBoundingClientRect (jsdom environment)
const mockElement = createMockElement({ 
  top: 100, 
  left: 200, 
  width: 150, 
  height: 30 
});

// Element is a real HTMLElement with full DOM capabilities
expect(mockElement).toBeInstanceOf(HTMLElement);
mockElement.classList.add('test-class');
mockElement.addEventListener('click', handler);

// Setup complete portal testing environment
const { mockElement, mockWindow, mockDocument } = setupPortalMocks();
```

#### Time Mocking Utilities

```typescript
import { setupMockTime, restoreTime, mockDateConstructor } from './testUtils';

// Mock system time for consistent testing
setupMockTime('2023-06-15T12:00:00Z');
// ... run tests
restoreTime();

// Mock Date constructor
const restore = mockDateConstructor(new Date('2023-06-15'));
// ... run tests
restore();
```

#### Test Environment Setup

```typescript
import { setupTestEnvironment, createTestSuite } from './testUtils';

// Manual setup
const cleanup = setupTestEnvironment();
// ... run tests
cleanup();

// Automatic setup with test suite wrapper
createTestSuite('My Test Suite', () => {
  test('my test', () => {
    // Test environment is automatically set up and cleaned up
  });
});
```

### Test Data Sets (`testData.ts`)

#### Standard Test Dates

```typescript
import { STANDARD_DATES, EDGE_CASE_DATES, DATE_RANGES } from './testData';

// Use predefined date objects
const june15 = STANDARD_DATES.JUNE_15TH;
const leapYear = EDGE_CASE_DATES.LEAP_YEAR_FEB_29;
const range = DATE_RANGES.SAME_MONTH;
```

#### Locale Testing

```typescript
import { LOCALE_SCENARIOS } from './testData';

// Test with multiple locales
LOCALE_SCENARIOS.forEach(({ locale, name }) => {
  test(`should work with ${name}`, () => {
    // Test with specific locale
  });
});
```

#### Time Conversion Scenarios

```typescript
import { TIME_SCENARIOS, TIME_CONVERSION_SCENARIOS } from './testData';

// Test time conversions
TIME_CONVERSION_SCENARIOS.forEach(({ hour24, expected12 }) => {
  test(`should convert ${hour24}:00 to ${expected12.hour}:00 ${expected12.meridiem}`, () => {
    // Test conversion logic
  });
});
```

## Test Organization

### File Structure

```
lib/test/
├── testUtils.ts          # Main utilities module
├── testData.ts           # Test data sets
├── testSetup.ts          # Global test setup (optional)
├── README.md             # This documentation
├── testUtils.test.ts     # Tests for test utilities
├── format.test.ts        # Existing format function tests
├── general.test.ts       # Existing general function tests
├── math.test.ts          # Existing math function tests
└── [new test files]      # Additional test files to be created
```

### Naming Conventions

- Test files: `*.test.ts`
- Utility files: `testUtils.ts`, `testData.ts`, etc.
- Test suites: Use descriptive names that match the functionality being tested
- Test cases: Use "should" statements describing expected behavior

## Usage Examples

### Basic Test Setup

```typescript
import { describe, test, expect } from 'vitest';
import { createTestDateObject, expectValidDateObject } from './testUtils';
import { formatDate } from '../format';

describe('formatDate', () => {
  test('should format date correctly', () => {
    const date = createTestDateObject(15, 5, 2023);
    const result = formatDate(date);
    
    expect(result).toBe('Jun 15, 2023');
    expectValidDateObject(date);
  });
});
```

### DOM Testing

```typescript
import { describe, test, expect } from 'vitest';
import { createMockElement, DOM_POSITIONING_SCENARIOS } from './testUtils';
import { upgradedSmartDropDown } from '../portal';

describe('upgradedSmartDropDown', () => {
  test('should position dropdown correctly', () => {
    const mockElement = createMockElement({ 
      top: 100, 
      left: 200, 
      width: 150, 
      height: 30 
    });
    
    // Full DOM capabilities available
    mockElement.id = 'test-dropdown';
    document.body.appendChild(mockElement);
    
    const position = upgradedSmartDropDown(mockElement);
    expect(position).toBeDefined();
    
    // Can query and manipulate DOM
    const found = document.getElementById('test-dropdown');
    expect(found).toBe(mockElement);
    
    // Cleanup
    document.body.removeChild(mockElement);
  });
});
```

### Enhanced DOM Features

With the jsdom environment, you get full DOM capabilities:

```typescript
// Real DOM elements
const element = document.createElement('div');
element.classList.add('date-picker');
element.innerHTML = '<input type="text" />';

// Event handling
element.addEventListener('click', (event) => {
  // Handle real DOM events
});

// CSS and styling
element.style.position = 'absolute';
element.style.top = '100px';

// DOM queries
const input = element.querySelector('input');
expect(input).toBeInstanceOf(HTMLInputElement);

// Document manipulation
document.body.appendChild(element);
expect(document.body.contains(element)).toBe(true);
```

### Time-dependent Testing

```typescript
import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { setupMockTime, restoreTime } from './testUtils';
import { getCurrentTime } from '../time';

describe('getCurrentTime', () => {
  beforeEach(() => {
    setupMockTime('2023-06-15T14:30:45Z');
  });
  
  afterEach(() => {
    restoreTime();
  });
  
  test('should return current time', () => {
    const time = getCurrentTime();
    expect(time.hour).toBe(14);
    expect(time.minute).toBe(30);
    expect(time.second).toBe(45);
  });
});
```

### Locale Testing

```typescript
import { describe, test, expect } from 'vitest';
import { LOCALE_SCENARIOS, createTestDateObject } from './testUtils';
import { formatDate } from '../format';

describe('formatDate with locales', () => {
  LOCALE_SCENARIOS.forEach(({ locale, name }) => {
    test(`should format date correctly for ${name}`, () => {
      const date = createTestDateObject(15, 5, 2023);
      const result = formatDate(date, { locale });
      
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });
});
```

## Custom Matchers

The test setup includes custom matchers for common date testing scenarios:

```typescript
// Check if value is a valid date object
expect(dateObject).toBeValidDateObject();

// Check if value is a valid JavaScript Date
expect(jsDate).toBeValidJSDate();

// Check if execution time is within tolerance
expect(executionTime).toBeWithinTimeRange(expectedTime, tolerance);
```

## Performance Testing

```typescript
import { measureExecutionTime, expectExecutionTime } from './testUtils';

test('should execute within time limit', async () => {
  await expectExecutionTime(() => {
    // Function to test
    heavyComputation();
  }, 1000); // Should complete within 1000ms
});
```

## Best Practices

1. **Use Predefined Data**: Prefer using test data from `testData.ts` over creating ad-hoc test data
2. **Mock Time Consistently**: Always use `setupMockTime` for time-dependent tests
3. **Clean Up**: Always restore mocks and timers after tests
4. **Test Edge Cases**: Use `EDGE_CASE_DATES` and `ERROR_SCENARIOS` for boundary testing
5. **Locale Testing**: Test internationalization features with multiple locales
6. **Performance**: Include performance assertions for functions handling large data sets

## Running Tests

```bash
# Run all tests
npx vitest run

# Run specific test file
npx vitest run lib/test/format.test.ts

# Run tests with coverage
npx vitest run --coverage

# Run tests in watch mode
npx vitest

# Run only test utilities tests
npx vitest run lib/test/testUtils.test.ts
```

## Configuration

The test configuration is defined in `vitest.config.ts`:

- **Environment**: jsdom environment for full DOM testing capabilities
- **Globals**: Vitest functions available globally
- **Setup Files**: Automatic loading of test setup and custom matchers
- **Coverage**: V8 provider with HTML, JSON, and text reports
- **Timeout**: 10 second timeout for long-running tests
- **Exclusions**: Excludes build artifacts and test files from coverage

## Contributing

When adding new test utilities:

1. Add the utility function to `testUtils.ts`
2. Add corresponding test data to `testData.ts` if needed
3. Write tests for the utility in `testUtils.test.ts`
4. Update this README with usage examples
5. Ensure all existing tests still pass

## Troubleshooting

### Common Issues

1. **Timer Errors**: Make sure to call `restoreTime()` after using `setupMockTime()`
2. **DOM Errors**: Use `createMockElement()` for DOM-dependent tests
3. **Timezone Issues**: Tests run in UTC timezone for consistency
4. **Memory Leaks**: Always clean up mocks in `afterEach` hooks

### Debug Mode

Enable debug logging by setting environment variable:
```bash
DEBUG=true npx vitest run
```
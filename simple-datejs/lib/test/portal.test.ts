/**
 * Comprehensive test suite for portal positioning functions
 * Tests the upgradedSmartDropDown function with various positioning scenarios
 */

import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { upgradedSmartDropDown } from "../portal";

// ============================================================================
// Enhanced DOM Mocking Utilities for Portal Tests
// ============================================================================

/**
 * Creates a mock DOM element with configurable getBoundingClientRect and dimensions
 */
const createMockElement = (config: {
  rect?: Partial<DOMRect>;
  offsetWidth?: number;
  offsetHeight?: number;
}): HTMLElement => {
  const defaultRect: DOMRect = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({})
  };

  const element = document.createElement('div');
  const rect = { ...defaultRect, ...config.rect };
  element.getBoundingClientRect = vi.fn(() => rect);
  
  Object.defineProperty(element, 'offsetWidth', { 
    value: config.offsetWidth ?? rect.width, 
    writable: true 
  });
  Object.defineProperty(element, 'offsetHeight', { 
    value: config.offsetHeight ?? rect.height, 
    writable: true 
  });

  return element;
};

/**
 * Mocks window dimensions for viewport calculations
 */
const mockWindowDimensions = (width: number = 1024, height: number = 768) => {
  Object.defineProperty(window, 'innerWidth', { value: width, writable: true });
  Object.defineProperty(window, 'innerHeight', { value: height, writable: true });
};

// ============================================================================
// Test Suite
// ============================================================================

describe('Portal Positioning Tests', () => {
  let originalInnerWidth: number;
  let originalInnerHeight: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    originalInnerHeight = window.innerHeight;
    vi.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight, writable: true });
    vi.restoreAllMocks();
  });

  describe('upgradedSmartDropDown function', () => {
    test('should return empty object when input element is null', () => {
      const dropdownElement = createMockElement({
        offsetWidth: 250,
        offsetHeight: 200
      });

      const result = upgradedSmartDropDown({
        inputRef: null,
        dropDownRef: dropdownElement
      });

      expect(result).toEqual({});
    });

    test('should return empty object when dropdown element is null', () => {
      const inputElement = createMockElement({
        rect: { top: 100, left: 200, width: 150, height: 30, bottom: 130, right: 350 }
      });

      const result = upgradedSmartDropDown({
        inputRef: inputElement,
        dropDownRef: null
      });

      expect(result).toEqual({});
    });

    test('should position dropdown below input when positionY is bottom', () => {
      const inputElement = createMockElement({
        rect: { top: 100, left: 200, width: 150, height: 30, bottom: 130, right: 350 }
      });
      const dropdownElement = createMockElement({
        offsetWidth: 250,
        offsetHeight: 200
      });

      mockWindowDimensions(1024, 768);

      const result = upgradedSmartDropDown({
        inputRef: inputElement,
        dropDownRef: dropdownElement,
        positionY: 'bottom'
      });

      expect(result.top).toBe('130px');
      expect(result).toHaveProperty('left');
    });

    test('should position dropdown above input when positionY is top', () => {
      const inputElement = createMockElement({
        rect: { top: 300, left: 200, width: 150, height: 30, bottom: 330, right: 350 }
      });
      const dropdownElement = createMockElement({
        offsetWidth: 250,
        offsetHeight: 200
      });

      mockWindowDimensions(1024, 768);

      const result = upgradedSmartDropDown({
        inputRef: inputElement,
        dropDownRef: dropdownElement,
        positionY: 'top'
      });

      expect(result.top).toBe('90px'); // 300 - 200 - 10
      expect(result).toHaveProperty('left');
    });

    test('should auto-position below when there is enough space below', () => {
      const inputElement = createMockElement({
        rect: { top: 100, left: 200, width: 150, height: 30, bottom: 130, right: 350 }
      });
      const dropdownElement = createMockElement({
        offsetWidth: 250,
        offsetHeight: 200
      });

      mockWindowDimensions(1024, 768);

      const result = upgradedSmartDropDown({
        inputRef: inputElement,
        dropDownRef: dropdownElement
      });

      expect(result.top).toBe('130px'); // Should position below
      expect(result).toHaveProperty('left');
    });

    test('should handle horizontal positioning with positionX left', () => {
      const inputElement = createMockElement({
        rect: { top: 100, left: 400, width: 150, height: 30, bottom: 130, right: 550 }
      });
      const dropdownElement = createMockElement({
        offsetWidth: 250,
        offsetHeight: 200
      });

      mockWindowDimensions(1024, 768);

      const result = upgradedSmartDropDown({
        inputRef: inputElement,
        dropDownRef: dropdownElement,
        positionX: 'left'
      });

      expect(result.left).toBe('150px'); // 400 - 250
      expect(result).toHaveProperty('top');
    });

    test('should handle horizontal positioning with positionX right', () => {
      const inputElement = createMockElement({
        rect: { top: 100, left: 200, width: 150, height: 30, bottom: 130, right: 350 }
      });
      const dropdownElement = createMockElement({
        offsetWidth: 250,
        offsetHeight: 200
      });

      mockWindowDimensions(1024, 768);

      const result = upgradedSmartDropDown({
        inputRef: inputElement,
        dropDownRef: dropdownElement,
        positionX: 'right'
      });

      expect(result.left).toBe('350px'); // inputRect.right
      expect(result).toHaveProperty('top');
    });

    test('should center dropdown horizontally by default', () => {
      const inputElement = createMockElement({
        rect: { top: 100, left: 400, width: 200, height: 30, bottom: 130, right: 600 }
      });
      const dropdownElement = createMockElement({
        offsetWidth: 250,
        offsetHeight: 200
      });

      mockWindowDimensions(1024, 768);

      const result = upgradedSmartDropDown({
        inputRef: inputElement,
        dropDownRef: dropdownElement
      });

      expect(result.left).toBe('375px'); // center (500) - half width (125) = 375
      expect(result).toHaveProperty('top');
    });

    test('should handle viewport boundaries correctly', () => {
      const inputElement = createMockElement({
        rect: { top: 700, left: 800, width: 200, height: 30, bottom: 730, right: 1000 }
      });
      const dropdownElement = createMockElement({
        offsetWidth: 250,
        offsetHeight: 200
      });

      mockWindowDimensions(1024, 768);

      const result = upgradedSmartDropDown({
        inputRef: inputElement,
        dropDownRef: dropdownElement
      });

      // Should position above due to insufficient space below
      expect(result.top).toBe('490px'); // 700 - 200 - 10
      // Should adjust horizontal position to fit in viewport
      expect(result.left).toBe('774px'); // 1024 - 250
    });

    test('should handle function refs correctly', () => {
      const inputElement = createMockElement({
        rect: { top: 100, left: 200, width: 150, height: 30, bottom: 130, right: 350 }
      });
      const dropdownElement = createMockElement({
        offsetWidth: 250,
        offsetHeight: 200
      });

      const inputRefFn = vi.fn(() => inputElement);
      const dropdownRefFn = vi.fn(() => dropdownElement);

      mockWindowDimensions(1024, 768);

      const result = upgradedSmartDropDown({
        inputRef: inputRefFn,
        dropDownRef: dropdownRefFn
      });

      expect(inputRefFn).toHaveBeenCalled();
      expect(dropdownRefFn).toHaveBeenCalled();
      expect(result).toHaveProperty('top');
      expect(result).toHaveProperty('left');
    });

    test('should handle edge cases with small viewport and large dropdown', () => {
      const inputElement = createMockElement({
        rect: { top: 100, left: 50, width: 100, height: 30, bottom: 130, right: 150 }
      });
      const dropdownElement = createMockElement({
        offsetWidth: 300, // Larger than small viewport
        offsetHeight: 400
      });

      mockWindowDimensions(320, 480); // Small mobile screen

      const result = upgradedSmartDropDown({
        inputRef: inputElement,
        dropDownRef: dropdownElement
      });

      expect(result).toHaveProperty('top');
      expect(result).toHaveProperty('left');
      expect(result.top).toBe('0px'); // Should position at top when too tall
    });
  });
});
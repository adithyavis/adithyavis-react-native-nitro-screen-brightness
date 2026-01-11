// Mock the NitroModules before importing the module
const mockGetBrightness = jest.fn();
const mockSetBrightness = jest.fn();
const mockGetSystemBrightness = jest.fn();

jest.mock('react-native-nitro-modules', () => {
  return {
    NitroModules: {
      createHybridObject: jest.fn(() => ({
        get getBrightness() {
          return mockGetBrightness;
        },
        get setBrightness() {
          return mockSetBrightness;
        },
        get getSystemBrightness() {
          return mockGetSystemBrightness;
        },
      })),
    },
  };
});

import { getBrightness, setBrightness, getSystemBrightness } from '../index';

describe('NitroScreenBrightness', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    mockGetBrightness.mockClear();
    mockSetBrightness.mockClear();
    mockGetSystemBrightness.mockClear();
  });

  describe('getBrightness', () => {
    it('should return current brightness value', () => {
      mockGetBrightness.mockReturnValue(0.75);

      const brightness = getBrightness();

      expect(brightness).toBe(0.75);
      expect(mockGetBrightness).toHaveBeenCalledTimes(1);
    });

    it('should return value between 0.0 and 1.0', () => {
      mockGetBrightness.mockReturnValue(0.5);

      const brightness = getBrightness();

      expect(brightness).toBeGreaterThanOrEqual(0.0);
      expect(brightness).toBeLessThanOrEqual(1.0);
    });

    it('should return minimum brightness', () => {
      mockGetBrightness.mockReturnValue(0.0);

      const brightness = getBrightness();

      expect(brightness).toBe(0.0);
    });

    it('should return maximum brightness', () => {
      mockGetBrightness.mockReturnValue(1.0);

      const brightness = getBrightness();

      expect(brightness).toBe(1.0);
    });
  });

  describe('setBrightness', () => {
    it('should set brightness to valid value', () => {
      setBrightness(0.5);

      expect(mockSetBrightness).toHaveBeenCalledWith(0.5);
      expect(mockSetBrightness).toHaveBeenCalledTimes(1);
    });

    it('should set brightness to minimum (0.0)', () => {
      setBrightness(0.0);

      expect(mockSetBrightness).toHaveBeenCalledWith(0.0);
    });

    it('should set brightness to maximum (1.0)', () => {
      setBrightness(1.0);

      expect(mockSetBrightness).toHaveBeenCalledWith(1.0);
    });

    it('should throw error for brightness value below 0.0', () => {
      mockSetBrightness.mockImplementation((value: number) => {
        if (value < 0.0 || value > 1.0) {
          throw new Error(
            `Brightness must be between 0.0 and 1.0, got ${value}`
          );
        }
      });

      expect(() => setBrightness(-0.1)).toThrow(
        'Brightness must be between 0.0 and 1.0'
      );
    });

    it('should throw error for brightness value above 1.0', () => {
      mockSetBrightness.mockImplementation((value: number) => {
        if (value < 0.0 || value > 1.0) {
          throw new Error(
            `Brightness must be between 0.0 and 1.0, got ${value}`
          );
        }
      });

      expect(() => setBrightness(1.5)).toThrow(
        'Brightness must be between 0.0 and 1.0'
      );
    });

    it('should handle decimal precision', () => {
      const testValues = [0.01, 0.25, 0.33, 0.5, 0.66, 0.75, 0.99];

      testValues.forEach((value) => {
        setBrightness(value);
        expect(mockSetBrightness).toHaveBeenCalledWith(value);
      });
    });
  });

  describe('getSystemBrightness', () => {
    it('should return system brightness value', () => {
      mockGetSystemBrightness.mockReturnValue(0.6);

      const brightness = getSystemBrightness();

      expect(brightness).toBe(0.6);
      expect(mockGetSystemBrightness).toHaveBeenCalledTimes(1);
    });

    it('should return value between 0.0 and 1.0', () => {
      mockGetSystemBrightness.mockReturnValue(0.8);

      const brightness = getSystemBrightness();

      expect(brightness).toBeGreaterThanOrEqual(0.0);
      expect(brightness).toBeLessThanOrEqual(1.0);
    });

    it('should work independently of app brightness', () => {
      // Mock different values for app and system brightness
      mockGetBrightness.mockReturnValue(0.3);
      mockGetSystemBrightness.mockReturnValue(0.7);

      const appBrightness = getBrightness();
      const systemBrightness = getSystemBrightness();

      expect(appBrightness).not.toBe(systemBrightness);
      expect(appBrightness).toBe(0.3);
      expect(systemBrightness).toBe(0.7);
    });
  });

  describe('integration scenarios', () => {
    it('should allow getting and setting brightness sequentially', () => {
      mockGetBrightness.mockReturnValue(0.5);

      const initialBrightness = getBrightness();
      expect(initialBrightness).toBe(0.5);

      setBrightness(0.8);
      expect(mockSetBrightness).toHaveBeenCalledWith(0.8);

      mockGetBrightness.mockReturnValue(0.8);
      const newBrightness = getBrightness();
      expect(newBrightness).toBe(0.8);
    });

    it('should handle multiple brightness changes', () => {
      const values = [0.2, 0.5, 0.7, 1.0, 0.3];

      values.forEach((value) => {
        setBrightness(value);
      });

      expect(mockSetBrightness).toHaveBeenCalledTimes(values.length);
    });

    it('should handle edge cases', () => {
      // Test boundary values
      setBrightness(0.0);
      setBrightness(1.0);

      // Test very small values
      setBrightness(0.001);
      setBrightness(0.999);

      expect(mockSetBrightness).toHaveBeenCalledTimes(4);
    });
  });
});

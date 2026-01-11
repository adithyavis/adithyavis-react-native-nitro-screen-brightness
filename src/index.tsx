import { NitroModules } from 'react-native-nitro-modules';
import { NativeModules, Platform } from 'react-native';
import type { NitroScreenBrightness as NitroScreenBrightnessType } from './NitroScreenBrightness.nitro';

// Initialize the context on Android
if (Platform.OS === 'android') {
  // This triggers the initialization of the context
  NativeModules.NitroScreenBrightnessInitializer;
}

const NitroScreenBrightnessHybridObject =
  NitroModules.createHybridObject<NitroScreenBrightnessType>(
    'NitroScreenBrightness'
  );

/**
 * Gets the current screen brightness level.
 * @returns A number between 0.0 (minimum) and 1.0 (maximum)
 * @platform iOS, Android
 *
 * @example
 * ```typescript
 * import { getBrightness } from 'react-native-nitro-screen-brightness';
 *
 * const brightness = getBrightness();
 * console.log(`Current brightness: ${brightness}`);
 * ```
 */
export function getBrightness(): number {
  return NitroScreenBrightnessHybridObject.getBrightness();
}

/**
 * Sets the screen brightness level.
 * @param brightness A number between 0.0 (minimum) and 1.0 (maximum)
 * @throws Error if brightness value is out of range [0.0, 1.0]
 * @platform iOS, Android
 *
 * @example
 * ```typescript
 * import { setBrightness } from 'react-native-nitro-screen-brightness';
 *
 * // Set brightness to 50%
 * setBrightness(0.5);
 *
 * // Set brightness to maximum
 * setBrightness(1.0);
 * ```
 */
export function setBrightness(brightness: number): void {
  return NitroScreenBrightnessHybridObject.setBrightness(brightness);
}

/**
 * Gets the system-wide brightness level.
 * @returns A number between 0.0 (minimum) and 1.0 (maximum)
 * @platform Android
 * @note On iOS, this returns the same value as getBrightness()
 *
 * @example
 * ```typescript
 * import { getSystemBrightness } from 'react-native-nitro-screen-brightness';
 *
 * const systemBrightness = getSystemBrightness();
 * console.log(`System brightness: ${systemBrightness}`);
 * ```
 */
export function getSystemBrightness(): number {
  return NitroScreenBrightnessHybridObject.getSystemBrightness();
}

export type { NitroScreenBrightnessType as NitroScreenBrightness };

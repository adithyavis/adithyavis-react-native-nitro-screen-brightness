import type { HybridObject } from 'react-native-nitro-modules';

/**
 * A Nitro module for controlling screen brightness across iOS and Android platforms.
 *
 * Brightness values are normalized between 0.0 (minimum) and 1.0 (maximum).
 */
export interface NitroScreenBrightness
  extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  /**
   * Gets the current screen brightness level.
   * @returns A number between 0.0 (minimum) and 1.0 (maximum)
   * @platform iOS, Android
   */
  getBrightness(): number;

  /**
   * Sets the screen brightness level.
   * @param brightness A number between 0.0 (minimum) and 1.0 (maximum)
   * @throws Error if brightness value is out of range [0.0, 1.0]
   * @platform iOS, Android
   */
  setBrightness(brightness: number): void;

  /**
   * Gets the system-wide brightness level.
   * @returns A number between 0.0 (minimum) and 1.0 (maximum)
   * @platform Android
   * @note On iOS, this returns the same value as getBrightness()
   */
  getSystemBrightness(): number;
}

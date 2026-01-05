import { NitroModules } from 'react-native-nitro-modules';
import type { NitroScreenBrightness } from './NitroScreenBrightness.nitro';

const NitroScreenBrightnessHybridObject =
  NitroModules.createHybridObject<NitroScreenBrightness>('NitroScreenBrightness');

export function multiply(a: number, b: number): number {
  return NitroScreenBrightnessHybridObject.multiply(a, b);
}

import UIKit

class NitroScreenBrightness: HybridNitroScreenBrightnessSpec {
    /**
     * Gets the current screen brightness level.
     * @returns A number between 0.0 (minimum) and 1.0 (maximum)
     */
    public func getBrightness() throws -> Double {
        return Double(UIScreen.main.brightness)
    }

    /**
     * Sets the screen brightness level.
     * @param brightness A number between 0.0 (minimum) and 1.0 (maximum)
     * @throws Error if brightness value is out of range [0.0, 1.0]
     */
    public func setBrightness(brightness: Double) throws {
        guard brightness >= 0.0 && brightness <= 1.0 else {
            throw NSError(
                domain: "NitroScreenBrightness",
                code: 1,
                userInfo: [NSLocalizedDescriptionKey: "Brightness must be between 0.0 and 1.0, got \(brightness)"]
            )
        }

        DispatchQueue.main.async {
            UIScreen.main.brightness = CGFloat(brightness)
        }
    }

    /**
     * Gets the system-wide brightness level.
     * On iOS, this returns the same value as getBrightness() since iOS doesn't
     * distinguish between app-level and system-level brightness.
     * @returns A number between 0.0 (minimum) and 1.0 (maximum)
     */
    public func getSystemBrightness() throws -> Double {
        return Double(UIScreen.main.brightness)
    }
}

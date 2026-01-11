package com.margelo.nitro.nitroscreenbrightness

import android.app.Activity
import android.content.Context
import android.provider.Settings
import com.facebook.proguard.annotations.DoNotStrip
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext

@DoNotStrip
class NitroScreenBrightness : HybridNitroScreenBrightnessSpec() {
  companion object {
    @Volatile
    private var reactContext: ReactContext? = null

    @JvmStatic
    fun setContext(context: ReactContext) {
      reactContext = context
    }
  }

  private fun getReactContext(): ReactApplicationContext {
    return reactContext as? ReactApplicationContext
      ?: throw IllegalStateException("Context is not initialized. Make sure NitroScreenBrightness.setContext() is called.")
  }

  private fun getCurrentActivity(): Activity {
    return getReactContext().currentActivity
      ?: throw IllegalStateException("No current activity available. Make sure the app is in the foreground.")
  }

  /**
   * Gets the current app window brightness level.
   * @return A number between 0.0 (minimum) and 1.0 (maximum)
   */
  override fun getBrightness(): Double {
    val activity = getCurrentActivity()
    val brightness = activity.window.attributes.screenBrightness

    // If brightness is BRIGHTNESS_OVERRIDE_NONE (-1.0), use system brightness
    return if (brightness < 0) {
      getSystemBrightness()
    } else {
      brightness.toDouble()
    }
  }

  /**
   * Sets the app window brightness level.
   * @param brightness A number between 0.0 (minimum) and 1.0 (maximum)
   * @throws IllegalArgumentException if brightness value is out of range [0.0, 1.0]
   */
  override fun setBrightness(brightness: Double) {
    if (brightness < 0.0 || brightness > 1.0) {
      throw IllegalArgumentException("Brightness must be between 0.0 and 1.0, got $brightness")
    }

    val activity = getCurrentActivity()
    activity.runOnUiThread {
      val layoutParams = activity.window.attributes
      layoutParams.screenBrightness = brightness.toFloat()
      activity.window.attributes = layoutParams
    }
  }

  /**
   * Gets the system-wide brightness level.
   * @return A number between 0.0 (minimum) and 1.0 (maximum)
   */
  override fun getSystemBrightness(): Double {
    val context = getReactContext()
    val systemBrightness = Settings.System.getInt(
      context.contentResolver,
      Settings.System.SCREEN_BRIGHTNESS,
      255
    )

    // System brightness is 0-255, normalize to 0.0-1.0
    return systemBrightness / 255.0
  }
}

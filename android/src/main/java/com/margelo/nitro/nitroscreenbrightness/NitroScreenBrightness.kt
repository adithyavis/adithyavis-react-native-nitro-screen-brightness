package com.margelo.nitro.nitroscreenbrightness
  
import com.facebook.proguard.annotations.DoNotStrip

@DoNotStrip
class NitroScreenBrightness : HybridNitroScreenBrightnessSpec() {
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }
}

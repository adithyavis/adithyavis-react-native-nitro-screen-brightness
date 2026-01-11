package com.margelo.nitro.nitroscreenbrightness

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.bridge.ReactContextBaseJavaModule

class NitroScreenBrightnessPackage : BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return if (name == "NitroScreenBrightnessInitializer") {
            NitroScreenBrightnessInitializer(reactContext)
        } else {
            null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            mapOf(
                "NitroScreenBrightnessInitializer" to com.facebook.react.module.model.ReactModuleInfo(
                    "NitroScreenBrightnessInitializer",
                    "NitroScreenBrightnessInitializer",
                    false, // canOverrideExistingModule
                    false, // needsEagerInit
                    true,  // hasConstants
                    false, // isCxxModule
                    false  // isTurboModule
                )
            )
        }
    }

    companion object {
        init {
            System.loadLibrary("nitroscreenbrightness")
        }
    }
}

/**
 * A native module solely for initializing the context for NitroScreenBrightness
 */
class NitroScreenBrightnessInitializer(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    init {
        // Set the context when this module is initialized
        NitroScreenBrightness.setContext(reactContext)
    }

    override fun getName(): String {
        return "NitroScreenBrightnessInitializer"
    }
}

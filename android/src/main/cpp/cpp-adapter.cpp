#include <jni.h>
#include "nitroscreenbrightnessOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::nitroscreenbrightness::initialize(vm);
}

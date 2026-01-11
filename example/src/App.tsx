import { useState } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import {
  getBrightness,
  setBrightness,
  getSystemBrightness,
} from 'react-native-nitro-screen-brightness';

export default function App() {
  const [brightnessState, setBrightnessState] = useState<number>(
    getBrightness()
  );
  const [systemBrightnessState] = useState<number>(getSystemBrightness());

  const handleBrightnessChange = (value: number) => {
    setBrightness(value);
    setBrightnessState(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>react-native-nitro-screen-brightness</Text>

      <View style={styles.section}>
        <Text style={styles.label}>
          Current Brightness: {(brightnessState * 100).toFixed(0)}%
        </Text>
        {Platform.OS === 'android' && (
          <Text style={styles.label}>
            System Brightness: {(systemBrightnessState * 100).toFixed(0)}%
          </Text>
        )}
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Adjust Brightness</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={brightnessState}
          onValueChange={handleBrightnessChange}
          minimumTrackTintColor="#007AFF"
          maximumTrackTintColor="#D1D1D6"
          thumbTintColor="#007AFF"
          step={0.01}
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderEndLabel}>0%</Text>
          <Text style={styles.sliderEndLabel}>100%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  sliderEndLabel: {
    fontSize: 14,
    color: '#666',
  },
});

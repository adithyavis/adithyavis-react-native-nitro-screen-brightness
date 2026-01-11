import { useState } from 'react';
import { Text, View, StyleSheet, Button, Platform } from 'react-native';
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

  const handleSetBrightness = (value: number) => {
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

      <View style={styles.buttonContainer}>
        <Button title="Min (0%)" onPress={() => handleSetBrightness(0.0)} />
        <Button title="25%" onPress={() => handleSetBrightness(0.25)} />
        <Button title="50%" onPress={() => handleSetBrightness(0.5)} />
        <Button title="75%" onPress={() => handleSetBrightness(0.75)} />
        <Button title="Max (100%)" onPress={() => handleSetBrightness(1.0)} />
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
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
});

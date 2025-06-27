import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import styles from '../styles/index.styles.js';

export default function WelcomeScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#121212' : '#eef6fc' },
      ]}
    >
      {/* Przycisk zmiany motywu */}
      <Pressable onPress={() => setIsDarkMode((prev) => !prev)} style={styles.themeToggle}>
        <Text style={styles.themeText}>
          {isDarkMode ? '🌞 Tryb jasny' : '🌙 Tryb ciemny'} 
        </Text>
      </Pressable>

      <Image
        source={require('../assets/images/icon.png')}
        resizeMode="contain"
        style={styles.logo}
      />

      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#1b263b' }]}>
        Witaj w WeatherApp
      </Text>
      <Text
        style={[
          styles.subtitle,
          { color: isDarkMode ? '#ccc' : '#415a77' },
        ]}
      >
        Sprawdź pogodę gdziekolwiek jesteś!
      </Text>

      <Pressable
        style={[
          styles.button,
          { backgroundColor: isDarkMode ? '#0096c7' : '#0077b6' },
        ]}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.buttonText}>Zaloguj</Text>
      </Pressable>
    </View>
  );
}



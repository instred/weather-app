import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { app } from '../firebase.js';
import styles from '../styles/register.styles.js';

const auth = getAuth(app);

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    setErrorMessage(null);

    if (!email || !password || !repeatPassword) {
      setErrorMessage('Wszystkie pola są wymagane');
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage('Hasła nie są identyczne');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sukces', 'Konto zostało utworzone');
      router.push('/weather');
    } catch (error: any) {
      Alert.alert('Błąd rejestracji', error.message || 'Coś poszło nie tak');
    }
  };

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

      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#1b263b' }]}>
        Rejestracja
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
          },
        ]}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
          },
        ]}
        placeholder="Hasło"
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
          },
        ]}
        placeholder="Powtórz hasło"
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        secureTextEntry
        value={repeatPassword}
        onChangeText={setRepeatPassword}
      />

      {errorMessage && (
        <Text style={[styles.errorText, { color: isDarkMode ? '#ff6b6b' : 'red' }]}>
          {errorMessage}
        </Text>
      )}

      <Pressable
        style={[
          styles.button,
          { backgroundColor: isDarkMode ? '#0096c7' : '#0077b6' },
        ]}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Zarejestruj się</Text>
      </Pressable>
    </View>
  );
}


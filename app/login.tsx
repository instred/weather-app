import { useRouter } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { app } from '../firebase.js';
import styles from '../styles/login.styles.js';

const auth = getAuth(app);

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogin = async () => {
    setErrorMessage(null);
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Proszę podać email i hasło');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMessage(null);
      router.push('/weather');
    } catch (error: unknown) {
      let message = 'Niepoprawne hasło';

      if (error instanceof Error) {
        // @ts-ignore
        const errorCode = (error as any).code;
        if (errorCode === 'auth/invalid-email') {
          message = 'Niepoprawny adres email';
        } else if (errorCode === 'auth/wrong-password') {
          message = 'Niepoprawne hasło';
        } else if (errorCode === 'auth/user-not-found') {
          message = 'Użytkownik nie istnieje';
        }
      }

      setErrorMessage(message);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#121212' : '#eef6fc' },
      ]}
    >
      {/* Przełącznik motywu */}
      <Pressable onPress={() => setIsDarkMode((prev) => !prev)} style={styles.themeToggle}>
        <Text style={styles.themeText}>
          {isDarkMode ? '🌞 Tryb jasny' : '🌙 Tryb ciemny'}
        </Text>
      </Pressable>

      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#1b263b' }]}>
        Logowanie
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

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <Pressable
        style={[
          styles.button,
          { backgroundColor: isDarkMode ? '#0096c7' : '#0077b6' },
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Zaloguj się</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.registerButton]}
        onPress={() => router.push('/register')}
      >
        <Text
          style={[
            styles.buttonText,
            styles.registerButtonText,
            { color: isDarkMode ? '#fff' : '#0077b6' },
          ]}
        >
          Zarejestruj się
        </Text>
      </Pressable>
    </View>
  );
}


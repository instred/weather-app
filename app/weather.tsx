import { WEATHERBIT_API_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import styles from '../styles/weather.styles.js';

import { getRecentSearches, saveRecentSearches } from '../firebaseService.js';

export default function WeatherScreen() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useImperial, setUseImperial] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigation = useNavigation();
  const auth = getAuth();

  const apiKey = WEATHERBIT_API_KEY;
  const units = useImperial ? 'I' : 'M';

    useEffect(() => {
        async function fetchRecent() {
            const searches = await getRecentSearches();
            setRecentSearches(searches.slice(0, 5)); // ograniczamy do 5 na froncie
    }
    fetchRecent();
    }, []);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('index');
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się wylogować.');
    }
  };

  const addToRecentSearches = (cityName: string) => {
    setRecentSearches((prev) => {
      const updated = [cityName, ...prev.filter((c) => c.toLowerCase() !== cityName.toLowerCase())];
      const sliced = updated.slice(0, 5); // maksymalnie 5 ostatnich
      saveRecentSearches(sliced); // zapis do Firestore
      return sliced;
    });
  };

  const toggleUnit = () => {
    setUseImperial((prev) => !prev);
    setWeatherData(null);
    setForecastData([]);
    setError(null);
  };

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Proszę wpisać nazwę miasta');
      setWeatherData(null);
      setForecastData([]);
      return;
    }
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData([]);

    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(
          city
        )}&key=${apiKey}&units=${units}&lang=pl`
      );
      const data = await response.json();

      if (response.ok) {
        if (data && data.data && data.data.length > 0) {
          setWeatherData(data.data[0]);
          addToRecentSearches(city);
        } else {
          setError('Brak danych pogodowych dla tego miasta');
        }
      } else {
        setError(data.error || 'Nie udało się pobrać pogody');
      }
    } catch (err) {
      setError('Błąd połączenia');
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async () => {
    if (!city.trim()) {
      setError('Proszę wpisać nazwę miasta');
      setForecastData([]);
      return;
    }
    setLoading(true);
    setError(null);
    setForecastData([]);

    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${encodeURIComponent(
          city
        )}&days=7&key=${apiKey}&units=${units}&lang=pl`
      );
      const data = await response.json();

      if (response.ok) {
        if (data && data.data && data.data.length > 0) {
          setForecastData(data.data);
          addToRecentSearches(city);
        } else {
          setError('Brak prognozy dla tego miasta');
        }
      } else {
        setError(data.error || 'Nie udało się pobrać prognozy');
      }
    } catch (err) {
      setError('Błąd połączenia');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}.${date.getMonth() + 1}`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? '#121212' : '#eef6fc' }}>
      <View
        style={[
          styles.header,
          { backgroundColor: isDarkMode ? '#1e1e1e' : '#f0f0f0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        ]}
      >
        <TouchableOpacity onPress={() => setIsDarkMode((prev) => !prev)} style={{ padding: 10 }}>
          <Text style={{ fontSize: 18, color: isDarkMode ? '#fff' : '#000' }}>
            {isDarkMode ? '🌞 Tryb jasny' : '🌙 Tryb ciemny'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={[styles.logoutText, { color: isDarkMode ? '#ff6b6b' : 'red' }]}>Wyloguj się</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#1b263b' }]}>Pogoda</Text>

        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, { color: isDarkMode ? '#fff' : '#1b263b' }]}>°C</Text>
          <Switch
            value={useImperial}
            onValueChange={toggleUnit}
            trackColor={{ false: '#0077b6', true: '#0096c7' }}
            thumbColor="#fff"
          />
          <Text style={[styles.switchLabel, { color: isDarkMode ? '#fff' : '#1b263b' }]}>°F</Text>
        </View>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
              borderColor: isDarkMode ? '#555' : '#ccc',
            },
          ]}
          placeholder="Wpisz miasto"
          placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
          value={city}
          onChangeText={setCity}
        />

        {recentSearches.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 16, color: isDarkMode ? '#fff' : '#1b263b' }}>
              Ostatnio wyszukiwane:
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {recentSearches.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    setCity(item);
                    fetchWeather();
                    fetchForecast();
                  }}
                  style={{
                    backgroundColor: isDarkMode ? '#333' : '#d0e8f2',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                    marginRight: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: isDarkMode ? '#fff' : '#1b263b' }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <Pressable
          style={[styles.button, { backgroundColor: '#0077b6' }]}
          onPress={fetchWeather}
        >
          <Text style={styles.buttonText}>Pobierz pogodę</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.forecastButton]}
          onPress={fetchForecast}
        >
          <Text style={styles.buttonText}>Pobierz prognozę 7 dni</Text>
        </Pressable>

        {loading && <ActivityIndicator size="large" color="#0077b6" style={{ marginTop: 20 }} />}

        {error && <Text style={[styles.errorText, { color: '#ff6b6b' }]}>{error}</Text>}

        {weatherData && (
          <View style={styles.weatherContainer}>
            <Text style={[styles.cityName, { color: isDarkMode ? '#fff' : '#1b263b' }]}>{weatherData.city_name}</Text>
            <Text style={[styles.temp, { color: '#0077b6' }]}>
              {weatherData.temp} °{useImperial ? 'F' : 'C'}
            </Text>
            <Text style={[styles.description, { color: isDarkMode ? '#ddd' : '#000' }]}>{weatherData.weather.description}</Text>
            <Text style={{ color: isDarkMode ? '#ccc' : '#000' }}>Wilgotność: {weatherData.rh}%</Text>
            <Text style={{ color: isDarkMode ? '#ccc' : '#000' }}>Wiatr: {weatherData.wind_spd} m/s</Text>
          </View>
        )}

        {forecastData.length > 0 && (
          <View style={styles.forecastContainer}>
            <Text style={[styles.forecastTitle, { color: isDarkMode ? '#fff' : '#1b263b' }]}>Prognoza na 7 dni:</Text>
            {forecastData.map((day) => (
              <View
                key={day.valid_date}
                style={[styles.forecastDay, { backgroundColor: isDarkMode ? '#2a2a2a' : '#d0e8f2' }]}
              >
                <Text style={[styles.forecastDate, { color: isDarkMode ? '#fff' : '#1b263b' }]}>
                  {formatDate(day.valid_date)}
                </Text>
                <Text style={[styles.forecastDescription, { color: isDarkMode ? '#ccc' : '#000' }]}>
                  {day.weather.description}
                </Text>
                <Text style={[styles.forecastTemp, { color: '#0077b6' }]}>
                  {day.temp} °{useImperial ? 'F' : 'C'}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

# 🌤️ Aplikacja pogodowa (React Native + Expo + Firebase)

Aplikacja mobilna do sprawdzania aktualnej pogody oraz prognozy 7-dniowej dla wybranego miasta. Korzysta z zewnętrznego API pogodowego (Weatherbit) i umożliwia logowanie użytkowników oraz zapisywanie historii wyszukiwań w chmurze (Firebase).

---

## 🚀 Funkcjonalności

- **Logowanie i rejestracja użytkownika**  
  Użytkownik może utworzyć konto i logować się za pomocą Firebase Authentication.

- **Zapisywanie ostatnich wyszukiwań**  
  Aplikacja zapisuje ostatnie 5 wyszukiwanych miast w bazie danych Firebase (Cloud Firestore), widocznych po zalogowaniu.

- **Sprawdzanie aktualnej pogody**  
  Użytkownik może sprawdzić bieżącą pogodę w wybranym mieście (temperatura, opis, wilgotność, wiatr).

- **Wyświetlanie prognozy pogody na 7 dni**  
  Oprócz pogody na dziś, dostępna jest prognoza pogody na najbliższy tydzień.

- **Zewnętrzne API pogodowe (Weatherbit)**  
  Dane pogodowe są pobierane z publicznego API Weatherbit.

- **Tryb jasny / ciemny (Dark Mode)**  
  Użytkownik może przełączać aplikację między trybem jasnym a ciemnym.

- **Wybór jednostek temperatury (°C / °F)**  
  Możliwość przełączania między metrycznym a imperialnym systemem jednostek.

- **Responsywny interfejs mobilny (Expo + React Native)**  
  Aplikacja napisana w React Native, uruchamiana przy pomocy Expo – można łatwo testować ją na telefonie bez potrzeby budowania aplikacji natywnie.

- **Historia wyszukiwań jako przyciski szybkiego dostępu**  
  Klikając w nazwę miasta z historii, użytkownik może szybko ponownie pobrać dane.

- **Eksport do wersji webowej**  
  Aplikację można uruchomić w przeglądarce i opublikować np. na GitHub Pages dzięki Expo Web.

---

## ⚙️ Technologie

- **React Native + Expo**
- **Firebase Authentication**
- **Cloud Firestore**
- **Weatherbit API**
- **TypeScript (opcjonalnie)**
- **React Navigation**

---

## 📦 Instalacja i uruchomienie

1. **Sklonuj repozytorium**
   ```bash
   git clone https://github.com/twoja-nazwa/weather-app.git
   cd weather-app
   npx expo start

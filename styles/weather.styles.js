import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logoutButton: {
    padding: 10,
  },
  logoutText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
  },
  switchLabel: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#0077b6',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  forecastButton: {
    backgroundColor: '#0096c7',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 20,
    marginBottom: 4,
  },
  forecastContainer: {
    marginTop: 24,
  },
  forecastTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  forecastDay: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  forecastDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  forecastDescription: {
    fontSize: 16,
    marginVertical: 4,
  },
  forecastTemp: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
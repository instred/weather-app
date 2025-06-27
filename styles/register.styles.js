import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  themeToggle: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0077b6',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
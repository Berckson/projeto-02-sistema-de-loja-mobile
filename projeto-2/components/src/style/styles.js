import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },

  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff'
  },

  box: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 20,
    borderRadius: 15
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10
  },

  button: {
    marginTop: 10
  },

  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50'
  }
});
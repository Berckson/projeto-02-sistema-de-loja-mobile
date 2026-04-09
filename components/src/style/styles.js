import { StyleSheet } from "react-native";

export default StyleSheet.create({

  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },

  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff'
  },

  box: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8
  },

  button: {
    marginTop: 10
  },

  item: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10
  },

  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },

  imagem: {
    width: '100%',
    height: 120,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10
  },

  carrinhoItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10
  }

});
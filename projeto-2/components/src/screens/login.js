import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from "../style/styles";
import fundoUri from "../config/fundo";

export default function Login({ irParaCadastro, irParaAdmin, irParaLista }) {

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const ADMIN_USER = 'admin';
  const ADMIN_PASS = '1234';

  async function verificar() {

    if (!usuario || !senha) {
      Alert.alert("Erro", "Preencha usuário e senha");
      return;
    }

    if (usuario === ADMIN_USER && senha === ADMIN_PASS) {
      irParaAdmin();
      return;
    }

    const dados = await AsyncStorage.getItem('@clientes');
    const clientes = dados ? JSON.parse(dados) : [];

    const encontrou = clientes.find(
      c => c.nome === usuario && c.senha === senha
    );

    if (encontrou) {
      irParaLista(usuario);
    } else {
      Alert.alert("Erro", "Usuário ou senha incorretos");
    }
  }

  return (
    <ImageBackground source={{ uri: fundoUri }} style={style.background}>
      <View style={style.container}>
        <Text style={style.logo}>ShopEasy</Text>

        <View style={style.box}>
          <TextInput style={style.input} placeholder="Usuário" value={usuario} onChangeText={setUsuario} />
          <TextInput style={style.input} placeholder="Senha" value={senha} secureTextEntry onChangeText={setSenha} />

          <View style={style.button}>
            <Button title="Entrar" color="#4CAF50" onPress={verificar} />
          </View>

          <View style={style.button}>
            <Button title="Cadastrar" color="#2196F3" onPress={irParaCadastro} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
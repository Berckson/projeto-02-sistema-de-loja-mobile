import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../style/styles';
import fundoUri from '../config/fundo';

export default function Login({ irParaCadastro, irParaAdmin, irParaLista }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const ADMIN_USER = 'admin';
  const ADMIN_PASS = '1234';

  async function entrar() {
    if (usuario === ADMIN_USER && senha === ADMIN_PASS) {
      irParaAdmin();
      return;
    }

    const dados = await AsyncStorage.getItem('@clientes');
    const clientes = dados ? JSON.parse(dados) : [];
    const user = clientes.find((c) => c.nome === usuario && c.senha === senha);

    if (user) {
      irParaLista(usuario);
    }
  }

  return (
    <ImageBackground source={{ uri: fundoUri }} style={style.background}>
      <View style={style.container}>
        <Text style={style.logo}>BuyFast</Text>

        <View style={style.box}>
          <TextInput
            style={style.input}
            placeholder="Usuário"
            value={usuario}
            onChangeText={setUsuario}
          />
          <TextInput
            style={style.input}
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          <Button title="Entrar" onPress={entrar} /> 
          <Button title="Cadastrar" onPress={irParaCadastro} />
        </View>
      </View>
    </ImageBackground>
  );
}

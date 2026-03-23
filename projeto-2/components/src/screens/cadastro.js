import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from "../style/styles";
import fundoUri from "../config/fundo";

export default function Cadastro({ voltar }) {

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  async function cadastrar() {
    if (!usuario || !senha) {
      Alert.alert("Erro", "Preencha os campos");
      return;
    }

    const dados = await AsyncStorage.getItem('@clientes');
    const clientes = dados ? JSON.parse(dados) : [];

    clientes.push({ nome: usuario, senha });

    await AsyncStorage.setItem('@clientes', JSON.stringify(clientes));

    Alert.alert("Sucesso", "Conta criada!");
    voltar();
  }

  return (
    <ImageBackground source={{ uri: fundoUri }} style={style.background}>
      <View style={style.container}>
        <Text style={style.logo}>Cadastro</Text>

        <View style={style.box}>
          <TextInput style={style.input} placeholder="Usuário" value={usuario} onChangeText={setUsuario} />
          <TextInput style={style.input} placeholder="Senha" value={senha} secureTextEntry onChangeText={setSenha} />

          <View style={style.button}>
            <Button title="Cadastrar" color="#4CAF50" onPress={cadastrar} />
          </View>

          <View style={style.button}>
            <Button title="Voltar" color="#777" onPress={voltar} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
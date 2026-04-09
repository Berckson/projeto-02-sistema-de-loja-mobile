import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from "../style/styles";
import fundoUri from "../config/fundo";

export default function Cadastro({ voltar }) {

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  async function cadastrar() {

    const dados = await AsyncStorage.getItem('@clientes');
    const clientes = dados ? JSON.parse(dados) : [];

    clientes.push({ nome: usuario, senha });

    await AsyncStorage.setItem('@clientes', JSON.stringify(clientes));

   alert("Sucesso, Conta criada!");
    voltar();
  }

  return (
    <ImageBackground source={{ uri: fundoUri }} style={style.background}>
      <View style={style.container}>
        <Text style={style.logo}>Cadastro</Text>

        <View style={style.box}>
          <TextInput style={style.input} placeholder="Usuário" onChangeText={setUsuario} /> 
          <TextInput style={style.input} placeholder="Senha" secureTextEntry onChangeText={setSenha} />

          <Button title="Cadastrar" onPress={cadastrar} />
          <Button title="Voltar" onPress={voltar} />
        </View>
      </View>
    </ImageBackground>
  );
}
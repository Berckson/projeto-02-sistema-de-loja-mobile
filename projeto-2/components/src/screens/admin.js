import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from "../style/styles";
import fundoUri from "../config/fundo";

export default function Admin({ voltar }) {

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  async function salvar() {
    const dados = await AsyncStorage.getItem('@produtos');
    const produtos = dados ? JSON.parse(dados) : [];

    produtos.push({
      nome,
      descricao,
      preco,
      quantidade: parseInt(quantidade)
    });

    await AsyncStorage.setItem('@produtos', JSON.stringify(produtos));

    Alert.alert("Sucesso", "Produto cadastrado!");

    setNome('');
    setDescricao('');
    setPreco('');
    setQuantidade('');
  }

  return (
    <ImageBackground source={{ uri: fundoUri }} style={style.background}>
      <View style={style.container}>
        <Text style={style.logo}>Painel Admin</Text>

        <View style={style.box}>
          <TextInput style={style.input} placeholder="Nome" value={nome} onChangeText={setNome} />
          <TextInput style={style.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
          <TextInput style={style.input} placeholder="Preço" value={preco} onChangeText={setPreco} />
          <TextInput style={style.input} placeholder="Quantidade" value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" />

          <View style={style.button}>
            <Button title="Salvar Produto" color="#4CAF50" onPress={salvar} />
          </View>

          <View style={style.button}>
            <Button title="Voltar" color="#777" onPress={voltar} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
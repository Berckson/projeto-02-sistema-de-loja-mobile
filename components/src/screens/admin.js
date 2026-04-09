import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from "../style/styles";
import fundoUri from "../config/fundo";

export default function Admin({ voltar }) {

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');
  const [produtos, setProdutos] = useState([]);

  
  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    const dados = await AsyncStorage.getItem('@produtos');
    setProdutos(dados ? JSON.parse(dados) : []);
  }

  async function salvarProduto() {
    if (!nome || !descricao || !preco || !imagem) {
      alert("Erro", "Preencha todos os campos");
      return;
    }

   
    const dados = await AsyncStorage.getItem('@produtos');
    const lista = dados ? JSON.parse(dados) : [];

    
    lista.push({ nome, descricao, preco, imagem });
    await AsyncStorage.setItem('@produtos', JSON.stringify(lista));

    
    setNome('');
    setDescricao('');
    setPreco('');
    setImagem('');

    carregarProdutos();
    alert("Sucesso, Produto cadastrado!");
  }

  return (
    <ImageBackground source={{ uri: fundoUri }} style={style.background}>
      <View style={style.container}>
        <Text style={style.logo}>Painel Admin</Text>

        <View style={style.box}>
          <TextInput
            style={style.input}
            placeholder="Nome do produto"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={style.input}
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
          />
          <TextInput
            style={style.input}
            placeholder="Preço"
            value={preco}
            onChangeText={setPreco}
            keyboardType="numeric"
          />
          <TextInput
            style={style.input}
            placeholder="Link da imagem "
            value={imagem}
            onChangeText={setImagem}
          />

          <Button title="Salvar Produto" onPress={salvarProduto} color="#4CAF50" />

          <Text style={{ fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>Produtos cadastrados:</Text>

          <FlatList
            data={produtos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={style.item}>
                <Text style={style.itemTitle}>{item.nome}</Text>
                <Text>{item.descricao}</Text>
                <Text>R$ {item.preco}</Text>

                {item.imagem ? (
                  <Image
                    source={{ uri: item.imagem }}
                    style={style.imagem}
                  />
                ) : null}
              </View>
            )}
          />

          <Button title="Voltar" onPress={voltar} color="#777" style={{ marginTop: 10 }} />
        </View>
      </View>
    </ImageBackground>
  );
}
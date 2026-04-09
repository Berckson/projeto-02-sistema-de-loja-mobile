import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from "../style/styles";
import fundoUri from "../config/fundo";

export default function ListaProdutos({ usuario, irParaCarrinho, voltar }) {

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const dados = await AsyncStorage.getItem('@produtos');
    setProdutos(dados ? JSON.parse(dados) : []);
  }

  async function adicionar(produto) {
    const chave = '@carrinho_' + usuario;
    const dados = await AsyncStorage.getItem(chave);
    const carrinho = dados ? JSON.parse(dados) : [];

    const existe = carrinho.find(p => p.nome === produto.nome);

    if (existe) {
      existe.quantidade += 1;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }

    await AsyncStorage.setItem(chave, JSON.stringify(carrinho));
  }

  return (
    <ImageBackground source={{ uri: fundoUri }} style={style.background}>
      <View style={style.container}>
        <Text style={style.logo}>Produtos</Text>

        <FlatList
          data={produtos}
          keyExtractor={(item, i) => i.toString()}
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

    <Button title="Adicionar" onPress={() => adicionar(item)} />
  </View>
)}
        />

        <Button title="Carrinho" onPress={irParaCarrinho} /> 
        <Button title="Sair" onPress={voltar} />
      </View>
    </ImageBackground>
  );
}
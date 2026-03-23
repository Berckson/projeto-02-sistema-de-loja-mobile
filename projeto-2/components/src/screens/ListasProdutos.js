import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ImageBackground, Alert } from 'react-native';
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
    if (produto.quantidade <= 0) {
      Alert.alert("Erro", "Produto esgotado!");
      return;
    }

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

  async function comprarDireto(produto) {
    if (produto.quantidade <= 0) {
      Alert.alert("Erro", "Produto esgotado!");
      return;
    }

    const dados = await AsyncStorage.getItem('@produtos');
    const lista = JSON.parse(dados);

    const atualizados = lista
      .map(p => {
        if (p.nome === produto.nome) {
          return { ...p, quantidade: p.quantidade - 1 };
        }
        return p;
      })
      .filter(p => {
        if (p.quantidade === 0) {
          Alert.alert("Aviso", "Produto esgotado!");
          return false;
        }
        return true;
      });

    await AsyncStorage.setItem('@produtos', JSON.stringify(atualizados));
    carregar();
  }

  return (
    <ImageBackground source={{ uri: fundoUri }} style={style.background}>
      <View style={style.container}>
        <Text style={style.logo}>Produtos</Text>

        <View style={style.box}>
          <FlatList
            data={produtos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={style.item}>
                <Text>{item.nome}</Text>
                <Text>{item.descricao}</Text>
                <Text>R$ {item.preco}</Text>
                <Text>Estoque: {item.quantidade}</Text>

                <Button title="Adicionar ao carrinho" onPress={() => adicionar(item)} />
                <Button title="Comprar agora" onPress={() => comprarDireto(item)} />
              </View>
            )}
          />

          <View style={style.button}>
            <Button title="Carrinho" color="#2196F3" onPress={irParaCarrinho} />
          </View>

          <View style={style.button}>
            <Button title="Sair" color="#777" onPress={voltar} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
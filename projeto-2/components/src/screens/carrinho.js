import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from "../style/styles";
import fundoUri from "../config/fundo";

export default function Carrinho({ usuario, voltar }) {

  const [itens, setItens] = useState([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const dados = await AsyncStorage.getItem('@carrinho_' + usuario);
    setItens(dados ? JSON.parse(dados) : []);
  }

  async function finalizar() {
    const dadosProdutos = await AsyncStorage.getItem('@produtos');
    let produtos = JSON.parse(dadosProdutos);

    const atualizados = produtos
      .map(prod => {
        const item = itens.find(i => i.nome === prod.nome);

        if (item) {
          return {
            ...prod,
            quantidade: prod.quantidade - item.quantidade
          };
        }
        return prod;
      })
      .filter(prod => {
        if (prod.quantidade === 0) {
          Alert.alert("Aviso", "Produto esgotado!");
          return false;
        }
        return true;
      });

    await AsyncStorage.setItem('@produtos', JSON.stringify(atualizados));
    await AsyncStorage.removeItem('@carrinho_' + usuario);

    setItens([]);
  }

  return (
    <ImageBackground source={{ uri: fundoUri }} style={style.background}>
      <View style={style.container}>
        <Text style={style.logo}>Carrinho</Text>

        <View style={style.box}>
          <FlatList
            data={itens}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text>{item.nome} - Qtd: {item.quantidade}</Text>
            )}
          />

          <View style={style.button}>
            <Button title="Finalizar Compra" color="#4CAF50" onPress={finalizar} />
          </View>

          <View style={style.button}>
            <Button title="Voltar" color="#777" onPress={voltar} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from '../style/styles';
import fundoUri from '../config/fundo';

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
    await AsyncStorage.removeItem('@carrinho_' + usuario);
    setItens([]);
    alert('Compra finalizada!');
  }

  return (
    <ImageBackground source={{ uri: fundoUri }} style={style.background}>
      <View style={style.container}>
        <Text style={style.logo}>Carrinho</Text>

        <FlatList
          data={itens}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={style.carrinhoItem}>
              <Text>
                {item.nome} - Qtd: {item.quantidade}
              </Text>

              {item.imagem ? (
                <Image source={{ uri: item.imagem }} style={style.imagem} />
              ) : null}
            </View>
          )}
        />

        <Button title="Finalizar" onPress={finalizar} />
        
        <Button title="Voltar" onPress={voltar} />
      </View>
    </ImageBackground>
  );
}

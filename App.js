import React, { useState } from 'react';
import Login from './components/src/screens/login';
import Cadastro from './components/src/screens/cadastro';
import Admin from './components/src/screens/admin';
import ListaProdutos from './components/src/screens/ListasProdutos';
import Carrinho from './components/src/screens/carrinho';

export default function App() {

  const [tela, setTela] = useState('login');
  const [usuario, setUsuario] = useState('');

  if (tela === 'login') {
    return (
      <Login
        irParaCadastro={() => setTela('cadastro')}
        irParaAdmin={() => setTela('admin')}
        irParaLista={(user) => {
          setUsuario(user);
          setTela('produtos');
        }}
      />
    );
  }

  if (tela === 'cadastro') {
    return <Cadastro voltar={() => setTela('login')} />;
  }

  if (tela === 'admin') {
    return <Admin voltar={() => setTela('login')} />;
  }

  if (tela === 'produtos') {
    return (
      <ListaProdutos
        usuario={usuario}
        irParaCarrinho={() => setTela('carrinho')}
        voltar={() => setTela('login')}
      />
    );
  }

  if (tela === 'carrinho') {
    return (
      <Carrinho
        usuario={usuario}
        voltar={() => setTela('produtos')}
      />
    );
  }
}
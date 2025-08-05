// app/paginas/home.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/livros.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Bem-vindo à Livraria H&C</Text>
      <Text style={styles.subtitle}>
        Seu espaço para explorar livros, autores, gêneros e editoras com facilidade.
      </Text>
      <Text style={styles.info}>
        Use o menu lateral para navegar pelas seções e gerenciar seu acervo.
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
});

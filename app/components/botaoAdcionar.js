// components/botaoAdicionar.js
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // ícone + padrão

export default function BotaoAdicionar({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <AntDesign name="pluscircleo" size={28} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

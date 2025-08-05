// components/InputDescricao.js
import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function InputDescricao({
  value,
  onChangeText,
  placeholder = "Descrição",
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    padding: 5,
    flex: 1,
  },
});

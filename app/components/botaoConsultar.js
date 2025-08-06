import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BotaoBuscar = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <Ionicons name="search" size={20} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  botao: {
    backgroundColor: "#3b82f6",
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BotaoBuscar;

// components/BotaoVoltar.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BotaoVoltar({ title = "Voltar" }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f44336",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    whidth: "100%",
  },
});

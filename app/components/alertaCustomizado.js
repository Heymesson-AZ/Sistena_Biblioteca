import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const coresPorTipo = {
  sucesso: { fundo: "#d4edda", texto: "#155724", botao: "#28a745" },
  erro: { fundo: "#f8d7da", texto: "#721c24", botao: "#dc3545" },
  info: { fundo: "#d1ecf1", texto: "#0c5460", botao: "#17a2b8" },
  alerta: { fundo: "#fff3cd", texto: "#856404", botao: "#ffc107" },
};

const AlertaCustomizado = ({
  visivel,
  tipo = "info",
  descricao = "Algo aconteceu.",
  onFechar = () => {},
}) => {
  const cor = coresPorTipo[tipo] || coresPorTipo.info;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visivel}
      onRequestClose={onFechar}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: cor.fundo }]}>
          <Text style={[styles.mensagem, { color: cor.texto }]}>
            {descricao}
          </Text>
          <TouchableOpacity
            onPress={onFechar}
            style={[styles.botao, { backgroundColor: cor.botao }]}
          >
            <Text style={styles.textoBotao}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertaCustomizado;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  mensagem: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  botao: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

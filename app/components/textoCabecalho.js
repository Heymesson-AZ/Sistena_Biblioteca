import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const Cabecalho = ({texto}) => {
  return (
    <View>
      <Text style={styles.text}>{texto}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  }
});

export default Cabecalho;

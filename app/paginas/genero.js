import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import BotaoVoltar from "../components/botaoVoltar";
import InputDescricao from "../components/inputDescricao";
import BotaoAdicionar from "../components/botaoAdcionar";
import Cabecalho from "../components/textoCabecalho";
import AlertaCustomizado from "../components/alertaCustomizado";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Genero = () => {
  const [nomeGenero, setNomeGenero] = useState("");
  const [genero, setGenero] = useState([]);
  // Controle do alerta
  const [alertaVisivel, setAlertaVisivel] = useState(false);
  const [tipoAlerta, setTipoAlerta] = useState("info");
  const [mensagemAlerta, setMensagemAlerta] = useState("");

  // Função de inserir Genero
  async function inserirGenero() {
    try {
      if (nomeGenero.trim() === "") {
        setTipoAlerta("alerta");
        setMensagemAlerta("Preencha a descricao do Genero!");
        setAlertaVisivel(true);
        return;
      }
      await addDoc(collection(db, "Genero"), {
        nome_genero: nomeGenero,
      });
      setNomeGenero("");
      setTipoAlerta("sucesso");
      setMensagemAlerta("Genero inserido com sucesso!");
      setTimeout(() => setAlertaVisivel(false), 2000);
    } catch (error) {
      setTipoAlerta("erro");
      setMensagemAlerta("Erro ao inserir o Generpo");
      setTimeout(() => setAlertaVisivel(false), 2000);
    } finally {
      setAlertaVisivel(true);
    }
  }

  // Função para buscar autores
  async function visualizarTodos() {
    try {
      const genero = await getDocs(collection(db, "Genero"));
      const lista = genero.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setGenero(lista);
      await visualizarTodos();
    } catch (error) {
      setTipoAlerta("erro");
      setMensagemAlerta("Erro ao buscar Genero.");
      setTimeout(() => setAlertaVisivel(false), 2000);
    } finally {
      setAlertaVisivel(true);
    }
  }

  useEffect(() => {
    visualizarTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Cabecalho texto="Inserir Genero" />
      <View style={styles.label}>
        <Text>Digite a descricao do Genero:</Text>
      </View>
      <View style={styles.components}>
        <InputDescricao value={nomeGenero} onChangeText={setNomeGenero} />
        <BotaoAdicionar onPress={inserirGenero} />
      </View>
      <View style={styles.footer}>
        <BotaoVoltar />
      </View>
      <AlertaCustomizado
        visivel={alertaVisivel}
        tipo={tipoAlerta}
        descricao={mensagemAlerta}
        onFechar={() => setAlertaVisivel(false)}
      />
      <View style={styles.lista}>
        <Cabecalho texto="Visualizar Generos" />
        <FlatList
          style={styles.FlatList}
          data={genero}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 5 }}>
              <Text>{item.nome_genero}</Text>
            </View>
          )}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  label: {
    marginBottom: 20,
    alignItems: "center",
  },
  components: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  footer: {
    position: "static",
    bottom: 10,
    alignItems: "center",
  },
  lista: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  FlatList: {
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "lightgray",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
  },
});
export default Genero;

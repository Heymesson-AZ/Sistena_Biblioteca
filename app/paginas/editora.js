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

const Editora = () => {
  const [nomeEditora, setNomeEditora] = useState("");
  const [editora, setEditora] = useState([]);
  // Controle do alerta
  const [alertaVisivel, setAlertaVisivel] = useState(false);
  const [tipoAlerta, setTipoAlerta] = useState("info");
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  // Função de inserir autor
  async function inserirEditora() {
    try {
      if (nomeEditora.trim() === "") {
        setTipoAlerta("alerta");
        setMensagemAlerta("Preencha o nome da Editora!");
        setAlertaVisivel(true);
        return;
      }
      await addDoc(collection(db, "Editora"), {
        nome_editora: nomeEditora,
      });
      setNomeEditora("");
      setTipoAlerta("sucesso");
      setMensagemAlerta("Edidora inserida com sucesso!");
      setTimeout(() => setAlertaVisivel(false), 2000);
    } catch (error) {
      setTipoAlerta("erro");
      setMensagemAlerta("Erro ao inserir a Editora.");
      setTimeout(() => setAlertaVisivel(false), 2000);
    } finally {
      setAlertaVisivel(true);
    }
  }

  // Função para buscar autores
  async function visualizarTodos() {
    try {
      const editora = await getDocs(collection(db, "Editora"));
      const lista = editora.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEditora(lista);
      await visualizarTodos();
    } catch (error) {
      setTipoAlerta("erro");
      setMensagemAlerta("Erro ao buscar Editora.");
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
      <Cabecalho texto="Inserir Editora" />
      <View style={styles.label}>
        <Text>Digite o nome da Editora:</Text>
      </View>
      <View style={styles.components}>
        <InputDescricao value={nomeEditora} onChangeText={setNomeEditora} />
        <BotaoAdicionar onPress={inserirEditora} />
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
        <Cabecalho texto="Visualizar Editoras" />
        <FlatList
          style={styles.FlatList}
          data={editora}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 5 }}>
              <Text>{item.nome_editora}</Text>
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

export default Editora;

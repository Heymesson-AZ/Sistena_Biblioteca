import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import BotaoVoltar from "../components/botaoVoltar";
import InputDescricao from "../components/inputDescricao";
import BotaoAdicionar from "../components/botaoAdcionar";
import Cabecalho from "../components/textoCabecalho";
import BotaoConsultar from "../components/botaoConsultar";
import AlertaCustomizado from "../components/alertaCustomizado";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";

const Autor = () => {
  const [nome, setNome] = useState("");
  const [nomeConsulta, setNomeConsulta] = useState("");
  const [autores, setAutores] = useState([]);
  const [mostraLista, setMostrarLista] = useState("");
  // Controle do alerta
  const [alertaVisivel, setAlertaVisivel] = useState(false);
  const [tipoAlerta, setTipoAlerta] = useState("info");
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  // Função de inserir autor
  async function inserirAutor() {
    try {
      if (nome.trim() === "") {
        setTipoAlerta("alerta");
        setMensagemAlerta("Preencha o nome do autor!");
        setAlertaVisivel(true);
        return;
      }
      await addDoc(collection(db, "Autor"), {
        nome_autor: nome,
      });
      setNome("");
      setTipoAlerta("sucesso");
      setMensagemAlerta("Autor inserido com sucesso!");
      setMostrarLista("sim");
      setTimeout(() => setAlertaVisivel(false), 2000);
    } catch (error) {
      setTipoAlerta("erro");
      setMensagemAlerta("Erro ao inserir o autor.");
      setTimeout(() => setAlertaVisivel(false), 2000);
    } finally {
      setAlertaVisivel(true);
    }
  }
  // Função para buscar todos os autores
  async function visualizarTodos() {
    try {
      const autores = await getDocs(collection(db, "Autor"));
      const lista = autores.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAutores(lista);
    } catch (error) {
      setTipoAlerta("erro");
      setMensagemAlerta("Erro ao buscar autores.");
      setTimeout(() => setAlertaVisivel(false), 2000);
    } finally {
      setAlertaVisivel(false);
    }
  }
  // funcoao de consultar o autor
  async function consultarAutor() {
    try {
      const colecao = collection(db, "Autor");
      const q = query(colecao, where("nome_autor", "==", nomeConsulta));
      const autores = await getDocs(q);
      const lista = autores.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAutores(lista);
      setNomeConsulta("");
    } catch (error) {
      setTipoAlerta("erro");
      setMensagemAlerta("Erro ao buscar autor.");
      setTimeout(() => setAlertaVisivel(false), 2000);
    } finally {
      setAlertaVisivel(false);
    }
  }
  useEffect(() => {
    visualizarTodos();
  }, mostraLista);
  return (
    <View style={styles.container}>
      <Cabecalho texto="Inserir Autor" />
      <View style={styles.label}>
        <Text>Digite o nome do autor:</Text>
      </View>
      <View style={styles.components}>
        <InputDescricao
          value={nome}
          onChangeText={setNome}
          placeholder={"Nome do Autor"}
        />
        <BotaoAdicionar onPress={inserirAutor} />
      </View>
      <View style={styles.linha} />
      <Cabecalho texto="Consultar Autor" />
      <View style={styles.label}>
        <Text>Digite o nome do autor:</Text>
      </View>

      <View style={styles.components}>
        <InputDescricao
          value={nomeConsulta}
          onChangeText={setNomeConsulta}
          placeholder={"Nome do Autor"}
        />
        <BotaoConsultar onPress={consultarAutor} />
      </View>
      <View style={styles.linha} />
      <View style={styles.lista}>
        <Cabecalho texto="Visualizar Autores" />
        <FlatList
          style={styles.FlatList}
          data={autores}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 8 }}>
              <Text>{item.nome_autor}</Text>
            </View>
          )}
        />
        <View style={styles.footer}>
          <BotaoVoltar />
        </View>
      </View>
      <AlertaCustomizado
        visivel={alertaVisivel}
        tipo={tipoAlerta}
        descricao={mensagemAlerta}
        onFechar={() => setAlertaVisivel(false)}
      />
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
    height: "auto",
    paddingHorizontal: 10,
    backgroundColor: "lightgray",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
  },
  linha: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    marginVertical: 12,
  },
});

export default Autor;

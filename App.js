import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./app/paginas/home";
import Livros from "./app/paginas/livro";
import Autor from "./app/paginas/autor";
import Genero from "./app/paginas/genero";
import Editora from "./app/paginas/editora";
import { StyleSheet } from "react-native";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#4a90e2",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            drawerStyle: {
              backgroundColor: "#fff",
              width: 250,
            },
            drawerActiveTintColor: "#4a90e2",
            drawerInactiveTintColor: "#555",
            drawerLabelStyle: {
              fontSize: 16,
              marginLeft: 0,
            },
          }}
        >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Autor" component={Autor} />
          <Drawer.Screen name="Editora" component={Editora} />
          <Drawer.Screen name="Livros" component={Livros} />
          <Drawer.Screen name="Genero" component={Genero} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});

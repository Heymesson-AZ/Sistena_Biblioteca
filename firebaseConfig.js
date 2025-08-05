// Importações do Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuração do Firebase (do seu JSON)
const firebaseConfig = {
  apiKey: "AIzaSyDzKgsHWXGit-xa6tCJNwDQOHz41D-zmRk",
  authDomain: "com.apphey.firebaseapp.com",
  projectId: "app-hey",
  storageBucket: "app-hey.firebasestorage.app",
  messagingSenderId: "596977819416",
  appId: "1:596977819416:android:0aea6573e02c4d7b1ec86d",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Exporta os serviços para uso no app
export {auth, db, storage };

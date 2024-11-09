// Importando os módulos necessários do Firebase
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Sua configuração do Firebase (copiada do console do Firebase)
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Inicializando a autenticação do Firebase
const auth = getAuth(app);

// Função de Login
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuário logado:", user.email);
      return user;
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error.message);
      throw error;
    });
};

// Função de Registro
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuário registrado:", user.email);
      return user;
    })
    .catch((error) => {
      console.error("Erro ao registrar:", error.message);
      throw error;
    });
};

// Função de Logout
export const logoutUser = () => {
  return signOut(auth)
    .then(() => {
      console.log("Usuário deslogado");
    })
    .catch((error) => {
      console.error("Erro ao deslogar:", error.message);
      throw error;
    });
};

// Função para verificar o status de login
export const checkUserLoggedIn = (callback) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("Usuário logado:", user.email);
      callback(user);
    } else {
      console.log("Nenhum usuário logado");
      callback(null);
    }
  });
};

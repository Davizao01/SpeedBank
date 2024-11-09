import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

// Configuração do Firebase (substitua pelos dados do seu projeto)
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
const auth = getAuth(app);
const db = getFirestore(app);

// Função de Login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuário logado:", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
  }
};

// Função de Registro de Usuário
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuário registrado:", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.message);
  }
};

// Função de Logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("Usuário deslogado");
  } catch (error) {
    console.error("Erro ao deslogar:", error.message);
  }
};

// Função para submeter uma speedrun
export const submitRun = async (category, time, details) => {
  try {
    const docRef = await addDoc(collection(db, "runs"), {
      category: category,
      time: time,
      details: details,
      approved: false, // Runs serão inicialmente não aprovadas
      createdAt: new Date() // Data de criação para ordenação ou filtros
    });
    console.log("Run submetida:", docRef.id);
  } catch (e) {
    console.error("Erro ao submeter run:", e);
  }
};

// Função para obter runs pendentes de aprovação
export const getPendingRuns = async () => {
  const querySnapshot = await getDocs(collection(db, "runs"));
  const pendingRuns = [];
  querySnapshot.forEach((doc) => {
    if (!doc.data().approved) {
      pendingRuns.push({ id: doc.id, ...doc.data() });
    }
  });
  return pendingRuns;
};

// Função para aprovar uma speedrun
export const approveRun = async (id) => {
  const runRef = doc(db, "runs", id);
  try {
    await updateDoc(runRef, {
      approved: true
    });
    console.log("Run aprovada:", id);
  } catch (e) {
    console.error("Erro ao aprovar run:", e);
  }
};

// Função para rejeitar uma speedrun
export const rejectRun = async (id) => {
  const runRef = doc(db, "runs", id);
  try {
    await deleteDoc(runRef);
    console.log("Run rejeitada:", id);
  } catch (e) {
    console.error("Erro ao rejeitar run:", e);
  }
};

// Função para monitorar o estado de autenticação do usuário
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

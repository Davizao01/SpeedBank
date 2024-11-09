// Importando os métodos do Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'; // Para manipulação do Realtime Database

// Configuração do Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBiZLQyXq4yCRbX3k7A3K5j5fA2r9JO2VE',
  authDomain: 'speedbank-10cda.firebaseapp.com',
  projectId: 'speedbank-10cda',
  storageBucket: 'speedbank-10cda.appspot.com',
  messagingSenderId: '199708705722',
  appId: '1:199708705722:web:4e9b9280c5b60e8c14f734',
  measurementId: 'G-2ZQ7LZK29F'
};

// Inicializando o Firebase com as configurações do seu projeto
firebase.initializeApp(firebaseConfig);

// Função para registrar um novo usuário
export const registerUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

// Função para logar o usuário
export const loginUser = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

// Função para deslogar o usuário
export const logoutUser = () => {
  return firebase.auth().signOut();
};

// Função para salvar uma nova run no Firebase
export const saveRun = (runData) => {
  const db = firebase.database();
  const runRef = db.ref('runs').push(); // Pega uma referência única para uma nova run
  return runRef.set(runData); // Salva os dados da run
};

// Função para pegar todas as runs armazenadas
export const getRuns = () => {
  const db = firebase.database();
  return db.ref('runs').once('value'); // Pega os dados das runs armazenadas no Firebase
};

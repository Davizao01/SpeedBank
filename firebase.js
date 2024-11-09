import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'; // Para o gerenciamento de dados no Firebase

const firebaseConfig = {
  apiKey: 'AIzaSyBiZLQyXq4yCRbX3k7A3K5j5fA2r9JO2VE',
  authDomain: 'speedbank-10cda.firebaseapp.com',
  projectId: 'speedbank-10cda',
  storageBucket: 'speedbank-10cda.appspot.com',
  messagingSenderId: '199708705722',
  appId: '1:199708705722:web:4e9b9280c5b60e8c14f734',
  measurementId: 'G-2ZQ7LZK29F'
};

firebase.initializeApp(firebaseConfig);

// Função para registrar o usuário
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

// Função para salvar uma nova run no banco de dados
export const saveRun = (runData) => {
  const db = firebase.database();
  const runRef = db.ref('runs').push(); // Referência ao local onde as runs serão armazenadas
  return runRef.set(runData); // Salvar dados da run
};

// Função para recuperar as runs
export const getRuns = () => {
  const db = firebase.database();
  return db.ref('runs').once('value'); // Pega todos os dados de runs armazenados
};

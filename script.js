// Importando os métodos do Firebase
import firebase from 'firebase/app';
import 'firebase/auth'; // Para autenticação

// Sua configuração do Firebase
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

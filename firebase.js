// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBiZLQyXq4yCRbX3k7A3K5j5fA2r9JO2VE",
  authDomain: "speedbank-10cda.firebaseapp.com",
  projectId: "speedbank-10cda",
  storageBucket: "speedbank-10cda.appspot.com",
  messagingSenderId: "199708705722",
  appId: "1:199708705722:web:4e9b9280c5b60e8c14f734",
  measurementId: "G-2ZQ7LZK29F"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Garante que a sessão será persistida mesmo após fechar o navegador

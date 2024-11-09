// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiZLQyXq4yCRbX3k7A3K5j5fA2r9JO2VE",
  authDomain: "speedbank-10cda.firebaseapp.com",
  databaseURL: "https://speedbank-10cda-default-rtdb.firebaseio.com",
  projectId: "speedbank-10cda",
  storageBucket: "speedbank-10cda.appspot.com",
  messagingSenderId: "567467478567",
  appId: "1:567467478567:web:123456789abcdef0",
  measurementId: "G-EXAMPLE"
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);

// Funções para login, logout, registro e manipulação das runs
const auth = firebase.auth();
const db = firebase.database();

// Registrar usuário
function registerUser(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

// Login de usuário
function loginUser(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

// Logout de usuário
function logoutUser() {
  return auth.signOut();
}

// Salvar uma run no banco de dados
function saveRun(user, score) {
  const runId = db.ref('runs').push().key; // Gera um ID único para cada run
  return db.ref('runs/' + runId).set({
    user: user,
    score: score,
    status: 'Pendente'
  });
}

// Recuperar todas as runs do banco de dados
function getRuns() {
  return db.ref('runs').once('value');
}

export { registerUser, loginUser, logoutUser, saveRun, getRuns };

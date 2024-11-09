// firebase.js

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBiZLQyXq4yCRbX3k7A3K5j5fA2r9JO2VE",
  authDomain: "seu-projeto.firebaseapp.com",
  databaseURL: "https://seu-projeto.firebaseio.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

export function registerUser(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function loginUser(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function logoutUser() {
  return auth.signOut();
}

export function saveRun(user, score) {
  return db.ref('runs').push({
    user: user,
    score: score,
    status: 'Pendente'
  });
}

export function getRuns() {
  return db.ref('runs').once('value');
}

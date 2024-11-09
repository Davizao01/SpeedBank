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

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);

// Funções do Firebase
export function registerUser(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function loginUser(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function logoutUser() {
  return firebase.auth().signOut();
}

export function saveRun(user, score) {
  const db = firebase.database();
  const runRef = db.ref('runs').push();
  return runRef.set({
    user: user,
    score: score,
    status: 'Pendente',
  });
}

export function getRuns() {
  const db = firebase.database();
  const runsRef = db.ref('runs');
  return runsRef.once('value');
}

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBiZLQyXq4yCRbX3k7A3K5j5fA2r9JO2VE",  // Sua chave de API
  authDomain: "speedbank-10cda.firebaseapp.com",
  projectId: "speedbank-10cda",
  storageBucket: "speedbank-10cda.appspot.com",
  messagingSenderId: "853674675010",
  appId: "1:853674675010:web:24d01b89b53c541f4c63ea"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Funções de Autenticação
export const registerUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const loginUser = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const logoutUser = () => {
  return firebase.auth().signOut();
};

// Funções de Run
export const saveRun = (user, score) => {
  const db = firebase.database();
  const runRef = db.ref('runs').push(); // Cria uma nova entrada de run
  return runRef.set({
    user: user,
    score: score,
    status: 'Pendente' // Inicia com o status "Pendente"
  });
};

export const getRuns = () => {
  const db = firebase.database();
  const runRef = db.ref('runs');
  return runRef.once('value'); // Pega as runs do Firebase
};

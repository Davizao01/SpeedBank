<!-- Firebase (versão 8.x) -->
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>

<script>
  const firebaseConfig = {
    apiKey: "AIzaSyBiZLQyXq4yCRbX3k7A3K5j5fA2r9JO2VE",
    authDomain: "speedbank-10cda.firebaseapp.com",
    projectId: "speedbank-10cda",
    storageBucket: "speedbank-10cda.appspot.com",
    messagingSenderId: "199708705722",
    appId: "1:199708705722:web:4e9b9280c5b60e8c14f734",
    measurementId: "G-2ZQ7LZK29F"
  };
  
  // Inicializando o Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database = firebase.database();
</script>

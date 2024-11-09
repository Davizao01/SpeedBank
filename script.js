// Inicialize o Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from './firebase';

// Configuração do Firebase
const auth = getAuth();
firebase.initializeApp(firebaseConfig);

// Função de login
function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Usuário logado com sucesso
            const user = userCredential.user;
            console.log('Usuário logado:', user);
            window.location.href = "/dashboard"; // Redirecionar para uma página de sucesso
        })
        .catch((error) => {
            const errorMessage = error.message;
            document.getElementById('login-error').innerText = `Erro: ${errorMessage}`;
        });
}

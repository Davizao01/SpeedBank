// script.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const userEmailDisplay = document.getElementById("user-email");

  // 1. Verificar se o usuário está logado
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Usuário logado, redireciona para o dashboard (página principal)
      window.location.href = 'dashboard.html';
    } else {
      // Usuário não logado, pode continuar na página de login ou exibir mensagem
      console.log('Usuário não logado');
    }
  });

  // 2. Login
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = loginForm['email'].value;
      const password = loginForm['password'].value;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          // Após login bem-sucedido, redireciona para o dashboard
          window.location.href = 'dashboard.html';
        })
        .catch((err) => {
          // Exibe um erro caso o login falhe
          alert('Erro ao fazer login: ' + err.message);
        });
    });
  }

  // 3. Logout
  const logoutButton = document.getElementById("logout-btn");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      firebase.auth().signOut()
        .then(() => {
          // Após logout, redireciona para a página de login
          window.location.href = 'login.html';
        })
        .catch((err) => {
          // Exibe um erro caso o logout falhe
          alert('Erro ao fazer logout: ' + err.message);
        });
    });
  }
});

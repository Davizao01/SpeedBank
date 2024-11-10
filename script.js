document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  // Verificar se o usuário já está logado
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Usuário logado, redireciona para o dashboard
      window.location.href = 'dashboard.html';  // Ou 'index.html', caso prefira
    } else {
      console.log('Usuário não logado');
    }
  });

  // Processo de login
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = loginForm['email'].value;
      const password = loginForm['password'].value;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          // Redirecionamento após login bem-sucedido
          window.location.href = 'dashboard.html'; // Ou 'index.html'
        })
        .catch((err) => {
          alert('Erro ao fazer login: ' + err.message);
        });
    });
  }
});

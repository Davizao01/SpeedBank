document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const userEmailDisplay = document.getElementById("user-email");

  // Verifique se o usuário está logado
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      userEmailDisplay.textContent = `Logado como: ${user.email}`;
      window.location.href = 'dashboard.html';  // Redireciona para o painel após o login
    }
  });

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = loginForm['email'].value;
      const password = loginForm['password'].value;
      
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          window.location.href = 'dashboard.html'; // Redireciona para o painel após o login
        })
        .catch((err) => {
          alert('Erro ao fazer login: ' + err.message);  // Exibe um erro caso o login falhe
        });
    });
  }
});

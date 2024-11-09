// Supondo que você tenha um formulário com id 'loginForm'
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;

  loginUser(email, password)
    .then((user) => {
      // Se o login for bem-sucedido, redirecione ou exiba conteúdo
      console.log('Login bem-sucedido!', user);
      window.location.href = "/dashboard";  // Exemplo de redirecionamento
    })
    .catch((error) => {
      console.error('Erro ao fazer login:', error.message);
    });
});

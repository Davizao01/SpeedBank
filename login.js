import { loginUser } from './firebase.js';

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  // Pegando o e-mail e a senha dos campos do formulário
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Chamando a função para logar o usuário
  loginUser(email, password)
    .then((user) => {
      console.log('Usuário logado:', user.email);
      // Redireciona para a página inicial ou painel do SpeedBank
      window.location.href = 'dashboard.html'; // Você pode alterar isso para qualquer página de destino
    })
    .catch((error) => {
      console.error('Erro ao logar usuário:', error.message);
      alert('Erro ao fazer login. Verifique os dados e tente novamente.');
    });
});

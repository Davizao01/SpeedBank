// script.js
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('loginButton');
  const logoutButton = document.getElementById('logoutButton');

  // Verifica se o usuário está logado
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loginButton.style.display = 'none';
      logoutButton.style.display = 'inline-block';
    } else {
      loginButton.style.display = 'inline-block';
      logoutButton.style.display = 'none';
    }
  });

  // Evento para logout
  logoutButton.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
      window.location.href = 'login.html';
    }).catch((error) => {
      console.error("Erro ao sair:", error);
    });
  });

  // Envio de Speedrun
  const speedrunForm = document.getElementById('speedrunForm');
  speedrunForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário

    const category = document.getElementById('runCategory').value;
    const time = document.getElementById('runTime').value;
    const details = document.getElementById('runDetails').value;

    const user = firebase.auth().currentUser;
    if (user) {
      const runId = 'run_' + Date.now();
      firebase.database().ref('runs/' + runId).set({
        user: user.email,
        category,
        time,
        details,
        status: 'Pendente'
      }).then(() => {
        alert('Speedrun enviada com sucesso!');
        speedrunForm.reset();
      }).catch((error) => {
        console.error('Erro ao enviar a run:', error);
      });
    } else {
      alert('Você precisa estar logado para enviar uma run!');
    }
  });
});

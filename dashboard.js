import { logoutUser } from './firebase.js';

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout-btn");
  const userEmailDisplay = document.getElementById("user-email");
  const runsList = document.getElementById("runs-list");
  const runsToApprove = document.getElementById("runs-to-approve");

  // Exibir o e-mail do usuário logado
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      userEmailDisplay.textContent = `Logado como: ${user.email}`;
      loadRuns();
    } else {
      window.location.href = 'login.html'; // Redirecionar para o login se não estiver logado
    }
  });

  // Logout do usuário
  logoutButton.addEventListener("click", () => {
    logoutUser()
      .then(() => {
        window.location.href = 'login.html'; // Redirecionar para login após sair
      })
      .catch(err => console.error('Erro ao sair:', err));
  });

  // Função para carregar as runs
  function loadRuns() {
    // Aqui você pode implementar o código para carregar as runs de um banco de dados (Firebase, por exemplo)
    // Exemplo de como isso poderia ser feito:
    
    // Mock de runs pendentes
    const runs = [
      { id: 1, user: 'Ieen', score: '1000R$ %', status: 'Pendente' },
      { id: 2, user: 'Davizao', score: '2000R$ %', status: 'Aprovada' },
      { id: 3, user: 'Maria', score: '10000R$ %', status: 'Pendente' }
    ];

    // Exibir as runs pendentes e aprovadas
    runsList.innerHTML = '';
    runs.forEach(run => {
      const runItem = document.createElement('div');
      runItem.className = 'run-item';
      runItem.innerHTML = `
        <span>${run.user} - ${run.score} (${run.status})</span>
      `;
      runsList.appendChild(runItem);

      // Exibir as runs pendentes para aprovação
      if (run.status === 'Pendente') {
        const approvalItem = document.createElement('li');
        approvalItem.innerHTML = `
          <span>${run.user} - ${run.score}</span>
          <button onclick="approveRun(${run.id})">Aprovar</button>
        `;
        runsToApprove.appendChild(approvalItem);
      }
    });
  }

  // Função para aprovar uma run
  window.approveRun = (runId) => {
    // Aqui você pode implementar a lógica para aprovar a run (alterar o status no Firebase, por exemplo)
    console.log(`Run ${runId} aprovada!`);
    loadRuns(); // Atualiza a lista de runs
  };
});

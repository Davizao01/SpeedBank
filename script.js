import { registerUser, loginUser, logoutUser, saveRun, getRuns } from './firebase.js';

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const logoutButton = document.getElementById("logout-btn");
  const userEmailDisplay = document.getElementById("user-email");
  const runsList = document.getElementById("runs-list");
  const runsToApprove = document.getElementById("runs-to-approve");

  // Verifica se o usuário está logado
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Usuário logado
      userEmailDisplay.textContent = `Logado como: ${user.email}`;
      loadRuns(); // Carrega as runs no dashboard
      // Redireciona para o dashboard caso o usuário já tenha feito login
      if (window.location.pathname === '/login.html' || window.location.pathname === '/register.html') {
        window.location.href = 'dashboard.html'; 
      }
    } else {
      // Usuário não logado
      if (window.location.pathname !== '/login.html' && window.location.pathname !== '/register.html') {
        window.location.href = 'login.html'; // Redireciona para login se não estiver logado
      }
    }
  });

  // Login
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = loginForm['email'].value;
      const password = loginForm['password'].value;
      loginUser(email, password)
        .then(() => {
          window.location.href = 'dashboard.html'; // Redireciona para o dashboard após login
        })
        .catch(err => alert('Erro ao fazer login: ' + err.message));
    });
  }

  // Registro
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = registerForm['email'].value;
      const password = registerForm['password'].value;
      registerUser(email, password)
        .then(() => {
          window.location.href = 'login.html'; // Redireciona para o login após registro
        })
        .catch(err => alert('Erro ao registrar: ' + err.message));
    });
  }

  // Logout
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logoutUser()
        .then(() => {
          window.location.href = 'login.html'; // Redireciona para login após logout
        })
        .catch(err => console.error('Erro ao sair:', err));
    });
  }

  // Função para carregar as runs
  function loadRuns() {
    getRuns().then(snapshot => {
      const runs = snapshot.val(); // Pega os dados do Firebase

      // Exibir as runs pendentes e aprovadas
      runsList.innerHTML = '';
      runsToApprove.innerHTML = '';
      Object.keys(runs).forEach(runId => {
        const run = runs[runId];
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
            <button onclick="approveRun('${runId}')">Aprovar</button>
          `;
          runsToApprove.appendChild(approvalItem);
        }
      });
    });
  }

  // Função para aprovar uma run
  window.approveRun = (runId) => {
    const db = firebase.database();
    const runRef = db.ref('runs').child(runId);
    runRef.update({ status: 'Aprovada' }) // Altera o status da run para 'Aprovada'
      .then(() => {
        loadRuns(); // Atualiza a lista de runs após a aprovação
      })
      .catch(err => console.error('Erro ao aprovar a run:', err));
  };

  // Função para salvar uma nova run
  const saveRunForm = document.getElementById("save-run-form");
  if (saveRunForm) {
    saveRunForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const score = saveRunForm['score'].value;
      const user = firebase.auth().currentUser.email; // Pega o e-mail do usuário logado
      saveRun(user, score)
        .then(() => {
          alert('Run salva com sucesso!');
          loadRuns(); // Atualiza as runs
        })
        .catch(err => console.error('Erro ao salvar a run:', err));
    });
  }
});

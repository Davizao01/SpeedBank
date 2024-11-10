// Login com Nickname
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  // Verificar se o nickname está salvo no localStorage
  const savedNick = localStorage.getItem("nickname");
  if (savedNick) {
    // Se o nickname já estiver salvo, redireciona para o dashboard
    window.location.href = 'dashboard.html';
  }

  // Processo de login com nickname
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const nickname = loginForm['nickname'].value;

      // Salva o nickname no localStorage
      localStorage.setItem("nickname", nickname);

      // Redireciona para a página de dashboard
      window.location.href = 'dashboard.html';
    });
  }
});

// Enviar uma run para o Firebase
document.addEventListener("DOMContentLoaded", () => {
  const speedrunForm = document.getElementById("speedrun-form");

  // Obter o nickname do localStorage
  const nickname = localStorage.getItem("nickname");

  if (!nickname) {
    alert("Você precisa fazer login primeiro!");
    window.location.href = "login.html"; // Redireciona para o login se não houver nickname
    return;
  }

  // Submeter a run
  if (speedrunForm) {
    speedrunForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const category = speedrunForm['category'].value;
      const time = speedrunForm['time'].value;
      const details = speedrunForm['details'].value;

      // Salvar no Firebase
      const dbRef = firebase.database().ref("runs/");
      const newRun = {
        nickname: nickname,
        category: category,
        time: time,
        details: details,
        date: new Date().toISOString(),
      };

      dbRef.push(newRun)
        .then(() => {
          alert("Sua run foi submetida com sucesso!");
          speedrunForm.reset(); // Reseta o formulário após envio
        })
        .catch((error) => {
          alert("Erro ao submeter a run: " + error.message);
        });
    });
  }
});

// Exibir as runs no Dashboard
document.addEventListener("DOMContentLoaded", () => {
  const nickname = localStorage.getItem("nickname");

  if (!nickname) {
    alert("Você precisa fazer login primeiro!");
    window.location.href = "login.html"; // Redireciona para o login se não houver nickname
    return;
  }

  const runsList = document.getElementById("runs-list");

  // Carregar as runs do Firebase
  const dbRef = firebase.database().ref("runs/");
  dbRef.on("value", (snapshot) => {
    const runs = snapshot.val();
    runsList.innerHTML = ""; // Limpa a lista antes de adicionar os novos elementos

    for (let key in runs) {
      const run = runs[key];
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${run.nickname}</strong> - ${run.category} - ${run.time}`;
      runsList.appendChild(listItem);
    }
  });
});

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

// Exibir o nickname no Dashboard
document.addEventListener("DOMContentLoaded", () => {
  const nickname = localStorage.getItem("nickname");

  if (!nickname) {
    alert("Você precisa fazer login primeiro!");
    window.location.href = "login.html"; // Redireciona para o login se não houver nickname
    return;
  }

  // Exibir o nickname na página de dashboard
  const nicknameElement = document.getElementById("nickname");
  nicknameElement.textContent = nickname;
  
  // Carregar as runs do Firebase
  const runsList = document.getElementById("runs-list");
  const dbRef = firebase.database().ref("runs/");
  dbRef.orderByChild("nickname").equalTo(nickname).on("value", (snapshot) => {
    runsList.innerHTML = ""; // Limpa a lista antes de adicionar os novos elementos

    const runs = snapshot.val();
    if (runs) {
      for (let key in runs) {
        const run = runs[key];
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${run.nickname}</strong> - ${run.category} - ${run.time}`;
        runsList.appendChild(listItem);
      }
    } else {
      runsList.innerHTML = "<li>Nenhuma run encontrada.</li>";
    }
  });
});

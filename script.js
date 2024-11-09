document.addEventListener("DOMContentLoaded", function() {
    // Exemplo de como carregar as runs (você precisaria de um backend que fornecesse isso)
    fetch('/runs/pending')
        .then(response => response.json())
        .then(data => {
            const runsList = document.getElementById("runs-list");
            data.runs.forEach(run => {
                const li = document.createElement("li");
                li.innerHTML = `${run.name} - ${run.category} <button onclick="approveRun(${run.id})">Aprovar</button>`;
                runsList.appendChild(li);
            });
        });
});

function approveRun(runId) {
    fetch(`/approve-run/${runId}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            alert("Run aprovada com sucesso!");
        });
}

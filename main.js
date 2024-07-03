function abrirModal() {
    document.getElementById('overlay').classList.add("active");
    document.getElementById('criarTarefa').classList.add("active");
}

function fecharModal() {
    document.getElementById('overlay').classList.remove("active");
    document.getElementById('criarTarefa').classList.remove("active");
}

function buscarTarefas() {
    fetch("http://localhost:3000/tarefas")
        .then(res => res.json())
        .then(res => {
            inserirTarefas(res);
        });
}
buscarTarefas();

function inserirTarefas(listaDeTarefas) {
    const noTasksMessage = document.getElementById('no-tasks-message');
    const lista = document.getElementById('lista');

    if (listaDeTarefas.length > 0) {
        lista.innerHTML = "";
        listaDeTarefas.forEach(tarefa => {
            lista.innerHTML += `
            <li>
                <h5>${tarefa.titulo}</h5>
                <p>${tarefa.descricao}</p>
                <div class="actions">
                    <box-icon name='trash' size="sm" onclick="deletarTarefa(${tarefa.id})"></box-icon>
                </div>
            </li>
            `;
        });
        noTasksMessage.style.display = 'none';
    } else {
        noTasksMessage.style.display = 'block';
    }
}

function novaTarefa(event) {
    event.preventDefault();
    let tarefa = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value
    };
    fetch("http://localhost:3000/tarefas", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(tarefa)
    })
    .then(res => res.json())
    .then(res => {
        fecharModal();
        buscarTarefas();
        let form = document.querySelector("#criarTarefa form");
        form.reset();
    });
}

function deletarTarefa(id) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(res => {
        buscarTarefas();
    });
}

function pesquisarTarefas() {
    let lis = document.querySelectorAll("#lista li");
    let busca = document.getElementById('busca').value.toLowerCase();

    lis.forEach(li => {
        let titulo = li.querySelector("h5").innerText.toLowerCase();
        if (!titulo.includes(busca)) {
            li.classList.add('oculto');
        } else {
            li.classList.remove('oculto');
        }
    });
}
